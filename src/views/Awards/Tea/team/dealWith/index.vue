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
            <el-option label="集体名称" value="jtmc"></el-option>
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
          <el-col :span="7">
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
          <el-col :span="7">
            <span>评奖奖项：</span>
            <el-select
              v-model="moreIform.pjjxList"
              multiple
              collapse-tags
              @change="changeJXDuo"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in pjjxOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <span>评奖等级：</span>
            <el-select
              v-model="moreIform.pjdjList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in pjdjDuoOps"
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
        <!-- <el-row :gutter="20" class="mt15">
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
        </el-row> -->
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">已处理列表</span> <i class="Updataicon"></i>
          <span style="margin-left: 15px">评选周期：</span>
          <el-select
            v-model="moreIform.pjzqXn"
            collapse-tags
            @change="changeXn"
            placeholder="请选择"
            style="width: 130px; margin: 0 0 15px 0"
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
          <div class="btns borderBlue" @click="mbDown" v-show="AUTHFLAG && userflag == 2">
            <i class="icon downIcon"></i><span class="title">模板下载</span>
          </div>
          <div class="btns borderRed" @click="handleDelete" v-show="AUTHFLAG && userflag == 2">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderBlue" v-show="AUTHFLAG && userflag == 2">
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
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns fullGreen" @click="handleNew" v-show="AUTHFLAG && userflag == 2">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
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
          <el-table-column prop="jtmc" label="集体名称" width="100" sortable>
          </el-table-column>
          <el-table-column
            prop="dwhmc"
            label="培养单位"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="pjjxmc"
            label="评奖奖项"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="pjdj"
            label="评奖等级"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="sqsj"
            label="申请时间"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="statusChinese"
            label="审核状态"
            min-width="100"
            sortable
          >
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
      <el-dialog title="删除" :visible.sync="showDelete" width="30%">
        <span>确认删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="rmRecord"
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
              <div class="formLeft">
                <span class="title">学生基本信息</span>
              </div>
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
                        <div class="content">{{ formDetails.xbmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养层次</div>
                        <div class="content">{{ formDetails.pyccmc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养单位</div>
                        <div class="content">{{ formDetails.dwhmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">年级</div>
                        <div class="content">{{ formDetails.ssnj }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">专业</div>
                        <div class="content">{{ formDetails.zydmmc }}</div>
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
              <div>
                <div class="formLeft"><span class="title">申请信息</span></div>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="评奖奖项">
                      <div>{{ formDetails.pjjxmc }}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="评奖等级">
                      <div>{{ formDetails.pjdj }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="集体名称">
                      <div>{{ formDetails.jtmc }}</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="其他">
                      <div>{{ formDetails.qt }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row :gutter="20">
                <el-form-item label="评奖周期">
                  <div>{{ formDetails.pjzqXn +' '+ formDetails.pjzqXq}}</div>
                </el-form-item>
              </el-row> -->
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="培养单位">
                      <div>{{ formDetails.dwhmc }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="申请理由">
                      <div>{{ formDetails.sqly }}</div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="附件信息">
                      <div>
                        <div v-for="item in formDetails.fileList">
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                            "
                          >
                            <a>
                              <span style="color: #005657">{{
                                item.fileName
                              }}</span>
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
            <div class="formLeft"><span class="title">审核信息</span></div>
            <el-form
              :data="editDetails"
              ref="editDetails"
              label-width="110px"
              :rules="rules"
            >
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请审核结果" label-width="120px">
                    <div>{{ editDetails.statusChinese }}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="申请审核意见" label-width="120px">
                    <div>{{ editDetails.shyj }}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="detailCancel">关 闭</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="新增"
        :visible.sync="addModal"
        width="50%"
        @close="addCance"
        :close-on-click-modal="false"
      >
        <div class="headline">基本信息</div>
        <div class="tableStyle">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <el-autocomplete
                  v-model="formAdd.xsxh"
                  :fetch-suggestions="querySearchByXh"
                  placeholder="请输入学生学号"
                  :trigger-on-focus="false"
                  @select="handleSelectXh"
                ></el-autocomplete>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <!-- <div class="content">{{ formDetails.xm }}</div> -->
                <el-autocomplete
                  v-model="formAdd.xsxm"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入学生姓名"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                ></el-autocomplete>
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
        <div class="headline">申请信息</div>
        <div class="tableStyle">
          <el-form
            ref="formAdd"
            :model="formAdd"
            :rules="rules"
            label-width="150px"
          >
            <el-form-item label="评奖奖项" prop="pjjx" :rules="rules.pjjx">
              <el-select v-model="formAdd.pjjx" @change="changeJX">
                <el-option
                  v-for="(item, index) in pjjxOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评奖等级" prop="pjdj" :rules="rules.pjdj">
              <el-select v-model="formAdd.pjdj">
                <el-option
                  v-for="(item, index) in pjdjOps"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :col="12">
                <el-form-item label="集体名称" prop="jtmc">
                  {{ formAdd.jtmc }}
                </el-form-item>
              </el-col>
              <!-- <el-col :col="12">
                <el-form-item label="集体名称" prop="jtmc">
                  {{ basicInfo.ssbjmc }}
                </el-form-item>
              </el-col>-->
            </el-row>
            <el-form-item label="其他" prop="qt" :rules="rules.qt">
              <el-input v-model="formAdd.qt" maxlength="100" />
            </el-form-item>
            <el-form-item label="申请理由" prop="sqly">
              <el-input
                type="textarea"
                v-model="formAdd.sqly"
                maxlength="500"
              />
            </el-form-item>
            <el-form-item label="附件信息" prop="fj">
              <el-upload
                action="#"
                multiple
                class="el-upload"
                :auto-upload="false"
                ref="upload"
                :file-list="formAdd.fileList"
                :on-change="fileChange"
                accept=".pdf,.jpg"
                :before-remove="beforeRemove"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
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
  queryYshList,
  queryDshDetail,
  exportYsh,
  mbDown,
  pjpyAdd,
  del,
  getPjdjByPjjx,
  getAllpjjxxxByXh,
} from "@/api/awards/awardTea";
import { getAllpjjx } from "@/api/awards/stu";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { getZY } from "@/api/student/index";
import lctCom from "../../../../components/lct";
import { lctTable } from "@/api/stuDangan/detailList/xiaoneiwai";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getToken } from "@/utils/auth";
import { queryStuList } from "@/api/familyDifficulties/difficultTea";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
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
      AUTHFLAG: false,
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
        pjjxList: [],
        pjdjList: [],
        pjzqXn: "",
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
      showDelete: false,
      tableInner: [],
      thTableModal: false,
      thModal: false,
      tempRadio: false,
      detailModal: false,
      formDetails: {},
      editDetails: [{ shyj: "", statusChinese: "" }],
      editparams: {},
      shjgOps: [
        { dm: "01", mc: "通过" },
        { dm: "02", mc: "拒绝" },
        { dm: "03", mc: "退回" },
      ],
      allNj: [], //年级下拉
      jxlb: "2", //个人奖项为1，集体奖项为2
      uploadUrl:
        process.env.VUE_APP_BASE_API + "/rcswPjpyFlow/importExcelCollective",
      delArr: [],
      pjdjOps: [],
      pjdjDuoOps: [],
      pjjxOps: [],
      formAdd: { pjzqXn: "", pjzqXq: "", xsxh: "" },
      basicInfo: {},
      addModal: false,
      userflag: 1,
      rules: {
        pjdj: [
          {
            required: true,
            message: "评奖等级不能为空",
            trigger: "blur",
          },
        ],
        pjjx: [
          {
            required: true,
            message: "评奖奖项不能为空",
            trigger: "blur",
          },
        ],
        sqly: [
          {
            required: true,
            message: "申请理由不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    // this.handleSearch();
    this.getAllCollege();
    this.getSchoolYears();
    this.getCode("dmpyccm"); // 培养层次dmxbm
    this.getAllGrade();
    this.getJX();
    this.userflag = this.$store.getters.roleId == "06" ? 2 : 1; //05学院负责人06辅导员
  },

  methods: {
    // 表单校验
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    //奖项
    getJX() {
      getAllpjjx({ jxlb: "2" }).then((res) => {
        this.pjjxOps = res.data;
      });
    },
    changeJXDuo(val) {
      if (val && val.length == 0) {
        this.moreIform.pjdjList = []; //等级
      } else {
        getPjdjByPjjx({ pjjxList: val }).then((res) => {
          this.pjdjDuoOps = res.data;
        });
      }
    },
    changeXn() {
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
      exportYsh(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "评奖评优待审核列表导出.xlsx", "xlsx");
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
      let rqs,
        rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      let data = {
        jtmc: this.select == "jtmc" ? this.searchVal : null,
        dwhList: this.moreIform.dwhList,
        pjzqXn: this.moreIform.pjzqXn,
        pjjxList: this.moreIform.pjjxList,
        pjdjList: this.moreIform.pjdjList,
        // pyccmList: this.training.choose || [],
        loginId: this.$store.getters.userId,
        sqsjStart: rqs || "",
        sqsjEnd: rqe || "",
        jxlb: this.jxlb,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
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
          this.moreIform.pjzqXn = res.data[0].mc;
          this.handleSearch();
        })
        .catch((err) => {});
    },
    async hadleDetail(row) {
      console.log("row", row);
      this.detailModal = true;
      this.editparams = row;
      this.editDetails.shyj = row.commentList[0];
      this.editDetails.statusChinese = row.statusChinese;
      var data = {
        businesId: row.businesId,
        processId: row.processid,
      };
      await queryDshDetail(data).then((res) => {
        this.formDetails = res.data;
      });
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
        jtmc: this.select == "jtmc" ? this.searchVal : null,
        dwhList: this.moreIform.dwhList,
        pjzqXn: this.moreIform.pjzqXn,
        pjjxList: this.moreIform.pjjxList,
        pjdjList: this.moreIform.pjdjList,
        // pyccmList: this.training.choose || [],
        loginId: this.$store.getters.userId,
        sqsjStart: rqs || "",
        sqsjEnd: rqe || "",
        jxlb: this.jxlb,
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
      this.delArr = val.map((item) => item.businesId);
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
    //导入失败
    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.handleSearch();
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
    //模板下载
    mbDown() {
      mbDown({ jxlb: this.jxlb }).then((res) => {
        this.downloadFn(res, "集体奖项模板下载", "xlsx");
        this.$message.success("操作成功");
      });
    },
    beforeRemove(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      this.fileList = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 2) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过2M");
      } else if (file.status == "ready") {
        this.fileListAdd = [];
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
      this.fileList = fileList;
    },
    //删除
    handleDelete() {
      if (this.delArr && this.delArr.length > 0) {
        this.showDelete = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    delCancel() {
      this.showDelete = false;
    },
    //批量删除
    rmRecord() {
      this.showDelete = false;
      del({ ids: this.delArr })
        .then((res) => {
          this.$message.success("删除成功");
          this.handleSearch();
        })
        .catch((err) => {});
    },
    //新增
    handleNew() {
      this.formAdd = {};
      this.formAdd.fileList = [];
      this.fileList = [];
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
      this.pjdjOps = [];
    },
    changeJX(val) {
      this.pjdjOps = [];
      var data = {
        pjjx: val,
        jxlb: this.jxlb,
        xh: this.formAdd.xsxh !== "" ? this.formAdd.xsxh : null,
      };
      getAllpjjxxxByXh(data).then((res) => {
        this.pjdjOps = res.data.pjdjList;
        this.formAdd.pjzqXn = res.data.pjzqXn;
        this.formAdd.pjzqXq = res.data.pjzqXq;
        this.formAdd.pjzqXqmc = res.data.pjzqXqmc;
      });
    },
    addClick() {
      if (!this.checkFormAdd || !this.formAdd.xsxh) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let formData = new FormData();

        formData.append("jxlb", "2");
        formData.append("pjdj", this.formAdd.pjdj);
        formData.append("pjjx", this.formAdd.pjjx);
        formData.append("sqly", this.formAdd.sqly);
        formData.append("pjzqXn", this.formAdd.pjzqXn);
        formData.append("pjzqXq", this.formAdd.pjzqXq || "");
        //formData.append("jtmc", this.formAdd.jtmc);
        formData.append("qt", this.formAdd.qt ? this.formAdd.qt : "");
        formData.append("xh", this.formAdd.xsxh);
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        pjpyAdd(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.addModal = false;
            this.handleSearch();
          } else {
            this.$message.error("新增失败");
          }
        });
      }
    },
    //学生
    querySearch(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xm = { xm: queryString };
        var result = [];
        var resultNew = [];
        queryStuList(Xm).then((res) => {
          result = res.data.length > 0 ? res.data : [];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            cb([{ value: "暂无数据", price: "暂无数据" }]);
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    handleSelect(item) {
      this.formAdd.xsxh = item.gh;
      this.formAdd.xsxm = item.xm;
      this.$set(this.formAdd, "pjjx", "");
      this.$set(this.formAdd, "pjdj", "");
      (this.formAdd.pjjxOps = []),
        queryKnssqxsjbxx({ xh: this.formAdd.xsxh }).then((res) => {
          this.basicInfo = res.data;
        });
    },
    //通过学号查姓名信息
    querySearchByXh(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xh = { xh: queryString };
        var result = [];
        var resultNew = [];
        queryStuList(Xh).then((res) => {
          result = res.data.length > 0 ? res.data : [];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            cb([{ value: "暂无数据", price: "暂无数据" }]);
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    handleSelectXh(item) {
      this.formAdd.xsxh = item.gh;
      this.formAdd.xsxm = item.xm;
      this.$set(this.formAdd, "pjjx", "");
      this.$set(this.formAdd, "pjdj", "");
      (this.formAdd.pjjxOps = []),
        console.log("this.formAdd.xsxh", this.formAdd.xsxh);
      queryKnssqxsjbxx({ xh: this.formAdd.xsxh }).then((res) => {
        this.basicInfo = res.data;
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
        // .borderGreen {
        //   border: 1px solid grey;
        //   background: #005657;
        // }
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
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
          }
          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
        }
      }
    }
  }
  .baseInfo {
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
