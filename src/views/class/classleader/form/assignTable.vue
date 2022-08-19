<template>
  <div class="assign-table">
    <div class="tab">
      <div class="tab_list">
        <ul>
          <li
            v-for="(title, index) in tab_list"
            :key="title"
            @click="tabClick(index)"
            :class="currentIndex == index ? 'activate' : ''"
          >
            {{ title }}
          </li>
        </ul>
      </div>
      <div class="table-content">
        <div class="classLeader" v-show="currentIndex == 0">
          <div class="title" icon="el-icon-refresh">
            <span class="title-item">{{ table_title }}</span>
            <span class="iconfont">&#xe631;</span>
            <el-row :gutter="10" class="mb8" style="float: right">
              <el-col :span="1.5">
                <el-button
                  class="stuRecord"
                  type="primary"
                  icon="el-icon-search"
                  @click="studentRecord1"
                >
                  任职记录</el-button
                >
              </el-col>
              <el-col :span="1.5">
                <el-button
                  class="delete"
                  icon="el-icon-delete"
                  @click="deleteSome"
                  >批量撤任</el-button
                >
              </el-col>
            </el-row>
          </div>
          <!-- v-loading="loading" -->
          <el-table
            :data="table_content"
            @selection-change="handleSelectionChangeBgb"
          >
            <el-table-column type="selection" align="center" />
            <el-table-column
              label="序号"
              align="center"
              prop="id"
              width="60px"
              type="index"
            />
            <el-table-column label="学号" align="center" prop="xh" />
            <el-table-column label="姓名" align="center" prop="xm">
            </el-table-column>
            <el-table-column label="性别" align="center" prop="sex" />
            <el-table-column label="班级职位" align="center" prop="zwdm" />
            <el-table-column label="操作" align="center" prop="level">
              <template slot-scope="scope">
                <span
                  class="iconfont allocate_teacher"
                  @click="action(scope.row)"
                  >&#xe638;</span
                >
                <span
                  style="color: #005657; margin-left: 5px; margin-right: 5px"
                  @click="action(scope.row)"
                >
                  撤任班干部
                </span>
              </template>
            </el-table-column>
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
        <div class="allClassmates" v-show="currentIndex == 1">
          <div class="title" icon="el-icon-refresh">
            <span class="title-item">22电子信息1班</span>
            <span class="iconfont">&#xe631;</span>
            <el-row :gutter="10" class="mb8" style="float: right">
              <el-col :span="1.5">
                <el-button
                  class="stuRecord"
                  type="primary"
                  icon="el-icon-search"
                  @click="studentRecord1"
                >
                  任职记录</el-button
                >
              </el-col>
              <el-col :span="1.5">
                <el-button class="allocate" @click="actionAssignBgb">
                  <span class="iconfont allocate_icon">&#xe638;</span>
                  批量任命</el-button
                >
              </el-col>
            </el-row>
          </div>
          <!-- v-loading="loading" -->
          <el-table
            :data="noticeList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" />
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="60px"
            />
            <el-table-column label="学号" align="center" prop="xh" />
            <el-table-column label="姓名" align="center" prop="xm">
            </el-table-column>
            <el-table-column label="性别" align="center" prop="xb" />
            <el-table-column label="班级职位" align="center" prop="bjzw" />
            <!-- <el-table-column label="操作" align="center" prop="level">
              <template slot-scope="scope">
                <span
                  class="iconfont allocate_teacher"
                  @click="action(scope.row)"
                  >&#xe638;</span
                >
                <span
                  style="color: #005657; margin-left: 5px; margin-right: 5px"
                  @click="action(scope.row)"
                >
                  分配班干部
                </span>
              </template>
            </el-table-column> -->
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
    <!-- 分配班干部操作：teacherClass-->
    <!-- :before-close="handleClose" -->
    <el-dialog title="分配班干部" :visible.sync="teacherClass" width="30%">
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

    <!-- 批量撤任对话框：cancelAllocate-->
    <el-dialog title="取消分配" :visible.sync="cancelAllocate" width="50%">
      <!-- <el-form :model="form">
        <el-form-item label="撤任理由" prop="cxly">
          <el-select v-model="form.cxly" placeholder="请选择">
             <el-option label="cxlyOptions.mc" value="cxlyOptions.dm"></el-option> -->
      <!-- <el-option v-for="item in cxlyOptions" :key="item.dm" :label="item.mc" :value="item.dm"></el-option> -->

      <el-form :model="formDismission">
        <el-form-item label="撤任理由" prop="reason">
          <el-select v-model="formDismission.reason" placeholder="休学">
            <!-- <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option> -->
            -->
          </el-select>
        </el-form-item>
        <el-form-item label="撤任详情" prop="detail">
          <el-input
            v-model="formDismission.detail"
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

    <!-- 批量撤任——二次确定：checkDouble -->
    <el-dialog title="取消分配" :visible.sync="doubleCheck" width="50%">
      <template v-for="item in currentRowBgb">
        <div :key="item.xh">
          <span
            >确认取消【{{ item.xh }}(学工号)】【{{
              item.xm
            }}】对【计算机硕士22级1班】【计算机硕士22级1班】班干部任命？</span
          >
        </div>
      </template>

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
    <!-- 批量任命对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openAssignBgb"
      width="800px"
      height="243px"
      append-to-body
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="150px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="班干部职位代码" prop="bgbList">
              <!-- <el-input v-model="form.bgbid"></el-input> -->
              <el-select v-model="form.bgbid" pllaceholder="2" clearable>
                <!-- 班干部职位筛选框 -->
                <!-- <el-option
                  v-for="(item, index) in collegeOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                /> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人工号" prop="rmrgh">
              <el-input v-model="form.rmrgh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAssignBgb">取消</el-button>
        <el-button type="primary" @click="assignBgbConfirm" class="confirm"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/circle/iconfont.css";
import { getCxly, getQueryBgbList } from "@/api/class/classLeader";
import { getAssignBgb, getBgbdismission } from "@/api/class/classLeader";
export default {
  name: "assignTable", //班干部任命表格
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
  // 子组件(assignTable)属性,其父组件为leaderAssign
  props: ["table_title", "table_content"],
  data() {
    return {
      // 全班同学当前行数据
      currentRow: [],
      //班干部当前行数据
      currentRowBgb: [],
      // 当前班级代码
      currentBjdm: "",
      // tab栏切换
      tab_list: ["班干部", "全班同学"],
      currentIndex: 0,
      // 撤任理由数据
      cxlyOptions: [],
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
          xh: "123456",
          xm: "王一",
          xb: "女",
          bjzw: "班长", //班级职位
          bjdm: "1004001000",
          rgh: "001", // 人工号
        },
        {
          xh: "123457",
          xm: "王二",
          xb: "女",
          bjzw: "无", //班级职位
          bjdm: "1004001000",
          rgh: "002",
        },
        {
          xh: "123458",
          xm: "王三",
          xb: "男",
          bjzw: "无", //班级职位
          bjdm: "1004001000",
          rgh: "003",
        },
      ],
      //班干部列表查询
      getListBgb: [],
      // 班干部列表
      queryBgbList: [],
      // 全班学生列表
      allClassList: [],
      // 弹出层标题
      title: "",
      //是否显示批量任命弹窗
      openAssignBgb: false,
      // 是否显示分配班级弹框
      openAssignClass: false,
      // 是否显示批量取消分配班干部弹框
      cancelAllocate: false,
      // 批量取消分配二次确定
      doubleCheck: false,
      teacherClass: false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cxly: "",
      },
      // 批量任命表单参数
      form: {
        bgbid: "",
        rmrgh: "",
      },
      //批量撤任表单参数
      formDismission: {
        reason: "",
        detail: "",
      },
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
  mounted() {
    console.log("班干部列表挂在");
  },
  methods: {
    // // 班干部查询列表
    // getList(x){
    //   console.log("getList1!");
    //   getQueryBgbList(x).then(res=>{
    //     console.log("该班班干部查询结果：",res);
    //   })
    // },
    // 班干部任职记录
    studentRecord1() {
      this.$router.push({
        path: "/class/leadRecord",
      });
    },
    //班干部列表
    getListBgb(x) {
      getQueryBgbList(x).then((res) => {
        console.log(res);
        let data = res.rows;
        this.queryBgbList = data;
        console.log("test:", this.queryBgbList);
      });
    },
    // 班干部批量撤任操作
    deleteSome() {
      getCxly().then((res) => {
        console.log(res);
        this.cxlyOptions = res.data.rows;
        console.log("crlyOptions:", this.cxlyOptions);
      });
      this.cancelAllocate = "true";
    },
    // 批量取消分配-确认操作
    cancelAllocateConfirm() {
      this.cancelAllocate = false;
      setTimeout(() => {
        this.doubleCheck = true;
      }, 500);
    },
    // 批量撤任-二次确认按钮
    doubleCheckConfirm() {
      this.doubleCheck = false;
      console.log("批量撤任二次确认操作！");
      let xhList = [];
      let cxlyList = [];
      let cxrgh = "22222222";

      for (let item_row of this.currentRowBgb) {
        xhList.push(item_row.xh);
        cxlyList.push(this.formDismission.reason);
      }

      getBgbdismission({ xhList, cxlyList, cxrgh }).then((response) => {
        console.log(response);

        if ((response.errdode = "00")) {
          //刷新班干部表格
          // this.getListBgb({bjdm:"1004001000"});
          console.log(1);
        }
      });

      this.$message({
        message: "批量撤任班干部操作成功",
        type: "success",
      });
    },
    // 班干部批量任命
    actionAssignBgb(row) {
      console.log("批量任命操作！");
      this.openAssignBgb = true;
      this.title = "批量任命班干部";
    },
    // 批量任命班干部-确认操作
    assignBgbConfirm() {
      console.log("批量任命确认操作");
      this.currentBjdm = this.$route.query.bjdm;
      // console.log("currentRow:",this.currentRow);
      // console.log(this.form);
      let stuList = [];
      let bgbList = [];
      let classList = [];
      let rgh = "222222222";

      for (let item_row of this.currentRow) {
        stuList.push(item_row.xh);
        bgbList.push(this.form.bgbid);
        classList.push(this.currentBjdm);
        // rgh.push(this.form.rmrgh)
      }

      getAssignBgb({ stuList, bgbList, classList, rgh }).then((res) => {
        console.log(res);

        if ((response.errdode = "00")) {
          //刷新全班同学表格
        }
      });

      this.teacherClass = false;
      // this.$message({
      //   message: "分配班干部成功",
      //   type: "success",
      // });
    },
    // 辅导员任命
    operate() {
      this.$router.push({
        path: "/class/assignTea",
      });
    },
    // 第一个对话框
    // 分配班级
    assignClass() {
      this.openAssignClass = true;
      this.title = "分配班级";
    },
    // 分配班级tips点击“确定”按钮
    submitTips() {
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
    // 第二个对话框
    // 取消分配tips
    cancelAssignClass() {
      this.openCancelAssignClass = true;
      this.title = "取消分配";
    },
    submitOut() {
      this.openCancelAssignClass = false;
      this.openSecondCancelAssign = true;
    },
    // 第三个对话框
    submitOut2() {
      this.openSecondCancelAssign = false;
      this.title = "取消分配";
      this.$message({
        message: "取消分配成功",
        type: "success",
      });
    },
    // tab栏切换
    tabClick(index) {
      this.currentIndex = index;
    },
    /** 查询公告列表 */
    getList() {
      // this.loading = true;
      // listNotice(this.queryParams).then((response) => {
      //   this.noticeList = response.rows;
      //   this.total = response.total;
      //   this.loading = false;
      // });
    },
    // 批量任命取消按钮
    cancelAssignBgb() {
      this.openAssignBgb = false;
      this.reset();
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
    // 全班同学多选框选中数据
    handleSelectionChange(row) {
      // this.ids = selection.map((item) => item.noticeId);
      // this.single = selection.length != 1;
      // this.multiple = !selection.length;
      console.log(row);
      // 选中的行数据
      this.currentRow = row;
    },
    //班干部多选框选中数据
    handleSelectionChangeBgb(row) {
      console.log(row);
      this.currentRowBgb = row;
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
.assign-table {
  height: 100vh;
  background-color: #ffffff;
}

#pagenation {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.table-content {
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
  width: 300px;
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
/* 任职记录按钮样式 */
.stuRecord {
  background-color: rgba(0, 144, 161, 0.1) !important;
  border: 1px solid #0090a1 !important;
  font-weight: 600;
  font-size: 14px;
  color: #0090a1;
}
/* 表单tab栏切换开始 */
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
/* 表单tab栏切换结束 */
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
