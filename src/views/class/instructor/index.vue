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
        <el-form-item label="工作单位" prop="ssdwdm" class="header-item">
          <el-select
            v-model="queryParams.ssdwdm"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item, index) in collegeOptions"
              :key="index"
              :label="item.mc"
              :value="item.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培养层次" prop="pycc" class="header-item">
          <el-select v-model="queryParams.pycc" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in levelOptions"
              :key="index"
              :label="item.mc"
              :value="item.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级" prop="ssnj" class="header-item">
          <el-select v-model="queryParams.ssnj" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in gradeOptions"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级编号" prop="bjdm" class="header-item">
          <el-input
            v-model="queryParams.bjdm"
            placeholder="请输入班级编号"
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
        <div class="title" icon="el-icon-refresh">
          <span class="title-item">班级列表</span>
          <span class="iconfont">&#xe631;</span>
          <!-- <el-row :gutter="10" class="mb8" style="float: right">
            <el-col :span="1.5">
              <el-button
                @click="empRecordClick"
                type="primary"
                class="teaRecord"
                icon="el-icon-search"
              >
                任职记录</el-button
              >
            </el-col>
          </el-row> -->
        </div>
        <!-- v-loading="loading" -->
        <el-table :data="noticeList" @selection-change="handleSelectionChange">
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
              <div>
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
              <div>
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
export default {
  name: "instructor", //辅导员管理主界面
  mounted() {
    this.getOptions();
    this.getList();
  },
  data() {
    return {
      // 遮罩层
      // loading: true,
      // 选中数组
      ids: [],
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
        ssdwdm: "", // 工作单位
        pycc: "", // 培养层次
        ssnj: "", // 年级
        bjdm: "", // 班级编号
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
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
      console.log("currentRow:", this.currentRow);
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
    resetQuery(queryParams) {
      this.$refs[queryParams].resetFields();
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(row) {
      // this.ids = selection.map((item) => item.noticeId);
      // this.single = selection.length != 1;
      // this.multiple = !selection.length;
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
  height: 128px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin-top: 10px;
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
  height: 100vh;
  background-color: #ffffff;
}
#pagenation {
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.table-content {
  padding-top: 32px;
  padding-left: 40px;
  padding-right: 40px;
  height: 100%;
  background-color: #ffffff;
  margin-top: 24px;
}

.title {
  margin-bottom: 32px;
}
.title-item {
  width: 80px;
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
