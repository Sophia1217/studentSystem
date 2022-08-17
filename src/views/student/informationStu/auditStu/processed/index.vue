<template>
  <div class="manStudent">
    <div class="searchWrap">
      <div class="search">
        <el-input placeholder="请输入" v-model="searchVal" class="inputSelect">
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
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in manageRegOps"
                :key="index"
                :label="item.dwmc"
                :value="item.dwmc"
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
                v-for="(item, index) in manageRegOps"
                :key="index"
                :label="item.label"
                :value="item.value"
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
                v-for="item in manageRegOps"
                :key="item.bjmc"
                :label="item.bjmc"
                :value="item.bjmc"
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
              <!-- <el-checkbox class="elcheckbox" :indeterminate="training.isIndeterminate" 
                v-model="training.checkAll" @change="handleCheckAllChangeTraining">全选</el-checkbox>
              <el-checkbox-group v-model="training.choose" @change="handleCheckedCitiesChangeTraining">
                <el-checkbox v-for="item in training.checkBox" :label="item.val" :key="item.val">{{item.label}}</el-checkbox>
              </el-checkbox-group> -->
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
          <el-col :span="3">名族：</el-col>
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
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="tableColumnValue" label="学号" sortable>
          </el-table-column>
          <el-table-column prop="xm" label="姓名" sortable> </el-table-column>
          <el-table-column prop="dwh" label="学院" sortable> </el-table-column>
          <el-table-column prop="zydm" label="专业" sortable> </el-table-column>
          <el-table-column prop="njm" label="班级" sortable> </el-table-column>
          <el-table-column prop="pyccm" label="培养层次" sortable>
          </el-table-column>
          <el-table-column prop="approveTime" label="修改时间" sortable>
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
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [
          { label: "大学本科", val: 1 },
          { label: "硕士研究生", val: 2 },
          { label: "博士研究生", val: 3 },
        ],
        isIndeterminate: true,
      },
      dialogVisible: false,
      learnHe: {
        //学 制：
        checkAll: false,
        choose: [],
        checkBox: [
          { label: "2年", val: 1 },
          { label: "3年", val: 2 },
          { label: "3年", val: 3 },
        ],
        isIndeterminate: true,
      },
      studentStatus: {
        // 学籍
        checkAll: false,
        choose: [],
        checkBox: [
          { label: "有学籍", val: 1 },
          { label: "无学籍", val: 2 },
        ],
        isIndeterminate: true,
      },
      ethnic: {
        // 名族
        checkAll: false,
        choose: [],
        checkBox: [
          { label: "汉族", val: 1 },
          { label: "蒙古族", val: 2 },
          { label: "藏族", val: 3 },
        ],
        isIndeterminate: true,
      },
      politica: {
        // 政治面貌：
        checkAll: false,
        choose: [],
        checkBox: [
          { label: "中共党员", val: 1 },
          { label: "中共预备", val: 2 },
          { label: "共青团员", val: 3 },
        ],
        isIndeterminate: true,
      },
      tableData: [{ date: 1 }],
      multipleSelection: [],
      showExport: false,
    };
  },

  mounted() {
    this.handleSearch();
    this.getSpread();
  },

  methods: {
    getSpread() {
      getManageRegStuInfoSearchSpread()
        .then((res) => {
          this.manageRegOps = res.data.dwhbj;
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
        pyccm: [],
        xz: [],
        xjzt: [],
        zzmmm: [],
        mzm: [],
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
        allCheck.push(this.training.checkBox[i].val);
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
        allCheck.push(this.learnHe.checkBox[i].val);
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
        allCheck.push(this.studentStatus.checkBox[i].val);
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
    // 名族全选
    ethnicAll(val) {
      let allCheck = [];
      for (let i in this.ethnic.checkBox) {
        allCheck.push(this.ethnic.checkBox[i].val);
      }
      this.ethnic.choose = val ? allCheck : [];
      this.ethnic.isIndeterminate = false;
    },
    // 名族单选
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
        allCheck.push(this.politica.checkBox[i].val);
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
      this.multipleSelection = val.map((item) => {
        return item.id;
      });
    },
    // 打开导出弹窗
    handleExport() {
      this.showExport = true;
    },
    pass() {
      var data = this.multipleSelection;
      if (this.multipleSelection.length > 1) {
        passFlow(data).then(() => {
          this.$message("已成功通过");
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
      var data = {
        id: this.multipleSelection[0],
        rollbackReason: this.form.rollbackReason,
      };
      backFlow(data).then(() => this.$message("已成功拒绝"));
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
      let schooling = '' // 3 4 5 是本科
      if (row.pyccm == 1 || row.pyccm == 2) { // 1 2 是研究生
        schooling = 2
      } else {
        schooling = 1
      }
      // console.log(row);
      this.$router.push({
        path: "/student/informationStu/auditSteps",
        query: {
          xh: row.tableColumnValue,
          schooling: schooling,
          id:row.id
        }
      });
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
