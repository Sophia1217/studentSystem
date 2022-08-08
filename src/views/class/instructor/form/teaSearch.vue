<template>
  <div>
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      class="table-header"
    >
      <el-form-item label="工作单位" prop="noticeType" class="header-item">
        <el-select
          v-model="queryParams.noticeType"
          placeholder="计算机学院"
          clearable
        >
        </el-select>
      </el-form-item>
      <el-form-item label="培养层次" prop="noticeType" class="header-item">
        <el-select
          v-model="queryParams.noticeType"
          placeholder="本科"
          clearable
        >
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop="noticeType" class="header-item">
        <el-select v-model="queryParams.noticeType" placeholder="2022" clearable>
        </el-select>
      </el-form-item>
      <el-form-item label="班级编号" prop="noticeTitle" class="header-item">
        <el-input
          v-model="queryParams.noticeTitle"
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
  </div>
</template>

<script>
export default {
  name: "teaSearch", // 辅导员查找
  data() {
    return {
      // tab栏切换
      tab_title: ["22级电子信息1班", "未分配学生名单"],
      currentIndex: 0,
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
      noticeList: [
        {
          id: 1,
          classId: 13070025,
          className: "计算机工程硕士2022级1班",
          college: "计算机工程学院",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
          record: "班级操作记录",
        },
        {
          id: 2,
          classId: 13070025,
          className: "计算机工程硕士2022级2班",
          college: "计算机工程学院",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
          record: "班级操作记录",
        },
        {
          id: 3,
          classId: 13070025,
          className: "计算机工程硕士2022级3班",
          college: "计算机工程学院",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
          record: "班级操作记录",
        },
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createBy: undefined,
        status: undefined,
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
    // 分班管理路由跳转
    operate() {
      console.log(123);
      this.$router.push({
        path: "/class/operateClass",
      });
    },
    // tab栏切换
    tabClick(index) {
      this.currentIndex = index;
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
    /** 调整班级操作 */
    handleChange() {
      // this.reset();
      this.open = true;
      this.title = "调整班级";
      console.log("123");
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
      this.$modal.confirm("是否删除？");
      console.log(123);
    },
  },
};
</script>

<style scoped>
.table-header {
  background-color: #ffffff;
  height: 128px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 15px;
  margin-top: 10px;
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
</style>
