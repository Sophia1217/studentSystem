<template>
  <div class="basicInfo">
    <div class="searchWrap">
      <!-- 搜索 -->
      <div class="search">
        <el-input
          v-model="searchVal"
          placeholder="请输入..."
          class="inputSelect"
        >
          <el-select
            slot="prepend"
            v-model="select"
            class="elSelect"
            placeholder="请选择查询条件"
          >
            <el-option label="工号" value="gh" />
            <el-option label="姓名" value="xm" />
          </el-select>
          <el-button
            slot="append"
            class="searchButton"
            icon="el-icon-search"
            @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span>更多分类</span>
          <i v-if="!isMore" class="moreIcon chevronDown" />
          <i v-else class="moreIcon chevronUp" />
        </div>
      </div>

      <!-- 更多选择 -->
      <div v-if="isMore" class="moreSelect">
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>工作单位：</span>
            <el-select
              v-model="workPlace"
              multiple
              placeholder="请选择"
              collapse-tags
              @change="workPlaceChange"
            >
              <el-option
                v-for="(item, index) in gzdwOptions"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">性<span v-html="'\u3000\u3000'"></span>别：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="sex"
                @training="handleCheckAllSexChange"
                @checkedTraining="handleCheckedSexChange"
              />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">带班状态：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="status"
                @training="handleCheckAllStatusChange"
                @checkedTraining="handleCheckedStatusChange"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">在岗班主任列表</span> <i class="Updataicon" />
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="handleRemove">
            <i class="icon removeButton" /><span class="title">批量免去</span>
          </div>
          <div class="btns borderGreen" @click="handleImport">
            <i class="icon greenIcon" /><span class="title1">添加班主任</span>
          </div>
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon" /><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          :default-sort="{ prop: 'gh', order: 'ascending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gh" label="工号" sortable />
          <el-table-column prop="xm" label="姓名" sortable />
          <el-table-column prop="lb" label="类别" sortable> </el-table-column>
          <el-table-column prop="xb" label="性别" sortable>
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.xb == 1">男</span>
              <span v-if="scope.row.xb == 2">女</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="gzdw" label="工作单位" min-width="100" sortable />
          <el-table-column prop="dbzt" label="带班状态" min-width="100" sortable>
            <!-- <template slot-scope="scope">
              <div v-if="scope.row.dbzt == 1">
                <span class="greenDot">●</span><span>是</span>
              </div>
              <div v-if="scope.row.dbzt == 0">
                <span class="redDot">●</span><span>否</span>
              </div>
            </template> -->
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          class="pagination"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <!-- 详情对话框 -->
    <el-dialog :visible.sync="open" width="1200px" append-to-body>
      <el-table
        ref="multipleTable"
        :data="tableDataDetail"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @sort-change="changeTableDetailSort"
      >
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column label="在岗日期" prop="rmsj,cxsj" width="180">
          <template slot-scope="scope">
            <!-- <div v-if="tableDataDetail.length > 0"> -->
            <!-- <div v-for=" val in tableDataDetail" :key="tableDataDetail.gh">
                <span
                  >{{ val.rmsj }} 至
                  {{ val.cxsj }}</span>
              </div> -->
            <div v-if="scope.row.cxsj != null">
              <span>{{ scope.row.rmsj }} 至 {{ scope.row.cxsj }}</span>
            </div>
            <div v-if="scope.row.cxsj == null && scope.row.rmsj != null">
              <span>{{ scope.row.rmsj }} 至今</span>
            </div>
            <!-- </div> -->
            <!-- <div></div> -->
          </template>
        </el-table-column>
        <el-table-column prop="lb" label="类别" sortable="custom" />
        <el-table-column
          prop="sxpycc"
          label="所辖培养层次"
          width="150"
          sortable="custom"
        />
        <el-table-column prop="gzdw" label="工作单位" sortable="custom" />

        <el-table-column prop="sfqy" label="任职状态" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.sfqy == 0">
              <span class="greenDot">●</span><span>在岗</span>
            </div>

            <div v-else><span class="redDot">●</span><span>离岗</span></div>
          </template>
        </el-table-column>

        <el-table-column prop="rmrxm" label="任命人" sortable="custom" />
        <el-table-column prop="rmsj" label="任命时间" sortable="custom" />
        <el-table-column prop="cxrxm" label="免去人" sortable="custom" />
        <el-table-column prop="cxsj" label="撤任时间" sortable="custom" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button class="closeButton" @click="cancel">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 批量免去对话框 -->
    <el-dialog :title="title" :visible.sync="showRemove" width="30%">
      <template v-for="item in multipleSelection">
        <div :key="item.gh">
          <span>确认免去【{{ item.gh }}】【{{ item.xm }}】班主任身份？</span>
        </div>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleRemove">取 消</el-button>
        <el-button type="primary" class="confirm" @click="confirmRemove"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导入对话框 -->
    <el-dialog :title="title" :visible.sync="showImport" width="30%">
      <el-form
        label-position="left"
        label-width="100px"
        :model="importForm"
        :inline="true"
        ref="importform"
        :rules="rules"
      >
        <el-form-item label="学工号" prop="gh">
          <el-input v-model="importForm.gh" @input="handleInput" />
        </el-form-item>
        <el-form-item label="姓名" prop="xm">
          <el-select
            v-model="importForm.xm"
            placeholder="未选择"
            @change="selectClick"
          >
            <el-option
              v-for="(item, index) in nameOptions"
              :key="index"
              :label="item.xm + '（' + item.gh + '）'"
              :value="item.xm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所辖培养层次" prop="type">
          <el-select v-model="importForm.sxpycc" placeholder="未选择" multiple>
            <el-option
              v-for="(item, index) in this.Sxpycc"
              :key="index"
              :label="item.mc"
              :value="item.dm"
            ></el-option
          ></el-select>
        </el-form-item>

        <el-form-item label="工作单位" prop="ssxy">
          <el-select v-model="importForm.ssxy" placeholder="未选择">
            <el-option
              v-for="(item, index) in ssxyOptions"
              :key="index"
              :label="item.mc"
              :value="item.dm"
            ></el-option
          ></el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelImport">取 消</el-button>
        <el-button type="primary" class="confirm" @click="submitImport"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导入确认对话框 -->
    <el-dialog :visible.sync="showConfirmImport" width="30%">
      <span
        >确认任命【{{ importForm.gh }}】【{{
          importForm.xm
        }}】班主任身份？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelConfirmImport">取 消</el-button>
        <el-button type="primary" class="confirm" @click="confirmImport"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导出确认对话框 -->
    <el-dialog :title="title" :visible.sync="showExport" width="30%">
      <span>确认导出{{ len }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getTeacherDetailList,
  getTeacherDetail,
  addTeacher,
  removeTeacher,
  exportTeacher,
  getListWorkPlace,
} from "@/api/politicalWork/teacherappoint";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import CheckboxCom from "@/views/components/checkboxCom";
import { getXm } from "@/api/politicalWork/assistantappoint";
import { getCollege } from "@/api/class/maintenanceClass";
export default {
  name: "Teacherappoint",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      // // 用户导入参数
      showImport: false,
      importForm: {
        gh: "",
        xm: "",
        ssxy: "",
        sxpycc: [],
      },
      rules: {
        gh: [{ required: true, message: "工号不能为空", trigger: "blur" }],
        ssxy: [
          { required: true, message: "工作单位不能为空", trigger: "change" },
        ],
      },
      // 确认导入弹出
      showConfirmImport: false,
      // 显示导出
      showExport: false,
      // // 总条数
      total: 0,
      // 免任弹出
      showRemove: false,
      title: "",
      // // 详情弹出层
      open: false,
      // // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dwmcList: [],
        genderList: [],
        lbList: [],
        sfdbList: [],
        gh: "",
        xm: "",
      },
      Sxpycc: [],
      list: [],
      len: 0,
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        value1: "",
      },
      gzdwOptions: [],
      nameOptions: [],
      ssxyOptions: [],
      status: {
        // 状态
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "否", dm: 0 },
          { mc: "是", dm: 1 },
        ],
        isIndeterminate: true,
      },
      sex: {
        // 性别
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "男", dm: 1 },
          { mc: "女", dm: 2 },
        ],
        isIndeterminate: true,
      },
      workPlace: [],
      tableData: [],
      tableDataDetail: [],
      multipleSelection: [],
      detailGh: "",
      removeGh: {
        ghList: [],
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getList();
  },
  mounted() {
    this.getListWorkPlace("dmdwmc"); // 工作单位
    this.getCode("dmxbm"); // 性别
    this.getCode("dmpyccm");
    this.getOptions();
  },
  methods: {
    getOptions() {
      getCollege().then((response) => {
        // 获取培养单位列表数据
        if (response.errcode == "00") {
          this.ssxyOptions = response.data.rows;
        }
      });
    },
    //工作地点勾选
    workPlaceChange() {
      this.queryParams.dwmcList = this.workPlace;
      //this.getList();
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmxbm":
              this.$set(this.sex, "checkBox", res.data);
              break;
            case "dmpyccm":
              this.Sxpycc = res.data;

              break;
          }
        })
        .catch((err) => {});
    },

    getWorkPlace(data) {
      this.getListWorkPlace(data);
    },
    getListWorkPlace(paramsData) {
      const data = { listWorkPlace: paramsData };
      getListWorkPlace(data)
        .then((res) => {
          this.gzdwOptions = res.data.rows;
        })
        .catch((err) => {});
    },

    // 查询
    handleSearch() {
      this.queryParams.pageNum = 1;
      this.queryParams.xm = this.select == "xm" ? this.searchVal : "";
      this.queryParams.gh = this.select == "gh" ? this.searchVal : "";
      this.getList();
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    // 状态全选
    handleCheckAllStatusChange(val) {
      const allCheck = [];
      for (const i in this.status.checkBox) {
        allCheck.push(this.status.checkBox[i].dm);
      }
      this.status.choose = val ? allCheck : [];

      this.status.isIndeterminate = false;
      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.genderList = this.sex.choose;
      this.queryParams.sfdbList = this.status.choose;
      // // 调用接口
      // this.getList();
    },
    // 状态单选
    handleCheckedStatusChange(value) {
      const checkedCount = value.length;
      this.status.checkAll = checkedCount === this.status.checkBox.length;
      this.status.isIndeterminate =
        checkedCount > 0 && checkedCount < this.status.checkBox.length;

      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.genderList = this.sex.choose;
      this.queryParams.sfdbList = this.status.choose;
      // // 调用接口
      // this.getList();
    },
    // 性别全选
    handleCheckAllSexChange(val) {
      const allCheck = [];
      for (const i in this.sex.checkBox) {
        allCheck.push(this.sex.checkBox[i].dm);
      }
      this.sex.choose = val ? allCheck : [];

      this.sex.isIndeterminate = false;
      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.genderList = this.sex.choose;
      this.queryParams.sfdbList = this.status.choose;
      // // 调用接口
      // this.getList();
    },
    // 性别单选
    handleCheckedSexChange(value) {
      const checkedCount = value.length;
      this.sex.checkAll = checkedCount === this.sex.checkBox.length;
      this.sex.isIndeterminate =
        checkedCount > 0 && checkedCount < this.sex.checkBox.length;

      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.genderList = this.sex.choose;
      this.queryParams.sfdbList = this.status.choose;
      // // 调用接口
      // this.getList();
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.list = [...val];
    },
    // 打开导出弹窗
    async handleExport() {
      if (this.multipleSelection.length > 0) {
        this.len = this.multipleSelection.length;
      } else {
        let data = {
          xm: this.select == "xm" ? this.searchVal : "",
          gh: this.select == "gh" ? this.searchVal : "",
          dwmcList: this.workPlace,
          genderList: this.sex.choose,
          sfdbList: this.status.choose,
        };
        this.exportParams = data;
        await getTeacherDetailList(data)
          .then((res) => {
            this.len = res.count;
          })
          .catch((err) => {});
      }
      if (this.len > 0) {
        this.showExport = true;
      } else {
        this.$message.warning("当前无数据导出");
      }

      this.title = "导出";
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      this.showExport = false;
      var arr = this.list.length > 0 ? this.list.map((item) => item.gh) : [];

      var exportParams = this.queryParams;
      exportParams.pageSize = 0;
      this.$set(exportParams, "ghList", arr);
      exportTeacher(exportParams)
        .then((res) => this.downloadFn(res, "班主任任命表", "xlsx"))
        .catch((err) => {});
    },
    // 点击详情
    hadleDetail(row, flag) {
      // getTeacherDetail()
      this.detailGh = row.gh;
      var data = { gh: row.gh };
      getTeacherDetail(data).then((response) => {
        this.tableDataDetail = response.teacherDetailRes;
      });

      this.open = true;
    },
    // ///////////////////////////////////////////////////////////////
    /** 查询岗位列表 */
    getList() {
      getTeacherDetailList(this.queryParams)
        .then((response) => {
          this.tableData = response.resList;
          this.total = response.count;
        })
        .catch((err) => {});
    },

    /** 导入按钮操作 */
    handleImport() {
      this.showImport = true;
      this.title = "添加班主任";
    },

    // // /** 导入提交按钮 */
    submitImport: function () {
      // todo
      this.showImport = false;
      this.showConfirmImport = true;
      //this.resetImportForm();
    },
    // 取消导入提交按钮
    cancelImport() {
      this.showImport = false;
      this.resetImportForm();
    },

    // 确认导入按钮
    confirmImport() {
      this.showConfirmImport = false;
      let data = {
        ghList: [this.importForm.gh],
        xm: this.importForm.xm,
        sxpyccList: this.importForm.sxpycc,
        rzdwh: this.importForm.ssxy,
      };
      addTeacher(data).then((res) => {
        this.getList();
      });
      this.resetImportForm();
    },
    // 取消导入按钮
    cancelConfirmImport() {
      this.showConfirmImport = false;
    },
    // 点击批量免去
    handleRemove() {
      if (this.multipleSelection.length > 0) {
        this.showRemove = true;
        this.title = "免去";
      } else {
        this.$message({
          message: "请至少选择一名班主任！",
          type: "warning",
        });
      }
      // console.log(this.multipleSelection,'this.multipleSelection')
    },
    // 确认批量免去
    confirmRemove() {
      for (var i in this.multipleSelection) {
        this.removeGh.ghList.push(this.multipleSelection[i].gh);
      }
      removeTeacher(this.removeGh).then((res) => {
        this.getList();
      });
      this.showRemove = false;
    },
    // 取消免任
    cancleRemove() {
      this.showRemove = false;
    },

    // 详情取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: [],
      };
      this.resetForm("form");
    },
    resetImportForm() {
      this.importForm = {
        xm: undefined,
        gh: undefined,
        sxpycc: undefined,
        ssxy: undefined,
      };
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    changeTableDetailSort(column) {
      let orderZd = column.prop;
      let orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      var data = { gh: this.detailGh, orderZd: orderZd, orderPx: orderPx };
      getTeacherDetail(data).then((response) => {
        this.tableDataDetail = response.teacherDetailRes;
      });
    },
    //工号查姓名
    handleInput() {
      let inputGh = this.importForm.gh;
      if (inputGh.length >= 5) {
        console.log("输入数大于等于5个");
        getXm({ gh: this.importForm.gh })
          .then((res) => {
            this.nameOptions = res.XmGh;
            console.log("getXm成功");
          })
          .catch((err) => {});
      }
    },
    //选中姓名，工号自动补充
    selectClick(val) {
      for (var i in this.nameOptions) {
        if (this.nameOptions[i].xm == val) {
          this.importForm.gh = this.nameOptions[i].gh;

          //打印看看
          let a = this.importForm.gh;
          console.log("gh", a);
          break;
        }
      }
    },
    /** 详细信息查询 */
    // handleGet(row) {
    //   const name = row.name || ''
    //   this.$router.push({ path: '/basicInfo/detailInfo/index', query: { name: name }})
    // }
  },
};
</script>

<style lang="scss" scoped>
.basicInfo {
  .mt15 {
    margin-top: 15px;
  }
  .searchWrap {
    background: #fff;
    padding: 20px;
    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: #fff;
      .elSelect {
        width: 150px;
      }
      .inputSelect {
        width: 50%;
      }
      .more {
        flex: 0 0 100px;
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #005657;
        cursor: pointer;
        .moreIcon {
          display: block;
          width: 20px;
          height: 20px;
        }
        .chevronDown {
          background: url("~@/assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("~@/assets/images/chevronUp.png") no-repeat;
        }
      }
    }
    .moreSelect {
      margin-top: 20px;
      padding: 20px;
      background: #fafafa;
    }
  }
  .tableWrap {
    background: #fff;
    padding: 20px;
    .headerTop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
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
        align-items: center;
        .borderBlue {
          background: #fff;
          border: 1px solid grey;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fff;
        }
        .borderLight {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
        .borderGreen {
          border: 1px solid grey;
          background: #005657;
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
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
          }
          .removeButton {
            margin-top: 10px;
            background: url("~@/assets/images/icon_remove.png") no-repeat;
          }
        }
      }
    }
    .scopeIncon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    .handleName {
      font-weight: 400;
      font-size: 14px;
      color: #005657;
      line-height: 28px;
    }
    .handledie {
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
  .searchButton {
    background: #005657;
    color: white;
  }
}
.closeButton {
  background: #005657;
  color: white;
}

.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center;
}
.greenDot {
  width: 8px;
  height: 8px;
  color: #23ad6f;
}
.redDot {
  width: 8px;
  height: 8px;
  color: #ed5234;
}
</style>
