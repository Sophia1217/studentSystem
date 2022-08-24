<template>
  <div class="operate-class">
    <div class="tab">
      <div class="tab_list">
        <ul>
          <li
            class="tab_title_item"
            v-for="(title, index) in tab_title"
            :class="currentIndex == index ? 'activate' : ''"
            :key="title"
            @click="tabClick(index)"
          >
            {{ title }}
          </li>
        </ul>
      </div>
      <div class="tab_con">
        <!-- 页签1 -->
        <div class="class_info tab_item" v-show="currentIndex == 0">
          <el-form
            :model="queryParams"
            ref="queryForm"
            size="small"
            :inline="true"
            v-show="showSearch"
            label-width="68px"
            class="table-header"
          >
            <el-form-item label="专业" prop="zydm" class="header-item">
              <el-select
                v-model="queryParams.zydm"
                placeholder="未选择"
                clearable
              >
                <el-option
                  v-for="(item, index) in majorOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="生源地" prop="syd" class="header-item">
              <el-select
                v-model="queryParams.syd"
                placeholder="未选择"
                clearable
              >
                <el-option
                  v-for="(item, index) in sydOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex" class="header-item">
              <el-select
                v-model="queryParams.sex"
                placeholder="未选择"
                clearable
              >
                <el-option
                  v-for="(item, index) in sexOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="学号" prop="xh" class="header-item">
              <el-input
                v-model="queryParams.xh"
                placeholder="请输入学号"
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
              <span class="title-item">{{ $route.query.bjmc }}学生列表</span>
              <span class="iconfont">&#xe631;</span>
              <el-row :gutter="10" class="mb8" style="float: right">
                <el-col :span="1.5">
                  <el-button class="export" @click="mbDown">
                    <!-- <span class="iconfont icon-daochu-06"></span> -->
                    模板下载</el-button
                  >
                </el-col>
                <el-col :span="1.5">
                  <el-upload
                    accept=".xlsx,.xls"
                    :auto-upload="true"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :data="fileData"
                    :on-success="upLoadSuccess"
                    :on-error="upLoadError"
                  >
                    <el-button class="export"> 导入</el-button>
                  </el-upload>
                </el-col>
                <el-col :span="1.5">
                  <el-button class="export" @click="handleExport">
                    <span class="iconfont icon-daochu-06"></span>
                    导出</el-button
                  >
                </el-col>
                <el-col :span="1.5">
                  <el-button
                    type="primary"
                    class="create"
                    icon="el-icon-search"
                    @click="handleChange(0)"
                  >
                    调整班级</el-button
                  >
                </el-col>
                <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
              </el-row>
            </div>
            <!-- v-loading="loading" -->
            <el-table
              :data="noticeList"
              @selection-change="handleSelectionChange($event)"
              class="table-body"
            >
              <el-table-column type="selection" width="65" align="center" />
              <el-table-column
                label="序号"
                align="center"
                prop="id"
                type="index"
              />
              <el-table-column label="学号" align="center" prop="xh" sortable />
              <el-table-column label="姓名" align="center" prop="xm" sortable>
              </el-table-column>
              <el-table-column label="性别" align="center" prop="xb" sortable />
              <el-table-column
                label="培养单位"
                align="center"
                prop="ssdw"
                sortable
              >
              </el-table-column>
              <el-table-column label="专业" align="center" prop="zy" sortable />
              <el-table-column
                label="培养层次"
                align="center"
                prop="pyccName"
                sortable
              />
              <el-table-column
                label="年级"
                align="center"
                prop="ssnj"
                sortable
              />
              <el-table-column
                label="生源地"
                align="center"
                prop="syd"
                sortable
              />
              <el-table-column
                label="出生年月"
                align="center"
                prop="csrq"
                sortable
              />
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
        <!-- 页签2 -->
        <div class="stu_info tab_item" v-show="currentIndex == 1">
          <el-form
            :model="queryParams1"
            ref="queryForm"
            size="small"
            :inline="true"
            v-show="showSearch"
            label-width="68px"
            class="table-header"
          >
            <el-form-item label="专业" prop="zydm" class="header-item">
              <el-select
                v-model="queryParams1.zydm"
                placeholder="未选择"
                clearable
              >
                <el-option
                  v-for="(item, index) in majorOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="生源地" prop="syd" class="header-item">
              <el-select
                v-model="queryParams1.syd"
                placeholder="未选择"
                clearable
              >
                <el-option
                  v-for="(item, index) in sydOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex" class="header-item">
              <el-select
                v-model="queryParams1.sex"
                placeholder="未选择"
                clearable
              >
                <el-option
                  v-for="(item, index) in sexOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="学号" prop="xh" class="header-item">
              <el-input
                v-model="queryParams1.xh"
                placeholder="请输入学号"
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
              <span class="title-item">未分配学生列表</span>
              <span class="iconfont">&#xe631;</span>
              <el-row :gutter="10" class="mb8" style="float: right">
                <el-col :span="1.5">
                  <el-button
                    type="primary"
                    class="create"
                    icon="el-icon-search"
                    @click="handleChange(1)"
                  >
                    调入班级</el-button
                  >
                </el-col>
                <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
              </el-row>
            </div>
            <!-- v-loading="loading" -->
            <el-table
              :data="noticeList"
              @selection-change="handleSelectionChange($event)"
              class="table-body"
            >
              <el-table-column type="selection" width="65" align="center" />
              <el-table-column
                label="序号"
                align="center"
                prop="id"
                type="index"
              />
              <el-table-column label="学号" align="center" prop="xh" />
              <el-table-column label="姓名" align="center" prop="xm">
              </el-table-column>
              <el-table-column label="性别" align="center" prop="xb" />
              <el-table-column label="培养单位" align="center" prop="ssdw">
              </el-table-column>
              <el-table-column label="专业" align="center" prop="zy" />
              <el-table-column label="培养层次" align="center" prop="pyccm" />
              <el-table-column label="年级" align="center" prop="ssnj" />
              <el-table-column label="生源地" align="center" prop="syd" />
              <el-table-column label="出生年月" align="center" prop="csrq" />
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
    </div>

    <!-- 调整班级对话框 -->
    <el-dialog
      class="change_class"
      :title="title"
      :visible.sync="open"
      width="780px"
      append-to-body
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-row class="change_row">
          <el-col :span="10">
            <el-form-item label="当前学院">
              <el-input :placeholder="$route.query.pydwmc" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="培养层次">
              <el-input :placeholder="$route.query.pyccName" disabled>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="change_row">
          <el-col :span="10">
            <el-form-item label="班级编号">
              <el-input :placeholder="$route.query.bjdm" disabled> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="当前班级">
              <el-input :placeholder="$route.query.bjmc" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="change_row">
          <el-col :span="22" class="in_class" prop="inClass">
            <el-form-item label="转入班级">
              <el-select v-model="form.inClass" placeholder="未选择">
                <el-option
                  v-for="(item, index) in classList"
                  :key="index"
                  :label="item.bjmc"
                  :value="item.bjdm"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel_btn" @click="open = false">取消</el-button>
        <el-button class="submit_btn" @click="outClass">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/export/iconfont.css";
import "@/assets/fonts/refresh/iconfont.css";
import {
  getStuList,
  queryWfbStuList,
  transformStuToOtherClass, // 把页签1班级学生移入另一班级
  transformStuFromEmptyClass, // 将未分班学生移入页签1所在班级
  getTransformClasses, // 获取班级下拉列表
  getSyd,
  getMajors,
  getSex,
  expStu,
  mbDown,
  importtable,
} from "@/api/class/divisionClass";

export default {
  name: "divisionClass", //分班管理
  data() {
    return {
      // tab栏切换
      tab_title: [this.$route.query.bjmc, "未分配学生名单"],
      currentIndex: 0, // 0代表展示某一班级学生名单，1代表展示未分配学生名单
      uploadUrl: process.env.VUE_APP_BASE_API + "/class/importExcel", // 上传的图片服务器地址

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
      sydOptions: [],
      majorOptions: [],
      sexOptions: [],
      // 多选框勾选的数据
      list: [],
      // 弹出层标题
      title: "",
      // 是否显示调整班级弹出层
      open: false,
      // 是否显示转入班级弹出层
      visible: false,
      // 查询参数——某一班级学生的查询参数
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        zydm: "", // 专业代码
        syd: "", // 生源地代码
        sex: "", // 性别代码
        xh: "", // 学号
        bjdm: this.$route.query.bjdm, // 班级编号
      },
      // 查询参数——未分配学生名单的查询参数
      queryParams1: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        pydw: this.$route.query.pydw, // 培养单位代码
        pycc: this.$route.query.pycc, // 培养层次码
        ssnj: this.$route.query.ssnj, // 年级
        zydm: "", // 专业代码
        syd: "", // 生源地代码
        sex: "", // 性别代码
        xh: "", // 学号
      },
      // 收集的是转入的班级的编号
      form: {},
      classList: [],
    };
  },
  computed: {
    fileData: {
      get() {
        return {
          classNum: this.$route.query.bjdm,
        };
      },
    },
  },
  mounted() {
    this.getList(this.queryParams); // 页面一挂载就默认展示某一特定班级学生名单
    this.getOptions(); // 获取生源地、专业、性别筛选框数据
  },
  methods: {
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },

    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
    mbDown() {
      mbDown().then((res) => this.downloadFn(res, "标准模板下载", "xlsx"));
    },
    // 查询某一特定班级学生列表
    getList(queryParams) {
      Object.assign(queryParams, this.queryParams);
      getStuList(queryParams).then((res) => {
        if (res.errcode == "00") {
          this.noticeList = res.data.rows;
          this.total = res.data.total;
        }
      });
    },
    handleExport() {
      var arr = this.list.length > 0 ? this.list.map((item) => item.xh) : [];
      var data = { stuXhList: arr };
      Object.assign(data, this.queryParams);
      expStu(data).then((res) => this.downloadFn(res, "分班管理名单", "xlsx"));
    },
    // 查询未分配学生列表数据
    getList1(queryParams) {
      Object.assign(queryParams, this.queryParams1);
      queryWfbStuList(queryParams).then((res) => {
        if (res.errcode == "00") {
          this.noticeList = res.data.rows;
          this.total = res.data.total;
        }
      });
    },
    getOptions() {
      // 获取生源地
      getSyd().then((response) => {
        // 获取培养单位列表数据
        this.sydOptions = response.data.rows;
        //  this.loading = false;
      });
      // 获取专业
      getMajors({ pyccm: this.$route.query.pycc }).then((response) => {
        // 获取培养层次列表数据
        console.log("Res", response);
        this.majorOptions = response.data.rows;
      });
      // 获取性别
      getSex().then((response) => {
        // 获取年级列表数据
        this.sexOptions = response.data.rows;
      });
    },
    // tab栏切换
    tabClick(index) {
      this.noticeList = [];
      this.currentIndex = index;
      this.handleQuery();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.currentIndex == 0) {
        // 根据当前index确定学生列表的请求参数
        this.getList(this.queryParams);
      } else {
        this.getList1(this.queryParams1);
        this.getOptions(); // 获取生源地、专业、性别筛选框数据
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
      if (this.currentIndex == 0) {
        this.queryParams = {
          pageNum: 1, // 默认请求第一页数据
          pageSize: 10, // 默认一页10条数据
          zydm: "", // 专业代码
          syd: "", // 生源地代码
          sex: "", // 性别代码
          xh: "", // 学号
          bjdm: this.$route.query.bjdm, // 班级编号
        };
        this.getList(this.queryParams);
      } else {
        this.queryParams1 = {
          pageNum: 1, // 默认请求第一页数据
          pageSize: 10, // 默认一页10条数据
          pydw: this.$route.query.ssdwdm, // 培养单位代码
          pycc: this.$route.query.pycc, // 培养层次码
          ssnj: this.$route.query.ssnj, // 年级
          zydm: "", // 专业代码
          syd: "", // 生源地代码
          sex: "", // 性别代码
          xh: "", // 学号
        };
        this.getList1(this.queryParams1);
        this.getOptions(); // 获取生源地、专业、性别筛选框数据
      }
    },
    // 多选框选中数据
    handleSelectionChange(arr, index) {
      this.list = [...arr]; // 存储已被勾选的数据
    },
    /** 调整班级操作 */
    handleChange(action) {
      // 调入空班级
      if (action == 0) {
        // 弹出调入空班级弹出框
        this.open = true;
        // 整理参数
        const params = {};
        params.ssdw = this.$route.query.pydw;
        params.pycc = this.$route.query.pycc;
        params.ssnj = this.$route.query.ssnj;
        params.bjdm = this.$route.query.bjdm;
        // 获取班级下拉列表数据
        getTransformClasses(params).then((response) => {
          if (response.errcode == "00") {
            this.classList = response.data.rows;
          }
        });
      }
      // 从空班级调入
      else {
        if (this.list.length > 0) {
          var arr = [];
          this.list.forEach((item) => {
            arr.push(item.xh);
          });
          var data = {
            stuXhList: arr,
            bjdm: this.$route.query.bjdm,
          };
          transformStuFromEmptyClass(data).then((res) => {
            if (res.flag) {
              this.$message({
                message: "调入班级成功",
                type: "success",
              });
              this.getList1(this.queryParams1);
            } else {
              this.$message({
                message: "调入班级失败",
                type: "error",
              });
            }
          });
        } else {
          this.$message.error("至少勾选一条数据");
        }
      }
      this.title = "调整班级";
    },
    // 将页签1的学生转入某一班级——确认操作
    outClass() {
      // 关闭弹出框
      this.open = false;
      // 调整参数
      const arr = [];
      this.list.forEach((item) => {
        arr.push(item.xh);
      });
      transformStuToOtherClass({
        stuXhList: arr,
        bjdm: this.form.inClass,
      }).then((response) => {
        if (response.flag == true) {
          this.$message({
            message: "调整班级成功",
            type: "success",
          });
          // 重新请求未分配学生列表数据
          this.getList(this.queryParams);
        } else {
          this.$message({
            message: "调整班级失败",
            type: "error",
          });
        }
      });
      this.list = [];
      // 清空可选班级参数
      this.classList = [];
    },
  },
};
</script>
<style>
.operate-class {
  background-color: #f0f0f0;
  height: 100vh;
}
/* tab前端开始 */
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

/* tab切换结束 */
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
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.tab_con {
  height: 100vh;
}
.table-content {
  padding-top: 32px;
  padding-left: 40px;
  padding-right: 40px;
  height: 100vh !important;
  background-color: #ffffff;
  margin-top: 24px;
}
.table-body {
  left: 50%;
  transform: translate(-50%);
}

.table-body::before {
  height: 0;
}

.title {
  margin-bottom: 32px;
  margin: 0px auto 30px auto;
  /* text-align: center; */
  color: #707070;
}
.title-item {
  width: 1000px;
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

/* 调整班级对话框开始 */
.change_class {
  top: 30%;
  font-weight: 700;
}

.change_row {
  display: flex;
  justify-content: space-around;
}

.cancel_btn {
  background-color: #ffffff;
  font-size: 14px;
  color: #1f1f1f;
}

.submit_btn {
  background-color: #005657;
  font-size: 14px;
  color: #ffffff;
}
/* 调整班级对话框结束 */
</style>
