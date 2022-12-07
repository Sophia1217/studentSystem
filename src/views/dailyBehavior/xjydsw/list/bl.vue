<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">保留学籍</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
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
          <el-table-column
            prop="xn"
            label="学年"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xqm"
            label="学期"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="ydlb" label="异动类别"> </el-table-column>
          <el-table-column prop="status" label="审批状态" sortable="custom">
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
          <el-table-column prop="ydwh" label="异动文号" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="yddate"
            label="异动时间"
            sortable="custom"
            :show-overflow-tooltip="true"
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
      <el-dialog
        title="新增"
        :visible.sync="addModal"
        width="35%"
        @close="addCance"
        :close-on-click-modal="false"
      >
        <el-form
          ref="formAdd"
          :model="formAdd"
          :rules="rules"
          label-width="150px"
        >
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="是否退宿" prop="sf" :rules="rules.sf">
                <el-select v-model="formAdd.sf" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in dmsfbzm"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option> </el-select
              ></el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="申请类型" prop="sqlx" :rules="rules.sqlx">
                <el-select v-model="formAdd.sqlx" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in sqlxList"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option> </el-select
              ></el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="其他" prop="qt">
                <el-input v-model="formAdd.qt" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item
                label="参加项目"
                prop="jionPro"
                :rules="rules.jionPro"
              >
                <el-input
                  v-model="formAdd.jionPro"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="负责部门" prop="fzbm" :rules="rules.fzbm">
                <el-input
                  v-model="formAdd.fzbm"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item
                label="保留时间"
                prop="startTime"
                :rules="rules.startTime"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd "
                  @change="changeDate(1)"
                  v-model="formAdd.startTime"
                  style="width: 160px"
                ></el-date-picker>
                <span style="margin: 0 10px">至</span>
                <el-date-picker
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd "
                  style="width: 170px"
                  @change="changeDate(2)"
                  v-model="formAdd.endTime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="申请理由" prop="sqly" :rules="rules.sqly">
                <el-input
                  v-model="formAdd.sqly"
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                  placeholder="请输入内容"
                  maxlength="1500"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="申请材料">
                <template slot-scope="scope">
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
                </template>
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
        title="详情"
        :visible.sync="editModal"
        @close="editCance"
        width="35%"
        :close-on-click-modal="false"
      >
        <el-form
          ref="formEdit"
          :model="formEdit"
          :rules="rules"
          label-width="150px"
        >
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="是否退宿" prop="SFTS" :rules="rules.SFTS">
                <div v-if="editFlag == 2">{{ formEdit.SFTS }}</div>
                <el-select
                  v-else="editFlag == 3"
                  v-model="formEdit.sfts"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in dmsfbzm"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option> </el-select
              ></el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="申请类型" prop="oplx" :rules="rules.oplx">
                <div v-if="editFlag == 2">{{ formEdit.oplx }}</div>
                <el-select
                  v-else="editFlag == 3"
                  v-model="formEdit.oplx"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in sqlxList"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option> </el-select
              ></el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="其他" prop="qt">
                <div v-if="editFlag == 2">{{ formEdit.qt }}</div>
                <el-input
                  v-model="formEdit.qt"
                  v-else="editFlag == 3"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item
                label="参加项目"
                prop="blxjCjxm"
                :rules="rules.blxjCjxm"
              >
                <div v-if="editFlag == 2">{{ formEdit.blxjCjxm }}</div>
                <el-input
                  v-else="editFlag == 3"
                  v-model="formEdit.blxjCjxm"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item
                label="负责部门"
                prop="blxjFzbm"
                :rules="rules.blxjFzbm"
              >
                <div v-if="editFlag == 2">{{ formEdit.blxjFzbm }}</div>
                <el-input
                  v-else="editFlag == 3"
                  v-model="formEdit.blxjFzbm"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="editFlag == 2">
            <el-col :span="20">
              <el-form-item label="保留时间">
                <div v-if="editFlag == 2">
                  {{ formEdit.blxjBlstart }}
                  至{{ formEdit.blxjBlend }}
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="editFlag == 3">
            <el-form-item
              label="保留时间"
              prop="blxjBlstart"
              :rules="rules.blxjBlstart"
            >
              <el-col :span="20">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd "
                  @change="changeDate(1)"
                  v-model="formEdit.blxjBlstart"
                  style="width: 160px"
                ></el-date-picker>
                <span style="margin: 0 10px">至</span>
                <el-date-picker
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd "
                  style="width: 170px"
                  @change="changeDate(2)"
                  v-model="formEdit.blxjBlend"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="申请理由" prop="sqmsg" :rules="rules.sqmsg">
                <div v-if="editFlag == 2">{{ formEdit.sqmsg }}</div>
                <el-input
                  v-else="editFlag == 3"
                  v-model="formEdit.sqmsg"
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                  placeholder="请输入内容"
                  maxlength="1500"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="申请材料">
                <el-upload
                  v-if="editFlag == 2"
                  action="#"
                  multiple
                  :file-list="formEdit.fileList"
                  :auto-upload="false"
                  class="el-upload"
                  :disabled="editFlag == 2 ? true : false"
                >
                </el-upload>
                <el-upload
                  v-if="editFlag == 3"
                  action="#"
                  multiple
                  class="el-upload"
                  :auto-upload="false"
                  ref="upload"
                  :file-list="formEdit.fileList"
                  :on-change="fileChangeEdit"
                  accept=".pdf,.jpg"
                  :before-remove="beforeRemoveEdit"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
import { edit, del, query, back, tj } from "@/api/dailyBehavior/xjyd";
import { querywj, delwj } from "@/api/assistantWork/classEvent";
import lctCom from "../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  components: { lctCom },
  data() {
    return {
      //草稿状态和退回状态有编辑功能  01 || 08
      submitModal: false,
      lctModal: false,
      addModal: false,
      editModal: false,
      delModal: false,
      formAdd: {},
      formEdit: {},
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
        sqlx: "blxj",
      },
      editFlag: 2,
      fileList: [],
      delArr: [],
      tjArr: [],
      fileListAdd: [],
      ztStatus: [],
      val: [],
      czlx: [],
      dmjypxjgm: [],
      dmpxdwlbm: [],
      dmpxxzm: [],
      dmsfbzm: [],
      chehuiModal: false,
      sqlxList: [
        { dm: "征兵入伍", mc: "征兵入伍" },
        { dm: "境内交换生项目", mc: "境内交换生项目" },
        { dm: "境外交换生项目", mc: "境外交换生项目" },
      ],
      rulesBlcak: {},
      rules: {
        sf: [
          {
            required: true,
            message: "是否住宿不能为空",
            trigger: "blur",
          },
        ],
        SFTS: [
          {
            required: true,
            message: "是否住宿不能为空",
            trigger: "blur",
          },
        ],
        oplx: [
          {
            required: true,
            message: "申请类型不能为空",
            trigger: "blur",
          },
        ],
        sqlx: [
          {
            required: true,
            message: "申请类型不能为空",
            trigger: "blur",
          },
        ],
        // qt: [
        //   {
        //     required: true,
        //     message: "其他不能为空",
        //     trigger: "blur",
        //   },
        jionPro: [
          {
            required: true,
            message: "参加项目不能为空",
            trigger: "blur",
          },
        ],
        blxjCjxm: [
          {
            required: true,
            message: "参加项目不能为空",
            trigger: "blur",
          },
        ],
        blxjFzbm: [
          {
            required: true,
            message: "负责部门不能为空",
            trigger: "blur",
          },
        ],
        fzbm: [
          {
            required: true,
            message: "负责部门不能为空",
            trigger: "blur",
          },
        ],
        blxjBlstart: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "blur",
          },
        ],
        startTime: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "blur",
          },
        ],
        endTime: [
          {
            required: true,
            message: "结束时间不能为空",
            trigger: "blur",
          },
        ],
        sqmsg: [
          {
            required: true,
            message: "申请理由不能为空",
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
    this.getCode("dmsplcm"); //状态
    this.getCode("dmjypxjgm"); //教育培训结果码_公用
    this.getCode("dmpxdwlbm"); //培训单位类别码_公用
    this.getCode("dmpxxzm"); //培训性质码_公用
    this.getCode("dmsfbzm"); //培训性质码_公用
  },

  methods: {
    tjModal() {
      var falg = 1;
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
      tj(data).then((res) => {
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
          case "dmjypxjgm":
            this.dmjypxjgm = res.data; //教育培训结果码_公用
            break;
          case "dmpxdwlbm":
            this.dmpxdwlbm = res.data; //培训单位类别码_公用
            break;
          case "dmpxxzm":
            this.dmpxxzm = res.data; //培训性质码_公用
            break;
          case "dmsfbzm":
            this.dmsfbzm = res.data; //是否
            break;
        }
      });
    },
    showDetail(row) {
      this.formEdit = row;
      this.formEdit.SFTS = row.sfts == 0 ? "否" : "是";
      this.querywj(row.id);
    },
    querywj(data) {
      //用于文件查询
      querywj({ businesId: data }).then((res) => {
        this.formEdit.fileList = res.data;
        this.formEdit.fileList = this.formEdit.fileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
        this.editModal = true;
      });
    },
    chCancel() {
      this.chehuiModal = false;
    },
    ch() {
      var data = this.val;
      back(data).then((res) => {
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
      del({ ids: this.delArr }).then((res) => {
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
      this.val = val;
      this.delArr = val.map((item) => item.id);
      this.tjArr = val.map((item) => item.id);
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
    beforeRemoveEdit(file, fileList) {
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
    fileChangeEdit(file, fileList) {
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
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formEdit;
        let formData = new FormData();
        formData.append("blxjBlend", data.blxjBlend);
        formData.append("blxjBlstart", data.blxjBlstart);
        formData.append("blxjCjxm", data.blxjCjxm);
        formData.append("blxjFzbm", data.blxjFzbm);
        formData.append("oplx", data.oplx);
        formData.append("sfts", data.sfts);
        formData.append("sqmsg", data.sqmsg); //申请理由
        formData.append("sqlx", this.queryParams.sqlx); //具体类型  保留学籍 退学
        formData.append("id", data.id);
        formData.append("xh", this.$store.getters.userId);
        if (this.fileListAdd.length > 0) {
          this.fileListAdd.map((file) => {
            formData.append("files", file.raw);
          });
        }
        edit(formData).then((res) => {
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
        var data = this.formAdd;
        let formData = new FormData();
        formData.append("blxjBlend", data.endTime);
        formData.append("blxjBlstart", data.startTime);
        formData.append("blxjCjxm", data.jionPro);
        formData.append("blxjFzbm", data.fzbm);
        formData.append("oplx", data.oplx);
        formData.append("sfts", data.sf);
        formData.append("sqmsg", data.sqly); //申请理由
        formData.append("sqlx", this.queryParams.sqlx); //具体类型  保留学籍 退学
        formData.append("xh", this.$store.getters.userId);
        // 测试休学
        // formData.append("sfts", "1");
        // formData.append("sqmsg", "测试"); //申请理由
        // formData.append("sqlx", "xx"); //具体类型  保留学籍 退学
        // formData.append("xh", this.$store.getters.userId);
        // 测试退学
        // formData.append("sqmsg", "测试"); //申请理由
        // formData.append("sqlx", "tx"); //具体类型  保留学籍 退学
        // formData.append("xh", this.$store.getters.userId);
        // 测试复学
        // formData.append("sfts", "1");
        // formData.append("fxBj", "123");
        // formData.append("fxNj", "456");
        // formData.append("fxSfsqrz", "2");
        // formData.append("sqmsg", "测试"); //申请理由
        // formData.append("sqlx", "fx"); //具体类型  保留学籍 退学
        // formData.append("xh", this.$store.getters.userId);
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        edit(formData).then((res) => {
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
        sqlx: this.queryParams.sqlx,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      query(data).then((res) => {
        this.tableDate = res.data;
        this.tableDate.forEach((element) => {
          element.ydlb = "保留学籍";
        });
        this.queryParams.totalCount = res.totalCount;
      });
    },
    xinzeng() {
      this.formAdd = {
        sf: "", //是否退宿
        sqlx: "", //申请类型
        qt: "", //其他
        jionPro: "", //参加项目
        fzbm: "", //负责部门
        startTime: "", //开始时间
        endTime: "", //结束时间
        sqly: "", //申请理由
        files: [], //申请材料
      }; // 每次打开弹框先将弹框的table数组置空
      this.fileList = [];
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
    },
    // 判断 开始时间 结束时间
    changeDate(flag) {
      let startTimeAdd = this.formAdd.startTime; //新增开始时间
      let endTimeAdd = this.formAdd.endTime; //新增开始时间
      let startTimeEdit = this.formAdd.startTime; //编辑开始时间
      let endTimeEdit = this.formAdd.endTime; //编辑开始时间
      if (flag == 1) {
        //新增开始时间
        if (startTimeAdd && endTimeAdd) {
          if (startTimeAdd > endTimeAdd) {
            startTimeAdd = null;
            this.$message.error("开始时间不能大于结束时间！");
          }
        }
      } else if (flag == 2) {
        //新增结束时间
        if (endTimeAdd) {
          if (startTimeAdd > endTimeAdd) {
            endTimeAdd = null;
            this.$message.error("结束时间不能小于开始时间！");
          }
        }
      } else if (flag == 3) {
        if (startTimeEdit && endTimeEdit) {
          if (startTimeEdit > endTimeEdit) {
            startTimeEdit = null;
            this.$message.error("开始时间不能大于结束时间！");
          }
        }
      } else {
        if (endTimeEdit) {
          if (startTimeEdit > endTimeEdit) {
            endTimeEdit = null;
            this.$message.error("结束时间不能小于开始时间！");
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
      .Updataicon {
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        width: 20px;
        height: 20px;
        background: url("../../../../assets/images/updata.png") no-repeat;
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
}
</style>
