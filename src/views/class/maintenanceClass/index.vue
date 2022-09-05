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
        <el-select
          v-model="queryParams.ssdwdmList"
          placeholder="未选择"
          clearable
          multiple
        >
          <el-option
            v-for="(item, index) in collegeOptions"
            :key="index"
            :label="item.mc"
            :value="item.dm"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="培养层次" prop="pycc">
        <el-select
          v-model="queryParams.pyccList"
          placeholder="未选择"
          clearable
          multiple
        >
          <el-option
            v-for="(item, index) in levelOptions"
            :key="index"
            :label="item.mc"
            :value="item.dm"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop="ssnj">
        <el-select
          v-model="queryParams.ssnjList"
          placeholder="未选择"
          clearable
          multiple
        >
          <el-option
            v-for="(item, index) in gradeOptions"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称" prop="bjmc">
        <el-input
          v-model="queryParams.bjmc"
          placeholder="请输入班级名称"
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
          <el-button class="export" @click="handleExport">
            <span class="iconfont icon-daochu-06"></span>
            导出班级名单</el-button
          >
        </el-col>
        <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
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
        sortable="custom"
      />
      <el-table-column
        label="班级名称"
        align="center"
        width="250px"
        prop="bjmc"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <el-input
            v-model="row.bjmc"
            clearable
            width="200px"
            @blur="alterClassName(row)"
            @keyup.enter.native="alterClassName(row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="培养单位"
        align="center"
        prop="ssdwmc"
        sortable="custom"
      />
      <el-table-column
        label="年级"
        align="center"
        prop="ssnj"
        sortable="custom"
      />
      <el-table-column
        label="培养层次"
        align="center"
        prop="pyccName"
        sortable="custom"
      />
      <el-table-column
        label="班级人数"
        align="center"
        prop="stuNumOfClass"
        sortable="custom"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        sortable="custom"
      />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        sortable="custom"
        class-name="small-padding fixed-width"
      />
      <el-table-column
        label="操作"
        align="center"
        sortable
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <div class="deleteBtn" @click="handleDelete(scope.row.bjdm)">
            <i class="el-icon-delete"></i>删除空班级
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
                  v-for="(item, index) in levelOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                >
                </el-option>
              </el-select>
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
  exportClassList,
  getCollege,
  getLevel,
  getGrade,
  addClass,
  deleteEmptyClass,
  expClass,
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
      total: 0,
      bjdm: "",
      // 班级列表数据
      noticeList: [],
      // 筛选框数据
      collegeOptions: [],
      levelOptions: [],
      gradeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示新建班级弹出层
      open: false,
      // 是否显示删除空班级弹出层
      dialogVisible: false,
      // 查询参数
      list: [],
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        ssdwdmList: [], // 培养单位
        pyccList: [], // 培养层次
        ssnjList: [], // 年级
        bjmc: "", //班级名称
        orderField: "", //
        orderType: "",
        //roleId: this.$store.state.user.roleId,
        //userId: this.$store.state.user.userId,
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
    // exportClassList({}).then((res) => {
    //   console.log(res);
    // });
    this.getList(this.queryParams);
    this.getOptions();
  },
  activated() {},
  methods: {
    // // 查看班级操作记录
    // showRecord(row) {
    //   // const Id = row.roleId;
    //   // this.$router.push("/class/role-auth/user/" + roleId);
    //   this.$router.push("/class/record");
    // },
    /** 根据培养单位college、培养层次level、年级grade、班级编号classId、查询班级列表、页码pageNum、每页条数pageSize*/
    getList(queryParams) {
      // this.loading = true;
      // debugger;
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
    handleExport() {
      var arr = this.list.length > 0 ? this.list.map((item) => item.bjdm) : [];
      var data = { bjdmList: arr };
      Object.assign(data, this.queryParams);
      expClass(data).then((res) => this.downloadFn(res, "班级名单", "xlsx"));
    },
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
    // 修改班级名称回调
    alterClassName(row) {
      // 整理参数
      const { bjdm, bjmc } = row;

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
    // 筛选框表单重置
    resetForm() {
      this.queryParams = {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        ssdwdmList: [], // 培养单位
        pyccList: [], // 培养层次
        ssnjList: [], // 年级
        bjdm: "", // 班级编号
        orderField: "", //
        orderType: "",
      };
    },
    // /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList(this.queryParams);
    },
    changeTableSort(column) {
      //console.log("sadada", this.$store.state);
      this.queryParams.orderField = column.prop;
      this.queryParams.orderType =
        column.order === "descending" ? "desc" : "asc"; // 0是asc升序，1是desc降序
      this.handleQuery();
    },
    // /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // // 多选框选中数据
    handleSelectionChange(selection) {
      this.list = [...selection];
      console.log("list", this.list);
    },
    /** 新增班级按钮操作 */
    handleAdd() {
      this.reset(); //表单清空
      // 获取筛选框数据
      this.getOptions();
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
      deleteEmptyClass({ bjdm: this.bjdm }).then((response) => {
        this.dialogVisible = false;
        // if (response.flag == true) {
        this.$message({
          showClose: true,
          message: "删除成功",
          type: "success",
        });
        // } else {
        //   this.$message({
        //     showClose: true,
        //     message: "班级代码编号末尾班级目前仍有成员，请调出所有成员后重试",
        //     type: "error",
        //   });
        // }
        this.getList(this.queryParams);
      });
    },
    // 删除空班级-取消操作
    classCancel() {
      this.dialogVisible = false;
    },
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
        this.getList(this.queryParams);
      });
    },
  },
};
</script>
<style scoped>
.app-container {
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
.deleteBtn {
  color: #005657;
  cursor: pointer;
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
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.pagination-container {
  margin-top: 0px;
  height: 100px;
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
