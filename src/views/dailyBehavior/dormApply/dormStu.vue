<template>
  <div class="basicInfo">

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">住宿申请列表</span>
          <i class="Updataicon" />
        </div>
        <div class="headerRight">
          <div class="btns borderRed" @click="handleDelete">
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
          <el-table-column prop="zslx" label="住宿类型" sortable="custom" />
          <el-table-column prop="zsksrq" label="住宿开始时间" sortable="custom" />
          <el-table-column prop="zsjsrq" label="住宿结束时间" sortable="custom" />
          <el-table-column prop="status" label="审核状态" sortable="custom">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.status"
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
      width="40%"
      :close-on-click-modal="false"
      @close="emptyAdd()"
    >
      <el-form
        ref="formAdd"
        :model="formAdd"
        :rules="rules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="申请住宿类型" prop="zslxm" :rules="rules.zslxm">
              <el-select
                v-model="formAdd.zslxm"
                placeholder="请选择住宿类型"
                @change="changeZslx(formAdd.zslxm)"
                collapse-tags
              >
                <el-option
                  v-for="(item, index) in zslxOps"
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
            <el-form-item
              label="原住宿地址"
              prop="yzsdzm"
              :rules="jzflag ==1 ? rules.yzsdzm :[{ required: false}]"
            >
              <div v-if="jzflag ==1">
                <el-cascader
                  v-model="formAdd.yzsdzm"
                  :options="options"
                  @change="handleChangeJgY"
                  :props="locationProps"
                ></el-cascader>
                <el-input v-model="formAdd.yzsxxdz" 
                  maxlength="255"
                  placeholder="请输入详细地址"/>
              </div>
              <div v-if="jzflag ==2">
                <div>{{formEdit.sqld + "  "+ formEdit.sqfj}}</div> 
                <!-- <div>{{formEdit.sqfj}}</div> -->
                <!-- <el-select
                  v-model="formAdd.sqldid"  
                  placeholder="非集中原寝室楼栋"
                  @change="changeLD(formAdd.sqldid)"
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
                  v-model="formAdd.sqfjid"  
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
        <el-row :gutter="20" v-if="jzflag ==2">
          <el-col :span="12">
            <el-form-item
              label="是否退宿"
              :rules="jzflag ==2 ? rules.sfts :[{ required: false}]"
              prop="sfts"

            >
              <el-select
                v-model="formAdd.sfts"
                placeholder="非集中是否退宿"
                collapse-tags
              >
                <el-option
                  v-for="(item, index) in sftsOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="jzflag ==1">
          <el-col :span="20">
            <el-form-item
              label="申请住宿地点"
              prop="sqldid"
            >
                <el-select
                  v-model="formAdd.sqldid"  
                  placeholder="集中寝室楼栋"
                  @change="changeLD(formAdd.sqldid)"
                  clearable
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
                  v-model="formAdd.sqfjid"  
                  placeholder="集中寝室房间"
                  collapse-tags
                  clearable
                >
                  <el-option
                    v-for="(item, index) in fjOps"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="jzflag ==2">
          <el-col :span="19">
            <el-form-item
              label="非集中住宿地址"
              :rules="jzflag ==2 ? rules.xzsdzm :[{ required: false}]"
              prop="xzsdzm"
            >
                <el-cascader
                  v-model="formAdd.xzsdzm"
                  :options="options"
                  @change="handleChangeJgX"
                  :props="locationProps"
                ></el-cascader>
                <el-input v-model="formAdd.xzsxxdz" maxlength="255" placeholder="请输入详细地址"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="15">
            <el-form-item label="住宿时间" prop="datePickerAdd"  :rules="rules.datePickerAdd">
              <el-date-picker
                type="daterange"
                placeholder="选择日期"
                v-model="formAdd.datePickerAdd"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="申请理由" prop="sqly">
              <el-input
                v-model="formAdd.sqly"
                type="textarea"
                maxlength="2000"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="申请材料" width="360px">
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
          </el-col>
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
      width="40%"
      :close-on-click-modal="false"
      @close="emptyEdit()"
    >
      <el-form
        ref="formEdit"
        :model="formEdit"
        :rules="rules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="申请住宿类型" prop="zslxm" :rules="rules.zslxm">
              <div v-show="isEdit == 0">{{formEdit.zslx}}</div>
              <el-select
                v-model="formEdit.zslxm"
                v-show="isEdit == 1"
                placeholder="请选择住宿类型"
                @change="changeZslx(formEdit.zslxm)"
                collapse-tags
                disabled
              >
                <el-option
                  v-for="(item, index) in zslxOps"
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
            <el-form-item
              label="原住宿地址"
              prop="yzsdzm"
              :rules="jzflag ==1 ? rules.yzsdzm :[{ required: false}]"
            >
              <div v-show="jzflag ==1">
                <div v-show="isEdit == 0">{{formEdit.yzsdz + "  "+ formEdit.yzsxxdz}}</div>
                <!-- <div v-show="isEdit == 0">{{formEdit.yzsxxdz}}</div> -->
                <el-cascader
                  v-model="formEdit.yzsdzm"
                  v-show="isEdit == 1"
                  :options="options"
                  @change="handleChangeJgY"
                  :props="locationProps"
                ></el-cascader>
                <el-input 
                  v-model="formEdit.yzsxxdz" 
                  v-show="isEdit == 1"
                  maxlength="255" 
                  placeholder="请输入详细地址"/>
              </div>
              <div v-if="jzflag ==2">
                <div>{{formEdit.sqld + "  "+ formEdit.sqfj}}</div> 
                <!-- <div>{{formEdit.sqfj}}</div> -->
                <!-- <el-select
                  v-model="formEdit.sqldid"  
                  v-show="isEdit == 1"
                  placeholder="非集中原寝室楼栋"
                  @change="changeLD(formEdit.sqldid)"
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
                  v-model="formEdit.sqfjid"  
                  v-show="isEdit == 1"
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
        <el-row :gutter="20" v-if="jzflag ==2">
          <el-col :span="12">
            <el-form-item
              label="是否退宿"
              prop="sfts"
              :rules="jzflag ==2 ? rules.sfts :[{ required: false}]"
            >
            
              <!-- <div v-show="isEdit == 0">{{formEdit.sfts}}</div> -->
              <el-select
                v-model="formEdit.sfts"
                :disabled="isEdit == 0"
                placeholder="非集中是否退宿"
                collapse-tags
              >
                <el-option
                  v-for="(item, index) in sftsOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-show="jzflag ==1">
          <el-col :span="19">
            <el-form-item
              label="申请住宿地点"
            >
              <div v-show="isEdit == 0">{{formEdit.sqld + "  "+ formEdit.sqfj}}</div>
              <!-- <div v-show="isEdit == 0">{{formEdit.sqfj}}</div> -->
              <div v-show="isEdit == 1">
                <el-select
                  v-model="formEdit.sqldid"  
                  placeholder="集中寝室楼栋"
                  @change="changeLD(formEdit.sqldid)"
                  clearable
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
                  v-model="formEdit.sqfjid"  
                  placeholder="集中寝室房间"
                  collapse-tags
                  clearable
                >
                  <el-option
                    v-for="(item, index) in fjOps"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-show="jzflag ==2">
          <el-col :span="19">
            <el-form-item
              label="非集中住宿地址"
              :rules="jzflag ==2 ? rules.xzsdzm : [{ required: false}]"
              prop="xzsdzm"
            >
            
              <div v-show="isEdit == 0">{{formEdit.xzsdz + "  "+ formEdit.xzsxxdz}}</div>
              <!-- <div v-show="isEdit == 0">{{formEdit.xzsxxdz}}</div> -->
              <div v-show="isEdit == 1">
                <el-cascader
                  v-model="formEdit.xzsdzm"
                  :options="options"
                  @change="handleChangeJgX"
                  :props="locationProps"
                ></el-cascader>
                <el-input v-model="formEdit.xzsxxdz" maxlength="255" placeholder="请输入详细地址"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="住宿时间" prop="datePickerEdit">
              <div v-show="isEdit == 0">{{formEdit.zsksrq + " 至 "+ formEdit.zsjsrq}}</div>
              <div v-show="isEdit == 1">
              <el-date-picker
                type="daterange"
                placeholder="选择日期"
                v-model="formEdit.datePickerEdit"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="申请理由" prop="sqly">
              <el-input
                v-model="formEdit.sqly"
                type="textarea"
                maxlength="2000"
                :disabled="isEdit == 0"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="申请材料:" width="360px">
            <div v-if="isEdit == 0">
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
        v-if="(formEdit.status == '01' || formEdit.status == '08') && isEdit == 0"
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
    <!-- 确认提交对话框 -->
    <el-dialog title="提交" :visible.sync="submitModal" width="30%">
      <span>确认提交？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="submitConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 批量删除对话框 -->
    <el-dialog title="删除" :visible.sync="showDelete" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="rmRecord"
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
  query,
  del,
  queryDetail,
  tj,
  edit,
  cxById,
  queryFj,
  queryLd,
  queryLdAndFj,
} from "@/api/dailyBehavior/dormStu";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { getLocationjl } from "@/api/student/index";
import { delwj } from "@/api/assistantWork/classEvent";
import lctCom from "../../components/lct";
export default {
  name: "BasicInfo",
  components: { lctCom },
  props: [],
  data() {
    return {
      delArr: [],
      subArr: [],
      title: "",
      // // 总条数
      total: 0,
      // 批量删除确定框弹出
      showDelete: false,
      // 详情框显示
      open: false,

      // // 查询参数

      searchVal: "",
      select: "",
      isMore: false,
      lctModal: false,
      ztStatus: [], //状态
      status: [],
      basicInfoList: [],
      multipleSelection: [],
      submitModal: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        xh: this.$store.getters.userId,
      },
      datePicker: [],
      addModal: false,
      editModal: false,
      formAdd: {
        sqld:"",
        sqfj:"",
        yzsdzm: "",
        xzsdzm: "",
        datePickerAdd: [],
      },
      formEdit: {
        yzsdzm: "",
        xzsdzm: "",
        sqld:"",
        sqfj:"",
        datePickerEdit: [],
      },
      isEdit: 0, //0详情1编辑
      jzflag: 1,//1集中2非集中
      zslxOps: [
        {dm: "1", mc: "校内集中住宿"},
        {dm: "2", mc: "非集中住宿"},
      ],
      fjOps:[],
      ldOps:[],
      sftsOps:[],
      //地区级联
      locationProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      updateJg: "",//若进来自动获取地区则用来更新，简单下拉框不需要
      fileList: [],
      fileListAdd: [],
      rules: {
        sfts: [
          { required: true, message: "是否退宿不能为空", trigger: "change" },
        ],
        zslxm: [
          { required: true, message: "住宿类型不能为空", trigger: "change" },
        ],
        yzsdzm: [
          { required: true, message: "原住宿地址不能为空", trigger: "change" },
        ],
        xzsdzm:[
          { required: true, message: "新住宿地址不能为空", trigger: "change" },
        ],
        datePickerEdit:[
          { required: true, message: "住宿时间不能为空", trigger: "change" },
        ],
        datePickerAdd:[
          { required: true, message: "住宿时间不能为空", trigger: "change" },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList(this.queryParams);
    this.getCode("dmsplcm"); //状态
    this.getCode("dmsfbzm"); // 是否
    this.getLocationjl();
  },

  methods: {
    getAllld(){
      queryLd()
        .then((res)=>{
          if (res.errcode == "00") {
            this.ldOps = res.data;
          }
        })
        .catch((err) => {});
    },
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
    //弹窗关闭置空
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
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm":
            this.ztStatus = res.data; //状态
            break;
          case "dmsfbzm":
            this.sftsOps = res.data; //是否
            break;
        }
      });
    },
    selectChange() {
      this.searchVal = "";
    },
    //获取数据列表
    getList() {
      query(this.queryParams)
        .then((response) => {
          this.basicInfoList = response.data; // 根据状态码接收数据
          this.total = response.totalCount; //总条数
        })
        .catch((err) => {});
    },
    //批量删除对话框关闭
    delCancel() {
      this.showDelete = false;
    },

    // 详情对话框关闭按钮
    cancel() {
      this.open = false;
    },

    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },

    // 列表多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.subArr = val.map((item) => item.id);
      this.delArr = val.map((item) => item.id);
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
    //提交
    handleSubmit() {
      var falg = 1;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].status !== "01") falg = 2;
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
      var data = this.multipleSelection;
      tj(data).then((res) => {
        console.log(111);
        this.$message.success("提交成功");
        this.getList();
        this.submitModal = false;
      });
    },
    subCancel() {
      this.submitModal = false;
    },
    //批量删除
    rmRecord() {
      this.showDelete = false;
      del({ ids: this.delArr })
        .then((res) => {
          this.$message.success("删除成功");
          this.getList();
        })
        .catch((err) => {});
    },
    /**批量删除按钮*/
    handleDelete() {
      var falg = 1;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          this.showDelete = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非草稿状态数据，不可以删除");
      }
    },
    //新增
    handleNew() {
      this.formAdd={};
      this.formAdd.files = [];
      this.fileList = [];
      this.addModal = true;
      this.getAllld();
      // 楼栋房间自动回显
      queryLdAndFj( this.$store.getters.userId ).then((res) =>{
        this.formAdd.sqld= res.data !==null ? res.data.ld : null;
        this.formAdd.sqfj= res.data !==null ? res.data.fj : null;
      });
      console.log("this.formAdd.sqld",this.formAdd.sqld);
      
    },
    addCance() {
      this.addModal = false;
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let rqs,
          rqe = "";
        if (this.formAdd.datePickerAdd && this.formAdd.datePickerAdd.length > 0) {
          rqs = this.formAdd.datePickerAdd[0];
          rqe = this.formAdd.datePickerAdd[1];
        }
        let formData = new FormData();
        formData.append("zslxm", this.formAdd.zslxm);
        formData.append("zsjsrq", rqe);
        formData.append("zsksrq", rqs);
        formData.append("sfts", this.formAdd.sfts ||"");
        formData.append("sqfjid", this.formAdd.sqfjid ||"");
        formData.append("sqldid", this.formAdd.sqldid ||"");
        formData.append("sqly", this.formAdd.sqly);
        formData.append("xzsdzm", this.formAdd.xzsdzm ||"");
        formData.append("xzsxxdz", this.formAdd.xzsxxdz ||"");
        formData.append("yzsdzm", this.formAdd.yzsdzm ||"");
        formData.append("yzsxxdz", this.formAdd.yzsxxdz);
        formData.append("xh", this.$store.getters.userId);
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        edit(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.addModal = false;
            this.getList();
          } else {
            this.$message.error("新增失败");
          }
        });
        
      }
    },
    //点击详情
    hadleDetail(row) {
      this.editModal = true;
      console.log("row",row);
      this.fileListAdd = [];
      queryDetail({ businesId: row.id }).then((res) => {
        this.formEdit = res.data;
        this.jzflag = res.data.zslxm;
        this.$set(this.formEdit, "datePickerEdit",[res.data.zsksrq, res.data.zsjsrq]);
      });
    },
    EditStatus() {
      this.isEdit = 1;
      this.getAllld();
    },
    //详情编辑
    editCance() {
      this.editModal = false;
      this.isEdit = 0;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let rqs,
          rqe = "";
        if (this.formEdit.datePickerEdit && this.formEdit.datePickerEdit.length > 0) {
          rqs = this.formEdit.datePickerEdit[0];
          rqe = this.formEdit.datePickerEdit[1];
        }
        var formData = new FormData();
        formData.append("zslxm", this.formEdit.zslxm);
        formData.append("zsjsrq", rqe);
        formData.append("zsksrq", rqs);
        formData.append("sfts", this.formEdit.sfts ||"");
        formData.append("sqfjid", this.formEdit.sqfjid ||"");
        formData.append("sqldid", this.formEdit.sqldid ||"");
        formData.append("sqly", this.formEdit.sqly);
        formData.append("xzsdzm", this.formEdit.xzsdzm ||"");
        formData.append("xzsxxdz", this.formEdit.xzsxxdz ||"");
        formData.append("yzsdzm", this.formEdit.yzsdzm ||"");
        formData.append("yzsxxdz", this.formEdit.yzsxxdz);
        formData.append("xh", this.formEdit.xh);
        formData.append("id", this.formEdit.id);
        if (this.fileListAdd.length > 0) {
          this.fileListAdd.map((file) => {
            formData.append("files", file.raw);
          });
        }
        edit(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.editModal = false;
            this.getList();
          } else {
            this.$message.error("编辑失败");
          }
        });
        this.isEdit = "0";
      }
    },
    // 搜索查询按钮
    searchClick() {
      this.queryParams.pageNum = 1;
      //日期
      let rqs,
        rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      this.queryParams.sqsjStart = rqs;
      this.queryParams.sqsjEnd = rqe;
      this.queryParams.statusList = this.status;
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
      var data = this.multipleSelection;
      // let idList = [];
      
      // for (var i = 0; i < this.multipleSelection.length; i++) {
      //   idList.push(this.multipleSelection[i].id);
      //   if (this.multipleSelection[i].status !== "02") falg = 2;
      // }
      if (falg == 1) {
        if (this.subArr && this.subArr.length > 0) {
          cxById(data).then((res) => {
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
    changeZslx(flag){
      if( flag && flag == 1){
        this.jzflag = 1;
      } else{ 
        this.jzflag = 2;
      }
    },
    changeLD(flag){
      queryFj({ dm: flag }).then((res) => {
        if (res.errcode == "00") {
          this.fjOps = res.data;
        } else {
          this.$message.error("获取房间号失败");
        }
      });
    },
    getLocationjl() {
      getLocationjl().then((res) => {
        this.options = res.data;
      });
    },
    handleChangeJgY(value) {
      if (value && value.length == 1) {
        console.log("value.length",value.length);
        //若是简单下拉框，则绑定v-model就可以
        this.formAdd.yzsdzm= this.formAdd.yzsdzm ? this.formAdd.yzsdzm = value[0]: "";
        this.formEdit.yzsdzm= this.formEdit.yzsdzm ? this.formedit.yzsdzm = value[0]: "";
        console.log(this.formAdd.yzsdzm);
      } else if (value && value.length == 2) {
        this.formAdd.yzsdzm= this.formAdd.yzsdzm ? this.formAdd.yzsdzm = value[1]: "";
        this.formEdit.yzsdzm= this.formEdit.yzsdzm ? this.formedit.yzsdzm = value[1]: "";
        console.log(this.formAdd.yzsdzm);
      } else {
        this.formAdd.yzsdzm= this.formAdd.yzsdzm ? this.formAdd.yzsdzm = value[2]: "";
        this.formEdit.yzsdzm= this.formEdit.yzsdzm ? this.formedit.yzsdzm = value[2]: "";
        console.log(this.formAdd.yzsdzm);
      }
    },
    handleChangeJgX(value) {
      if (value && value.length == 1) {
        this.formAdd.xzsdzm= this.formAdd.xzsdzm ? this.formAdd.xzsdzm = value[0]: "";
        this.formEdit.xzsdzm= this.formEdit.xzsdzm ? this.formedit.xzsdzm = value[0]: "";
      } else if (value && value.length == 2) {
        this.formAdd.xzsdzm= this.formAdd.xzsdzm ? this.formAdd.xzsdzm = value[1]: "";
        this.formEdit.xzsdzm= this.formEdit.xzsdzm ? this.formedit.xzsdzm = value[1]: "";
      } else {
        this.formAdd.xzsdzm= this.formAdd.xzsdzm ? this.formAdd.xzsdzm = value[2]: "";
        this.formEdit.xzsdzm= this.formEdit.xzsdzm ? this.formedit.xzsdzm = value[2]: "";
      }
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
  // .searchWrap {
  //   background: #fff;
  //   padding: 20px;
  //   .search {
  //     display: flex;
  //     flex-direction: row;
  //     align-items: center;
  //     background: #fff;
  //     .elSelect {
  //       width: 150px;
  //     }
  //     .inputSelect {
  //       width: 50%;
  //     }
  //     .more {
  //       flex: 0 0 100px;
  //       margin-left: 20px;
  //       display: flex;
  //       flex-direction: row;
  //       align-items: center;
  //       color: #005657;
  //       cursor: pointer;
  //       .moreIcon {
  //         display: block;
  //         width: 20px;
  //         height: 20px;
  //       }
  //       .chevronDown {
  //         background: url("~@/assets/images/chevronDown.png") no-repeat;
  //       }
  //       .chevronUp {
  //         background: url("~@/assets/images/chevronUp.png") no-repeat;
  //       }
  //     }
  //   }
  //   .moreSelect {
  //     margin-top: 20px;
  //     padding: 20px;
  //     background: #fafafa;
  //   }
  // }
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
