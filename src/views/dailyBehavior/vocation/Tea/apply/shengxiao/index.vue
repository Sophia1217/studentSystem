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
            <el-option label="请假天数" value="qjts"></el-option>
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
      <div v-if="isMore" class="moreSelect">
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="12">
            <span>学<span v-html="'\u3000\u3000'"></span>年：</span>
            <el-select
              v-model="xnList"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in xnOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <span>学<span v-html="'\u3000\u3000'"></span>期：</span>
            <el-select
              v-model="xqmList"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in xqOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row> -->
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">请假类型：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="qjlx"
                @training="handleCheckAllChangeQjlx"
                @checkedTraining="handleCheckedCitiesChangeQjlx"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>开始时间：</span>
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
          <el-col :span="20">
            <span>结束时间：</span>
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
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">审核状态：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="shzt"
                @training="handleCheckAllChangeShzt"
                @checkedTraining="handleCheckedCitiesChangeShzt"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">销假状态：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="xjzt"
                @training="handleCheckAllChangeXjzt"
                @checkedTraining="handleCheckedCitiesChangeXjzt"
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
          <span class="title">已生效列表</span> <i class="Updataicon"></i>
          <div class="dqXnxqArea">
            <el-cascader
              v-model="dqXnxq"
              :options="options"
              @change="handleChangeXnxq"
              :props="XnxqProps"
            ></el-cascader>
          </div>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="basicInfoList"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @sort-change="changeTableSort"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="xh" label="学号" sortable />
          <el-table-column prop="xm" label="姓名" sortable="custom" />
          <el-table-column prop="qjlx" label="请假类型" sortable="custom" />

          <el-table-column prop="qjts" label="天数" sortable="custom" />
          <el-table-column prop="kssj" label="开始时间" sortable="custom" />
          <el-table-column prop="jssj" label="结束时间" sortable="custom" />
          <el-table-column prop="qjstatus" label="审核状态" sortable="custom">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.qjstatus"
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
          <el-table-column prop="xjstatus" label="销假状态" sortable="custom">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.xjstatus"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in xjStatus"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="mk" label="审核进度">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程图</span>
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
      <el-dialog title="申报详情" :visible.sync="detailModal" width="60%">
        <template>
          <div class="headline">基本信息</div>
          <div class="tableStyle">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div class="content">{{ tableDetails.xh }}</div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">{{ tableDetails.xm }}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养层次</div>
                  <div class="content">{{ tableDetails.pyccmmc }}</div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养单位</div>
                  <div class="content">{{ tableDetails.dwhmc }}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <div class="content">{{ tableDetails.zydmmc }}</div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">年级</div>
                  <div class="content">{{ tableDetails.nj }}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">班级</div>
                  <div class="content">{{ tableDetails.bjmmc }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="headline">请假信息</div>
          <div class="tableStyle">
            <el-form>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="请假类型:" prop="qjlxm">
                    <div>
                      <span>{{ formDetails.qjlx }}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否离汉:" prop="sflhm">
                    <div>
                      <span>{{ formDetails.sflh }}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="前往地址:" prop="qwdzm">
                    <div>
                      <span>{{ formDetails.qwdz }}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="详细地址:" prop="xxdz">
                    <div>
                      <span>{{ formDetails.xxdz }}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="请假时间:" prop="qjsj">
                    <div>
                      <span
                        >{{ formDetails.kssj }} 至 {{ formDetails.jssj }}</span
                      >
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="总天数:" prop="qjts">
                    <div>
                      <span>{{ formDetails.qjts }}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="紧急联系人:" prop="jjlxr">
                    <div>
                      <span>{{ formDetails.jjlxr }}</span>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话:" prop="lxdh">
                    <div>
                      <span>{{ formDetails.lxdh }}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="请假事由:" prop="qjsy">
                    <div>
                      <span>{{ formDetails.qjsy }}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="附件:">
                    <div v-for="item in formDetails.fileList">
                      <div
                        style="display: flex; justify-content: space-between"
                      >
                        <a>
                          {{ item.fileName }}
                        </a>
                       
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <div v-for="(item, index) in XjDetails">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="续假天数:" prop="xjts">
                      <div>
                        <span>{{ item.xjts }}</span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="续假时间:" prop="xjsj">
                      <div>
                        <span>{{ item.kssj }} 至{{ item.jssj }}</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="续假事由:" prop="qjsy">
                      <div>
                        <span>{{ item.qjsy }}</span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
          <div class="headline">审批信息</div>
          <div class="tableStyle">
            <el-form label-width="100px">
              <el-form-item label="申请审核结果">
                <el-select
                  v-model="formDetails.qjstatus"
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
              </el-form-item>

              <el-form-item label="申请审核理由" label-width="100px">
                {{ shDetails.msg }}
              </el-form-item>
            </el-form>
          </div>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="detailCancel">关 闭</el-button>
        </span>
      </el-dialog>
      <lctCom
        ref="child"
        :lctModal="lctModal"
        @handleCloseLct="handleCloseLct"
      ></lctCom>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
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
import CheckboxCom from "../../../../../components/checkboxCom";
import lctCom from "../../../../../components/lct";
import { getToken } from "@/utils/auth";
import {
  getYsxList,
  getXsJbxx,
  queryFlowableComment,
  excelLsYsxList,
  queryXnXq,
} from "@/api/dailyBehavior/vocationTea";
import { queryYshList, excelExportCzdaFlowed } from "@/api/growFiles/infoAppr";
import { selectDetail } from "@/api/dailyBehavior/vocationStu";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";

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
      total: 0,
      showExport: false,
      lctModal: false,
      uploadUrl: process.env.VUE_APP_BASE_API + "/fdyXpx/import",
      searchVal: "",
      select: "",
      isMore: false,
      exportParams: {},
      leng: 0,
      basicInfoList: [],
      ztStatus: [],
      xjStatus: [],
      datePicker: [],
      datePickerSH: [],
      xnList: [],
      xqmList: [],
      zjlxOps: [],
      queryParams: {
        xm: "",
        xh: "",
        qjts: "",
        kssjEnd: "",
        kssjStart: "",
        jssjEnd: "",
        jssjStart: "",
        qjlxmList: [],
        xnList: [],
        xqmList: [],
        qjstatusList: [],
        xjstatusList: [],
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
      },
      xqOps: [],
      xnOps: [],
      qjlx: {
        // 请假类型
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      shzt: {
        // 审核状态
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      xjzt: {
        // 销假状态
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
      formDetails: {},
      XjDetails: [],
      shDetails: {},
      XnxqProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      dqXnxq: [],
    };
  },

  mounted() {
    //this.getList();
    this.getCode("dmsplcm"); //状态

    this.getCode("dmxjlcm"); //销假状态
    this.getCode("dmqjlxm"); //请假类型
    this.getCode("dmxqm");
    this.getXnxq();
  },

  methods: {
    //获取学年学期
    getXnxq() {
      queryXnXq().then((res) => {
        this.options = res.data;
        for (let item of res.data[0].dataCodeCascadingList) {
          if (item.dataCodeCascadingList !== null) {
            this.dqXnxq = [res.data[0].dm, item.dm];
          }
        }
        this.queryParams.xm = this.select == "xm" ? this.searchVal : "";
        this.queryParams.xh = this.select == "xh" ? this.searchVal : "";
        this.queryParams.qjts = this.select == "qjts" ? this.searchVal : -1;
        this.queryParams.xnList.push(this.dqXnxq[0]);

        this.queryParams.xqmList.push(this.dqXnxq[1]);
        getYsxList(this.queryParams)
          .then((response) => {
            this.basicInfoList = response.data; // 根据状态码接收数据
            this.total = response.totalCount; //总条数
          })
          .catch((err) => {});
      });
    },
    handleChangeXnxq() {
      this.queryParams.xnList = [];
      this.queryParams.xqmList = [];
      if (this.dqXnxq[0]) {
        this.queryParams.xnList.push(this.dqXnxq[0]);
      }
      if (this.dqXnxq[1]) {
        this.queryParams.xqmList.push(this.dqXnxq[1]);
      }
      this.handleSearch();
    },
    getList() {
      (this.queryParams.xm = this.select == "xm" ? this.searchVal : ""),
        (this.queryParams.xh = this.select == "xh" ? this.searchVal : ""),
        (this.queryParams.qjts = this.select == "qjts" ? this.searchVal : -1),
        getYsxList(this.queryParams)
          .then((response) => {
            this.basicInfoList = response.data; // 根据状态码接收数据
            this.total = response.totalCount; //总条数
          })
          .catch((err) => {});
    },
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
      let Query = [
          "xh",
          "xm",
          "xn",
          "xq",
          "qjlx",
          "qjts",
          "kssj",
          "jssj",
          "qjstatuschinese",
          "xjstatuschinese",
        ],
        QueryChinese = [
          "学号",
          "姓名",
          "学年",
          "学期",
          "请假类型",
          "请假天数",
          "开始时间",
          "结束时间",
          "审核状态",
          "销假状态",
        ];

      this.exportParams.pageNum = 0;
      this.$set(this.exportParams, "ids", ids);
      this.$set(this.exportParams, "sqlQuery", Query.toString());
      this.$set(this.exportParams, "sqlQueryChinese", QueryChinese.toString());

      excelLsYsxList(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "请假列表已生效列表导出.xlsx", "xlsx");
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
        qjts: this.select == "qjts" ? this.searchVal : -1,
        xh: this.select == "xh" ? this.searchVal : "",
        xm: this.select == "xm" ? this.searchVal : "",

        kssjStart: this.queryParams.kssjStart,
        kssjEnd: this.queryParams.kssjEnd,
        jssjStart: this.queryParams.jssjStart,
        jssjEnd: this.queryParams.jssjEnd,
        xnList: this.queryParams.xnList,
        qjlxmList: this.queryParams.qjlxmList,
        xqmList: this.queryParams.xqmList,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
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
      if (!!row.qjprocessid) {
        this.$refs.child.inner(row.qjprocessid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    detailCancel() {
      this.detailModal = false;
    },
    // 请假类型全选
    handleCheckAllChangeQjlx(val) {
      let allCheck = [];
      for (let i in this.qjlx.checkBox) {
        allCheck.push(this.qjlx.checkBox[i].dm);
      }
      this.qjlx.choose = val ? allCheck : [];
      this.qjlx.isIndeterminate = false;
    },
    // 请假类型单选
    handleCheckedCitiesChangeQjlx(value) {
      let checkedCount = value.length;
      this.qjlx.checkAll = checkedCount === this.qjlx.checkBox.length;
      this.qjlx.isIndeterminate =
        checkedCount > 0 && checkedCount < this.qjlx.checkBox.length;
    },
    // 请假类型全选
    handleCheckAllChangeShzt(val) {
      let allCheck = [];
      for (let i in this.shzt.checkBox) {
        allCheck.push(this.shzt.checkBox[i].dm);
      }
      this.shzt.choose = val ? allCheck : [];
      this.shzt.isIndeterminate = false;
    },
    // 请假类型单选
    handleCheckedCitiesChangeShzt(value) {
      let checkedCount = value.length;
      this.shzt.checkAll = checkedCount === this.shzt.checkBox.length;
      this.shzt.isIndeterminate =
        checkedCount > 0 && checkedCount < this.shzt.checkBox.length;
    },
    // 请假类型全选
    handleCheckAllChangeXjzt(val) {
      let allCheck = [];
      for (let i in this.xjzt.checkBox) {
        allCheck.push(this.xjzt.checkBox[i].dm);
      }
      this.xjzt.choose = val ? allCheck : [];
      this.xjzt.isIndeterminate = false;
    },
    // 请假类型单选
    handleCheckedCitiesChangeXjzt(value) {
      let checkedCount = value.length;
      this.xjzt.checkAll = checkedCount === this.xjzt.checkBox.length;
      this.xjzt.isIndeterminate =
        checkedCount > 0 && checkedCount < this.xjzt.checkBox.length;
    },

    hadleDetail(row) {
      this.detailModal = true;
      getXsJbxx({ xh: row.xh }).then((res) => {
        this.tableDetails = res.data;
        //console.log("tableDetails", this.tableDetails);
      });
      selectDetail({ businesId: row.id }).then((res) => {
        this.formDetails = res.data[0];
        if (res.data.length > 1) {
          for (var i = 1; i < res.data.length; i++) {
            this.XjDetails.push(res.data[i]);
          }
        }
        //console.log("formDetails", this.XjDetails);
        //this.$set(this.formEdit, "qjsj", [res.data[0].kssj, res.data[0].jssj]);
      });
      queryFlowableComment({ processInstanceId: row.qjprocessid }).then(
        (res) => {
          this.shDetails = res.data[0];
        }
      );
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let rqs,
        rqe,
        rqs2,
        rqe2 = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      if (this.datePickerSH && this.datePickerSH.length > 0) {
        rqs2 = this.datePickerSH[0];
        rqe2 = this.datePickerSH[1];
      }
      this.queryParams.kssjStart = rqs;
      this.queryParams.kssjEnd = rqe;
      this.queryParams.jssjStart = rqs2;
      this.queryParams.jssjEnd = rqe2;
      this.queryParams.qjstatusList = this.shzt.choose;
      this.queryParams.xjstatusList = this.xjzt.choose;
      //this.queryParams.xnList = this.xnList;
      this.queryParams.qjlxmList = this.qjlx.choose;
      //this.queryParams.xqmList = this.xqmList;
      this.getList(this.queryParams);
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
            case "dmxqm":
              this.xqOps = res.data;
              break;
            case "dmsplcm":
              this.ztStatus = res.data;
              this.$set(this.shzt, "checkBox", res.data);
              break;
            case "dmqjlxm":
              this.qjlxOps = res.data;
              this.$set(this.qjlx, "checkBox", res.data);
              break;
            case "dmsfbzm":
              this.sflhOps = res.data;
              break;
            case "dmxjlcm":
              this.xjStatus = res.data;
              this.$set(this.xjzt, "checkBox", res.data);
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
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/updata.png") no-repeat;
        }
        .dqXnxqArea {
          margin-left: 20px;
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
  .headline {
    padding: 15px;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    line-height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tableStyle {
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
</style>
