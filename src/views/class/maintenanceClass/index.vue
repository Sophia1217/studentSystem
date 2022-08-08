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
      <el-form-item label="培养单位" prop="college">
        <el-select
          v-model="queryParams.college"
          placeholder="计算机学院"
          clearable
        >
          <!-- <el-option
            v-for="dict in dict.type.sys_notice_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="培养层次" prop="level">
        <el-select v-model="queryParams.level" placeholder="本科" clearable>
          <!-- <el-option
            v-for="dict in dict.type.sys_notice_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select v-model="queryParams.grade" placeholder="2022" clearable>
          <!-- <el-option
            v-for="dict in dict.type.sys_notice_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="班级编号" prop="classId">
        <el-input
          v-model="queryParams.classId"
          placeholder="请输入班级编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
    </el-form>
    <div>
      <h3 class="title-item">
        班级列表<span class="iconfont repeat_icon">&#xe7b1; </span>
      </h3>
      <el-row :gutter="10" class="mb8" style="float: right; margin-top: 15px">
        <!-- <el-col :span="1.5" style="float: left"> 班级列表 </el-col> -->
        <el-col :span="1.5">
          <el-button
            type="primary"
            class="create"
            icon="el-icon-search"
            @click="handleAdd"
          >
            新建班级</el-button
          >
          <!-- <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:notice:add']"
        >新增</el-button> -->
        </el-col>
        <!-- <el-col :span="1.5">
          <el-button class="delete" icon="el-icon-delete" @click="handleDelete"
            >删除空班级</el-button
          >
         <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:notice:edit']"
        >修改</el-button> 
        </el-col>-->
        <el-col :span="1.5">
          <el-button class="export">
            <span class="iconfont icon-daochu-06"></span>
            导出班级名单</el-button
          >
          <!-- <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:notice:remove']"
        >删除</el-button> -->
        </el-col>
        <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
    </div>

    <!-- v-loading="loading" -->
    <el-table :data="noticeList" @selection-change="handleSelectionChange">
      <el-table-column
        label="序号"
        align="center"
        prop="id"
        width="100"
        type="index"
      />
      <el-table-column
        label="班级编号"
        align="center"
        prop="classId"
        width="100"
        sortable
      />
      <el-table-column
        label="班级名称"
        align="center"
        prop="className"
        width="300"
        sortable
      >
        <el-input
          :value="noticeList[0].className"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-table-column>
      <el-table-column
        label="培养单位"
        align="center"
        prop="college"
        width="150"
        sortable
      />
      <el-table-column
        label="年级"
        align="center"
        prop="size"
        width="150"
        sortable
      />
      <el-table-column
        label="培养层次"
        align="center"
        prop="level"
        width="100"
        sortable
      />
      <el-table-column
        label="班级人数"
        align="center"
        prop="nums"
        width="100"
        sortable
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="beginTime"
        width="150"
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
        prop="updateTime"
        sortable
        class-name="small-padding fixed-width"
      >
        <span @click="handleDelete(row)">删除空班级</span>
      </el-table-column>

      <!-- <el-table-column
        label="公告标题"
        align="center"
        prop="noticeTitle"
        :show-overflow-tooltip="true"
      /> -->
      <!-- <el-table-column label="公告类型" align="center" prop="noticeType" width="100">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_notice_type" :value="scope.row.noticeType"/>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="创建者" align="center" prop="createBy" width="100" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:notice:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:notice:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      id="test"
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 新增班级对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      height="243px"
      append-to-body
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属学院" prop="noticeTitle">
              <el-select
                v-model="form.noticeType"
                placeholder="计算机学院"
              ></el-select>
              <!-- <el-input
                v-model="form.noticeTitle"
                placeholder="请输入公告标题"
              /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="培养层次" prop="noticeType">
              <el-select
                v-model="form.noticeType"
                placeholder="本科"
              ></el-select>
              <!-- <el-select v-model="form.noticeType" placeholder="请选择公告类型"> -->
              <!-- <el-option
                  v-for="dict in dict.type.sys_notice_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option> -->
              <!-- </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属年级">
              <el-select
                v-model="form.noticeType"
                placeholder="2022"
              ></el-select>
              <!-- <el-radio-group v-model="form.status"> -->
              <!-- <el-radio
                  v-for="dict in dict.type.sys_notice_status"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio> -->
              <!-- </el-radio-group> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级数量">
              <!-- <editor v-model="form.noticeContent" :min-height="192" /> -->
              <el-select v-model="form.noticeType" placeholder="10"></el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm" class="confirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 删除空班级对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <!--  :before-close="handleClose" -->
      <span
        >是否确认删除空班级？<span style="color: #ed5234"
          >*每次仅支持删除一个班级，且该班级编号为最末尾</span
        ></span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="classCancel">取 消</el-button>
        <el-button type="primary" @click="classConfirm" class="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 删除空班级对话框-确认按钮-显示提醒消息 -->
  </div>
</template>

<script>
import "@/assets/fonts/repeat/iconfont.css";
// import { Notification } from "element-ui"; // 引入通知
import deleteClassDoubleVue from "./deleteClassDouble.vue";
// import { classList } from "@/api/class/maintenanceClass";
// import {
//   listNotice,
//   getNotice,
//   delNotice,
//   addNotice,
//   updateNotice,
// } from "@/api/system/notice";
// import { json } from "stream/consumers";

export default {
  name: "maintenanceClass",
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
  props: { deleteClassDoubleVue },
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
          className: "计算机工程硕士2022级1班",
          college: "计算机工程学院",
          size: "2020级",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
        },
        {
          classId: 13070025,
          className: "计算机工程硕士2022级2班",
          college: "计算机工程学院",
          size: "2020级",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
        },
        {
          classId: 13070025,
          className: "计算机工程硕士2022级3班",
          college: "计算机工程学院",
          size: "2020级",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
        },
      ],
      // 弹出层标题
      title: "",
      // 是否显示新建班级弹出层
      open: false,
      // 是否显示删除空班级弹出层
      dialogVisible: false,
      // 查询参数
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        college: undefined,
        level: undefined,
        grade: undefined,
        classId: undefined,
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
  // created() {
  //   this.getList({ bjdm: this.queryParams.classId });
  // },
  methods: {
    // // 查看班级操作记录
    // showRecord(row) {
    //   // const Id = row.roleId;
    //   // this.$router.push("/class/role-auth/user/" + roleId);
    //   this.$router.push("/class/record");
    // },
    /** 查询公告列表 */
    getList(queryParams) {
      console.log("1");
      // this.loading = true;
      //   classList(queryParams).then((response) => {
      //     console.log("2");
      //     console.log(response);
      //     //  this.noticeList = response.rows;
      //     //  this.total = response.total;
      //     //  this.loading = false;
      //   });
    },
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
    // /** 搜索按钮操作 */
    handleQuery() {
      // this.queryParams.pageNum = 1;

      let obj = { bjdm: "070101000501" };
      this.getList(obj);
    },
    // /** 重置按钮操作 */
    resetQuery() {
      // this.resetForm("queryForm");
      // this.handleQuery();
    },
    // // 多选框选中数据
    handleSelectionChange(selection) {
      // this.ids = selection.map((item) => item.noticeId);
      // this.single = selection.length != 1;
      // this.multiple = !selection.length;
    },
    /** 新增班级按钮操作 */
    handleAdd() {
      this.reset(); //表单清空
      this.open = true; //弹出对话框
      this.title = "新建班级";
    },
    // 删除空班级操作
    handleDelete(row) {
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
      // 确认得根据返回消息确定是否删除空班级成功——这里默认错误
      this.$message({
        showClose: true,
        message: "班级编号末尾班级目前仍有成员，请调出所有成员后重试！",
        type: "error",
      });
    },

    // /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset();
    //   const noticeId = row.noticeId || this.ids;
    //   getNotice(noticeId).then((response) => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改公告";
    //   });
    // },
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
.delete {
  color: #eb3842;
  border-color: #eb3842;
}
.export {
  color: #005657;
  border-color: #005657;
}
.confirm {
  background-color: #005657;
}
.record_icon {
  color: #005657;
  margin-top: 2px;
  margin-right: 5px;
}
.record_icon + span {
  color: #005657;
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
  width: 120px;
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
.pagination-container {
  margin-top: 0px;
  height: 100%;
}
.el-pagination {
  margin-top: 20px;
}
</style>
