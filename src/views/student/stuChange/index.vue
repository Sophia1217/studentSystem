<template>
  <div class="manStudent">
    <div class="searchWrap">
      <div class="ms-search">
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
            <el-option label="审批文号" value="spwh"></el-option>
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
            <span class="titleStyle">学 院：</span>
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
          <el-col :span="8">
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
          <el-col :span="8">
            <span class="titleStyle">原培养单位：</span>
            <el-select
              v-model="moreIform.ydwh"
              multiple
              collapse-tags
              @change="changeXYOld"
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
            <span>原专业：</span>
            <el-select
              v-model="moreIform.yzydm"
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
          <el-col :span="8">
            <span>原班级：</span>
            <el-select
              v-model="moreIform.ybh"
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
          <el-col :span="3">原年级：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="njOps"
                @training="njAll"
                @checkedTraining="njCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">性别：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="dmxbmOPs"
                @training="dmxbmAll"
                @checkedTraining="dmxbmCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">是否在校：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="inSchool"
                @training="inSchoolAll"
                @checkedTraining="inSchoolCheck"
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
          <el-col :span="3">异动日期：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="datePicker"
                unlink-panels
                type="daterange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
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
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" sortable> </el-table-column>
          <el-table-column prop="xm" label="姓名" sortable> </el-table-column>
          <el-table-column prop="dwhmc" label="学院" sortable>
          </el-table-column>
          <el-table-column prop="zydmc" label="专业" sortable>
          </el-table-column>
          <el-table-column prop="bjm" label="班级" sortable> </el-table-column>
          <el-table-column prop="ydlbmc" label="异动类别" sortable>
          </el-table-column>
          <el-table-column prop="ydyy" label="异动原因" sortable="custom">
          </el-table-column>
          <el-table-column prop="ydczrgh" label="异动操作人" sortable="custom">
          </el-table-column>
          <el-table-column prop="ydrq" label="异动日期" sortable="custom">
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
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
import { getCollege } from "@/api/class/maintenanceClass";
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
      moreIform: {},
      allDwh: [], // 学院下拉框
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
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
      inSchool: {
        //是否在校
        checkAll: false,
        choose: [],
        checkBox: [
          {
            dm: "在校",
            mc: "是",
          },
          {
            dm: "不在校",
            mc: "否",
          },
        ],
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
      njOps: {
        //年级：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      dmxbmOPs: {
        // 性别：
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
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmxz"); // 学 制
    this.getCode("dmxjztm"); // 学籍
    this.getCode("dmmzm"); // 民 族
    this.getCode("dmzzmmm"); // 政治面貌
    this.getCode("dmxjydlbm"); // 异动类别
    this.getCode("dmxjydyym"); // 异动原因
    this.getCode("dmxbm"); // 性别
    this.handleSearch();
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
      if (typeof val == "string") {
        val = val.split(",");
      }
      this.getZY(val);
      this.getBJ(val);
    },
    changeXYOld(val) {
      if (val && val.length == 0) {
        this.moreIform.yzydm = []; // 专业
        this.moreIform.ybh = []; // 班级
      }
      if (typeof val == "string") {
        val = val.split(",");
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
            case "dmxz":
              this.$set(this.learnHe, "checkBox", res.data);
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
            case "dmxjydlbm":
              this.$set(this.changType, "checkBox", res.data);
              break;
            case "dmxjydyym":
              this.$set(this.changWhy, "checkBox", res.data);
              break;
            case "dmxbm":
              this.$set(this.dmxbmOPs, "checkBox", res.data);
          }
        })
        .catch((err) => {});
    },
    getSpread() {
      getManageRegStuInfoSearchSpread()
        .then((res) => {
          let nj = res.data.nj;
          let njops = [];
          for (let x = 0; x < nj.length; x++) {
            if (nj[x]) {
              njops.push({ mc: nj[x], dm: nj[x] });
            }
          }
          this.njOps.checkBox = njops;
        })
        .catch((err) => {});
    },
    // 查询
    handleSearch() {
      let YDRQST,
        YDRQEND = "";
      if (this.datePicker && this.datePicker.length > 0) {
        YDRQST = this.datePicker[0];
        YDRQEND = this.datePicker[1];
      }
      let data = {
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        // sfzjh: this.select == "sfzjh" ? this.searchVal : "",
        // yddh: this.select == "yddh" ? this.searchVal : "",
        // pyccm: this.training.choose&&this.training.choose.length>0?this.training.choose.join(','):'',
        ydwh:
          this.moreIform.ydwh && this.moreIform.ydwh.length > 0
            ? this.moreIform.ydwh.join(",")
            : "", // 原培养单位
        yzydm:
          this.moreIform.yzydm && this.moreIform.yzydm.length > 0
            ? this.moreIform.yzydm.join(",")
            : "", // 原专业
        ynj:
          this.njOps.choose && this.njOps.choose.length > 0
            ? this.njOps.choose.join(",")
            : "", // 原年级
        ybj:
          this.moreIform.ybh && this.moreIform.ybh.length > 0
            ? this.moreIform.ybh.join(",")
            : "", // 原班级
        xbm:
          this.dmxbmOPs.choose && this.dmxbmOPs.choose.length > 0
            ? this.dmxbmOPs.choose.join(",")
            : "", // 性别码
        // xz: this.learnHe.choose&&this.learnHe.choose.length>0?this.learnHe.choose.join(','):'',
        xjzt:
          this.studentStatus.choose && this.studentStatus.choose.length > 0
            ? this.studentStatus.choose.join(",")
            : "01,03",
        // zzmmm: this.politica.choose&&this.politica.choose.length>0?this.politica.choose.join(','):'',
        // mzm: this.ethnic.choose&&this.ethnic.choose.length>0?this.ethnic.choose.join(','):'',
        bjm:
          this.moreIform.pread && this.moreIform.pread.length > 0
            ? this.moreIform.pread.join(",")
            : "",
        dwh:
          this.moreIform.manageReg && this.moreIform.manageReg.length > 0
            ? this.moreIform.manageReg.join(",")
            : "",
        zydm:
          this.moreIform.stuInfo && this.moreIform.stuInfo.length > 0
            ? this.moreIform.stuInfo.join(",")
            : "", // 专业
        ydlbm:
          this.changType.choose && this.changType.choose.length > 0
            ? this.changType.choose.join(",")
            : "",
        sfzx:
          this.inSchool.choose && this.inSchool.choose.length > 0
            ? this.inSchool.choose.join(",")
            : "",
        // ydyy: this.changWhy.choose&&this.changWhy.choose.length>0?this.changWhy.choose.join(','):'',
        spwh: this.select == "spwh" ? this.searchVal : "",
        // ydrq: this.datePicker,
        ydrqst: YDRQST,
        ydrqend: YDRQEND,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
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
    //是否在校：全选
    inSchoolAll(val) {
      let allCheck = [];
      for (let i in this.inSchool.checkBox) {
        allCheck.push(this.inSchool.checkBox[i].dm);
      }
      this.inSchool.choose = val ? allCheck : [];

      this.inSchool.isIndeterminate = false;
    },
    // 是否在校：单选
    inSchoolCheck(value) {
      let checkedCount = value.length;
      this.inSchool.checkAll = checkedCount === this.inSchool.checkBox.length;
      this.inSchool.isIndeterminate =
        checkedCount > 0 && checkedCount < this.inSchool.checkBox.length;
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

    //异动类别全选
    changTypeAll(val) {
      let allCheck = [];
      for (let i in this.changType.checkBox) {
        allCheck.push(this.changType.checkBox[i].dm);
      }
      this.changType.choose = val ? allCheck : [];

      this.changType.isIndeterminate = false;
    },
    // 异动类别：单选
    changTypeCheck(value) {
      let checkedCount = value.length;
      this.changType.checkAll = checkedCount === this.changType.checkBox.length;
      this.changType.isIndeterminate =
        checkedCount > 0 && checkedCount < this.changType.checkBox.length;
    },
    //异动原因全选
    changWhyAll(val) {
      let allCheck = [];
      for (let i in this.changWhy.checkBox) {
        allCheck.push(this.changWhy.checkBox[i].dm);
      }
      this.changWhy.choose = val ? allCheck : [];

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
    // 年级全选
    njAll(val) {
      let allCheck = [];
      for (let i in this.njOps.checkBox) {
        allCheck.push(this.njOps.checkBox[i].dm);
      }
      this.njOps.choose = val ? allCheck : [];
      this.njOps.isIndeterminate = false;
    },
    // 异年级：单选
    njCheck(value) {
      let checkedCount = value.length;
      this.njOps.checkAll = checkedCount === this.njOps.checkBox.length;
      this.njOps.isIndeterminate =
        checkedCount > 0 && checkedCount < this.njOps.checkBox.length;
      // console.log(this.njOps.choose, "单选");
    },
    // 性别：全选
    dmxbmAll(val) {
      let allCheck = [];
      for (let i in this.dmxbmOPs.checkBox) {
        allCheck.push(this.dmxbmOPs.checkBox[i].dm);
      }
      this.dmxbmOPs.choose = val ? allCheck : [];

      this.dmxbmOPs.isIndeterminate = false;
    },
    // 性别：单选
    dmxbmCheck(value) {
      let checkedCount = value.length;
      this.dmxbmOPs.checkAll = checkedCount === this.dmxbmOPs.checkBox.length;
      this.dmxbmOPs.isIndeterminate =
        checkedCount > 0 && checkedCount < this.dmxbmOPs.checkBox.length;
      // console.log(this.dmxbmOPs.choose, "单选");
    },
    // 异动日期
    handleDatePicker(val) {},
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },
    // 导出
    handleCommand(command) {
      let that = this;
      if (command == "EXCEL") {
        let ids = [];
        for (let item_row of this.multipleSelection) {
          ids.push(item_row.id);
        }
        this.exportParams.pageNum = 0;
        this.$set(this.exportParams, "ids", ids);
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
          id: row.id,
        },
      });
    },
    //排序
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
    .ms-search {
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
      .titleStyle {
        display: inline-block;
        width: 120px;
      }
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
