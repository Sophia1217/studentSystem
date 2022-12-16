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
            @change="selectChange"
            placeholder="请选择查询条件"
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
          <el-col :span="12">
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
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <span>年<span v-html="'\u3000\u3000'"></span>级：</span>
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
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt15">
          <el-col :span="3">类<span v-html="'\u3000\u3000'"></span>型：</el-col>
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
          <el-col :span="3">所辖培养层次：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="pyccOps"
                @training="handleCheckAllpyccChange"
                @checkedTraining="handleCheckedpyccChange"
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
          <span class="title">辅导员自评列表</span> <i class="Updataicon" />
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="basicInfoList"
          style="width: 100%"
          :default-sort="{ prop: 'gh', order: 'ascending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gh" label="工号" sortable />
          <el-table-column prop="xm" label="姓名" sortable="custom" />
          <el-table-column prop="lb" label="类型" sortable="custom" />

          <el-table-column
            prop="gzdw"
            label="工作单位"
            min-width="100"
            sortable="custom"
          />
          <el-table-column prop="xb" label="年级" sortable="custom" />
          <el-table-column
            prop="dbzt"
            label="所辖培养层次"
            min-width="100"
            sortable="custom"
          />
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
import { addUser, updateUser } from "@/api/system/user";
import { getToken } from "@/utils/auth";
import CheckboxCom from "../../components/checkboxCom";
import {
  fdyList,
  removeMoreAssistant,
  addOneAssistant,
  lookDetail,
  outAssistant,
  getGzdw,
  getXm,
} from "@/api/politicalWork/assistantappoint";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getCollege } from "@/api/class/maintenanceClass";
export default {
  name: "BasicInfo",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      title: "",
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
      nameOptions: [],
      ssxyOptions: [],
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
      pyccOps: {
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

      Sxpycc: [],
      detailGh: "",
      basicInfoList: [],
      tableData: [],
      multipleSelection: [],

      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dwmcList: [],
        genderList: [],
        lbList: [],
        sfdbList: [],
        orderZd: "",
        orderPx: "",
        xm: "",
        gh: "",
      },
      list: [],
      len: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList(this.queryParams);
    this.getCode("dmxbm");
    this.getCode("dmpyccm");
    this.getOption();
  },
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },

  methods: {
    //工作地点勾选
    workPlaceChange() {
      this.queryParams.dwmcList = this.workPlace;
      // this.getList(this.queryParams);
    },
    selectChange(val) {
      this.searchVal = "";
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmpyccm":
              this.Sxpycc = res.data;
              this.$set(this.pyccOps, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
    },
    getOption() {
      this.gzdwOptions = [];
      this.ssxyOptions = [];
      getGzdw()
        .then((res) => {
          if (res.errcode == "00") {
            this.gzdwOptions = res.data.rows;
          }
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
      getCollege().then((response) => {
        // 获取培养单位列表数据
        if (response.errcode == "00") {
          this.ssxyOptions = response.data.rows;
        }
      });
    },
    //获取数据列表
    getList() {
      // console.log(this.select, "select");
      this.queryParams.gh = this.select == 1 ? this.searchVal : "";
      this.queryParams.xm = this.select == 2 ? this.searchVal : "";
      fdyList(this.queryParams)
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

      this.category.isIndeterminate = false;
      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.genderList = this.pyccOps.choose;
      this.queryParams.sfdbList = this.status.choose;
      this.queryParams.lbList = this.category.choose;
    },
    // 类别单选
    handleCheckedCategoryChange(value) {
      const checkedCount = value.length;
      this.category.checkAll = checkedCount === this.category.checkBox.length;
      this.category.isIndeterminate =
        checkedCount > 0 && checkedCount < this.category.checkBox.length;
      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.genderList = this.pyccOps.choose;
      this.queryParams.sfdbList = this.status.choose;
      this.queryParams.lbList = this.category.choose;
    },
    // 性别全选
    handleCheckAllpyccChange(val) {
      const allCheck = [];
      for (const i in this.pyccOps.checkBox) {
        allCheck.push(this.pyccOps.checkBox[i].dm);
      }
      this.pyccOps.choose = val ? allCheck : [];

      this.pyccOps.isIndeterminate = false;
      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.genderList = this.pyccOps.choose;
      this.queryParams.sfdbList = this.status.choose;
      this.queryParams.lbList = this.category.choose;
    },
    // 性别单选
    handleCheckedpyccChange(value) {
      const checkedCount = value.length;
      this.pyccOps.checkAll = checkedCount === this.pyccOps.checkBox.length;
      this.pyccOps.isIndeterminate =
        checkedCount > 0 && checkedCount < this.pyccOps.checkBox.length;
      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.genderList = this.pyccOps.choose;
      this.queryParams.sfdbList = this.status.choose;
      this.queryParams.lbList = this.category.choose;
    },

    // 多选
    handleSelectionChange(val) {
      console.log("val", val);
      this.multipleSelection = val;
      this.list = [...val]; // 存储已被勾选的数据
    },
    //状态全选
    handleCheckAllStatusChange(val) {
      const allCheck = [];
      for (const i in this.status.checkBox) {
        allCheck.push(this.status.checkBox[i].dm);
      }
      this.status.choose = val ? allCheck : [];

      this.status.isIndeterminate = false;
      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.genderList = this.pyccOps.choose;
      this.queryParams.sfdbList = this.status.choose;
      this.queryParams.lbList = this.category.choose;
    },
    // 状态单选
    handleCheckedStatusChange(value) {
      const checkedCount = value.length;
      this.status.checkAll = checkedCount === this.status.checkBox.length;
      this.status.isIndeterminate =
        checkedCount > 0 && checkedCount < this.status.checkBox.length;
      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.genderList = this.pyccOps.choose;
      this.queryParams.sfdbList = this.status.choose;
      this.queryParams.lbList = this.category.choose;
    },

    //点击详情
    hadleDetail(row, flag) {
      this.open = true;
      this.title = "详情";
      this.detailGh = row.gh;
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

    // 搜索查询按钮
    searchClick() {
      this.queryParams.pageNum = 1;
      this.queryParams.dwmcList = this.workPlace;
      this.queryParams.lbList = this.category.choose;
      this.queryParams.genderList = this.pyccOps.choose;
      this.queryParams.sfdbList = this.status.choose;

      this.getList(this.queryParams);
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.searchClick();
    },
    // 打开导出弹窗
    async handleExport() {
      if (this.multipleSelection.length > 0) {
        this.len = this.multipleSelection.length;
      } else {
        let data = {
          gh: this.select == 1 ? this.searchVal : "",
          xm: this.select == 2 ? this.searchVal : "",
          dwmcList: this.workPlace,
          genderList: this.pyccOps.choose,
          sfdbList: this.status.choose,
          lbList: this.category.choose,
        };
        this.exportParams = data;
        await fdyList(data)
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
      var arr = this.list.length > 0 ? this.list.map((item) => item.gh) : [];

      var exportParams = this.queryParams;
      exportParams.pageSize = 0;
      this.$set(exportParams, "ghList", arr);

      outAssistant(exportParams)
        .then((res) => this.downloadFn(res, "辅导员任命导出", "xlsx"))
        .catch((err) => {});

      this.showExport = false;
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
