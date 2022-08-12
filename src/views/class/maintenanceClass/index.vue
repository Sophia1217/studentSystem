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
      <el-form-item label="培养单位" prop="ssdwdm">
        <el-select v-model="queryParams.ssdwdm" placeholder="未选择" clearable>
          <el-option
            v-for="(item, index) in collegeOptions"
            :key="index"
            :label="item.mc"
            :value="item.dm"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="培养层次" prop="pycc">
        <el-select v-model="queryParams.pycc" placeholder="未选择" clearable>
          <el-option
            v-for="(value, key, index) in levelOptions"
            :key="index"
            :label="value"
            :value="key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop="ssnj">
        <el-select v-model="queryParams.ssnj" placeholder="未选择" clearable>
          <el-option
            v-for="(item, index) in gradeOptions"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="班级编号" prop="bjdm">
        <el-input
          v-model="queryParams.bjdm"
          placeholder="未选择"
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
        </el-col>
        <el-col :span="1.5">
          <el-button class="export">
            <span class="iconfont icon-daochu-06"></span>
            导出班级名单</el-button
          >
        </el-col>
        <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
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
      <el-table-column label="年级" align="center" prop="ssnj" sortable />
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
        <template slot-scope="scope">
          <div>
            <span @click="handleDelete(scope.row.bjdm)" class="deleteClass"
              >删除空班级</span
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

    <!-- 新建班级对话框 -->
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
            <el-form-item label="所属学院" prop="pydw">
              <el-select v-model="form.pydw" placeholder="未选择">
                <el-option
                  v-for="(item, index) in collegeOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="培养层次" prop="pycc">
              <el-select v-model="form.pycc" placeholder="请选择">
                <el-option
                  v-for="(value, key, index) in levelOptions"
                  :key="index"
                  :label="value"
                  :value="key"
                ></el-option
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属年级" prop="ssnj">
              <el-select v-model="form.ssnj" placeholder="请选择">
                <el-option
                  v-for="(item, index) in gradeOptions"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级数量" prop="classNum">
              <!-- <editor v-model="form.noticeContent" :min-height="192" /> -->
              <el-input v-model="form.classNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm" class="confirm"
          >确定</el-button
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
        <el-button @click="classCancel">取消</el-button>
        <el-button type="primary" @click="deleteConfirm" class="confirm"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 删除空班级对话框-确认按钮-显示提醒消息 -->
  </div>
</template>

<script>
import "@/assets/fonts/repeat/iconfont.css";
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
  name: "maintenanceClass",
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
  data() {
    return {
      // 2.删除空班级:当前班级编号
      // currentBjbm: { bjdm: "" },
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
      bjdm: "",
      // 表格数据
      /* 
        {
          bjdm: '', // 班级编号
          bjmc: "", // 班级名称
          pydw: "计算机工程学院", // 培养单位-目前这一列缺失
          ssnj: "", // 年级
          pycc: "", // 培养层次
          stuNumOfClass: 0, // 班级数量
          createTime: "", // 创建时间
        }
      */
      // 班级列表数据
      noticeList: [],
      // 筛选框数据
      collegeOptions: [],
      levelOptions: {},
      gradeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示新建班级弹出层
      open: false,
      // 是否显示删除空班级弹出层
      dialogVisible: false,
      // 查询参数
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        ssdwdm: "", // 培养单位
        pycc: "", // 培养层次
        ssnj: "", // 年级
        bjdm: "", // 班级编号
      },
      // 新建班级表单参数
      form: {
        pydw: "", // 培养单位
        pycc: "", // 培养层次
        ssnj: "", // 年级
        classNum: 0, // 新建班级数
      },
      // 表单校验
      rules: {
        collegeContent: [
          { required: true, message: "所属学院为空", trigger: "blur" },
        ],
        levelContent: [
          { required: true, message: "培养层次不能为空", trigger: "change" },
        ],
        sizeContent: [
          { required: true, message: "年级不能为空", trigger: "change" },
        ],
        numsContent: [
          { required: true, message: "班级数量不能为空", trigger: "change" },
        ],
      },
    };
  },
  // 组件创建完请求数据
  mounted() {
    // this.getList({ bjdm: this.queryParams.classId });  // { pydw, pycc, ssnj, bjdm: this.queryParams.classId, pageNum-Y, pageSize-Y}
    this.getList();
    this.getOptions();
  },
  methods: {
    // // 查看班级操作记录
    // showRecord(row) {
    //   // const Id = row.roleId;
    //   // this.$router.push("/class/role-auth/user/" + roleId);
    //   this.$router.push("/class/record");
    // },
    /** 根据培养单位college、培养层次level、年级grade、班级编号classId、查询班级列表、页码pageNum、每页条数pageSize*/
    getList(queryParams = {}) {
      // this.loading = true;
      classList(queryParams).then((response) => {
        // 获取班级列表数据
        this.noticeList = response.data.rows; // 根据状态码接收数据
        //  this.total = response.total;
        //  this.loading = false;
      });
    },
    getOptions() {
      getCollege().then((response) => {
        // 获取培养单位列表数据
        this.collegeOptions = response.data.rows;
        //  this.loading = false;
      });
      getLevel().then((response) => {
        // 获取培养层次列表数据
        this.levelOptions = response.rows;
      });
      getGrade().then((response) => {
        // 获取年级列表数据
        this.gradeOptions = response.rows;
      });
    },
    // 修改班级名称回调
    alterClassName(row) {
      // 整理参数
      const { bjdm, bjmc } = row;
      console.log({ bjdm, bjmc });
      modifyClassName({ bjdm, bjmc }).then((response) => {
        //response：{new className: '计算机学院硕士2020级5班'} {"fail to modify className": false}
        if (response.flag == true) {
          this.$message({
            showClose: true,
            message: "修改班级名称成功",
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: "修改班级名称失败",
            type: "error",
          });
        }
        // 根据返回状态码确定是否修改成功——成功则重新请求数据刷新页面后弹出信息提醒；失败也弹出信息提醒
      });
    },
    // 新建班级-取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        pydw: undefined,
        pycc: undefined,
        ssnj: undefined,
        classNum: undefined,
        status: "0",
      };
      this.resetForm("form");
    },
    // /** 搜索按钮操作 */
    handleQuery() {
      this.getList(this.queryParams);
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
      // 获取筛选框数据
      this.getOptions();
      this.reset(); //表单清空
      this.open = true; //弹出对话框
      this.title = "新建班级";
    },
    // 删除空班级操作
    handleDelete(bjdm) {
      // this.reset();
      this.dialogVisible = true;
      this.bjdm = bjdm; // 待删除的空班级班级编号，先提前存起来
      this.title = "删除空班级";
    },
    // 删除空班级-确认操作
    deleteConfirm(row) {
      deleteEmptyClass("6860320005").then((response) => {
        this.dialogVisible = false;
        if (response.flag == true) {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: "删除失败",
            type: "error",
          });
        }
        this.getList();
      });
    },
    // 删除空班级-取消操作
    classCancel() {
      this.dialogVisible = false;
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
    /** 新建班级确定操作 */
    submitForm() {
      addClass(this.form).then((response) => {
        // 弹出框消失
        this.open = false;
        if (response.errcode == "00") {
          // 显示创建成功消息提醒
          this.$message({
            message: "新建班级成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "新建班级失败",
            type: "error",
          });
        }
        this.getList();
      });
    },
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

.el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  width: fit-content;
}

.deleteClass {
  cursor: pointer;
}
</style>
