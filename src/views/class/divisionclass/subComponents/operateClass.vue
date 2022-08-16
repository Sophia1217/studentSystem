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
            <el-form-item label="专业" prop="noticeType" class="header-item">
              <el-select
                v-model="queryParams.noticeType"
                placeholder="信息安全"
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
            <el-form-item label="生源地" prop="noticeType" class="header-item">
              <el-select
                v-model="queryParams.noticeType"
                placeholder="湖北省"
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
            <el-form-item label="性别" prop="noticeType" class="header-item">
              <el-select
                v-model="queryParams.noticeType"
                placeholder="男"
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
            <el-form-item label="学号" prop="noticeTitle" class="header-item">
              <el-input
                v-model="queryParams.noticeTitle"
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
              <span class="title-item">22电子信息1班学生列表</span>
              <span class="iconfont">&#xe631;</span>
              <el-row :gutter="10" class="mb8" style="float: right">
                <el-col :span="1.5">
                  <el-button
                    type="primary"
                    class="create"
                    icon="el-icon-search"
                    @click="handleChange"
                  >
                    调整班级</el-button
                  >
                </el-col>
                <el-col :span="1.5">
                  <el-button class="export">
                    <span class="iconfont icon-daochu-06"></span>
                    导入</el-button
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
                <el-col :span="1.5">
                  <el-button class="export">
                    <span class="iconfont icon-daochu-06"></span>
                    导出</el-button
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
            <el-table
              :data="noticeList"
              @selection-change="handleSelectionChange"
              class="table-body"
            >
              <el-table-column type="selection" width="65" align="center" />
              <el-table-column label="序号" align="center" prop="id" />
              <el-table-column
                label="学号"
                align="center"
                prop="classId"
                sortable
              />
              <el-table-column
                label="姓名"
                align="center"
                prop="className"
                sortable
              >
                <el-input
                  :value="noticeList[0].className"
                  clearable
                  @keyup.enter.native="handleQuery"
                />
              </el-table-column>
              <el-table-column
                label="性别"
                align="center"
                prop="college"
                sortable
              />
              <el-table-column
                label="专业"
                align="center"
                prop="level"
                sortable
              />
              <el-table-column
                label="生源地"
                align="center"
                prop="nums"
                sortable
              />
              <el-table-column
                label="出生年月"
                align="center"
                prop="beginTime"
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
        <div class="stu_info tab_item" v-show="currentIndex == 1">
          <el-form
            :model="queryParams"
            ref="queryForm"
            size="small"
            :inline="true"
            v-show="showSearch"
            label-width="68px"
            class="table-header"
          >
            <el-form-item label="专业" prop="noticeType" class="header-item">
              <el-select
                v-model="queryParams.noticeType"
                placeholder="信息安全"
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
            <el-form-item label="生源地" prop="noticeType" class="header-item">
              <el-select
                v-model="queryParams.noticeType"
                placeholder="湖北省"
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
            <el-form-item label="性别" prop="noticeType" class="header-item">
              <el-select
                v-model="queryParams.noticeType"
                placeholder="男"
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
            <el-form-item label="学号" prop="noticeTitle" class="header-item">
              <el-input
                v-model="queryParams.noticeTitle"
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
                    @click="handleChange"
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
              @selection-change="handleSelectionChange"
              class="table-body"
            >
              <el-table-column type="selection" width="65" align="center" />
              <el-table-column label="序号" align="center" prop="id" />
              <el-table-column label="学号" align="center" prop="classId" />
              <el-table-column label="姓名" align="center" prop="className">
                <el-input
                  :value="noticeList[0].className"
                  clearable
                  @keyup.enter.native="handleQuery"
                />
              </el-table-column>
              <el-table-column label="性别" align="center" prop="college" />
              <el-table-column label="专业" align="center" prop="level" />
              <el-table-column label="生源地" align="center" prop="nums" />
              <el-table-column
                label="出生年月"
                align="center"
                prop="beginTime"
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
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row class="change_row">
          <el-col :span="10">
            <el-form-item label="当前班级" prop="noticeTitle">
              <el-input
                v-model="form.noticeTitle"
                placeholder="20级学硕计算机一班"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="班级编号" prop="noticeType">
              <el-input v-model="form.noticeType" placeholder="202011093112">
                <!-- <el-option
                  v-for="dict in dict.type.sys_notice_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option> -->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="change_row">
          <el-col :span="10">
            <el-form-item label="当前学院" prop="noticeTitle">
              <el-input v-model="form.noticeTitle" placeholder="计算机学院" />
            </el-form-item>
          </el-col>
          <el-col :span="10" class="in_class">
            <el-form-item label="转入班级" prop="noticeTitle">
              <el-select
                v-model="form.noticeTitle"
                placeholder="20级学硕计算机二班"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" class="cancel_btn">取消</el-button>
        <el-button @click="submitForm" class="submit_btn">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/export/iconfont.css";
import "@/assets/fonts/refresh/iconfont.css";
import {
getQueryStuList
} from "@/api/class/divisionClass";

export default {
  name: "divisionClass", //分班管理
  components: {},
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
  data() {
    return {
      // tab栏切换
      tab_title: ["22级电子信息1班", "未分配学生名单"],
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
      // 是否显示弹出层
      open: false,
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
  mounted(){
    console.log("分班管理操作挂在");
    this.getList({bjdm:"6860320004"})
  },
  methods: {
    // 查询某班级学生列表
    getList(x){
      getQueryStuList(x).then(res=>{
        console.log(res);
      })
    },
    // 分班管理路由跳转
    operate() {
      console.log(123);
      this.$router.push({
        path: "/class/operateClass",
      });
    },
    // tab栏切换
    tabClick(index) {
      this.currentIndex = index;
    },
    /** 查询公告列表 */
    // getList() {
      // this.loading = true;
      // listNotice(this.queryParams).then((response) => {
      //   this.noticeList = response.rows;
      //   this.total = response.total;
      //   this.loading = false;
      // });
    // },
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
    /** 调整班级操作 */
    handleChange() {
      // this.reset();
      this.open = true;
      this.title = "调整班级";
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
      this.$modal.confirm("是否删除？");
      console.log(123);
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
