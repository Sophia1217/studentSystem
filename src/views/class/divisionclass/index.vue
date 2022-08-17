<template>
  <div class="division-class">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      class="table-header"
    >
      <el-form-item label="培养单位" prop="ssdwdm" class="header-item">
        <el-select v-model="queryParams.ssdwdm" placeholder="未选择" clearable>
          <el-option
            v-for="(item, index) in collegeOptions"
            :key="index"
            :label="item.mc"
            :value="item.dm"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="培养层次" prop="pycc" class="header-item">
        <el-select v-model="queryParams.pycc" placeholder="未选择" clearable>
          <el-option
            v-for="(item, index) in levelOptions"
            :key="index"
            :label="item.mc"
            :value="item.dm"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop="ssnj" class="header-item">
        <el-select v-model="queryParams.ssnj" placeholder="未选择" clearable>
          <el-option
            v-for="(item, index) in gradeOptions"
            :key="index"
            :label="item"
            :value="item"
          />
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
        <el-button size="mini" @click="resetQuery" class="reset">
          <span class="iconfont reset_icon">&#xe614;</span>

          重置</el-button
        >
      </el-form-item>
    </el-form>
    <div class="table-content">
      <div class="title" icon="el-icon-refresh">
        <span class="title-item">班级列表</span>
        <span class="iconfont">&#xe631;</span>
      </div>
      <!-- v-loading="loading" -->
      <el-table :data="noticeList" @selection-change="handleSelectionChange">
        <el-table-column label="序号" align="center" type="index" />
        <el-table-column label="班级编号" align="center" prop="bjdm" sortable />
        <el-table-column
          label="班级名称"
          align="center"
          width="250px"
          prop="bjmc"
          sortable
        >
          <template slot-scope="{ row }">
            <el-input
              v-model="row.bjmc"
              clearable
              width="200px"
              @keyup.enter.native="alterClassName(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="培养单位" align="center" prop="ssdw" sortable />
        <el-table-column label="培养层次" align="center" prop="pycc" sortable />
        <el-table-column label="年级" align="center" prop="ssnj" sortable />
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
          label="更新时间"
          align="center"
          prop="updateTime"
          sortable
          class-name="small-padding fixed-width"
        />
        <el-table-column
          label="操作"
          align="center"
          sortable
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <div @click="operate(scope.row)" class="operate">
              <span class="operateSpan">分班管理</span>
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
        @pagination="getClassList"
      />
    </div>
  </div>
</template>

<script>
import "@/assets/fonts/export/iconfont.css";
import "@/assets/fonts/refresh/iconfont.css";
import {
  classList,
  getCollege,
  getLevel,
  getGrade,
} from "@/api/class/maintenanceClass";
export default {
  name: "divisionClass", //分班管理
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
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
      total: 1,
      // 表格数据
      noticeList: [],
      // 筛选框数据
      collegeOptions: [],
      levelOptions: [],
      gradeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        ssdwdm: "", // 培养单位
        pycc: "", // 培养层次
        ssnj: "", // 年级
        bjdm: "", // 班级编号
      },
      // 表单参数
      form: {},
      // 表单校验
      // rules: {
      //   noticeTitle: [
      //     { required: true, message: "公告标题不能为空", trigger: "blur" },
      //   ],
      //   noticeType: [
      //     { required: true, message: "公告类型不能为空", trigger: "change" },
      //   ],
      // },
    };
  },
  mounted() {
    this.getClassList(this.queryParams);
    this.getOptions();
  },
  methods: {
    // 获取班级列表数据
    getClassList(queryParams) {
      Object.assign(queryParams, this.queryParams);
      classList(queryParams).then((response) => {
        // debugger;
        // 获取班级列表数据
        if (response.errcode == "00") {
          this.noticeList = response.data.rows; // 根据状态码接收数据
          this.total = response.data.total; //总条数
          //  this.loading = false;
        }
      });
    },
    // 获取筛选框数据
    getOptions() {
      this.collegeOptions = [];
      this.levelOptions = [];
      this.gradeOptions = [];
      getCollege().then((response) => {
        // 获取培养单位列表数据
        if (response.errcode == "00") {
          this.collegeOptions = response.data.rows;
        }
      });
      getLevel().then((response) => {
        // 获取培养层次列表数据
        if (response.errcode == "00") {
          this.levelOptions = response.data.rows;
        }
      });
      getGrade().then((response) => {
        // 获取年级列表数据
        if (response.errcode == "00") {
          this.gradeOptions = response.data.rows;
        }
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getClassList(this.queryParams);
    },
    // /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {};
      this.handleQuery();
    },
    // 分班管理
    operate(row) {
      this.$router.push({
        path: "/class/operateClass",
        query: { bjmc: row.bjmc, bjdm: row.bjdm },
      });
    },
    // 取消按钮
    cancel() {
      // this.open = false;
      // this.reset();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
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
<style>
.division-class {
  background-color: #f0f0f0;
  height: 100vh;
  margin-top: 10px;
}

.table-header {
  background-color: #ffffff;
  height: 128px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
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
.reset_icon {
  color: #005657;
  font-size: 5px;
}
.create {
  background: #005657;
}
.delete {
  color: #eb3842;
  border-color: #eb3842;
}
.export {
  color: #005657;
  border-color: #005657;
}
#pagenation {
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
.operateSpan {
  font-family: "PingFangSC-Regular";
  font-weight: 700;
  font-size: 14px;
  color: #005657;
}
</style>
