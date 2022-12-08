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
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">待审核列表</span> <i class="Updataicon"></i>
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
          :data="basicInfoList"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="xh" label="学号" sortable />
          <el-table-column prop="xm" label="姓名" sortable="custom" />
          <el-table-column prop="qjlx" label="请假类型" sortable="custom" />

          <el-table-column prop="qjts" label="天数" sortable="custom" />
          <el-table-column prop="kssj" label="开始时间" sortable="custom" />
          <el-table-column prop="jssj" label="结束时间" sortable="custom" />

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
                <span class="handleName">请假详情</span>
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
        title="申请详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="60%"
      >
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
            <el-form ref="formDetails" :model="formDetails">
              <el-form-item
                label="申请审核结果"
                label-width="120px"
                prop="sqshjg"
                :rules="rules.sqshjg"
              >
                <el-select
                  v-model="formDetails.sqshjg"
                  @change="changeJG(formDetails.sqshjg)"
                >
                  <el-option
                    v-for="(item, index) in sqshjgOps"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="申请审核理由"
                label-width="120px"
                prop="shyj"
              >
                <el-input v-model="formDetails.shyj" />
              </el-form-item>
            </el-form>
          </div>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="detailCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
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
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>

<script>
import CheckboxCom from "../../../../../components/checkboxCom";
import lctCom from "../../../../../components/lct";
import checkboxComDynic from "../../../../../components/checkboxComDynic";
import {
  queryDshList,
  tyFlow,
  jjFlow,
  backFlow,
  thFinal,
  texcelExportCzdaFlow,
} from "@/api/growFiles/infoAppr";
import {
  getDshList,
  tyqjFlow,
  jjqjFlow,
  htqjFlow,
  excelLsDshList,
  getXsJbxx,
  getYearTerm,
  queryXnXq,
} from "@/api/dailyBehavior/vocationTea";

import { selectDetail } from "@/api/dailyBehavior/vocationStu";

import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "manStudent",
  components: { CheckboxCom, lctCom, checkboxComDynic },
  data() {
    return {
      total: 0,
      showExport: false,
      ztStatus: [],
      searchVal: "",
      lctModal: false,
      select: "",
      isMore: false,
      datePicker: [],
      datePickerSH: [],
      exportParams: {},
      leng: 0,
      basicInfoList: [],
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
      formEdit: {},
      dynamicModal: false,

      sqshjgOps: [
        { mc: "通过", dm: "1" },
        { mc: "拒绝", dm: "2" },
        { mc: "退回", dm: "3" },
      ],
      commonParams: [],

      multipleSelection: [],
      multipleSelection1: "",
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
      tableDetails: [],
      formDetails: {},
      shDetails: {},
      XjDetails: [],
      rules: {
        sqshjg: [
          {
            required: true,
            message: "审核结果不能为空",
            trigger: "change",
          },
        ],
      },
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
  created() {},
  mounted() {
    //this.getList();
    this.getCode("dmqjlxm"); //请假类型
    this.getCode("dmxqm");
    this.getXnxq();
  },

  methods: {
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formDetails.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
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
        getDshList(this.queryParams)
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
      this.queryParams.xm = this.select == "xm" ? this.searchVal : "";
      this.queryParams.xh = this.select == "xh" ? this.searchVal : "";
      this.queryParams.qjts = this.select == "qjts" ? this.searchVal : -1;
      getDshList(this.queryParams)
        .then((response) => {
          this.basicInfoList = response.data; // 根据状态码接收数据
          this.total = response.totalCount; //总条数
        })
        .catch((err) => {});
    },
    lctClick(row) {
      console.log(row.qjprocessid);
      if (!!row.qjprocessid) {
        this.$refs.child.inner(row.qjprocessid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    editClick() {
      if (!this.checkForm()) {
        this.$message.error("请选择审核结果！");
        return;
      } else {
        if (this.formDetails.sqshjg == "1") {
          let data = {
            businesId: this.defaultRes.id,
            processId: this.defaultRes.qjprocessid,
            qjstatus: this.defaultRes.qjstatus,
            taskId: this.defaultRes.taskId,
            opMsg: this.formDetails.shyj ? this.formDetails.shyj : "审核通过",
            xh: this.formDetails.xh,
          };
          tyqjFlow([data]).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("审核已通过");
              this.detailModal = false;

              this.handleSearch();
            }
          });
        } else if (this.formDetails.sqshjg == "2") {
          let data = {
            businesId: this.defaultRes.id,
            processId: this.defaultRes.qjprocessid,
            qjstatus: this.defaultRes.qjstatus,
            taskId: this.defaultRes.taskId,
            opMsg: this.formDetails.shyj ? this.formDetails.shyj : "已拒绝",
            xh: this.formDetails.xh,
          };
          jjqjFlow([data]).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("已拒绝");
              this.detailModal = false;

              this.handleSearch();
            }
          });
        } else if (this.formDetails.sqshjg == "3") {
          if (!!this.tempRadio || this.tempRadio === 0) {
            let data = {
              businesId: this.defaultRes.id,
              processId: this.defaultRes.qjprocessid,
              qjstatus: this.defaultRes.qjstatus,
              taskId: this.defaultRes.taskId,
              opMsg: this.formDetails.shyj ? this.formDetails.shyj : "已退回",
              xh: this.formDetails.xh,
            };
            let targ = {
              czdaFlowNodeRes: this.multipleSelection1,
              rcswRcqxjFlowOpReqList: [data],
            };
            htqjFlow(targ).then((res) => {
              if (res.errcode == "00") {
                this.thTableModal2 = false;
                this.$message.success("退回成功");
                this.handleSearch();
              }
            });
          }
        }
      }
    },
    changeJG(val) {
      if (val && val == "3") {
        var processId = { processId: this.defaultRes.taskId };
        console.log(this.defaultRes.taskId);
        backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      }
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
      let Query = ["xh", "xm", "xn", "xq", "qjlx", "qjts", "kssj", "jssj"],
        QueryChinese = [
          "学号",
          "姓名",
          "学年",
          "学期",
          "请假类型",
          "请假天数",
          "开始时间",
          "结束时间",
        ];

      this.exportParams.pageNum = 0;
      this.$set(this.exportParams, "ids", ids);
      this.$set(this.exportParams, "sqlQuery", Query.toString());
      this.$set(this.exportParams, "sqlQueryChinese", QueryChinese.toString());

      excelLsDshList(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "请假列表待审核列表导出.xlsx", "xlsx");
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
      // if (this.multipleSelection.length > 0) {
      this.showExport = true;
      // } else {
      //   this.$message.warning("当前无数据导出");
      // }
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
    detailCancel() {
      this.detailModal = false;
      this.commonParams = [];
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
        tyqjFlow(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("审核已通过");
            this.detailModal = false;
            this.getList();
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
      jjqjFlow(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("已拒绝");
          this.detailModal = false;
          this.getList();
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
        if (this.detailModal == false) {
          this.thModal = true;
        }
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
      }));
      var targ = {
        czdaFlowNodeRes: this.multipleSelection1,
        rcswRcqxjFlowOpReqList: data,
      };
      htqjFlow(targ).then((res) => {
        if (res.errcode == "00") {
          this.detailModal = false;
          this.$message.success("退回成功");
          this.getList();
        }
      });
    },

    hadleDetail(row) {
      this.defaultRes = row;
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
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      console.log(this.dqXnxq);
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
      // this.queryParams.xnList = this.xnList;
      this.queryParams.qjlxmList = this.qjlx.choose;
      // this.queryParams.xqmList = this.xqmList;
      this.getList(this.queryParams);
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
          }
        })
        .catch((err) => {});
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.id,
        qjprocessid: v.qjprocessid,
        qjts: v.qjts,
        qjstatus: v.qjstatus,
        taskId: v.taskId,
        xh: v.xh,
      }));
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.getList();
    },
    handleCloseLct() {
      this.lctModal = false;
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
            // vertical-align: middle;
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
          .controlIcon {
            background: url("~@/assets/images/control.png");
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
