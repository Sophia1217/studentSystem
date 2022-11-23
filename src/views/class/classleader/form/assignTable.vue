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
          <!-- <div class="title" icon="el-icon-refresh">
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
          </div> -->
          <div class="content_top">
            <div class="headerLeft">
              <span class="title">{{ table_title }}</span>
              <i class="Updataicon"></i>
            </div>
            <div class="headerRight">
              <div class="btns borderBlue" @click="studentRecord1">
                <span class="title">任职记录</span>
              </div>
              <div class="btns borderBlue" @click="deleteSome">
                <i class="icon removeIcon"></i
                ><span class="title">批量撤任</span>
              </div>
            </div>
          </div>
          <div class="mt15">
            <el-table
              :data="queryBgbList"
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
              <el-table-column label="任命人" align="center" prop="rmrgh" />
              <el-table-column label="任命时间" align="center" prop="rmsj" />

              <!-- <el-table-column label="操作" align="center" prop="level">
              <template slot-scope="scope">
                <span
                  class="iconfont allocate_teacher"
                  @click="handleCancel(scope.row)"
                  >&#xe638;</span
                >
                <span
                  style="color: #005657; margin-left: 5px; margin-right: 5px"
                  @click="handleCancel(scope.row)"
                >
                  撤任班干部
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
        <div class="allClassmates" v-show="currentIndex == 1">
          <div>
            <el-form
              :model="queryParams1"
              ref="queryForm"
              size="small"
              :inline="true"
              label-width="68px"
              class="table-header"
            >
              <div class="assignInput">
                <el-form-item label="学号" prop="xh" class="header-item">
                  <el-input
                    v-model="queryParams1.xh"
                    placeholder="未填写"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="姓名" prop="xm" class="header-item">
                  <el-input
                    v-model="queryParams1.xm"
                    placeholder="未填写"
                    clearable
                  />
                </el-form-item>
                <el-form-item class="assignInput">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-search"
                    class="search"
                    @click="handleQueryClass"
                    >查询</el-button
                  >
                  <el-button
                    size="mini"
                    @click="resetQuery('queryForm')"
                    class="reset"
                  >
                    <span class="iconfont reset_icon">&#xe614;</span>
                    重置</el-button
                  >
                </el-form-item>
              </div>
            </el-form>
          </div>
          <!-- <div class="title" icon="el-icon-refresh">
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
                <el-button class="allocate" @click="actionAssignBgb">
                  <span class="iconfont allocate_icon">&#xe638;</span>
                  批量任命</el-button
                >
              </el-col>
            </el-row>
          </div> -->
          <div class="content_top">
            <div class="headerLeft">
              <span class="title">{{ table_title }}</span>
              <i class="Updataicon"></i>
            </div>
            <div class="headerRight">
              <div class="btns borderBlue" @click="studentRecord1">
                <span class="title">任职记录</span>
              </div>
              <div class="btns borderBlue" @click="actionAssignBgb">
                <i class="icon plCancelIcon"></i
                ><span class="title">批量任命</span>
              </div>
            </div>
          </div>
          <div class="mt15">
            <el-table :data="stuList" @selection-change="handleSelectionChange">
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
              <el-table-column label="性别" align="center" prop="sex" />
              <el-table-column label="班级职位" align="center" prop="zwdm" />
              <!-- <el-table-column label="操作" align="center" prop="level">
              <template slot-scope="scope">
                <span
                  class="iconfont allocate_teacher"
                  @click="appointHandle(scope.row)"
                  >&#xe638;</span
                >
                <span
                  style="color: #005657; margin-left: 5px; margin-right: 5px"
                  @click="appointHandle(scope.row)"
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
              :page.sync="queryParams1.pageNum"
              :limit.sync="queryParams1.pageSize"
              @pagination="handleQueryClass"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 批量撤任对话框：cancelAllocate-->
    <el-dialog title="取消分配" :visible.sync="cancelAllocate" width="50%">
      <el-form :model="formDismission" :rules="rules" height="150px">
        <el-form-item label="撤任理由" :rules="rules.crly">
          <el-select v-model="formDismission.reason" placeholder="请选择">
            <el-option
              v-for="item in cxlyOptions"
              :key="item.dm"
              :label="item.mc"
              :value="item.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="撤任日期" :rules="rules.crrq">
          <el-date-picker
            type="date"
            style="width: 30%"
            placeholder="选择撤任日期"
            v-model="formDismission.offDate"
            value-format="yyyy-MM-dd hh:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="撤任详情" prop="detail">
          <el-input
            v-model="formDismission.detail"
            autocomplete="off"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item> -->
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
      <template>
        <div v-for="item in currentRowBgb" :key="item.xh">
          <span
            >确认取消【{{ item.xh }}(学工号)】【{{ item.xm }}】对【{{
              table_title
            }}】的【{{ item.zwdm }}】任命？</span
          >
        </div>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button @click="doubleCheck = false">取 消</el-button>
        <!-- distributeClassConfirm(row) -->
        <el-button type="primary" @click="doubleCheckConfirm()" class="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 批量任命对话框 -->
    <el-dialog
      title="班干部任命"
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
        <el-form-item label="任命日期" :rules="rules.rmsj">
          <el-date-picker
            type="date"
            style="width: 80%"
            placeholder="选择任命日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            v-model="form.rmsj"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="班干部职位" prop="bgbid" :rules="rules.bgbid">
          <!-- <el-input v-model="form.bgbid"></el-input> -->
          <el-select v-model="form.bgbid" placeholder="请选择" clearable>
            <!-- 班干部职位筛选框 -->
            <el-option
              v-for="(item, index) in bjzwOptions"
              :key="index"
              :label="item.mc"
              :value="item.dm"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAssignBgb">取消</el-button>
        <el-button type="primary" @click="assignBgbConfirm" class="confirm"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <!-- 批量任命二次确定：doubleCheckAssign-->
    <el-dialog
      title="批量任命班干部确认"
      :visible.sync="doubleAssign"
      width="50%"
    >
      <template>
        <div v-for="item in currentRow" :key="item.xh">
          <span
            >确认任命【{{ item.xh }}(学工号)】【{{ item.xm }}】为【{{
              table_title
            }}】的【{{ item.bgbmc }}】？</span
          >
        </div>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button @click="doubleAssign = false">取 消</el-button>
        <!-- distributeClassConfirm(row) -->
        <el-button type="primary" @click="doubleAssignConfirm()" class="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/circle/iconfont.css";
import {
  getCxly,
  getQueryBgbList,
  getQueryAllstuList,
} from "@/api/class/classLeader";
import {
  getAssignBgb,
  getBgbdismission,
  getZwdm,
} from "@/api/class/classLeader";
export default {
  name: "assignTable", //班干部任命表格
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
  // 子组件(assignTable)属性,其父组件为leaderAssign
  props: ["table_content"],
  data() {
    return {
      queryParams1: {
        pageNum: 1,
        pageSize: 10,
        xh: "",
        xm: "",
        bjdm: "",
      },
      // 全班同学当前行数据
      currentRow: [],
      //班干部当前行数据
      currentRowBgb: [],
      // 当前班级代码
      currentBjdm: "",
      // 当前班级名称
      table_title: "",
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
      bjzwOptions: [],
      doubleAssign: false,
      // 表格数据
      stuList: [
        //
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
        bjdm: "",
      },
      // 批量任命表单参数
      form: {
        bgbid: "",
        rmrgh: "",
        rmsj: "",
      },
      //批量撤任表单参数
      formDismission: {
        reason: "",
        offDate: "",
      },
      // 表单校验
      rules: {
        crly: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        crrq: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
        bgbid: [
          { required: true, message: "班干部不能为空", trigger: "change" },
        ],
        rmsj: [
          { required: true, message: "任命时间不能为空", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.queryParams.bjdm = this.$route.query.bjdm;
    this.queryParams1.bjdm = this.$route.query.bjdm;
    this.table_title = this.$route.query.bjmc;
    getZwdm().then((res) => {
      if (res.errcode == "00") {
        this.bjzwOptions = res.data.rows;
      }
    });
    this.getList();
  },
  activated() {
    this.queryParams.bjdm = this.$route.query.bjdm;
    this.queryParams1.bjdm = this.$route.query.bjdm;
    this.table_title = this.$route.query.bjmc;
    this.getList();
  },
  methods: {
    //全班同学列表
    handleQueryClass() {
      var data = {
        pageNum: this.queryParams1.pageNum,
        pageSize: this.queryParams1.pageSize,
        xh: this.queryParams1.xh,
        xm: this.queryParams1.xm,
        bjdm: this.queryParams.bjdm,
      };
      var data = this.queryParams1;
      getQueryAllstuList(data)
        .then((res) => {
          // console.log("该班学生查询结果：", res);
          let data = res.rows || [];
          this.stuList = data;
          this.total = res.total;
        })
        .catch((err) => {
          // console.log("该班学生查询结果错误：", err);
        });
    },
    /** 重置按钮操作 */
    resetQuery(queryForm) {
      this.$refs[queryForm].resetFields();
    },

    //查询列表
    getList() {
      if (this.currentIndex == 0) {
        this.getBgbListData();
      } else if (this.currentIndex == 1) {
        this.handleQueryClass();
      }
    },

    // 班干部任职记录
    studentRecord1() {
      this.$router.push({
        path: "/class/leadRecord",
        query: {
          bjdm: this.queryParams.bjdm,
          table_title: this.$route.query.bjmc,
        },
      });
    },
    // //班干部列表
    getBgbListData() {
      getQueryBgbList(this.queryParams)
        .then((res) => {
          // console.log("该班班干部查询结果：", res);
          let data = res.rows || [];
          this.queryBgbList = data;
          this.total = res.total;

          // console.log("test:", this.queryBgbList);
        })
        .catch((err) => {
          // console.log("该班班干部查询结果错误：", err);
        });
    },

    // // 撤任班干部
    // handleCancel(item) {
    //   this.getCxlyData();
    //   this.currentRowBgb = [item];
    //   this.cancelAllocate = true;
    // },

    // // 任命班干部
    // appointHandle(item) {
    //   this.currentRow = [item];
    //   this.openAssignBgb = true;
    // },

    // 获取撤任理由
    getCxlyData() {
      if (this.cxlyOptions.length == 0) {
        getCxly().then((res) => {
          // console.log(res);
          this.cxlyOptions = res.data.rows || [];
          // console.log("crlyOptions:", this.cxlyOptions);
        });
      }
    },

    // 班干部批量撤任操作
    deleteSome() {
      if (this.currentRowBgb.length > 0) {
        getCxly().then((res) => {
          // console.log(res);
          this.cxlyOptions = res.data.rows;
          // console.log("crlyOptions:", this.cxlyOptions);
        });
        this.cancelAllocate = true;
      } else {
        this.$message({
          message: "请至少选择一位班干部！",
          type: "warning",
        });
      }
    },
    // 批量取消分配-确认操作
    cancelAllocateConfirm() {
      if (this.formDismission.reason == "") {
        this.$message.error("撤任理由不能为空！");
      } else if (this.formDismission.offDate == "") {
        this.$message.error("撤任时间不能为空!");
      } else {
        this.cancelAllocate = false;
        setTimeout(() => {
          this.doubleCheck = true;
        }, 500);
      }
    },
    // 批量撤任-二次确认按钮
    doubleCheckConfirm() {
      // console.log("批量撤任二次确认操作！");
      let idList = [];
      let cxrgh = this.$store.getters.userId;
      let cxly = this.formDismission.reason;
      let cxsj = this.formDismission.offDate;
      // console.log(this.currentRowBgb);

      for (let item_row of this.currentRowBgb) {
        idList.push(item_row.id);
      }

      getBgbdismission({ idList, cxly, cxrgh, cxsj }).then((response) => {
        // console.log(response);

        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.doubleCheck = false;
        this.queryParams.pageNum = 1;
        this.getList();
      });
    },
    // 班干部批量任命
    actionAssignBgb() {
      //   console.log("批量任命操作！",this.currentRowBgb);
      if (this.currentRow.length > 0) {
        this.openAssignBgb = true;
        this.title = "批量任命班干部";
      } else {
        this.$message({
          message: "请至少选择一位学生！",
          type: "warning",
        });
      }
    },
    // 批量任命班干部-确认操作
    assignBgbConfirm() {
      // console.log("批量任命确认操作");
      if (this.form.rmsj == "") {
        this.$message.error("任命时间不能为空！");
      } else if (this.form.bgbid == "") {
        this.$message.error("班干部职位不能为空!");
      } else {
        this.openAssignBgb = false;
        var bgbmc = "";
        for (let index = 0; index < this.bjzwOptions.length; index++) {
          const element = this.bjzwOptions[index];
          if (this.form.bgbid == element.dm) {
            bgbmc = element.mc;
            break;
          }
        }
        for (let x = 0; x < this.currentRow.length; x++) {
          const item = this.currentRow[x];
          item.bgbmc = bgbmc;
        }
        setTimeout(() => {
          this.doubleAssign = true;
        }, 500);
      }
    },

    //班干部批量任命————二次确定操作
    doubleAssignConfirm() {
      // console.log("批量任命二次确认操作！");
      this.currentBjdm = this.$route.query.bjdm;
      let stuList = [];
      let rmsj = this.form.rmsj;
      let bjdm = "";
      let zwdm = this.form.bgbid;
      bjdm = this.currentBjdm;
      // let rmrgh = this.$store.getters.userId;

      for (let item_row of this.currentRow) {
        stuList.push(item_row.xh);
      }

      getAssignBgb({ stuList, zwdm, bjdm, rmsj }).then((res) => {
        // console.log(res);
        this.$message({
          message: "任命成功",
          type: "success",
        });
        this.doubleAssign = false;
        this.queryParams.pageNum = 1;
        this.getList();
      });
    },

    // tab栏切换
    tabClick(index) {
      this.currentIndex = index;
      this.queryParams.pageNum = 1;
      this.$bus.$emit("index", this.currentIndex);
      this.getList();
    },

    // 批量任命取消按钮
    cancelAssignBgb() {
      this.openAssignBgb = false;
    },

    // 全班同学多选框选中数据
    handleSelectionChange(row) {
      // console.log(row);
      // 选中的行数据
      this.currentRow = row;
    },
    //班干部多选框选中数据
    handleSelectionChangeBgb(row) {
      // console.log(row);
      this.currentRowBgb = row;
    },
  },
};
</script>

<style scoped lang="scss">
.assign-table {
  background-color: #ffffff;
}

#pagenation {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.mt15 {
  margin-top: 15px;
}
.content_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.headerLeft {
  .title {
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    line-height: 28px;
  }
  .Updataicon {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    background: url("~@/assets/images/updata.png") no-repeat;
  }
}
.headerRight {
  display: flex;
  .borderBlue {
    background: #fff;
    border: 1px solid grey;
  }
  .btns {
    margin-right: 15px;
    padding: 0px 10px;
    cursor: pointer;
    border-radius: 4px;
    .title {
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      // vertical-align: middle;
    }
    .title1 {
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      color: #fff;
      // vertical-align: middle;
    }
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: top;
      margin-right: 5px;
    }
    .blueIcon {
      margin-top: 10px;
      background: url("~@/assets/assistantPng/in.png") no-repeat;
    }
    .orangeIcon {
      margin-top: 10px;
      background: url("~@/assets/assistantPng/out.png") no-repeat;
    }
    .lightIcon {
      margin-top: 9px;
      background: url("~@/assets/assistantPng/delete.png") no-repeat;
    }
    .greenIcon {
      margin-top: 10px;
      background: url("~@/assets/assistantPng/add.png") no-repeat;
    }
    .removeIcon {
      margin-top: 10px;
      background: url("~@/assets/images/icon_remove.png") no-repeat;
    }
    .plCancelIcon {
      margin-top: 10px;
      background: url("~@/assets/images/plCancel.png") no-repeat;
    }
  }
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
