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
        <el-row :gutter="20">
          <el-col :span="5">
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
          <el-col :span="5">
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
          <el-col :span="5">
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
          <el-col :span="5">
            <span>年<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.nj"
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
          <el-col :span="1.5">批准金额范围：</el-col>
          <el-col :span="1.5">
            <el-input-number
              v-model="minSqje"
              :controls="false"
              style="width: 70%"
            ></el-input-number>
          </el-col>
          <el-col :span="0.5" style="margin-top: 7px; margin-left: -52px">
            ——
          </el-col>
          <el-col :span="1.5">
            <el-input-number
              v-model="maxSqje"
              :controls="false"
              style="width: 70%"
            ></el-input-number>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="6">
            <span>申请类别：</span>
            <el-select
              v-model="moreIform.sqlb"
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in sqlbOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>学<span v-html="'\u3000\u3000'"></span>年：</span>
            <el-select
              v-model="moreIform.xn"
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
          <el-col :span="6">
            <span>学<span v-html="'\u3000\u3000'"></span>期：</span>
            <el-select
              v-model="moreIform.xq"
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in xqlist"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="9">
            <span>申请时间：</span>
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
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
          <div class="btns borderOrange" @click="mbDown">
            <i class="icon downIcon"></i><span class="title">模板下载</span>
          </div>
          <div class="btns borderBlue" v-show="AUTHFLAG">
            <el-upload
              accept=".xlsx,.xls"
              :auto-upload="true"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="fileHeader"
              :on-success="upLoadSuccess"
              :on-error="upLoadError"
            >
              <i class="icon blueIcon"></i><span class="title">导入</span>
            </el-upload>
          </div>
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
            sortable="custom"
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="姓名"
            prop="xm"
            sortable="custom"
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
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">申请详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="列表显示项"
      :visible.sync="dynamicModal"
      width="40%"
      :close-on-click-modal="false"
    >
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
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
    <el-dialog
      title="导出确认"
      :visible.sync="daochuModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelB">取 消</el-button>
        <el-button type="primary" class="confirm" @click="daochu()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="审核记录"
      :visible.sync="shRecordModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-table :data="shRecordTable" ref="multipleTable" style="width: 100%">
          <el-table-column label="审核人" prop="userId"></el-table-column>
          <el-table-column fixed="left" label="申请审核结果" prop="opType">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.opType"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in czlx"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select> </template
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="审核时间"
            prop="opTime"
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="申请审核意见"
            prop="msg"
          ></el-table-column>
        </el-table>
        <el-button @click="shRecordcancel">关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="申报详情"
      :visible.sync="detailModal"
      width="60%"
      @close="emptyDetails()"
    >
      <template>
        <div class="baseInfo">
          <el-form :data="basicDetails" style="margin-bottom: 0">
            <div class="formLeft"><span class="title">基本信息</span></div>
            <div class="backDetail">
              <div class="formRight">
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">学号</div>
                      <div class="content">{{ basicDetails.xh }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">姓名</div>
                      <div class="content">{{ basicDetails.xm }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">培养层次</div>
                      <div class="content">{{ basicDetails.pyccmmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">培养单位</div>
                      <div class="content">{{ basicDetails.dwhmc }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">专业</div>
                      <div class="content">{{ basicDetails.zydmmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">年级</div>
                      <div class="content">{{ basicDetails.nj }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">班级</div>
                      <div class="content">{{ basicDetails.bjmmc }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="formLeft"><span class="title">历史申请记录</span></div>
            <el-table :data="formDetails1.oldList">
              <el-table-column label="学年" prop="xnmc"></el-table-column>
              <el-table-column label="学期" prop="xqmc"></el-table-column>
              <el-table-column
                label="批准金额(元)"
                prop="spje"
              ></el-table-column>
              <el-table-column
                label="申请原因类别"
                prop="sqlbmc"
              ></el-table-column>
              <el-table-column label="申请材料" width="450">
                <template slot-scope="scope">
                  <el-upload
                    action="#"
                    class="el-upload"
                    :disabled="true"
                    ref="upload"
                    :on-preview="handlePreview"
                    :file-list="scope.row.fileList"
                  >
                  </el-upload>
                </template>
              </el-table-column>
            </el-table>
            <div class="formLeft"><span class="title">申请信息</span></div>
            <el-table :data="formDetails1.tableSH">
              <el-table-column label="学年" prop="xn"></el-table-column>
              <el-table-column label="学期" prop="xq"></el-table-column>
              <el-table-column
                label="批准金额(元)"
                prop="spje"
              ></el-table-column>
              <el-table-column
                label="申请原因类别"
                prop="sqyylb"
              ></el-table-column>
              <el-table-column label="申请材料" width="450">
                <template slot-scope="scope">
                  <el-upload
                    action="#"
                    class="el-upload"
                    :auto-upload="false"
                    :disabled="true"
                    :file-list="scope.row.fileList"
                  >
                  </el-upload>
                </template>
              </el-table-column>
            </el-table>
            <div class="formLeft"><span class="title">申请理由</span></div>
            <el-form-item>
              <div>
                {{ formDetails1.sqly }}
              </div>
            </el-form-item>
          </el-form>

          <!-- <div class="formLeft"><span class="title">审核信息</span></div>
          <el-form :data="editDetails" :model="editDetails" ref="editDetails">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item
                  label="申请审核结果"
                  label-width="120px"
                  prop="shjg"
                  :rules="rules.shjg"
                >
                  <el-select
                    v-model="editDetails.shjg"
                    @change="changeJG(editDetails.shjg)"
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
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="jeFlag == '02'">
                <el-form-item label="批准金额" label-width="120px" prop="pzje">
                  <el-input
                    v-model="formDetails1.spje"
                    placeholder="请选择"
                    size="small"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item
                  label="申请审核意见"
                  label-width="120px"
                  prop="shyj"
                >
                  <el-input
                    v-model="editDetails.shyj"
                    :autosize="{ minRows: 4 }"
                    type="textarea"
                    maxlength="500"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form> -->
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="shRecord">审核记录</el-button> -->
        <el-button @click="detailCancel">关 闭</el-button>
        <!-- <el-button type="primary" class="confirm" @click="detailClick"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
    <el-dialog
      title="退回选择"
      :visible.sync="thTableModal"
      width="20%"
      :close-on-click-modal="false"
    >
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
        <el-button type="primary" class="confirm" @click="thTableConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
import { delFile, downloadFile, queryFile } from "@/api/common/file";
import { queryLc } from "@/api/common/liucheng";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { backFlow } from "@/api/dailyBehavior/stuTravelTea";
import { getManageRegStuInfoSearchSpread } from "@/api/student/index";
import { getToken } from "@/utils/auth";
import {
  queryYcl,
  getDetail,
  tyFlow,
  htFlow,
  jjFlow,
  xhQuery,
  dshExp,
  mbDown,
} from "@/api/dailyBehavior/lskn";
export default {
  components: { CheckboxCom, checkboxComDynic, lctCom },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/rcswLskn/import",
      xqlist: [],
      basicDetails: {},
      shRecordModal: false,
      shRecordTable: [],
      SHfileList: [],
      conformModal: false,
      conformType: "",
      conformText: "",
      detailModal: false,
      lctModal: false,
      daochuModal: false,
      expand: true,
      searchVal: "",
      select: "",
      isMore: false,
      tjdate: "",
      tempRadio: false,
      moreIform: {
        manageReg: [], // 学院
        stuInfo: [], // 专业
        pread: [], // 班级
        mk: [],
        sqlb: "",
        xn: "",
        xq: "",
        nj: [],
      },
      tableInner: [],
      rules: {
        shjg: [
          { required: true, message: "审核结果不能为空", trigger: "change" },
        ],
        // shyj: [
        //   { required: true, message: "审核意见不能为空", trigger: "change" },
        // ],
      },

      editDetails: {
        shyj: "",
        shjg: "",
        pzje: "",
      },
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
      dynamicModal: false,
      tableHeader: [
        { dm: "dwhmc", mc: "培养单位" },
        { dm: "pyccmmc", mc: "培养层次" },
        { dm: "spje", mc: "批准金额" },
        { dm: "sqlbmc", mc: "申请类别" },
        { dm: "bjmmc", mc: "班级" },
        // { dm: "xnmc", mc: "学年" },
        // { dm: "xqmc", mc: "学期" },
      ],
      dynamicsCheckboxs: {
        //动态表头
        checkAll: false,
        choose: [],
        checkBox: [
          { dm: "dwhmc", mc: "培养单位" },
          { dm: "pyccmmc", mc: "培养层次" },
          { dm: "spje", mc: "批准金额" },
          { dm: "sqlbmc", mc: "申请类别" },
          { dm: "bjmmc", mc: "班级" },
          { dm: "xnmc", mc: "学年" },
          { dm: "xqmc", mc: "学期" },
        ],
        isIndeterminate: true,
      },
      allNj: [],
      maxSqje: "",
      minSqje: "",
      dateValue: [],
      tableData: [],
      multipleSelection: [],
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      jeFlag: "01",
      formDetails1: {},
      shjgOps: [
        { dm: "01", mc: "通过" },
        { dm: "02", mc: "拒绝" },
        { dm: "03", mc: "退回" },
      ],
      tableDetail: {},
      thTableModal: false,
      flag: "01",
      czlx: [],
      multipleSelection1: "",
      AUTHFLAG: false,
      sqlbOps: [],
    };
  },
  mounted() {
    this.getSpread();
    this.getAllCollege();
    this.getAllGrade(); //年级
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmshrzlx");
    this.getCode("dmlsknsqlb"); //申请原因类别
    this.getCode("dmxqm"); //学期
    this.handleSearch();
    this.authConfirm(this.$route.path.split("/"));
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
    shRecord() {
      this.shRecordModal = true;
      queryLc({ processInstanceId: this.tableDetail.processid }).then((res) => {
        this.shRecordTable = res.data;
      });
      //
    },
    mbDown() {
      mbDown().then((res) => {
        this.downloadFn(res, "临时困难模板下载", "xlsx");
      });
    },
    shRecordcancel() {
      this.shRecordModal = false;
      this.shRecordTable = [];
    },
    async hadleDetail(row) {
      this.tableDetail = row;
      var processid = row.id;
      await getDetail(processid).then((res) => {
        res.data.oldList =
          res.data.oldList.length > 0
            ? res.data.oldList.map((ele) => {
                return {
                  name: ele.fileName,
                  ...ele,
                };
              })
            : [];
        res.data.fileList =
          res.data.fileList.length > 0
            ? res.data.fileList.map((ele) => {
                return {
                  name: ele.fileName,
                  ...ele,
                };
              })
            : [];
        this.formDetails1 = res.data;
        var data = {
          xn: res.data.xnmc,
          xq: res.data.xqmc,
          spje: res.data.spje,
          sqyylb: res.data.sqlbmc,
          fileList: res.data.fileList,
        };
        this.formDetails1.tableSH = [];
        this.formDetails1.tableSH.push(data);
      });
      await xhQuery({ xh: row.xh }).then((res) => {
        this.basicDetails = res.data;
      });
      this.detailModal = true;
    },
    handlePreview(file) {
      downloadFile({ id: file.id }).then((res) => {
        this.downloadFn(res, file.fileName, file.fileSuffix);
      });
    },
    beforeRemove(file, fileList) {
      delFile({ id: file.id }).then(() => {
        this.queryFile();
      });
    },
    async queryFile() {
      await queryFile({ id: this.tableDetail.processid }).then((res) => {
        this.SHfileList = res.data;
        this.SHfileList = this.SHfileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
    },
    emptyDetails() {
      this.$refs.editDetails.resetFields();
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
    detailCancel() {
      this.detailModal = false;
    },
    detailClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        this.conformModal = true;
      }
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
        this.tableInner = [];
      } else {
        this.$message.error("请先勾选退回的节点");
      }
    },
    changeJG(val) {
      if (val && val == "03") {
        var processid = { processId: this.tableDetail.taskId };
        this.conformType = "退回";
        this.conformText = "退回确认";
        backFlow(processid).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      } else if (val && val == "02") {
        this.conformType = "拒绝";
        this.conformText = "拒绝确认";
      } else {
        this.conformType = "同意";
        this.conformText = "同意确认";
        this.jeFlag = "02";
      }
    },
    finalCancel() {
      this.conformModal = false;
    },
    finalConfirm() {
      var data = {
        businesId: this.tableDetail.id,
        processId: this.tableDetail.processid,
        taskId: this.tableDetail.taskId,
        // xh: this.tableDetail.xh,
        opMsg: this.editDetails.shyj ? this.editDetails.shyj : "",
        // spje: this.formDetails1.spje ? this.formDetails1.spje : "",
        // actId: "",
        // actName: "",
      };
      if (this.conformType == "退回") {
        data.actId = this.multipleSelection1.actId;
        data.actName = this.multipleSelection1.actName;
        htFlow(data).then((res) => {
          this.conformModal = false;
          this.handleSearch();
          this.$message.success("已退回");
        });
      } else if (this.conformType == "拒绝") {
        jjFlow(data).then((res) => {
          this.conformModal = false;
          this.handleSearch();
          this.$message.success("已拒绝");
        });
      } else {
        data.spje = this.formDetails1.spje ? this.formDetails1.spje : "";
        tyFlow(data).then((res) => {
          this.conformModal = false;
          this.handleSearch();
          this.$message.success("已成功通过");
        });
      }
      this.detailModal = false;
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
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
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    dynamicsCheck(value) {
      let checkedCount = value.length;
      this.dynamicsCheckboxs.checkAll =
        checkedCount === this.dynamicsCheckboxs.checkBox.length;
      this.dynamicsCheckboxs.isIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.dynamicsCheckboxs.checkBox.length;
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

    expTalk() {},
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

    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmxqm":
              this.xqlist = res.data;
              break;
            case "dmshrzlx":
              this.czlx = res.data;
              break;
            case "dmpyccm":
              this.$set(this.training, "checkBox", res.data);
              this.pyccOps = res.data;
              break;
            case "dmlsknsqlb":
              this.sqlbOps = res.data; //
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
      console.log("this.ddd", this.dateValue);
      let data = {
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        pyccm: this.training.choose,
        sqlbm: this.moreIform.sqlb,
        xnm: this.moreIform.xn,
        xqm: this.moreIform.xq,
        bjdm: this.moreIform.pread,
        nj: this.moreIform.nj,
        dwh: this.moreIform.manageReg, //单位
        zydm: this.moreIform.stuInfo, //专业
        // 时间字段
        endTime:
          this.dateValue && this.dateValue.length > 0 ? this.dateValue[1] : "",
        startTime:
          this.dateValue && this.dateValue.length > 0 ? this.dateValue[0] : "",
        maxSqje: this.maxSqje == "" ? 2000000 : this.maxSqje,
        minSqje: this.minSqje,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      console.log("data", data);
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
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 打开导出弹窗
    async handleExport() {
      this.daochuModal = true;
    },
    daochu() {
      var ids = this.multipleSelection.map((item) => item.id);
      let data = {
        doneState: "0",
        idList: ids,
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        pyccm: this.training.choose,
        sqlbm: this.moreIform.sqlb,
        xnm: this.moreIform.xn,
        xqm: this.moreIform.xq,
        bjdm: this.moreIform.pread,
        nj: this.moreIform.nj,
        dwh: this.moreIform.manageReg, //单位
        zydm: this.moreIform.stuInfo, //专业
        maxSqje: this.maxSqje == "" ? 2000000 : this.maxSqje,
        minSqje: this.minSqje,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      dshExp(data).then((res) => {
        this.downloadFn(res, "临时困难已处理列表下载", "xlsx");
        if (this.$store.getters.excelcount > 0) {
          this.$message.success(
            `已成功导出${this.$store.getters.excelcount}条数据`
          );
        }
      });
      this.daochuModal = false;
    },
    handleCancelB() {
      this.daochuModal = false;
    }, // 导出取消
    handleCancel() {
      this.showExport = false;
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
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
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
  .backDetail {
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;

    .formRight {
      width: 100%;
      margin-top: 15px;
      .rowStyle {
        padding: 0 !important;
        margin: 0;
        border-bottom: 1px solid #cccccc;
      }
      .wrap {
        display: flex;
        align-items: center;
        .title {
          flex: 0 0 160px;
          line-height: 36px;
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

      .GreenButton {
        //border: 1px solid grey;
        height: 49px;
        border-radius: 2px;
        background: #005657;
      }
      .title1 {
        font-size: 16px;
        text-align: center;
        line-height: 36px;
        color: #fff;
        // vertical-align: middle;
      }
    }
  }
  .baseInfo {
    // padding: 20px;
    margin-left: 30px;
    margin-right: 30px;
    // overflow-x: auto;
    .formLeft {
      background: #fff;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 20px;
      }
    }
  }
  .formRight {
    width: 100%;
    margin-top: 15px;
    .rowStyle {
      padding: 0 !important;
      margin: 0;
      border-bottom: 1px solid #cccccc;
    }
    .wrap {
      display: flex;
      align-items: center;
      .title {
        flex: 0 0 160px;
        line-height: 36px;
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
