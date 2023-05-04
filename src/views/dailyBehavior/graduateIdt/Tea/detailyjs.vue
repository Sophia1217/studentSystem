<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">华中师范大学毕业生鉴定表</p>
        <!-- <div class="timeWrap">
          <span class="updataTime"
            >创建时间：{{ formatDate(tableData.createTime) }}</span
          >
          <span class="updataTime"
            >更新时间：{{ formatDate(tableData.updataTime) }}</span
          >
        </div> -->
      </div>
      <!-- 学生本人基本情况 -->
      <!-- <div class="headline">学生本人基本情况</div> -->
      <el-form :model="formAdd" ref="formAdd" size="small" :rules="rules">
        <div class="tableStyle">
          <div class="imgWrap">
            <div class="photo">
              <img
                :src="
                  detailInfoData
                    ? 'data:image/png;base64,' + detailInfoData.byzp
                    : ''
                "
                alt="照片"
              />
            </div>
          </div>
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    {{ detailInfoData.xm }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div class="content">
                    {{ detailInfoData.xbmc }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生年月</div>
                  <div class="content">
                    {{ detailInfoData.csrq }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">籍贯</div>
                  <div class="content">
                    {{ detailInfoData.jgmc }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div class="content">
                    {{ detailInfoData.mzmc }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>

                  <div class="content">
                    {{ detailInfoData.brcf }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 获奖情况 -->
        <div class="headline" style="margin-top: 40px">
          <div>获奖情况</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="hjsj" label="时间"> </el-table-column>
            <el-table-column prop="jxjmc" label="名称"> </el-table-column>
            <el-table-column prop="sldw" label="奖励单位"> </el-table-column>
          </el-table>
        </div>
        <!-- 科研情况 -->
        <div class="headline">
          <div>科研情况</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData2" style="width: 100%">
            <el-table-column prop="xxsj" label="时间"> </el-table-column>
            <el-table-column prop="jlxq" label="成果名称及作者排序">
            </el-table-column>
            <el-table-column prop="zmrxq" label="发表刊物或机构">
            </el-table-column>
          </el-table>
        </div>
        <!-- 实践情况 -->
        <div class="headline">
          <div>实践情况</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData3" style="width: 100%">
            <el-table-column prop="sj" label="时间"> </el-table-column>
            <el-table-column prop="gzgw" label="内容"> </el-table-column>
            <el-table-column prop="sjdd" label="地点 "></el-table-column>
          </el-table>
        </div>

        <!-- 本人建立 -->
        <div class="headline">
          <div>本人简历</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData4" style="width: 100%">
            <el-table-column prop="xxsj" label="起止年月">
              <template slot-scope="scope">
                <div>{{ scope.row.kssj }}至{{ scope.row.jssj }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="gzdw" label="学习或工作单位">
              <template slot-scope="scope">
                <div>{{ scope.row.gzdw }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="crdzzwmc" label="职务">
              <template slot-scope="scope">
                <div>{{ scope.row.crdzzwmc }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 实践情况 -->
        <div class="headline">
          <div>主要家庭成员及社会关系</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData5" style="width: 100%">
            <el-table-column prop="gxmc" label="关系"> </el-table-column>
            <el-table-column prop="cyxm" label="姓名"> </el-table-column>
            <el-table-column prop="csny" label="出生年月 "></el-table-column>
            <el-table-column prop="zzmmm" label="政治面貌 "></el-table-column>
            <el-table-column
              prop="gzdwjzw"
              label="工作单位及职务 "
            ></el-table-column>
          </el-table>
        </div>
        <div class="tableStyle">
          <div class="inputArea">
            <el-form-item :rules="rules.blank" prop="zwjd">
              <div class="title">自我鉴定</div>
              <div class="content">
                <el-input
                  type="textarea"
                  :rows="5"
                  maxlength="1500"
                  show-word-limit
                  v-model="formAdd.zwjd"
                  readonly
                />
              </div>
            </el-form-item>
            <div class="title">研究生导师意见</div>
            <div class="content">
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                show-word-limit
                v-model="formAdd.bzjd"
                placeholder="导师审核时需要填写"
                :readonly="flag != 1 || isEdit != 2"
              />
            </div>
            <div class="title">研究生培养单位意见</div>
            <div class="content">
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                show-word-limit
                v-model="formAdd.ydzzyj"
                placeholder="培养单位审核时需要填写"
                :readonly="flag != 2 || isEdit != 2"
              />
            </div>
          </div>
          <div style="padding: 30px"></div>
        </div>
      </el-form>
    </div>

    <!-- <div class="editBottom" v-show="isEdit == 1">
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div> -->
    <div class="editBottom">
      <div class="btn cancel" @click="lctClick">审核记录</div>
      <div class="btn cancel" v-if="isEdit == 2" @click="thClick">退回</div>
      <!-- <div class="btn cancel" v-if="isEdit == 2" @click="jjClick">拒绝</div> -->
      <div class="btn editIcon" v-if="isEdit == 2" @click="tjClick">通过</div>

      <div class="btn cancel" @click="handleBack">返回</div>
    </div>
    <el-dialog title="退回选择" :visible.sync="thTableModal" width="20%">
      <template>
        <el-table
          :data="tableInner"
          ref="multipleTable1"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column width="55">
            <template slot-scope="scope">
              <el-radio
                :label="scope.$index"
                v-model="tempRadio"
                @change.native="getRow(scope.$index, scope.row)"
                >{{ "" }}</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="actName" label="节点名称" sortable="custom">
          </el-table-column>
        </el-table>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="thTableCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="thTableConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>
<script>
import {
  getXsJbxx,
  getByjdYjsDetail,
  byjdCxById,
  tjByjd,
  updateByjdDetailYjs,
  htFlow,
  jjFlow,
  tyFlow,
} from "@/api/dailyBehavior/graduationIdt";
import lctCom from "../../../components/lct";
import { backFlow } from "@/api/dailyBehavior/dormTea";
import topTitle from "../../../components/topTitle";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  components: { lctCom, topTitle },
  data() {
    return {
      formAdd: {},
      isEdit: this.$route.query.isEdit,
      nd: "",
      xh: this.$route.query.xh,
      activeName: "0",
      detailInfoData: {},
      routeTitle: "毕业生鉴定表",
      njOptions: [],
      zzmmOps: [],
      formAdd: {
        bzjd: "",
        ydzzyj: "",
        zwjd: "",
      },

      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      lctModal: false,
      chehuiModal: false,
      submitModal: false,
      thTableModal: false,
      tempRadio: false,
      tableInner: [],
      flag:
        this.$store.getters.roleId == "08"
          ? 1
          : this.$store.getters.roleId == "06"
          ? 2
          : 3, //1为班主任2为辅导员
      rules: {
        blank: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {
    this.getCode("dmlwkwjbm");
    this.getCode("dmpxjbm");
    this.getDetail();
  },
  methods: {
    // 表单校验
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    dayin() {
      console.log(this.checked);
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmzzmmm":
            this.zzmmOps = res.data;
            break;
        }
      });
    },
    deleteWorkBrifeData(row, index) {
      this.tableData.splice(index, 1);
    },

    editButtonClick() {
      this.isEdit = 1;
    },
    getDetail() {
      getByjdYjsDetail({ xh: this.xh }).then((res) => {
        console.log(res);
        this.detailInfoData = res.data.rcswByjdJbxxYjsRes;
        this.formAdd = res.data;

        this.tableData1 = res.data.czdaJxjRes || [];
        this.tableData2 = res.data.rcswBjjdLwqkRes || [];
        this.tableData3 = res.data.rcswByjdShsjRes || [];
        this.tableData4 = res.data.rcswByjdBrjlYjsRes || [];
        this.tableData5 = res.data.rcswByjdJtcygxYjsRes || [];
      });
    },

    handleBack() {
      this.$router.go(-1);
    },
    handleCancle() {
      this.isEdit = 2;
      this.$refs.formAdd.clearValidate();
    },

    tjClick() {
      if (this.flag == 1 && !this.formAdd.bzjd) {
        this.$message.error("导师意见不能为空！");
      } else if (this.flag == 2 && !this.formAdd.ydzzyj) {
        this.$message.error("研究生培养单位意见不能为空！");
      } else {
        var data = {
          businesId: this.formAdd.id,
          processId: this.formAdd.processid,
          status: this.formAdd.status,
          taskId: this.$route.query.taskId,

          opMsg:
            this.flag == 1
              ? this.formAdd.bzjd
              : this.flag == 2
              ? this.detailInfoData.ydzzyj
              : "已通过",
        };
        //通过

        tyFlow(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("审核已通过");
            this.$router.go(-1);
          }
        });
      }
    },
    jjClick() {
      // if (this.flag == 1 && !this.detailInfoData.bzjd) {
      //   this.$message.error("班组鉴定结果不能为空！");
      // } else if (this.flag == 2 && !this.detailInfoData.ydzzyj) {
      //   this.$message.error("院系党组织意见不能为空！");
      // } else {
      var data = {
        businesId: this.formAdd.id,
        processId: this.formAdd.processid,
        status: this.formAdd.status,
        taskId: this.$route.query.taskId,

        opMsg:
          this.flag == 1
            ? this.formAdd.bzjd
            : this.flag == 2
            ? this.formAdd.ydzzyj
            : "已拒绝",
      };
      //拒绝
      jjFlow(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("已拒绝");
          this.$router.go(-1);
        }
      });
      // }
    },
    thClick() {
      // if (this.flag == 1 && !this.detailInfoData.bzjd) {
      //   this.$message.error("班组鉴定结果不能为空！");
      // } else if (this.flag == 2 && !this.detailInfoData.ydzzyj) {
      //   this.$message.error("院系党组织意见不能为空！");
      // } else {
      var processId = { processId: this.$route.query.taskId };
      backFlow(processId).then((res) => {
        this.tableInner = res.data;
      });
      this.thTableModal = true;
      // }
    },
    thTableCancel() {
      this.thTableModal = false;
    },
    thTableConfirm() {
      if (!!this.tempRadio || this.tempRadio === 0) {
        var data = {
          businesId: this.formAdd.id,
          processId: this.formAdd.processid,
          status: this.formAdd.status,
          taskId: this.$route.query.taskId,

          opMsg:
            this.flag == 1
              ? this.formAdd.bzjd
              : this.flag == 2
              ? this.formAdd.ydzzyj
              : "已退回",
          actId: this.multipleSelection1.actId,
          actName: this.multipleSelection1.actName,
        };
        htFlow(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("退回成功");
            this.thTableModal = false;
            this.$router.go(-1);
          }
        });
      } else {
        this.$message.error("请先勾选退回的节点");
      }
    },
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
    lctClick() {
      if (!!this.formAdd.processid) {
        this.$refs.child.inner(this.formAdd.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("数据未保存，不能提交！");
      }
    },
    handleCloseLct() {
      this.lctModal = false;
    },
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
      .imgWrap {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 100;
        .photo {
          width: 160px;
          height: 206px;
          background: #fff;
          overflow: hidden;
          img {
            width: 160px;
            height: 206px;
          }
        }
      }
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
