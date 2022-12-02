<template>
  <div class="basicInfo">
    <div class="searchWrap">
      <!-- 搜索 -->
      <div class="search">
        <el-input
          v-model="searchVal"
          placeholder="请输入..."
          class="inputSelect"
        >
          <el-select
            slot="prepend"
            v-model="select"
            class="elSelect"
            @change="selectChange"
            placeholder="请选择查询条件"
          >
            <el-option label="请假天数" value="1" />
          </el-select>
          <el-button
            slot="append"
            class="searchButton"
            icon="el-icon-search"
            @click="searchClick"
            >查询</el-button
          >
        </el-input>

        <div class="more" @click="handleMore">
          <span>更多分类</span>
          <i v-if="!isMore" class="moreIcon chevronDown" />
          <i v-else class="moreIcon chevronUp" />
        </div>
      </div>

      <!-- 更多选择 -->
      <div v-if="isMore" class="moreSelect">
        <el-row :gutter="20" class="mt15">
          <el-col :span="6">
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
          <el-col :span="6">
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
        </el-row>
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

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">请假列表</span>
          <i class="Updataicon" />
        </div>
        <div class="headerRight">
          <div class="btns borderRed" @click="showDel">
            <i class="icon lightIcon" /><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="handleback">
            <i class="icon backIcon" /><span class="title">撤回</span>
          </div>
          <div class="btns borderGreen" @click="handleSubmit">
            <i class="icon orangeIcon" /><span class="title">提交</span>
          </div>
          <div class="btns fullGreen" @click="handleNew">
            <i class="icon greenIcon" /><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="basicInfoList"
          style="width: 100%"
          :default-sort="{ prop: 'gh', order: 'ascending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
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
          <el-table-column prop="createDwhMc" label="审核进度">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">详情</span>
              </el-button>
              <el-button type="text" size="small" @click="xujia(scope.row)">
                <i class="scopeIncon handleEdit"></i>
                <span class="handleName">续假</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          class="pagination"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <el-dialog
      title="新增申请"
      :visible.sync="addModal"
      width="60%"
      :close-on-click-modal="false"
      @close="emptyAdd()"
    >
      <el-form
        ref="formAdd"
        :model="formAdd"
        :rules="rules"
        label-width="180px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="请假类型" prop="qjlxm" :rules="rules.qjlxm">
              <el-select v-model="formAdd.qjlxm" placeholder="请选择">
                <el-option
                  v-for="(item, index) in qjlxOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否离汉" prop="sflhm" :rules="rules.sflhm">
              <el-select v-model="formAdd.sflhm" placeholder="请选择">
                <el-option
                  v-for="(item, index) in sflhOps"
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
            <el-form-item label="前往地址" prop="qwdzm" :rules="rules.qwdzm">
              <el-cascader
                v-model="formAdd.qwdzm"
                :options="options"
                @change="handleChangeJg"
                :props="locationProps"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="详细地址" prop="xxdz" :rules="rules.xxdz">
              <el-input
                v-model="formAdd.xxdz"
                maxlength="100"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="请假时间" prop="qjsj" :rules="rules.qjsj">
              <el-date-picker
                type="daterange"
                placeholder="选择日期"
                v-model="formAdd.qjsj"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="dateSelectChange(1)"
                :clearable="false"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="天数" prop="qjts" :rules="rules.qjts">
              <el-input
                v-model="formAdd.qjts"
                maxlength="100"
                size="small"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="紧急联系人" prop="jjlxr" :rules="rules.jjlxr">
              <el-input
                v-model="formAdd.jjlxr"
                maxlength="100"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="lxdh" :rules="rules.lxdh">
              <el-input
                v-model="formAdd.lxdh"
                maxlength="100"
                size="small"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="请假事由" prop="qjsy" :rules="rules.qjsy">
              <el-input
                v-model="formAdd.qjsy"
                type="textarea"
                maxlength="500"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="附件" width="360px">
            <el-upload
              action="#"
              multiple
              class="el-upload"
              :auto-upload="false"
              ref="upload"
              :file-list="formAdd.files"
              :on-change="fileChange"
              accept=".pdf,.jpg"
              :before-remove="beforeRemove"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCance">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addClick"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="申请详情"
      :visible.sync="editModal"
      width="60%"
      :close-on-click-modal="false"
      @close="emptyEdit()"
    >
      <el-form
        ref="formEdit"
        :model="formEdit"
        :rules="rules"
        label-width="180px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="请假类型:" prop="qjlxm" :rules="rules.qjlxm">
              <div v-if="isEdit == 0">
                <span>{{ formEdit.qjlx }}</span>
              </div>
              <div v-else>
                <el-select v-model="formEdit.qjlxm" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in qjlxOps"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否离汉:" prop="sflhm" :rules="rules.sflhm">
              <div v-if="isEdit == 0">
                <span>{{ formEdit.sflh }}</span>
              </div>
              <div v-else>
                <el-select v-model="formEdit.sflhm" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in sflhOps"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="前往地址:" prop="qwdzm" :rules="rules.qwdzm">
              <div v-if="isEdit == 0">
                <span>{{ formEdit.qwdz }}</span>
              </div>
              <div v-else>
                <el-cascader
                  v-model="formEdit.qwdzm"
                  :options="options"
                  @change="handleChangeJg"
                  :props="locationProps"
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="详细地址:" prop="xxdz" :rules="rules.xxdz">
              <div v-if="isEdit == 0">
                <span>{{ formEdit.xxdz }}</span>
              </div>
              <div v-else>
                <el-input
                  v-model="formEdit.xxdz"
                  maxlength="100"
                  placeholder="请输入"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="请假时间:" prop="qjsj" :rules="rules.qjsj">
              <div v-if="isEdit == 0">
                <span>{{ formEdit.kssj }} 至 {{ formEdit.jssj }}</span>
              </div>
              <div v-else>
                <el-date-picker
                  type="daterange"
                  placeholder="选择日期"
                  v-model="formEdit.qjsj"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="dateSelectChange(2)"
                  :clearable="false"
                ></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="天数:" prop="qjts" :rules="rules.qjts">
              <div v-if="isEdit == 0">
                <span>{{ formEdit.qjts }}</span>
              </div>
              <div v-else>
                <el-input
                  v-model="formEdit.qjts"
                  maxlength="100"
                  size="small"
                  readonly
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="紧急联系人:" prop="jjlxr" :rules="rules.jjlxr">
              <div v-if="isEdit == 0">
                <span>{{ formEdit.jjlxr }}</span>
              </div>
              <div v-else>
                <el-input
                  v-model="formEdit.jjlxr"
                  maxlength="100"
                  size="small"
                  placeholder="请输入"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:" prop="lxdh" :rules="rules.lxdh">
              <div v-if="isEdit == 0">
                <span>{{ formEdit.lxdh }}</span>
              </div>
              <div v-else>
                <el-input
                  v-model="formEdit.lxdh"
                  maxlength="100"
                  size="small"
                  placeholder="请输入"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="请假事由:" prop="qjsy" :rules="rules.qjsy">
              <div v-if="isEdit == 0">
                <span>{{ formEdit.qjsy }}</span>
              </div>
              <div v-else>
                <el-input
                  v-model="formEdit.qjsy"
                  type="textarea"
                  maxlength="500"
                  placeholder="请输入"
                ></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="附件:" width="360px">
            <div v-if="isEdit == 0">
              <!-- <span v-if="formEdit.fileList.length == 0">无</span> -->
              <div v-for="item in formEdit.fileList">
                <div style="display: flex; justify-content: space-between">
                  <a>
                    {{ item.fileName }}
                  </a>
                  <!-- <el-button>预览</el-button> -->
                </div>
              </div>
            </div>
            <div v-else>
              <el-upload
                action="#"
                multiple
                class="el-upload"
                :auto-upload="false"
                ref="upload"
                :file-list="formEdit.fileList"
                :on-change="fileChange"
                accept=".pdf,.jpg"
                :before-remove="beforeRemove"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="
          (formEdit.qjstatus == '01' || formEdit.qjstatus == '08') &&
          isEdit == 0
        "
      >
        <el-button type="primary" class="confirm" @click="EditStatus"
          >编 辑</el-button
        >
      </span>
      <span slot="footer" class="dialog-footer" v-if="isEdit == 1">
        <el-button @click="editCance">取 消</el-button>
        <el-button type="primary" class="confirm" @click="editClick"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导出确认对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="submitModal" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
    <!-- 批量删除对话框 -->
    <el-dialog title="删除" :visible.sync="delModal" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="提交" :visible.sync="submitModal" width="30%">
      <template>
        <div>
          <span>确认提交？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="submitConfirm"
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
import {
  edit,
  del,
  query,
  tj,
  queryDetail,
} from "@/api/dailyBehavior/docReplace";
import { getLocationjl } from "@/api/student/index";
import {
  getQJList,
  importRcqxj,
  cxById,
  deleteRcqxjById,
  selectDetail,
  tjById,
} from "@/api/dailyBehavior/vocationStu";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import lctCom from "../../../../components/lct";
import CheckboxCom from "../../../../components/checkboxCom";
export default {
  name: "BasicInfo",
  components: { lctCom, CheckboxCom },
  props: [],
  data() {
    return {
      title: "",
      // // 总条数
      total: 0,
      // 批量删除确定框弹出
      showDelete: false,
      // // 查询参数
      searchVal: "",
      select: "",
      qwdzm: "",
      isMore: false,
      isEdit: 0, //0详情1编辑
      lctModal: false,
      options: [],
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
      sflhOps: [
        // { dm: "1", mc: "是" },
        // { dm: "0", mc: "否" },
      ],
      locationProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      status: [],
      zjlx: [],
      basicInfoList: [],
      multipleSelection: [],
      submitModal: false,
      delModal: false,
      queryParams: {
        qjts: 0, //请假天数
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
        xh: this.$store.getters.userId,
      },
      list: [],
      qjlxOps: [],
      ztStatus: [],
      xjStatus: [],
      datePicker: [],
      datePickerSH: [],
      xnList: [],
      xqmList: [],
      zjlxOps: [],
      exportParams: {},
      addModal: false,
      editModal: false,
      fileList: [],
      fileListAdd: [],
      formAdd: { qwdzm: [] },
      formEdit: { qwdzm: [] },
      rules: {
        zjlx: [
          {
            required: true,
            message: "补办证件类型不能为空",
            trigger: "change",
          },
        ],
        sqsj: [
          {
            required: true,
            message: "申请补办时间不能为空",
            trigger: "change",
          },
        ],
        sqbbly: [
          {
            required: true,
            message: "申请补办理由不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList(this.queryParams);

    //this.getAllZd();
    this.getCode("dmsplcm"); //状态
    this.getCode("dmxszjlxm"); //证件类型
    this.getCode("dmxjlcm"); //销假状态
    this.getCode("dmqjlxm"); //请假类型
    this.getCode("dmxqm");
    this.getCode("dmsfbzm");
    this.getLocationjl();
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
    checkFormEdit() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formEdit.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    emptyEdit() {
      this.$nextTick(() => {
        this.$refs.formEdit.resetFields();
      });
    },
    emptyAdd() {
      this.$nextTick(() => {
        this.$refs.formAdd.resetFields();
      });
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    //流程
    lctClick(row) {
      if (!!row.qjprocessid) {
        this.$refs.child.inner(row.qjprocessid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmxqm":
            this.xqOps = res.data;
            break;
          case "dmsplcm":
            this.ztStatus = res.data;
            this.$set(this.shzt, "checkBox", res.data);
            break;
          case "dmxjlcm":
            this.xjStatus = res.data;
            this.$set(this.xjzt, "checkBox", res.data);
            break;
          case "dmqjlxm":
            this.qjlxOps = res.data;
            this.$set(this.qjlx, "checkBox", res.data);
            break;
          case "dmsfbzm":
            this.sflhOps = res.data;
            break;
        }
      });
    },
    selectChange() {
      this.searchVal = "";
    },
    //获取数据列表
    getList() {
      this.queryParams.qjts = this.select == 1 ? this.searchVal : 0;

      getQJList(this.queryParams)
        .then((response) => {
          this.basicInfoList = response.data; // 根据状态码接收数据
          this.total = response.totalCount; //总条数
        })
        .catch((err) => {});
    },
    dateSelectChange(index) {
      let qjkssj,
        qjjssj = "";
      let oDate1,
        oDate2 = "";
      let aDate = [];
      var iDays = 0;
      if (index == 1) {
        var data = this.formAdd;
      } else var data = this.formEdit;

      if (data.qjsj && data.qjsj.length > 0) {
        qjkssj = data.qjsj[0];
        qjjssj = data.qjsj[1];
        aDate = qjkssj.split("-");
        oDate1 = new Date(aDate[0], aDate[1], aDate[2]);
        aDate = qjjssj.split("-");
        oDate2 = new Date(aDate[0], aDate[1], aDate[2]);
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
        console.log(iDays);
        if (index == 1) {
          this.$set(this.formAdd, "qjts", iDays);
        } else this.$set(this.formEdit, "qjts", iDays);
      }
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },

    // 列表多选
    handleSelectionChange(val) {
      this.subArr = val.map((item) => item.id);
      this.list = [...val]; // 存储已被勾选的数据
      this.multipleSelection = val;
    },
    //提交
    handleSubmit() {
      var falg = 1;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].qjstatus !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.subArr && this.subArr.length > 0) {
          this.submitModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("不是草稿状态数据，不可以提交");
      }
    },
    submitConfirm() {
      var data = this.list;
      tjById(data).then((res) => {
        //console.log(111);
        this.$message.success("提交成功");
        this.getList();
        this.submitModal = false;
      });
    },
    subCancel() {
      this.submitModal = false;
    },
    //批量删除
    delCancel() {
      this.delModal = false;
    },
    showDel() {
      var falg = 1;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].qjstatus !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.subArr && this.subArr.length > 0) {
          this.delModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非草稿状态数据，不可以删除");
      }
    },
    del() {
      deleteRcqxjById({ ids: this.subArr }).then((res) => {
        this.$message.success("删除成功");
        this.getList(this.queryParams);
      });

      this.delModal = false;
    },
    //点击详情
    hadleDetail(row) {
      this.editModal = true;
      selectDetail({ businesId: row.id }).then((res) => {
        this.formEdit = res.data[0];
        this.$set(this.formEdit, "qjsj", [res.data[0].kssj, res.data[0].jssj]);
      });
    },

    //新增
    handleNew() {
      this.formAdd = {};
      this.fileList = [];
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let qjkssj,
          qjjssj = "";

        var data = this.formAdd;
        if (data.qjsj && data.qjsj.length > 0) {
          qjkssj = data.qjsj[0];
          qjjssj = data.qjsj[1];
        }
        let formData = new FormData();
        formData.append("jjlxr", data.jjlxr);
        formData.append("jssj", qjjssj);
        formData.append("kssj", qjkssj);
        formData.append("lxdh", data.lxdh);
        //formData.append("id", data.id);
        formData.append("qjlxm", data.qjlxm);
        formData.append("qjsy", data.qjsy);
        formData.append("qjts", data.qjts);
        formData.append("qwdzm", data.qwdzm);
        formData.append("xxdz", data.xxdz);
        formData.append("sflhm", data.sflhm);
        formData.append("xh", this.$store.getters.userId);
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        importRcqxj(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.getList(this.queryParams);
          } else {
            this.$message.error("新增失败");
          }
        });
        this.addModal = false;
        this.$refs.formAdd.resetFields();
      }
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let qjkssj,
          qjjssj = "";
        if (this.formEdit.qjsj && this.formEdit.qjsj.length > 0) {
          qjkssj = this.formEdit.qjsj[0];
          qjjssj = this.formEdit.qjsj[1];
        }
        let formData = new FormData();
        formData.append("jjlxr", this.formEdit.jjlxr);
        formData.append("jssj", qjjssj);
        formData.append("kssj", qjkssj);
        formData.append("lxdh", this.formEdit.lxdh);
        formData.append("id", this.formEdit.id);
        formData.append("qjlxm", this.formEdit.qjlxm);
        formData.append("qjsy", this.formEdit.qjsy);
        formData.append("qjts", this.formEdit.qjts);
        formData.append("qwdzm", this.formEdit.qwdzm);
        formData.append("xxdz", this.formEdit.xxdz);
        formData.append("sflhm", this.formEdit.sflhm);
        formData.append("xh", this.$store.getters.userId);
        if (this.fileListAdd.length > 0) {
          this.fileListAdd.map((file) => {
            formData.append("files", file.raw);
          });
        }
        importRcqxj(formData).then((res) => {
          //edit(params).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.getList(this.queryParams);
          } else {
            this.$message.error("编辑失败");
          }
        });
        this.editModal = false;
        this.isEdit = 0;
        this.$refs.formEdit.resetFields();
      }
    },
    editCance() {
      this.editModal = false;
      this.isEdit = 0;
      this.$refs.formEdit.resetFields();
    },
    EditStatus() {
      this.isEdit = 1;
    },
    // 搜索查询按钮
    searchClick() {
      this.queryParams.pageNum = 1;
      //日期
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
      this.queryParams.xnList = this.xnList;
      this.queryParams.qjlxmList = this.qjlx.choose;
      this.queryParams.xqmList = this.xqmList;
      this.getList(this.queryParams);
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.searchClick();
    },
    handleback() {
      var falg = 1;
      let idList = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        idList.push(this.multipleSelection[i].id);
        if (this.multipleSelection[i].qjstatus !== "02") falg = 2;
      }
      //console.log(idList);
      if (falg == 1) {
        if (this.subArr && this.subArr.length > 0) {
          cxById({ idList: idList }).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("撤销成功");
              this.getList();
            } else {
              this.$message.error("撤销失败");
            }
          });
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非待审核状态数据，不可以撤回");
      }
    },
    xujia() {},
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
    //地区级联
    getLocationjl() {
      getLocationjl().then((res) => {
        this.options = res.data;
        // this.value = ["150000", "150600"]; //meiqubie
      });
    },
    handleChangeJg(value) {
      if (value.length == 1) {
        this.formAdd.qwdzm = value[0];
        this.formEdit.qwdzm = value[0];
      } else if (value.length == 2) {
        this.formAdd.qwdzm = value[1];
        this.formEdit.qwdzm = value[1];
      } else {
        this.formAdd.qwdzm = value[2];
        this.formEdit.qwdzm = value[2];
      }
      // console.log("this.updateJg", this.updateJg);
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
  },
};
</script>

<style lang="scss" scoped>
.lct {
  background: url("~@/assets/dangan/lct.png");
}
.basicInfo {
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
          border: 1px solid grey;
          background: #ebfafd;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fdf6f3;
        }
        .borderGreen {
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
          .backIcon {
            margin-top: 10px;
            background: url("~@/assets/images/chehui.png") no-repeat;
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
    .handledie {
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
  .searchButton {
    background: #005657;
    color: white;
  }
}
.closeButton {
  background: #005657;
  color: white;
}

.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center;
}
.greenDot {
  width: 8px;
  height: 8px;
  color: #23ad6f;
}
.redDot {
  width: 8px;
  height: 8px;
  color: #ed5234;
}
</style>
