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
          <el-button class="allocate" @click="distributeSomeClass">
            <span class="iconfont allocate_icon" @click="distributeSomeClass"
              >&#xe638;</span
            >
            批量分配</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button class="onrecord" @click="cancelDistributeSomeClass">
            <span
              class="iconfont record_icon"
              @click="cancelDistributeSomeClass"
              >&#xe694;</span
            >
            批量取消</el-button
          >
        </el-col>
        <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
    </div>

    <!-- 班主任列表 -->
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

    <!-- 给班主任分配班级操作：teacherClass-->
    <!-- :before-close="handleClose" -->
    <el-dialog title="分配班级" :visible.sync="teacherClass" width="30%">
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

    <!-- 给班主任取消分配班级操作：cancelAllocate -->
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

    <!-- 给班主任取消分配班级操作——二次确定：checkDouble -->
    <el-dialog title="取消分配" :visible.sync="doubleCheck" width="50%">
      <span
        >确认取消【78788(学工号)】【张曼丽】对【计算机硕士22级1班】【计算机硕士22级1班】班主任任命？</span
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
      // 分配班级弹出层
      teacherClass: false,
      // 是否显示取消分配、批量取消弹出层
      cancelAllocate: false,
      // 取消分配-二次确认弹出框
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
    // 班级对班主任一对一分配（点击分配班级时根据row获取信息）、一对多分配（点击批量分配时根据list判断列表中有几个勾选）
    allocateClass(row) {
      this.teacherClass = true;
    },
    // 班主任对班级一对一取消分配班级
    allocateNone(row) {
      this.cancelAllocate = true;
    },
    // 分配班级-确认操作
    distributeClassConfirm(row) {
      this.teacherClass = false;
      this.$message({
        message: "分配班级成功",
        type: "success",
      });
    },
    // 取消分配-确认操作
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
        message: "取消分配班级操作成功",
        type: "success",
      });
    },
    // 批量分配班级——1个班主任对应多个班级
    distributeSomeClass() {
      // 拿到勾选的那几个班主任信息，后弹出分配班级弹出框
      this.teacherClass = true;
    },
    // 批量取消分配班级
    cancelDistributeSomeClass() {
      this.cancelAllocate = true;
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
  //取消分配-确定按钮
  // qd() {
  //   console.log("1");
  //   this.cancelAllocate = false;
  //   // this.doublecheck = true;
  // },
};
</script>

<style>
.app-container {
  height: 100vh;
  background-color: white;
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