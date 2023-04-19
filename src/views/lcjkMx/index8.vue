<template>
  <div class="manStudentStyle">
    <div class="searchWrap">
      <div class="search">
        <el-input
          placeholder="请输入"
          v-model.trim="searchVal"
          class="inputSelect"
          clearable
        >
          <el-select
            v-model="select"
            @change="changeSelect"
            class="elSelect"
            slot="prepend"
            placeholder="请选择查询条件"
          >
            <el-option label="学号" value="xh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchBtn"
            @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span> {{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20">
          <el-col :span="6">
            <span>培养单位：</span>
            <el-select
              v-model="moreIform.dwh"
              @change="changeXY"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in allDwh"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>专<span v-html="'\u3000\u3000'"></span>业：</span>
            <el-select
              v-model="moreIform.stuInfo"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in zyOps"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">培养层次：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="training"
                @training="handleCheckAllChangeTraining"
                @checkedTraining="handleCheckedCitiesChangeTraining"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">审核状态：</el-col>
          <el-col :span="8">
            <div class="checkbox">
              <el-select
                v-model="moreIform.ztStatus"
                multiple
                collapse-tags
                placeholder="请选择审核状态"
                size="small"
              >
                <el-option
                  v-for="(item, index) in ztStatus"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">监控列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          :default-sort="{ prop: 'xh', order: 'ascending' }"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            fixed="left"
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="学号"
            prop="xh"
            width="100"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            fixed="left"
            label="姓名"
            prop="xm"
            sortable="custom"
            width="80"
          ></el-table-column>
          <div v-for="(item, index) in tableHeader" :key="index">
            <el-table-column
              :prop="item.dm"
              :label="item.mc"
              min-width="100"
              sortable="custom"
            ></el-table-column>
          </div>
          <el-table-column fixed="right" label="审核进度" width="140">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
    <el-dialog
      title="导出确认"
      :visible.sync="daochuModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelB">取 消</el-button>
        <el-button type="primary" class="confirm" @click="daochu()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <pagination
      v-show="queryParams.total > 0"
      :total="queryParams.total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="handleSearch"
    />
  </div>
</template>

<script>
import CheckboxCom from "../components/checkboxCom";
import lctCom from "../components/lct";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { getManageRegStuInfoSearchSpread } from "@/api/student/index";
import { jsxwcList, jsxwcEXP } from "@/api/lcjk.js";
export default {
  components: { CheckboxCom, lctCom },
  data() {
    return {
      xjydModal: false,
      lctModal: false,
      daochuModal: false,
      searchVal: "",
      select: "",
      isMore: false,
      pycc: "",
      tempRadio: false,
      moreIform: {
        dwh: [], // 学院
        stuInfo: [], // 专业
        pread: [], // 班级
        mk: [],
      },
      ztStatus: [],
      czlx: [],
      allDwh: [], // 学院下拉框
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      pyccOps: [], //培养层次
      datePicker: "",
      manageRegOps: [], //
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      ind: 1,
      len: 0,
      dynamicModal: false,
      tableHeader: [
        { dm: "dwhmc", mc: "培养单位" },
        { dm: "pyccmmc", mc: "培养层次" },
        { dm: "zydmmc", mc: "专业" },
        { dm: "mkmc", mc: "业务名称" },
        { dm: "shsj", mc: "审核时间" },
        { dm: "spjs", mc: "下一批审核角色" },
        { dm: "statusChinese", mc: "审核状态" },
      ],
      allNj: [],
      tableData: [],
      multipleSelection: [],
      showExport: false,
      queryParams: {
        orderZd: "",
        orderPx: "",
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      tableDetail: {},
      thTableModal: false,
      flag: "01",
      multipleSelection1: "",
      AUTHFLAG: false,
    };
  },
  mounted() {
    this.getSpread();
    this.getAllCollege();
    this.getAllGrade(); //年级
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmshrzlx");
    this.getCode("dmsplcm");
    this.handleSearch();
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  activated() {
    this.handleSearch();
  },
  methods: {
    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick(row) {
      if (!!row.processId) {
        this.$refs.child.inner(row.processId);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    // 查询学院
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.stuInfo = []; // 专业
        this.moreIform.pread = []; // 班级
      }
      this.getZY(val);
      this.getBJ(val);
    },
    // 学院找专业
    getZY(val) {
      this.zyOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getZY(data)
          .then((res) => {
            this.zyOps = res.data;
          })
          .catch((err) => {});
      }
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmshrzlx":
              this.czlx = res.data;
              break;
            case "dmsplcm": //审批结果
              this.ztStatus = res.data;
              break;
            case "dmpyccm":
              this.$set(this.training, "checkBox", res.data);
              this.pyccOps = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    // 获取学院专业班级
    getSpread() {
      getManageRegStuInfoSearchSpread()
        .then((res) => {
          this.manageRegOps = res.data.dwhbj;
        })
        .catch((err) => {});
    },
    getBJ(val) {
      this.bjOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getBJ(data)
          .then((res) => {
            this.bjOps = res.data;
          })
          .catch((err) => {});
      }
    },
    //获取年级
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.allNj = res.data.rows;
        })
        .catch((err) => {});
    },
    changeSelect(val) {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        dwh: this.moreIform.dwh,
        zydm: this.moreIform.stuInfo,
        pyccm: this.training.choose,
        // bjm: this.moreIform.pread,
        mk: this.moreIform.mk,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        status: this.moreIform.ztStatus,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      jsxwcList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    // 培养层次全选
    handleCheckAllChangeTraining(val) {
      let allCheck = [];
      for (let i in this.training.checkBox) {
        allCheck.push(this.training.checkBox[i].dm);
      }
      this.training.choose = val ? allCheck : [];

      this.training.isIndeterminate = false;
    },
    // 培养层次单选
    handleCheckedCitiesChangeTraining(value) {
      let checkedCount = value.length;
      this.training.checkAll = checkedCount === this.training.checkBox.length;
      this.training.isIndeterminate =
        checkedCount > 0 && checkedCount < this.training.checkBox.length;
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 打开导出弹窗
    async handleExport() {
      this.daochuModal = true;
    },
    daochu() {
      var ids = this.multipleSelection.map((item) => item.id);
      let data = {
        xh: this.select == "xh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        dwh: this.moreIform.manageReg,
        zydm: this.moreIform.stuInfo,
        pyccm: this.training.choose,
        // bjm: this.moreIform.pread,
        mk: this.moreIform.mk,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
        ids: ids,
        status: this.moreIform.ztStatus,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      jsxwcEXP(data).then((res) => {
        this.downloadFn(res, "教授下午茶监控列表下载", "xlsx");
        if (this.$store.getters.excelcount > 0) {
          this.$message.success(
            `已成功导出${this.$store.getters.excelcount}条数据`
          );
        }
      });
      this.daochuModal = false;
    },
    handleCancelB() {
      this.daochuModal = false;
    }, // 导出取消
    handleCancel() {
      this.showExport = false;
    },

    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
  },
};
</script>

<style lang="scss" scoped>
.yiny {
  border: 1px solid grey;
  height: 50px;
  border-collapse: collapse;
}
.hs {
  flex: 0 0 100px;
  border-right: 1px solid grey;
  text-align: center;
  line-height: 50px;
  border-collapse: collapse;
}
.bs {
  padding-left: 40px;
  line-height: 50px;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.manStudentStyle {
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
      .searchBtn {
      }
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
  .backDetail {
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;

    .formRight {
      width: 100%;
      margin-top: 15px;
      .rowStyle {
        padding: 0 !important;
        margin: 0;
        border-bottom: 1px solid #cccccc;
      }
      .wrap {
        display: flex;
        align-items: center;
        .title {
          flex: 0 0 160px;
          line-height: 48px;
          background: #e0e0e0;
          text-align: right;
          padding-right: 5px;
          margin: 0 !important;
        }
        .content {
          font-weight: 400;
          font-size: 14px;
          color: #1f1f1f;
          line-height: 22px;
          margin-left: 16px;
        }
      }

      .GreenButton {
        //border: 1px solid grey;
        height: 49px;
        border-radius: 2px;
        background: #005657;
      }
      .title1 {
        font-size: 16px;
        text-align: center;
        line-height: 48px;
        color: #fff;
        // vertical-align: middle;
      }
    }
  }
  .baseInfo {
    // padding: 20px;
    margin-left: 30px;
    margin-right: 30px;
    // overflow-x: auto;
    .formLeft {
      background: #fff;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 20px;
      }
    }
  }
  .formRight {
    width: 100%;
    margin-top: 15px;
    .rowStyle {
      padding: 0 !important;
      margin: 0;
      border-bottom: 1px solid #cccccc;
    }
    .wrap {
      display: flex;
      align-items: center;
      .title {
        flex: 0 0 160px;
        line-height: 48px;
        background: #e0e0e0;
        text-align: right;
        padding-right: 5px;
        margin: 0 !important;
      }
      .content {
        font-weight: 400;
        font-size: 14px;
        color: #1f1f1f;
        line-height: 22px;
        margin-left: 16px;
      }
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
        display: flex;

        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
        .title2 {
          font-size: 14px;
          text-align: center;
          line-height: 22px;
          // vertical-align: middle;
        }
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/updata.png") no-repeat;
        }
        .borderBlue {
          border: 1px solid #0d84e0;
          color: #0d84e0;
          background: #ebfafd;
        }
        .btns2 {
          margin-left: 15px;
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
        }
      }
      .headerRight {
        display: flex;
        .dropDown {
          margin-right: 20px;
        }
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
          .controlIcon {
            background: url("~@/assets/images/control.png");
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
    .lct {
      background: url("~@/assets/dangan/lct.png");
    }
    .noflag {
      color: #ccc;
    }
    .handledie {
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
}
</style>
