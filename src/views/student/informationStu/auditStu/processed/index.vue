<template>
  <div class="manStudent">
    <div class="searchWrap">
      <div class="search">
        <el-input
          placeholder="请输入"
          v-model="searchVal"
          clearable
          class="inputSelect"
        >
          <el-select
            v-model="select"
            class="elSelect"
            slot="prepend"
            placeholder="查询条件"
            @change="clear"
          >
            <el-option label="学号" value="xh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
            <el-option label="身份证号" value="sfzjh"></el-option>
            <el-option label="手机号" value="yddh"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchBtn"
            @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span> {{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20">
          <el-col :span="8">
            <span>学 院：</span>
            <el-select
              v-model="moreIform.manageReg"
              @change="changeXY"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in allDwh"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span>专 业：</span>
            <el-select
              v-model="moreIform.stuInfo"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in zyOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span>班 级：</span>
            <el-select
              v-model="moreIform.pread"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in bjOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">培养层次：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="training"
                @training="handleCheckAllChangeTraining"
                @checkedTraining="handleCheckedCitiesChangeTraining"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">学 制：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="learnHe"
                @training="learnHeAll"
                @checkedTraining="learnHeCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">学 籍：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="studentStatus"
                @training="studentStatusAll"
                @checkedTraining="studentStatusCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">民 族：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="ethnic"
                @training="ethnicAll"
                @checkedTraining="ethnicCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">政治面貌：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="politica"
                @training="politicaAll"
                @checkedTraining="politicaCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">待审核列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderGreen" @click="handleExport">
            <i class="icon greenIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns deteBtn" @click="pass">
            <i class="icon deteIcon"></i><span class="title">通过</span>
          </div>
          <div class="btns deteBtn" @click="bacK">
            <i class="icon deteIcon2"></i><span class="title">拒绝</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="userId" label="学号" sortable="custom">
          </el-table-column>
          <el-table-column prop="xm" label="姓名" sortable="custom">
          </el-table-column>
          <el-table-column prop="dwh" label="学院" sortable="custom">
          </el-table-column>
          <el-table-column prop="zydm" label="专业" sortable="custom">
          </el-table-column>
          <el-table-column prop="njm" label="班级" sortable="custom">
          </el-table-column>
          <el-table-column prop="pyccm" label="培养层次" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="approveTime"
            label="修改时间"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">审核</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="queryParams.total > 0"
          :total="queryParams.total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="handleSearch"
        />
      </div>
    </div>
    <el-dialog
      title="拒绝理由"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form v-model="form">
        <el-form-item class="width:200px">
          <el-input type="textarea" v-model="form.rollbackReason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CheckboxCom from "../../../../components/checkboxCom";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
import { getCollege } from "@/api/class/maintenanceClass";
import {
  getManageRegStuInfoSearchSpread,
  FlowPageList,
  passFlow,
  backFlow,
} from "@/api/student/index";
export default {
  name: "manStudent",
  components: { CheckboxCom },
  data() {
    return {
      form: { rollbackReason: "" },
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        value1: "",
      },
      allDwh: [], // 学院下拉框
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      dialogVisible: false,
      learnHe: {
        //学 制：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      studentStatus: {
        // 学籍
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      ethnic: {
        // 民 族
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      politica: {
        // 政治面貌：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      tableData: [],
      multipleSelection: [],
      showExport: false,
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmxjztm"); // 学籍
    this.getCode("dmmzm"); // 民 族
    this.getCode("dmzzmmm"); // 政治面貌
    this.getCode("dmxz"); // 学 制
    this.getSpread();
  },

  methods: {
    // 查询学院
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    changeXY(val) {
      this.getZY(val);
      this.getBJ(val);
    },
    // 学院找专业
    getZY(val) {
      let data = { DWH: val };
      getZY(data)
        .then((res) => {
          this.zyOps = res.data;
        })
        .catch((err) => {});
    },
    getBJ(val) {
      let data = { DWH: val };
      getBJ(data)
        .then((res) => {
          this.bjOps = res.data;
        })
        .catch((err) => {});
    },
    getSpread() {
      getManageRegStuInfoSearchSpread()
        .then((res) => {
          this.manageRegOps = res.data.dwhbj;
        })
        .catch((err) => {});
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmpyccm":
              this.$set(this.training, "checkBox", res.data);
              break;
            case "dmxjztm":
              this.$set(this.studentStatus, "checkBox", res.data);
              break;
            case "dmmzm":
              this.$set(this.ethnic, "checkBox", res.data);
              break;
            case "dmzzmmm":
              this.$set(this.politica, "checkBox", res.data);
              break;
            case "dmxz":
              this.$set(this.learnHe, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
    },
    // 查询
    handleSearch() {
      let data = {
        xh: this.select == "xh" ? this.searchVal : "",
        xm: this.select == "xm" ? this.searchVal : "",
        sfzjh: this.select == "sfzjh" ? this.searchVal : "",
        yddh: this.select == "yddh" ? this.searchVal : "",
        pyccm: this.training.choose,
        xz: this.learnHe.choose,
        xjzt: this.studentStatus.choose,
        zzmmm: this.politica.choose,
        mzm: this.ethnic.choose,
        bjm: [],
        dwh: [],
        zydm: [],
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
      };
      FlowPageList(data)
        .then((res) => {
          this.tableData = res.data.data;
          this.queryParams.total = res.data.total;
        })
        .catch((err) => {});
    },
    clear() {
      this.searchVal = "";
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    // 培养层次全选
    handleCheckAllChangeTraining(val) {
      let allCheck = [];
      for (let i in this.training.checkBox) {
        allCheck.push(this.training.checkBox[i].dm);
      }
      this.training.choose = val ? allCheck : [];
      this.training.isIndeterminate = false;
    },
    // 培养层次单选
    handleCheckedCitiesChangeTraining(value) {
      let checkedCount = value.length;
      this.training.checkAll = checkedCount === this.training.checkBox.length;
      this.training.isIndeterminate =
        checkedCount > 0 && checkedCount < this.training.checkBox.length;
    },
    // 学制全选
    learnHeAll(val) {
      let allCheck = [];
      for (let i in this.learnHe.checkBox) {
        allCheck.push(this.learnHe.checkBox[i].dm);
      }
      this.learnHe.choose = val ? allCheck : [];
      this.learnHe.isIndeterminate = false;
    },
    // 学制单选
    learnHeCheck(value) {
      let checkedCount = value.length;
      this.learnHe.checkAll = checkedCount === this.learnHe.checkBox.length;
      this.learnHe.isIndeterminate =
        checkedCount > 0 && checkedCount < this.learnHe.checkBox.length;
    },
    // 学籍全选
    studentStatusAll(val) {
      let allCheck = [];
      for (let i in this.studentStatus.checkBox) {
        allCheck.push(this.studentStatus.checkBox[i].dm);
      }
      this.studentStatus.choose = val ? allCheck : [];
      this.studentStatus.isIndeterminate = false;
    },
    // 学籍单选
    studentStatusCheck(value) {
      let checkedCount = value.length;
      this.studentStatus.checkAll =
        checkedCount === this.studentStatus.checkBox.length;
      this.studentStatus.isIndeterminate =
        checkedCount > 0 && checkedCount < this.studentStatus.checkBox.length;
    },
    // 民 族全选
    ethnicAll(val) {
      let allCheck = [];
      for (let i in this.ethnic.checkBox) {
        allCheck.push(this.ethnic.checkBox[i].dm);
      }
      this.ethnic.choose = val ? allCheck : [];
      this.ethnic.isIndeterminate = false;
    },
    // 民 族单选
    ethnicCheck(value) {
      let checkedCount = value.length;
      this.ethnic.checkAll = checkedCount === this.ethnic.checkBox.length;
      this.ethnic.isIndeterminate =
        checkedCount > 0 && checkedCount < this.ethnic.checkBox.length;
    },
    // 政治面貌：全选
    politicaAll(val) {
      let allCheck = [];
      for (let i in this.politica.checkBox) {
        allCheck.push(this.politica.checkBox[i].dm);
      }
      this.politica.choose = val ? allCheck : [];
      this.politica.isIndeterminate = false;
    },
    // 政治面貌：单选
    politicaCheck(value) {
      let checkedCount = value.length;
      this.politica.checkAll = checkedCount === this.politica.checkBox.length;
      this.politica.isIndeterminate =
        checkedCount > 0 && checkedCount < this.politica.checkBox.length;
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // this.multipleSelection = val.map((item) => {
      //   return item.id;
      // });
    },
    // 打开导出弹窗
    handleExport() {
      this.showExport = true;
    },
    pass() {
      var data = this.multipleSelection;
      let params = [];
      for (let x = 0; x < data.length; x++) {
        params.push({
          id: data[x].id,
          xh: data[x].userId,
          approver: data[x].approver,
        });
      }
      if (this.multipleSelection.length > 0) {
        passFlow(params).then((res) => {
          this.$message({ message: res.errmsg, type: "success" });
          this.handleSearch();
        });
      } else {
        this.$message.error("请先勾选一条信息");
      }
    },
    bacK() {
      this.form.rollbackReason = "";
      if (this.multipleSelection.length == 1) {
        this.dialogVisible = true;
      } else if (this.multipleSelection.length > 1) {
        this.$message.error("只能勾选一条信息");
      } else {
        this.$message.error("请先勾选一条信息");
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleOk() {
      let data = {
        id: this.multipleSelection[0].id,
        approver: this.multipleSelection[0].approver,
        rollbackReason: this.form.rollbackReason,
      };
      backFlow(data).then(() =>
        this.$message({ message: res.errmsg, type: "success" })
      );
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      this.showExport = false;
    },
    hadleDetail(row) {
      let schooling = ""; // 3 4 5 是本科
      if (row.pyccm == 1 || row.pyccm == 2) {
        // 1 2 是研究生
        schooling = 2;
      } else {
        schooling = 1;
      }
      // console.log(row);
      this.$router.push({
        path: "/student/informationStu/auditSteps",
        query: {
          xh: row.userId,
          schooling: schooling,
          id: row.id,
          approveState: 2,
        },
      });
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
  },
};
</script>

<style lang="scss" scoped>
.manStudent {
  .mt15 {
    margin-top: 15px;
  }
  .searchWrap {
    background: #fff;
    padding: 20px;
    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: #fff;
      .searchBtn {
      }
      .elSelect {
        width: 110px;
      }
      .inputSelect {
        width: 50%;
      }
      .more {
        flex: 0 0 100px;
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #005657;
        cursor: pointer;
        .moreIcon {
          display: block;
          width: 20px;
          height: 20px;
        }
        .chevronDown {
          background: url("~@/assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("~@/assets/images/chevronUp.png") no-repeat;
        }
      }
    }
    .moreSelect {
      margin-top: 20px;
      padding: 20px;
      background: #fafafa;
    }
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
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/updata.png") no-repeat;
        }
      }
      .headerRight {
        display: flex;
        .borderBlue {
          border: 1px solid #0d84e0;
          color: #0d84e0;
          background: #ebfafd;
        }
        .borderOrange {
          border: 1px solid #cc3014;
          color: #cc3014;
          background: #fdf6f3;
        }
        .borderLight {
          border: 1px solid #0090a1;
          color: #0090a1;
          background: #e7fcfc;
        }
        .borderGreen {
          border: 1px solid #005657;
          color: #fff;
          background: #005657;
        }
        .btns {
          margin-right: 15px;
          padding: 5px 10px;
          cursor: pointer;
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 22px;
            // vertical-align: middle;
          }
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }
          .greenIcon {
            background: url("~@/assets/images/export2.png") no-repeat;
          }
          .deteIcon {
            background: url("~@/assets/images/yes.png") no-repeat;
          }
          .deteIcon2 {
            background: url("~@/assets/images/no.png") no-repeat;
          }
        }
        .deteBtn {
          font-weight: 400;
          font-size: 14px;
          color: #005657;
          border: 1px solid #005657;
          border-radius: 2px;
        }
      }
    }
    .noData {
      width: 100%;
      margin-top: 30px;
      text-align: center;
      .describe {
        text-align: center;
        font-size: 14px;
        color: #9e9e9e;
      }
    }
    .scopeIncon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    .handleName {
      font-weight: 400;
      font-size: 14px;
      color: #005657;
      line-height: 28px;
    }
    .handledie {
      background: url("~@/assets/images/auditIcon.png");
    }
  }
}
</style>
