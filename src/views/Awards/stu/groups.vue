<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">集体奖项申请列表</span>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderBlue" @click="chModal">
            <i class="icon chIcon"></i><span class="title2">撤回</span>
          </div>
          <div class="btns borderBlue" @click="tjModal">
            <i class="icon tjIcon"></i><span class="title2">提交</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableInfo"
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
          <el-table-column
            prop="jtmc"
            label="集体名称"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column
          ><el-table-column
            prop="ssdwdmmc"
            label="培养单位"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="pjjxmc"
            label="评奖奖项"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="pjzq" label="评奖周期" sortable="custom">
          </el-table-column>
          <el-table-column prop="sqsj" label="申请时间" sortable="custom">
          </el-table-column>

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

          <el-table-column
            prop="jg"
            label="审核进度"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流转记录</span>
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
                <div class="content">{{ basicInfo.xh }}</div>
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
                <div class="content">{{ basicInfo.xbmc }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">培养层次</div>
                <div class="content">{{ basicInfo.pyccmc }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">培养单位</div>
                <div class="content">{{ basicInfo.dwhmc }}</div>
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
                <div class="content">{{ basicInfo.bjmmc }}</div>
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
      <el-dialog
        title="详情"
        :visible.sync="editModal"
        @close="editCance"
        width="50%"
        :close-on-click-modal="false"
      >
        <div class="headline">基本信息</div>
        <div class="tableStyle">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">{{ basicInfo.xh }}</div>
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
                <div class="content">{{ basicInfo.xbmc }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">培养层次</div>
                <div class="content">{{ basicInfo.pyccmc }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">培养单位</div>
                <div class="content">{{ basicInfo.dwhmc }}</div>
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
                <div class="content">{{ basicInfo.bjmmc }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="headline">申请信息</div>
        <div class="tableStyle">
          <el-form
            ref="formEdit"
            :model="formEdit"
            :rules="rules"
            label-width="150px"
          >
            <el-form-item label="评奖奖项" prop="pjjx" :rules="rules.pjjx">
              <div v-if="editFlag == 2">{{ formEdit.pjjxmc }}</div>
              <div v-else>
                <el-select v-model="formEdit.pjjx" @change="changeJXEdit">
                  <el-option
                    v-for="(item, index) in pjjxOps"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="评奖等级" prop="pjdj" :rules="rules.pjdj">
              <div v-if="editFlag == 2">{{ formEdit.pjdj }}</div>
              <div v-else>
                <el-select v-model="formEdit.pjdj">
                  <el-option
                    v-for="(item, index) in pjdjOps"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
            <!-- <el-form-item label="评奖周期" prop="pjzq">
              {{ formEdit.pjzqXn + formEdit.pjzqXq }}
            </el-form-item> -->
            <el-form-item label="集体名称" prop="jtmc">
              {{ formEdit.jtmc }}
            </el-form-item>
            <el-form-item label="其他" prop="qt" :rules="rules.qt">
              <div v-if="editFlag == 2">{{ formEdit.qt }}</div>
              <div v-else>
                <el-input v-model="formEdit.qt" maxlength="100" />
              </div>
            </el-form-item>
            <el-form-item label="申请理由" prop="sqly">
              <div v-if="editFlag == 2">{{ formEdit.sqly }}</div>
              <div v-else>
                <el-input
                  type="textarea"
                  v-model="formEdit.sqly"
                  maxlength="500"
                />
              </div>
            </el-form-item>
            <el-form-item label="附件信息" prop="files">
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
                :disabled="editFlag == 2"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button v-if="editFlag == 2" @click="editCance">关 闭</el-button>
          <el-button
            type="primary"
            v-if="
              editFlag == 2 &&
              (formEdit.status == '08' || formEdit.status == '01')
            "
            class="confirm"
            @click="bianji"
            >编 辑</el-button
          >
          <el-button
            v-if="editFlag == 3"
            type="primary"
            class="confirm"
            @click="bianji1"
            >取 消</el-button
          >
          <el-button
            v-if="editFlag == 3"
            type="primary"
            class="confirm"
            @click="editClick"
            >保 存</el-button
          >
        </span>
      </el-dialog>
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
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>
<script>
import {
  getbascic,
  getXnxq,
  edit,
  queryList,
  tj,
  back,
  del,
  xnxjExp,
} from "@/api/dailyBehavior/xnxjStu";
import {
  Addpjpysq,
  tjpjpyById,
  getAllpjjx,
  getAllpjjxxx,
  querypjpyList,
  deletePjpysqXs,
  cxById,
} from "@/api/awards/stu";
import lctCom from "../../components/lct";
import topTitle from "../../components/topTitle";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  components: { lctCom, topTitle },
  data() {
    return {
      xnxjModal: false,
      formAdd: { pjzqXn: "", pjzqXq: "" },
      //草稿状态和退回状态有编辑功能  01 || 08
      submitModal: false,
      lctModal: false,
      addModal: false,
      editModal: false,
      delModal: false,
      formEdit: {},
      tableInfo: [],
      tableDetails: {},
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
      },
      editFlag: 2,
      fileList: [],
      delArr: [],
      tjArr: [],
      fileListAdd: [],
      ztStatus: [],
      val: [],
      routeTitle: "",
      chehuiModal: false,
      basicInfo: {},
      xnxqList: [],
      rulesBlcak: {},
      pjdjOps: [],
      pjjxOps: [],
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
    this.query();
    this.getJX();
    this.getCode("dmsplcm"); //状态
    this.getBASIC(); //获取基本信息
    this.routeTitle = this.$route.meta.title;
  },

  methods: {
    BackHomepage() {
      this.$router.push({
        path: "/studentHomePage",
      });
    },
    showDetail(row) {
      this.formEdit = row;
      row.fileList = row.fileList.map((ele) => {
        return {
          name: ele.fileName,
          ...ele,
        };
      });
      this.editModal = true;
      this.fileListAdd = [];
      this.changeJX(this.formEdit.pjjx);
    },
    getJX() {
      getAllpjjx({ jxlb: "2" }).then((res) => {
        this.pjjxOps = res.data;
      });
    },
    tjModal() {
      var falg = 1;
      //判断是否是草稿数据
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      // const newArr = this.val.map((item) => item.xn);
      // const arrSet = new Set(newArr);
      // arrSet.size === newArr.length;
      // if (arrSet.size < this.val.length) {
      //   this.$message.error("请不要选择重复学年");
      // } else {
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
      tjpjpyById(data).then((res) => {
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
    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
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
        }
      });
    },
    chCancel() {
      this.chehuiModal = false;
    },
    ch() {
      cxById({ ids: this.delArr }).then((res) => {
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
      deletePjpysqXs({ ids: this.delArr }).then((res) => {
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
    bianji() {
      this.editFlag = 3;
    },
    bianji1() {
      this.editFlag = 2;
    },
    editCance() {
      this.editModal = false;
      this.editFlag = 2;
      this.$refs.formEdit.resetFields();
      this.pjdjOps = [];
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let formData = new FormData();

        formData.append("jxlb", "2");
        formData.append("pjdj", this.formEdit.pjdj);
        formData.append("pjjx", this.formEdit.pjjx);
        formData.append("sqly", this.formEdit.sqly);
        //formData.append("jtmc", this.formEdit.jtmc);
        formData.append("qt", this.formEdit.qt);
        formData.append(
          "pjzqXn",
          this.formAdd.pjzqXn ? this.formAdd.pjzqXn : null
        );
        formData.append(
          "pjzqXq",
          this.formAdd.pjzqXq ? this.formAdd.pjzqXq : null
        );
        formData.append("xh", this.$store.getters.userId);
        formData.append("id", this.formEdit.id);
        if (this.fileListAdd.length > 0) {
          this.fileListAdd.map((file) => {
            formData.append("files", file.raw);
          });
        }
        Addpjpysq(formData).then((res) => {
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
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let formData = new FormData();

        formData.append("jxlb", "2");
        formData.append("pjdj", this.formAdd.pjdj);
        formData.append("pjjx", this.formAdd.pjjx);
        formData.append("sqly", this.formAdd.sqly);
        formData.append("pjzqXn", this.formAdd.pjzqXn);
        formData.append("pjzqXq", this.formAdd.pjzqXq);
        //formData.append("jtmc", this.formAdd.jtmc);
        formData.append("qt", this.formAdd.qt ? this.formAdd.qt : "");
        formData.append("xh", this.$store.getters.userId);
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        Addpjpysq(formData).then((res) => {
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
    query() {
      var data = {
        xh: this.$store.getters.userId,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        jxlb: "2",
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      querypjpyList(data).then((res) => {
        this.tableInfo = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    getBASIC() {
      getbascic({ xh: this.$store.getters.userId }).then((res) => {
        this.basicInfo = res.data;
      });
    },
    xinzeng() {
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
      getAllpjjxxx({ dm: val, jxlb: "2" }).then((res) => {
        this.pjdjOps = res.data.pjdjList;
        this.formAdd.pjzqXn = res.data.pjzqXn;
        this.formAdd.pjzqXq = res.data.pjzqXq;
        this.formAdd.pjzqXqmc = res.data.pjzqXqmc;
        this.formAdd.jtmc = res.data.jtmc;
      });
      this.formAdd.pjdj ? (this.formAdd.pjdj = "") : "";
    },
    changeJXEdit(val) {
      getAllpjjxxx({ dm: val }).then((res) => {
        this.pjdjOps = res.data.pjdjList;
        this.formEdit.jtmc = res.data.jtmc;

        this.formEdit.pjzqXn = res.data.pjzqXn;
        this.formEdit.pjzqXq = res.data.pjzqXq;
        this.formEdit.pjzqXqmc = res.data.pjzqXqmc;
        // }
      });
      this.formEdit.pjdj ? (this.formEdit.pjdj = "") : "";
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
  },
};
</script>
<style lang="scss" scoped>
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
  padding-left: 40px;
  padding-top: 14px;
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
