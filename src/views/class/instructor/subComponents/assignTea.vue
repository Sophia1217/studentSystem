<template>
  <div class="assign_tea">
    <div class="assign-search">
      <el-form
        :model="queryParams"
        ref="queryForm"
        size="small"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
        class="table-header"
      >
        <div class="assignInput">
          <el-form-item label="工号" prop="noticeType" class="header-item">
            <el-input
              v-model="queryParams.Xgh"
              placeholder="请输入工号"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="工作单位" prop="noticeType" class="header-item">
            <el-select
              v-model="queryParams.noticeType"
              placeholder="请选择"
              clearable
            >
            </el-select>
          </el-form-item>
        </div>
        <div class="assignBtn">
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
        </div>
      </el-form>
    </div>
    <!-- <assign-search></assign-search> -->
    <!-- <assign-table></assign-table> -->
    <div class="assign-table">
      <div class="table-content">
        <div class="title" icon="el-icon-refresh">
          <span class="title-item">{{ this.$route.query.bjmc }}</span>
          <span class="iconfont">&#xe631;</span>
          <el-row :gutter="10" class="mb8" style="float: right">
            <el-col :span="1.5">
              <el-button type="primary" class="create" icon="el-icon-search">
                批量分配</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button class="delete" icon="el-icon-delete"
                >批量取消</el-button
              >
            </el-col>
          </el-row>
        </div>
        <!-- v-loading="loading" -->
        <el-table
          :data="placementPageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="60px"
          />
          <el-table-column label="学工号" align="center" prop="gh" sortable />
          <el-table-column label="姓名" align="center" prop="xm" sortable>
            <!-- <el-input
              :value="noticeList[0].className"
              clearable
              @keyup.enter.native="handleQuery"
            /> -->
          </el-table-column>
          <el-table-column label="性别" align="center" prop="xb" sortable />
          <el-table-column
            label="工作单位"
            align="center"
            prop="dwmc"
            sortable
          />
          <el-table-column
            label="已任职班级数量"
            align="center"
            prop="sl"
            sortable
          />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div>
                <span
                  class="iconfont"
                  :class="
                    scope.row.sffp == '0' ? 'allocate_none' : 'allocate_class'
                  "
                  @click="assignClass(scope.row)"
                  >&#xe638;</span
                >
                <span
                  style="margin-left: 5px; margin-right: 10px"
                  :class="
                    scope.row.sffp == '0' ? 'allocate_none' : 'allocate_class'
                  "
                  @click="assignClass(scope.row)"
                  >分配班级</span
                >
                <span
                  class="iconfont"
                  :class="
                    scope.row.sffp == '1' ? 'allocate_none' : 'allocate_class'
                  "
                  @click="allocateNone(scope.row)"
                  >&#xe638;</span
                >
                <span
                  style="margin-left: 5px"
                  :class="
                    scope.row.sffp == '1' ? 'allocate_none' : 'allocate_class'
                  "
                  @click="allocateNone(scope.row)"
                  >取消分配</span
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          id="pagenation"
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getInstructorList"
        />
      </div>
      <!-- 分配班级对话框 -->
      <el-dialog
        class="assign_class"
        :title="title"
        :visible.sync="openAssignClass"
        width="780px"
        append-to-body
      >
        <span class="assignTips"
          >确认将【{{this.fdyList}}】【{{this.xm}}】任命为【{{this.$route.query.bjmc}}】辅导员</span
        >
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTips" class="cancel_btn">取消</el-button>
          <el-button @click="submitTips" class="submit_btn">确认</el-button>
        </div>
      </el-dialog>

      <!-- 取消分配对话框 -->
      <el-dialog
        :title="title"
        :visible.sync="openCancelAssignClass"
        width="780px"
        append-to-body
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          class="cancel_class"
        >
          <el-row class="change_row">
            <el-col :span="24" class="in_class">
              <el-form-item label="撤任理由" prop="noticeTitle">
                <el-select
                  v-model="form.noticeTitle"
                  placeholder="休学"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10" class="in_class"> </el-col>
          </el-row>
          <el-row>
            <el-form-item label="撤任详情">
              <el-input
                type="textarea"
                placeholder="休学回家种地"
                style="width: 100%"
                :rows="5"
              />
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTips" class="cancel_btn">取消</el-button>
          <el-button @click="submitOut" class="submit_btn">确认</el-button>
        </div>
      </el-dialog>

      <!-- 二次确认取消对话框 -->
      <el-dialog
        :title="title"
        :visible.sync="openSecondCancelAssign"
        width="780px"
        append-to-body
      >
        <span class="cancelTips"
          >确认将取消【{{this.fdyList}}】【{{this.xm}}】【{{this.$route.query.bjmc}}】辅导员任命？</span
        >

        <div slot="footer" classt="dialog-footer">
          <el-button @click="cancelTips" class="cancel_btn">取消</el-button>
          <el-button @click="submitOut2" class="submit_btn">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import "@/assets/fonts/person/iconfont.css";

import assignSearch from "../form/assignSearch.vue";
import assignTable from "../form/assignTable.vue";

import { getPlacementPageList, getAssignFdy, getRemoveAssignFdy} from "@/api/class/instructor";
export default {
  name: "assignTea", //分配辅导员
  components: {
    assignSearch,
    assignTable,
  },
  mounted() {
    this.getInstructorList(this.queryParams);
  },
  data() {
    return {
      // 总条数
      total: 0,
      // 列表数据
      placementPageList: [],
      // 查询参数
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        Xgh: "", // 学工号
        Xy: "", // 学员代码
        Xm: "", // 姓名
        Bjdm: this.$route.query.bjdm, // 班级编号
      },
      // 班级代码
      bjdm: "", //班级代码
      fdyList: [], // 辅导员数组
      rmrgh: "", // 辅导员工号
      rmsj: "", // 任命时间
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
      // 是否显示分配班级弹框
      openAssignClass: false,
      // 是否显示取消分配班级弹框
      openCancelAssignClass: false,
      // 是否显示第二次取消分配班级单矿
      openSecondCancelAssign: false,
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
    this.getInstructorList(this.queryParams);
  },
  methods: {
    getInstructorList(queryParams) {
      console.log("hahah");
      Object.assign(queryParams, this.queryParams);
      getPlacementPageList(queryParams).then((res) => {
        this.placementPageList = res.items;
        this.total = res.total;
        console.log("this.placementPageList:", this.placementPageList);
      });
    },
    // 辅导员任命
    operate() {
      this.$router.push({
        path: "/class/assignTea",
      });
    },
    // 第一个对话框
    // 分配班级
    assignClass(row) {
      this.openAssignClass = true;
      this.title = "分配班级";
      console.log("分配班级信息：", row);
      this.bjdm = this.$route.query.bjdm;
      this.fdyList.push(row.gh);
      this.rmrgh = "2005690002";
      this.xm = row.xm;
      console.log(this.bjdm);
      this.rmsj = "2020-09-09 00:00:00";
    },
    // 分配班级tips点击“确定”按钮
    submitTips() {
      console.log("分配班级确认！");
      getAssignFdy({ bjdm:this.bjdm, fdyList:this.fdyList, rmrgh:this.rmrgh, rmsj:this.rmsj }).then((res) => {
        console.log(res);
      });
      this.$message({
        message: "分配成功",
        type: "success",
      });
      this.openAssignClass = false;
    },
    // 取消按钮关闭窗口
    cancelTips() {
      this.openAssignClass = false;
      this.openCancelAssignClass = false;
      this.openSecondCancelAssign = false;
    },

    // 取消分配辅导员
    allocateNone(row) {
      this.openCancelAssignClass = true;
      this.title = "取消分配";
      console.log("取消分配信息：", row);
      this.bjdm = this.$route.query.bjdm;
      this.fdyList.push(row.gh);
      this.xm = row.xm;
      this.cxrGh = "2005690002";
      this.cxsj = "2020-09-09 00:00:00";
    },
    // 第一个对话框
    // 取消分配tips
    cancelAssignClass() {
      this.openCancelAssignClass = true;
      this.title = "取消分配";
    },
    submitOut() {
      this.openCancelAssignClass = false;
      this.openSecondCancelAssign = true;
    },
    // 第二个对话框,撤销二次确认操作
    submitOut2() {
      this.openSecondCancelAssign = false;
      this.title = "取消分配确认";

      console.log("取消分配二次确认！");
      let crly = []
      crly.push(this.form.noticeTitle)
      getRemoveAssignFdy({cxrGh:this.cxrGh, bjdm:this.bjdm, FdyList:this.FdyList, crly:this.crly, cxsj:this.cxsj}).then((res) => {
        console.log(res);
      });

      this.$message({
        message: "取消分配成功",
        type: "success",
      });
    },
    // 取消按钮
    cancel() {
      // this.open = false;
      // this.reset();
    },
    // 表单重置
    reset() {
      // this.form = {
      //   noticeId: undefined,eQuery
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
      this.getInstructorList(this.queryParams);
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
    /** 新增按钮操作 */
    handleAdd() {
      // this.reset();
      // this.open = true;
      // this.title = "添加公告";
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
    },
  },
};
</script>

<style scoped>
/* 搜索 */
.table-header {
  background-color: #ffffff;
  height: 128px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin-top: 10px;
}
.assignInput {
  display: flex;
  justify-content: center;
}
.assignInput .header-item:nth-child(1) {
  margin-right: 90px;
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
/* 表格 */
.assign-table {
  height: 100vh;
  background-color: #ffffff;
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
.assignTea {
  font-family: "PingFangSC-Regular";
  font-weight: 700;
  font-size: 14px;
  color: #005657;
}
/* 对话框样式开始 */
.el-dialog__title {
  font-weight: 700;
}
.submit_btn {
  background-color: #005657;
  color: #ffffff;
}
.cancel_class {
  padding-left: 140px;
  padding-right: 140px;
}
/* 对话框样式结束 */
.allocate_class {
  color: #005657;
}
.allocate_none {
  color: #cce0e1ff;
}
</style>
