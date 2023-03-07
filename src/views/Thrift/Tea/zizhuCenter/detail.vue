<template>
  <div>
    <div class="tableWrap mt15">
      <el-form :model="formEdit" ref="formEdit" size="small" :rules="rules">
        <div class="headerTop">
          <div class="headerLeft">
            <span class="title">岗位信息</span>
          </div>
        </div>
        <div class="headerTop">
          <div class="headerLeft">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="岗位名称"
                  prop="gwMainMc"
                  label-width="100px"
                  ><div>{{ formEdit.gwMainMc }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="岗位性质" prop="gwType" label-width="100px"
                  ><div>{{ formEdit.gwTypeMc }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="用人部门"
                  prop="gwYrbm"
                  label-width="100px"
                >
                  {{ formEdit.gwYrbm }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="岗位起止时间"
                  prop="gwTime"
                  label-width="120px"
                  ><div>
                    {{ formEdit.gwStartDate }}至{{ formEdit.gwEndDate }}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学年" prop="xn" label-width="120px">
                  <div>{{ formEdit.xn }}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="table">
          <el-table
            :data="detailList"
            ref="multipleTable"
            style="width: 100%"
            @sort-change="changeTableSort"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="gwDetailMc" label="岗位" :min-width="200">
            </el-table-column>
            <el-table-column prop="gwGzdd" label="工作地点" :min-width="200">
            </el-table-column>
            <el-table-column
              prop="gwYgzl"
              label="月工作量(小时)"
              :min-width="230"
            >
            </el-table-column>
            <el-table-column
              prop="gwYgzsx"
              label="月工资上限(元)"
              :min-width="230"
            >
            </el-table-column>
            <el-table-column
              prop="gwNjyxc"
              label="年建议薪酬(元)"
              :min-width="230"
            >
            </el-table-column>
            <el-table-column
              prop="gwNzxsrs"
              label="拟招学生人数"
              :min-width="230"
            >
            </el-table-column>
            <el-table-column prop="gwKnss" label="困难生数" :min-width="230">
            </el-table-column>
            <el-table-column prop="gwZdls" label="指导老师" :min-width="200">
            </el-table-column>
            <el-table-column prop="gwLxfs" label="联系方式" :min-width="200">
            </el-table-column>
          </el-table>
        </div>
        <div class="table">
          <el-form-item label="岗位描述" prop="gwMs">
            <div>{{ formEdit.gwMs }}</div>
          </el-form-item>

          <el-form-item label="岗位人员要求" prop="gwRyyq">
            <div>{{ formEdit.gwRyyq }}</div>
          </el-form-item>

          <el-form-item label="备注" prop="gwRemark">
            <div>{{ formEdit.gwRemark }}</div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="editBottom" v-if="editFlag == 2">
      <div class="btn borderRed" @click="back">退回</div>
      <div class="btn borderRed" @click="refuse">拒绝</div>
      <div class="btn confirm" @click="pass">通过</div>
    </div>
    <el-dialog title="拒绝理由" :visible.sync="jjModal" width="30%">
      <template>
        <el-input placeholder="请输入拒绝理由" v-model="jjly"></el-input>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jjCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="jjConfirm"
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
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getXmXgh } from "@/api/assistantWork/homeSchool";
import { queryZgJbxxDwh } from "@/api/dailyBehavior/thriftbumen";
import {
  tyFlow,
  jjFlow,
  backFlow,
  thFinal,
  queryQgzxGwshById,
} from "@/api/thrift/gwAudit";
export default {
  data() {
    return {
      editFlag: this.$route.query.editFlag, //1已审核详情，2待审核详情
      status: "",
      formEdit: {},
      gwxzOptions: [],
      detailList: [],
      xnOptions: [],
      multipleSelection1: "",
      jjModal: false,
      jjly: "",
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      tempRadio: false,
      detailModal: false,
      commonParams: [],
      rules: {
        gwMainMc: [
          { required: true, message: "岗位名称不能为空", trigger: "blur" },
        ],
        gwMs: [
          { required: true, message: "岗位描述不能为空", trigger: "blur" },
        ],
        gwType: [
          { required: true, message: "岗位性质不能为空", trigger: "change" },
        ],
        gwRyyq: [
          { required: true, message: "岗位人员要求不能为空", trigger: "blur" },
        ],

        xn: [{ required: true, message: "学年不能为空", trigger: "blur" }],
        gwTime: [
          {
            required: true,
            message: "岗位起止时间不能为空",
            trigger: "change",
          },
        ],
      },
      delModal: false,
    };
  },
  mounted() {
    this.getCode("dmsplcm"); //状态
    this.getCode("dmqgzxgwxz");
    this.getSchoolYears();
    this.getYrbm();
    this.getDetail();
  },

  methods: {
    getSchoolYears() {
      queryXn()
        .then((res) => {
          this.xnOptions = res.data;
        })
        .catch((err) => {});
    },
    getYrbm() {
      queryZgJbxxDwh()
        .then((res) => {
          this.formEdit.gwYrbm = res.data.mc;
        })
        .catch((err) => {});
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
          case "dmqgzxgwxz": //审批结果
            this.gwxzOptions = res.data;
            break;
        }
      });
    },
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
    //通过
    pass() {
      if (this.commonParams.length > 0) {
        var data = this.commonParams.map((item) => ({
          ...item,
          opMsg: "审核通过",
        }));
        tyFlow(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("审核已通过");
            this.$router.go(-1);
          }
        });
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    //拒绝
    refuse() {
      if (this.commonParams.length > 0) {
        this.jjModal = true;
        this.jjly = "";
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    jjCancel() {
      this.jjModal = false;
    },
    jjConfirm() {
      var data = this.commonParams.map((item) => ({
        ...item,
        opMsg: this.jjly,
      }));
      jjFlow(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("已拒绝");
          this.$router.go(-1);
        }
      });
      this.jjModal = false;
    },
    async back() {
      if (this.commonParams.length > 0) {
        var processId = { processId: this.commonParams[0].taskId };
        await backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    thTableCancel() {
      this.thTableModal = false;
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
          this.$message.success("退回成功");
          this.$router.go(-1);
        }
      });
    },
    getDetail() {
      queryQgzxGwshById({ id: this.$route.query.businesId }).then((res) => {
        // console.log(res);
        this.detailList = res.data.detailList;
        this.formEdit = res.data;

        var brr = {
          businesId: this.$route.query.businesId,
          processId: this.$route.query.processId,
          status: this.$route.query.status,
          taskId: this.$route.query.taskId,
          xh: this.$route.query.xh,
        };
        this.commonParams = [brr];
      });
    },

    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleCancle() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.el-button--text {
  border-color: transparent;
  color: #005657;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
.mt15 {
  margin-top: 15px;
}
.tableWrap {
  background: #fff;
  padding: 20px;
  .table {
    margin: 0px 20px 20px 20px;
  }
  .headerTop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    .title {
      font-weight: 600;
      font-size: 20px;
      color: #1f1f1f;
      line-height: 28px;
    }
    .headerLeft {
      width: 70%;
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
        .btutitle {
          font-size: 14px;
          text-align: center;
          line-height: 32px;
          // vertical-align: middle;
        }
        .btutitle1 {
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
        .passIcon {
          margin-top: 10px;
          background: url("~@/assets/images/passWhite.png") no-repeat;
        }
        .refuseIcon {
          margin-top: 10px;
          background: url("~@/assets/images/refuse.png") no-repeat;
        }
        .backIcon {
          margin-top: 10px;
          background: url("~@/assets/images/back.png") no-repeat;
        }
        .chIcon {
          margin-top: 10px;
          background: url("~@/assets/dangan/chIcon.png") no-repeat;
        }
        .orangeIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/out.png") no-repeat;
        }
        .lightIcon {
          margin-top: 9px;
          background: url("~@/assets/assistantPng/delete.png") no-repeat;
        }
        .greenIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/add.png") no-repeat;
        }
        .tjIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/out.png") no-repeat;
        }
      }
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
  .borderRed {
    border: 1px solid grey;
    color: red;
    background: #fff;
  }
  .editIcon {
    background: #005657;
    color: #fff;
    // background: url('~@/assets/images/icon_edit_white.png');
  }
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
.jian {
  margin-top: 9px;
  background: url("~@/assets/images/jian.png") no-repeat;
}
</style>
