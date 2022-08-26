<template>
  <div class="division-class">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      class="table-header"
    >
      <el-form-item label="培养单位" prop="ssdwdm" class="header-item">
        <el-select v-model="queryParams.ssdwdm" placeholder="未选择" clearable>
          <el-option
            v-for="(item, index) in collegeOptions"
            :key="index"
            :label="item.mc"
            :value="item.dm"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="培养层次" prop="pycc" class="header-item">
        <el-select v-model="queryParams.pycc" placeholder="未选择" clearable>
          <el-option
            v-for="(item, index) in levelOptions"
            :key="index"
            :label="item.mc"
            :value="item.dm"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop="ssnj" class="header-item">
        <el-select v-model="queryParams.ssnj" placeholder="未选择" clearable>
          <el-option
            v-for="(item, index) in gradeOptions"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="班级编号" prop="bjdm" class="header-item">
        <el-input
          v-model="queryParams.bjdm"
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
    <div class="table-content">
      <div class="title" icon="el-icon-refresh">
        <span class="title-item">班级列表</span>
        <span class="iconfont">&#xe631;</span>
      </div>
      <!-- v-loading="loading" -->
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
        <el-table-column
          label="培养单位"
          align="center"
          prop="ssdwmc"
          sortable="custom"
        >
        </el-table-column>
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
            <div @click="operate(scope.row)" class="operate">
              <span class="operateSpan">分班管理</span>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
      />
    </div>
  </div>
</template>

<script>
import "@/assets/fonts/export/iconfont.css";
import AppLink from "@/layout/components/Sidebar/Link.vue";
import "@/assets/fonts/refresh/iconfont.css";

import {
  classList,
  getCollege,
  getLevel,
  getGrade,
} from "@/api/class/maintenanceClass"; // 引入班级列表查询、修改班级名称接口
import { getQueryStuList } from "@/api/class/divisionClass";
export default {
  name: "divisionClass", //分班管理
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
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
      // 筛选框数据
      collegeOptions: [],
      levelOptions: [],
      gradeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
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
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.getList();
    this.getOptions();
  },
  methods: {
    getList() {
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
        this.levelOptions = response.data.rows;
      });
      getGrade().then((response) => {
        // 获取年级列表数据
        this.gradeOptions = response.data.rows;
      });
    },
    // 查询按钮
    handleQuery() {
      this.getList(this.queryParams);
    },
    // /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {};
      this.handleQuery();
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    // 分班管理
    operate(row) {
      this.$router.push({
        path: "/class/operateClass",
        query: {
          bjmc: row.bjmc,
          bjdm: row.bjdm,
          pydw: this.queryParams.ssdwdm || row.ssdw, // 培养单位代码
          pydwmc: row.ssdwmc, // 培养单位名称
          pyccName: this.queryParams.pycc || row.pyccName, // 培养层次名字
          pycc: row.pycc, // 培养层次码
          ssnj: this.queryParams.ssnj || row.ssnj, // 年级
        },
      });
    },
  },
};
</script>
<style>
.division-class {
  background-color: #f0f0f0;
  margin-top: 10px;
}

.table-header {
  background-color: #ffffff;
  height: 128px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
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
  text-align: left;
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
.operateSpan {
  font-family: "PingFangSC-Regular";
  font-weight: 700;
  font-size: 14px;
  color: #005657;
}
</style>
