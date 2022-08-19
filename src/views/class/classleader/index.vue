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
        <el-input v-model="queryParams.bjdm" placeholder="未选择" clearable />
        <!--           @keyup.enter.native="handleQuery" -->
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          class="search"
          @click="handleQuery"
          >查询</el-button>
        <el-button size="mini" @click="resetQuery" class="reset">
          <span class="iconfont reset_icon">&#xe614;</span>
          重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <h3 class="title-item">
        班级列表<span class="iconfont repeat_icon">&#xe7b1; </span>
      </h3>
    </div>

    <!-- 班级列表 -->
    <el-table :data="noticeList" @selection-change="handleSelectionChange">
      <el-table-column label="序号" align="center" type="index" />
      <el-table-column label="班级编号" align="center" prop="bjdm" sortable />
      <el-table-column
        label="班级名称"
        align="center"
        width="250px"
        prop="bjmc"
        sortable
      />
      <el-table-column label="培养单位" align="center" prop="ssdw" sortable />
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
            <span class="iconfont allocate_teacher">&#xe638;</span>
            <span
              class="leaderAssign"
              style="color: #005657; margin-left: 5px"
              @click="leaderAssign(scope.row)"
            >
              班干部任命
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
  </div>
</template>

<script>
import "@/assets/fonts/person/iconfont.css";
import {
  classList, //班级列表查询接口
  modifyClassName,
  getCollege,
  getLevel,
  getGrade,
  addClass,
  deleteEmptyClass,
} from "@/api/class/maintenanceClass";

export default {
  name: "classleader", //班干部管理
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
      total: 0,
      // 表格数据
      noticeList: [],
      // 班干部列表
      queryBgbList: [],
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
  mounted() {
    this.getList();
    this.getOptions();
  },
  methods: {
    getList(data = {}) {
      var data = this.queryParams;
      classList(data).then((response) => {
        // 获取班级列表数据
        this.noticeList = response.data.rows; // 根据状态码接收数据
        this.total = response.data.total;
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
    // 查询按钮
    handleQuery() {
      console.log("查询按钮");
      this.getList(this.queryParams);
      // getQueryBgbList({bjdm:this.queryParams.bjdm,pageNum: 1, pageSize: 10}).then(res=>{
      //   console.log(res);
      // })
    },
    // 重置按钮
    resetQuery() {
      console.log("重置按钮执行");
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      // this.ids = selection.map((item) => item.noticeId);
      // this.single = selection.length != 1;
      // this.multiple = !selection.length;
    },
    // 班干部任命
    leaderAssign(row) {
      this.$router.push({
        path: "/class/leaderAssign",
        query: {bjdm:row.bjdm, bjmc: row.bjmc },
      });
    },
  },
};
</script>

<style scoped>
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
  height: 100%;
}
.el-pagination {
  margin-top: 20px;
}
.el-textarea.el-input--medium {
  display: inline-block;
  width: 80%;
}

/* 班干部任命按钮 */
.leaderAssign {
  cursor: pointer;
}
</style>
