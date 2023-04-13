<template>
  <div>
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
          <el-button slot="append" icon="el-icon-search" @click="query"
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
              v-model="moreIform.ssdwdm"
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
            <span>班<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.bjdm"
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
            <span>建议处分等级：</span>
            <el-select
              v-model="moreIform.jycfdjmList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in cfdjOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>审核状态：</span>
            <el-select
              v-model="moreIform.statusList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in ztStatus"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">学生列表</span>
          <div style="margin-left: 10px">
            <el-cascader
              v-model="dqXnxq"
              :options="options"
              @change="handleChangeXnxq"
              :props="XnxqProps"
            ></el-cascader>
          </div>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <!-- <div class="btns borderLight" @click="copy" v-show="AUTHFLAG">
            <i class="icon copyIcon"></i><span class="title2">复制</span>
          </div> -->
          <div class="btns borderLight" @click="chModal">
            <i class="icon chIcon"></i><span class="title2">撤回</span>
          </div>
          <div class="btns borderLight" @click="tjModal">
            <i class="icon tjIcon"></i><span class="title2">提交</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableDate"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" sortable="custom" />
          <el-table-column prop="xm" label="姓名" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="ssdwdmmc"
            label="培养单位"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="bjdmmc" label="班级" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="wjssmsFdy"
            label="违纪事实描述"
            min-width="130px"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="jycfdjmmc"
            label="建议处分等级"
            min-width="130px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="sqsj"
            label="申请时间"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="statusChinese"
            label="审核状态"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="jg"
            label="审核进度"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程图</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="showDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span style="margin-left: 5px">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <pagination
        v-show="queryParams.totalCount > 0"
        :total="queryParams.totalCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="query"
      />
    </div>
    <el-dialog title="删除" :visible.sync="delModal" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="撤回" :visible.sync="chehuiModal" width="20%">
      <span>确认撤回？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="ch()"
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
        <el-button type="primary" class="confirm" @click="tj">确 定</el-button>
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
              <div class="content">{{ formAdd.xsxm }}</div>
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
      <div class="headline">学院意见</div>
      <div class="tableStyle">
        <el-form
          ref="formAdd"
          :model="formAdd"
          :rules="rules"
          label-width="130px"
        >
          <el-form-item
            label="违纪事实描述"
            prop="wjssmsFdy"
            :rules="rules.common"
          >
            <el-input
              type="textarea"
              v-model="formAdd.wjssmsFdy"
              maxlength="500"
            />
          </el-form-item>
          <el-form-item
            label="处分依据条款"
            prop="cfyjtkFdy"
            :rules="rules.common"
          >
            <el-input
              type="textarea"
              v-model="formAdd.cfyjtkFdy"
              maxlength="500"
            />
          </el-form-item>
          <el-form-item
            label="建议处分等级"
            prop="jycfdjm"
            :rules="rules.common"
          >
            <el-select v-model="formAdd.jycfdjm">
              <el-option
                v-for="(item, index) in cfdjOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位建议" prop="dwjyFdy" :rules="rules.common">
            <el-input
              type="textarea"
              v-model="formAdd.dwjyFdy"
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
    <el-dialog
      title="详情"
      :visible.sync="editModal"
      width="50%"
      @close="editCance"
      :close-on-click-modal="false"
    >
      <div class="headline">基本信息</div>
      <div class="tableStyle">
        <el-row :gutter="20">
          <el-col :span="12" class="rowStyle">
            <div class="wrap">
              <div class="title">学号</div>
              <div class="content">{{ formEdit.xh }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="rowStyle">
            <div class="wrap">
              <div class="title">姓名</div>
              <div class="content">{{ basicInfo.xm }}</div>
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
      <!-- <div class="headline">学院意见</div> -->
      <div class="tableStyle">
        <el-form
          ref="formEdit"
          :model="formEdit"
          :rules="rules"
          label-width="130px"
        >
          <el-form-item
            label="违纪事实描述"
            prop="wjssmsFdy"
            :rules="rules.common"
          >
            <div v-show="isEdit == 0">{{ formEdit.wjssmsFdy }}</div>
            <el-input
              type="textarea"
              v-model="formEdit.wjssmsFdy"
              v-show="isEdit == 1"
              maxlength="500"
            />
          </el-form-item>
          <el-form-item
            label="处分依据条款"
            prop="cfyjtkFdy"
            :rules="rules.common"
          >
            <div v-show="isEdit == 0">{{ formEdit.cfyjtkFdy }}</div>
            <el-input
              type="textarea"
              v-model="formEdit.cfyjtkFdy"
              v-show="isEdit == 1"
              maxlength="500"
            />
          </el-form-item>
          <el-form-item
            label="建议处分等级"
            prop="jycfdjm"
            :rules="rules.common"
          >
            <div v-show="isEdit == 0">{{ formEdit.jycfdjmmc }}</div>
            <el-select
              v-model="formEdit.jycfdjm"
              v-show="isEdit == 1"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in cfdjOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位建议" prop="dwjyFdy" :rules="rules.common">
            <div v-show="isEdit == 0">{{ formEdit.dwjyFdy }}</div>
            <el-input
              type="textarea"
              v-model="formEdit.dwjyFdy"
              v-show="isEdit == 1"
              maxlength="500"
            />
          </el-form-item>
          <el-form-item label="附件信息" prop="fj">
            <div v-for="item in formEdit.fileList" v-if="isEdit == 0">
              <div style="display: flex; justify-content: space-between">
                <a>
                  {{ item.fileName }}
                </a>
                <!-- <el-button>预览</el-button> -->
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
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
        v-show="(status == '01' || status == '08') && isEdit == 0"
      >
        <el-button type="primary" class="confirm" @click="EditStatus"
          >编 辑</el-button
        >
      </span>
      <span slot="footer" class="dialog-footer" v-show="isEdit == 1">
        <el-button @click="editCance">取 消</el-button>
        <el-button type="primary" class="confirm" @click="editClick"
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
import lctCom from "../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryXnXq } from "@/api/dailyBehavior/vocationTea";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { getZY, getBJ } from "@/api/student/index";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
import { queryStuList } from "@/api/familyDifficulties/difficultTea";
import {
  insertWjcfsq,
  queryWjcfFdyList,
  wjcfDetail,
  deleteWjcf,
  tjById,
  cxById,
} from "@/api/stuPunish/nichufen";
export default {
  components: { lctCom },
  data() {
    return {
      AUTHFLAG: false,
      len: 0,
      submitModal: false,
      lctModal: false,
      delModal: false,
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        orderZd: "",
        orderPx: "",
        xn: "",
        xqm: "",
      },
      delArr: [],
      tjArr: [],
      ztStatus: [],
      val: [],
      chehuiModal: false,
      basicInfo: {},
      dqXnxq: [],
      XnxqProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        ssdwdm: [], // 学院下拉框
        bjdm: [],
        jycfdjmList: [],
        statusList: [],
      },
      allDwh: [],
      bjOps: [],
      addModal: false,
      editModal: false,
      formAdd: { xsxh: "", xsxm: "" },
      formEdit: { xh: "", fileList: [] },
      isEdit: 0,
      cfdjOps: [],
      fileList: [],
      fileListAdd: [],
      status: "",
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getCode("dmsplcm"); //状态
    this.getCode("dmcfdjm");
    this.getXnxq();
    this.getAllCollege();
  },

  methods: {
    //获取学年学期
    getXnxq() {
      queryXnXq().then((res) => {
        this.options = res.data;
        for (let item of res.data) {
          for (let num of item.dataCodeCascadingList)
            if (num.dataCodeCascadingList !== null) {
              this.dqXnxq = [item.dm, num.dm];
            }
        }
        this.queryParams.xn = this.dqXnxq[0];
        this.queryParams.xqm = this.dqXnxq[1];
        this.query();
      });
    },
    handleChangeXnxq() {
      this.queryParams.xn = " ";
      this.queryParams.xqm = "";
      if (this.dqXnxq[0]) {
        this.queryParams.xn = this.dqXnxq[0];
      }
      if (this.dqXnxq[1]) {
        this.queryParams.xqm = this.dqXnxq[1];
      }
      this.query();
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
        this.moreIform.bjdm = []; // 班级
      }
      this.getBJ(val);
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
    showDetail(row) {
      this.formEdit.xh = row.xh;
      this.status = row.status;
      this.editModal = true;
      this.fileListAdd = [];
      queryKnssqxsjbxx({ xh: row.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      wjcfDetail({ id: row.id }).then((res) => {
        this.formEdit = res.data;
      });
    },
    tjModal() {
      var falg = 1;
      //判断是否是草稿数据
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }

      if (falg == 1) {
        if (this.tjArr && this.tjArr.length > 0) {
          this.submitModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("不是草稿状态数据，不可以提交");
      }
    },
    tj() {
      var data = this.val;
      tjById(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("提交成功");
          this.query();
          this.submitModal = false;
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    subCancel() {
      this.submitModal = false;
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
    changeSelect() {
      this.searchVal = "";
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
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
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
          case "dmcfdjm": //处分等级
            this.cfdjOps = res.data;
            break;
        }
      });
    },
    chCancel() {
      this.chehuiModal = false;
    },
    ch() {
      cxById({ids: this.delArr}).then((res) => {
        this.$message.success("撤回成功");
        this.query();
        this.chehuiModal = false;
      });
    },
    chModal() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "02") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          this.chehuiModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非待审核状态数据，不可以撤回");
      }
    },
    showDel() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          this.delModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非草稿状态数据，不可以删除");
      }
    },
    del() {
      deleteWjcf({ ids: this.delArr }).then((res) => {
        this.query();
        this.delModal = false;
        this.$message.success("删除成功");
      });
    },
    delCancel() {
      this.delModal = false;
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.val = val;
      this.delArr = val.map((item) => item.id);
      this.tjArr = val.map((item) => item.id);
    },

    query() {
      var data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        ssdwdm: this.moreIform.ssdwdm,
        bjdm: this.moreIform.bjdm,
        jycfdjmList: this.moreIform.jycfdjmList,
        statusList: this.moreIform.statusList,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
        xn: this.queryParams.xn,
        xqm: this.queryParams.xqm,
      };
      queryWjcfFdyList(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },

    xinzeng() {
      this.formAdd = {};
      this.fileList = [];
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
    },
    addClick() {
      if (!this.checkFormAdd() || this.formAdd.xsxh == undefined) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let formData = new FormData();
        formData.append("xh", this.formAdd.xsxh);
        formData.append("wjssmsFdy", this.formAdd.wjssmsFdy);
        formData.append("cfyjtkFdy", this.formAdd.cfyjtkFdy);
        formData.append("jycfdjm", this.formAdd.jycfdjm);
        formData.append("dwjyFdy", this.formAdd.dwjyFdy);
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        insertWjcfsq(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.query();
          } else {
            this.$message.error("新增失败");
          }
        });
        this.addModal = false;
      }
    },
    EditStatus() {
      this.isEdit = 1;
    },
    editCance() {
      this.editModal = false;
      this.isEdit = 0;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let formData = new FormData();
        formData.append("xh", this.formEdit.xh);
        formData.append("wjssmsFdy", this.formEdit.wjssmsFdy);
        formData.append("cfyjtkFdy", this.formEdit.cfyjtkFdy);
        formData.append("jycfdjm", this.formEdit.jycfdjm);
        formData.append("dwjyFdy", this.formEdit.dwjyFdy);
        formData.append("id", this.formEdit.id);
        if (this.fileListAdd.length > 0) {
          this.fileListAdd.map((file) => {
            formData.append("files", file.raw);
          });
        }
        insertWjcfsq(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.query();
          } else {
            this.$message.error("编辑失败");
          }
        });
        this.editModal = false;
      }
    },
    beforeRemove(file, fileList) {
      console.log("file", file);
      console.log("fileList", fileList);
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
      if (Number(file.size / 1024 / 1024) > 1) {
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
      this.$set(this.formAdd, "sqdj", "");
      this.$set(this.formAdd, "tjdj", "");
      queryKnssqxsjbxx({ xh: this.formAdd.xsxh }).then((res) => {
        this.basicInfo = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.spcHs {
  flex: 0 0 100px;
  background: #ccc;
  padding-left: 20px;
  padding-top: 7px;
}
.jbxx {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
}
.yiny {
  border: 1px solid grey;
  background: rgba(0, 0, 0, 0.0001);
  box-shadow: inset 0px -1px 0px #e0e0e0;
  height: 50px;
  border-left: none;
  border-collapse: collapse;
}
.hs {
  flex: 0 0 100px;
  background: #ccc;
  padding-left: 20px;
  padding-top: 14px;
}
.bs {
  padding-left: 20px;
  display: inline-block;
  position: relative;
  top: 80%;
  transform: translateY(-50%);
}

.scopeIncon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.handledie {
  background: url("~@/assets/images/details.png");
}
.chDis {
  background: url("~@/assets/dangan/chDisable.png");
}
.Edit {
  background: url("~@/assets/images/edit.png");
}
.EditDis {
  background: url("~@/assets/dangan/editDisable.png") no-repeat;
}

.lct {
  background: url("~@/assets/dangan/lct.png");
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.el-button--text {
  border-color: transparent;
  color: #005657;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
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
      flex-direction: row;
      .title {
        font-weight: 600;
        font-size: 20px;
        color: #1f1f1f;
        line-height: 28px;
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
        .title2 {
          font-size: 14px;
          text-align: center;
          line-height: 32px;
          color: #000;
          // vertical-align: middle;
        }

        // dialog标题下加一条线

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
        .chIcon {
          margin-top: 10px;
          background: url("~@/assets/dangan/chIcon.png") no-repeat;
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
        .tjIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/out.png") no-repeat;
        }
        .copyIcon {
          margin-top: 10px;
          background: url("~@/assets/images/copy.png") no-repeat;
        }
      }
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
</style>
