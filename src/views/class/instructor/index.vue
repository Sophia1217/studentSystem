<template>
  <div class="instructor">
    <!-- 辅导员管理首页搜索 -->
    <div class="tea-search">
      <el-form
        :model="queryParams"
        ref="queryParams"
        size="small"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
        class="table-header"
      >
        <el-form-item label="工作单位" prop="ssdwdmList" class="header-item">
          <el-select
            v-model="queryParams.ssdwdmList"
            placeholder="请选择"
            clearable
            multiple
          >
            <el-option
              v-for="(item, index) in collegeOptions"
              :key="index"
              :label="item.mc"
              :value="item.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培养层次" prop="pyccList" class="header-item">
          <el-select
            v-model="queryParams.pyccList"
            placeholder="请选择"
            clearable
            multiple
          >
            <el-option
              v-for="(item, index) in levelOptions"
              :key="index"
              :label="item.mc"
              :value="item.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级" prop="ssnjList" class="header-item">
          <el-select
            v-model="queryParams.ssnjList"
            placeholder="请选择"
            clearable
            multiple
          >
            <el-option
              v-for="(item, index) in gradeOptions"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="bjmc" class="header-item">
          <el-input
            v-model="queryParams.bjmc"
            placeholder="请输入班级名称"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item class="header-item">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-search"
            class="search"
            @click="handleQuery"
            >查询</el-button
          >
          <el-button
            size="mini"
            @click="resetQuery('queryParams')"
            class="reset"
          >
            <span class="iconfont reset_icon">&#xe614;</span>
            重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 辅导员管理首页列表 -->
    <div class="tea-table">
      <div class="table-content">
        <div class="title" icon="el-icon-refresh" v-if="fpfdy">
          <span class="title-itemopn">辅导员管理列表</span>
          <span class="iconfont">&#xe631;</span>
          <el-row :gutter="10" class="mb8" style="float: right">
            <el-col :span="1.5">
              <el-button
                @click="assignClick"
                type="primary"
                class="teaRecord"
                icon="el-icon-search"
              >
                批量分配</el-button
              >
            </el-col>
          </el-row>
        </div>
        <!-- v-loading="loading" -->
        <el-table
          :data="noticeList"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column
            label="班级编号"
            align="center"
            prop="bjdm"
            sortable
          />
          <el-table-column
            label="班级名称"
            align="center"
            width="250px"
            prop="bjmc"
            sortable
          />
          <el-table-column
            label="培养单位"
            align="center"
            prop="ssdwmc"
            sortable
          />
          <el-table-column
            label="培养层次"
            align="center"
            prop="pyccName"
            sortable
          />
          <el-table-column
            label="班级人数"
            align="center"
            prop="stuNumOfClass"
            sortable
          />
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            sortable
          />
          <el-table-column
            label="操作"
            align="center"
            sortable
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <div class="ins-handle" v-if="fpfdy">
                <!-- @click="assignTea(scope.row)" class="operate" -->
                <!-- <span class="assignTea">分配辅导员</span> -->
                <span
                  class="iconfont allocate_teacher"
                  @click="assignTea(scope.row)"
                  >&#xe638;</span
                >
                <span
                  style="color: #005657; margin-left: 5px; margin-right: 5px"
                  @click="assignTea(scope.row)"
                >
                  分配辅导员
                </span>
              </div>
              <div class="ins-handle" v-if="rejl">
                <span
                  class="iconfont record_icon"
                  style="margin-left: 5px"
                  @click="empRecordClick(scope.row)"
                  >&#xe694;</span
                >
                <span style="color: #005657" @click="empRecordClick(scope.row)">
                  任职记录
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          id="pagenation"
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <!-- <tea-table :table_content="noticeList" :total="total"></tea-table> -->
    <!-- 导入对话框 -->
    <!-- <el-dialog :visible.sync="openAssign" width="30%">
      <el-form label-position="left" label-width="100px" :model="importForm">
        <el-form-item label="学工号" prop="gh">
            <el-input v-model="importForm.gh" @input="inputChange" />
        </el-form-item>
        <el-form-item label="姓名" prop="xm">
                <el-select
                    v-model="importForm.xm"
                    placeholder=""
                    size="small"
                    @change="selectClick"
                  >
                    <el-option
                      v-for="item in xmOps"
                      :key="item.gh"
                      :label="item.xm + item.gh"
                      :value="item.gh"
                    />
                </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelImport">取 消</el-button>
        <el-button type="primary" class="confirm" @click="submitImport"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
    <!-- 批量任命对话框 -->
    <el-dialog
      title="辅导员任命"
      :visible.sync="openAssign"
      width="550px"
      height="243px"
      append-to-body
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="任命日期">
          <el-date-picker
            type="date"
            style="width: 100%"
            placeholder="选择任命日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            v-model="form.rmsj"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="学工号" prop="fdyGh" style="width: 80%">
          <el-input v-model="form.fdyGh" @input="inputChange" />
        </el-form-item>
        <el-form-item label="姓名" prop="xm" style="width: 80%">
          <el-select
            v-model="importForm.xm"
            placeholder=""
            size="small"
            @change="selectClick"
          >
            <el-option
              v-for="item in xmOps"
              :key="item.gh"
              :label="item.xm + '：' + item.gh"
              :value="item.gh"
            />
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="辅导员工号" prop="fdyGh">
              <el-select v-model="form.fdyGh" placeholder="请选择" clearable>
                <el-option
                  v-for="(item, index) in xmOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAssign">取消</el-button>
        <el-button type="primary" @click="assignConfirm" class="confirm"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <!-- 批量任命二次确定：doubleCheckAssign-->
    <el-dialog
      title="批量任命辅导员确认"
      :visible.sync="doubleAssign"
      width="50%"
    >
      <template>
        <div v-for="item in multipleSelection" :key="item.gh">
          <span
            >确认任命【{{ form.fdyGh }}({{ fdyXm }})】为【{{
              item.bjmc
            }}】的【辅导员】？</span
          >
        </div>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button @click="doubleAssignCancel">取 消</el-button>

        <el-button type="primary" @click="doubleAssignConfirm()" class="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/person/iconfont.css";
import {
  classList,
  modifyClassName,
  getCollege,
  getLevel,
  getGrade,
  addClass,
  deleteEmptyClass,
} from "@/api/class/maintenanceClass"; // 引入班级列表查询、修改班级名称接口
import { getXm, assignFdyByClass } from "@/api/class/instructor";
import { param } from "../../../utils";
export default {
  name: "instructor", //辅导员管理主界面
  mounted() {
    this.getOptions();
    this.getList();
    this.getData(this.menuVal);
    this.fpfdy = this.Jr.includes("0310");
    this.rejl = this.Jr.includes("0309");
  },
  activated() {
    // this.getOptions();
    // this.getList();
    // this.getData(this.menuVal);
    // this.fpfdy = this.Jr.includes("0310");
    // this.rejl = this.Jr.includes("0309");
  },
  data() {
    return {
      table_title: "",
      doubleAssign: false,
      importForm: {
        gh: "",
        xm: "",
      },
      // 确认导入弹出
      showConfirmImport: false,
      // 批量任命显示
      openAssign: false,
      // 遮罩层
      // loading: true,
      // 选中数组
      list: [],
      multipleSelection: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      noticeList: [],
      // 筛选框数据
      collegeOptions: [],
      levelOptions: {},
      gradeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        ssdwdmList: [], // 培养单位
        pyccList: [], // 培养层次
        ssnjList: [], // 年级
        bjmc: "", //班级名称
        orderField: "",
        orderType: "", // 0是asc升序，1是desc降序
      },
      // 表单参数
      form: {
        fdyGh: "",
        rmsj: "",
        bjdmList: [],
      },
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
      menuVal: this.$store.state.permission.topbarRouters,
      Jr: [],
      fpfdy: true,
      rejl: true,
      xmOps: [],
      fdyXm: "",
      rmsj: "",
      bjdmList: [],
    };
  },
  methods: {
    selectClick(val) {
      this.form.fdyGh = val;
      for (var i in this.xmOps) {
        if (this.xmOps[i].gh == val) {
          this.fdyXm = this.xmOps[i].xm;
          break;
        }
      }
    },
    //批量输入框查找姓名
    inputChange() {
      if (this.form.fdyGh.length > 4) {
        getXm({ gh: this.form.fdyGh })
          .then((res) => {
            // console.log(res, 'res')
            // this.$set(this.sex, "checkBox", res.data);
            this.xmOps = res.XmGh;
          })
          .catch((err) => {});
      }
      // console.log(this.importForm.gh,'importForm.gh')
    },
    getData(data) {
      for (var i in data) {
        this.Jr.push(data[i].modId); //将第一层的保存出来，
        if (data[i].children) {
          // if(data[i].length >)
          this.getData(data[i].children);
        }
      }
      return this.Jr;
    },
    changeTableSort(column) {
      this.queryParams.orderField = column.prop;
      this.queryParams.orderType =
        column.order === "descending" ? "desc" : "asc"; // 0是asc升序，1是desc降序
      this.getList(this.queryParams);
    },
    getList(data) {
      var data = this.queryParams;
      classList(data).then((response) => {
        // 获取班级列表数据
        if (response.errcode == "00") {
          this.noticeList = response.data.rows; // 根据状态码接收数据
          this.total = response.data.total; //总条数
        }
      });
    },
    getOptions() {
      this.collegeOptions = [];
      this.levelOptions = [];
      this.gradeOptions = [];
      getCollege().then((response) => {
        // 获取培养单位列表数据
        this.collegeOptions = response.data.rows;
        //  this.loading = false;
      });
      getLevel().then((response) => {
        // 获取培养层次列表数据
        this.levelOptions = response.data.rows;
      });
      getGrade().then((response) => {
        // 获取年级列表数据
        this.gradeOptions = response.data.rows;
      });
    },
    // 分配辅导员
    assignTea(row) {
      // console.log("currentRow:", this.currentRow);
      this.$router.push({
        path: "/class/assignTea",
        query: { bjdm: row.bjdm, bjmc: row.bjmc },
      });
    },
    // 任职记录
    empRecordClick(row) {
      this.$router.push({
        path: "/class/empRecord",
        query: { bjdm: row.bjdm },
      });
    },
    // 批量分配
    assignClick() {
      // console.log(this.multipleSelection)

      if (this.multipleSelection.length > 0) {
        this.openAssign = true;
        this.title = "批量任命辅导员";
      } else {
        this.$message({
          message: "请至少选择一个班级！",
          type: "warning",
        });
      }
    },
    // 取消导入提交按钮
    cancelAssign() {
      this.openAssign = false;
      this.form.rmsj = "";
      this.form.fdyGh = "";
      this.importForm.xm = "";
      this.xmOps = [];
    },
    // /** 导入提交按钮 */
    assignConfirm() {
      this.openAssign = false;
      this.doubleAssign = true;
      // let params= {
      //   bjdm : this.bjdmList,
      //   fdyGh : this.importForm.gh
      //   // rmsj :
      // }
      this.fdyGh = this.importForm.gh;
    },
    //班干部批量任命————二次确定操作
    doubleAssignConfirm() {
      let param = this.form;
      assignFdyByClass(param).then((res) => {
        // console.log(res);
        this.$message({
          message: "任命成功",
          type: "success",
        });
        this.doubleAssign = false;
        this.queryParams.pageNum = 1;
        this.getList();
        this.form.rmsj = "";
        this.form.fdyGh = "";
        this.importForm.xm = "";
        this.xmOps = [];
      });
    },
    /** 查询公告列表 */
    // getList() {
    //   // this.loading = true;
    //   // listNotice(this.queryParams).then((response) => {
    //   //   this.noticeList = response.rows;
    //   //   this.total = response.total;
    //   //   this.loading = false;
    //   // });
    // },
    // 取消按钮
    cancel() {
      // this.open = false;
      // this.reset();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // this.queryParams.pageNum = 1;
      // this.getList();
      this.getList(this.queryParams);
    },
    /** 重置按钮操作 */
    resetQuery(a) {
      this.$refs[a].resetFields();
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.form.bjdmList = [];
      this.multipleSelection = selection;
      for (var i in selection) {
        if (!this.form.bjdmList.includes(selection[i].bjdm)) {
          this.form.bjdmList.push(selection[i].bjdm);
        }
      }
      this.list = [...selection];
      // this.ids = selection.map((item) => item.noticeId);
      // this.single = selection.length != 1;
      // this.multiple = !selection.length;
    },
    doubleAssignCancel() {
      // this.form = []
      this.form.rmsj = "";
      this.form.fdyGh = "";
      this.importForm.xm = "";
      this.xmOps = [];
      this.doubleAssign = false;
    },

    /** 新增按钮操作 */
    handleAdd() {
      // this.reset();
      // this.open = true;
      // this.title = "添加公告";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // this.reset();
      // const noticeId = row.noticeId || this.ids;
      // getNotice(noticeId).then((response) => {
      //   this.form = response.data;
      //   this.open = true;
      //   this.title = "修改公告";
      // });
    },
    /** 提交按钮 */
    submitForm: function () {
      // this.$refs["form"].validate((valid) => {
      //   if (valid) {
      //     if (this.form.noticeId != undefined) {
      //       updateNotice(this.form).then((response) => {
      //         this.$modal.msgSuccess("修改成功");
      //         this.open = false;
      //         this.getList();
      //       });
      //     } else {
      //       addNotice(this.form).then((response) => {
      //         this.$modal.msgSuccess("新增成功");
      //         this.open = false;
      //         this.getList();
      //       });
      //     }
      //   }
      // });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      // const noticeIds = row.noticeId || this.ids;
      // this.$modal
      //   .confirm('是否确认删除公告编号为"' + noticeIds + '"的数据项？')
      //   .then(function () {
      //     return delNotice(noticeIds);
      //   })
      //   .then(() => {
      //     this.getList();
      //     this.$modal.msgSuccess("删除成功");
      //   })
      //   .catch(() => {});
    },
  },
};
</script>

<style scoped>
.instructor {
  padding: 20px;
  background-color: #fff;
}
/* 搜索 */
.table-header {
  background-color: #ffffff;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  /* margin-top: 10px; */
}
.assignInput {
  display: flex;
  justify-content: center;
}
.assignInput .header-item:nth-child(1) {
  margin-right: 90px;
}
.header-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search {
  background: #005657;
}
.reset {
  color: #005657;
  border-color: #005657;
}
/* 表格 */
.tea-table {
  /* height: 100vh; */
  background-color: #ffffff;
}
#pagenation {
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.table-content {
  /* padding-top: 32px; */
  padding-left: 20px;
  padding-right: 20px;
  /* height: 100%; */
  background-color: #ffffff;
  /* margin-top: 24px; */
}

.ins-handle {
  cursor: pointer;
}
.title {
  margin-bottom: 32px;
}
.title-itemopn {
  width: 9%;
  height: 28px;
  font-family: "PingFangSC-Semibold";
  font-weight: 600;
  font-size: 20px;
  color: #1f1f1f;
  line-height: 28px;
  margin-right: 12px;
}
/* 分页背景颜色修改 */
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #005657;
}
.operate {
  cursor: pointer;
}
.assignTea {
  font-family: "PingFangSC-Regular";
  font-weight: 700;
  font-size: 14px;
  color: #005657;
}
/* 任职记录 */
.teaRecord {
  background-color: rgba(0, 144, 161, 0.1) !important;
  border: 1px solid #0090a1 !important;
  font-weight: 600;
  font-size: 14px;
  color: #0090a1;
}
/* 批量分配 */
.teaAssign {
  background-color: #005657;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}
</style>
