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
            <span>专<span v-html="'\u3000\u3000'"></span>业：</span>
            <el-select
              v-model="moreIform.zydm"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in zyOps"
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
          <el-col :span="6">
            <span>年<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.nj"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in njOps"
                :key="item"
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
        <el-row :gutter="20">
          <el-col :span="6">
            <span>证件类型：</span>
            <el-select
              v-model="moreIform.zjlx"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in zjlxOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <span>申请时间：</span>
            <el-date-picker
              type="daterange"
              placeholder="选择日期"
              v-model="datePicker"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width= 60px;"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="6">
            <span>审核状态：</span>
            <el-select
              v-model="moreIform.status"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in spjgOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <span>审核时间：</span>
            <el-date-picker
              type="daterange"
              placeholder="选择日期"
              v-model="datePickerSH"
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
          <span class="title">已处理列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @sort-change="changeTableSort"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" width="100" sortable="custom">
          </el-table-column>
          <el-table-column prop="xm" label="姓名" width="85" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="dwhmc"
            label="培养单位"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="zjlx"
            label="证件类型"
            width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="sqsj"
            label="申请时间"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="shsj"
            label="审核时间"
            min-width="100"
            sortable="custom"
          >
          </el-table-column
          ><el-table-column
            prop="status"
            label="审核状态"
            width="110"
            sortable="custom"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.status"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in spjgOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="sfjf"
            label="缴费"
            min-width="80"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="sfqj"
            label="制证"
            min-width="80"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="sfqj"
            label="取件"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="mk" label="审核进度">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流转记录</span>
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
      <el-dialog
        title="申报详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="60%"
      >
        <template>
          <div class="baseInfo">
            <el-form :data="formDetails">
              <div class="formLeft"><span class="title">基本信息</span></div>
              <div class="tableStyle">
                <div class="imgWrap">
                  <div class="photo">
                    <img
                      :src="
                        formDetails
                          ? 'data:image/png;base64,' + formDetails.lpzp
                          : ''
                      "
                      alt="照片"
                    />
                  </div>
                </div>
                <div class="information">
                  <el-row>
                    <el-col :span="10" class="rowStyle">
                      <div class="wrap">
                        <div class="title">学号</div>
                        <div class="content">{{ formDetails.xh }}</div>
                      </div>
                    </el-col>
                    <el-col :span="14" class="rowStyle">
                      <div class="wrap">
                        <div class="title">姓名</div>
                        <div class="content">{{ formDetails.xm }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10" class="rowStyle">
                      <div class="wrap">
                        <div class="title">生源地</div>
                        <div class="content">{{ formDetails.syd }}</div>
                      </div>
                    </el-col>
                    <el-col :span="14" class="rowStyle">
                      <div class="wrap">
                        <div class="title">性别</div>
                        <div class="content">{{ formDetails.xb }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10" class="rowStyle">
                      <div class="wrap">
                        <div class="title">出生日期</div>
                        <div class="content">{{ formDetails.csrq }}</div>
                      </div>
                    </el-col>
                    <el-col :span="14" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养层次</div>
                        <div class="content">{{ formDetails.pyccmmc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养单位</div>
                        <div class="content">{{ formDetails.dwhmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="14" class="rowStyle">
                      <div class="wrap">
                        <div class="title">专业</div>
                        <div class="content">{{ formDetails.zydmmc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10" class="rowStyle">
                      <div class="wrap">
                        <div class="title">年级</div>
                        <div class="content">{{ formDetails.ssnj }}</div>
                      </div>
                    </el-col>
                    <el-col :span="14" class="rowStyle">
                      <div class="wrap">
                        <div class="title">班级</div>
                        <div class="content">{{ formDetails.bjmmc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="formLeft"><span class="title">申请信息</span></div>
              <div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="补办证件类型" label-width="120px">
                      {{ formDetails.zjlx }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="申请补办时间" label-width="120px">
                      {{ formDetails.sqsj }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="申请补办理由" label-width="120px">
                      {{ formDetails.sqbbly }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div class="formLeft"><span class="title">审核信息</span></div>
              <div>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="申请审核结果" label-width="120px">
                      <el-select v-model="formDetails.status" :disabled="true">
                        <el-option
                          v-for="(item, index) in spjgOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="申请审核意见" label-width="120px">
                      {{ formDetails.comment }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </template>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="detailCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editClick"
            >确 定</el-button
          >
        </span> -->
      </el-dialog>
      <lctCom
        ref="child"
        :lctModal="lctModal"
        @handleCloseLct="handleCloseLct"
      ></lctCom>
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      />
    </div>
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出数据？</span>
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
import CheckboxCom from "../../../../components/checkboxCom";
import lctCom from "../../../../components/lct";
import { getToken } from "@/utils/auth";
import {
  queryZjbbFlowedList,
  excelExportZjbbFlowed,
  queryZjbbFlowInfo,
} from "@/api/dailyBehavior/docReplaceTea";

import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
export default {
  name: "manStudent",
  components: { CheckboxCom, lctCom },
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
  data() {
    return {
      showExport: false,
      lctModal: false,
      uploadUrl: process.env.VUE_APP_BASE_API + "/fdyXpx/import",
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwh: [], // 学院下拉框
        zydm: [],
        bjm: [],
        nj: [],
        zjlx: [],
        status: [],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      allDwh: [], // 学院下拉框
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      spjgOps: [], //审批结果下拉
      njOps: [],
      zjlxOps: [],
      datePicker: [],
      datePickerSH: [],
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
      updownDate: [],
      datePicker: [],
      multipleSelection: [],
      tableHeader1: [
        { dm: "pxxmmc", mc: "培训项目名称" },
        { dm: "dwh", mc: "组织单位" },
        { dm: "pxkssj", mc: "培训开始时间" },
        { dm: "pxjssj", mc: "培训结束时间" },
        { dm: "zxs", mc: "总学时" },
        { dm: "xz", mc: "性质" },
        { dm: "pxdwlb", mc: "培训单位类别" },
        { dm: "jg", mc: "结果" },
      ],

      defaultRes: {},
      detailModal: false,
      whatType: "",
      tableDetails: [],
      formDetails: [],
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmsplcm"); // 审核结果
    this.getCode("dmxszjlxm"); //证件类型
  },

  methods: {
    editClick() {},
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      //let that = this;
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.businesId);
      }
      this.exportParams.pageNum = 0;
      this.$set(this.exportParams, "ids", ids);
      //this.$set(this.exportParams, "status", "1");
      excelExportZjbbFlowed(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "证件补办已处理列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});

      this.showExport = false;
    },
    async expor() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwh: this.moreIform.dwh,
        zydm: this.moreIform.zydm,
        bjm: this.moreIform.bjm,
        ssnj: this.moreIform.nj,
        zjlx: this.moreIform.zjlx,
        pyccm: this.training.choose || [],
        sqsjs:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[0]
            : "",
        sqsje:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[1]
            : "",
        shsjs:
          this.datePickerSH && this.datePickerSH.length > 0
            ? this.datePickerSH[0]
            : "",
        shsje:
          this.datePickerSH && this.datePickerSH.length > 0
            ? this.datePickerSH[1]
            : "",
        status: this.moreIform.status,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;

      this.showExport = true;
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
    detailCancel() {
      this.detailModal = false;
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
      getGrade().then((response) => {
        // 获取年级列表数据
        if (response.errcode == "00") {
          this.njOps = response.data.rows;
        }
      });
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.zydm = []; // 专业
        this.moreIform.bjm = []; // 班级
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
    async hadleDetail(row, index) {
      this.detailModal = true;
      var data = {
        xh: row.xh,
        businesId: row.businesId,
        processId: row.processId,
      };
      await queryZjbbFlowInfo(data).then((res) => {
        this.formDetails = res.data;
        this.formDetails.comment = res.data.comment[0];
      });
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwh: this.moreIform.dwh,
        zydm: this.moreIform.zydm,
        bjm: this.moreIform.bjm,
        ssnj: this.moreIform.nj,
        zjlx: this.moreIform.zjlx,
        pyccm: this.training.choose || [],
        sqsjs:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[0]
            : "",
        sqsje:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[1]
            : "",
        shsjs:
          this.datePickerSH && this.datePickerSH.length > 0
            ? this.datePickerSH[0]
            : "",
        shsje:
          this.datePickerSH && this.datePickerSH.length > 0
            ? this.datePickerSH[1]
            : "",
        status: this.moreIform.status,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryZjbbFlowedList(data)
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
    //获取
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
            case "dmsplcm": //审批结果
              this.spjgOps = res.data;
              break;
            case "dmxszjlxm":
              this.zjlxOps = res.data;
              break;
          }
        })
        .catch((err) => {});
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
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .handledie {
    background: url("~@/assets/images/details.png");
  }
  .lct {
    background: url("~@/assets/dangan/lct.png");
  }
  .el-button--text {
    border-color: transparent;
    color: #005657;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
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
  .baseInfo {
    // padding: 20px;
    margin-left: 30px;
    margin-right: 30px;
    .formLeft {
      background: #fff;
      display: flex;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 20px;
      }
    }
    .tableStyle {
      position: relative;
      padding: 20px;
      .imgWrap {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 100;
        .photo {
          width: 160px;
          height: 206px;
          background: #fff;
          overflow: hidden;
          img {
            width: 160px;
            height: 206px;
          }
        }
      }
      .information {
        padding: 0 20px;
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
            ::v-deep .el-input {
              width: 200px;
            }
          }
        }
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
