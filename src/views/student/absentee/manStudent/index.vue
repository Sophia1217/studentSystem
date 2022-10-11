<template>
  <div class="manStudentStyle">
    <div class="searchWrap">
      <div class="search">
        <el-input
          placeholder="请输入"
          v-model.trim="searchVal"
          class="inputSelect"
          clearable
        >
          <el-select
            v-model="select"
            @change="changeSelect"
            class="elSelect"
            slot="prepend"
            placeholder="查询条件"
          >
            <el-option label="学号" value="xh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
            <el-option label="身份证号" value="sfzjh"></el-option>
            <el-option label="手机号" value="yddh"></el-option>
            <el-option label="籍贯" value="jg"></el-option>
            <el-option label="出生地" value="csdm"></el-option>
            <el-option label="户口所在地" value="gjdqm"></el-option>
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
              @change="changeXY"
              multiple
              collapse-tags
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
                v-for="(item, index) in bjOps"
                :key="index"
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
          <el-col :span="3">民 族：</el-col>
          <el-col :span="20">
            <div :class="expand ? 'expandOpen' : 'expandClose'">
              <checkboxCom
                :class="expand ? 'expandOpen' : 'expandClose'"
                :objProp="ethnic"
                @training="ethnicAll"
                @checkedTraining="ethnicCheck"
              ></checkboxCom>
            </div>
            <div>
              <el-button v-if="expand" @click="openIt"> 展开</el-button>
              <el-button v-else @click="closeIt"> 收起</el-button>
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
          <el-col :span="3">出生日期：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="datePicker"
                type="daterange"
                unlink-panels
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
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
          <span class="title">学生信息列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderBlue" @click="modal(1)">
            <i class="icon blueIcon"></i><span class="title">毕业生登记表</span>
          </div>
          <div class="btns borderBlue" @click="modal(2)">
            <i class="icon orangeIcon"></i><span class="title">学生登记表</span>
          </div>
          <div class="btns borderBlue" @click="modal(3)">
            <i class="icon lightIcon"></i><span class="title">学生卡片</span>
          </div>
          <div class="btns borderGreen" @click="handleExport">
            <i class="icon greenIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          :default-sort="{ prop: 'xh', order: 'ascending' }"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" sortable> </el-table-column>
          <el-table-column prop="xm" label="姓名" sortable="custom">
          </el-table-column>
          <el-table-column prop="zzmmc" label="政治面貌" sortable="custom">
          </el-table-column>
          <el-table-column prop="mzmc" label="民族" sortable="custom">
          </el-table-column>
          <el-table-column prop="dwmc" label="学院" sortable="custom">
          </el-table-column>
          <el-table-column prop="zydmc" label="专业" sortable="custom">
          </el-table-column>
          <el-table-column prop="nj" label="年级" sortable="custom">
          </el-table-column>
          <el-table-column prop="pyccmc" label="培养层次" sortable="custom">
          </el-table-column>
          <el-table-column prop="xz" label="学制(年)" sortable="custom">
          </el-table-column>
          <el-table-column prop="xjztmc" label="学籍状态" sortable="custom">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">详情</span>
              </el-button>
              <el-button
                v-show="!scope.row.flag || scope.row.flag == null"
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 2)"
              >
                <i class="scopeIncon handleEdit"></i>

                <span class="handleName">编辑</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="showExportA" width="30%">
      <span>确认导出{{ len }}条学生数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelA">取 消</el-button>
        <el-button type="primary" class="confirm" @click="expTalk(ind)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <exportView
      v-if="showExport"
      :tag="1"
      :showExport="showExport"
      :multipleSelection="multipleSelection"
      :manageRegStuInfoParam="manageRegStuInfoParam"
      :op="op"
      @handleCancel="handleCancel"
      @handleConfirm="handleConfirm"
    ></exportView>
    <pagination
      v-show="queryParams.total > 0"
      :total="queryParams.total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="handleSearch"
    />
  </div>
</template>

<script>
import CheckboxCom from "../../../components/checkboxCom";
import exportView from "./exportView/index.vue";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import {
  getManageRegStuInfoSearchSpread,
  getManageRegStuInfoPageList,
  gradStu,
  stuCard,
  stuReg,
} from "@/api/student/index";
export default {
  name: "absentee",
  components: { CheckboxCom, exportView },
  data() {
    return {
      op: "0",
      manageRegStuInfoParam: {},
      title: "导出提示",
      expand: true,
      searchVal: "",
      select: "",
      isMore: false,
      showExportA: false,
      moreIform: {
        manageReg: [], // 学院
        stuInfo: [], // 专业
        pread: [], // 班级
      },
      allDwh: [], // 学院下拉框
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      allNj: [], //年级下拉
      datePicker: [],
      manageRegOps: [], //
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
      ind: 1,
      len: 0,
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
      dmxbmOPs: {
        // 性别：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      tableData: [],
      multipleSelection: [],
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  watch: {},

  mounted() {
    this.getSpread();
    this.getAllCollege();
    this.getAllGrade(); //年级
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmxjztm"); // 学籍
    this.getCode("dmmzm"); // 民 族
    this.getCode("dmzzmmm"); // 政治面貌
    this.getCode("dmxz"); // 学 制
    this.getCode("dmxbm"); // 性别码
    this.handleSearch();
  },
  activated() {
    // this.handleSearch()
  },

  methods: {
    modal(ind) {
      if (this.multipleSelection.length <= 0) {
        this.$message("请先选择学生");
        return;
      } else {
        this.showExportA = true;
        this.len = this.multipleSelection.length;
        this.ind = ind;
      }
    },
    handleCancelA() {
      this.showExportA = false;
    },
    expTalk() {
      let xhs = [];
      this.multipleSelection.forEach((item) => {
        xhs.push(item.xh);
      });
      let data = { xhs: xhs, etype: "docx" };
      if (this.ind == 1) {
        gradStu(data).then((res) =>
          this.downloadFn(res, "毕业生登记表", "zip")
        );
      } else if (this.ind == 2) {
        stuReg(data).then((res) => this.downloadFn(res, "学生登记表", "zip"));
      } else if (this.ind == 3) {
        stuCard(data).then((res) => this.downloadFn(res, "学生卡片", "zip"));
      }
    },
    openIt() {
      this.expand = false;
    },
    closeIt() {
      this.expand = true;
    },
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
      this.zyOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getZY(data)
          .then((res) => {
            this.zyOps = res.data;
          })
          .catch((err) => {});
      }
    },
    getBJ(val) {
      this.bjOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getBJ(data)
          .then((res) => {
            this.bjOps = res.data;
          })
          .catch((err) => {});
      }
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
            case "dmxbm":
              this.$set(this.dmxbmOPs, "checkBox", res.data);
          }
        })
        .catch((err) => {});
    },
    // 获取学院专业班级
    getSpread() {
      getManageRegStuInfoSearchSpread()
        .then((res) => {
          this.manageRegOps = res.data.dwhbj;
        })
        .catch((err) => {});
    },
    //获取年级
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.allNj = res.data.rows;
        })
        .catch((err) => {});
    },
    changeSelect(val) {
      this.searchVal = "";
    },
    handleDatePicker(val) {},
    // 查询
    handleSearch() {
      let csrqs,
        csrqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        csrqs = this.datePicker[0];
        csrqe = this.datePicker[1];
      }
      let data = {
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        sfzjh: this.select == "sfzjh" ? this.searchVal : null,
        yddh: this.select == "yddh" ? this.searchVal : null,
        jg: this.select == "jg" ? this.searchVal : "",
        csdm: this.select == "csdm" ? this.searchVal : "",
        gjdqm: this.select == "gjdqm" ? this.searchVal : "",
        xbm: this.dmxbmOPs.choose,
        csrqs: csrqs,
        csrqe: csrqe,
        pyccm: this.training.choose,
        xz: this.learnHe.choose,
        xjzt: this.studentStatus.choose,
        zzmmm: this.politica.choose,
        sfzx: this.inSchool.choose,
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
      getManageRegStuInfoPageList(data)
        .then((res) => {
          this.tableData = res.data.data;
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
      // console.log(this.training.choose, "单选");
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
      // console.log(this.politica.choose, "单选");
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
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    // 打开导出弹窗
    handleExport() {
      let csrqs,
        csrqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        csrqs = this.datePicker[0];
        csrqe = this.datePicker[1];
      }
      let data = {
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        sfzjh: this.select == "sfzjh" ? this.searchVal : null,
        yddh: this.select == "yddh" ? this.searchVal : null,
        jg: this.select == "jg" ? this.searchVal : "",
        csdm: this.select == "csdm" ? this.searchVal : "",
        gjdqm: this.select == "gjdqm" ? this.searchVal : "",
        xbm: this.dmxbmOPs.choose,
        csrqs: csrqs,
        csrqe: csrqe,
        pyccm: this.training.choose,
        xz: this.learnHe.choose,
        xjzt: this.studentStatus.choose,
        zzmmm: this.politica.choose,
        sfzx: this.inSchool.choose,
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
      this.manageRegStuInfoParam = data;
      this.showExport = true;
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      this.showExport = false;
    },
    hadleDetail(row, flag) {
      // if (flag == '2' && row.flag == 'false' || !row.flag) {
      //   return
      // }

      let schooling = ""; // 3 4 5 是本科
      if (row.pyccm == 1 || row.pyccm == 2) {
        // 1 2 是研究生
        schooling = 2;
      } else {
        schooling = 1;
      }
      this.$router.push({
        path: "/student/studetails",
        query: {
          xh: row.xh,
          show: flag, // 1是详情，2是编辑
          schooling: schooling,
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
.expandOpen {
  width: 80%;
  height: 100px;
  overflow: hidden;
  padding: 10px;
  margin-left: -10px;
}
.expandClose {
  width: 80%;
  height: 310px;
}
.manStudentStyle {
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
        width: 130px;
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
          background: url("../../../../assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("../../../../assets/images/chevronUp.png") no-repeat;
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
          background: url("../../../../assets/images/updata.png") no-repeat;
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
          .blueIcon {
            background: url("~@/assets/images/icon_1.png") no-repeat;
          }
          .orangeIcon {
            background: url("~@/assets/images/icon_2.png") no-repeat;
          }
          .lightIcon {
            background: url("~@/assets/images/icon_3.png") no-repeat;
          }
          .greenIcon {
            background: url("~@/assets/images/export.png");
          }
        }
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
    .noflag {
      color: #ccc;
    }
    .handledie {
      background: url("../../../../assets/images/details.png");
    }
    .handleEdit {
      background: url("../../../../assets/images/edit.png");
    }
  }
}
</style>
