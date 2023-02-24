<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">华中师范大学奖助学金申请表</p>
      </div>
      <div class="headline">学生本人基本情况</div>
      <div class="tableStyle">
        <!-- 本科基本情况 -->
        <div class="imgWrap" v-if="pyccflag == 1">
          <div class="photo">
            <img
              :src="
                detailInfoData
                  ? 'data:image/png;base64,' + detailInfoData.photo
                  : ''
              "
              alt="照片"
            />
          </div>
        </div>
        <div class="information" v-if="pyccflag == 1">
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ detailInfoData.xm }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ detailInfoData.xbMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">出生年月</div>
                <div class="content">
                  {{ detailInfoData.csny }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">政治面貌</div>
                <div class="content">
                  {{ detailInfoData.zzmmMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">民族</div>
                <div class="content">
                  {{ detailInfoData.mzMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ detailInfoData.xh }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学院</div>
                <div class="content">
                  {{ detailInfoData.dwMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ detailInfoData.zyMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">年级</div>
                <div class="content">
                  {{ detailInfoData.nj }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">生源地</div>
                <div class="content">
                  {{ detailInfoData.sydMc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">联系电话</div>
                <div class="content">
                  {{ detailInfoData.lxfs }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">英语四六级分数</div>
                <div class="content">
                  <div>{{ formAdd.yysljfs }}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">困难等级</div>
                <div class="content">
                  {{ detailInfoData.kndjMc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">本学年学习成绩</div>
                <div class="content">
                  平均学分绩：{{ detailInfoData.pjxfj }} 必修课：{{
                    detailInfoData.bxkms
                  }}门，通过：{{ detailInfoData.bxktgms }}门 成绩排名：{{
                    detailInfoData.cjpm
                  }}
                  综合排名名次：{{ detailInfoData.cjpm }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 研究生基本信息 -->
        <div class="information" v-if="pyccflag == 2">
          <el-row :gutter="20">
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ detailInfoData.xm }}
                </div>
              </div>
            </el-col>
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ detailInfoData.xh }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">培养单位</div>
                <div class="content">
                  {{ detailInfoData.dwMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ detailInfoData.zyMc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">硕/博</div>
                <div class="content">
                  {{ detailInfoData.pyccMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ detailInfoData.xbMc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">导师姓名</div>
                <div class="content">
                  {{ detailInfoData.dsXm }}
                </div>
              </div>
            </el-col>
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">导师联系方式</div>
                <div class="content">
                  {{ detailInfoData.dsLxfs }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">政治面貌</div>
                <div class="content">
                  {{ detailInfoData.zzmmMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">本人联系方式</div>
                <div class="content">
                  {{ detailInfoData.lxfs }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="headline top">申请信息</div>
      <el-form :model="formAdd" ref="formAdd" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="奖助类别" label-width="110px" prop="jzlbm">
              <div>{{ formAdd.jzlbMc }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="申请项目" label-width="110px" prop="zzxmId">
              <div>{{ formAdd.zzxmmc }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="申请等级" label-width="110px" prop="sqdjId">
              <div>{{ formAdd.sqdj }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="评奖周期">
              <div>
                {{ (formAdd.pjxn || "") + " " + (formAdd.pjxqMc || "") }}
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="申请人自述">
              <div>{{ formAdd.sqrzs }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="headline" v-if="editFlag == 2">审核信息</div>
      <el-form
        :model="editDetails"
        ref="editDetails"
        label-width="110px"
        :rules="rules"
        v-if="editFlag == 2"
      >
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="审核结果" label-width="120px" prop="shjg">
              <el-select
                v-model="editDetails.shjg"
                v-if="editFlag == 2"
                collapse-tags
                @change="changeJG"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in shjgOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
              <!-- <div v-else>{{ formAdd.statusChinese }}</div> -->
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="推荐等级" label-width="120px">
              <el-select
                v-model="editDetails.tjdjId"
                collapse-tags
                v-if="editFlag == 2"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in tjdjOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
              <!-- <div v-else>{{ formAdd.tjdjmc }}</div> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="审核意见" label-width="120px" prop="shyj">
              <el-input
                v-model="editDetails.shyj"
                v-if="editFlag == 2"
                :autosize="{ minRows: 2 }"
                type="textarea"
                maxlength="500"
              />
              <!-- <div v-else>{{ formAdd.statusChinese }}</div> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="editBottom">
      <div class="btn cancel" @click="handleCancle">取 消</div>
      <div class="btn confirm" v-if="editFlag == 2" @click="handlUpdata">确 定</div>
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
    <el-dialog title="退回理由" :visible.sync="thModal" width="30%">
      <template>
        <el-input placeholder="请输入退回理由" v-model="thly"></el-input>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="thCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="thConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDetail, queryAllDj } from "@/api/awardSubsidy/stu";
import { tyFlow, jjFlow, thFinal } from "@/api/awardSubsidy/jzsqTea";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  data() {
    return {
      editFlag: this.$route.query.editFlag, //1已审核详情，2待审核详情
      businesId: this.$route.query.businesId,
      status: this.$route.query.status,
      activeName: "0",
      detailInfoData: {},
      pxjbmOps: [], //培训级别码
      tableData: {},
      pyccflag: 1, //1本科2硕博
      formAdd: {
        yysljfs: "",
        pjxn: "",
        pjxqm: "",
        jzlbm: "",
        zzxmId: "",
        sqdjId: "",
        sqrzs: "",
      },
      formTable: {
        jxList: [
          //奖项
          { jx: "", jxmc: "", bjdw: "" },
        ],
        lwList: [
          //论文
          { jx: "", jxmc: "", bjdw: "" },
        ],
        kycgList: [
          //科研成果
          { jx: "", jxmc: "", bjdw: "" },
        ],
        shsjList: [
          //社会实践
          { jx: "", jxmc: "", bjdw: "" },
        ],
        ddwtList: [
          //道德文体
          { jx: "", jxmc: "", bjdw: "" },
        ],
        kycgYanList: [
          //科研成果（研）
          { jx: "", jxmc: "", bjdw: "" },
        ],
        hjqkYanList: [
          //获奖情况
          { jx: "", jxmc: "", bjdw: "" },
        ],
      },
      jzlbOps: [
        { dm: "1", mc: "奖学金" },
        { dm: "2", mc: "助学金" },
      ],
      tjdjOps: [],
      editDetails: {},
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      shjgOps: [
        { dm: "01", mc: "通过" },
        { dm: "02", mc: "拒绝" },
        { dm: "03", mc: "退回" },
      ],
      rules: {
        yysljfs: [
          {
            required: true,
            message: "英语四六级不能为空",
            trigger: "blur",
          },
        ],
        jzlbm: [
          {
            required: true,
            message: "奖助类别不能为空",
            trigger: "change",
          },
        ],
        zzxmId: [
          {
            required: true,
            message: "申请项目不能为空",
            trigger: "change",
          },
        ],
        sqdjId: [
          { required: true, message: "申请等级不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    // this.getCode("dmpxjbm");
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
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmpxjbm":
            this.pxjbmOps = res.data;
            break;
        }
      });
    },
    getDetail() {
      //详情
      // this.isEdit = 1;
      console.log("id有值");
      getDetail({ businesId: this.businesId }).then((res) => {
        this.detailInfoData = res.data;
        this.formAdd = res.data;
        queryAllDj({ zzxmId: res.data.zzxmId }).then((res) => {
          this.tjdjOps = res.data;
        });
      });
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleCancle() {
      this.$router.go(-1);
    },
    async handlUpdata() {
      if (!this.editDetails.shjg || !this.editDetails.tjdjId) {
        this.$message.error("审核结果和推荐等级不能为空");
      } else {
        if (this.editDetails.shjg == "01") {
          var data = {
            businesId: this.$route.query.businesId,
            processId: this.$route.query.processId,
            status: this.$route.query.status,
            taskId: this.$route.query.taskId,
            xh: this.$route.query.xh,
            tjdjId: this.editDetails.tjdjId,
            opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已通过",
          };
          //通过
          tyFlow([data]).then((res) => {
            this.$message.success("审核已通过");
            this.multiModal = false;
            this.$router.go(-1);
          });
        } else if (this.editDetails.shjg == "02") {
          var data = {
            businesId: this.$route.query.businesId,
            processId: this.$route.query.processId,
            status: this.$route.query.status,
            taskId: this.$route.query.taskId,
            xh: this.$route.query.xh,
            opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已拒绝",
          };
          //拒绝
          jjFlow([data]).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("已拒绝");
              this.multiModal = false;
              this.$router.go(-1);
            }
          });
        } else {
          var data = {
            businesId: this.$route.query.businesId,
            processId: this.$route.query.processId,
            status: this.$route.query.status,
            taskId: this.$route.query.taskId,
            xh: this.$route.query.xh,
            opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已退回",
            actId: this.multipleSelection1.actId,
            actName: this.multipleSelection1.actName,
          };
          thFinal([data]).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("退回成功");
              this.multiModal = false;
              this.$router.go(-1);
            }
          });
        }
      }
    },
    changeJG(val) {
      console.log("taskId", this.$route.query.taskId);
      if (val && val == "03") {
        // console.log("this.editDetails.shjg", this.editDetails.shjg);
        var processId = { processId: this.$route.query.taskId };
        backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      }
    },
    getRow(index, row) {
      this.multipleSelection1 = row;
      console.log(row);
    },
    thTableCancel() {
      this.thTableModal = false;
      this.editDetails.shjg = "";
    },
    thTableConfirm() {
      if (!!this.tempRadio || this.tempRadio === 0) {
        this.thTableModal = false;
        this.thModal = true;
      } else {
        this.$message.error("请先勾选退回的节点");
      }
    },
    thCancel() {
      this.thModal = false;
    },
    thConfirm() {
      this.thModal = false;
      var data = this.commonParams.map((item) => ({
        ...item,
        opMsg: this.thly,
        actId: this.multipleSelection1.actId,
        actName: this.multipleSelection1.actName,
      }));
      thFinal(data).then((res) => {
        if (res.errcode == "00") {
          this.detailModal = false;
          this.$message.success("退回成功");
          this.handleSearch();
        }
      });
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
    .top {
      padding-bottom: 10px;
    }
    .baseline {
      padding-left: 20px;
      padding-top: 10px;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 16px;
      color: #000;
      line-height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
.jia {
  margin-top: 9px;
  background: url("~@/assets/images/jia.png") no-repeat;
}

.jian {
  margin-top: 9px;
  background: url("~@/assets/images/jian.png") no-repeat;
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
</style>
