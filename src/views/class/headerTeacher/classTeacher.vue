<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="学工号" prop="noticeTitle">
        <el-input
          v-model="queryParams.noticeTitle"
          placeholder="请输入"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工作单位" prop="noticeType">
        <el-select
          v-model="queryParams.noticeType"
          placeholder="计算机学院"
          clearable
        >
        </el-select>
      </el-form-item>
      <div style="float: right">
        <el-form-item>
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
      </div>
    </el-form>
    <div>
      <h3 class="title-item">
        22电子信息1班<span class="iconfont repeat_icon">&#xe7b1; </span>
      </h3>
      <el-row :gutter="10" class="mb8" style="float: right; margin-top: 15px">
        <!-- <el-col :span="1.5" style="float: left"> 班级列表 </el-col> -->
        <el-col :span="1.5">
          <el-button class="allocate" @click="handleDelete">
            <span class="iconfont allocate_icon">&#xe638;</span>
            批量分配</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button class="onrecord">
            <span class="iconfont record_icon">&#xe694;</span>
            批量取消</el-button
          >
        </el-col>
        <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
    </div>

    <el-table
      v-loading="loading"
      :data="noticeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" align="center" width="100" type="index" />
      <el-table-column
        label="学工号"
        align="center"
        prop="classId"
        width="100"
        sortable
      />
      <el-table-column
        label="姓名"
        align="center"
        prop="name"
        width="300"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="性别"
        align="center"
        prop="sex"
        width="300"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="工作单位"
        align="center"
        prop="department"
        width="150"
        sortable
      />
      <el-table-column
        label="已任职班级数量"
        align="center"
        prop="nums"
        width="150"
        sortable
      />
      <el-table-column
        label="操作"
        align="center"
        prop="action"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <div>
            <span
              class="iconfont allocate_class"
              @click="allocateClass(scope.row)"
              >&#xe638;</span
            >
            <span
              style="color: #005657; margin-left: 5px; margin-right: 10px"
              @click="allocateClass(scope.row)"
              >分配班级</span
            >
            <span
              class="iconfont allocate_none"
              @click="allocateNone(scope.row)"
              >&#xe638;</span
            >
            <span
              style="color: #005657; margin-left: 5px"
              @click="allocateNone(scope.row)"
              >取消分配</span
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      id="test"
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 取消分配、批量取消对话框 -->
    <el-dialog title="取消分配" :visible.sync="cancelAllocateDialogFormVisible">
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
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="qd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 取消分配、批量取消对话框-二次确定 -->
    <el-dialog
      :title="title"
      :visible.sync="doublecheck"
      width="30%"
      :before-close="handleClose"
    >
      <span
        >确认将取消【78788】【张曼丽】【计算机硕士22级1班】、【计算机硕士22级2班】班主任任命？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="doublecheck = 'false'">取 消</el-button>
        <el-button type="primary" @click="doublecheck = 'false'" class="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/person/iconfont.css";
import { Message } from "element-ui";
export default {
  name: "classTeacher",
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
      noticeList: [
        {
          classId: 13070025,
          name: "张三",
          sex: "男",
          department: "计算机工程学院",
          nums: 2,
        },
        {
          classId: 13070025,
          name: "张三",
          sex: "男",
          department: "计算机工程学院",
          nums: 2,
        },
        {
          classId: 13070025,
          name: "张三",
          sex: "男",
          department: "计算机工程学院",
          nums: 2,
        },
      ],
      // 弹出层标题
      title: "",
      // 是否显示新建班级弹出层
      open: false,
      // 是否显示取消分配、批量取消弹出层
      cancelAllocateDialogFormVisible: false,
      // 取消分配-二次确认弹出框
      doublecheck: false,
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
          { required: true, message: "所属学院为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "培养层次不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    // 新建班级-取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        noticeId: undefined,
        noticeTitle: undefined,
        noticeType: undefined,
        noticeContent: undefined,
        status: "0",
      };
      this.resetForm("form");
    },
    // 班主任对班级一对一分配班级（点击分配班级时根据row获取信息）、一对多分配班级（点击批量分配时根据list判断列表中有几个勾选）
    allocateClass(row) {
      console.log("班主任对班级一对一分配班级");
      this.$confirm(
        "确认将【学工号】【张曼丽】、【学工号】【汪曼纳】任命为【22电子信息1班】班主任？",
        "分配班级",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认",
          confirmButtonClass: "ack",
          cancelButtonText: "取消",
        }
      )
        .then(() => {
          this.$message({
            type: "info",
            message: "分配班级操作成功",
          });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message:
              // action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面",
              "分配班级操作取消",
          });
        });
    },
    // 班主任对班级一对一取消分配班级
    allocateNone(row) {
      console.log("班主任对班级一对一取消分配班级");
      this.cancelAllocateDialogFormVisible = true;
    },
    /** 新增班级按钮操作 */
    handleAdd() {
      this.reset(); //表单清空
      this.open = true; //弹出对话框
      this.title = "新建班级";
    },
    // 删除空班级操作
    handleDelete() {
      // this.reset();
      this.dialogVisible = true;
      this.title = "删除空班级";
    },
    // 删除空班级-取消操作
    classCancel() {
      this.dialogVisible = false;
      // const h = this.$createElement;
      // this.$notify({
      //   type: "error",
      //   title: "错误",
      //   customClass: "error",
      //   message: h(
      //     "h3",
      //     { style: "color: #ED5234" },
      //     "班级代码编号末尾班级目前仍有成员，请删除班级所有成员后重试"
      //   ),
      //   duration: 0,
      // });
    },
    // 删除空班级-确认操作
    classConfirm() {
      this.dialogVisible = false;
      this.$notify({
        type: "success",
        title: "成功",
        customClass: "success",
        message: "空班级【计算机工程硕士2022级21班】删除成功！",
        duration: 0,
      });
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.noticeId != undefined) {
            updateNotice(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNotice(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    // /** 删除按钮操作 */
    // handleDelete(row) {
    //   const noticeIds = row.noticeId || this.ids;
    //   this.$modal
    //     .confirm('是否确认删除公告编号为"' + noticeIds + '"的数据项？')
    //     .then(function () {
    //       return delNotice(noticeIds);
    //     })
    //     .then(() => {
    //       this.getList();
    //       this.$modal.msgSuccess("删除成功");
    //     })
    //     .catch(() => {});
    // },
  },
  //
  qx() {
    this.cancelAllocateDialogFormVisible = false;
    this.doublecheck = true;
  },
  qd() {
    this.cancelAllocateDialogFormVisible = false;
    this.doublecheck = true;
  },
};
</script>

<style>
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
.allocate {
  color: #ffff;
  background-color: #005657;
}
.allocate_icon {
  color: #ffff;
}
.onrecord {
  color: #0090a1;
  border-color: #0090a1;
  background-color: #e8fcfc;
}
.confirm {
  background-color: #005657;
}
.record_icon {
  margin-right: 5px;
}
.record_icon + span,
.allocate_class {
  color: #005657;
}
.allocate_none {
  color: #cce0e1ff;
}
.repeat_icon {
  font-size: 20px;
  margin-left: 5px;
}
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.error {
  background-color: #fef5f4;
}
.success {
  background-color: #ecfbf4;
  color: #ecfbf4;
}

.el-notification.right {
  left: 30%;
  transform: translateX(50%);
}
/* .el-notification__title {
      color: #ed5234;
    } */
.title-item {
  display: inline-block;
  width: 200px;
  height: 28px;
  font-family: "PingFangSC-Semibold";
  font-weight: 600;
  font-size: 20px;
  color: #1f1f1f;
}
#test {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.ack {
  color: #ffffff !important;
  background-color: #005657 !important;
}
.el-textarea.el-input--medium {
  display: inline;
  width: 100px;
}
</style>