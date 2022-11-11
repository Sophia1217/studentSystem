<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">校内外培训经历</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
          <div class="btns borderGreen" @click="tjModal">
            <i class="icon greenIcon"></i><span class="title1">提交</span>
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
          <el-table-column prop="pxxmmc" label="培训项目名称" sortable="custom">
          </el-table-column>
          <el-table-column prop="dwh" label="组织单位" sortable="custom">
          </el-table-column>
          <el-table-column prop="pxkssj" label="培训开始时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="pxjssj" label="培训结束时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="zxs" label="总学时" sortable="custom">
          </el-table-column>
          <el-table-column prop="xz" label="性质" sortable="custom">
          </el-table-column>
          <el-table-column prop="pxdwlb" label="培训单位类别" sortable="custom">
          </el-table-column>
          <el-table-column prop="jg" label="结果" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="fileList"
            label="结业证书"
            sortable="custom"
            align="center"
            width="300"
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
                v-show="scope.row.status === '01' || scope.row.status === '08'"
              >
                <i class="scopeIncon Edit"></i>
                <span>编辑</span>
              </el-button>
              <el-button
                type="text"
                size="small"
                disabled
                @click="bianji(scope.row)"
                v-show="scope.row.status !== '01' && scope.row.status !== '08'"
              >
                <i class="scopeIncon EditDis"></i>
                <span>编辑</span>
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="chehui(scope.row)"
                v-show="scope.row.status === '02'"
              >
                <i class="scopeIncon ch"></i>
                <span>撤回</span>
              </el-button>
              <el-button
                type="text"
                size="small"
                disabled
                @click="chehui(scope.row)"
                v-show="scope.row.status !== '02'"
              >
                <i class="scopeIncon chDis"></i>
                <span style="color: #bfbfbf">撤回</span>
              </el-button>
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程图</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="新增"
        :visible.sync="addModal"
        width="80%"
        :close-on-click-modal="false"
      >
        <el-form ref="formAdd" :model="formAdd" :rules="rules">
          <el-table :data="formAdd.addData">
            <el-table-column label="培训项目名称" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.pxxmmc'"
                  :rules="rules.pxxmmc"
                >
                  <el-input v-model="scope.row.pxxmmc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="组织单位" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.dwh'"
                  :rules="rules.dwh"
                >
                  <el-input v-model="scope.row.dwh" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="培训开始时间" width="240px">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.pxkssj'"
                  :rules="rules.pxkssj"
                >
                  <el-date-picker
                    v-model="scope.row.pxkssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    @change="changeDate(1)"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="培训结束时间" width="240px">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.pxjssj'"
                  :rules="rules.pxkssj"
                >
                  <el-date-picker
                    v-model="scope.row.pxjssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(2)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="总学时" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.zxs'"
                  :rules="rules.zxs"
                >
                  <el-input v-model="scope.row.zxs" type="number" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="性质" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.xz'"
                  :rules="rules.xz"
                >
                  <el-input v-model="scope.row.xz" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="培训单位类别" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.pxdwlb'"
                  :rules="rules.pxdwlb"
                >
                  <el-input v-model="scope.row.pxdwlb" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="结果" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.jg'"
                  :rules="rules.jg"
                >
                  <el-input v-model="scope.row.jg" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="结业证书" width="360px">
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
      <el-dialog
        title="编辑"
        :visible.sync="editModal"
        width="80%"
        :close-on-click-modal="false"
      >
        <el-form ref="formEdit" :model="formEdit" :rules="rules">
          <el-table :data="formEdit.editData">
            <el-table-column label="培训项目名称" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.pxxmmc'"
                  :rules="rules.pxxmmc"
                >
                  <el-input v-model="scope.row.pxxmmc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="组织单位" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.dwh'"
                  :rules="rules.dwh"
                >
                  <el-input v-model="scope.row.dwh" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="培训开始时间" width="240px">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.pxkssj'"
                  :rules="rules.pxkssj"
                >
                  <el-date-picker
                    v-model="scope.row.pxkssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(3)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="培训结束时间" width="240px">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.pxjssj'"
                  :rules="rules.pxkssj"
                >
                  <el-date-picker
                    v-model="scope.row.pxjssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(4)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="总学时" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.zxs'"
                  :rules="rules.zxs"
                >
                  <el-input v-model="scope.row.zxs" type="number" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="性质" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.xz'"
                  :rules="rules.xz"
                >
                  <el-input v-model="scope.row.xz" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="培训单位类别" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.pxdwlb'"
                  :rules="rules.pxdwlb"
                >
                  <el-input v-model="scope.row.pxdwlb" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="结果" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.jg'"
                  :rules="rules.jg"
                >
                  <el-input v-model="scope.row.jg" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="结业证书" width="450">
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
  edit,
  del,
  query,
  back,
  lct,
  tj,
  lctTable,
} from "@/api/stuDangan/detailList/xiaoneiwai";
import lctCom from "../../../components/lct";
import { delwj } from "@/api/assistantWork/classEvent";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  components: { lctCom },
  data() {
    return {
      // pickerOptionsStart: {
      //   disabledDate: (time) => {
      //     let endDateVal = this.overDate;
      //     if (endDateVal) {
      //       return time.getTime() < new Date(endDateVal).getTime();
      //     }
      //   },
      // },
      // pickerOptionsEnd: {
      //   disabledDate: (time) => {
      //     let beginDateVal = this.createDate;
      //     if (beginDateVal) {
      //       return time.getTime() < new Date(beginDateVal).getTime();
      //     }
      //   },
      // },
      overDate: "",
      createDate: "",
      submitModal: false,
      lctModal: false,
      addModal: false,
      editModal: false,
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
      fileList: [],
      delArr: [],
      tjArr: [],
      fileListAdd: [],
      ztStatus: [],
      val: [],
      czlx: [],
      rules: {
        pxxmmc: [
          {
            required: true,
            message: "培训项目名称不能为空",
            trigger: "blur",
          },
        ],
        dwh: [
          { required: true, message: "组织单位不能为空", trigger: "change" },
        ],
        zxs: [{ required: true, message: "总学时不能为空", trigger: "blur" }],
        xz: [{ required: true, message: "性质不能为空", trigger: "blur" }],

        pxkssj: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "blur",
          },
        ],
        pxjssj: [
          {
            required: true,
            message: "结束时间不能为空",

            trigger: "blur",
          },
        ],
        pxdwlb: [{ required: true, message: "类别不能为空", trigger: "blur" }],
        jg: [{ required: true, message: "结果不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.query();
    this.getCode("dmsplcm"); //状态
  },

  methods: {
    // 判断 开始时间 结束时间
    // 时间开始选择器
    startTimeStatus(row) {
      this.createDate = row.pxkssj;
      this.overDate = row.pxjssj;
    },
    //获取焦点后，开始/完成时间为当前行的开始/完成时间
    focusStartTime(row) {
      this.createDate = row.pxkssj;
      this.overDate = row.pxjssj;
    },
    // 时间结束选择器
    endTimeStatus(row) {
      this.createDate = row.pxkssj;
      this.overDate = row.pxjssj;
    },
    //获取焦点后，开始/完成时间为当前行的开始/完成时间
    focusEndTime(row) {
      this.createDate = row.pxkssj;
      this.overDate = row.pxjssj;
    },
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

    chehui(row) {
      back({ ...row }).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("撤销成功");
          this.query();
        } else {
          this.$message.error("撤销失败");
        }
      });
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

    del() {
      del({ ids: this.delArr }).then((res) => {
        this.$message.success("删除成功");
        this.query();
        this.delModal = false;
      });
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
    handlePreview() {
      console.log("yulan");
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
      row.fileList = row.fileList.map((ele) => {
        return {
          name: ele.fileName,
          ...ele,
        };
      });
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
        var data = this.formEdit.editData[0];
        let formData = new FormData();
        formData.append("pxxmmc", data.pxxmmc);
        formData.append("dwh", data.dwh);
        formData.append("pxkssj", data.pxkssj);
        formData.append("pxjssj", data.pxjssj);
        formData.append("zxs", data.zxs);
        formData.append("xz", data.xz);
        formData.append("pxdwlb", data.pxdwlb);
        formData.append("jg", data.jg);
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
        formData.append("pxxmmc", data.pxxmmc);
        formData.append("dwh", data.dwh);
        formData.append("pxkssj", data.pxkssj);
        formData.append("pxjssj", data.pxjssj);
        formData.append("zxs", data.zxs);
        formData.append("xz", data.xz);
        formData.append("pxdwlb", data.pxdwlb);
        formData.append("jg", data.jg);
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
        xh: this.$store.getters.userId,
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
        pxxmmc: "",
        dwh: "",
        pxkssj: "",
        pxjssj: "",
        zxs: "",
        xz: "",
        pxdwlb: "",
        jg: "",
        files: [],
      };
      this.formAdd.addData.push(newLine);
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
    },
    // 判断 开始时间 结束时间
    changeDate(flag) {
      let addParams = this.formAdd.addData[0];
      let editParams = this.formEdit.editData[0];
      if (flag == 1) {
        //新增开始时间
        if (addParams.pxjssj) {
          if (addParams.pxkssj > addParams.pxjssj) {
            addParams.pxkssj = null;
            this.$message.error("开始时间不能大于结束时间！");
          }
        }
      } else if (flag == 2) {
        //新增结束时间
        if (addParams.pxkssj) {
          if (addParams.pxkssj > addParams.pxjssj) {
            addParams.pxjssj = null;
            this.$message.error("结束时间不能小于开始时间！");
          }
        }
      } else if (flag == 3) {
        if (editParams.pxjssj) {
          if (editParams.pxkssj > editParams.pxjssj) {
            editParams.pxkssj = null;
            this.$message.error("开始时间不能大于结束时间！");
          }
        }
      } else {
        if (editParams.pxkssj) {
          if (editParams.pxkssj > editParams.pxjssj) {
            editParams.pxjssj = null;
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
