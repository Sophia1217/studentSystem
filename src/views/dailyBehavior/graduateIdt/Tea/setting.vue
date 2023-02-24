 <template>
  <div class="basicInfo">
    <div class="tableWrap">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">鉴定表设置列表</span>
          <!-- <i class="Updataicon" /> -->
        </div>

        <div class="headerRight">
          <div class="btns borderGreen" @click="Join" v-show="AUTHFLAG">
            <i class="icon addIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table ref="multipleTable" :data="basicInfoList" style="width: 100%">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="xn" label="学年" align="center" />
          <el-table-column label="本科生申请模板" width="500px" align="center">
            <template slot-scope="scope">
              <div class="moban">
                <div class="content">
                  <el-button
                    type="text"
                    size="small"
                    @click="xzWj(scope.row, 1)"
                  >
                    <span class="handleName">{{ scope.row.bkfileName }}</span>
                  </el-button>
                </div>
                <div class="content">
                  <el-upload
                    accept=".pdf"
                    :auto-upload="true"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :headers="fileHeader"
                    :data="fileData"
                    :on-success="upLoadSuccess"
                    :on-error="upLoadError"
                    :before-upload="
                      (item) => {
                        beforeUpload(item, scope.row, 1);
                      }
                    "
                  >
                    <el-button
                      type="text"
                      size="small"
                      @click="thmb(scope.row, 1)"
                    >
                      <span class="handleName">替换模板</span>
                    </el-button>
                  </el-upload>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="研究生申请模板" width="500px" align="center">
            <template slot-scope="scope">
              <div class="moban">
                <div class="content">
                  <el-button
                    type="text"
                    size="small"
                    @click="xzWj(scope.row, 2)"
                  >
                    <span class="handleName">{{ scope.row.yjsfileName }}</span>
                  </el-button>
                </div>
                <el-upload
                  accept=".pdf"
                  :auto-upload="true"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :headers="fileHeader"
                  :data="fileData"
                  :on-success="upLoadSuccess"
                  :on-error="upLoadError"
                  :before-upload="
                    (item) => {
                      beforeUpload(item, scope.row, 2);
                    }
                  "
                >
                  <el-button
                    type="text"
                    size="small"
                    @click="thmb(scope.row, 2)"
                  >
                    <span class="handleName">替换模板</span>
                  </el-button>
                </el-upload>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="sqkfsj"
            label="申请开放时间"
            width="500px"
            align="center"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.sqkfsj"
                type="datetimerange"
                range-separator="至"
                start-placeholder="起始年月日"
                end-placeholder="结束年月日"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                @change="timeChange(scope.row)"
                :disabled="scope.row.sqKg == '0' ? false : true"
                :clearable="false"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="sqKg" label="申请状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.sqKg"
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

    <el-dialog
      title="新增"
      :visible.sync="showJoin"
      width="50%"
      @close="emptyDetails()"
    >
      <div class="form">
        <el-form label-width="150px" ref="form" :model="form" :rules="rules">
          <el-form-item label="当前设置学年" prop="dqxn"
            ><el-select
              v-model="form.dqxn"
              placeholder="请选择"
              @click="fzxnChange()"
            >
              <el-option
                v-for="(item, index) in xnOptions"
                :key="index"
                :label="item.mc"
                :value="item.mc"
              ></el-option> </el-select
          ></el-form-item>
          <el-form-item label="复制历史学年"
            ><el-select
              v-model="form.fzxn"
              placeholder="请选择"
              @change="fzxnChange"
              :disabled="flag == 1 && (isbks == 2 || isyjs == 2)"
            >
              <el-option
                v-for="(item, index) in basicInfoList"
                :key="index"
                :label="item.xn"
                :value="item.id"
              ></el-option> </el-select
          ></el-form-item>
          <el-form-item label="本科生申请模板" prop="bksfile">
            <div class="content">
              <el-upload
                action="#"
                class="el-upload"
                :auto-upload="false"
                ref="upload"
                :file-list="form.bksfile"
                :on-preview="handlePreview"
                :on-change="
                  (item, item1) => {
                    formfileChange(item, item1, 1);
                  }
                "
                :before-remove="
                  (item, item1) => {
                    formfileRemove(item, item1, 1);
                  }
                "
                accept=".pdf,.jpg"
                :disabled="flag == 2"
              >
                <el-button type="text" size="small" v-if="isbks == 1">
                  <span class="handleName">上传模板</span>
                </el-button>
              </el-upload>
            </div>
            <!-- <div class="content">
              <el-button type="text" size="small" @click="xzWj(form, 1)">
                <span class="handleName">{{ form.bkfileName }}</span>
              </el-button>
            </div> -->
          </el-form-item>
          <el-form-item label="研究生申请模板" prop="yjsfile">
            <div class="content">
              <el-upload
                action="#"
                class="el-upload"
                :auto-upload="false"
                ref="upload"
                :file-list="form.yjsfile"
                :on-preview="handlePreview"
                :on-change="
                  (item, item1) => {
                    formfileChange(item, item1, 2);
                  }
                "
                :before-remove="
                  (item, item1) => {
                    formfileRemove(item, item1, 2);
                  }
                "
                accept=".pdf,.jpg"
                :disabled="flag == 2"
              >
                <el-button type="text" size="small" v-if="isyjs == 1">
                  <span class="handleName">上传模板</span>
                </el-button>
              </el-upload>
            </div>
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
              :disabled="form.sqKg == '0' ? false : true"
              :clearable="false"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="开关">
            <el-switch
              v-model="form.sqKg"
              active-color="#23AD6F"
              inactive-color="#E0E0E0"
              active-value="0"
              inactive-value="1"
              @change="kgInChange()"
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
import { queryXn } from "@/api/dailyBehavior/yearSum";
import {
  queryRcswJdbsz,
  importRcswJdbsz,
  switchRcswJdbsz,
  delwj,
} from "@/api/dailyBehavior/graduationIdt";
import flow from "@/views/flowable/task/record/flow";
import { getToken } from "@/utils/auth";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { querywj, Exportwj } from "@/api/assistantWork/classEvent";
export default {
  name: "BasicInfo",
  components: { flow },
  data() {
    return {
      flag: 1, //自己上传1 复制学年2
      basicInfoList: [],
      AUTHFLAG: false,
      businesId: "",
      uploadUrl: process.env.VUE_APP_BASE_API + "/fileCommon/uploadFileCommon",
      sfyx: "",
      xnOptions: [],
      form: {
        dqxn: "",
        fzxn: "",
        sqKg: "",
        sqkfsj: "",
        bksfile: [],
        yjsfile: [],
        bkfjId: "",
        yjsfjId: "",
        bkfileInfo: "",
        yjsfileInfo: "",
        fileList: [],
      },

      isbks: 1,
      isyjs: 1,
      showJoin: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      rules: {
        dqxn: [
          {
            required: true,
            message: "当前设置学年不能为空",
            trigger: "change",
          },
        ],
        bksfile: [
          {
            required: true,
            message: "模板不能为空",
            trigger: "change",
          },
        ],
        yjsfile: [
          {
            required: true,
            message: "模板不能为空",
            trigger: "change",
          },
        ],
      },
    };
  },

  computed: {
    fileData: {
      get() {
        return {
          pageType: "jdbsz",
          roleType: "rcsw",
          businesId: this.businesId,
        };
      },
    },
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
        };
      },
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getList();
    this.getXn();
  },
  methods: {
    // 表单校验
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.form.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    emptyDetails() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
      this.form.dqxn = "";
      this.form.fzxn = "";
      this.form.bksfile = [];
      this.form.yjsfile = [];
      this.form.fileList = [];
      this.isbks = 1;
      this.isyjs = 1;
      this.flag = 1;
      this.form.sqKg = "1";
      this.form.sqkfsj = [];
    },
    getXn() {
      queryXn().then((res) => {
        this.xnOptions = res.data;
      });
    },
    xnChange() {
      this.getList();
    },
    getList() {
      queryRcswJdbsz(this.queryParams).then((res) => {
        this.basicInfoList = res.data;
        for (let val of this.basicInfoList) {
          var a = val.sqStartDate ? val.sqStartDate : "";
          var b = val.sqEndDate ? val.sqEndDate : "";
          var arr = [];

          arr.push(a);
          arr.push(b);

          this.$set(val, "sqkfsj", arr);
        }
        console.log("this.basicInfoList", this.basicInfoList);
      });
    },
    Join() {
      this.showJoin = true;
    },
    joinCancel() {
      this.showJoin = false;
    },
    joinConfirm() {
      if (!this.checkForm()) {
        this.$message.error("请完善表单相关信息！");
        console.log(this.form);
        return;
      } else {
        let formData = new FormData();

        formData.append("xn", this.form.dqxn);
        formData.append("sqKg", this.form.sqKg);
        formData.append(
          "sqStartDate",
          this.form.sqkfsj[0] ? this.form.sqkfsj[0] : ""
        );
        formData.append(
          "sqEndDate",
          this.form.sqkfsj[1] ? this.form.sqkfsj[1] : ""
        );

        if (this.flag == 1) {
          this.form.fileList = [...this.form.bksfile, ...this.form.yjsfile];

          if (this.form.fileList.length > 0) {
            this.form.fileList.map((file) => {
              formData.append("files", file.raw);
            });
          }
        } else {
          // this.form.fileList = [this.form.bksfile, this.form.yjsfile];
          // console.log("this.form.fileList", this.form.fileList);
          // if (this.form.fileList.length > 0) {
          //   this.form.fileList.map((item) => {
          //     formData.append("files", item);
          //   });
          // }
          formData.append("files", this.form.bksfile);
          formData.append("files", this.form.yjsfile);
        }
        //console.log("this.form.fileList", this.form.fileList);

        importRcswJdbsz(formData).then((res) => {
          this.showJoin = false;
          this.getList();
        });
      }
    },
    timeChange(row) {
      let data = {
        id: row.id,
        sqKg: row.sqKg,
        sqEndDate: row.sqkfsj[1] ? row.sqkfsj[1] : "",
        sqStartDate: row.sqkfsj[0] ? row.sqkfsj[0] : "",
      };
      switchRcswJdbsz(data).then((res) => {
        this.getList();
      });
    },
    kgChange(row) {
      console.log("kgchange");
      if (row.sqKg == "1") {
        this.$set(row, "sqkfsj", []);
        let data = {
          id: row.id,
          sqKg: row.sqKg,
          sqEndDate: row.sqkfsj[1] ? row.sqkfsj[1] : "",
          sqStartDate: row.sqkfsj[0] ? row.sqkfsj[0] : "",
        };
        switchRcswJdbsz(data).then((res) => {
          this.getList();
        });
      } else {
        if (row.sqkfsj == []) {
          let data = {
            id: row.id,
            sqKg: row.sqKg,
            sqEndDate: row.sqkfsj[1] ? row.sqkfsj[1] : "",
            sqStartDate: row.sqkfsj[0] ? row.sqkfsj[0] : "",
          };
          switchRcswJdbsz(data).then((res) => {
            this.getList();
          });
        } else this.$message.warning("请选择开放时间！");
      }
    },
    kgInChange() {
      if (this.form.sqKg == "0") {
        this.$message.warning("请选择时间！");
      }
    },
    xzWj(row, index) {
      if (index == 1) {
        Exportwj({ id: row.bkfjId.toString() }).then((res) => {
          this.url = window.URL.createObjectURL(res);
          this.downloadFn(res, row.bkfileName);
        });
      } else {
        Exportwj({ id: row.yjsfjId.toString() }).then((res) => {
          this.url = window.URL.createObjectURL(res);
          this.downloadFn(res, row.yjsfileName);
        });
      }
    },
    async fzxnChange(value) {
      this.isbks = 2;
      this.isyjs = 2;
      this.flag = 2;
      let data = {
        id: value,
        pageNum: 1,
        pageSize: 10,
      };
      await queryRcswJdbsz(data).then((res) => {
        this.form.yjsfjId = res.data[0].yjsfjId;
        this.form.bkfjId = res.data[0].bkfjId;
      });
      querywj({ businesId: value + "bk" }).then((res) => {
        this.form.bksfile = res.data;
        this.form.bksfile = this.form.bksfile.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
      querywj({ businesId: value + "yjs" }).then((res) => {
        this.form.yjsfile = res.data;
        this.form.yjsfile = this.form.yjsfile.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
      Exportwj({ id: this.form.bkfjId.toString() }).then((res) => {
        console.log("res", res);
        // console.log("typeofres", typeof res);
        this.form.bksfile = new File([res], this.form.bksfile[0].name, {
          type: "application/pdf",
          lastModified: Date.now(),
        });
        console.log("this.form.bksfile", this.form.bksfile);
      });
      Exportwj({ id: this.form.yjsfjId.toString() }).then((res) => {
        //this.url = window.URL.createObjectURL(res);
        this.form.yjsfile = new File([res], this.form.yjsfile[0].name, {
          type: "application/pdf",
          lastModified: Date.now(),
        });
        console.log("this.form.yjfile", this.form.yjsfile);
        //this.downloadFn(res, row.bkfileName);
      });
    },
    formfileChange(file, fileList, index) {
      //console.log("file", file);
      if (fileList.length > 1) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("最多允许上传1个文件");
      } else if (fileList.length > 0) {
        if (Number(file.size / 1024 / 1024) > 2) {
          let uid = file.uid;
          let idx = fileList.findIndex((item) => item.uid === uid);
          fileList.splice(idx, 1);
          this.$message.error("单个文件大小不得超过2M");
        } else if (file.status == "ready") {
          // this.form.fileListAdd = [];
          // this.form.fileListAdd.push(file);
          // if (index == 1) {
          //   this.form.fileListAdd[0] = file; //修改编辑的文件参数}
          //   this.isbks = 2;
          // } else {
          //   this.form.fileListAdd[1] = file;
          //   this.isyjs = 2;
          // }
        }
        if (index == 1) {
          this.form.bksfile = fileList;
          this.isbks = 2;
        } else {
          this.form.yjsfile = fileList;
          this.isyjs = 2;
        }
        console.log("file", this.form.bksfile);
      }
    },
    formfileRemove(file, fileList, index) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
      if (index == 1) {
        this.form.bksfile = fileList;
        this.isbks = 1;
      } else {
        this.form.yjsfile = fileList;
        this.isyjs = 1;
      }
      // console.log("fileList删除", this.fileList);
      // console.log("fileListAdd删除", this.fileListAdd);
    },
    handlePreview(file) {
      //用于文件下载
      Exportwj({ id: file.id.toString() }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, file.fileName, file.fileSuffix);
      });
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
        this.getList();
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },
    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "更新失败",
      });
    },
    beforeUpload(file, row, index) {
      if (index == 1 && row.bkfjId) {
        delwj({ businesId: row.bkId.toString() }).then((res) => {});
      } else if (index == 2 && row.yjsfjId) {
        delwj({ businesId: row.yjsId.toString() }).then((res) => {});
      }
    },
    thmb(row, index) {
      if (index == 1) {
        this.businesId = row.bkId;
      } else {
        this.businesId = row.yjsId;
      }
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
    .moban {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .inline-block {
        display: inline-block;
      }
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

