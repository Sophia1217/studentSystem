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
            placeholder="查询条件"
          >
            <el-option label="工号" value="1" />
            <el-option label="姓名" value="2" />
            <el-option label="班级编号" value="3" />
            <el-option label="班级名称" value="4" />
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
            <span>培养单位：</span>
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
            <span>年 级：</span>
            <el-select v-model="nj" multiple placeholder="请选择" collapse-tags>
              <el-option
                v-for="(item, index) in njOps"
                :key="index"
                :label="item"
                :value="item"
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
          <el-col :span="3">岗 位：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="workgw"
                @training="handleCheckAllWorkgwChange"
                @checkedTraining="handleCheckedWorkgwChange"
              />
            </div>
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
          <el-col :span="12">
            <span>任职日期：</span>
            <el-date-picker
              v-model="rzDate"
              type="daterange"
              unlink-panels
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">带班记录</span> <i class="Updataicon" />
        </div>
        <div class="headerRight">
          <div class="btns fullGreen" @click="handleRemove">
            <span class="title">取消带班</span>
          </div>
          <!-- <div class="btns borderGreen" @click="handleImport">
            <i class="icon greenIcon" /><span class="title">添加辅导员</span>
          </div>
          <div class="btns borderGreen" @click="handleExport">
            <i class="icon greenIcon" /><span class="title">导出</span>
          </div> -->
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
          <el-table-column prop="gwmc" label="岗位" sortable="custom" />
          <el-table-column prop="lxmc" label="类型" sortable="custom" />
          <el-table-column prop="bjdm" label="班级编号" sortable="custom" />
          <el-table-column prop="bjmc" label="班级名称" sortable="custom" />
          <el-table-column prop="dwmc" label="培养单位" sortable="custom" />
          <el-table-column prop="pyccmc" label="培养层次" sortable="custom" />
          <el-table-column prop="nj" label="年级" sortable="custom" />
          <el-table-column prop="rzrq" label="任职日期" sortable="custom" />
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

    <!-- 批量免去对话框 -->
    <el-dialog :title="title" :visible.sync="showRemove" width="30%">
      <template v-for="(item, index) in multipleSelection">
        <div :key="index">
          <span
            >确认取消【{{ item.xm }}】作为【{{ item.bjmc }}】的【{{
              item.gwmc
            }}】带班？</span
          >
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="removeDuty"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRecordList, removeDuty } from "@/api/class/dutyRecord";

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

import { getCollege, getGrade } from "@/api/class/maintenanceClass";
export default {
  name: "dutyRecord",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      title: "",
      // // 总条数
      total: 0,
      // 批量免去确定框弹出
      showRemove: false,

      // // 查询参数

      searchVal: "",
      select: "",
      isMore: false,
      gzdwOptions: [],
      njOps: [],
      ssxyOptions: [],
      category: {
        // 类型
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "兼职", dm: "1" },
          { mc: "专职", dm: "0" },
        ],
        isIndeterminate: true,
      },
      workgw: {
        // 岗位
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "班主任", dm: "07" },
          { mc: "辅导员", dm: "06" },
        ],
        isIndeterminate: true,
      },
      workPlace: [],
      nj: [],
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      rzDate: "",
      basicInfoList: [],
      tableData: [],
      multipleSelection: [],
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dwhList: [],
        gwdmList: [],
        lxdmList: [],
        pyccmList: [],
        orderZd: "",
        orderPx: "",
        xm: "",
        gh: "",
        bjdm: "",
        bjmc: "",
        njList: [], //年纪
        rzrqStart: "",
        rzrqEnd: "", //任职日期
      },
      list: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList(this.queryParams);

    this.getCode("dmpyccm");
    this.getOption();
  },

  methods: {
    //工作地点勾选
    workPlaceChange() {
      this.queryParams.dwhList = this.workPlace;
      // this.getList(this.queryParams);
    },
    //年级
    njChange() {
      this.queryParams.njList = this.nj;
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
            case "dmpyccm": //培养层次
              this.$set(this.training, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
    },
    getOption() {
      this.gzdwOptions = [];
      this.njOps = [];
      getCollege()
        .then((res) => {
          this.gzdwOptions = res.data.rows;
        })
        .catch((err) => {});
      getGrade()
        .then((res) => {
          this.njOps = res.data.rows;
        })
        .catch((err) => {});
    },
    //获取数据列表
    getList() {
      // console.log(this.select, "select");

      getRecordList(this.queryParams)
        .then((response) => {
          console.log(response);
          if (response.errcode == "00") {
            this.basicInfoList = response.data; // 根据状态码接收数据
            this.total = response.totalCount; //总条数
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

    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    // 类型全选
    handleCheckAllCategoryChange(val) {
      const allCheck = [];
      for (const i in this.category.checkBox) {
        allCheck.push(this.category.checkBox[i].dm);
      }
      this.category.choose = val ? allCheck : [];

      this.category.isIndeterminate = false;
    },
    // 类型单选
    handleCheckedCategoryChange(value) {
      const checkedCount = value.length;
      this.category.checkAll = checkedCount === this.category.checkBox.length;
      this.category.isIndeterminate =
        checkedCount > 0 && checkedCount < this.category.checkBox.length;
    },
    // 岗位全选
    handleCheckAllWorkgwChange(val) {
      const allCheck = [];
      for (const i in this.workgw.checkBox) {
        allCheck.push(this.workgw.checkBox[i].dm);
      }
      this.workgw.choose = val ? allCheck : [];
      this.workgw.isIndeterminate = false;
    },
    // 岗位单选
    handleCheckedWorkgwChange(value) {
      const checkedCount = value.length;
      this.workgw.checkAll = checkedCount === this.workgw.checkBox.length;
      this.workgw.isIndeterminate =
        checkedCount > 0 && checkedCount < this.workgw.checkBox.length;
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
      console.log("val", val);
      this.multipleSelection = val;
      this.list = [...val]; // 存储已被勾选的数据
    },

    //批量移除
    removeDuty() {
      this.showRemove = false;
      let ghlist = [];
      let gwlist = [];
      let bjdmlist = [];

      for (let item_row of this.multipleSelection) {
        ghlist.push(item_row.gh);
        gwlist.push(item_row.gwdm);
        bjdmlist.push(item_row.bjdm);
      }
      let data = {
        ghList: ghlist,
        gwList: gwlist,
        bjdmList: bjdmlist,
      };

      removeDuty(data)
        .then((res) => {
          if (res.errcode == "00") {
            this.getList();
            this.$message.success("操作成功！");
          }
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
    },
    // // 打开导出弹窗
    // handleExport() {
    //   this.showExport = true;
    //   this.title = "导出";
    // },
    // // 导出取消
    // handleCancel() {
    //   this.showExport = false;
    // },
    // // 导出确认
    // handleConfirm() {
    //   this.showExport = false;
    //   var arr = this.list.length > 0 ? this.list.map((item) => item.gh) : [];
    //   var data = { ghList: arr };
    //   var exportParams = this.queryParams;
    //   exportParams.pageSize = 0;
    //   Object.assign(data, this.exportParams);
    //   outAssistant(data)
    //     .then((res) => this.downloadFn(res, "辅导员任命导出", "xlsx"))
    //     .catch((err) => {});
    // },

    // //导入信息
    // addAssistant() {
    //   this.openInput = false;
    //   this.openInputSure = false;

    //   let ghlist = [];

    //   ghlist.push(this.form.gh);

    //   let data = {
    //     ghList: ghlist,
    //     xm: this.form.name,
    //     lb: this.form.type,
    //     sxpyccList: this.form.sxpycc,
    //     rzdwh: this.form.ssxy,
    //   };
    //   addOneAssistant(data)
    //     .then((res) => {
    //       if (res.errcode == "00") {
    //         this.getList();
    //       }
    //     })
    //     .catch((err) => {
    //       //this.$message.error(err.errmsg);
    //     });
    //   this.reset();
    // },
    // //点击详情
    // hadleDetail(row, flag) {
    //   this.open = true;
    //   this.title = "详情";
    //   this.detailGh = row.gh;
    //   let ghdata = {
    //     gh: row.gh,
    //   };
    //   lookDetail(ghdata)
    //     .then((res) => {
    //       if (res.errcode == "00") {
    //         //console.log(res);
    //         this.tableData = res.assistantDetailRes;
    //       }
    //     })
    //     .catch((err) => {
    //       // this.$message.error(err.errmsg);
    //     });
    // },

    // /** 导入按钮操作 */
    // handleImport() {
    //   this.openInput = true;
    //   this.title = "添加辅导员";
    // },
    /**批量免去按钮*/
    handleRemove() {
      if (this.multipleSelection.length > 0) {
        this.showRemove = true;
        this.title = "取消带班";
      } else {
        this.$message({
          message: "请至少选择一名人员！",
          type: "warning",
        });
      }
    },

    // 搜索查询按钮
    searchClick() {
      let rqs = "";
      let rqe = "";
      if (this.rzDate && this.rzDate.length > 0) {
        rqs = this.rzDate[0];
        rqe = this.rzDate[1];
      }
      this.queryParams.gh = this.select == 1 ? this.searchVal : "";
      this.queryParams.xm = this.select == 2 ? this.searchVal : "";
      this.queryParams.bjdm = this.select == 3 ? this.searchVal : "";
      this.queryParams.bjmc = this.select == 4 ? this.searchVal : "";
      this.queryParams.njList = this.nj;
      this.queryParams.dwhList = this.workPlace;
      this.queryParams.gwdmList = this.workgw.choose;
      this.queryParams.lxdmList = this.category.choose;
      this.queryParams.pyccmList = this.training.choose;
      this.queryParams.rzrqStart = rqs;
      this.queryParams.rzrqEnd = rqe;
      this.getList(this.queryParams);
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.searchClick();
    },
    // changeTableDetailSort(column) {
    //   let orderZd = column.prop;
    //   let orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
    //   var data = { gh: this.detailGh, orderZd: orderZd, orderPx: orderPx };
    //   lookDetail(data)
    //     .then((res) => {
    //       if (res.errcode == "00") {
    //         //console.log(res);
    //         this.tableData = res.assistantDetailRes;
    //       }
    //     })
    //     .catch((err) => {
    //       // this.$message.error(err.errmsg);
    //     });
    // },
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
