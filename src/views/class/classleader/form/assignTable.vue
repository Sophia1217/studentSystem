<template>
  <div class="assign-table">
    <div class="tab">
      <div class="tab_list">
        <ul>
          <li
            v-for="(title, index) in tab_list"
            :key="title"
            @click="tabClick(index)"
            :class="currentIndex == index ? 'activate' : ''"
          >
            {{ title }}
          </li>
        </ul>
      </div>
      <div class="table-content">
        <div class="classLeader" v-show="currentIndex == 0">
          <div class="title" icon="el-icon-refresh">
            <span class="title-item">22电子信息1班</span>
            <span class="iconfont">&#xe631;</span>
            <el-row :gutter="10" class="mb8" style="float: right">
              <el-col :span="1.5">
                <el-button
                  class="stuRecord"
                  type="primary"
                  icon="el-icon-search"
                  @click="studentRecord"
                >
                  任职记录</el-button
                >
              </el-col>
              <el-col :span="1.5">
                <el-button
                  class="delete"
                  icon="el-icon-delete"
                  @click="deleteSome"
                  >批量撤任</el-button
                >
              </el-col>
            </el-row>
          </div>
          <!-- v-loading="loading" -->
          <el-table
            :data="noticeList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" />
            <el-table-column
              label="序号"
              align="center"
              prop="id"
              width="60px"
            />
            <el-table-column label="学号" align="center" prop="classId" />
            <el-table-column label="姓名" align="center" prop="className">
              <el-input
                :value="noticeList[0].className"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-table-column>
            <el-table-column label="性别" align="center" prop="college" />
            <el-table-column label="班级职位" align="center" prop="level" />
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
        <div class="allClassmates" v-show="currentIndex == 1">
          <div class="title" icon="el-icon-refresh">
            <span class="title-item">22电子信息1班</span>
            <span class="iconfont">&#xe631;</span>
            <el-row :gutter="10" class="mb8" style="float: right">
              <el-col :span="1.5">
                <el-button
                  class="stuRecord"
                  type="primary"
                  icon="el-icon-search"
                  @click="studentRecord"
                >
                  任职记录</el-button
                >
              </el-col>
              <el-col :span="1.5">
                <el-button class="allocate" @click="action()">
                  <span class="iconfont allocate_icon">&#xe638;</span>
                  批量任命</el-button
                >
              </el-col>
            </el-row>
          </div>
          <!-- v-loading="loading" -->
          <el-table
            :data="noticeList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" />
            <el-table-column
              label="序号"
              align="center"
              prop="id"
              width="60px"
            />
            <el-table-column label="学号" align="center" prop="classId" />
            <el-table-column label="姓名" align="center" prop="className">
              <el-input
                :value="noticeList[0].className"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-table-column>
            <el-table-column label="性别" align="center" prop="college" />
            <el-table-column label="班级职位" align="center" prop="level" />
            <el-table-column label="操作" align="center" prop="level">
              <template slot-scope="scope">
                <span
                  class="iconfont allocate_teacher"
                  @click="action(scope.row)"
                  >&#xe638;</span
                >
                <span
                  style="color: #005657; margin-left: 5px; margin-right: 5px"
                  @click="action(scope.row)"
                >
                  分配班干部
                </span>
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
    </div>
    <!-- 分配班干部操作：teacherClass-->
    <!-- :before-close="handleClose" -->
    <el-dialog title="分配班干部" :visible.sync="teacherClass" width="30%">
      <span
        >确认将【78788(学工号)】【张曼丽】任命为【22电子信息1班】班主任？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="teacherClass = false">取 消</el-button>
        <!-- distributeClassConfirm(row) -->
        <el-button
          type="primary"
          @click="distributeClassConfirm(row)"
          class="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 批量撤任对话框：cancelAllocate-->
    <el-dialog title="取消分配" :visible.sync="cancelAllocate" width="50%">
      <el-form :model="form">
        <el-form-item label="撤任理由" prop="reason">
          <el-select v-model="form.reason" placeholder="休学">
            <!-- <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="撤任详情" prop="detail">
          <el-input
            v-model="form.detail"
            autocomplete="off"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAllocate = false">取 消</el-button>
        <el-button type="primary" @click="cancelAllocateConfirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 批量撤任——二次确定：checkDouble -->
    <el-dialog title="取消分配" :visible.sync="doubleCheck" width="50%">
      <span
        >确认取消【78788(学工号)】【张曼丽】对【计算机硕士22级1班】【计算机硕士22级1班】班干部任命？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="doubleCheck = false">取 消</el-button>
        <!-- distributeClassConfirm(row) -->
        <el-button
          type="primary"
          @click="doubleCheckConfirm(row)"
          class="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/circle/iconfont.css";
export default {
  name: "assignTable", //班干部任命表格
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
  data() {
    return {
      // tab栏切换
      tab_list: ["班干部", "全班同学"],
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
      // 是否显示分配班级弹框
      openAssignClass: false,
      // 是否显示批量取消分配班干部弹框
      cancelAllocate: false,
      // 批量取消分配二次确定
      teacherClass: false,
      doubleCheck: false,
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
    // 班干部任职记录
    studentRecord() {
      this.$router.push({
        path: "/class/leadRecord",
      });
    },
    // 班干部批量撤任操作
    deleteSome() {
      this.cancelAllocate = "true";
    },
    // 批量取消分配-确认操作
    cancelAllocateConfirm() {
      this.cancelAllocate = false;
      setTimeout(() => {
        this.doubleCheck = true;
      }, 500);
    },
    // 取消分配-二次确认按钮
    doubleCheckConfirm() {
      this.doubleCheck = false;
      this.$message({
        message: "批量撤任班干部操作成功",
        type: "success",
      });
    },
    // 批量分配
    action(row) {
      this.teacherClass = true;
    },
    // 分配班干部-确认操作
    distributeClassConfirm(row) {
      this.teacherClass = false;
      this.$message({
        message: "分配班干部成功",
        type: "success",
      });
    },
    // 辅导员任命
    operate() {
      this.$router.push({
        path: "/class/assignTea",
      });
    },
    // 第一个对话框
    // 分配班级
    assignClass() {
      this.openAssignClass = true;
      this.title = "分配班级";
    },
    // 分配班级tips点击“确定”按钮
    submitTips() {
      this.$message({
        message: "分配成功",
        type: "success",
      });
      this.openAssignClass = false;
    },
    // 取消按钮关闭窗口
    cancelTips() {
      this.openAssignClass = false;
      this.openCancelAssignClass = false;
      this.openSecondCancelAssign = false;
    },
    // 第二个对话框
    // 取消分配tips
    cancelAssignClass() {
      this.openCancelAssignClass = true;
      this.title = "取消分配";
    },
    submitOut() {
      this.openCancelAssignClass = false;
      this.openSecondCancelAssign = true;
    },
    // 第三个对话框
    submitOut2() {
      this.openSecondCancelAssign = false;
      this.title = "取消分配";
      this.$message({
        message: "取消分配成功",
        type: "success",
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
.assign-table {
  height: 100vh;
  background-color: #ffffff;
}

#pagenation {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.table-content {
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
/* 对话框样式开始 */
.el-dialog__title {
  font-weight: 700;
}
.submit_btn {
  background-color: #005657;
  color: #ffffff;
}
.cancel_class {
  padding-left: 140px;
  padding-right: 140px;
}
/* 对话框样式结束 */
/* 任职记录按钮样式 */
.stuRecord {
  background-color: rgba(0, 144, 161, 0.1) !important;
  border: 1px solid #0090a1 !important;
  font-weight: 600;
  font-size: 14px;
  color: #0090a1;
}
/* 表单tab栏切换开始 */
.tab {
  height: 100vh;
}
ul,
li {
  list-style-type: none;
}
.tab_list {
  height: 43px;
  background-color: #ffffff;
}
.tab_con {
  height: 100%;
}
.tab_list li {
  margin: 12px 0;
  height: 43px;
  box-sizing: border-box;
  padding: 5px 10px;
  display: inline-block;
  cursor: pointer;
}
.activate {
  color: #005657;
  border-bottom: 2px solid #005657;
}
/* 表单tab栏切换结束 */
.el-textarea.el-input--medium {
  display: inline-block;
  width: 60%;
}
.pagination-container {
  margin-top: 0px;
  height: 100%;
}
.el-pagination {
  margin-top: 20px;
}
</style>
