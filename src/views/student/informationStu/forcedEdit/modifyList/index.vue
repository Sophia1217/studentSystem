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
            <!-- <el-option label="身份证号" value="sfzjh"></el-option>
            <el-option label="手机号" value="yddh"></el-option> -->
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
          <el-col :span="6">
            <span>学 院：</span>
            <el-select
              v-model="moreIform.manageReg"
              multiple
              collapse-tags
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
          <el-col :span="6">
            <span>专 业：</span>
            <el-select
              v-model="moreIform.stuInfo"
              multiple
              collapse-tags
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
          <el-col :span="6">
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
          <el-col :span="6">
            <span>年 级：</span>
            <el-select
              v-model="moreIform.grade"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in allNj"
                :key="index"
                :label="item"
                :value="item"
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
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">强制修改名单列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight" v-if="tableData.length > 0">
          <!-- <div class="btns borderGreen" @click="handleExport">
            <i class="icon greenIcon"></i><span class="title">导出</span>
          </div> -->
          <div class="btns deteBtn" @click="del">
            <i class="icon deteIcon"></i><span class="title">删除</span>
          </div>
        </div>
      </div>
      <div class="mt15" v-if="tableData.length > 0">
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
          <el-table-column prop="xh" label="学号" sortable="custom">
          </el-table-column>
          <el-table-column prop="xm" label="姓名" sortable="custom">
          </el-table-column>
          <el-table-column prop="dwhmc" label="学院" sortable="custom">
          </el-table-column>
          <el-table-column prop="zydmc" label="专业" sortable="custom">
          </el-table-column>
          <el-table-column prop="bjmc" label="班级" sortable="custom">
          </el-table-column>
          <el-table-column prop="xslbmc" label="学生类别" sortable="custom">
          </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" sortable="custom">
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
      <div class="noData" v-else>
        <img
          src="@/assets/images/noData.png"
          alt=""
          width="160px"
          height="160px"
        />
        <p class="describe">尚未导入强制修改名单</p>
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxCom from "../../../../components/checkboxCom";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import {
  getManageRegStuInfoSearchSpread,
  forceUpdateList,
  DelForceStu,
} from "@/api/student/index";
export default {
  name: "manStudent",
  components: { CheckboxCom },
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      searchVal: "",
      select: "",
      isMore: false,
      datePicker: [],
      allDwh: [], // 学院下拉框
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      allNj: [], //年级下拉
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
    this.getAllGrade();
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
      if (val && val.length == 0) {
        this.moreIform.stuInfo = []; // 专业
        this.moreIform.pread = []; // 班级
      }
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
    //查询年级
    getAllGrade(){
      getGrade()
      .then((res) => {
          this.allNj = res.data.rows;
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
        bjm: this.moreIform.pread,
        dwh: this.moreIform.manageReg,
        zydm: this.moreIform.stuInfo,
        nj: this.moreIform.grade,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      forceUpdateList(data)
        .then((res) => {
          this.tableData = res.data.data;
          // this.tableData.forEach((item) => {
          //   item.updateTime = item.updateTime.slice(
          //     0,
          //     item.createTime.indexOf("T")
          //   );
          // });
          // console.log("tableData", this.tableData);
          this.queryParams.total = res.data.total;
        })
        .catch((err) => {});
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
    clear() {
      this.searchVal = "";
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
    del() {
      var data = this.multipleSelection;
      DelForceStu(data).then((res) => this.handleSearch());
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
        return item.xh;
      });
    },
    // 打开导出弹窗
    handleExport() {
      this.showExport = true;
    },
    // 排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
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
          color: #005657;
          background: #fff;
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
            background: url("~@/assets/images/export.png") no-repeat;
          }
          .deteIcon {
            background: url("~@/assets/images/detelIcon.png") no-repeat;
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
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
}
</style>
