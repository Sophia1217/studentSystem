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
            <span>申请档次：</span>
            <el-select
              v-model="moreIform.sqdjList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item,index) in rddjOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span>年<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.njList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item,index) in allNj"
                :key="index"
                :label="item"
                :value="item"
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
          <span style="margin-left:15px">评选周期：</span>
          <el-select
            v-model="moreIform.xn"
            collapse-tags
            @change="changeXn"
            placeholder="请选择"
            
            style="width: 130px; margin:0 0 15px 0"
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
          <div class="btns fullGreen" @click="passDirect">
            <i class="icon passIcon"></i><span class="title1">直接通过</span>
          </div>
          <div class="btns fullGreen" @click="passMulti">
            <i class="icon passIcon"></i><span class="title1">批量审批</span>
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
          <el-table-column prop="xm" label="姓名" width="85" sortable> </el-table-column>
          <el-table-column prop="xbmmc" label="性别" width="85" sortable> </el-table-column>
          <el-table-column prop="pyccmmc" label="培养层次" min-width="100" sortable> </el-table-column>
          <el-table-column prop="dwhmc" label="培养单位" min-width="100" sortable> </el-table-column>
          <el-table-column prop="ssnj" label="年级" min-width="100" sortable> </el-table-column>
          <el-table-column prop="sqdjmc" label="申请档次" min-width="100" sortable> </el-table-column>
          <el-table-column prop="tjdjmc" label="推荐档次" min-width="100" sortable> </el-table-column>
          <el-table-column prop="sqsj" label="申请时间" min-width="100" sortable> </el-table-column>
          <el-table-column prop="statusChinese" label="审核状态" min-width="100" sortable> </el-table-column>
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
      <el-dialog title="同意提示" :visible.sync="directModal" width="30%">
        <span>确认直接批量通过？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="directCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="directConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="批量审批" :visible.sync="multiModal" width="30%">
        <el-row style="margin:0 0 15px 15px">
          <el-col :span="20">
            <span>审核结果： </span>
            <el-select
              v-model="shjgGd"
              collapse-tags
              placeholder="请选择"
              size="small"
              disabled
            >
              <el-option
                v-for="item in shjgOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
            </el-col>
        </el-row>
        <el-row style="margin:0 0 15px 15px">
          <el-col :span="20">
            <span>推荐档次：</span>
            <el-select
              v-model="updateDj"
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in rddjOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
            </el-col>
        </el-row>
        <el-row style="margin:0 0 15px 15px">
          <el-col :span="20">

            <span>推荐理由：</span>
              <el-input 
                v-model="tjly"
                :autosize="{ minRows: 2 }"
                type="textarea"
                maxlength="500"
              />

          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="multiCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="multiConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
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
              <el-row :gutter="20">
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
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">性别</div>
                    <div class="content">{{ formDetails.xbmmc }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养层次</div>
                    <div class="content">{{ formDetails.pyccmmc }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养单位</div>
                    <div class="content">{{ formDetails.ssdwdmmc }}</div>
                  </div>
                </el-col>

                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">年级</div>
                    <div class="content">{{ formDetails.ssnj }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专业</div>
                    <div class="content">{{ formDetails.zydmmc }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">班级</div>
                    <div class="content">{{ formDetails.bjmc }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">手机号码</div>
                    <div class="content">{{ formDetails.yddh }}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">家庭人口数</div>
                    <div class="content">{{ formDetails.jtrks }}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">人均年收入</div>
                    <div class="content">{{ formDetails.rjnsr }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
            </div>
            <div>
              <div class="formLeft"><span class="title">申请信息</span></div>
              <el-row :gutter="20">
                <el-form-item label="认定周期">
                  <div>{{ formDetails.xn +' '+ formDetails.xqmc}}</div>
                </el-form-item>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="申请等级">
                  <div>{{ formDetails.sqdjmc }}</div>
                </el-form-item>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="申请理由">
                  <div>{{ formDetails.sqly }}</div>
                </el-form-item>
              </el-row>
              <el-row :gutter="20">

                  <el-form-item label="附件信息">
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
 
              </el-row>
            </div>
          </el-form>
          <div class="formLeft"><span class="title">民主决议</span></div>
          <el-form :data="editDetails" ref="editDetails" label-width="110px" :rules="rules">
            <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="审核结果"
                    label-width="120px" 
                    prop="shjg"
                  >
                    <el-select
                      v-model="editDetails.shjg"
                      collapse-tags
                      v-if="userflag ==1"
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
                    <div v-else>
                      <div>{{editDetails.statusChinese}}</div> 
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="推荐档次" label-width="120px">
                    <el-select
                      v-model="editDetails.tjdj"
                      collapse-tags
                       v-if="userflag ==1"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in rddjOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      ></el-option>
                    </el-select>
                    <div v-else >{{ editDetails.tjdjmc }}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="推荐理由" label-width="120px" prop="shyj">
                    <el-input 
                      v-model="editDetails.shyj"
                      v-if="userflag ==1"
                      :autosize="{ minRows: 2 }"
                      type="textarea"
                      maxlength="500"
                    />
                    <div v-else>
                      <div>{{editDetails.tjly}}</div> 
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if="userflag ==2" class="formLeft"><span class="title">学院意见</span></div>
              <el-row :gutter="20" v-if="userflag ==2">
                <el-col :span="20">
                  <el-form-item label="审核结果"
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
              <el-row :gutter="20" v-if="userflag ==2">
                <el-col :span="20">
                  <el-form-item label="推荐档次" label-width="120px">
                    <el-select
                      v-model="editDetails.tjdj"
                      collapse-tags
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in rddjOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      ></el-option>
                    </el-select>
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
  exportDsh,
  queryDshList,
  queryDshDetail,
  tyFlow,
  tyBatchFlow,
  jjFlow,
  thFinal,
} from "@/api/familyDifficulties/difficultTea"
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getCollege,getGrade } from "@/api/class/maintenanceClass";
import lctCom from "../../../../components/lct";
import { lctTable } from "@/api/stuDangan/detailList/xiaoneiwai";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "manStudent",
  components: { CheckboxCom, lctCom },
  data() {
    return {
      showExport: false,
      lctModal: false,
      zdOps: [],
      status: [],
      datePicker: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwhList: [], // 学院下拉框
        sqdjList: [],
        njList:[],
        xn:"",
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
      dmxbmOPs: {
        // 性别：
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
      shjgGd:"01",
      shjgOps:[
        {dm:'01',mc: '通过'},
        {dm:'02',mc: '拒绝'},
        {dm:'03',mc: '退回'},
      ],
      multiModal:false,
      directModal:false,
      allNj: [], //年级下拉
      jxlb: "1",//个人奖项为1，集体奖项为2
      rddjOps: [],
      updateArr: [],
      updateDj: "",
      tjly:"",
      userflag: 1,
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
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmxbm"); 
    this.getCode("dmkndjm"); //认定等级
    this.getAllGrade();
    this.userflag = this.$store.getters.roleId == "05" ? 2:1; //05学院负责人06辅导员
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
        idList.push(item_row.id);
      }
      this.exportParams.pageNum = 0;
      this.exportParams.pageSize = 0;
      this.$set(this.exportParams, "idList", idList);
      exportDsh(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "困难认定待审核列表导出.xlsx", "xlsx");
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
      let rqs,rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwhList: this.moreIform.dwhList,
        sqdjList: this.moreIform.sqdjList,
        njList: this.moreIform.njList,
        xn: this.moreIform.xn,
        pyccmList: this.training.choose || [],
        loginId: this.$store.getters.userId,
        startSqsj: rqs || "",
        endSqsj: rqe || "",
        xbmList: this.dmxbmOPs.choose || [],
        statusList: [],
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };//这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
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
    //获取年级
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.allNj = res.data.rows;
        })
        .catch((err) => {});
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
      this.detailModal = true;
      this.editparams = row;
      var data = {
        id: row.id,
        xh: row.xh,
      };
      await queryDshDetail(data).then((res) => {
        this.formDetails = res.data;
        this.editDetails.tjdjmc = res.data.tjdjmc;
        this.editDetails.tjly = res.data.tjly;
        this.editDetails.statusChinese = res.data.statusChinese;
        
      });
    },
    editClick(){
      if (!this.editDetails.shjg) {
        this.$message.error("审核结果不能为空");
      } else{
      if(this.editDetails.shjg == "01"){
        if (!this.editDetails.tjdj) {
          this.$message.error("推荐档次不能为空");
        } else{
          var data ={
          businesId: this.editparams.id,
          processId: this.editparams.processid,
          status: this.editparams.status,
          taskId: this.editparams.taskId,
          xh: this.editparams.xh,
          opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已通过",
          tjly: this.editDetails.shyj ? this.editDetails.shyj : "",
          tjdj: this.editDetails.tjdj,
          sqdj: this.editparams.sqdj,//申请等级
        };
          //通过
          tyFlow([data]).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("审核已通过");
              this.detailModal = false;
              this.handleSearch();
            }
          });
        }
      } else if(this.editDetails.shjg == "02"){
        var data ={
          businesId: this.editparams.id,
          processId: this.editparams.processid,
          status: this.editparams.status,
          taskId: this.editparams.taskId,
          xh: this.editparams.xh,
          opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已拒绝",
        };
        //拒绝
        jjFlow([data]).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("已拒绝");
          this.detailModal = false;
          this.handleSearch();
        }
      });
      } else{
        var data ={
          businesId: this.editparams.id,
          processId: this.editparams.processid,
          status: this.editparams.status,
          taskId: this.editparams.taskId,
          xh: this.editparams.xh,
          opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已退回",
          actId: this.multipleSelection1.actId,
          actName: this.multipleSelection1.actName,

        };
        thFinal([data]).then((res) => {
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
        sqdjList: this.moreIform.sqdjList,
        njList: this.moreIform.njList,
        xn: this.moreIform.xn,
        pyccmList: this.training.choose || [],
        loginId: this.$store.getters.userId,
        startSqsj: rqs || "",
        endSqsj: rqe || "",
        xbmList: this.dmxbmOPs.choose || [],
        statusList: [],
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
            case "dmxbm":
              this.$set(this.dmxbmOPs, "checkBox", res.data);
              break;
            case "dmkndjm": //困难认定等级
              this.rddjOps = res.data;
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
      this.updateArr = val.map((item) => item.id);
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.id,
        processId: v.processid,
        status: v.status,
        taskId: v.taskId,
        xh: v.xh,
        sqdj: v.sqdj,
        tjdj: v.tjdj,
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
    },
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
    //直接通过
    passDirect() {
      if (this.commonParams.length > 0) {
        this.directModal = true;
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    directCancel() {
      this.directModal = false;
    },
    //直接通过确认
    directConfirm() {
      var data = this.commonParams.map((item) => ({
          ...item,
          opMsg: "审核通过",
          tjly: "",
        }));
        tyFlow(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("审核已通过");
            this.handleSearch();
          }
        });
      this.directModal = false;
    },
    //批量审批，不同等级
    passMulti() {
      if (this.multipleSelection.length > 0) {
        this.multiModal = true;
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    multiCancel() {
      this.multiModal = false;
    },
    //批量审批通过确认
    multiConfirm() {
      if (this.updateDj !== "") {
        var paramas ={
          flowEntityReqs: this.commonParams.map((item) => ({
            ...item,
            opMsg: this.tjly ? this.tjly : "审核通过",
          })),
          tjdj: this.updateDj,
          tjly: this.tjly ? this.tjly : "",
        }
        tyBatchFlow(paramas).then((res) => {
          this.$message.success("批量审核已通过");
          this.multiModal = false;
          this.handleSearch();
        });
      } else {
        this.$message.warning("请选择推荐档次");
      };
      
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
        actId: this.multipleSelection1.actId,
        actName: this.multipleSelection1.actName,
      }));
      // var targ = {
      //   czdaFlowNodeRes: this.multipleSelection1,
      //   czdaFlowOpReqList: data,
      // };
      thFinal(data).then((res) => {
        if (res.errcode == "00") {
          this.detailModal = false;
          this.$message.success("退回成功");
          this.handleSearch();
        }
      });
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
    margin-left: 30px;
    margin-right: 30px;
  }
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
