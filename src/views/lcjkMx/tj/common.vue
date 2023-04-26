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
          <div
            class="btns borderOrange"
            @click="handleExport"
            v-if="testDate.length > 0"
          >
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
          <!-- <el-table-column fixed="left" label="培养单位" prop="dwh" width="140" /> -->
          <div v-for="(item, index) in tableHeader" :key="index">
            <el-table-column
              :prop="item.name"
              :label="item.value"
              min-width="100"
            ></el-table-column>
          </div>
        </el-table>
      </div>
      <!-- <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      /> -->
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
import { talkTable, expTalk } from "@/api/assistantWork/talk";
import FileSaver from "file-saver";
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
        type: 1,
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
      // console.log("list", list);
      if (list !== null && list.length > 0) {
        let last = list.pop(); // 删除数组最后一个元素，并返回该元素
        list.unshift(last);
      }
    },

    test() {
      var categoryProp = {
        node_1: "学生填写人次",
        node_2: "学生提交人次",
        node_7: "辅导员已通过人次",
        node_8: "辅导员待审核人次",
        node_9: "学生资助中心负责人已通过人次",
        node_10: "学生资助中心负责人待审核人次",
        node_11: "校级领导已通过人次",
        node_12: "校级领导待审核人次",
        dwh: "培养单位",
        pycc: "培养层次",
      };
      const categoryPropXData = Object.keys(categoryProp || {});
      console.log("categoryPropXData", categoryPropXData);
      const categoryPropYData = Object.values(categoryProp || {});
      console.log("categoryPropXData", categoryPropYData);
      const newDataArr = [];
      categoryPropXData.map((item, index) => {
        newDataArr.push({
          name: item,
          value: categoryPropYData[index],
        });
      });
      console.log("newDataArr", newDataArr);
      this.tableHeader = newDataArr;
      this.testDate = [
        {
          node_1: "2",
          dwh: "教育学院",
          node_2: "5",
          node_12: "1",
          node_7: "4",
          node_8: "1",
          node_9: "4",
          pycc: "博士",
        },
        {
          node_1: "3",
          dwh: "教育学院",
          node_2: "3",
          node_12: "3",
          node_7: "3",
          node_9: "3",
          pycc: "本科",
        },
      ];
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
      // const ws = utils.json_to_sheet(this.testDate);
      // const wb = utils.book_new();
      // utils.book_append_sheet(wb, ws, "wenjianyi");
      // writeFile(wb, "test.xlsx");
      // const tableDom = this.$refs.excelDom;
      //
      //
      //
      //
      //
      const tableDom = document.querySelector("#table");
      const wb2 = utils.book_new();
      const tablews = utils.table_to_sheet(tableDom);
      const name = `${this.mk.mc}`;
      utils.book_append_sheet(wb2, tablews, name);
      writeFile(wb2, `${this.mk.mc}流程统计.xlsx`);
      // console.log("wb2wb2wb2", wb2.Sheets.wenjianyi2222["!cols"]);
      // wb2.Sheets.wenjianyi2222["!cols"] = [];
      // wb2.Sheets.wenjianyi2222[E1].s = { wpx: "200px" };
      // wb2.Sheets.wenjianyi2222["!cols"] = [
      //   { wpx: 40 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      //   { wpx: 120 },
      // ];

      //  wb2.Sheets.wenjianyi2222.
      // 动态添加前24列  宽为140px
      // for (let a = 0; a < 24; a++) {
      //   wb2.Sheets.wenjianyi2222["!cols"].push({
      //     wpx: 200,
      //   });
      // }
      this.showExport = false;
      //
      //
      //
      //
      //
      //
      //
      // var xlsxParam = { raw: true };
      // /* 从表生成工作簿对象 */
      // var wb = XLSX.utils.table_to_book(
      //   document.querySelector("#table"),
      //   xlsxParam
      // );
      // /* 获取二进制字符串作为输出 */
      // var wbout = XLSX.write(wb, {
      //   bookType: "xlsx",
      //   bookSST: true,
      //   type: "array",
      // });
      // try {
      //   FileSaver.saveAs(
      //     //Blob 对象表示一个不可变、原始数据的类文件对象。
      //     //Blob 表示的不一定是JavaScript原生格式的数据。
      //     //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
      //     //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
      //     new Blob([wbout], { type: "application/octet-stream" }),
      //     "日常事务流程统计数据表"
      //   );
      // } catch (e) {
      //   if (typeof console !== "undefined") console.log(e, wbout);
      // }
      // this.showExport = false;
      // return wbout;
    },
    // 查询
    // handleSearch() {
    //   let data = {
    //     xm: this.select == "xm" ? this.searchVal : null,
    //     xh: this.select == "xh" ? this.searchVal : null,
    //     thzt: this.select == "thzt" ? this.searchVal : null,
    //     thrxm: this.select == "thrxm" ? this.searchVal : null,
    //     thrgh: this.select == "thrgh" ? this.searchVal : null,
    //     thdd: this.select == "thdd" ? this.searchVal : null,
    //     dwh: this.moreIform.xydm,
    //     starttime:
    //       this.dateArray && this.dateArray.length > 0 ? this.dateArray[0] : "",
    //     endtime:
    //       this.dateArray && this.dateArray.length > 0 ? this.dateArray[1] : "",
    //     pageNum: this.queryParams.pageNum,
    //     pageSize: this.queryParams.pageSize,
    //     orderZd: this.queryParams.orderZd,
    //     orderPx: this.queryParams.orderPx,
    //   };
    //   talkTable(data)
    //     .then((res) => {
    //       this.tableData = res.data;
    //       this.queryParams.total = res.totalCount;
    //     })
    //     .catch((err) => {});
    // },
    // 点击更多
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
        }
      }
    }
  }
}
</style>

<!-- {
    path: "/afterTea",
    meta: { title: "教授下午茶", icon: "monitor" },
    component: Layout,
    hidden: false,
    children: [
      {
        name: "eventPubish",
        path: "eventPubish",
        component: (resolve) =>
          require(["@/views/afterTea/eventPubish/index"], resolve),
        meta: { title: "活动发布", icon: "" },
      },
      {
        name: "eventPubish1",
        path: "eventPubish1",
        component: (resolve) =>
          require(["@/views/afterTea/eventPubish/index"], resolve),
        meta: { title: "测试", icon: "" },
      },
      {
        name: "eventPubishAdd",
        path: "eventPubishAdd",
        hidden: true,
        component: (resolve) =>
          require(["@/views/afterTea/eventPubish/add"], resolve),
        meta: { title: "活动发布新增", icon: "" },
      },
      {
        name: "eventPubishDetail",
        path: "eventPubishDetail",
        hidden: true,
        component: (resolve) =>
          require(["@/views/afterTea/eventPubish/detail"], resolve),
        meta: { title: "活动发布详情", icon: "" },
      },
    ],
  }, -->
