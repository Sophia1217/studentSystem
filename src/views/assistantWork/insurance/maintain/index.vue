<template>
  <div class="talkRec">
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
            placeholder="查询条件"
          >
            <el-option label="险种名称" value="xzmc"></el-option>
            <el-option label="险种类型" value="xzlx"></el-option>
            <el-option label="承保公司" value="cbgs"></el-option>
            <el-option label="联系人" value="lxr"></el-option>
            <el-option label="联系电话" value="lxdh"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
        </el-input>
      </div>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">险种信息维护</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="mbDown1()">
            <i class="icon lightIcon"></i><span class="title">模板下载</span>
          </div>
          <div class="btns borderBlue">
            <el-upload
              accept=".xlsx,.xls"
              :auto-upload="true"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="fileHeader"
              :on-success="upLoadSuccess"
              :on-error="upLoadError"
            >
              <i class="icon blueIcon"></i><span class="title">导入</span>
            </el-upload>
          </div>
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xzmc" label="险种名称" sortable="custom">
          </el-table-column>
          <el-table-column prop="xzlx" label="险种类型" sortable="custom">
          </el-table-column>
          <el-table-column prop="cbgs" label="承包公司" sortable="custom">
          </el-table-column>
          <el-table-column prop="lxr" label="联系人" sortable="custom">
          </el-table-column>
          <el-table-column prop="lxdh" label="联系电话" sortable="custom">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" sortable="custom">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail2(scope.row, 1)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">详情</span>
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="hadleDetail2(scope.row, 2)"
              >
                <i class="scopeIncon handleEdit"></i>
                <span class="handleName">编辑</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      />
    </div>
    <el-dialog :title="title" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="expBx"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CheckboxCom from "../../../components/checkboxCom";
import { getToken } from "@/utils/auth";
import {
  maintainQuery,
  maintainExp,
  mbDown1,
} from "@/api/assistantWork/baoxian";

export default {
  components: { CheckboxCom },
  computed: {
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
        };
      },
    },
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/fdyXpx/importXzxx",
      delArr: [],
      searchVal: "",
      select: "",
      isMore: false,
      showExport: false,
      title: "",
      dateArray: [],
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },

  mounted() {
    this.handleSearch();
  },
  activated() {
    this.handleSearch();
  },

  methods: {
    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.handleSearch();
        this.$message({
          type: "success",
          message: res.errmsg,
        });
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },
    mbDown1() {
      mbDown1().then((res) => {
        this.downloadFn(res, "学平险维护模板下载", "xlsx");
      });
    },
    handleExport() {
      this.showExport = true;
      this.title = "导出";
    },
    handleCancel() {
      this.showExport = false;
    },
    expBx() {
      if (this.delArr && this.delArr.length > 0) {
        var ids = this.delArr;
        maintainExp({ ids: ids }).then((res) => {
          this.downloadFn(res, "保险维护信息下载", "xlsx");
          this.handleSearch();
        });
      } else {
        let data = {
          xzmc: this.select == "xzmc" ? this.searchVal : null,
          xzlx: this.select == "xzlx" ? this.searchVal : null,
          cbgs: this.select == "cbgs" ? this.searchVal : null,
          lxr: this.select == "lxr" ? this.searchVal : null,
          lxdh: this.select == "lxdh" ? this.searchVal : null,
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
          orderZd: this.queryParams.orderZd,
          orderPx: this.queryParams.orderPx,
        };
        maintainExp({ ...data }).then((res) => {
          this.downloadFn(res, "保险维护信息下载", "xlsx");
          this.handleSearch();
        });
      }
      this.showExport = false;
    },
    del() {
      if (this.delArr && this.delArr.length > 0) {
        delTalk({ ids: this.delArr }).then((res) => this.handleSearch());
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    hadleDetail1() {
      this.$router.push({
        path: "/assistantWork/addTalk",
      });
    },
    hadleDetail2(row, index) {
      const { id } = row;
      this.$router.push({
        path: "/assistantWork/maintainBx",
        query: { id: id, state: index },
      });
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xzmc: this.select == "xzmc" ? this.searchVal : null,
        xzlx: this.select == "xzlx" ? this.searchVal : null,
        cbgs: this.select == "cbgs" ? this.searchVal : null,
        lxr: this.select == "lxr" ? this.searchVal : null,
        lxdh: this.select == "lxdh" ? this.searchVal : null,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      maintainQuery(data)
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
    //记录状态：全选
    ztjlAll(val) {
      let allCheck = [];
      for (let i in this.ztjl.checkBox) {
        allCheck.push(this.ztjl.checkBox[i].dm);
      }
      this.ztjl.choose = val ? allCheck : [];

      this.ztjl.isIndeterminate = false;
    },
    // 是否在校：单选
    ztjlCheck(value) {
      let checkedCount = value.length;
      this.ztjl.checkAll = checkedCount === this.ztjl.checkBox.length;
      this.ztjl.isIndeterminate =
        checkedCount > 0 && checkedCount < this.ztjl.checkBox.length;
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delArr = this.multipleSelection.map((item) => item.id);
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
.talkRec {
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .handleEdit {
    background: url("~@/assets/images/edit.png");
  }
  .handledie {
    background: url("~@/assets/images/details.png");
  }

  .scopeIncon1 {
    display: inline-block;
    width: 20px;
    height: 16px;
    vertical-align: middle;
  }
  .ywc {
    background: url("~@/assets/assistantPng/blue.png") no-repeat;
  }
  .djl {
    background: url("~@/assets/assistantPng/red.png") no-repeat;
  }

  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
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
          background: url("../../../../assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("../../../../assets/images/chevronUp.png") no-repeat;
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
          background: url("../../../../assets/images/updata.png") no-repeat;
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
          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
          }
          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
          }

          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
        }
      }
    }
  }
}
</style>
