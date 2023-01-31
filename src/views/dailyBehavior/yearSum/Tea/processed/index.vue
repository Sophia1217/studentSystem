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
          <el-col :span="8">
            <span>培养单位：</span>
            <el-select
              v-model="moreIform.dwhList"
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
          <el-col :span="8">
            <span>专<span v-html="'\u3000\u3000'"></span>业：</span>
            <el-select
              v-model="moreIform.zydmList"
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
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
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
          <span class="title">待审核列表</span> <i class="Updataicon"></i>
          <el-select
            v-model="moreIform.xn"
            collapse-tags
            @change="changeXn"
            placeholder="请选择"
            
            style="width: 130px; margin:0 15px 0"
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
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" width="100" sortable> </el-table-column>
          <el-table-column prop="xm" label="姓名" width="85" sortable> </el-table-column>
          <el-table-column prop="pyccmc" label="培养层次" min-width="100" sortable> </el-table-column>
          <el-table-column prop="dwhmc" label="培养单位" min-width="100" sortable> </el-table-column>
          <el-table-column prop="zydmmc" label="专业" min-width="100" sortable> </el-table-column>
          <el-table-column prop="sqsj" label="申请时间" min-width="100" sortable> </el-table-column>
          <el-table-column prop="createDwhMc" label="审核进度">
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
                <span class="handleName">申报详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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


      <el-dialog
        title="申报详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        @close="emptyDetails()"
        width="60%"
      >
        <template>
          <div class="baseInfo">
          <el-form :data="formDetails" label-width="110px">
            <div class="formLeft"><span class="title">学生基本信息</span></div>
            <div class="backDetail">
            
            <div class="formRight">
              <el-row>
                <el-col :span="8" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学号</div>
                    <div class="content">{{ formDetails.xh }}</div>
                  </div>
                </el-col>
                <el-col :span="8" class="rowStyle">
                  <div class="wrap">
                    <div class="title">姓名</div>
                    <div class="content">{{ formDetails.xm }}</div>
                  </div>
                </el-col>
                <el-col :span="8" class="rowStyle">
                  <div class="wrap">
                    <div class="title">性别</div>
                    <div class="content">{{ formDetails.xbmc }}</div>
                  </div>
                </el-col>
              </el-row>
              <div v-if="pyccflag == 1">
                <el-row>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">培养层次</div>
                      <div class="content">{{ formDetails.pyccmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">培养单位</div>
                      <div class="content">{{ formDetails.dwhmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">年级</div>
                      <div class="content">{{ formDetails.ssnj }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">专业</div>
                      <div class="content">{{ formDetails.zydmmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="16" class="rowStyle">
                    <div class="wrap">
                      <div class="title">班级</div>
                      <div class="content">{{ formDetails.bjmmc }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div v-if="pyccflag == 2">
                <el-row>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">出生日期</div>
                      <div class="content">{{ formDetails.csrq }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">民族</div>
                      <div class="content">{{ formDetails.mzmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">政治面貌</div>
                      <div class="content">{{ formDetails.zzmmmc }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">培养单位</div>
                      <div class="content">{{ formDetails.dwhmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">专业</div>
                      <div class="content">{{ formDetails.zydmmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">导师</div>
                      <div class="content">{{ formDetails.dsxm }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">攻读学位</div>
                      <div class="content">{{ formDetails.gdxwmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">学位类型</div>
                      <div class="content">{{ formDetails.xwlxmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8" class="rowStyle">
                    <div class="wrap">
                      <div class="title">移动电话</div>
                      <div class="content">{{ formDetails.yddh }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">上学年学业奖学金等级</div>
                      <div class="content">{{ formDetails.sxnjxjdjmc }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            </div>
            <el-row :gutter="20">
              <el-form-item label="填写学年" label-width="85px">
                <div>{{ formDetails.xn }}</div>
              </el-form-item>
            </el-row>
            <el-row :gutter="20" v-if="pyccflag == 1">
              <el-form-item label="自我小结" label-width="85px">
                <div>{{ formDetails.zwxj }}</div>
              </el-form-item>
            </el-row>
            <div v-if="pyccflag == 2">
              <div class="formLeft"><span class="title">自我小结</span></div>
              <el-row :gutter="20">
                <el-form-item label="政治思想表现" label-width="300px">
                  <div>{{ formDetails.sxzzbx }}</div>
                </el-form-item>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="课程学习情况" label-width="300px">
                  <div>{{ formDetails.kcxxqk }}</div>
                </el-form-item>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="科学研究（学位论文）工作和取得的成果、公开发表的学术论文等" label-width="300px">
                  <div>{{ formDetails.kycg }}</div>
                </el-form-item>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="专业实践、社会实践、学生工作等情况" label-width="300px">
                  <div>{{ formDetails.zsxsj }}</div>
                </el-form-item>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="奖惩情况" label-width="300px">
                  <div>{{ formDetails.jcqk }}</div>
                </el-form-item>
              </el-row>
            </div>
          </el-form>
          <div class="formLeft"><span class="title">审核信息</span></div>
          <el-form :data="editDetails" ref="editDetails" label-width="110px" :rules="rules">
            <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请审核结果"
                    label-width="120px" 
                    prop="shjg"
                  >
                    <el-select
                      v-model="editDetails.shjg"
                      collapse-tags
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
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请审核意见" label-width="120px" prop="shyj">
                    <el-input 
                      v-model="editDetails.shyj"
                      :autosize="{ minRows: 2 }"
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
        <el-button @click="detailCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="editClick"
          >确 定</el-button>
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
import CheckboxCom from "../../../../components/checkboxCom";
import {
  backFlow,
} from "@/api/dailyBehavior/dormTea";
import {
  queryDshList,
  queryDshDetail,
  exportDsh,
  tyFlow,
  jjFlow,
  thFinal,
} from "@/api/dailyBehavior/yearSum"

import {
  queryFj,
  queryLd,
} from "@/api/dailyBehavior/dormStu";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getCollege,getGrade } from "@/api/class/maintenanceClass";
import { getZY} from "@/api/student/index";
import lctCom from "../../../../components/lct";
import { lctTable } from "@/api/stuDangan/detailList/xiaoneiwai";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { param } from '../../../../../utils';
export default {
  name: "manStudent",
  components: { CheckboxCom, lctCom },
  data() {
    return {
      showExport: false,
      lctModal: false,
      ztStatus: [],
      zdOps: [],
      status: [],
      datePicker: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwhList: [], // 学院下拉框
        zydmList: [],
        bjList: [],
        xn:"",
        zslxmList:[],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      allDwh: [],
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      allXn: [], //学年下拉
      commonParams: [],
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
      multipleSelection: [],
      multipleSelection1: "",
      jjModal: false,
      jjly: "",
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      tempRadio: false,
      detailModal: false,
      formDetails: {},
      editDetails:[],
      editparams:{},
      shjgOps:[
        {dm:'01',mc: '通过'},
        {dm:'02',mc: '拒绝'},
        {dm:'03',mc: '退回'},
      ],
      pyccflag: 1,//1本科2硕博
      rules: {
        // shjg: [
        //   { required: true, message: "审核结果不能为空", trigger: "change" },
        // ],
        // shyj: [
        //   { required: true, message: "审核意见不能为空", trigger: "change" },
        // ],
      },
    };
  },

  mounted() {
    // this.handleSearch();
    this.getAllCollege();
    this.getSchoolYears();
    this.getCode("dmpyccm"); // 培养层次dmxbm
    this.getCode("dmxbm"); // 性别
    this.getCode1("dmsplcm"); 
  },

  methods: {
    changeXn(){
      this.handleSearch();
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let idList = [];
      for (let item_row of this.multipleSelection) {
        idList.push(item_row.businesId);
      }
      this.exportParams.pageNum = 0;
      this.exportParams.pageSize = 0;
      this.$set(this.exportParams, "idList", idList);
      exportDsh(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "学年小结待审核列表导出.xlsx", "xlsx");
          if(this.$store.getters.excelcount > 0){
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
        dwhList: this.moreIform.dwhList,
        zydmList: this.moreIform.zydmList,
        // bjmList: this.moreIform.bjList,
        xn: this.moreIform.xn,
        // zslxmList: this.moreIform.zslxmList,
        pyccmList: this.training.choose || [],
        loginId: this.$store.getters.userId,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
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
    getRow(index, row) {
      this.multipleSelection1 = row;
      console.log(row);
    },
    thTableCancel() {
      this.thTableModal = false;
      this.editDetails.shjg="";
    },
    thTableConfirm() {
      if (!!this.tempRadio || this.tempRadio === 0) {
        this.thTableModal = false;
        if(this.detailModal == false){
          this.thModal = true;
        }
        
      } else {
        this.$message.error("请先勾选退回的节点");
      }
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
        this.moreIform.stuInfo = []; // 专业
        this.moreIform.pread = []; // 班级
      }
      this.getZY(val);
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
    async hadleDetail(row) {
      console.log("row", row);
      if(row.pyccmc == "本科"){
        this.pyccflag = 1;
      } else{
        this.pyccflag = 2;
      }
      this.detailModal = true;
      this.editparams = row;
      var data = {
        // xh: row.xh,
        // roleId: this.$store.getters.roleId,
        businesId: row.businesId,
        processId: row.processid,
      };
      await queryDshDetail(data).then((res) => {
        this.formDetails = res.data;
      });
      
    },
    editClick(){
      if (!this.editDetails.shjg) {
        this.$message.error("审核结果不能为空");
      } else{
      if(this.editDetails.shjg == "01"){
        var data ={
          businesId: this.editparams.businesId,
          processId: this.editparams.processid,
          status: this.editparams.status,
          taskId: this.editparams.taskId,
          xh: this.editparams.xh,
          opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已通过",
        };
          //通过
          tyFlow(data).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("审核已通过");
              this.detailModal = false;
              this.handleSearch();
            }
          });

      } else if(this.editDetails.shjg == "02"){
        var data ={
          businesId: this.editparams.businesId,
          processId: this.editparams.processid,
          status: this.editparams.status,
          taskId: this.editparams.taskId,
          xh: this.editparams.xh,
          opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已拒绝",
        };
        //拒绝
        jjFlow(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("已拒绝");
          this.detailModal = false;
          this.handleSearch();
        }
      });
      } else{
        var data ={
          businesId: this.editparams.businesId,
          processId: this.editparams.processid,
          status: this.editparams.status,
          taskId: this.editparams.taskId,
          xh: this.editparams.xh,
          opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已退回",
          actId: this.multipleSelection1.actId,
          actName: this.multipleSelection1.actName,

        };
        thFinal(data).then((res) => {
          if (res.errcode == "00") {
            this.detailModal = false;
            this.$message.success("退回成功");
            this.handleSearch();
          }
        });
      }
      }
    },
    emptyDetails() {
      this.$nextTick(() => {
        this.$refs.editDetails.resetFields();
      });
    },
    detailCancel() {
      this.detailModal = false;
      this.commonParams = [];
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let rqs,rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwhList: this.moreIform.dwhList,
        zydmList: this.moreIform.zydmList,
        // bjList: this.moreIform.bjList,
        xn: this.moreIform.xn,
        // zslxmList: this.moreIform.zslxmList,
        pyccmList: this.training.choose || [],
        loginId: this.$store.getters.userId,
        sqsjStart: rqs || "",
        sqsjEnd: rqe || "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryDshList(data)
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
    handleCloseLct() {
      this.lctModal = false;
    },
      //流程
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
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
            // case "dmxbm":
            //   this.$set(this.dmxbmOPs, "checkBox", res.data);
            //   this.xbOps = res.data;
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
      console.log("row",val);
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.businesId,
        processid: v.processid,
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
    changeJG(val){
      console.log("taskId",this.editparams.taskId);
      if(val && val == "03"){
        console.log("this.editDetails.shjg",this.editDetails.shjg);
        var processId = { processId: this.editparams.taskId };
        backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      } 
      // else if(val && val == "02"){
      //   console.log(22);
      // } else {
      //   console.log(33);
      // } 
    },
  },
};
</script>

<style lang="scss" scoped>
.lct {
  background: url("~@/assets/dangan/lct.png");
}
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
        }
      }
    }
  }
  .baseInfo{
    // padding: 20px;
    margin-left: 30px;
    margin-right: 30px;
    // overflow-x: auto;
    .formLeft {
      background: #fff;
      display: flex;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 30px;
      }
      .title2 {
        font-weight: 600;
        font-size: 14px;
        color: #1f1f1f;
        line-height: 30px;
      }
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
          flex: 0 0 140px;
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
