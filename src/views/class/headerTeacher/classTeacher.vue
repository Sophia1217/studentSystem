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
      <el-form-item label="学工号" prop="xgh">
        <el-input
          v-model="queryParams.xgh"
          placeholder="请输入学工号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="xm">
        <el-input
          v-model="queryParams.xm"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工作单位" prop="xy">
        <el-select v-model="queryParams.xy" placeholder="未选择" clearable>
          <el-option
            v-for="(item, index) in collegeOptions"
            :key="index"
            :label="item.mc"
            :value="item.dm"
          />
        </el-select>
      </el-form-item>
      <div style="float: right">
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
      </div>
    </el-form>
    <div>
      <h3 class="title-item">
        {{ $route.query.bjmc
        }}<span class="iconfont repeat_icon">&#xe7b1; </span>
      </h3>
      <el-row :gutter="10" class="mb8" style="float: right; margin-top: 15px">
        <!-- <el-col :span="1.5" style="float: left"> 班级列表 </el-col> -->
        <el-col :span="1.5">
          <el-button class="allocate" @click="distributeSomeClass">
            <span class="iconfont allocate_icon" @click="distributeSomeClass"
              >&#xe638;</span
            >
            批量分配</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button class="onrecord" @click="cancelDistributeSomeClass">
            <span
              class="iconfont record_icon"
              @click="cancelDistributeSomeClass"
              >&#xe694;</span
            >
            批量取消</el-button
          >
        </el-col>
        <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
    </div>

    <!-- 班主任列表 -->
    <el-table
      :data="noticeList"
      @selection-change="handleSelectionChange"
      @sort-change="changeTableSort"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" align="center" width="100" type="index" />
      <el-table-column
        label="学工号"
        align="center"
        prop="gh"
        width="100"
        sortable="custom"
      />
      <el-table-column
        label="姓名"
        align="center"
        prop="xm"
        width="300"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        label="性别"
        align="center"
        prop="xb"
        width="300"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column
        label="工作单位"
        align="center"
        prop="dwmc"
        width="150"
        sortable="custom"
      />
      <el-table-column
        label="已任职班级数量"
        align="center"
        prop="sl"
        width="150"
        sortable="custom"
      />
      <el-table-column
        label="操作"
        align="center"
        prop="action"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <div>
            <el-button
              type= "text"
              size="small"
              :disabled="scope.row.sffp == '0' ? true : false"
              @click="allocateClass(scope.row)"
            >
              <span
                class="iconfont"
                :class="
                  scope.row.sffp == '0' ? 'allocate_none' : 'allocate_class'
                "
                >&#xe638;</span
              >
              <span
                style="margin-left: 5px; margin-right: 10px"
                :class="
                  scope.row.sffp == '0' ? 'allocate_none' : 'allocate_class'
                "
                >分配班级</span
              >
            </el-button>
            <el-button
              type= "text"
              size="small"
              :disabled="scope.row.sffp == '1' ? true : false"
              @click="allocateNone(scope.row)"
            >
              <span
                class="iconfont"
                :class="
                  scope.row.sffp == '1' ? 'allocate_none' : 'allocate_class'
                "
                >&#xe638;</span
              >
              <span
                style="margin-left: 5px"
                :class="
                  scope.row.sffp == '1' ? 'allocate_none' : 'allocate_class'
                "
                >取消分配</span
              >
            </el-button>
            
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      id="test"
      v-show="total > 0"
      :total="total"
      center
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getTeacherList"
    />

    <!-- 给班主任分配班级操作：teacherClass-->
    <!-- :before-close="handleClose" -->
    <el-dialog title="分配班级" :visible.sync="teacherClass" width="30%">
      <el-form :model="form">
        <el-form-item label="任命日期">
          <el-date-picker
            type="date"
            style="width: 30%"
            placeholder="选择任命日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            v-model="form.rmsj"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="任命信息">
          <span v-if="flag == false"
            >确认将【{{ show.gh }}】【{{ show.xm }}】任命为【{{
              $route.query.bjmc
            }}】班主任？</span
          >
          <span v-else>
            确认将<span v-for="(item, index) in teacherList" :key="index"
              >【{{ item.gh }}】【{{ item.xm }}】</span
            >任命为【{{ $route.query.bjmc }}】班主任？
          </span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="teacherClass = false">取 消</el-button>
        <!-- distributeClassConfirm(row) -->
        <el-button
          type="primary"
          @click="distributeClassConfirm()"
          class="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 给班主任取消分配班级操作：cancelAllocate -->
    <el-dialog title="取消分配" :visible.sync="cancelAllocate" width="50%">
      <el-form :model="form">
        <el-form-item label="撤任理由" prop="reason">
          <el-input
            v-model="form.reason"
            autocomplete="off"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="撤任日期">
          <el-date-picker
            type="date"
            style="width: 30%"
            placeholder="选择撤任日期"
            v-model="form.offDate"
            value-format="yyyy-MM-dd hh:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAllocate = false">取 消</el-button>
        <el-button type="primary" @click="cancelAllocateConfirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 给班主任取消分配班级操作——二次确定：checkDouble -->
    <el-dialog title="取消分配" :visible.sync="doubleCheck" width="50%">
      <span v-if="flag1 == false"
        >确认取消【{{ show.gh }}】【{{ show.xm }}】对【{{
          $route.query.bjmc
        }}】班主任任命？</span
      >
      <span v-else>
        确认取消<span v-for="(item, index) in teacherList" :key="index"
          >【{{ item.gh }}】【{{ item.xm }}】</span
        >对【{{ $route.query.bjmc }}】班主任任命？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="doubleCheck = false">取 消</el-button>
        <!-- distributeClassConfirm(row) -->
        <el-button type="primary" @click="doubleCheckConfirm" class="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/person/iconfont.css";
import { getCollege } from "@/api/class/maintenanceClass";
import {
  getHeaderTeacher,
  assignTeacher,
  removeAssignTeacher,
} from "@/api/class/headerTeacher";
export default {
  name: "classTeacher",
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
      collegeOptions: [],
      // 班主任列表数据
      noticeList: [],
      // 弹出层标题
      title: "",
      // 分配班级弹出层
      teacherClass: false,
      // 是否显示取消分配、批量取消弹出层
      cancelAllocate: false,
      // 取消分配-二次确认弹出框
      doubleCheck: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        xgh: "", // 学工号
        xm: "", // 姓名 新增字段查询
        xy: "", // 学院代码
        bjdm: this.$route.query.bjdm, // 班级代码
      },
      // 是给一个班级任命一个还是多个班主任
      flag: false,
      flag1: false, // 给一个班级撤任一个还是多个班主任
      // 要展示的一个班主任的信息
      show: {},
      // 要展示的多个班主任的信息：包括多个班主任的工号、姓名
      teacherList: [],
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
    this.getTeacherList(this.queryParams);
    this.getGradeOptions();
    this.queryParams.xgh = "";
    this.queryParams.xy = "";
    this.getTeacherList(this.queryParams);
  },
  // 组件激活时清除筛选框 重新发送请求
  activated() {
    // this.queryParams.bjdm = this.$route.query.bjdm; // 班级代码
    // this.getTeacherList(this.queryParams);
    // this.getGradeOptions();
    // this.queryParams.xgh = "";
    // this.queryParams.xy = "";
    // this.getTeacherList(this.queryParams);
  },
  methods: {
    // 搜索按钮
    handleQuery() {
      this.getTeacherList(this.queryParams);
    },
    // 重置按钮
    resetQuery() {
      this.queryParams.xgh = "";
      this.queryParams.xy = "";
      this.handleQuery();
    },
    // 获取工作单位列表
    getGradeOptions() {
      getCollege().then((response) => {
        // 获取培养单位列表数据
        if (response.errcode == "00") {
          this.collegeOptions = response.data.rows;
        }
      });
    },
    // 获取班主任列表
    getTeacherList(queryParams) {
      Object.assign(queryParams, this.queryParams);
      getHeaderTeacher(queryParams).then((response) => {
        // 获取班级列表数据
        this.noticeList = response.items; // 根据状态码接收数据
        this.total = response.total; //总条数
      });
    },
    // 多选勾选触发函数并存储勾选的班主任信息（包括工号、姓名）
    handleSelectionChange(arr) {
      // 存储勾选的表格数据中班主任的工号、姓名
      this.teacherList = [];
      arr.forEach((item, index) => {
        this.teacherList[index] = {};
        this.teacherList[index].gh = item.gh;
        this.teacherList[index].xm = item.xm;
      });
    },
    // 班级对班主任一对一分配（点击分配班级时根据row获取信息）、一对多分配（点击批量分配时根据list判断列表中有几个勾选）
    allocateClass(row) {
      this.teacherClass = true;
      this.show = row; // 存储单条班主任数据
      this.flag = false;
    },
    // 班主任对班级一对一取消分配班级
    allocateNone(row) {
      this.cancelAllocate = true;
      this.show = row; // 存储单条班主任数据
      this.flag1 = false;
    },
    // 分配班级-确认操作
    distributeClassConfirm() {
      this.teacherClass = false;
      // 整理参数
      const q = {};
      q.bjdm = this.$route.query.bjdm; // 班级代码
      q.teacherList = []; // 整理多个班主任的工号信息
      q.rmsj = this.form.rmsj;
      if (this.flag == true) {
        // 一对多分配
        this.teacherList.forEach((item) => {
          q.teacherList.push(item.gh);
        });
      } else {
        // 一对一分配
        q.teacherList.push(this.show.gh);
      }
      q.rmrgh = this.$store.getters.userId; // 任命人的工号
      // q.rmsj = ""; // 任命时间
      // 给一对一或一对多任命请求——若操作成功
      assignTeacher(q).then((response) => {
        this.$message({
          message: "分配班级成功",
          type: "success",
        });
        this.getTeacherList(this.queryParams); // 重新发送请求获取班主任列表数据
        // if (response.errcode == "-200") {
        //   this.$message({
        //     message: "分配班级失败",
        //     type: "error",
        //   });
        // }
      });
    },
    // 取消分配-确认操作
    cancelAllocateConfirm() {
      this.cancelAllocate = false;
      setTimeout(() => {
        this.doubleCheck = true;
      }, 200);
      // const q = {};
      // q.cxrGh = "2005690002"; // 撤销人的工号
      // q.bjdm = this.$route.query.bjdm; // 班级代码
      // q.crly = this.form.reason; // 撤任理由
      // q.cxsj = this.form.offDate; // 撤任时间
      // q.teacherList = [];
      // if (this.flag1 == true) {
      //   // 一对多撤任
      //   this.teacherList.forEach((item) => {
      //     q.teacherList.push(item.gh);
      //   });
      // } else {
      //   // 一对一撤任
      //   q.teacherList.push(this.show.gh);
      // }
      // removeAssignTeacher(q).then((response) => {
      //   if (response.errcode == "00") {
      //     this.doubleCheck = true; // 弹出撤任二次确认框
      //   }
      //   if (response.errcode !== "00") {
      //     this.$message({
      //       message: "撤任班主任失败",
      //       type: "error",
      //     });
      //   }
      // });
    },
    // 取消分配-二次确认按钮
    doubleCheckConfirm() {
      const q = {};
      q.cxrGh = this.$store.getters.userId; // 撤销人的工号
      q.bjdm = this.$route.query.bjdm; // 班级代码
      q.crly = this.form.reason; // 撤任理由
      q.cxsj = this.form.offDate; // 撤任时间
      q.teacherList = [];
      if (this.flag1 == true) {
        // 一对多撤任
        this.teacherList.forEach((item) => {
          q.teacherList.push(item.gh);
        });
      } else {
        // 一对一撤任
        q.teacherList.push(this.show.gh);
      }
      removeAssignTeacher(q).then((response) => {
        this.doubleCheck = false;
        if (response.errcode == "00") {
          this.$message({
            message: "取消分配班级操作成功",
            type: "success",
          });
          this.getTeacherList(this.queryParams); // 重新发送请求获取班主任列表数据
        }
        if (response.errcode !== "00") {
          this.$message({
            message: "取消分配班级操作失败",
            type: "error",
          });
        }
      });
      // this.$message({
      //   message: "取消分配班级操作成功",
      //   type: "success",
      // });
    },
    // 批量分配班主任——多个班主任分配一个班级
    distributeSomeClass() {
      // 判断勾选了多少班主任， 请求分配班主任接口数据
      if (this.teacherList.length > 0) {
        this.flag = true; // 表明勾选了多个班主任
        // 拿到勾选的那几个班主任信息，后弹出分配班级弹出框
        this.teacherClass = true;
      } else {
        this.$message({
          message: "请至少选择一位辅导员！",
          type: "warning",
        });
      }
    },
    // 批量取消分配班级
    cancelDistributeSomeClass() {
      // 判断勾选了多少班主任， 请求分配班主任接口数据
      if (this.teacherList.length > 0) {
        this.flag1 = true; // 表明勾选了多个班主任
        // 拿到勾选的那几个班主任信息，后弹出分配班级弹出框
        this.cancelAllocate = true;
      } else {
        this.$message({
          message: "请至少选择一位辅导员！",
          type: "warning",
        });
      }
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.getTeacherList(this.queryParams);
    },
  },
};
</script>

<style scoped>
.app-container {
  /* height: 100vh; */
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
.allocate_class {
  color: #005657;
}
.allocate_none {
  color: #cce0e1ff;
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
  font-family: "PingFangSC-Semibold";
  width: 1000px;
  font-weight: 600;
  font-size: 20px;
  color: #1f1f1f;
}
#test {
  left: 50%;
  transform: translateX(-80%);
  text-align: center;
}
.ack {
  color: #ffffff !important;
  background-color: #005657 !important;
}
.el-textarea.el-input--medium {
  display: inline-block;
  width: 60%;
}
.pagination-container {
  margin-top: 0px;
  /* height: 100%; */
}
.el-pagination {
  margin-top: 50px;
}
</style>
