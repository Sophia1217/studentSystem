<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">矫正教育鉴定</p>
      </div>
      <!-- 学生本人基本情况 -->
      <div class="headline">学生信息</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ detailInfoData.xh }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ detailInfoData.xm }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ detailInfoData.xbmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">培养层次</div>
                <div class="content">
                  {{ detailInfoData.pyccmmc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">培养单位</div>
                <div class="content">
                  {{ detailInfoData.ssdwdmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">年级</div>
                <div class="content">
                  {{ detailInfoData.ssnj }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ detailInfoData.zydmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">班级</div>
                <div class="content">
                  {{ detailInfoData.bjmc }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 岗位信息 -->
      <div class="headline">岗位信息</div>
      <div class="tableStyle">
        <el-form :model="basicInfo">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="岗位名称" prop="gwMainMc">
                  {{ basicInfo.gwMainMc }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="岗位类型" prop="gwTypeMc">
                  {{ basicInfo.gwTypeMc }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="用人部门" prop="gwYrbmc">
                  {{ basicInfo.gwYrbmc }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="可接纳人数" prop="gwKjnrs">
                  {{ basicInfo.gwKjnrs }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="工作地点" prop="gwGzdd">
                  {{ basicInfo.gwGzdd }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="指导老师" prop="gwZdls">
                  {{ basicInfo.gwZdls }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系方式" prop="gwLxfs">
                  {{ basicInfo.gwLxfs }}
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="工作内容" prop="gwGznr">
                  {{ basicInfo.gwGznr }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="学时" prop="xs">
                  {{ basicInfo.xs }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="谈话总次数" prop="thcs">
                  {{ basicInfo.thcs }}次
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最早可结束时间" prop="zzkjssj">
                  {{ basicInfo.zzkjssj }}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <!-- 打卡记录 -->
      <div class="headline">
        <div>打卡记录</div>
      </div>
      <div class="tableStyle">
        已完成：{{ basicInfo.xsed }}学时 应完成：{{ basicInfo.xs }}学时
      </div>
      <!-- 谈话记录 -->
      <div class="headline">谈话记录</div>
      <div class="tableStyle">
        已完成：{{ basicInfo.thcsed }}次 应完成：{{ basicInfo.thcs }}次
      </div>
      <div class="headline">文本总结</div>
      <div class="tableStyle">
        <div class="inputArea" style="margin-bottom: 30px">
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="1000"
              show-word-limit
              v-model="wbzj"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="headline" v-if="isEdit == 1">审核信息</div>
      <div class="tableStyle" style="margin-bottom: 20px" v-if="isEdit == 1">
        <el-form :model="editDetails" ref="editDetails">
          <div class="information" style="margin-bottom: 20px">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item
                  label="审核结果"
                  label-width="120px"
                  prop="shjg"
                  :rules="rules.shjg"
                >
                  <el-select
                    v-model="editDetails.shjg"
                    @change="changeJG(editDetails.shjg)"
                    placeholder="请选择"
                    :disabled="isEdit == 2"
                  >
                    <el-option
                      v-for="item in shjgOps"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="审核意见" label-width="120px" prop="shyj">
                  <el-input
                    v-model="editDetails.shyj"
                    :autosize="{ minRows: 4 }"
                    type="textarea"
                    maxlength="500"
                    :readonly="isEdit == 2"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>

    <div class="editBottom">
      <div class="btn cancel" @click="lctClick">审核记录</div>
      <div class="btn cancel" @click="handleBack">返回</div>
      <div class="btn editIcon" v-show="isEdit == 1" @click="handlUpdata">
        确定
      </div>
    </div>

    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
    <el-dialog
      :title="conformText"
      :visible.sync="conformModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <span>确认{{ conformType }}？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="finalCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="finalConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { JzjyjdInfo } from "@/api/stuPunish/jzjyIdentify";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
import lctCom from "../../../components/lct";
import { jjFlow, tyFlow, htFlow } from "@/api/stuPunish/jzjyIdentify";
export default {
  components: { lctCom },
  data() {
    return {
      isEdit: this.$route.query.isEdit,
      tableInner: [],
      thTableModal: false,
      tempRadio: false,

      lctModal: false,

      xh: this.$route.query.xh,
      basicInfo: {},
      detailInfoData: {},
      wbzj: this.$route.query.wbzj,
      tableData: {},
      formEdit: {
        gwMainMc: "",
        gwTypeMc: "",
        gwKjnrs: "",
        gwGzdd: "",
        gwZdls: "",
        gwLxfs: "",
        gwGznr: "",
      },
      editDetails: {
        shyj: "",
        shjg: "",
      },
      conformModal: false,
      conformType: "",
      conformText: "",
      shjgOps: [
        { dm: "01", mc: "通过" },
        { dm: "02", mc: "拒绝" },
        { dm: "03", mc: "退回" },
      ],
      rules: {
        shjg: [
          { required: true, message: "审核结果不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getDetail();
    this.basicInfo = this.$route.query.bodyData;
    // this.formEdit = this.basicInfo.gwInfo;
  },
  methods: {
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
        }
      });
    },

    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick() {
      if (!!this.basicInfo.processId) {
        this.$refs.child.inner(this.basicInfo.processId);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    getDetail() {
      queryKnssqxsjbxx({ xh: this.xh }).then((res) => {
        this.detailInfoData = res.data;
      });
    },

    handleBack() {
      this.$router.go(-1);
    },
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.editDetails.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    handlUpdata() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
      } else {
        this.conformModal = true;
      }
    },
    changeJG(val) {
      if (val && val == "03") {
        var processid = { processId: this.basicInfo.taskId };
        this.conformType = "退回";
        this.conformText = "退回确认";
        backFlow(processid).then((res) => {
          this.tableInner = res.data;
        });
      } else if (val && val == "02") {
        this.conformType = "拒绝";
        this.conformText = "拒绝确认";
      } else {
        this.conformType = "同意";
        this.conformText = "同意确认";
      }
    },
    finalCancel() {
      this.conformModal = false;
    },
    finalConfirm() {
      var data = {
        businesId: this.basicInfo.id,
        processId: this.basicInfo.processId,
        taskId: this.basicInfo.taskId,
        xh: this.xh,
        status: this.basicInfo.status,
        opMsg: this.editDetails.shyj ? this.editDetails.shyj : "",
        // spje: this.formDetails1.spje ? this.formDetails1.spje : "",
        // actId: "",
        // actName: "",
      };
      if (this.conformType == "退回") {
        this.thTableModal = true;
        // data.actId = this.multipleSelection1.actId;
        // data.actName = this.multipleSelection1.actName;
        // htFlow([data]).then((res) => {
        //   this.conformModal = false;
        //   this.$router.go(-1);
        //   this.$message.success("已退回");
        // });
      } else if (this.conformType == "拒绝") {
        jjFlow([data]).then((res) => {
          this.conformModal = false;
          this.$router.go(-1);
          this.$message.success("已拒绝");
        });
      } else {
        data.opMsg = this.editDetails.shyj
          ? `审批意见：${this.editDetails.shyj}`
          : "";
        tyFlow([data]).then((res) => {
          this.conformModal = false;
          this.$router.go(-1);
          this.$message.success("已成功通过");
        });
      }
      this.conformModal = false;
    },
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
    thTableCancel() {
      this.thTableModal = false;
    },
    thTableConfirm() {
      if (!!this.tempRadio || this.tempRadio === 0) {
        this.thTableModal = false;
        this.thModal = true;
        let data = {
          businesId: this.basicInfo.id,
          processId: this.basicInfo.processId,
          taskId: this.basicInfo.taskId,
          xh: this.xh,
          status: this.basicInfo.status,
          opMsg: this.editDetails.shyj ? this.editDetails.shyj : "",
          actId: this.multipleSelection1.actId,
          actName: this.multipleSelection1.actName,
        };
        htFlow([data]).then((res) => {
          this.conformModal = false;
          this.$router.go(-1);
          this.$message.success("已退回");
        });
      } else {
        this.$message.error("请先勾选退回的节点");
      }
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
