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
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">异动类别：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="changType"
                @training="changTypeAll"
                @checkedTraining="changTypeCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">异动原因：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="changWhy"
                @training="changWhyAll"
                @checkedTraining="changWhyCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">异动文号：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="changTitanic"
                @training="changTitanicAll"
                @checkedTraining="changTitanicCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">异动日期：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="datePicker"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                @change="handleDatePicker"
                size="small"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">学籍异动学生列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <el-dropdown split-button type="primary" @command="handleCommand">
            <span class="el-dropdown-link"> 导出 </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="EXCEL">EXCEL</el-dropdown-item>
              <!-- <el-dropdown-item command="TXT">TXT</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
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
          <el-table-column prop="xh" label="学号" sortable> </el-table-column>
          <el-table-column prop="xm" label="姓名" sortable> </el-table-column>
          <el-table-column prop="dwh" label="学院" sortable> </el-table-column>
          <el-table-column prop="zydm" label="专业" sortable> </el-table-column>
          <el-table-column prop="bjm" label="班级" sortable> </el-table-column>
          <el-table-column prop="ydlbm" label="异动类别" sortable>
          </el-table-column>
          <el-table-column prop="ydyy" label="异动原因" sortable>
          </el-table-column>
          <el-table-column prop="ydczrgh" label="异动操作人" sortable>
          </el-table-column>
          <el-table-column prop="ydrq" label="异动日期" sortable>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">详情</span>
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
  </div>
</template>

<script>
import CheckboxCom from "../../components/checkboxCom";
import { getCodeInfoByEnglish } from '@/api/student/fieldSettings'
import {
  getStuChangeInfoPageList,
  getManageRegStuInfoSearchSpread,
  excelTest,
} from "@/api/student/index";
export default {
  name: "manStudent",
  components: { CheckboxCom },
  data() {
    return {
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        value1: "",
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
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
        // 名族
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
      changType: {
        //异动类别：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      changWhy: {
        //异动原因：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      changTitanic: {
        //异动文号：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      datePicker: "",
      tableData: [],
      multipleSelection: [],
      exportParams: {},
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },

  mounted() {
    this.getSpread();
    this.getCode('dmpyccm') // 培养层次
    this.getCode('dmxz') // 学 制
    this.getCode('dmxjztm') // 学籍
    this.getCode('dmmzm') // 名族
     this.getCode('dmzzmmm') // 政治面貌
     this.getCode('dmxjydlbm') // 异动类别
     this.getCode('dmxjydyym') // 异动原因
    this.handleSearch();
  },

  methods: {
    getCode(data) {
      this.getCodeInfoByEnglish(data)
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData}
      getCodeInfoByEnglish(data).then(res => {
        switch (paramsData) 
        { 
          case 'dmpyccm':
            this.$set(this.training, 'checkBox', res.data);
            break;
          case 'dmxz':
            this.$set(this.learnHe, 'checkBox', res.data);
            break;
          case 'dmxjztm':
            this.$set(this.studentStatus, 'checkBox', res.data);
            break;
          case 'dmmzm':
            this.$set(this.ethnic, 'checkBox', res.data);
            break;
          case 'dmzzmmm':
            this.$set(this.politica, 'checkBox', res.data);
            break;
          case 'dmxjydlbm':
            this.$set(this.changType, 'checkBox', res.data);
            break;
          case 'dmxjydyym':
            this.$set(this.changWhy, 'checkBox', res.data);
            break;
          case '一代文豪':
            this.$set(this.changWhy, 'checkBox', res.data);
            break;
        }
      }).catch(err=>{})
    },
    getSpread() {
      getManageRegStuInfoSearchSpread()
        .then((res) => {
          // console.log(res);
          this.manageRegOps = res.data.dwhbj;
        })
        .catch((err) => {});
    },
    // 查询
    handleSearch() {
      let data = {
        XH: this.select == "xh" ? this.searchVal : "",
        XM: this.select == "xm" ? this.searchVal : "",
        SFZJH: this.select == "sfzjh" ? this.searchVal : "",
        YDDH: this.select == "yddh" ? this.searchVal : "",
        PYCCM: this.training.choose,
        XZ: this.learnHe.choose,
        XJZT: this.studentStatus.choose,
        ZZMMM: this.politica.choose,
        MZM: this.ethnic.choose,
        BJM: this.moreIform.pread,
        DWH: this.moreIform.manageReg,
        ZYDM: this.moreIform.stuInfo, // 专业
        YDLBM: this.changType.choose,
        YDYY: this.changWhy.choose,
        SPWH: this.changTitanic.choose,
        YDRQ: this.datePicker,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
      };
      this.exportParams = data;
      getStuChangeInfoPageList(data)
        .then((res) => {
          // console.log("ress", res);
          this.tableData = res.data.data;
          this.queryParams.total = res.data.total;
        })
        .catch((err) => {});
      // console.log(this.searchVal, this.select);
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    clear() {
      this.searchVal = "";
    },
    // 培养层次全选
    handleCheckAllChangeTraining(val) {
      let allCheck = [];
      for (let i in this.training.checkBox) {
        allCheck.push(this.training.checkBox[i].dm);
      }
      this.training.choose = val ? allCheck : [];
      console.log(this.training.choose, "全选");
      this.training.isIndeterminate = false;
    },
    // 培养层次单选
    handleCheckedCitiesChangeTraining(value) {
      let checkedCount = value.length;
      this.training.checkAll = checkedCount === this.training.checkBox.length;
      this.training.isIndeterminate =
        checkedCount > 0 && checkedCount < this.training.checkBox.length;
      console.log(this.training.choose, "单选");
    },
    // 学制全选
    learnHeAll(val) {
      let allCheck = [];
      for (let i in this.learnHe.checkBox) {
        allCheck.push(this.learnHe.checkBox[i].dm);
      }
      this.learnHe.choose = val ? allCheck : [];
      console.log(this.learnHe.choose, "全选");
      this.learnHe.isIndeterminate = false;
    },
    // 学制单选
    learnHeCheck(value) {
      let checkedCount = value.length;
      this.learnHe.checkAll = checkedCount === this.learnHe.checkBox.length;
      this.learnHe.isIndeterminate =
        checkedCount > 0 && checkedCount < this.learnHe.checkBox.length;
      console.log(this.learnHe.choose, "单选");
    },
    // 学籍全选
    studentStatusAll(val) {
      let allCheck = [];
      for (let i in this.studentStatus.checkBox) {
        allCheck.push(this.studentStatus.checkBox[i].dm);
      }
      this.studentStatus.choose = val ? allCheck : [];
      console.log(this.studentStatus.choose, "全选");
      this.studentStatus.isIndeterminate = false;
    },
    // 学籍单选
    studentStatusCheck(value) {
      let checkedCount = value.length;
      this.studentStatus.checkAll =
        checkedCount === this.studentStatus.checkBox.length;
      this.studentStatus.isIndeterminate =
        checkedCount > 0 && checkedCount < this.studentStatus.checkBox.length;
      console.log(this.studentStatus.choose, "单选");
    },
    // 名族全选
    ethnicAll(val) {
      let allCheck = [];
      for (let i in this.ethnic.checkBox) {
        allCheck.push(this.ethnic.checkBox[i].dm);
      }
      this.ethnic.choose = val ? allCheck : [];
      console.log(this.ethnic.choose, "全选");
      this.ethnic.isIndeterminate = false;
    },
    // 名族单选
    ethnicCheck(value) {
      let checkedCount = value.length;
      this.ethnic.checkAll = checkedCount === this.ethnic.checkBox.length;
      this.ethnic.isIndeterminate =
        checkedCount > 0 && checkedCount < this.ethnic.checkBox.length;
      console.log(this.ethnic.choose, "单选");
    },
    // 政治面貌：全选
    politicaAll(val) {
      let allCheck = [];
      for (let i in this.politica.checkBox) {
        allCheck.push(this.politica.checkBox[i].dm);
      }
      this.politica.choose = val ? allCheck : [];
      console.log(this.politica.choose, "全选");
      this.politica.isIndeterminate = false;
    },
    // 政治面貌：单选
    politicaCheck(value) {
      let checkedCount = value.length;
      this.politica.checkAll = checkedCount === this.politica.checkBox.length;
      this.politica.isIndeterminate =
        checkedCount > 0 && checkedCount < this.politica.checkBox.length;
      console.log(this.politica.choose, "单选");
    },

    //异动类别全选
    changTypeAll(val) {
      let allCheck = [];
      for (let i in this.changType.checkBox) {
        allCheck.push(this.changType.checkBox[i].dm);
      }
      this.changType.choose = val ? allCheck : [];
      console.log(this.changType.choose, "全选");
      this.changType.isIndeterminate = false;
    },
    // 异动类别：单选
    changTypeCheck(value) {
      let checkedCount = value.length;
      this.changType.checkAll = checkedCount === this.changType.checkBox.length;
      this.changType.isIndeterminate =
        checkedCount > 0 && checkedCount < this.changType.checkBox.length;
      console.log(this.changType.choose, "单选");
    },
    //异动原因全选
    changWhyAll(val) {
      let allCheck = [];
      for (let i in this.changWhy.checkBox) {
        allCheck.push(this.changWhy.checkBox[i].dm);
      }
      this.changWhy.choose = val ? allCheck : [];
      console.log(this.changWhy.choose, "全选");
      this.changWhy.isIndeterminate = false;
    },
    // 异动原因：单选
    changWhyCheck(value) {
      let checkedCount = value.length;
      this.changWhy.checkAll = checkedCount === this.changWhy.checkBox.length;
      this.changWhy.isIndeterminate =
        checkedCount > 0 && checkedCount < this.changWhy.checkBox.length;
      // console.log(this.changWhy.choose, "单选");
    },
    //异动文号全选
    changTitanicAll(val) {
      let allCheck = [];
      for (let i in this.changTitanic.checkBox) {
        allCheck.push(this.changTitanic.checkBox[i].dm);
      }
      this.changTitanic.choose = val ? allCheck : [];
      console.log(this.changTitanic.choose, "全选");
      this.changTitanic.isIndeterminate = false;
    },
    // 异动文号：单选
    changTitanicCheck(value) {
      let checkedCount = value.length;
      this.changTitanic.checkAll =
        checkedCount === this.changTitanic.checkBox.length;
      this.changTitanic.isIndeterminate =
        checkedCount > 0 && checkedCount < this.changTitanic.checkBox.length;
      console.log(this.changTitanic.choose, "单选");
    },
    // 异动日期
    handleDatePicker(val) {
      console.log(val);
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 导出
    handleCommand(command) {
      let that = this;
      if (command == "EXCEL") {
        this.exportParams.pageNum = 0;
        excelTest(this.exportParams)
          .then((res) => {
            that.downloadFn(res, "学籍异动学生表.xlsx", "xlsx");
          })
          .catch((err) => {});
      }
    },
    hadleDetail(row) {
      this.$router.push({
        path: "/student/stuChangeDetail",
        query: {
          xh: row.xh,
          id:row.id
        },
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
      // .searchBtn{
      //   background: #005657;
      //   color:#fff;
      // }
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
          background: url("../../../assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("../../../assets/images/chevronUp.png") no-repeat;
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
          background: url("../../../assets/images/updata.png") no-repeat;
        }
      }
      .headerRight {
        display: flex;
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
      background: url("../../../assets/images/details.png");
    }
  }
}
</style>
