<template>
  <div class="talkRec">
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
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span>{{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20" class="mt15">
          <el-col :span="6">
            <span>培养单位：</span>
            <el-select
              v-model="moreIform.dwh"
              multiple
              collapse-tags
              @change="changeXY"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in allDwh"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>班<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.bjm"
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
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >贷款总金额（区间）</el-col
          >
          <el-col :span="1.5">
            <el-input-number
              v-model="queryParams.dkzjeStart"
              :controls="false"
              style="width: 70%"
            ></el-input-number>
          </el-col>
          <el-col :span="0.5" style="margin-top: 7px; margin-left: -52px">
            ——
          </el-col>
          <el-col :span="1.5">
            <el-input-number
              v-model="queryParams.dkzjeEnd"
              :controls="false"
              style="width: 70%"
            ></el-input-number>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >申请时间：</el-col
          >
          <el-col :span="20">
            <el-date-picker
              type="daterange"
              placeholder="选择日期"
              v-model="queryParams.dksjArr"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width= 60px;"
            ></el-date-picker>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">待审核列表</span> <i class="Updataicon"></i>
          <el-select
            v-model="moreIform.xn"
            collapse-tags
            placeholder="请选择"
            @change="handleSearch"
            style="width: 130px; margin: 0 15px 0"
          >
            <el-option
              v-for="(item, index) in allXn"
              :key="index"
              :label="item.mc"
              :value="item.mc"
            ></el-option>
          </el-select>
          <span>学年</span>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderRed" @click="back">
            <i class="icon backIcon"></i><span class="title">退回</span>
          </div>
          <div class="btns borderRed" @click="refuse">
            <i class="icon refuseIcon"></i><span class="title">拒绝</span>
          </div>
          <div class="btns fullGreen" @click="pass">
            <i class="icon passIcon"></i><span class="title1">通过</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" width="100">
          </el-table-column>
          <el-table-column prop="xm" label="姓名" width="85"> </el-table-column>
          <el-table-column prop="ssdwdmmc" label="培养单位"> </el-table-column>
          <el-table-column prop="bjdmmc" label="班级"> </el-table-column>
          <el-table-column
            prop="dkzje"
            label="贷款总金额（元）"
            min-width="100"
          >
          </el-table-column>
          <el-table-column prop="dkqx" label="贷款期限（月）"> </el-table-column
          ><el-table-column prop="sqsj" label="申请时间"> </el-table-column>
          <el-table-column
            prop="jg"
            label="审核进度"
            sortable="custom"
            :show-overflow-tooltip="true"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程记录</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, scope.$index)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">申报详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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

      <el-dialog
        title="申报详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="80%"
      >
        <template>
          <el-form>
            <el-row :gutter="20">
              <el-col :span="4">
                <el-form-item label="申报人学号" label-width="100px">
                  <el-input
                    :disabled="true"
                    v-model="defaultRes.xh"
                    placeholder="请输入"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="4">
                <el-form-item label="姓名" label-width="60px">
                  <el-input
                    :disabled="true"
                    v-model="defaultRes.xm"
                    placeholder="请输入"
                  ></el-input> </el-form-item></el-col
              ><el-col :span="4">
                <el-form-item label="学院" label-width="60px">
                  <el-input
                    :disabled="true"
                    v-model="defaultRes.dwhmc"
                    placeholder="请输入"
                  ></el-input> </el-form-item></el-col
              ><el-col :span="4">
                <el-form-item label="专业" label-width="60px">
                  <el-input
                    :disabled="true"
                    v-model="defaultRes.zydmmc"
                    placeholder="请输入"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="4">
                <el-form-item label="班级" label-width="60px">
                  <el-input
                    :disabled="true"
                    v-model="defaultRes.bjmmc"
                    placeholder="请输入"
                  ></el-input> </el-form-item
              ></el-col>
            </el-row>
          </el-form>
          <el-table :data="tableDetails" v-if="whatType == '1'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader1" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column
              prop="fileList"
              label="结业证书"
              sortable="custom"
              align="center"
              width="300"
              fixed="right"
            >
              <template slot-scope="scope">
                <div v-for="item in scope.row.fileList">
                  <div style="display: flex; justify-content: space-between">
                    <a>
                      {{ item.fileName }}
                    </a>
                    <el-button>预览</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="审核状态"
              sortable="custom"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableDetails" v-if="whatType == '2'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader2" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableDetails" v-if="whatType == '3'">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <div v-for="(item, index) in tableHeader3" :key="index">
              <el-table-column
                :prop="item.dm"
                :label="item.mc"
                sortable="custom"
              ></el-table-column>
            </div>
            <el-table-column prop="status" label="审核状态" sortable="custom">
              <template slot-scope="scope" fixed="right">
                <el-select
                  v-model="scope.row.status"
                  placeholder="请选择"
                  :disabled="true"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="back">
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">退回</span>
                </el-button>
                <el-button type="text" size="small" @click="refuse">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">拒绝</span>
                </el-button>
                <el-button type="text" size="small" @click="pass">
                  <i class="scopeIncon handleEdit"></i>
                  <span class="handleName">通过</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="confirm"
            @click="upDate"
            v-if="upDownIndex > 0"
            >上一条</el-button
          >
          <el-button type="primary" class="confirm" @click="">下一条</el-button>
          <el-button @click="detailCancel">关 闭</el-button>
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
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { dshList, dshExp, tyFlow, jjFlow, thFinal } from "@/api/gzzxdk/gjzxdk";
import { getCollege } from "@/api/class/maintenanceClass";
import { backFlow } from "@/api/dailyBehavior/dormTea";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getBJ } from "@/api/student/index";
import lctCom from "../../../components/lct";
export default {
  components: { lctCom },
  name: "dksh",
  data() {
    return {
      lctModal: false,
      showExport: false,
      ztStatus: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwh: [], // 学院下拉框
        bjm: [],
        xn: "",
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      updownDate: [],
      allDwh: [],
      bjOps: [], // 班级下拉
      allXn: [], //学年下拉
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dksjArr: [],
        // 金额
        dkzjeEnd: 99999,
        dkzjeStart: 1,
        orderZd: "",
        orderPx: "",
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      multipleSelection: [],
      multipleSelection1: {},
      jjModal: false,
      jjly: "",
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      tempRadio: false,
      defaultRes: {},
      detailModal: false,
      whatType: "",
      tableDetails: [{ gzgw: "", fwnr: "" }],
      upDownIndex: 0,
    };
  },

  mounted() {
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getSchoolYears();
  },

  methods: {
    async upDate() {
      var tarIndex = this.upDownIndex - 1;
      var tar = this.updownDate[tarIndex];
      var data = {
        xh: tar.xh,
        pageNum: "",
        pageSize: "",
        orderZd: "",
        orderPx: "",
        businesId: tar.businesId,
      };
      this.upDownIndex = this.upDownIndex - 1;
    },
    //获取学年
    getSchoolYears() {
      queryXn()
        .then((res) => {
          this.allXn = res.data;
          this.moreIform.xn = res.data[0].mc;
          this.handleSearch();
        })
        .catch((err) => {});
    },
    async upDate() {
      var tarIndex = this.upDownIndex - 1;
      var tar = this.updownDate[tarIndex];
      var data = {
        xh: tar.xh,
        pageNum: "",
        pageSize: "",
        orderZd: "",
        orderPx: "",
        businesId: tar.businesId,
      };
      switch (tar.mk) {
      }
      this.upDownIndex = this.upDownIndex + 1;
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.businesId);
      }
      this.$set(this.exportParams, "ids", ids);
      dshExp(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "贷款待审核列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});
      this.showExport = false;
    },
    expor() {
      var data = {};
      data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        xn: this.moreIform.xn,
        dkkssjEnd:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[0]
            : "",
        dkkssjStart:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[1]
            : "",
        dkzjeEnd: this.queryParams.dkzjeEnd,
        dkzjeStart: this.queryParams.dkzjeStart,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        pageNum: 0,
        pageSize: 0,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
    },
    detailCancel() {
      this.detailModal = false;
      this.commonParams = [];
    },
    getCode1(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
        }
      });
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
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
            this.detailModal = false;
            this.handleSearch();
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
          this.detailModal = false;
          this.handleSearch();
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
          this.detailModal = false;
          this.$message.success("退回成功");
          this.handleSearch();
        }
      });
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.zydm = []; // 专业
        this.moreIform.bjm = []; // 班级
      }
      this.getBJ(val);
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
    async hadleDetail(row, index) {
      console.log("row", row);
      this.upDownIndex = index;
      this.defaultRes = row;
      this.detailModal = true;
      var data = {
        xh: row.xh,
        pageNum: "",
        pageSize: "",
        orderZd: "",
        orderPx: "",
        businesId: row.businesId,
      };
      switch (row.mk) {
      }
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        xn: this.moreIform.xn,
        dkkssjEnd:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[0]
            : "",
        dkkssjStart:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[1]
            : "",
        dkzjeEnd: this.queryParams.dkzjeEnd,
        dkzjeStart: this.queryParams.dkzjeStart,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      dshList(data)
        .then((res) => {
          this.tableData = res.data;
          this.updownDate = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    //获取培养层次
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
          }
        })
        .catch((err) => {});
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.businesId,
        processId: v.processid,
        status: v.status,
        taskId: v.taskId,
        xh: v.xh,
      }));
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
.talkRec {
  .lct {
    background: url("~@/assets/dangan/lct.png");
  }
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .el-button--text {
    border-color: transparent;
    color: #005657;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
  }
  .handledie {
    background: url("~@/assets/images/details.png");
  }
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
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
        align-items: center;
        .borderBlue {
          background: #fff;
          border: 1px solid grey;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fff;
        }
        .borderRed {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
        .fullGreen {
          // border:1px solid #005657;
          color: #fff;
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
          }
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }
          .deteIcon {
            background: url("~@/assets/images/yes.png") no-repeat;
          }
          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
          }
          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
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
        }
      }
    }
  }
  .backDetail {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    border-style: solid;
    border-width: 1px;
    border-color: #cccccc;
    .formLeft {
      width: 15%;
      background: #fff;
      display: flex;
      align-items: center;
      .title {
        width: 100%;
        text-align: center;
      }
    }
    .formRight {
      width: 85%;
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
      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: top;
        margin-right: 5px;
      }
      .greenIcon {
        margin: 15px;
        background: url("~@/assets/assistantPng/add.png") no-repeat;
      }
    }
  }
}
</style>
