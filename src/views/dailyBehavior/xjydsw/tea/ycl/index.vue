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
            placeholder="请选择查询条件"
          >
            <el-option label="学号" value="xh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
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
            <span>培养单位：</span>
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
            <span>专<span v-html="'\u3000\u3000'"></span>业：</span>
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
            <span>班<span v-html="'\u3000\u3000'"></span>级：</span>
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
          <el-col :span="3">异动类别：</el-col>
          <el-col :span="8">
            <div class="checkbox">
              <el-select
                v-model="moreIform.mk"
                multiple
                collapse-tags
                placeholder="请选择异动类别"
                size="small"
              >
                <el-option
                  v-for="(item, index) in ydlbList"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">申请时间：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="tjdate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="请选择申请时间"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">审核状态：</el-col>
          <el-col :span="8">
            <div class="checkbox">
              <el-select
                v-model="moreIform.ztStatus"
                multiple
                collapse-tags
                placeholder="请选择审核状态"
                size="small"
              >
                <el-option
                  v-for="(item, index) in ztStatus"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">已处理列表</span> <i class="Updataicon"></i>
        </div>

        <div class="headerRight">
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns" style="background: #ffffff" @click="dynamicTable">
            <i class="icon controlIcon"></i>
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
            fixed="left"
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="学号"
            prop="xh"
            width="100"
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="姓名"
            prop="xm"
            width="80"
          ></el-table-column>
          <div v-for="(item, index) in tableHeader" :key="index">
            <el-table-column
              :prop="item.dm"
              :label="item.mc"
              min-width="100"
              sortable="custom"
            ></el-table-column>
          </div>
          <el-table-column fixed="right" label="审核进度" width="140">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">异动详情</span>
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
    <el-dialog title="列表显示项" :visible.sync="dynamicModal" width="40%">
      <div class="checkbox">
        <checkboxComDynic
          :objProp="dynamicsCheckboxs"
          @training="dynamicsAll"
          @checkedTraining="dynamicsCheck"
        ></checkboxComDynic>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dynamicCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="dynamicConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="showExportC" width="30%">
      <el-form :inline="true">
        <el-form-item label="培养层次">
          <el-select v-model="pycc" placeholder="请选择">
            <el-option
              v-for="item in pyccOps"
              :key="item.dm"
              :label="item.mc"
              :value="item.dm"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelC">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleAdd"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
    <!-- <exportView
          v-if="showExport"
          :tag="1"
          :showExport="showExport"
          :multipleSelection="multipleSelection"
          :manageRegStuInfoParam="manageRegStuInfoParam"
          :op="op"
          @handleCancel="handleCancel"
          @handleConfirm="handleConfirm"
        ></exportView> -->
    <el-dialog title="导出确认" :visible.sync="daochuModal" width="30%">
      <span>确认导出{{ leng }}条学生数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelB">取 消</el-button>
        <el-button type="primary" class="confirm" @click="daochu()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
import CheckboxCom from "../../../../components/checkboxCom";
import checkboxComDynic from "../../../../components/checkboxComDynic";
import lctCom from "../../../../components/lct";
// import exportView from "./exportView/index.vue";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ, importRegStuExcel } from "@/api/student/index";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import {
  getManageRegStuInfoSearchSpread,
  getManageRegStuInfoPageList,
  gradStu,
  stuCard,
  stuReg,
  fileDown,
} from "@/api/student/index";

import { queryYcl } from "@/api/dailyBehavior/xjyd";
import { getToken } from "@/utils/auth";
export default {
  name: "absentee",
  //   components: { CheckboxCom, exportView, checkboxComDynic },
  components: { CheckboxCom, checkboxComDynic, lctCom },
  data() {
    return {
      lctModal: false,
      uploadUrl: process.env.VUE_APP_BASE_API + "/regStuInfo/importRegStuExcel",
      daochuModal: false,
      leng: 0,
      op: "0",
      manageRegStuInfoParam: {},
      title: "导出提示",
      expand: true,
      searchVal: "",
      select: "",
      isMore: false,
      showExportA: false,
      showExportC: false,
      pycc: "",
      tjdate: "",
      moreIform: {
        manageReg: [], // 学院
        stuInfo: [], // 专业
        pread: [], // 班级
        mk: [],
        ztStatus: [],
      },
      ztStatus: [],
      ydlbList: [
        { dm: "fx", mc: "复学" },
        { dm: "blxj", mc: "保留学籍" },
        { dm: "xx", mc: "休学" },
        { dm: "tx", mc: "退学" },
        // { dm: "复学", mc: "复学" },
        // { dm: "保留学籍", mc: "保留学籍" },
        // { dm: "休学", mc: "休学" },
        // { dm: "退学", mc: "退学" },
        // { dm: "征兵入伍", mc: "征兵入伍" },
        // { dm: "境内交换生项目", mc: "境内交换生项目" },
        // { dm: "境外交换生项目", mc: "境外交换生项目" },
        // { dm: "身体疾病", mc: "身体疾病" },
        // { dm: "心理疾病", mc: "心理疾病" },
        // { dm: "精神疾病", mc: "精神疾病" },
        // { dm: "自主创业", mc: "自主创业" },
        // { dm: "工作实践", mc: "工作实践" },
        // { dm: "自费境外留学", mc: "自费境外留学" },
        // { dm: " 自动退学", mc: " 自动退学" },
        // { dm: " 自动采用休学", mc: " 自动采用休学" },
        // { dm: " 保留学籍类型", mc: " 保留学籍类型" },
      ],
      allDwh: [], // 学院下拉框
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      pyccOps: [], //培养层次
      datePicker: "",
      manageRegOps: [], //
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      ind: 1,
      len: 0,
      dynamicModal: false,
      tableHeader: [
        { dm: "dwhmc", mc: "培养单位" },
        { dm: "pyccmmc", mc: "培养层次" },
        { dm: "zydmmc", mc: "专业" },
        { dm: "bjmmc", mc: "班级" },
        { dm: "mkmc", mc: "异动类别" },
        { dm: "tjdate", mc: "申请时间" },
      ],
      dynamicsCheckboxs: {
        //动态表头
        checkAll: false,
        choose: [],
        checkBox: [
          {
            dm: "xm",
            mc: "姓名",
          },
          {
            dm: "xbmmc",
            mc: "性别",
          },
          {
            dm: "csrq",
            mc: "出生日期",
          },
          {
            dm: "sfzjh",
            mc: "身份证",
          },
          {
            dm: "xh",
            mc: "学号",
          },
          {
            dm: "dwmc",
            mc: "单位",
          },
          {
            dm: "zydmc",
            mc: "专业",
          },
          {
            dm: "bjm",
            mc: "班级",
          },
          {
            dm: "xz",
            mc: "学制",
          },
          {
            dm: "zzmmc",
            mc: "政治面貌",
          },
          {
            dm: "mzmc",
            mc: "民族",
          },
          {
            dm: "xjztmc",
            mc: "学籍状态",
          },
          {
            dm: "jgmc",
            mc: "籍贯",
          },
          {
            dm: "jgmc",
            mc: "国籍",
          },
          {
            dm: "csdm",
            mc: "出生地",
          },
          {
            dm: "jtdh",
            mc: "家庭电话",
          },
          {
            dm: "yzbm",
            mc: "家庭邮编",
          },
          {
            dm: "jtzz",
            mc: "家庭住址",
          },

          {
            dm: "nj",
            mc: "年级",
          },
          {
            dm: "yddh",
            mc: "移动电话",
          },
          {
            dm: "dzyx",
            mc: "电子邮箱",
          },
          {
            dm: "qqhm",
            mc: "QQ号码",
          },
        ],
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
      form: {
        xh: "",
        xm: "",
        dwh: "",
        pyccm: "",
        xbm: "",
        nj: "",
        sfzjh: "",
      },
      AUTHFLAG: false,
    };
  },
  watch: {},

  mounted() {
    this.getSpread();
    this.getAllCollege();
    this.getAllGrade(); //年级
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmsplcm"); //状态
    this.handleSearch();
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  activated() {
    this.handleSearch();
  },
  computed: {
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
        };
      },
    },
  },
  methods: {
    dynamicsCheck(value) {
      let checkedCount = value.length;
      this.dynamicsCheckboxs.checkAll =
        checkedCount === this.dynamicsCheckboxs.checkBox.length;
      this.dynamicsCheckboxs.isIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.dynamicsCheckboxs.checkBox.length;
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick(row) {
      if (!!row.processId) {
        this.$refs.child.inner(row.processId);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    dynamicsAll(val) {
      let allCheck = [];
      for (let i in this.dynamicsCheckboxs.checkBox) {
        allCheck.push(this.dynamicsCheckboxs.checkBox[i]);
      }
      this.dynamicsCheckboxs.choose = val ? allCheck : [];

      this.dynamicsCheckboxs.isIndeterminate = false;
    },
    dynamicCancel() {
      this.dynamicModal = false;
    },
    dynamicConfirm() {
      this.tableHeader = this.dynamicsCheckboxs.choose;
      this.dynamicModal = false;
    },
    dynamicTable() {
      this.dynamicModal = true;
    },
    //模板下载
    mbDown() {
      fileDown().then((res) =>
        this.downloadFn(res, "在籍学生信息模板下载", "xlsx")
      );
    },
    ///上传
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
        this.handleSearch();
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },

    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
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
    handleCancelC() {
      this.showExportC = false;
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
    openAdd() {
      this.showExportC = true;
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
            case "dmsplcm": //审批结果
              this.ztStatus = res.data;
              break;
            case "dmpyccm":
              this.$set(this.training, "checkBox", res.data);
              this.pyccOps = res.data;
              break;
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
    // 查询
    handleSearch() {
      let data = {
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        dwh: this.moreIform.manageReg,
        zydm: this.moreIform.stuInfo,
        pyccm: this.training.choose,
        bjm: this.moreIform.pread,
        mk: this.moreIform.mk,
        tjdate: this.tjdate,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        status: this.moreIform.ztStatus,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryYcl(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
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

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    // 打开导出弹窗
    async handleExport() {
      let csrqs,
        csrqe = "";

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
        xxxs: this.isQuan.choose,
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
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.manageRegStuInfoParam = data;
      if (this.multipleSelection.length > 0) {
        this.leng = this.multipleSelection.length;
      } else {
        await getManageRegStuInfoPageList(data)
          .then((res) => {
            this.leng = res.data.total;
          })
          .catch((err) => {});
      }
      if (this.leng > 0) {
        this.daochuModal = true;
      } else {
        this.$message.warning("当前无数据导出");
      }
    },
    daochu() {
      this.daochuModal = false;
      this.showExport = true;
    },
    handleCancelB() {
      this.daochuModal = false;
    }, // 导出取消
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
    //新增
    handleAdd() {
      if (!this.pycc) {
        this.$message.error("请选择培养层次");
      } else {
        let schooling = "";
        if (this.pycc == 1 || this.pycc == 2) {
          // 1 2 是研究生
          schooling = 2;
        } else {
          schooling = 1;
        }

        this.$router.push({
          path: "/student/addstuDetails",
          query: {
            pycc: this.pycc,
            schooling: schooling,
          },
        });
        this.showExportC = false;
        this.pycc = "";
      }
    },
    // //导入
    // handleImport() {
    //   importRegStuExcel().then((res) => {});
    // },
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
        width: 150px;
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
        display: flex;

        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
        .title2 {
          font-size: 14px;
          text-align: center;
          line-height: 22px;
          // vertical-align: middle;
        }
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/updata.png") no-repeat;
        }
        .borderBlue {
          border: 1px solid #0d84e0;
          color: #0d84e0;
          background: #ebfafd;
        }
        .btns2 {
          margin-left: 15px;
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
        }
      }
      .headerRight {
        display: flex;
        .dropDown {
          margin-right: 20px;
        }
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
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            // vertical-align: middle;
          }
          .title1 {
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
          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
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
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
          }
          .controlIcon {
            background: url("~@/assets/images/control.png");
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
    .lct {
      background: url("~@/assets/dangan/lct.png");
    }
    .noflag {
      color: #ccc;
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
