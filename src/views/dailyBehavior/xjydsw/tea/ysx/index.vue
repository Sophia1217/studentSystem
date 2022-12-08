<template>
  <div class="manStudentStyle">
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
            <el-option label="异动文号" value="ydwh"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchBtn"
            @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span> {{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20">
          <el-col :span="6">
            <span>培养单位：</span>
            <el-select
              v-model="moreIform.manageReg"
              @change="changeXY"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in allDwh"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>专<span v-html="'\u3000\u3000'"></span>业：</span>
            <el-select
              v-model="moreIform.stuInfo"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in zyOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>班<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.pread"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in bjOps"
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
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">异动类别：</el-col>
          <el-col :span="8">
            <div class="checkbox">
              <el-select
                v-model="moreIform.mk"
                multiple
                collapse-tags
                placeholder="请选择异动类别"
                size="small"
              >
                <el-option
                  v-for="(item, index) in ydlbList"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">申请时间：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="tjdate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="请选择申请时间"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">已审核列表</span> <i class="Updataicon"></i>
        </div>

        <div class="headerRight">
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns" style="background: #ffffff" @click="dynamicTable">
            <i class="icon controlIcon"></i>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          :default-sort="{ prop: 'xh', order: 'ascending' }"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            fixed="left"
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="学号"
            prop="xh"
            width="100"
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="姓名"
            prop="xm"
            width="80"
          ></el-table-column>
          <div v-for="(item, index) in tableHeader" :key="index">
            <el-table-column
              :prop="item.dm"
              :label="item.mc"
              min-width="100"
              sortable="custom"
            ></el-table-column>
          </div>
          <el-table-column fixed="right" label="审核进度" width="140">
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
                <span class="handleName">异动详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="列表显示项"
      :visible.sync="dynamicModal"
      width="40%"
      :close-on-click-modal="false"
    >
      <div class="checkbox">
        <checkboxComDynic
          :objProp="dynamicsCheckboxs"
          @training="dynamicsAll"
          @checkedTraining="dynamicsCheck"
        ></checkboxComDynic>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dynamicCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="dynamicConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
    <el-dialog
      title="导出确认"
      :visible.sync="daochuModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelB">取 消</el-button>
        <el-button type="primary" class="confirm" @click="daochu()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="审核记录"
      :visible.sync="shRecordModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-table :data="shRecordTable" ref="multipleTable" style="width: 100%">
          <el-table-column label="审核人" prop="userId"></el-table-column>
          <el-table-column fixed="left" label="申请审核结果" prop="opType">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.opType"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in czlx"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select> </template
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="审核时间"
            prop="opTime"
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="申请审核意见"
            prop="msg"
          ></el-table-column>
        </el-table>
        <el-button @click="shRecordcancel">关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="申报详情" :visible.sync="detailModal" width="60%">
      <template>
        <div class="baseInfo">
          <el-form :data="formDetails" style="margin-bottom: 0">
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
                      <div class="content">{{ formDetails.xbmmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">培养单位</div>
                      <div class="content">{{ formDetails.dwhmc }}</div>
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
                      <div class="title">联系方式</div>
                      <div class="content">{{ formDetails.yddh }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col
                    :span="24"
                    class="rowStyle"
                    v-if="flag == '01' || flag == '04'"
                  >
                    <div class="wrap">
                      <div class="title">住宿信息</div>
                      <div class="content">{{ formDetails.zsxx }}</div>
                    </div>
                  </el-col>
                  <el-col :span="24" class="rowStyle" v-if="flag == '03'">
                    <div class="wrap">
                      <div class="title">原住宿信息</div>
                      <div class="content">{{ formDetails.zsxx }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle" v-if="flag == '02'">
                    <div class="wrap">
                      <div class="title">住宿信息</div>
                      <div class="content">{{ formDetails.zsxx }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle" v-if="flag == '02'">
                    <div class="wrap">
                      <div class="title">辅导员</div>
                      <div class="content">{{ formDetails.fdyMc }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="formLeft"><span class="title">申请信息</span></div>
            <div class="backDetail" v-if="flag == '01'">
              <div class="formRight">
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请异动</div>
                      <div class="content">{{ formDetails1.sqyd }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请类型</div>
                      <div class="content">{{ formDetails1.oplx }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">其他</div>
                      <div class="content">{{ formDetails1.qt }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">是否退宿</div>
                      <div class="content">{{ formDetails1.SFTS }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">参加项目</div>
                      <div class="content">{{ formDetails1.blxjCjxm }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">负责部门</div>
                      <div class="content">{{ formDetails1.blxjFzbm }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">保留时间</div>
                      <div class="content">
                        {{ formDetails1.blxjBlstart }}
                        <span v-html="'\u3000'"></span> 至
                        <span v-html="'\u3000'"></span
                        >{{ formDetails1.blxjBlend }}
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请理由</div>
                      <div class="content">{{ formDetails1.sqmsg }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请材料</div>
                      <div class="content">
                        <el-upload
                          action="#"
                          multiple
                          :file-list="formDetails1.fileList"
                          :auto-upload="false"
                          class="el-upload"
                          :disabled="true"
                        >
                        </el-upload>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="backDetail" v-if="flag == '02'">
              <div class="formRight">
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请异动</div>
                      <div class="content">{{ formDetails1.sqyd }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请理由</div>
                      <div class="content">{{ formDetails1.sqmsg }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请材料</div>
                      <div class="content">
                        <div class="content">
                          <el-upload
                            action="#"
                            multiple
                            :file-list="formDetails1.fileList"
                            :auto-upload="false"
                            class="el-upload"
                            :disabled="true"
                          >
                          </el-upload>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="backDetail" v-if="flag == '03'">
              <div class="formRight">
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请异动</div>
                      <div class="content">{{ formDetails1.sqyd }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">编入年级</div>
                      <div class="content">{{ fxNj }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">编入班级</div>
                      <div class="content">{{ fxBj }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">是否已经退宿</div>
                      <div class="content">{{ formDetails1.SFTS }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">是否申请入住</div>
                      <div class="content">{{ formDetails1.SFRZ }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请理由</div>
                      <div class="content">{{ formDetails1.sqmsg }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请材料</div>
                      <div class="content">
                        <el-upload
                          action="#"
                          multiple
                          :file-list="formDetails1.fileList"
                          :auto-upload="false"
                          class="el-upload"
                          :disabled="true"
                        >
                        </el-upload>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="backDetail" v-if="flag == '04'">
              <div class="formRight">
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请异动</div>
                      <div class="content">{{ formDetails1.sqyd }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">是否退宿</div>
                      <div class="content">{{ formDetails1.SFTS }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请理由</div>
                      <div class="content">{{ formDetails1.sqmsg }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="rowStyle">
                    <div class="wrap">
                      <div class="title">申请材料</div>
                      <div class="content">
                        <el-upload
                          action="#"
                          multiple
                          :file-list="formDetails1.fileList"
                          :auto-upload="false"
                          class="el-upload"
                          :disabled="true"
                        >
                        </el-upload>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
          <!-- <div class="formLeft"><span class="title">审核信息</span></div>
          <el-form :data="editDetails" :model="editDetails" ref="editDetails">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item
                  label="申请审核结果"
                  label-width="120px"
                  prop="shjg"
                  :rules="rules.shjg"
                >
                  <el-select
                    v-model="editDetails.shjg"
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
              <el-col :span="10">
                <el-form-item
                  label="复学类型"
                  label-width="120px"
                  prop="shjg"
                  v-if="flag == '03'"
                >
                  <el-select
                    v-model="formDetails1.oplx"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="item in fxList"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="休学类型"
                  label-width="120px"
                  prop="shjg"
                  v-if="flag == '04'"
                >
                  <el-select
                    v-model="formDetails1.oplx"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="item in xxList"
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
                <el-form-item
                  label="申请审核意见"
                  label-width="120px"
                  prop="shyj"
                >
                  <el-input
                    v-model="editDetails.shyj"
                    :autosize="{ minRows: 4 }"
                    type="textarea"
                    maxlength="500"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item
                  label="审核材料"
                  label-width="120px"
                  v-if="flag == '02'"
                >
                  <el-upload
                    action="#"
                    multiple
                    class="el-upload"
                    ref="upload"
                    :data="fileData"
                    :show-file-list="true"
                    :file-list="SHfileList"
                    :before-remove="beforeRemove"
                    :on-preview="handlePreview"
                    :action="uploadUrl"
                    :headers="fileHeader"
                    accept=".pdf,.jpg"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form> -->
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shRecord">审核记录</el-button>
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
</template>

<script>
import CheckboxCom from "../../../../components/checkboxCom";
import checkboxComDynic from "../../../../components/checkboxComDynic";
import lctCom from "../../../../components/lct";
import { querywj } from "@/api/assistantWork/classEvent";
import { delFile, downloadFile, queryFile } from "@/api/common/file";
import { queryLc } from "@/api/common/liucheng";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { backFlow } from "@/api/dailyBehavior/stuTravelTea";
import { getManageRegStuInfoSearchSpread } from "@/api/student/index";
import {
  queryYsx,
  getDetail,
  tyFlow,
  htFlow,
  jjFlow,
  xhQuery,
  ysxExp,
} from "@/api/dailyBehavior/xjyd";
import { getToken } from "@/utils/auth";
export default {
  components: { CheckboxCom, checkboxComDynic, lctCom },
  data() {
    return {
      shRecordModal: false,
      shRecordTable: [],
      uploadUrl: process.env.VUE_APP_BASE_API + "/fileCommon/uploadFileCommon",
      SHfileList: [],
      conformModal: false,
      conformType: "",
      conformText: "",
      detailModal: false,
      lctModal: false,
      daochuModal: false,
      searchVal: "",
      select: "",
      isMore: false,
      pycc: "",
      tjdate: "",

      tempRadio: false,
      moreIform: {
        manageReg: [], // 学院
        stuInfo: [], // 专业
        pread: [], // 班级
        mk: [],
      },
      tableInner: [],
      rules: {
        shjg: [
          { required: true, message: "审核结果不能为空", trigger: "change" },
        ],
        // shyj: [
        //   { required: true, message: "审核意见不能为空", trigger: "change" },
        // ],
      },
      ztStatus: [],
      fxBj: "",
      fxNj: "",
      editDetails: {
        shyj: "",
        shjg: "",
      },
      xxList: [
        { dm: "身体疾病", mc: "身体疾病" },
        { dm: "心理疾病", mc: "心理疾病" },
        { dm: "精神疾病", mc: "精神疾病" },
        { dm: "自主创业", mc: "自主创业" },
        { dm: "工作实践", mc: "工作实践" },
        { dm: "自费境外留学", mc: "自费境外留学" },
      ],
      fxList: [
        { dm: "身体疾病", mc: "身体疾病" },
        { dm: "心理疾病", mc: "心理疾病" },
        { dm: "精神疾病", mc: "精神疾病" },
        { dm: "自主创业", mc: "自主创业" },
        { dm: "工作实践", mc: "工作实践" },
        { dm: "自费境外留学", mc: "自费境外留学" },
        { dm: "征兵入伍", mc: "征兵入伍" },
        { dm: "境内交换生项目", mc: "境内交换生项目" },
        { dm: "境外交换生项目", mc: "境外交换生项目" },
      ],
      ydlbList: [
        { dm: "fx", mc: "复学" },
        { dm: "blxj", mc: "保留学籍" },
        { dm: "xx", mc: "休学" },
        { dm: "tx", mc: "退学" },
      ],
      allDwh: [], // 学院下拉框
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      pyccOps: [], //培养层次
      datePicker: "",
      czlx: [],
      manageRegOps: [], //
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      ind: 1,
      len: 0,
      dynamicModal: false,
      tableHeader: [
        { dm: "dwhmc", mc: "培养单位" },
        { dm: "pyccmmc", mc: "培养层次" },
        { dm: "zydmmc", mc: "专业" },
        { dm: "bjmmc", mc: "班级" },
        { dm: "mkmc", mc: "异动类别" },
        { dm: "tjdate", mc: "申请时间" },
      ],
      dynamicsCheckboxs: {
        //动态表头
        checkAll: false,
        choose: [],
        checkBox: [
          { dm: "dwhmc", mc: "培养单位" },
          { dm: "pyccmmc", mc: "培养层次" },
          { dm: "zydmmc", mc: "专业" },
          { dm: "bjmmc", mc: "班级" },
          { dm: "mkmc", mc: "异动类别" },
          { dm: "tjdate", mc: "申请时间" },
        ],
        isIndeterminate: true,
      },
      allNj: [],
      tableData: [],
      multipleSelection: [],
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      formDetails: {},
      formDetails1: {},
      shjgOps: [
        { dm: "01", mc: "通过" },
        { dm: "02", mc: "拒绝" },
        { dm: "03", mc: "退回" },
      ],
      tableDetail: {},
      thTableModal: false,
      flag: "01",
      multipleSelection1: "",
      AUTHFLAG: false,
    };
  },
  mounted() {
    this.getSpread();
    this.getAllCollege();
    this.getAllGrade(); //年级
    this.getCode("dmpyccm"); // 培养层次
    this.handleSearch();
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  activated() {
    this.handleSearch();
  },
  computed: {
    fileData: {
      get() {
        return {
          pageType: "xjyd",
          roleType: "rcsw",
          businesId: this.tableDetail.processId,
        };
      },
    },
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
  methods: {
    shRecord() {
      this.shRecordModal = true;
      queryLc({ processInstanceId: this.tableDetail.processId }).then((res) => {
        this.shRecordTable = res.data;
      });
      //
    },
    shRecordcancel() {
      this.shRecordModal = false;
      this.shRecordTable = [];
    },
    async hadleDetail(row) {
      this.tableDetail = row;
      var processId = { businesId: row.businesId };
      var pa = [];
      pa.push(row.dwh);
      this.getBJ(pa);
      await getDetail(processId).then((res) => {
        this.formDetails1 = res.data;
        this.formDetails1.SFTS = this.formDetails1.sfts == "0" ? "否" : "是";
        this.formDetails1.SFRZ =
          this.formDetails1.fxSfsqrz == "0" ? "否" : "是";
        this.formDetails1.sqyd =
          this.formDetails1.sqlx == "blxj"
            ? "保留学籍"
            : this.formDetails1.sqlx == "tx"
            ? "退学"
            : this.formDetails1.sqlx == "fx"
            ? "复学"
            : this.formDetails1.sqlx == "xx"
            ? "休学"
            : "";
        this.formDetails1.sqlx == "blxj"
          ? (this.flag = "01")
          : this.formDetails1.sqlx == "tx"
          ? (this.flag = "02")
          : this.formDetails1.sqlx == "fx"
          ? (this.flag = "03")
          : this.formDetails1.sqlx == "xx"
          ? (this.flag = "04")
          : "";
        this.fxBj = this.formDetails1.fxBj;
        this.fxNj = this.formDetails1.fxNj;
      });
      await xhQuery({ xh: row.xh }).then((res) => {
        this.formDetails = res.data;
      });
      //用于文件查询
      await querywj(processId).then((res) => {
        this.formDetails1.fileList = res.data;
        this.formDetails1.fileList = this.formDetails1.fileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
      if (this.flag == "02") {
        this.queryFile();
      }
      this.detailModal = true;
    },
    handlePreview(file) {
      downloadFile({ id: file.id }).then((res) => {
        this.downloadFn(res, file.fileName, file.fileSuffix);
      });
    },
    beforeRemove(file, fileList) {
      delFile({ id: file.id }).then(() => {
        this.queryFile();
      });
    },
    async queryFile() {
      await queryFile({ businesId: this.tableDetail.processId }).then((res) => {
        this.SHfileList = res.data;
        this.SHfileList = this.SHfileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
    },
    // emptyDetails() {
    //   this.$refs.editDetails.resetFields();
    // },
    checkFormAdd() {
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
    detailCancel() {
      this.detailModal = false;
    },
    detailClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        this.conformModal = true;
      }
    },
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
    thTableCancel() {
      this.thTableModal = false;
    },
    thTableConfirm() {
      if (!!this.tempRadio || this.tempRadio === 0) {
        this.thTableModal = false;
        this.tableInner = [];
      } else {
        this.$message.error("请先勾选退回的节点");
      }
    },
    changeJG(val) {
      if (val && val == "03") {
        var processId = { processId: this.tableDetail.taskId };
        this.conformType = "退回";
        this.conformText = "退回确认";
        backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      } else if (val && val == "02") {
        this.conformType = "拒绝";
        this.conformText = "拒绝确认";
      } else {
        this.conformType = "同意";
        this.conformText = "同意确认";
      }
    },
    finalCancel() {
      this.conformModal = false;
    },
    finalConfirm() {
      var data = {
        id: this.tableDetail.businesId,
        oplx: this.formDetails1.oplx,
        processId: this.tableDetail.processId,
        taskId: this.tableDetail.taskId,
        xh: this.tableDetail.xh,
        opMsg: this.editDetails.shyj ? this.editDetails.shyj : "",
        fxBj: this.flag == "03" ? this.fxBj : "",
        fxNj: this.flag == "03" ? this.fxNj : "",
        actId: "",
        actName: "",
      };
      if (this.conformType == "退回") {
        data.actId = this.multipleSelection1.actId;
        data.actName = this.multipleSelection1.actName;
        htFlow(data).then((res) => {
          this.conformModal = false;
          this.handleSearch();
          this.$message.success("已退回");
        });
      } else if (this.conformType == "拒绝") {
        jjFlow(data).then((res) => {
          this.conformModal = false;
          this.handleSearch();
          this.$message.success("已拒绝");
        });
      } else {
        tyFlow(data).then((res) => {
          this.conformModal = false;
          this.handleSearch();
          this.$message.success("已成功通过");
        });
      }
      this.detailModal = false;
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
    dynamicsCheck(value) {
      let checkedCount = value.length;
      this.dynamicsCheckboxs.checkAll =
        checkedCount === this.dynamicsCheckboxs.checkBox.length;
      this.dynamicsCheckboxs.isIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.dynamicsCheckboxs.checkBox.length;
    },
    dynamicsAll(val) {
      let allCheck = [];
      for (let i in this.dynamicsCheckboxs.checkBox) {
        allCheck.push(this.dynamicsCheckboxs.checkBox[i]);
      }
      this.dynamicsCheckboxs.choose = val ? allCheck : [];

      this.dynamicsCheckboxs.isIndeterminate = false;
    },
    dynamicCancel() {
      this.dynamicModal = false;
    },
    dynamicConfirm() {
      this.tableHeader = this.dynamicsCheckboxs.choose;
      this.dynamicModal = false;
    },
    dynamicTable() {
      this.dynamicModal = true;
    },
    ///上传
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
        this.handleSearch();
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },

    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },

    // 查询学院
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
      //   this.getBJ(val);
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

    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmshrzlx":
              this.czlx = res.data;
              break;
            case "dmpyccm":
              this.$set(this.training, "checkBox", res.data);
              this.pyccOps = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    // 获取学院专业班级
    getSpread() {
      getManageRegStuInfoSearchSpread()
        .then((res) => {
          this.manageRegOps = res.data.dwhbj;
        })
        .catch((err) => {});
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
    changeSelect(val) {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        dwh: this.moreIform.manageReg,
        zydm: this.moreIform.stuInfo,
        pyccm: this.training.choose,
        bjm: this.moreIform.pread,
        mk: this.moreIform.mk,
        tjdate: this.tjdate,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        status: this.moreIform.ztStatus,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryYcl(data)
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
    // 打开导出弹窗
    async handleExport() {
      this.daochuModal = true;
    },
    daochu() {
      var ids = this.multipleSelection.map((item) => item.businesId);
      let data = {
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        dwh: this.moreIform.manageReg,
        zydm: this.moreIform.stuInfo,
        pyccm: this.training.choose,
        bjm: this.moreIform.pread,
        mk: this.moreIform.mk,
        tjdate: this.tjdate,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
        ids: ids,
        status: this.moreIform.ztStatus,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      yclExp(data).then((res) => {
        this.downloadFn(res, "学籍异动已处理列表下载", "xlsx");
        if (this.$store.getters.excelcount > 0) {
          this.$message.success(
            `已成功导出${this.$store.getters.excelcount}条数据`
          );
        }
      });
      this.daochuModal = false;
    },
    handleCancelB() {
      this.daochuModal = false;
    }, // 导出取消
    handleCancel() {
      this.showExport = false;
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
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.manStudentStyle {
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
      background: #fff;
      .searchBtn {
      }
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
    }
  }
  .baseInfo {
    // padding: 20px;
    margin-left: 30px;
    margin-right: 30px;
    // overflow-x: auto;
    .formLeft {
      background: #fff;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 20px;
      }
    }
  }
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
        .title2 {
          font-size: 14px;
          text-align: center;
          line-height: 22px;
          // vertical-align: middle;
        }
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/updata.png") no-repeat;
        }
        .borderBlue {
          border: 1px solid #0d84e0;
          color: #0d84e0;
          background: #ebfafd;
        }
        .btns2 {
          margin-left: 15px;
          padding: 5px 10px;
          cursor: pointer;
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 22px;
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
            background: url("~@/assets/images/icon_1.png") no-repeat;
          }
          .orangeIcon {
            background: url("~@/assets/images/icon_2.png") no-repeat;
          }
          .lightIcon {
            background: url("~@/assets/images/icon_3.png") no-repeat;
          }
        }
      }
      .headerRight {
        display: flex;
        .dropDown {
          margin-right: 20px;
        }
        .borderBlue {
          background: #fff;
          border: 1px solid grey;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fff;
        }
        .borderLight {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
        .borderGreen {
          border: 1px solid grey;
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
          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
          }
          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
          }
          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
          }
          .controlIcon {
            background: url("~@/assets/images/control.png");
          }
        }
      }
    }
    .scopeIncon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    .handleName {
      font-weight: 400;
      font-size: 14px;
      color: #005657;
      line-height: 28px;
    }
    .lct {
      background: url("~@/assets/dangan/lct.png");
    }
    .noflag {
      color: #ccc;
    }
    .handledie {
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
}
</style>
