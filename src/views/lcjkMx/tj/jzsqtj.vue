<template>
  <div class="talkRec">
    <div class="searchWrap">
      <div class="search">
        <div class="checkbox">
          <el-select
            v-model="mk"
            @change="mkchange"
            placeholder="请选择"
            value-key="dm"
            size="medium"
          >
            <el-option
              v-for="item in MKLIST"
              :key="item.dm"
              :label="item.mc"
              :value="item"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">审核统计表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
           
          <div class="btns borderOrange" @click="handleExport"  v-if="testDate.length > 0">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          id="table"
          ref="excelDom"
          :data="testDate"
          style="width: 100%"
          :span-method="arraySpanMethod"
        >
          <div v-for="(item, index) in tableHeader" :key="index">
            <el-table-column
              :prop="item.name"
              :label="item.value"
              min-width="100"
            ></el-table-column>
          </div>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="expTalk"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { expTalk } from "@/api/assistantWork/talk";
import { utils, writeFile, read } from "xlsx";
import { lctjTable, lctjHeader, getMkIdAndMkList } from "@/api/common/liucheng";
export default {
  data() {
    return {
      tableHeader: [],
      mk: {},
      testDate: [],
      isMore: false,
      MKLIST: [], //模块
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      // 1:日常事务，2：评奖评优，3：奖助申请
      var data = {
        type: 3,
      };
      getMkIdAndMkList(data).then((res) => {
        this.MKLIST = res.data;
      });
    },
    mkchange(value) {
      lctjHeader(value.dm).then((res) => {
        var categoryProp = res.data;
        const categoryPropXData = Object.keys(categoryProp || {});
        const categoryPropYData = Object.values(categoryProp || {});
        const newDataArr = [];
        categoryPropXData.map((item, index) => {
          newDataArr.push({
            name: item,
            value: categoryPropYData[index],
          });
        });
        this.tableHeader = newDataArr;
        this.moveLastToFirst(this.tableHeader);
      });
      lctjTable({ mkId: value.dm }).then((res) => {
        this.testDate = res.data;
      });
    },
    moveLastToFirst(list) {
      if (list !== null && list.length > 0) {
        let last = list.pop(); // 删除数组最后一个元素，并返回该元素
        list.unshift(last);
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    handleExport() {
      this.showExport = true;
      this.title = "导出";
    },
    handleCancel() {
      this.showExport = false;
    },
    expTalk() {
      const tableDom = document.querySelector("#table");
      const wb2 = utils.book_new();
      const tablews = utils.table_to_sheet(tableDom);
      const name = `${this.mk.mc}`;
      utils.book_append_sheet(wb2, tablews, name);
      writeFile(wb2, `${this.mk.mc}流程统计.xlsx`);
      this.showExport = false;
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
        width: 150px;
      }
      .inputSelect {
        width: 50%;
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
        .borderOrange {
          border: 1px solid grey;
          background: #fff;
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
        }
      }
    }
  }
}
</style>
