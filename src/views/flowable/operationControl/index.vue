<template>
  <div class="manStudentStyle">
    <div class="searchWrap">
      <div class="search">
        <el-input
          placeholder="请输入查询业务名称"
          v-model.trim="searchVal"
          class="inputSelect"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchBtn"
            @click="handleSearch"
            >查询</el-button
          >
        </el-input>
      </div>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">业务管理列表</span> <i class="Updataicon"></i>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
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
          <div v-for="(item, index) in tableHeader" :key="index">
            <el-table-column
              :prop="item.dm"
              :label="item.mc"
              sortable="custom"
            ></el-table-column>
          </div>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">配置流程</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="配置流程" :visible.sync="showExport" width="25%">
      <el-form>
        <el-form-item label="业务名称" label-width="120px"
          ><el-input v-model="businessName" :disable="true"></el-input
        ></el-form-item>
        <el-form-item label="流程选择" label-width="120px">
          <el-select
            placeholder="请选择"
            @change="seletChange"
            collapse-tags
            v-model="value"
          >
            <el-option
              v-for="(item, index) in resOptions"
              :key="index"
              :label="item.name"
              :value="item.deploymentId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="confirm" @click="save">保存</el-button>
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
import { queryControl, listDefinition, edit } from "@/api/flowable/definition";
export default {
  name: "opControl",
  data() {
    return {
      searchVal: "",
      value: "",
      tableHeader: [
        { dm: "businessname", mc: "业务名称" },
        { dm: "flowname", mc: "流程名称" },
        { dm: "flowid", mc: "流程编号" },
        { dm: "flowkey", mc: "流程标识" },
        { dm: "updateTime", mc: "绑定时间" },
      ],
      businessName: "",
      tableData: [],
      multipleSelection: [],
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      resOptions: [],
      queryParamsInner: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        category: null,
        key: null,
        tenantId: null,
        deployTime: null,
        derivedFrom: null,
        derivedFromRoot: null,
        parentDeploymentId: null,
        engineVersion: null,
      },
      addParams: { flowid: "", flowkey: "", flowname: "", id: "" },
    };
  },

  mounted() {
    this.handleSearch();
  },
  activated() {
    this.handleSearch();
  },
  methods: {
    save() {
      var data = this.addParams;
      edit(data).then((res) => {
        if ((res.errcode = "00")) {
          this.$message.success("配置流程修改成功");
          this.handleSearch();
          this.showExport = false;
          this.addParams = { flowid: "", flowkey: "", flowname: "", id: "" };
        }
      });
    },
    seletChange(val) {
      var obj = {};
      obj = this.resOptions.find(function (i) {
        return i.deploymentId === val;
      });
      this.addParams.flowid = obj.deploymentId;
      this.addParams.flowkey = obj.flowKey;
      this.addParams.flowname = obj.name;
    },
    // 查询
    handleSearch() {
      let data = {
        businessname: this.searchVal,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      listDefinition(this.queryParamsInner).then((response) => {
        this.resOptions = response.data.records;
      });
      queryControl(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    hadleDetail(row) {
      this.businessName = row.businessname;
      this.addParams.id = row.id;
      this.showExport = true;
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
.expandOpen {
  width: 80%;
  height: 100px;
  overflow: hidden;
  padding: 10px;
  margin-left: -10px;
}
.expandClose {
  width: 80%;
  height: 310px;
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
      .elSelect {
        width: 150px;
      }
      .inputSelect {
        width: 20%;
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
          background: url("../../../assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("../../../assets/images/chevronUp.png") no-repeat;
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
        }
      }
    }
    .scopeIncon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    .handledie {
      background: url("../../../assets/images/details.png");
    }
    .handleName {
      font-weight: 400;
      font-size: 14px;
      color: #005657;
      line-height: 28px;
    }
    .noflag {
      color: #ccc;
    }
  }
}
</style>
