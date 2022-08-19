<template>
  <div class="tea-table">
    <div class="table-content">
      <div class="title" icon="el-icon-refresh">
        <span class="title-item">班级列表</span>
        <span class="iconfont">&#xe631;</span>
        <el-row :gutter="10" class="mb8" style="float: right">
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
        </el-row>
      </div>
      <!-- v-loading="loading" -->
      <el-table :data="table_content" @selection-change="handleSelectionChange">
        <el-table-column label="序号" align="center" type="index" />
        <el-table-column label="班级编号" align="center" prop="bjdm" sortable />
        <el-table-column
          label="班级名称"
          align="center"
          width="250px"
          prop="bjmc"
          sortable
        />
        <el-table-column label="培养单位" align="center" prop="pycc" sortable />
        <el-table-column label="培养层次" align="center" prop="pycc" sortable />
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
          <template
            ><!-- slot-scope="scope" -->
            <div @click="operate" class="operate">
              <span class="assignTea">分配辅导员</span>
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
</template>

<script>
import "@/assets/fonts/refresh/iconfont.css";
export default {
  name: "teaTable", //辅导员管理
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
  props: {
    table_content: {
      type: Object,
    },
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
      total: 100,
      // 表格数据
      noticeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        college: "", // 培养单位
        level: "", // 培养层次
        grade: "", // 年级
        classId: "", // 班级编号
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
  created() {
    // this.getList();
  },
  methods: {
    // 辅导员任命
    operate() {
      this.$router.push({
        path: "/class/assignTea",
      });
    },
    // 任职记录
    empRecordClick() {
      this.$router.push("/class/empRecord");
    },
    /** 查询公告列表 */
    getList() {
      // this.loading = true;
      // listNotice(this.queryParams).then((response) => {
      //   this.noticeList = response.rows;
      //   this.total = response.total;
      //   this.loading = false;
      // });
    },
    // 取消按钮
    cancel() {
      // this.open = false;
      // this.reset();
    },
    // 表单重置
    reset() {
      // this.form = {
      //   noticeId: undefined,
      //   noticeTitle: undefined,
      //   noticeType: undefined,
      //   noticeContent: undefined,
      //   status: "0",
      // };
      // this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // this.queryParams.pageNum = 1;
      // this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      // this.resetForm("queryForm");
      // this.handleQuery();
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
