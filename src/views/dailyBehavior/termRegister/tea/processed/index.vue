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
            <!-- <el-option label="操作人" value="czrxm"></el-option> -->
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
          <el-col :span="6">
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
          <el-col :span="6">
            <span>班<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.bjmList"
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
              v-model="moreIform.njList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in allNj"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>注册时间：</span>
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
        </el-row> -->
        <el-row :gutter="20" class="mt15">
          <el-col :span="12">
            <span>欠费状态：</span>
            <el-select
              v-model="moreIform.qfztmList"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in qfztOps"
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
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">未注册列表</span> <i class="Updataicon"></i>
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
          <!-- <div class="btns borderRed" @click="back">
            <i class="icon backIcon"></i><span class="title">退回</span>
          </div>
          <div class="btns borderRed" @click="refuse">
            <i class="icon refuseIcon"></i><span class="title">拒绝</span>
          </div> -->
          <div class="btns fullGreen" @click="handleZc">
            <i class="icon passIcon"></i><span class="title1">注册</span>
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
          <el-table-column prop="xh" label="学号" min-width="100" sortable> </el-table-column>
          <el-table-column prop="xm" label="姓名" min-width="85" sortable> </el-table-column>
          <el-table-column prop="pycc" label="培养层次" min-width="100" sortable> </el-table-column>
          <el-table-column prop="dwmc" label="培养单位" min-width="100" sortable> </el-table-column>
          <el-table-column prop="zcztmc" label="注册状态" min-width="100" sortable> </el-table-column>
          <el-table-column prop="qfztmc" label="欠费状态" min-width="100" sortable> </el-table-column>
          <!-- <el-table-column prop="zcsj" label="注册时间" min-width="100" sortable>
          </el-table-column> -->
          <!-- <el-table-column prop="czrxm" label="操作人" min-width="100" sortable>
          </el-table-column> -->

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
      <el-dialog title="注册" :visible.sync="zcModal" width="50%">
        <template>
          <!-- <el-input placeholder="请输入拒绝理由" v-model="jjly"></el-input> -->
          <el-form :model="editDetails2" ref="editDetails2" :rules="rules">
            <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="注册学期"
                    label-width="80px" 
                    prop="zcxqm"
                  >
                    <el-select
                      v-model="editDetails2.zcxqm"
                      collapse-tags
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in xqOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="注册状态"
                    label-width="80px" 
                    prop="zcztm"
                  >
                    <el-select
                      v-model="editDetails2.zcztm"
                      collapse-tags
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in zcztOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注" label-width="100px">
                    <el-input 
                      v-model="editDetails2.zcbz"
                      maxlength="500"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="注册时间" prop="zcsj">
                    <el-date-picker
                      v-model="editDetails2.zcsj"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="请选择时间"
                      :append-to-body="false"
                      disabled
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
          </el-form>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="zcCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="zcConfirm"
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
          <el-form :data="formDetails">
            <div class="formLeft"><span class="title">基本信息</span></div>
            <div class="backDetail">
            
            <div class="formRight">
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学号</div>
                    <div class="content">{{ formDetails.xh }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">姓名</div>
                    <div class="content">{{ formDetails.xm }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养层次</div>
                    <div class="content">{{ formDetails.pycc }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养单位</div>
                    <div class="content">{{ formDetails.dwmc }}</div>
                  </div>
                </el-col>
                
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专业</div>
                    <div class="content">{{ formDetails.zy }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">年级</div>
                    <div class="content">{{ formDetails.nj }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <div class="wrap">
                    <div class="title">班级</div>
                    <div class="content">{{ formDetails.bjmmc }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
            </div>
            <div>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="学年" prop="zslxm">
                    <div>{{formDetails.xnmc}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <div class="formLeft">
                <span class="title">缴费信息</span>
              </div>
          <el-table :data="tableDetails">
              <el-table-column
                fixed="left"
                type="index"
                label="序号"
                width="50"
              ></el-table-column>
              <el-table-column prop="sfxmmc" label="费用信息" />
              <el-table-column prop="yjje" label="应缴金额（元）" />
              <el-table-column prop="sjje" label="实缴金额（元）" />
              <el-table-column prop="qfje" label="欠费金额（元）" />
            </el-table>
          <div class="formLeft"><span class="title">注册信息</span></div>
          <el-form :model="editDetails" ref="editDetails" :rules="rules">
            <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="注册学期"
                    label-width="80px" 
                    prop="zcxqm"
                  >
                    <el-select
                      v-model="editDetails.zcxqm"
                      collapse-tags
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in xqOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="注册状态"
                    label-width="80px" 
                    prop="zcztm"
                  >
                    <el-select
                      v-model="editDetails.zcztm"
                      collapse-tags
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in zcztOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注" label-width="100px">
                    <el-input 
                      v-model="editDetails.zcbz"
                      maxlength="500"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="注册时间" prop="zcsj">
                    <el-date-picker
                      v-model="editDetails.zcsj"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="请选择时间"
                      :append-to-body="false"
                      disabled
                    >
                    </el-date-picker>
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
      <span>确认导出{{ leng }}条数据？</span>
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
import {
  zcFlow,
  queryXqzcList,
  queryXqzcDetail,
  exportXqzcUnReg,
} from "@/api/dailyBehavior/termRegTea"
import { getCollege,getGrade } from "@/api/class/maintenanceClass";
import { getZY, getBJ} from "@/api/student/index";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { queryXnXq } from "@/api/dailyBehavior/vocationTea";
export default {
  name: "manStudent",
  components: { CheckboxCom },
  data() {
    return {
      showExport: false,
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
        bjmList: [],
        njList:[],
        qfztmList:[],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      allDwh: [],
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      allNj: [], //年级下拉
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        xnm: [],
        xqmList: [],

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
      zcModal: false,
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      tempRadio: false,
      detailModal: false,
      formDetails: {},
      editDetails:{},
      editDetails2:{},
      tableDetails: [],
      editparams:{},
      zcztOps:[
        {dm:'0', mc: '未注册'},
        {dm:'1', mc: '已注册'},
      ],
      qfztOps:[
        {dm:'0', mc: '未完费'},
        {dm:'1', mc: '已完费'},
      ],
      xqOps:[],
      //学年学期
      XnxqProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      dqXnxq: [],

      rules: {
        zcxqm: [
          { required: true, message: "注册学期不能为空", trigger: "change" },
        ],
        zcztm: [
          { required: true, message: "注册状态不能为空", trigger: "change" },
        ],
      },
    };
  },

  mounted() {
    // this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode1("dmsplcm"); 
    this.getXnxq();
  },

  methods: {
    checkFormEdit() {
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
    checkFormEdit2() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.editDetails2.validate((valid) => {
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
        this.xqOps = res.data[0].dataCodeCascadingList;
        for (let item of res.data[0].dataCodeCascadingList) {
          if (item.dataCodeCascadingList !== null) {
            this.dqXnxq = [res.data[0].dm, item.dm];
          }
        }
        this.queryParams.xnm = this.dqXnxq[0];
        // this.queryParams.xqmList.push(this.dqXnxq[1]);
        this.handleSearch();

        // let data = {
        //   xm: this.select == "xm" ? this.searchVal : null,
        //   xh: this.select == "xh" ? this.searchVal : null,
        //   xnm: this.queryParams.xnm.push(this.dqXnxq[0]),
        //   xqmList: this.queryParams.xqmList.push(this.dqXnxq[1]),
        // }
        // queryXqzcList(data)
        //   .then((res) => {
        //     this.tableData = res.data;
        //     this.queryParams.total = res.totalCount;
        //   })
        //   .catch((err) => {});
        
      });
    },

    handleChangeXnxq() {
      this.queryParams.xnm = [];
      this.queryParams.xqmList = [];
      if (this.dqXnxq[0]) {
        this.queryParams.xnm.push(this.dqXnxq[0]);
      }
      if (this.dqXnxq[1]) {
        this.queryParams.xqmList.push(this.dqXnxq[1]);
      }
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
        idList.push(item_row.id);
      }
      this.exportParams.pageNum = 0;
      this.exportParams.pageSize = 0;
      this.$set(this.exportParams, "idList", idList);
      exportXqzcUnReg(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "未注册列表导出.xlsx", "xlsx");
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
      let rqs,
          rqe = "";
        if (this.datePicker && this.datePicker.length > 0) {
          rqs = this.datePicker[0];
          rqe = this.datePicker[1];
        }
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        czrxm: this.select == "czrxm" ? this.searchVal : null,
        dwhList: this.moreIform.dwhList,
        zydmList: this.moreIform.zydmList,
        bjmList: this.moreIform.bjmList,
        njList: this.moreIform.njList,
        qfztmList: this.moreIform.qfztmList,
        pyccmList: this.training.choose || [],
        zcsjStart: rqs || "",
        zcsjStart: rqe || "",
        xnm: this.queryParams.xnm,
        //xqmList: this.queryParams.xqmList,
        zcztm: "0",

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      if (this.multipleSelection.length > 0) {
        this.leng = this.multipleSelection.length;
      } else {
        await queryXqzcList(data)
          .then((res) => {
            this.leng = res.totalCount;
          })
          .catch((err) => {});
      }
      console.log(this.leng);
      if (this.leng > 0) {
        this.showExport = true;
      } else {
        this.$message.warning("当前无数据导出");
      }
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
    //注册
    handleZc() {
      var falg = 1;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].qfje !== "0") falg = 2;
      }
      if (falg == 1) {
        if (this.commonParams && this.commonParams.length > 0) {
          this.zcModal = true;
          this.editDetails2 = { zcsj: this.formatDate(new Date()) };
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("当前勾选学生中包含欠费学生");
      }
    },
    zcCancel() {
      this.zcModal = false;
    },
    zcConfirm() {
      if (!this.checkFormEdit2()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else{
        var data = this.commonParams.map((item) => ({
          ...item,
          czrgh: this.$store.getters.userId,
          zcbz: this.editDetails2.zcbz || "",
          zcsj: this.editDetails2.zcsj,
          zcxqm: this.editDetails2.zcxqm,//注册学期码
          zcztm: this.editDetails2.zcztm,//注册状态码
        }));
        zcFlow(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("注册成功");
            this.detailModal = false;
            this.handleSearch();
          }
        });
        this.zcModal = false;
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
    //获取年级
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.allNj = res.data.rows;
        })
        .catch((err) => {});
    },
    async hadleDetail(row) {
      console.log("row", row);
      this.editDetails = { zcsj: this.formatDate(new Date()) };
      this.detailModal = true;
      this.editparams = row;
      var data = {
        xh: row.xh,
        sfqjdm: row.sfqjdm,
      };
      await queryXqzcDetail(data).then((res) => {
        this.formDetails = res.data;
        this.tableDetails = res.data.jfList;
      });
      
    },
    editClick(){
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else{
        var data ={
          id: this.editparams.id,
          sfqjdm: this.editparams.sfqjdm,//待定，收费区间代码
          xh: this.editparams.xh,
          czrgh: this.$store.getters.userId,
          zcbz: this.editDetails.zcbz || "",
          zcsj: this.editDetails.zcsj,
          zcxqm: this.editDetails.zcxqm,//注册学期码
          zcztm: this.editDetails.zcztm,//注册状态码
        };

        zcFlow([data]).then((res) => {
          if (res.errcode == "00") {
            this.detailModal = false;
            this.$message.success("注册成功");
            this.handleSearch();
          }
        });
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
      let rqs,
          rqe = "";
        if (this.datePicker && this.datePicker.length > 0) {
          rqs = this.datePicker[0];
          rqe = this.datePicker[1];
        }
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        czrxm: this.select == "czrxm" ? this.searchVal : null,
        dwhList: this.moreIform.dwhList,
        zydmList: this.moreIform.zydmList,
        bjmList: this.moreIform.bjmList,
        njList: this.moreIform.njList,
        qfztmList: this.moreIform.qfztmList,
        zcsjStart: rqs || "",
        zcsjStart: rqe || "",
        pyccmList: this.training.choose || [],
        xnm: this.queryParams.xnm,
        //xqmList: this.queryParams.xqmList,
        zcztm: "0",

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryXqzcList(data)
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
      console.log("val",val);
      this.commonParams = this.multipleSelection.map((v) => ({
        id: v.id,
        xh: v.xh,
        sfqjdm: v.sfqjdm,
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
        line-height: 20px;
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
