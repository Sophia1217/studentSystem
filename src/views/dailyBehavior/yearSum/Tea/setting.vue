 <template>
  <div class="basicInfo">
    <div class="tableWrap">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">参与自评列表</span>
          <!-- <i class="Updataicon" /> -->
        </div>

        <div class="headerRight">
          <div class="btns borderGreen" @click="Join">
            <i class="icon addIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table ref="multipleTable" :data="basicInfoList" style="width: 100%">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="businessName" label="学年" />
          <el-table-column prop="sqkfsj" label="本科生申请模板" width="300px">
            <template slot-scope="scope">
              <div class="content">
                <el-upload
                  action="#"
                  class="el-upload"
                  :auto-upload="false"
                  ref="upload"
                  :file-list="scope.row.files"
                  :on-change="fileChange"
                  accept=".pdf,.docx"
                  :before-remove="beforeRemove"
                >
                  <el-button
                    type="text"
                    size="small"
                    @click="thClick(scope.row, 1)"
                  >
                    <span class="handleName">替换模板</span>
                  </el-button>
                </el-upload>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="sqkfsj" label="研究生申请模板" width="300px">
            <template slot-scope="scope">
              <div class="content">
                <el-upload
                  action="#"
                  class="el-upload"
                  :auto-upload="false"
                  ref="upload"
                  :file-list="scope.row.files"
                  :on-change="fileChange"
                  accept=".pdf,.docx"
                >
                  <el-button
                    type="text"
                    size="small"
                    @click="thClick(scope.row, 2)"
                  >
                    <span class="handleName">替换模板</span>
                  </el-button>
                </el-upload>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="sqkfsj" label="申请开放时间" width="500px">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.sqkfsj"
                type="datetimerange"
                range-separator="至"
                start-placeholder="起始年月日"
                end-placeholder="结束年月日"
                value-format="yyyy-MM-dd "
                @change="timeChange(scope.row)"
                :disabled="scope.row.kgzt == '0' ? false : true"
                :clearable="false"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="kgzt" label="申请状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.kgzt"
                active-color="#23AD6F"
                inactive-color="#E0E0E0"
                active-value="0"
                inactive-value="1"
                @change="kgChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="新增" :visible.sync="showJoin" width="30%">
      <div class="form">
        <el-form label-width="150px" :ref="form" :data="form" rules="rules">
          <el-form-item label="当前设置学年"
            ><el-select
              v-model="form.dqxn"
              @change="xnChange"
              style="width: 100px"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in xnOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option> </el-select
          ></el-form-item>
          <el-form-item label="复制历史学年"
            ><el-select
              v-model="form.fzxn"
              @change="xnChange"
              style="width: 100px"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in xnOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option> </el-select
          ></el-form-item>
          <el-form-item label="本科生申请模板">
            <el-upload
              action="#"
              class="el-upload"
              :auto-upload="false"
              ref="upload"
              :file-list="form.files"
              :on-change="fileChange"
              accept=".pdf,.docx"
              :before-remove="beforeRemove"
            >
              <el-button
                type="text"
                size="small"
                @click="scClick(scope.row, 1)"
              >
                <span class="handleName">上传模板</span>
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="研究生申请模板">
            <el-upload
              action="#"
              class="el-upload"
              :auto-upload="false"
              ref="upload"
              :file-list="form.files"
              :on-change="fileChange"
              accept=".pdf,.docx"
              :before-remove="beforeRemove"
            >
              <el-button
                type="text"
                size="small"
                @click="scClick(scope.row, 2)"
              >
                <span class="handleName">上传模板</span>
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="开放时间">
            <el-date-picker
              v-model="form.sqkfsj"
              type="datetimerange"
              range-separator="至"
              start-placeholder="起始年月日"
              end-placeholder="结束年月日"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              :disabled="sfyx == '0' ? false : true"
              :clearable="false"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="开关">
            <el-switch
              v-model="form.sfyx"
              active-color="#23AD6F"
              inactive-color="#E0E0E0"
              active-value="0"
              inactive-value="1"
            ></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="joinCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="joinConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  querySqkgList,
  updateQt,
  updateSqkgsjsz,
} from "@/api/dailyBehavior/applySetting";
import { readXml } from "@/api/flowable/definition";
import flow from "@/views/flowable/task/record/flow";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "BasicInfo",
  components: { flow },
  data() {
    return {
      basicInfoList: [],
      sqkfsj: [],
      sfyx: "",
      xnOptions: [],
      form: {},
      showJoin: false,
      rules: {
        dqxn: {
          required: true,
          message: "当前设置学年不能为空",
          trigger: "blur",
        },
      },
    };
  },

  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      querySqkgList().then((res) => {
        this.basicInfoList = res.data;
        for (let val of this.basicInfoList) {
          var a = val.sqkfqjs ? val.sqkfqjs : "";
          var b = val.sqkfqje ? val.sqkfqje : "";
          var arr = [];

          arr.push(a);
          arr.push(b);
          this.$set(val, "sqkfsj", arr);
        }
      });
    },
    Join() {
      this.showJoin = true;
    },
    joinCancel() {
      this.showJoin = false;
    },
    joinConfirm() {},

    timeChange(row) {
      //   this.sjModal = true;
      //   this.rowDetail = row;
      //   console.log(this.rowDetail);
    },
    kgChange(row) {
      //   if (row.kgzt == "1") {
      //     this.$set(row, "sqkfsj", []);
      //     let data = {
      //       businessName:
      //         row.businessName == "学籍异动_保留学籍" ||
      //         row.businessName == "学籍异动_复学" ||
      //         row.businessName == "学籍异动_退学" ||
      //         row.businessName == "学籍异动_休学"
      //           ? "学籍异动"
      //           : row.businessName,
      //       id: row.id,
      //       kgzt: row.kgzt,
      //       qt: row.qt,
      //       sqkfqje: row.sqkfsj[1] ? row.sqkfsj[1] : "",
      //       sqkfqjs: row.sqkfsj[0] ? row.sqkfsj[0] : "",
      //     };
      //     updateSqkgsjsz(data).then((res) => {
      //       this.getList();
      //     });
      //   } else {
      //     this.$message.warning("请选择开放时间！");
      //   }
    },
    thClick(row, index) {},
    beforeRemove(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      this.fileList = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
      // console.log("fileList删除", this.fileList);
      // console.log("fileListAdd删除", this.fileListAdd);
    },
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 2) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过2M");
      } else if (file.status == "ready") {
        this.fileListAdd = [];
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
      this.fileList = fileList;
      // console.log("fileList改变", this.fileList);
      // console.log("fileListAdd改变", this.fileListAdd);
    },
  },
};
</script>
<style lang="scss" scoped>
.basicInfo {
  background: #ffffff;
  .mt15 {
    // margin-top: 15px;
    padding: 20px;
  }
  .tableWrap {
    background: #fff;
    padding: 20px;
    .headerTop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .headerLeft {
        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
        // .Updataicon {
        //   display: inline-block;
        //   vertical-align: middle;
        //   margin-left: 10px;
        //   width: 20px;
        //   height: 20px;
        //   background: url("~@/assets/images/updata.png") no-repeat;
        // }
      }
      .headerRight {
        display: flex;
        align-items: center;
        .borderBlue {
          background: #fff;
          border: 1px solid grey;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fff;
        }
        .borderLight {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
        .borderGreen {
          border: 1px solid grey;
          background: #005657;
        }
        .btns {
          margin-right: 15px;
          padding: 0px 10px;
          cursor: pointer;
          border-radius: 4px;
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            // vertical-align: middle;
          }
          .title1 {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            color: #fff;
            // vertical-align: middle;
          }
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }

          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
          .addIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
          .setIcon {
            margin-top: 10px;
            background: url("~@/assets/images/set.png") no-repeat;
          }
        }
      }
    }
    .scopeIncon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
}
</style>

