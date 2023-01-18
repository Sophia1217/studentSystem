<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">校内外荣誉称号</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
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
          <el-table-column prop="rymc" label="荣誉名称" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="jb" label="级别" sortable="custom">
          </el-table-column>
          <el-table-column prop="dj" label="等级" sortable="custom">
          </el-table-column>
          <el-table-column prop="bzdw" label="表彰单位" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="psxnd" label="评审学年度（年）" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="jldx" label="奖励对象" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="grwc" label="个人位次" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="hjsj" label="发证时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="zsbh" label="证书编号" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="fileList"
            label="支撑材料"
            align="center"
            min-width="200"
          >
            <template slot-scope="scope">
              <div v-for="item in scope.row.fileList">
                <div style="display: flex; justify-content: space-between">
                  <a>
                    {{ item.fileName }}
                  </a>
                  <!-- <el-button>预览</el-button> -->
                </div>
              </div>
            </template>
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
            fixed="right"
            label="操作"
            align="center"
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="bianji(scope.row)"
                v-show="AUTHFLAG"
              >
                <i class="scopeIncon Edit"></i>
                <span>编辑</span>
              </el-button>
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程图</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="新增" :visible.sync="addModal" width="80%" :close-on-click-modal="false">
        <el-form ref="formAdd" :model="formAdd" :rules="rules">
          <el-table :data="formAdd.addData">
            <el-table-column label="荣誉名称" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.rymc'"
                  :rules="rules.rymc"
                >
                  <el-input maxlength="200" v-model="scope.row.rymc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="级别" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.jbm'"
                  :rules="rules.jbm"
                >
                  <el-select
                    v-model="scope.row.jbm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in jbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="等级" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.djm'"
                  :rules="rules.djm"
                >
                  <el-select
                    v-model="scope.row.djm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in djOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="表彰单位" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.bzdw'"
                  :rules="rules.bzdw"
                >
                  <el-input maxlength="200" v-model="scope.row.bzdw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="评审学年度（年）" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.psxnd'"
                  :rules="rules.psxnd"
                >
                  <el-select
                    v-model="scope.row.psxnd"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in allXn"
                      :key="index"
                      :label="item.mc"
                      :value="item.mc"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="奖励对象" width="110px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.jldx'"
                  :rules="rules.jldx"
                >
                  <el-select
                    v-model="scope.row.jldx"
                    @change="changeJldxAdd"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in jldxOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.mc"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="个人位次" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.grwc'"
                  :rules="rules.grwc"
                >
                  <el-input-number
                    v-model="scope.row.grwc"
                    controls-position="right"
                    style="width:100px"
                    :min="1"
                    :disabled="showGrwc == 2 ? false : true"
                    @keydown.native="channelInputLimit"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="发证时间" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.hjsj'"
                  :rules="rules.hjsj"
                >
                  <el-date-picker
                    v-model="scope.row.hjsj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="证书编号" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.zsbh'"
                  :rules="rules.zsbh"
                >
                  <el-input maxlength="200" v-model="scope.row.zsbh" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="支撑材料" width="200px">
              <template slot-scope="scope">
                <el-upload
                  action="#"
                  multiple
                  class="el-upload"
                  :auto-upload="false"
                  ref="upload"
                  :file-list="scope.row.files"
                  :on-change="fileChange"
                  accept=".pdf,.jpg"
                  :before-remove="beforeRemove"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="编辑" :visible.sync="editModal" width="80%" :close-on-click-modal="false">
        <el-form ref="formEdit" :model="formEdit" :rules="rules">
          <el-table :data="formEdit.editData">
            <el-table-column label="荣誉名称" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.rymc'"
                  :rules="rules.rymc"
                >
                  <el-input maxlength="200" v-model="scope.row.rymc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="级别" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.jbm'"
                  :rules="rules.jbm"
                >
                  <el-select
                    v-model="scope.row.jbm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in jbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="等级" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.djm'"
                  :rules="rules.djm"
                >
                  <el-select
                    v-model="scope.row.djm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in djOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="表彰单位" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.bzdw'"
                  :rules="rules.bzdw"
                >
                  <el-input maxlength="200" v-model="scope.row.bzdw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="评审学年度（年）" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.psxnd'"
                  :rules="rules.psxnd"
                >
                  <el-select
                    v-model="scope.row.psxnd"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in allXn"
                      :key="index"
                      :label="item.mc"
                      :value="item.mc"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="奖励对象" width="110px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.jldx'"
                  :rules="rules.jldx"
                >
                  <el-select
                    v-model="scope.row.jldx"
                    @change="changeJldxEdit"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in jldxOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.mc"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="个人位次" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.grwc'"
                  :rules="rules.grwc"
                >
                  <el-input-number
                    v-model="scope.row.grwc"
                    controls-position="right"
                    style="width:100px"
                    :min="1"
                    :disabled="showGrwc == 2 ? false : true"
                    @keydown.native="channelInputLimit"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="发证时间" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.hjsj'"
                  :rules="rules.hjsj"
                >
                  <el-date-picker
                    v-model="scope.row.hjsj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="证书编号" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.zsbh'"
                  :rules="rules.zsbh"
                >
                  <el-input maxlength="200" v-model="scope.row.zsbh" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="支撑材料" width="200">
              <template slot-scope="scope">
                <el-upload
                  action="#"
                  multiple
                  class="el-upload"
                  accept=".pdf,.jpg"
                  :auto-upload="false"
                  ref="upload"
                  :file-list="scope.row.fileList"
                  :on-change="fileChange"
                  :before-remove="beforeRemove"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editClick"
            >确 定</el-button
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
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>
<script>
import { edit, del, query, tj, back } from "@/api/stuDangan/detailList/rych";
import lctCom from "../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { delwj } from "@/api/assistantWork/classEvent";

export default {
  components: { lctCom },
  data() {
    return {
      AUTHFLAG: false,
      lctModal: false,
      ztStatus: [],
      addModal: false,
      editModal: false,
      submitModal: false,
      delModal: false,
      formAdd: { addData: [] },
      formEdit: { editData: [] },
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
      },
      delArr: [],
      subArr: [],
      val: [],
      jbOps: [],
      allXn: [], //学年下拉
      djOps: [],
      jldxOps:[
        {dm:'0', mc: '个人'},
        {dm:'1', mc: '团队'},
        {dm:'2', mc: '组织'},
      ],
      showGrwc:2, //1个人位次不展示，2展示个人位次
      fileList: [],
      fileListAdd: [],
      rules: {
        bzdw: [
          {
            required: true,
            message: "表彰单位不能为空",
            trigger: "blur",
          },
        ],
        rymc: [
          { required: true, message: "荣誉名称不能为空", trigger: "blur" },
        ],
        djm: [{ required: true, message: "等级不能为空", trigger: "change" }],
        jbm: [{ required: true, message: "级别不能为空", trigger: "change" }],
        hjsj: [
          {
            required: true,
            message: "发证时间不能为空",
            trigger: "blur",
          },
        ],
        psxnd: [
          { required: true, message: "评审学年度不能为空", trigger: "change" },
        ],
        jldx: [
          { required: true, message: "奖励对象不能为空", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.query();
    this.getCode("dmsplcm"); //状态
    this.getCode("dmjldjm"); //等级
    this.getCode("dmxgjljbm"); //级别
    this.getSchoolYears();
  },
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },

  methods: {
    //获取学年
    getSchoolYears() {
      queryXn()
        .then((res) => {
          this.allXn = res.data;
          this.handleSearch();
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
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm":
            this.ztStatus = res.data; //状态
            break;
          case "dmxgjljbm":
            this.jbOps = res.data; //级别
            break;
          case "dmjldjm":
            this.djOps = res.data; //职位
            break;
        }
      });
    },
    del() {
      del({ ids: this.delArr }).then((res) => {
            this.$message.success("删除成功");
            this.query();
          });
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
      this.subArr = val.map((item) => item.id);
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
    bianji(row) {
      this.formEdit.editData = [];
      this.formEdit.editData.push(row);
      this.editModal = true;
    },
    editCance() {
      this.editModal = false;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let data = this.formEdit.editData[0];
        let formData = new FormData();
        formData.append("bzdw", data.bzdw);
        formData.append("djm", data.djm);
        formData.append("hjsj", data.hjsj);
        formData.append("rymc", data.rymc);
        formData.append("psxnd", data.psxnd);
        formData.append("jldx", data.jldx);
        formData.append("grwc", data.grwc);
        formData.append("jbm", data.jbm);
        formData.append("zsbh", data.zsbh);

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
        var data = this.formAdd.addData[0];
        let formData = new FormData();
        formData.append("bzdw", data.bzdw);
        formData.append("djm", data.djm);
        formData.append("hjsj", data.hjsj);
        formData.append("rymc", data.rymc);
        formData.append("psxnd", data.psxnd);
        formData.append("jldx", data.jldx);
        formData.append("grwc", data.grwc);
        formData.append("jbm", data.jbm);
        formData.append("zsbh", data.zsbh);
        formData.append("xh", this.$store.getters.userId);
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
        xh: this.$route.query.xh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      query(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    xinzeng() {
      this.formAdd.addData = []; // 每次打开弹框先将弹框的table数组置空
      var newLine = {
        bzdw: "",
        djm: "",
        hjsj: "",
        jbm: "",
        rymc: "",
        zsbh: "",
        psxnd: "",
        jldx: "",
        grwc: "",
        files: [],
      };
      this.formAdd.addData.push(newLine);
      this.fileList = [];
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
    },
    showDel() {

        if (this.delArr && this.delArr.length > 0) {
          this.delModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }

    },
    delCancel() {
      this.delModal = false;
    },
    //设置计数器禁输入
    channelInputLimit(e) {
		  e.returnValue = ''
		},
    changeJldxAdd(val){
      if(val && val == "个人"){
        this.showGrwc = 1;
        this.formAdd.addData[0].grwc = "1";
      } else{
        this.showGrwc = 2;
      };
    },
    changeJldxEdit(val){
      if(val && val == "个人"){
        this.showGrwc = 1;
        this.formEdit.editData[0].grwc = "1";
      } else{
        this.showGrwc = 2;
      };
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
.chDis {
  background: url("~@/assets/dangan/chDisable.png");
}
.Edit {
  background: url("~@/assets/images/edit.png");
}
.EditDis {
  background: url("~@/assets/dangan/editDisable.png") no-repeat;
}
.ch {
  background: url("~@/assets/dangan/ch.png");
}
.lct {
  background: url("~@/assets/dangan/lct.png");
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
      }
    }
  }
}
</style>
