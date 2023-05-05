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
            <el-option label="处分文号" value="cfwh"></el-option>
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
          <el-col :span="3">培养单位：</el-col>
          <el-col :span="6">
            <el-select
              v-model="moreIform.ssdwdm"
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
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">处分等级：</el-col>
          <el-col :span="8">
            <div class="checkbox">
              <el-select
                v-model="moreIform.cfdjmmc"
                multiple
                collapse-tags
                placeholder="请选择处分等级"
                size="small"
              >
                <el-option
                  v-for="(item, index) in cfdjList"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">处分日期：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="moreIform.cfrq"
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
          <el-col :span="3">处分期限：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                type="daterange"
                placeholder="选择日期"
                v-model="moreIform.cfjx"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width= 60px;"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">申请解除日期：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="moreIform.sqjcrq"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="请选择申请时间"
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
          <span class="title">待审核列表</span> <i class="Updataicon"></i>
          <div style="margin-left: 10px">
            <el-cascader
              v-model="dqXnxq"
              :options="options"
              @change="handleChangeXnxq"
              :props="XnxqProps"
            ></el-cascader>
          </div>
        </div>

        <div class="headerRight">
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
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
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column
            label="学号"
            prop="xh"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            label="姓名"
            prop="xm"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            label="培养单位"
            prop="ssdwdmmc"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            label="处分等级"
            prop="cfdjmmc"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            label="处分日期"
            prop="cfrq"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            label="处分期限"
            prop="xm"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            label="处分文号"
            prop="cfwh"
            sortable="custom"
          ></el-table-column>
          <el-table-column prop="fileList" label="附件" align="center">
            <template slot-scope="scope">
              <div v-for="item in scope.row.files">
                <div style="display: flex; justify-content: space-between">
                  <el-button type="text" size="small" @click="xzWj(item)">
                    <span class="handleName">{{ item.fileName }}</span>
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="申请解除期限"
            prop="sqjcrq"
            sortable="custom"
          ></el-table-column>

          <el-table-column fixed="right" label="操作">
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
      </div>
    </div>
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
      width="40%"
      :close-on-click-modal="false"
    >
      <div v-for="(item, i) in shRecordTable" style="margin-top: 15px">
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">审核人</div>
              <div class="bs">{{ item.userName }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">申请时间</div>
              <div class="bs">{{ item.opTime }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">审核结果</div>
              <div class="bs">{{ item.opTypeName }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">审核意见</div>
              <div class="bs">{{ item.msg }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
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
          <el-form :model="formDetails">
            <div class="backDetail">
              <div class="formRight">
                <el-row :gutter="20">
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">学号</div>
                      <div class="content">{{ basicInfo.xh }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">姓名</div>
                      <div class="content">{{ basicInfo.xm }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">性别</div>
                      <div class="content">{{ basicInfo.xbmmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">培养层次</div>
                      <div class="content">{{ basicInfo.pyccmmc }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">培养单位</div>
                      <div class="content">{{ basicInfo.ssdwdmmc }}</div>
                    </div>
                  </el-col>

                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">年级</div>
                      <div class="content">{{ basicInfo.ssnj }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">专业</div>
                      <div class="content">{{ basicInfo.zydmmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">班级</div>
                      <div class="content">{{ basicInfo.bjmc }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="formLeft"><span class="title">学院意见</span></div>
            <div>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="违纪事实描述" label-width="120px">
                    {{ formDetails.wjssmsXgbfzr }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="处分依据条款" label-width="120px">
                    {{ formDetails.cfyjtkXgbfzr }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="处分等级" label-width="120px">
                    {{ formDetails.cfdjmmc }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="单位建议" label-width="120px">
                    {{ formDetails.dwjyXgbfzr }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-table
                :data="tableDataDetail"
                ref="multipleTable"
                style="width: 100%"
              >
                <el-table-column prop="cfrq" label="处分日期">
                </el-table-column>
                <el-table-column prop="cfqxStart" label="处分开始日期">
                </el-table-column>
                <el-table-column prop="cfqxEnd" label="处分结束日期">
                </el-table-column>
                <el-table-column
                  prop="cfwh"
                  label="处分文号"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
              <div
                style="
                  margin: 20px 0 20px 0;
                  font-size: larger;
                  font-weight: bolder;
                "
              >
                矫正教育情况
              </div>
              <el-table
                :data="tableDataDetail2"
                ref="multipleTable"
                style="width: 100%"
              >
                <el-table-column prop="zpgw" label="指派岗位">
                </el-table-column>
                <el-table-column prop="xs" label="应休时长"> </el-table-column>
                <el-table-column prop="thcs" label="谈话次数">
                </el-table-column>
                <el-table-column
                  prop="zzkjssj"
                  label="最早可结束时间"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
              <div
                style="
                  margin: 20px 0 20px 0;
                  font-size: larger;
                  font-weight: bolder;
                "
              >
                申请理由
              </div>
              <div>
                {{ formDetails.sqly }}
              </div>
            </div>
            <div
              style="
                margin: 20px 0 20px 0;
                font-size: larger;
                font-weight: bolder;
              "
            >
              审批
            </div>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="申请审核结果" label-width="120px">
                  <el-select
                    v-model="editDetails.shjg"
                    @change="changeJG(editDetails.shjg)"
                    placeholder="请选择"
                    size="small"
                    clearable
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
          </el-form>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shRecord">审核记录</el-button>
        <el-button @click="detailCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="detailClick"
          >确 定</el-button
        >
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
import { delFile, downloadFile, queryFile } from "@/api/common/file";
import { queryLc } from "@/api/common/liucheng";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getCollege, getGrade, getBanji } from "@/api/class/maintenanceClass";
import { backFlow } from "@/api/dailyBehavior/stuTravelTea";
import { queryXnXq } from "@/api/dailyBehavior/vocationTea";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
import {
  dshList,
  getTeaDetail,
  tyFlow,
  htFlow,
  jjFlow,
  dshEXP,
} from "@/api/xscfNew.js";
export default {
  watch: {
    "moreIform.cfjx": function (newV) {
      if (newV) {
        this.moreIform.cfrqStart = newV[0];
        this.moreIform.cfrqEnd = newV[1];
      } else {
        //清空时间
        this.moreIform.cfrqStart = "";
        this.moreIform.cfrqEnd = "";
      }
    },
  },
  data() {
    return {
      dqXnxq: [],
      XnxqProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      moreIform: {
        ssdwdm: [], // 学院
        cfdjmmc: [], //处分等级
        cfrq: "",
        cfjx: [], //处分期限
        cfrqEnd: "", //处分期限结束
        cfrqStart: "", //处分期限开始
        sqjcrq: "", //申请解除日期
      },
      tableDataDetail: [],
      tableDataDetail2: [],
      xjydModal: false,
      shRecordModal: false,
      shRecordTable: [],
      uploadUrl: process.env.VUE_APP_BASE_API + "/fileCommon/uploadFileCommon",
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
      //更多条件

      tableInner: [],
      rules: {
        shjg: [
          { required: true, message: "审核结果不能为空", trigger: "change" },
        ],
      },
      fxBj: "",
      fxNj: "",
      editDetails: {
        shyj: "",
        shjg: "",
      },
      cfdjList: [], //处分等级
      allDwh: [], // 学院下拉框
      pyccOps: [], //培养层次
      datePicker: "",
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
        xn: "",
        xq: "",
      },
      ind: 1,
      len: 0,
      allNj: [],
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
      Type: "",
      formDetails: {},
      formDetails1: {},
      shjgOps: [
        { dm: "01", mc: "通过" },
        { dm: "02", mc: "拒绝" },
        { dm: "03", mc: "退回" },
      ],
      tableDetail: {},
      thTableModal: false,
      multipleSelection1: "",
      formDetails: {},
      basicInfo: {},
      AUTHFLAG: false,
    };
  },
  mounted() {
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmcfdjm"); //处分等级
    this.getXnxq();
    this.handleSearch();
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  activated() {
    this.handleSearch();
  },
  methods: {
    getXnxq() {
      queryXnXq().then((res) => {
        this.options = res.data;
        for (let item of res.data) {
          for (let num of item.dataCodeCascadingList)
            if (num.dataCodeCascadingList !== null) {
              this.dqXnxq = [item.dm, num.dm];
            }
        }
        this.moreIform.xn = this.dqXnxq[0];
        this.moreIform.xq = this.dqXnxq[1];
        this.handleSearch();
      });
    },
    handleChangeXnxq() {
      this.moreIform.xn = " ";
      this.moreIform.xq = "";
      if (this.dqXnxq[0]) {
        this.moreIform.xn = this.dqXnxq[0];
      }
      if (this.dqXnxq[1]) {
        this.moreIform.xq = this.dqXnxq[1];
      }
      this.handleSearch();
    },
    xjydModalCancel() {
      this.xjydModal = false;
    },
    shRecord() {
      this.shRecordModal = true;
      queryLc({ processInstanceId: this.tableDetail.processId }).then((res) => {
        this.shRecordTable = res.data;
      });
    },
    shRecordcancel() {
      this.shRecordModal = false;
      this.shRecordTable = [];
    },
    async hadleDetail(row) {
      this.tableDataDetail[0] = row;

      queryKnssqxsjbxx({ xh: row.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      getTeaDetail({ id: row.id }).then((res) => {
        this.formDetails = res.data;
        this.detailModal = true;
        var arr = [];
        var obj = {
          zzkjssj: res.data.zzkjssj,
          xs: res.data.xs,
          thcs: res.data.thcs,
          zpgw: res.data.zpgw,
        };
        arr.push(obj);
        this.tableDataDetail2 = arr;
      });
      this.tableDetail = row;
      this.detailModal = true;
    },
    handlePreview(file) {
      downloadFile({ id: file.id }).then((res) => {
        this.downloadFn(res, file.fileName, file.fileSuffix);
      });
    },
    xzWj(item) {
      downloadFile({ id: item.id.toString() }).then((res) => {
        this.downloadFn(res, item.fileName);
      });
    },
    beforeRemove(file, fileList) {
      delFile({ id: file.id }).then(() => {
        this.queryFile();
      });
    },
    async queryFile() {
      await queryFile({ businesId: this.tableDetail.processId }).then((res) => {
        this.SHfileList = res.data;
        this.SHfileList = this.SHfileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
    },
    detailCancel() {
      this.detailModal = false;
    },
    detailClick() {
      if (this.editDetails.shjg == "") {
        this.$message.error("请先选择审核结果");
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
        var processId = { processId: this.tableDetail.taskId };
        this.conformType = "退回";
        this.conformText = "退回确认";
        backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      } else if (val && val == "02") {
        this.conformType = "拒绝";
        this.conformText = "拒绝确认";
      } else {
        this.conformType = "同意";
        this.conformText = "同意确认";
      }
    },
    finalCancel() {
      this.conformModal = false;
    },
    finalConfirm() {
      var reqList = [
        {
          id: this.tableDetail.id,
          processId: this.tableDetail.processId,
          taskId: this.tableDetail.taskId,
          xh: this.tableDetail.xh,
          opMsg: this.editDetails.shyj ? this.editDetails.shyj : "",
          actId: "",
          actName: "",
        },
      ];
      if (this.conformType == "退回") {
        reqList[0].actId = this.multipleSelection1.actId;
        reqList[0].actName = this.multipleSelection1.actName;
        htFlow(reqList).then((res) => {
          this.conformModal = false;
          this.handleSearch();
          this.$message.success("已退回");
        });
      } else if (this.conformType == "拒绝") {
        jjFlow(reqList).then((res) => {
          this.conformModal = false;
          this.handleSearch();
          this.$message.success("已拒绝");
        });
      } else {
        tyFlow(reqList).then((res) => {
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
    // 查询学院
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
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
            case "dmcfdjm":
              this.cfdjList = res.data;
              break;
            case "dmpyccm":
              this.$set(this.training, "checkBox", res.data);
              this.pyccOps = res.data;
              break;
          }
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
        cfwh: this.select == "cfwh" ? this.searchVal : null,
        ...this.queryParams,
        ...this.moreIform,
      };
      dshList(data)
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
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 打开导出弹窗
    handleExport() {
      this.daochuModal = true;
    },
    daochu() {
      var ids = this.multipleSelection.map((item) => item.businesId);
      let data = {
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        cfwh: this.select == "cfwh" ? this.searchVal : null,
        ...this.queryParams,
        ...this.moreIform,
      };
      dshEXP(data).then((res) => {
        this.downloadFn(res, "待审核列表下载", "xlsx");
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

.yiny {
  border: 1px solid grey;
  height: 50px;
  border-collapse: collapse;
}
.hs {
  flex: 0 0 100px;
  border-right: 1px solid grey;
  text-align: center;
  line-height: 50px;
  border-collapse: collapse;
}
.bs {
  padding-left: 40px;
  line-height: 50px;
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

      .GreenButton {
        //border: 1px solid grey;
        height: 49px;
        border-radius: 2px;
        background: #005657;
      }
      .title1 {
        font-size: 16px;
        text-align: center;
        line-height: 48px;
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
