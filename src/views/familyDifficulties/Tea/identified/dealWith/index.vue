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
          <span class="title">已处理列表</span> <i class="Updataicon"></i>
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
          <div class="btns borderBlue" @click="mbDown">
            <i class="icon downIcon"></i><span class="title">模板下载</span>
          </div>
          <div class="btns borderRed" @click="handleDelete">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderBlue">
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
          <div class="btns fullGreen" @click="handleNew">
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
                  >
                    <div>
                      <div>{{editDetails.statusChinese}}</div> 
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="推荐档次" label-width="120px">
                    <div>{{ editDetails.tjdjmc }}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="推荐理由" label-width="120px" prop="shyj">
                    <div>
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
                  >
                    <div>
                      <div>{{editDetails.statusChinese}}</div> 
                    </div>
                    <!-- <el-select
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
                    </el-select> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-if="userflag ==2">
                <el-col :span="20">
                  <el-form-item label="推荐档次" label-width="120px">
                    <div>
                      <div>{{editDetails.xyTjdjmc}}</div> 
                    </div>
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
                <div class="content">{{ formAdd.xsxh }}</div>
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
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">手机号码</div>
                <div class="content">{{ basicInfo.yddh }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">家庭人口数</div>
                <div class="content">{{ basicInfo.jtrks }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">人均年收入</div>
                <div class="content">{{ basicInfo.rjnsr }}</div>
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
            <el-form-item label="认定周期">{{
              basicInfo.xn + (basicInfo.xq ? basicInfo.xq : "")
            }}</el-form-item>
            <el-form-item label="申请等级" prop="sqdj" :rules="rules.sqdj">
              <el-select v-model="formAdd.sqdj">
                <el-option
                  v-for="(item, index) in rddjOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
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
            <div class="headline">民主决议</div>
            <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="审核结果"
                    label-width="120px" 
                    prop="shjg"
                  >
                    <el-select
                      v-model="formAdd.shjg"
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
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="推荐档次" label-width="120px" prop="tjdj">
                    <el-select
                      v-model="formAdd.tjdj"
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
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="推荐理由" label-width="120px" prop="tjly">
                    <el-input 
                      v-model="formAdd.tjly"
                      :autosize="{ minRows: 2 }"
                      type="textarea"
                      maxlength="500"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
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
  exportYsh,
  queryYshList,
  queryDshDetail,
  mbDown,
  jtknAdd,
  del,
  queryStuList,
} from "@/api/familyDifficulties/difficultTea"
import {
  queryKnssqxsjbxx,
} from "@/api/familyDifficulties/stu";
import {
  getAllpjjx,
  getAllpjjxxx,
} from "@/api/awards/stu";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getCollege,getGrade } from "@/api/class/maintenanceClass";
import lctCom from "../../../../components/lct";
import { lctTable } from "@/api/stuDangan/detailList/xiaoneiwai";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getToken } from "@/utils/auth";
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
      ztStatus: [],
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
      showDelete: false,
      tableInner: [],
      thTableModal: false,
      thModal: false,
      tempRadio: false,
      detailModal: false,
      formDetails: {},
      editDetails:[{shyj:"",statusChinese:"",}],
      editparams:{},
      shjgOps:[
        {dm:'01',mc: '通过'},
        {dm:'02',mc: '拒绝'},
        {dm:'03',mc: '退回'},
      ],
      allNj: [], //年级下拉
      jxlb: "1",//个人奖项为1，集体奖项为2
      uploadUrl: process.env.VUE_APP_BASE_API + "/rcswJtknKnsq/import",
      delArr: [],
      pjdjOps: [],
      pjdjDuoOps: [],
      rddjOps: [],
      formAdd: { xn: "", zwxj: "",shjg:"" },
      basicInfo: {},
      addModal: false,
      userflag: 1,
      rules: {
        sqdj: [
          {
            required: true,
            message: "申请等级不能为空",
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
        shjg: [
          { required: true, message: "审核结果不能为空", trigger: "change" },
        ],
        tjdj: [
          { required: true, message: "推荐档次不能为空", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    // this.handleSearch();
    this.getAllCollege();
    this.getSchoolYears();
    this.getCode("dmpyccm"); // 培养层次dmxbm
    this.getCode("dmxbm"); 
    this.getCode("dmkndjm"); //认定等级
    this.getAllGrade();
    this.userflag = this.$store.getters.roleId == "05" ? 2:1; //05学院负责人06辅导员
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
      exportYsh(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "困难申请待审核列表导出.xlsx", "xlsx");
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
      // this.editDetails.shyj = row.commentList[0];
      var data = {
        id: row.id,
        xh: row.xh,
      };
      await queryDshDetail(data).then((res) => {
        this.formDetails = res.data;
        this.editDetails.tjdjmc = res.data.tjdjmc ||"";
        this.editDetails.tjly = res.data.tjly;
        this.editDetails.statusChinese = res.data.statusChinese;
        this.editDetails.xyTjdjmc = res.data.xyTjdjmc ||"";
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
      this.delArr = val.map((item) => item.id);
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
      mbDown().then((res) => {
        this.downloadFn(res, "困难申请模板下载", "xlsx");
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
      var arr = this.delArr;
      del(arr)
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
      this.formAdd.shjg ="01";
      this.addModal = true;
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let formData = new FormData();
        formData.append("xh", this.formAdd.xsxh);
        formData.append("sqdj", this.formAdd.sqdj);
        formData.append("sqly", this.formAdd.sqly);
        formData.append("xn", this.basicInfo.xn);
        formData.append("xq", this.basicInfo.xqm);
        formData.append("tjdj", this.formAdd.tjdj);
        formData.append("shjg", this.formAdd.shjg);
        formData.append("tjly", this.formAdd.tjly ||"");
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        jtknAdd(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.handleSearch();
            this.addModal = false;
          } else {
            this.$message.error("新增失败");
          }
        });
        
      }
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
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
    handleSelect(item){
      this.formAdd.xsxh = item.gh;
      this.formAdd.xsxm = item.xm;
      console.log("this.formAdd.xsxh",this.formAdd.xsxh);
      queryKnssqxsjbxx({xh: this.formAdd.xsxh}).then((res) => {
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
