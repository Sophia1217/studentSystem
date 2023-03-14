<template>
  <div class="wrap">
    <!-- 基本情况 -->

    <div class="detail_right">
      <el-form :model="formEdit" ref="formEdit" size="small">
        <div class="headline">岗位信息</div>
        <div class="tableStyle">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="岗位名称" prop="gwMainMc" label-width="100px"
                ><div>{{ formEdit.gwMainMc }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="岗位性质" prop="gwType" label-width="100px"
                ><div>{{ formEdit.gwTypeMc }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用人部门" prop="gwYrbm" label-width="100px">
                {{ formEdit.gwYrbmc }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="岗位起止时间"
                prop="gwTime"
                label-width="120px"
                ><div>{{ formEdit.gwStartDate }}至{{ formEdit.gwEndDate }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="学年" prop="xn" label-width="120px">
                <div>{{ formEdit.xn }}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="tableStyle">
          <el-table
            :data="formEdit.detailList"
            ref="multipleTable"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="gwDetailMc" label="岗位" :min-width="200">
              <template slot-scope="scope">
                <div>{{ scope.row.gwDetailMc }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="gwGzdd" label="工作地点" :min-width="200">
              <template slot-scope="scope">
                <div>{{ scope.row.gwGzdd }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="gwYcjbz"
              label="月酬金标准(元)"
              sortable="custom"
              :min-width="230"
            >
              <template slot-scope="scope">
                {{ scope.row.gwYcjbz }}
              </template>
            </el-table-column>
            <el-table-column
              prop="gwNjyxc"
              label="年建议薪酬(元)"
              :min-width="230"
            >
              <template slot-scope="scope">
                {{ scope.row.gwNjyxc }}
              </template>
            </el-table-column>
            <el-table-column
              prop="gwNzxsrs"
              label="拟招学生人数"
              :min-width="230"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.gwNzxsrs }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="gwKnss" label="困难生数" :min-width="230">
              <template slot-scope="scope">
                <div>{{ scope.row.gwKnss }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="gwZdls" label="指导老师" :min-width="200">
              <template slot-scope="scope">
                <div>{{ scope.row.gwZdls }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="gwLxfs" label="联系方式" :min-width="200">
              <template slot-scope="scope">
                <div>{{ scope.row.gwLxfs }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="tableStyle">
          <el-form-item label="岗位描述" prop="gwMs">
            <el-input
              type="textarea"
              v-model="formEdit.gwMs"
              :rows="5"
              show-word-limit
              maxlength="500"
              readonly
            />
          </el-form-item>

          <el-form-item label="岗位人员要求" prop="gwRyyq">
            <el-input
              type="textarea"
              v-model="formEdit.gwRyyq"
              :rows="5"
              show-word-limit
              maxlength="500"
              readonly
            />
          </el-form-item>

          <el-form-item label="备注" prop="gwRemark">
            <el-input
              type="textarea"
              v-model="formEdit.gwRemark"
              :rows="5"
              show-word-limit
              maxlength="500"
              readonly
            />
          </el-form-item>
        </div>
      </el-form>
      <!-- 学生本人基本情况 -->
      <div v-if="isEdit != 3">
        <div class="headline">申请人信息</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="6" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div class="content">
                    {{ basicInfo.xh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="6" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    {{ basicInfo.xm }}
                  </div>
                </div>
              </el-col>

              <el-col :span="6" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div class="content">
                    {{ basicInfo.xbmc }}
                  </div>
                </div>
              </el-col>
              <el-col :span="6" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养层次</div>
                  <div class="content">
                    {{ basicInfo.pyccmc }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养单位</div>
                  <div class="content">
                    {{ basicInfo.dwhmc }}
                  </div>
                </div>
              </el-col>
              <el-col :span="6" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <div class="content">
                    {{ basicInfo.zydmmc }}
                  </div>
                </div>
              </el-col>
              <el-col :span="6" class="rowStyle">
                <div class="wrap">
                  <div class="title">年级</div>
                  <div class="content">
                    {{ basicInfo.ssnj }}
                  </div>
                </div>
              </el-col>
              <el-col :span="6" class="rowStyle">
                <div class="wrap">
                  <div class="title">班级</div>
                  <div class="content">
                    {{ basicInfo.bjmmc }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="headline2">
          <div>上岗时间</div>
        </div>
        <div class="tableStyle">
          <el-date-picker
            v-model="detailInfoData.sgsj"
            type="date"
            value-format="yyyy-MM-dd"
            clearable
            :disabled="isEdit == 2"
          />
        </div>
        <div class="headline2">
          <div>学生空余时间</div>
        </div>
        <div class="tableStyle">
          <el-table
            :data="detailInfoData.xskysjList"
            style="width: 100%"
            stripe
          >
            <el-table-column fixed="left" width="100">
              <template slot-scope="scope">
                {{ 2 * (scope.$index + 1) - 1 }}-{{ 2 * (scope.$index + 1) }}
              </template>
            </el-table-column>
            <el-table-column prop="Mon" label="星期一" width="180">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.Mon"
                  size="large"
                  :disabled="isEdit == 2"
                />
              </template>
            </el-table-column>
            <el-table-column prop="Tues" label="星期二" width="180">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.Tues"
                  size="large"
                  :disabled="isEdit == 2"
                />
              </template>
            </el-table-column>
            <el-table-column prop="Wed" label="星期三" width="180">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.Wed"
                  size="large"
                  :disabled="isEdit == 2"
                />
              </template>
            </el-table-column>
            <el-table-column prop="Thur" label="星期四" width="180">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.Thur"
                  size="large"
                  :disabled="isEdit == 2"
                />
              </template>
            </el-table-column>
            <el-table-column prop="Fri" label="星期五" width="180">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.Fri"
                  size="large"
                  :disabled="isEdit == 2"
                />
              </template>
            </el-table-column>
            <el-table-column prop="Sat" label="星期六" width="180">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.Sat"
                  size="large"
                  :disabled="isEdit == 2"
                />
              </template>
            </el-table-column>
            <el-table-column prop="Sun" label="星期日" width="180">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.Sun"
                  size="large"
                  :disabled="isEdit == 2"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="headline2">
          <div>申请理由</div>
        </div>
        <div class="tableStyle">
          <el-input
            type="textarea"
            :rows="5"
            maxlength="500"
            v-model="detailInfoData.sqly"
            :readonly="isEdit == 2"
          />
        </div>
        <div class="headline2">
          <div>研究生三助协议书</div>
        </div>
        <div class="tableStyle">
          <!-- <el-upload
            action="#"
            multiple
            class="el-upload"
            :auto-upload="false"
            ref="upload"
            :file-list="SHfileList"
            :show-file-list="true"
            :on-change="fileChange"
            accept=".pdf,.jpg"
            :before-remove="beforeRemove"
            disabled
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload> -->
          <div v-for="(item, index) in SHfileList" :key="index">
            <el-button type="text" size="small" @click="xzWj(item)">
              <span class="handleName">{{ item.fileName }}</span>
            </el-button>
          </div>
          <div style="padding: 30px">
            <el-checkbox
              v-model="checked"
              label="我已知晓以上所有内容并同意"
              :disabled="isEdit == 2"
            />
          </div>
        </div>
      </div>
      <div v-if="isEdit == 2" class="editBottom">
        <div class="btn cancel" @click="handleBack">返回</div>
        <div class="btn cancel" @click="lctClick">审核记录</div>
        <div class="btn editIcon" @click="editButtonClick">编辑</div>
      </div>

      <div v-if="isEdit == 1" class="editBottom">
        <div class="btn cancel" @click="handleCancle">取消</div>
        <div class="btn confirm" @click="handlUpdata">保存</div>
      </div>
      <lctCom
        ref="child"
        :lctModal="lctModal"
        @handleCloseLct="handleCloseLct"
      ></lctCom>
    </div>
  </div>
</template>
<script>
import { delwj } from "@/api/assistantWork/classEvent";
import lctCom from "../../components/lct";
import topTitle from "../../components/topTitle";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryQgzxGwYjsById } from "@/api/thrift/qgzxgwYjs";
import { getbascic } from "@/api/dailyBehavior/xnxjStu";
import { insertQgzxXssq, getQgzxXssqDetail } from "@/api/thrift/applyYjs";
import { delFile, downloadFile, queryFile } from "@/api/common/file";
import { queryDNew } from "@/api/gwsz/gwsz";
export default {
  components: { lctCom, topTitle },
  data() {
    return {
      isEdit: this.$route.query.isEdit,
      routeTitle: "",
      lctModal: false,
      xh: this.$store.getters.userId,
      activeName: "0",
      detailInfoData: {
        xskysjList: [
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
        ],
      },
      tableData: {},
      basicInfo: {},
      formEdit: {},
      checked: false,
      fileList: [],
      fileListAdd: [],
      SHfileList: [],
    };
  },
  created() {},
  mounted() {
    this.getDetail();
    this.routeTitle = this.$route.meta.title;
  },
  methods: {
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmlwkwjbm":
            this.lwjbmOps = res.data;
            break;
          case "dmpxjbm":
            this.pxjbmOps = res.data;
            break;
        }
      });
    },
    indexMethod() {
      return ["1-2", "3-4", "5-6", "7-8", "9-10"];
    },
    lctClick() {
      if (!!this.detailInfoData.processid) {
        this.$refs.child.inner(this.detailInfoData.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("数据未保存，不能提交！");
      }
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    editButtonClick() {
      this.isEdit = 1;
    },
    getDetail() {
      queryQgzxGwYjsById({ id: this.$route.query.gwid }).then((res) => {
        // this.detailList = res.data.detailList;
        this.formEdit = res.data;
        this.$set(this.formEdit, "gwTime", [
          res.data.gwStartDate,
          res.data.gwEndDate,
        ]);
      });
      getbascic({ xh: this.$store.getters.userId }).then((res) => {
        this.basicInfo = res.data;
      });
      if (this.isEdit == 2) {
        getQgzxXssqDetail({ id: this.$route.query.id }).then((res) => {
          this.$set(this.detailInfoData, "sqly", res.data.sqly);
          this.$set(this.detailInfoData, "sgsj", res.data.sgsj);
          this.$set(this.detailInfoData, "id", res.data.id);
          this.$set(this.detailInfoData, "processid", res.data.processid);
          this.$set(this.detailInfoData, "xskysjList", res.data.xskysjListRes);
          console.log(this.detailInfoData.xskysjList);
        });
      }
      queryDNew().then((res) => {
        queryFile({ businesId: res.data.id }).then((res) => {
          this.SHfileList = res.data;
        });
      });
      //
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleCancle() {
      if (this.$route.query.isApply) {
        this.$router.go(-1);
      } else this.isEdit = 2;
    },

    handlUpdata() {
      if (!this.detailInfoData.sqly) {
        this.$message.error("请填写申请理由!");
      } else if (!this.detailInfoData.sgsj) {
        this.$message.error("请填写上岗时间!");
      } else if (!this.checked) {
        this.$message.error("请勾选同意书!");
      } else {
        let data = {
          gwId: this.formEdit.detailList[0].id,

          sgsj: this.detailInfoData.sgsj,
          sqly: this.detailInfoData.sqly,
          id: this.detailInfoData.id,
          xskysjList: this.detailInfoData.xskysjList,
        };
        insertQgzxXssq(data)
          .then((res) => {
            this.$message.success("保存成功");
            this.getDetail();
            this.$router.go(-1);
          })
          .catch((err) => {});
      }
      //}
    },
    xzWj(item) {
      downloadFile({ id: item.id }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, item.fileName);
      });
    },
    // beforeRemove(file, fileList) {
    //   let uid = file.uid;
    //   let idx = fileList.findIndex((item) => item.uid === uid);
    //   fileList.splice(idx, 0);
    //   this.fileList = fileList;
    //   if (file.id) {
    //     //如果是后端返回的文件就走删除接口，不然前端自我删除
    //     delwj({ id: file.id.toString() }).then();
    //   }
    // },
    // fileChange(file, fileList) {
    //   if (Number(file.size / 1024 / 1024) > 2) {
    //     let uid = file.uid;
    //     let idx = fileList.findIndex((item) => item.uid === uid);
    //     fileList.splice(idx, 1);
    //     this.$message.error("单个文件大小不得超过2M");
    //   } else if (file.status == "ready") {
    //     this.fileListAdd = [];
    //     this.fileListAdd.push(file); //修改编辑的文件参数
    //   }
    //   this.fileList = fileList;
    // },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: row;
  .detail_right {
    flex: 1;
    background: #fff;
    padding: 30px;
    margin-bottom: 20px;
    .right_top {
      .toptitle {
        text-align: center;
        font-weight: 500;
        font-size: 24px;
        color: #005657;
        line-height: 24px;
      }
      .timeWrap {
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        color: #383838;
        line-height: 28px;
        .updataTime {
          margin-left: 20px;
        }
      }
    }
    .headline {
      padding-left: 20px;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 20px;
      color: #000;
      line-height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .editBtn {
        padding: 4px 5px;
        margin-right: 20px;
        // border: 1px solid #005657;
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        color: #005657;
        cursor: pointer;
        .addIcon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/arrowDown.png") no-repeat;
          vertical-align: middle;
          margin-bottom: 4px;
        }
      }
    }

    .tableStyle {
      position: relative;
      padding: 20px;
      .information {
        padding: 0 20px;
        .rowStyle {
          padding: 0 !important;
          margin: 0;
          border-bottom: 1px solid #cccccc;
        }
        .wrap {
          display: flex;
          align-items: center;
          .title {
            flex: 0 0 200px;
            line-height: 48px;
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
            margin: 0 !important;
          }
          .content {
            font-weight: 400;
            font-size: 14px;
            color: #1f1f1f;
            line-height: 22px;
            margin-left: 16px;
          }
        }
      }
      .pieceName {
        box-sizing: border-box;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        font-size: 18px;
        color: #1f1f1f;
        line-height: 28px;
      }
      .inputArea {
        display: flex;
        flex-direction: column;
        //align-items: center;
        .title {
          //   flex: 0 0 160px;
          //   line-height: 48px;
          //   background: #e0e0e0;
          //   text-align: right;
          //   padding-right: 5px;
          //   margin: 0 !important;
          font-weight: 400;
          font-size: 16px;
          color: #1f1f1f;
          line-height: 22px;
          margin: 16px;
          text-align: left;
        }
        .content {
          .cishu {
            margin-bottom: 10px;
          }
        }
      }
      .tableArea {
        padding-right: 20px;
        padding-left: 20px;
      }
    }
  }

  .editBottom {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 -2px 6px -1px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn {
      width: 84px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #005657;
      border-radius: 2px;
      margin-right: 20px;
    }
    .cancel {
      color: #005657;
    }
    .confirm {
      background: #005657;
      color: #fff;
    }
    .editIcon {
      background: #005657;
      color: #fff;
      // background: url('~@/assets/images/icon_edit_white.png');
    }
  }
}
</style>
