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
            placeholder="查询条件"
          >
            <el-option label="工号" value="1" />
            <el-option label="姓名" value="2" />
          </el-select>
          <el-button
            slot="append"
            class="searchButton"
            icon="el-icon-search"
            @click="searchClick"
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
            <el-select v-model="workPlace" multiple placeholder="请选择">
              <el-option
                v-for="(item, index) in gzdwOptions"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">类 别：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="category"
                @training="handleCheckAllCategoryChange"
                @checkedTraining="handleCheckedCategoryChange"
              />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">性 别：</el-col>
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
          <span class="title">在岗辅导员列表</span> <i class="Updataicon" />
        </div>
        <div class="headerRight">
          <div class="btns fullGreen" @click="handleRemove">
            <i class="icon removeButton" /><span class="title">批量免去</span>
          </div>
          <div class="btns borderGreen" @click="handleImport">
            <i class="icon greenIcon" /><span class="title">导入</span>
          </div>
          <div class="btns borderGreen" @click="handleExport">
            <i class="icon greenIcon" /><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="basicInfoList"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gh" label="工号" sortable />
          <el-table-column prop="xm" label="姓名" sortable />
          <el-table-column prop="lb" label="类别" sortable />
          <el-table-column prop="xb" label="性别" sortable />
          <el-table-column prop="gzdw" label="工作单位" sortable />
          <el-table-column prop="dbzt" label="带班状态" sortable />
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
    <!-- 导入对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openInput"
      width="800px"
      height="300px"
      append-to-body
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-form-item label="学工号" prop="gh">
            <el-input v-model="form.gh"></el-input>
          </el-form-item>
          <el-form-item label="姓 名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="类 型" prop="type">
            <el-select v-model="form.type" placeholder="未选择">
              <el-option
                v-for="(item, index) in this.category.checkBox"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option
            ></el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2Cancel">取 消</el-button>
        <el-button type="primary" @click="inputAssistant" class="confirm"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <!-- 导入确认对话框 -->
    <el-dialog :title="title" :visible.sync="openInputSure" width="30%">
      <span>确认任命【{{ form.gh }}】【{{ form.name }}】辅导员身份？</span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog3Cancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addAssistant"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导出确认对话框 -->
    <el-dialog :title="title" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 详情对话框 -->
    <el-dialog :visible.sync="open" width="1200px" append-to-body>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
        @sort-change="changeTableSort"
      >
        <!-- <el-table-column type="index" label="在岗日期" width="50" /> -->
        <el-table-column label="在岗日期" width="180">
          <template slot-scope="scope">
            <div v-if="tableData[0].cxsj != null">
              <span>{{ tableData[0].rmsj }} 至 {{ tableData[0].cxsj }}</span>
            </div>
            <div v-if="tableData[0].cxsj == null && tableData[0].rmsj != null">
              <span>{{ tableData[0].rmsj }} 至今</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="bjbh" label="班级编号" sortable="custom" />
        <el-table-column prop="bjmc" label="班级名称" sortable="custom" />
        <el-table-column prop="pycc" label="培养层次" sortable="custom" />
        <el-table-column prop="pydw" label="培养单位" sortable="custom" />
        <el-table-column prop="nj" label="年级" sortable="custom" />
        <el-table-column prop="sfqy" label="任职状态" sortable="custom">
          <template slot-scope="scope">
            <div v-if="scope.row.sfqy == 1">
              <span class="greenDot">●</span><span>在岗</span>
            </div>
            <!-- <span v-if="scope.row.dbzt == 1">是</span> -->
            <div v-else><span class="redDot">●</span><span>离岗</span></div>
            <!-- <span v-else>否</span> -->
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
          <span>确认免去【{{ item.gh }}】【{{ item.xm }}】辅导员身份？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="rmAssistant"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  resetUserPwd,
  changeUserStatus,
} from "@/api/system/user";
import { getToken } from "@/utils/auth";
import CheckboxCom from "../../components/checkboxCom";
import {
  fdyList,
  removeMoreAssistant,
  addOneAssistant,
  lookDetail,
  outAssistant,
  getGzdw,
} from "@/api/politicalWork/assistantappoint";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "BasicInfo",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      // dicts: ['sys_normal_disable'],
      // // 遮罩层
      // // loading: true,
      // // 用户导入参数
      // upload: {
      //   // 是否显示弹出层（用户导入）

      //   // 弹出层标题（用户导入）
      title: "",
      //   // 是否禁用上传
      //   isUploading: false,
      //   // 是否更新已经存在的用户数据
      //   updateSupport: 0,
      //   // 设置上传的请求头部
      //   headers: { Authorization: 'Bearer ' + getToken() },
      //   // 上传的地址
      //   url: process.env.VUE_APP_BASE_API + '/system/user/importData'
      // },
      // // 显示搜索条件
      // showSearch: true,
      // // 总条数
      total: 0,
      // 批量免去确定框弹出
      showRemove: false,
      // 详情框显示
      open: false,
      //导入框显示
      openInput: false,
      //导入确定框显示
      openInputSure: false,
      // // 查询参数

      searchVal: "",
      select: "",
      isMore: false,
      gzdwOptions: [],
      category: {
        // 类别
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "兼职", dm: 1 },
          { mc: "专职", dm: 0 },
        ],
        isIndeterminate: true,
      },
      sex: {
        // 性别
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      workPlace: [],
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
      form: {
        gh: "",
        name: "",
        type: "",
      },
      rules: {
        ghContent: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
      },
      basicInfoList: [],
      tableData: [],
      multipleSelection: [],
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dwmcList: [],
        genderList: [],
        lbList: [],
        sfdbList: [],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList(this.queryParams);
    this.getCode("dmxbm");
    this.getOption();
  },

  methods: {
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmxbm":
              this.$set(this.sex, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
    },
    getOption() {
      this.gzdwOptions = [];
      getGzdw()
        .then((res) => {
          if (res.errcode == "00") {
            this.gzdwOptions = res.data.rows;
          }
          console.log(res);
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
    },
    //获取数据列表
    getList(queryParams) {
      //Object.assign(queryParams, this.queryParams);
      fdyList(queryParams)
        .then((response) => {
          //console.log(response);
          if (response.errcode == "00") {
            this.basicInfoList = response.resList; // 根据状态码接收数据
            this.total = response.count; //总条数
          }
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },
    //批量免去对话框关闭
    dialogCancel() {
      this.showRemove = false;
    },
    //导入对话框关闭
    dialog2Cancel() {
      this.openInput = false;
      this.reset();
    },
    //任命确认框关闭
    dialog3Cancel() {
      this.openInputSure = false;
    },
    // 详情对话框关闭按钮
    cancel() {
      this.open = false;
    },
    //任命辅导员
    inputAssistant() {
      this.openInputSure = true;
      this.title = "任命";
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    // 类别全选
    handleCheckAllCategoryChange(val) {
      const allCheck = [];
      for (const i in this.category.checkBox) {
        allCheck.push(this.category.checkBox[i].dm);
      }
      this.category.choose = val ? allCheck : [];
      console.log(this.category.choose, "全选");
      this.category.isIndeterminate = false;
    },
    // 类别单选
    handleCheckedCategoryChange(value) {
      const checkedCount = value.length;
      this.category.checkAll = checkedCount === this.category.checkBox.length;
      this.category.isIndeterminate =
        checkedCount > 0 && checkedCount < this.category.checkBox.length;
      console.log(this.category.choose, "单选");
    },
    // 性别全选
    handleCheckAllSexChange(val) {
      const allCheck = [];
      for (const i in this.sex.checkBox) {
        allCheck.push(this.sex.checkBox[i].dm);
      }
      this.sex.choose = val ? allCheck : [];
      console.log(this.sex.choose, "全选");
      this.sex.isIndeterminate = false;
    },
    // 性别单选
    handleCheckedSexChange(value) {
      const checkedCount = value.length;
      this.sex.checkAll = checkedCount === this.sex.checkBox.length;
      this.sex.isIndeterminate =
        checkedCount > 0 && checkedCount < this.sex.checkBox.length;
      console.log(this.sex.choose, "单选");
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //状态全选
    handleCheckAllStatusChange(val) {
      const allCheck = [];
      for (const i in this.status.checkBox) {
        allCheck.push(this.status.checkBox[i].dm);
      }
      this.status.choose = val ? allCheck : [];
      console.log(this.status.choose, "全选");
      this.status.isIndeterminate = false;
    },
    // 状态单选
    handleCheckedStatusChange(value) {
      const checkedCount = value.length;
      this.status.checkAll = checkedCount === this.status.checkBox.length;
      this.status.isIndeterminate =
        checkedCount > 0 && checkedCount < this.status.checkBox.length;
      console.log(this.status.choose, "单选");
    },
    // 打开导出弹窗
    handleExport() {
      this.showExport = true;
      this.title = "导出";
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      this.showExport = false;
      let data = {
        pageNum: 1,
        pageSize: 0,
        dwmcList: this.workPlace,
        lbList: this.category.choose,
        genderList: this.sex.choose,
        sfdbList: this.status.choose,
      };
      outAssistant(data)
        .then((res) => {
          // if (res.errcode == "00") {
          //console.log(res);
          this.downloadFn(res, "辅导员任命导出", "xlsx");
          //}
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
    },
    //批量移除
    rmAssistant() {
      this.showRemove = false;
      let ghlist = [];
      for (let item_row of this.multipleSelection) {
        ghlist.push(item_row.gh);
      }
      let data = {
        ghList: ghlist,
      };
      console.log(data);
      removeMoreAssistant(data)
        .then((res) => {
          if (res.errcode == "00") {
            console.log(res);
            this.getList(this.queryParams);
          }
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
    },
    //导入信息
    addAssistant() {
      this.openInput = false;
      this.openInputSure = false;

      let ghlist = [];

      ghlist.push(this.form.gh);

      let data = {
        ghList: ghlist,
        xm: this.form.name,
        lb: this.form.type,
      };
      addOneAssistant(data)
        .then((res) => {
          if (res.errcode == "00") {
            console.log(res);
            this.getList(this.queryParams);
          }
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
      this.reset();
    },
    //点击详情
    hadleDetail(row, flag) {
      this.open = true;
      this.title = "详情";
      let ghdata = {
        gh: row.gh,
      };
      lookDetail(ghdata)
        .then((res) => {
          if (res.errcode == "00") {
            //console.log(res);
            this.tableData = res.assistantDetailRes;
          }
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },

    /** 导入按钮操作 */
    handleImport() {
      this.openInput = true;
      this.title = "导入辅导员";
    },
    /**批量免去按钮*/
    handleRemove() {
      this.showRemove = true;
      this.title = "免去";
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        "system/user/importTemplate",
        {},
        `user_template_${new Date().getTime()}.xlsx`
      );
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(
        "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
          response.msg +
          "</div>",
        "导入结果",
        { dangerouslyUseHTMLString: true }
      );
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },

    /** 提交按钮 */
    submitForm: function () {
      // todo
      this.open = false;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.userId != undefined) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

    // 表单重置
    reset() {
      this.form = {
        name: undefined,
        gh: undefined,
        type: undefined,
      };
      //this.resetForm("form");
    },
    // 搜索查询按钮
    searchClick() {
      console.log(this.select);
      let str = [];
      let name, gonghao;
      if (this.select == "1") {
        gonghao = this.searchVal;
        name = "";
      } else if (this.select == "2") {
        name = this.searchVal;
        gonghao = "";
      } else {
        name = "";
        gonghao = "";
      }
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        dwmcList: this.workPlace,
        lbList: this.category.choose,
        genderList: this.sex.choose,
        sfdbList: this.status.choose,
        xm: name,
        gh: gonghao,
      };
      //console.log(queryParams);
      this.getList(this.queryParams);
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.searchClick();
    },
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
        width: 110px;
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
        .borderBlue {
          border: 1px solid #0d84e0;
          color: #0d84e0;
          background: #ebfafd;
        }
        .borderOrange {
          border: 1px solid #cc3014;
          color: #cc3014;
          background: #fdf6f3;
        }
        .borderLight {
          border: 1px solid #0090a1;
          color: #0090a1;
          background: #e7fcfc;
        }
        .borderGreen {
          border: 1px solid #005657;
          color: #005657;
          background: #fff;
        }
        .fullGreen {
          // border:1px solid #005657;
          color: #fff;
          background: #005657;
        }
        .btns {
          margin-right: 15px;
          padding: 5px 10px;
          cursor: pointer;
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 22px;
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
            background: url("~@/assets/images/icon_1.png") no-repeat;
          }
          .orangeIcon {
            background: url("~@/assets/images/icon_2.png") no-repeat;
          }
          .lightIcon {
            background: url("~@/assets/images/icon_3.png") no-repeat;
          }
          .greenIcon {
            background: url("~@/assets/images/export.png");
          }
          .removeButton {
            background: url("~@/assets/images/icon_remove.png");
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
