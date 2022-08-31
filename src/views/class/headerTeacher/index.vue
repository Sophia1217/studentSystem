<template>
  <div class="banji">
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
          ></el-option>
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
          ></el-option>
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
          ></el-option>
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
      <h3 class="bjtitle-item">
        班主任管理列表<span class="iconfont repeat_icon">&#xe7b1; </span>
      </h3>
    </div>

    <!-- 班级列表 -->
    <el-table :data="noticeList" @sort-change="changeTableSort">
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
      />
      <el-table-column
        label="培养单位"
        align="center"
        prop="ssdwmc"
        sortable="custom"
      />
      <el-table-column
        label="培养层次"
        align="center"
        prop="pyccName"
        sortable="custom"
      />
      <el-table-column
        label="年级"
        align="center"
        prop="ssnj"
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
          <div class="tea-handle" v-if="fpbzr">
            <span class="iconfont allocate_teacher" @click="action(scope.row)"
              >&#xe638;</span
            >
            <!-- <span :class="true ? 'spanF' : 'spanT'" @click="action(scope.row)"> -->
            <span
              style="color: #005657; margin-left: 5px; margin-right: 5px"
              @click="action(scope.row)"
            >
              分配班主任
            </span>
          </div>
          <div class="tea-handle" v-if="rejl">
            <span
              class="iconfont record_icon"
              style="margin-left: 5px"
              @click="record(scope.row)"
              >&#xe694;</span
            >
            <span style="color: #005657" @click="record(scope.row)">
              任职记录
            </span>
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
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="培养层次" prop="noticeType">
              <el-select
                v-model="form.noticeType"
                placeholder="本科"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属年级">
              <el-select
                v-model="form.noticeType"
                placeholder="2022"
              ></el-select>
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
        <el-button type="primary" class="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/person/iconfont.css";
import {
  classList,
  getCollege,
  getLevel,
  getGrade,
} from "@/api/class/maintenanceClass"; // 引入班级列表查询、修改班级名称接口
import { getHeaderTeacher, queryRecords } from "@/api/class/headerTeacher";
export default {
  name: "headerTeacher", //班主任
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
      // 是否显示新建班级弹出层
      open: false,
      // 是否显示删除空班级弹出层
      dialogVisible: false,
      // 查询参数
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        ssdwdmList: [], // 培养单位
        pyccList: [], // 培养层次
        ssnjList: [], // 年级
        bjmc: "", //班级名称
        orderField: "",
        orderType: "", // 0是asc升序，1是desc降序
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
      menuVal: this.$store.state.permission.topbarRouters,
      Jr: [],
      rejl: true,
      fpbzr: true,
    };
  },
  mounted() {
    this.getList(this.queryParams);
    this.getOptions();
    this.getData(this.menuVal);
    this.rejl = this.Jr.includes("0302");
    this.fpbzr = this.Jr.includes("0307");
  },
  methods: {
    getData(data) {
      for (var i in data) {
        this.Jr.push(data[i].modId); //将第一层的保存出来，
        if (data[i].children) {
          // if(data[i].length >)
          this.getData(data[i].children);
        }
      }
      return this.Jr;
    },
    // 查询班级列表
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
    // 筛选框表单重置
    resetForm() {
      this.queryParams = {};
    },
    // 查询按钮操作
    handleQuery() {
      this.getList(this.queryParams);
    },
    // /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 新建班级-取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {};
      this.resetForm("form");
    },
    // 分配班主任
    action(row) {
      this.$router.push({
        path: "/class/classTeacher",
        query: { bjmc: row.bjmc, bjdm: row.bjdm },
      });
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
    // 任职记录表
    record(row) {
      this.$router.push({
        path: "./record",
        query: { bjdm: row.bjdm },
      });
    },
    changeTableSort(column) {
      this.queryParams.orderField = column.prop;
      this.queryParams.orderType =
        column.order === "descending" ? "desc" : "asc"; // 0是asc升序，1是desc降序
      this.getList(this.queryParams);
    },
  },
};
</script>

<style scoped>
.banji {
  max-width: 100%;
  /* height: 100%; */
  padding: 20px;
  background-color: white;
}
.spanT {
  pointer-events: auto;
  color: #005657;
  margin-left: 5px;
  margin-right: 5px;
}
.spanF {
  pointer-events: none;
  color: #cce0e1ff;
  margin-left: 5px;
  margin-right: 5px;
}
.tea-handle {
  cursor: pointer;
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
.allocate_teacher {
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
  transform: translateX(-80%);
}
/* .el-notification__title {
      color: #ed5234;
    } */
.bjtitle-item {
  display: inline-block;
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
  height: auto;
}
.el-pagination {
  margin-top: 20px;
}
.el-textarea.el-input--medium {
  display: inline-block;
  width: 80%;
}
</style>
