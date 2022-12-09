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
              v-model="moreIform.bjList"
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
           <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>住宿类型：</span>
            <el-select
              v-model="moreIform.zslxmList"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in zslxOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>修改时间：</span>
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
          <el-col :span="20">
            <span>审核状态：</span>
            <el-select
              v-model="status"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in ztStatus"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">性<span v-html="'\u3000\u3000'"></span>别：</el-col>
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
          </div>
          <div class="btns fullGreen" @click="pass">
            <i class="icon passIcon"></i><span class="title1">通过</span>
          </div> -->
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
          <el-table-column prop="xb" label="性别" width="85" sortable> </el-table-column>
          <el-table-column prop="pycc" label="培养层次" width="80" sortable> </el-table-column>
          <el-table-column prop="dwmc" label="培养单位" min-width="100" sortable> </el-table-column>
          <el-table-column prop="zslx" label="住宿类型" min-width="100" sortable> </el-table-column>
          <el-table-column prop="zsksrq" label="住宿开始时间" min-width="100" sortable> </el-table-column>
          <el-table-column prop="zsjsrq" label="住宿结束时间" min-width="100" sortable>
          </el-table-column>
          <el-table-column prop="statusChinese" label="审核状态" min-width="100" sortable>
          </el-table-column>
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

      <el-dialog
        title="申报详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="60%"
      >
        <template>
          <div class="baseInfo">
          <el-form :data="formDetails" label-width="110px">
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
                    <div class="title">性别</div>
                    <div class="content">{{ formDetails.xb }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养层次</div>
                    <div class="content">{{ formDetails.pycc }}</div>
                  </div>
                </el-col>
                
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养单位</div>
                    <div class="content">{{ formDetails.dwmc }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专业</div>
                    <div class="content">{{ formDetails.zy }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">年级</div>
                    <div class="content">{{ formDetails.nj }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
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
                <el-col :span="20">
                  <el-form-item label="申请住宿类型" prop="zslxm" :rules="rules.zslxm">
                    <div>{{formDetails.zslx}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item
                    label="原住宿地址"
                    prop="yzsdzm"
                  >
                    <div v-show="jzflag ==1">
                      <div>{{formDetails.yzsdz + "  "+ formDetails.yzsxxdz}}</div>
                      <!-- <div>{{formDetails.yzsxxdz}}</div> -->
                    </div>
                    <div v-show="jzflag ==2">
                      <div>{{formDetails.sqld + "  "+ formDetails.sqfj}}</div> 
                      <!-- <el-select
                        v-model="formDetails.sqldid"  
                        placeholder="非集中原寝室楼栋"
                        @change="changeLD(formDetails.sqldid)"
                        disabled
                        collapse-tags
                      >
                        <el-option
                          v-for="(item, index) in ldOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select> -->
                      <!-- <el-select
                        v-model="formDetails.sqfjid"  
                        placeholder="非集中原寝室房间"
                        disabled
                        collapse-tags
                      >
                        <el-option
                          v-for="(item, index) in fjOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select> -->
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-show="jzflag ==2">
                <el-col :span="12">
                  <el-form-item
                    label="是否退宿"
                    prop="sfts"
                  >
                    <div>{{formDetails.sftsmc}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-show="jzflag ==1">
                <el-col :span="19">
                  <el-form-item
                    label="申请住宿地点"
                    prop="xzsdzm"
                  >
                    <div>{{formDetails.sqld + "  "+ formDetails.sqfj}}</div> 
                    <!-- <div>
                      <el-select
                        v-model="formDetails.sqldid"  
                        placeholder="集中寝室楼栋"
                        @change="changeLD(formDetails.sqldid)"
                        collapse-tags
                      >
                        <el-option
                          v-for="(item, index) in ldOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select>
                      <el-select
                        v-model="formDetails.sqfjid"  
                        placeholder="集中寝室房间"
                        collapse-tags
                      >
                        <el-option
                          v-for="(item, index) in fjOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>
                      </el-select>
                    </div> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-show="jzflag ==2">
                <el-col :span="19">
                  <el-form-item
                    label="非集中住宿地址"
                    prop="xzsdzm"
                  >
                    <div>{{formDetails.xzsdz + "  "+ formDetails.xzsxxdz}}</div>
                    <!-- <div>{{formDetails.xzsxxdz}}</div> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="住宿时间" prop="datePickerEdit">
                    <div>{{formDetails.zsksrq + " 至 "+ formDetails.zsjsrq}}</div>
                    <!-- <div v-show="isEdit == 1">
                    <el-date-picker
                      type="daterange"
                      placeholder="选择日期"
                      v-model="datePickerEdit"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                    </div> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请理由" prop="sqly">
                    <div>{{formDetails.sqly}}</div>
                    <!-- <el-input
                      v-model="formDetails.sqly"
                      type="textarea"
                      maxlength="2000"
                      :disabled="isEdit == 0"
                      placeholder="请输入"
                    ></el-input> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请材料">
                    <div>
                      <div v-for="item in formDetails.fileList">
                        <div style="display: flex; justify-content: space-between ">
                          <a>
                            <span style="color: #005657">{{ item.fileName }}</span>
                          </a>
                          <!-- <el-button>预览</el-button> -->
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <!-- <div class="formLeft"><span class="title">审核信息</span></div>
          <el-form>
            <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请审核结果"
                    label-width="120px" 
                    prop="shjg"
                  >
                    {{formDetails.statusChinese}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请审核意见" label-width="120px">
                    {{formDetails.msg}}

                  </el-form-item>
                </el-col>
              </el-row>
          </el-form> -->

          <!-- <el-form :data="editDetails" ref="editDetails" :rules="rules">
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
          </el-form> -->
              
          </div>
        </template>
        <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="detailCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="editClick"
          >确 定</el-button>
      </span> -->
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
  queryYshList,
  queryDshDetail,
  exportZjbbFlowed,
} from "@/api/dailyBehavior/dormTea"
import { getCollege,getGrade } from "@/api/class/maintenanceClass";
import { getZY, getBJ} from "@/api/student/index";
import lctCom from "../../../../components/lct";
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
        njList:[],
        zslxmList:[],
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
      formDetails: {
        sqldid:"",
        sqfjid:"",
      },
      editDetails:[],
      editparams:{},
      shjgOps:[
        {dm:'01',mc: '通过'},
        {dm:'02',mc: '拒绝'},
        {dm:'03',mc: '退回'},
      ],
      jzflag: 1,//1集中2非集中
      zslxOps: [
        {dm: "1", mc: "校内集中住宿"},
        {dm: "2", mc: "非集中住宿"},
      ],
      dmxbmOPs: {
        // 性别：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      fjOps:[],
      ldOps:[],
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
    this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次dmxbm
    this.getCode("dmxbm"); // 性别
    this.getCode1("dmsplcm"); 
  },

  methods: {
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
      //this.$set(this.exportParams, "status", "1");
      exportZjbbFlowed(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "住宿申请已处理列表导出.xlsx", "xlsx");
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
        bjmList: this.moreIform.bjList,
        njList: this.moreIform.njList,
        zslxmList: this.moreIform.zslxmList,
        pyccmList: this.training.choose || [],
        xbmList: this.dmxbmOPs.choose || [],
        loginId: this.$store.getters.userId,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      if (this.multipleSelection.length > 0) {
        this.leng = this.multipleSelection.length;
      } else {
        await queryYshList(data)
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
      this.detailModal = true;
      this.editparams = row;
      var data = {
        xh: row.xh,
        roleId: this.$store.getters.roleId,
        businesId: row.businesId,
      };
      await queryDshDetail(data).then((res) => {
        this.formDetails = res.data;
        this.jzflag = res.data.zslxm;
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
      // let rqs,rqe = "";
      // if (this.datePicker && this.datePicker.length > 0) {
      //   rqs = this.datePicker[0];
      //   rqe = this.datePicker[1];
      // }
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwhList: this.moreIform.dwhList,
        zydmList: this.moreIform.zydmList,
        bjList: this.moreIform.bjList,
        njList: this.moreIform.njList,
        zslxmList: this.moreIform.zslxmList,
        pyccmList: this.training.choose || [],
        xbmList: this.dmxbmOPs.choose || [],
        loginId: this.$store.getters.userId,
        // sqsjs: rqs || "",
        // sqsje: rqe || "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryYshList(data)
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
      if (!!row.processId) {
        this.$refs.child.inner(row.processId);
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
            case "dmxbm":
              this.$set(this.dmxbmOPs, "checkBox", res.data);
              this.xbOps = res.data;
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
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.businesId,
        processId: v.processId,
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
