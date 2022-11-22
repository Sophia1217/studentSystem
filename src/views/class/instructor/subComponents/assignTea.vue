<template>
  <div class="assign_tea">
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

      <div class="assign-search" v-show="currentIndex == 1">
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
            <el-form-item label="工号" prop="xgh" class="header-item">
              <el-input
                v-model="queryParams.xgh"
                placeholder="请输入工号"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="工作单位" prop="xy" class="header-item">
              <el-select
                v-model="queryParams.xy"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="(item, index) in collegeOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
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
      <!-- <assign-search></assign-search> -->
      <!-- <assign-table></assign-table> -->
      <div class="assign-table">
        <div class="haveDesigned" v-show="currentIndex == 0">
          <div class="table-content">
            <div class="title" icon="el-icon-refresh">
              <span class="fptitle-item">{{ this.$route.query.bjmc }}</span>
              <span class="iconfont">&#xe631;</span>
              <el-row :gutter="10" class="mb8" style="float: right">
                <!-- <el-col :span="1.5">
                <el-button
                  type="primary"
                  class="create"
                  icon="el-icon-search"
                  @click="handleAssignMore"
                >
                  批量分配</el-button
                >
              </el-col> -->
                <el-col :span="1.5">
                  <el-button
                    class="delete"
                    icon="el-icon-delete"
                    @click="deleteAssignMore"
                    >批量取消</el-button
                  >
                </el-col>
              </el-row>
            </div>
            <!-- v-loading="loading" -->
            <el-table
              :data="placementPageList"
              @selection-change="handleSelectionChange"
              @sort-change="changeTableSort"
            >
              <el-table-column type="selection" align="center" />
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="60px"
              />
              <el-table-column
                label="学工号"
                align="center"
                prop="gh"
                sortable="custom"
              />
              <el-table-column
                label="姓名"
                align="center"
                prop="xm"
                sortable="custom"
              >
                <!-- <el-input
              :value="noticeList[0].className"
              clearable
              @keyup.enter.native="handleQuery"
            /> -->
              </el-table-column>
              <el-table-column
                label="性别"
                align="center"
                prop="xb"
                sortable="custom"
              />
              <el-table-column
                label="工作单位"
                align="center"
                prop="dwmc"
                sortable="custom"
              />
              <el-table-column
                label="已任职班级数量"
                align="center"
                prop="sl"
                sortable="custom"
              />
              <el-table-column label="操作" align="center" width="150px">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      size="small"
                      :disabled="scope.row.sffp == '1' ? true : false"
                      @click="allocateNone(scope.row)"
                    >
                      <span
                        class="iconfont"
                        :class="
                          scope.row.sffp == '1'
                            ? 'allocate_none'
                            : 'allocate_class'
                        "
                        >&#xe638;</span
                      >
                      <span style="margin-left: 5px; font-size: 16px"
                        >取消分配</span
                      >
                    </el-button>
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
        </div>

        <div class="unDesigned" v-show="currentIndex == 1">
          <div class="table-content">
            <div class="title" icon="el-icon-refresh">
              <span class="fptitle-item">{{ this.$route.query.bjmc }}</span>
              <span class="iconfont">&#xe631;</span>
              <!-- <el-row :gutter="10" class="mb8" style="float: right">
              <el-col :span="1.5">
                <el-button
                  type="primary"
                  class="create"
                  icon="el-icon-search"
                  @click="handleAssignMore"
                >
                  批量分配</el-button
                >
              </el-col>
              <el-col :span="1.5">
                <el-button
                  class="delete"
                  icon="el-icon-delete"
                  @click="deleteAssignMore"
                  >批量取消</el-button
                >
              </el-col>
            </el-row> -->
            </div>

            <el-table
              :data="placementPageList"
              @selection-change="handleSelectionChange"
              @sort-change="changeTableSort"
            >
              <el-table-column type="selection" align="center" />
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="60px"
              />
              <el-table-column
                label="学工号"
                align="center"
                prop="gh"
                sortable="custom"
              />
              <el-table-column
                label="姓名"
                align="center"
                prop="xm"
                sortable="custom"
              >
                <!-- <el-input
              :value="noticeList[0].className"
              clearable
              @keyup.enter.native="handleQuery"
            /> -->
              </el-table-column>
              <el-table-column
                label="性别"
                align="center"
                prop="xb"
                sortable="custom"
              />
              <el-table-column
                label="工作单位"
                align="center"
                prop="dwmc"
                sortable="custom"
              />
              <el-table-column
                label="已任职班级数量"
                align="center"
                prop="sl"
                sortable="custom"
              />
              <el-table-column label="操作" align="center" width="150px">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="text"
                      size="small"
                      :disabled="scope.row.sffp == '0' ? true : false"
                      @click="assignClass(scope.row)"
                    >
                      <span
                        class="iconfont"
                        :class="
                          scope.row.sffp == '0'
                            ? 'allocate_none'
                            : 'allocate_class'
                        "
                        >&#xe638;</span
                      >
                      <span
                        style="
                          margin-left: 5px;
                          margin-right: 10px;
                          font-size: 16px;
                        "
                        >分配班级</span
                      >
                    </el-button>
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
        </div>
      </div>
    </div>

    <!-- 分配班级对话框 -->
    <el-dialog
      class="assign_class"
      :title="title"
      :visible.sync="openAssignClass"
      width="780px"
      append-to-body
    >
      <el-form :model="form">
        <el-form-item label="任命日期">
          <el-date-picker
            type="date"
            style="width: 30%"
            placeholder="选择任命日期"
            value-format="yyyy-MM-dd"
            v-model="form.rmsj"
          ></el-date-picker>
        </el-form-item>
        <span class="assignTips"
          >确认将【{{ fdyList }}】【{{ xm }}】任命为【{{
            $route.query.bjmc
          }}】辅导员</span
        >
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTips" class="cancel_btn">取消</el-button>
        <el-button @click="submitTips" class="submit_btn">确认</el-button>
      </div>
    </el-dialog>
    <!-- 批量分配班级对话框 -->
    <el-dialog
      class="assign_class"
      :title="title"
      :visible.sync="openAssignMoreClass"
      width="780px"
      append-to-body
    >
      <el-form :model="formMore">
        <el-form-item label="任命日期">
          <el-date-picker
            type="date"
            style="width: 30%"
            placeholder="选择任命日期"
            value-format="yyyy-MM-dd"
            v-model="formMore.rmsj"
          ></el-date-picker>
        </el-form-item>
        <template v-for="item in multipleSelection">
          <div :key="item.gh">
            <span
              >确认将【{{ item.gh }}】【{{ item.xm }}】任命为【{{
                $route.query.bjmc
              }}】辅导员</span
            >
          </div>
        </template>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelMore" class="cancel_btn">取消</el-button>
        <el-button @click="assignMore" class="submit_btn">确认</el-button>
      </div>
    </el-dialog>
    <!-- 取消分配对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openCancelAssign"
      width="780px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="formDismission"
        label-width="100px"
        class="cancel_class"
      >
        <el-form-item label="撤任理由" prop="noticeTitle">
          <el-input
            v-model="formDismission.noticeTitle"
            autocomplete="off"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="撤任日期" prop="offDate">
          <el-date-picker
            type="date"
            style="width: 40%"
            placeholder="选择撤任日期"
            v-model="formDismission.offDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTips" class="cancel_btn">取消</el-button>
        <el-button @click="submitOut" class="submit_btn">确认</el-button>
      </div>
    </el-dialog>

    <!-- 二次确认取消分配对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openSecondCancelAssign"
      width="780px"
      append-to-body
    >
      <span class="cancelTips"
        >确认将取消【{{ fdyList }}】【{{ xm }}】【{{
          $route.query.bjmc
        }}】辅导员任命？</span
      >

      <div slot="footer" classt="dialog-footer">
        <el-button @click="cancelTips" class="cancel_btn">取消</el-button>
        <el-button @click="submitOut2" class="submit_btn">确认</el-button>
      </div>
    </el-dialog>

    <!-- 批量取消分配对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openCancelAssignMore"
      width="780px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="formDismissionMore"
        label-width="100px"
        class="cancel_class"
      >
        <el-form-item label="撤任理由" prop="noticeTitle">
          <el-input
            v-model="formDismissionMore.noticeTitle"
            autocomplete="off"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="撤任日期" prop="offDate">
          <el-date-picker
            type="date"
            style="width: 40%"
            placeholder="选择撤任日期"
            v-model="formDismissionMore.offDate"
            value-format="yyyy-MM-dd hh:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelMore" class="cancel_btn">取消</el-button>
        <el-button @click="submitOutMore" class="submit_btn">确认</el-button>
      </div>
    </el-dialog>

    <!-- 二次确认批量取消分配对话框 -->
    <el-dialog
      class="assign_class"
      :title="title"
      :visible.sync="openSecondCancelAssignMore"
      width="780px"
      append-to-body
      ><template v-for="item in multipleSelection">
        <div :key="item.gh">
          <span
            >确认取消【{{ item.gh }}】【{{ item.xm }}】【{{
              $route.query.bjmc
            }}】辅导员任命</span
          >
        </div>
      </template>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelMore" class="cancel_btn">取消</el-button>
        <el-button @click="cancelAssignMore" class="submit_btn">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/person/iconfont.css";

import assignSearch from "../form/assignSearch.vue";
import assignTable from "../form/assignTable.vue";

import {
  getPlacementPageList,
  getAssignFdy,
  getRemoveAssignFdy,
} from "@/api/class/instructor";
import { getCollege } from "@/api/class/maintenanceClass";
export default {
  name: "assignTea", //分配辅导员
  components: {
    assignSearch,
    assignTable,
  },
  mounted() {
    this.queryParams.bjdm = this.$route.query.bjdm; // 班级编号
    this.getInstructorList();
    this.getOptions();
  },
  activated() {},
  data() {
    return {
      tab_list: ["已分配辅导员", "未分配辅导员"],
      currentIndex: 0,
      // 总条数
      total: 0,
      // 列表数据
      placementPageList: [],
      // 查询参数
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        xgh: "", // 学工号
        xy: "", // 学员代码
        xm: "", // 姓名
        bjdm: "", //班级代码
        sffp: "0",
      },
      // 班级代码
      fdyList: [], // 辅导员数组
      rmrgh: "", // 辅导员工号
      rmsj: "", // 任命时间
      cxsj: "",
      cxrGh: "",
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
      xm: "",
      multipleSelection: [],
      // 表格数据
      noticeList: [],
      // 弹出层标题
      title: "",
      // 筛选框数据
      collegeOptions: [],
      // 是否显示分配班级弹框
      openAssignClass: false,
      //是否显示批量分配
      openAssignMoreClass: false,
      //是否显示批量取消分配
      openCancelAssignMore: false,
      // 是否显示取消分配班级弹框
      openCancelAssign: false,
      // 是否显示第二次取消分配班级单矿
      openSecondCancelAssign: false,
      //是否显示第二次批量取消分配
      openSecondCancelAssignMore: false,
      // 表单参数
      form: {},
      formMore: {},
      formDismission: {},
      formDismissionMore: {},
      xm: "",
      // 表单校验
      rules: {
        // noticeTitle: [
        //   { required: true, message: "公告标题不能为空", trigger: "blur" },
        // ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
    };
  },
  activated() {
    this.queryParams.bjdm = this.$route.query.bjdm;
    this.handleQuery();
  },
  methods: {
    // tab栏切换
    tabClick(index) {
      this.currentIndex = index;
      this.queryParams.pageNum = 1;
      this.queryParams.sffp = index.toString();
      this.$bus.$emit("index", this.currentIndex);
      this.getInstructorList();
    },
    getOptions() {
      this.collegeOptions = [];
      getCollege().then((response) => {
        // 获取工作单位列表数据
        //  console.log(response);
        this.collegeOptions = response.data.rows;
      });
    },
    //辅导员列表查询
    getInstructorList() {
      var data = this.queryParams;
      // if (this.currentIndex == 0) {
      //  getPlacementPageList(data).then((res) => {
      //   this.placementPageList = res.items;
      //   this.total = res.total;

      // });//查询已分配
      // } else if (this.currentIndex == 1) {
      //   getNoPageList(data).then((res) => {
      //   this.placementPageList = res.items;
      //   this.total = res.total;

      // });//查询未分配
      // }

      getPlacementPageList(data).then((res) => {
        this.placementPageList = res.items;
        this.total = res.total;
        // console.log("this.placementPageList:", this.placementPageList);
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
      this.fdyList = this.fdyList.slice(0, -1);
      this.openAssignClass = true;
      this.title = "分配班级";
      this.bjdm = this.$route.query.bjdm;

      this.fdyList.push(row.gh);
      this.xm = row.xm;
    },
    // 分配班级tips点击“确定”按钮
    submitTips() {
      // console.log("分配班级确认！");
      let rmsj = this.form.rmsj;
      let rmrgh = this.$store.getters.userId;
      getAssignFdy({
        bjdm: this.bjdm,
        fdyList: this.fdyList,
        rmrgh,
        rmsj,
      }).then((res) => {
        // console.log(res);

        this.$message({
          message: "分配成功",
          type: "success",
        });
        this.getInstructorList();
      });

      this.openAssignClass = false;
    },
    // 取消按钮关闭窗口
    cancelTips() {
      this.openAssignClass = false;
      this.openCancelAssign = false;
      this.openSecondCancelAssign = false;
      // this.FdyList =[];
    },

    // 取消分配辅导员
    allocateNone(row) {
      this.fdyList = this.fdyList.slice(0, -1);
      this.openCancelAssign = true;
      this.title = "取消分配";
      // console.log("取消分配信息：", row);
      this.bjdm = this.$route.query.bjdm;
      this.fdyList.push(row.gh);
      this.xm = row.xm;

      // this.cxsj = "2020-09-09 00:00:00";
    },
    // 第一个对话框
    // 取消分配tips
    cancelAssignClass() {
      this.openCancelAssign = true;
      this.title = "取消分配";
    },
    submitOut() {
      this.openCancelAssign = false;
      this.openSecondCancelAssign = true;
    },
    // 第二个对话框,撤销二次确认操作
    submitOut2() {
      this.openSecondCancelAssign = false;
      this.title = "取消分配确认";

      // console.log("取消分配二次确认！")
      let crly = this.formDismission.noticeTitle;
      let cxsj = this.formDismission.offDate;
      let cxrGh = this.$store.getters.userId;
      getRemoveAssignFdy({
        cxrGh,
        bjdm: this.bjdm,
        fdyList: this.fdyList,
        crly,
        cxsj,
      }).then((res) => {
        this.$message({
          message: "取消分配成功",
          type: "success",
        });
        this.getInstructorList();
      });
    },
    // handleAssignMore() {
    //   if (this.multipleSelection.length > 0) {
    //     this. openAssignMoreClass= true;
    //     this.title = "批量分配";
    //   } else {
    //     this.$message({
    //       message: "请至少选择一位辅导员！",
    //       type: "warning",
    //     });
    //   }
    // },
    cancelMore() {
      this.openAssignMoreClass = false;
      this.openCancelAssignMore = false;
      this.openSecondCancelAssignMore = false;
    },
    //批量分配二次确认
    assignMore() {
      this.openAssignMoreClass = false;
      let fdyList = [];
      let bjdm = this.$route.query.bjdm;
      let rmrgh = this.$store.getters.userId;
      let rmsj = this.formMore.rmsj;
      for (let item_row of this.multipleSelection) {
        fdyList.push(item_row.gh);
      }
      getAssignFdy({ bjdm, fdyList, rmrgh, rmsj }).then((res) => {
        this.getInstructorList();
      });
    },
    deleteAssignMore() {
      if (this.multipleSelection.length > 0) {
        this.openCancelAssignMore = true;
        this.title = "批量取消分配";
      } else {
        this.$message({
          message: "请至少选择一位辅导员！",
          type: "warning",
        });
      }
    },
    //批量取消第一次确定操作
    submitOutMore() {
      this.openCancelAssignMore = false;
      this.openSecondCancelAssignMore = true;
    },
    //批量取消分配二次确认
    cancelAssignMore() {
      let fdyList = [];
      let bjdm = this.$route.query.bjdm;
      let cxrGh = this.$store.getters.userId;
      let crly = this.formDismissionMore.noticeTitle;
      let cxsj = this.formDismissionMore.offDate;
      for (let item_row of this.multipleSelection) {
        fdyList.push(item_row.gh);
      }

      getRemoveAssignFdy({ fdyList, bjdm, cxrGh, crly, cxsj }).then((res) => {
        this.$message({
          message: "取消分配成功",
          type: "success",
        });
        this.getInstructorList();
      });
      this.openSecondCancelAssignMore = false;
    },
    // 排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.handleQuery();
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
    resetQuery(queryParams) {
      this.$refs[queryParams].resetFields();
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
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
.assign_tea {
  background-color: white;
  padding: 10px;
}
/* 搜索 */
.table-header {
  background-color: #ffffff;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
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
  margin-top: 30px;
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
  /* height: 100vh; */
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
}

.title {
  margin-bottom: 32px;
}
.fptitle-item {
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
.el-button--text {
  border-color: transparent;
  color: #515a6e;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
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
.tab-content {
  padding-left: 40px;
  padding-right: 40px;
  height: 100%;
  background-color: #ffffff;
  margin-top: 24px;
}
</style>
