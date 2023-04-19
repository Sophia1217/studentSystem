<template>
  <div class="talkRec">
    <div class="searchWrap">
      <div class="search">
        <div class="checkbox">
          <el-select
            v-model="moreIform.mk"
            @change="mkchange"
            collapse-tags
            placeholder="请选择"
            size="medium"
          >
            <el-option
              v-for="item in MKLIST"
              :key="item.dm"
              :label="item.mc"
              :value="item.dm"
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
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
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
import { lctjTable, lctjHeader } from "@/api/common/liucheng";
export default {
  data() {
    return {
      tableHeader: [],
      moreIform: {
        mk: "",
        mkArr: [
          { dm: "efea295e-dcbb-11ed-850b-52549e666099", mc: "乘车优惠" },
          { dm: "efea2c1a-dcbb-11ed-850b-52549e666099", mc: "日常请假" },
          {
            dm: "efea2c84-dcbb-11ed-850b-52549e666099",
            mc: "学籍异动_保留学籍",
          },
          { dm: "efea2cd8-dcbb-11ed-850b-52549e666099", mc: "学籍异动_复学" },
          { dm: "efea2d2e-dcbb-11ed-850b-52549e666099", mc: "学籍异动_退学" },
          { dm: "efea2d76-dcbb-11ed-850b-52549e666099", mc: "学籍异动_休学" },
          { dm: "efea2dc7-dcbb-11ed-850b-52549e666099", mc: "证件补办" },
          { dm: "efea2e19-dcbb-11ed-850b-52549e666099", mc: "日常销假" },
          { dm: "efea2e5d-dcbb-11ed-850b-52549e666099", mc: "住宿申请" },
          { dm: "efea2ea8-dcbb-11ed-850b-52549e666099 ", mc: "临时困难" },
          // dm:"efea2f84-dcbb-11ed-850b-52549e666099" ,mc:"学年小结",
          // dm:"efea311a-dcbb-11ed-850b-52549e666099", mc:"家庭经济困难",
          // dm:"efea3195-dcbb-11ed-850b-52549e666099" ,mc:"勤工助学_岗位设置",
          // dm:"efea320f-dcbb-11ed-850b-52549e666099", mc:"勤工助学_学生申请",
          // dm:"efea3280-dcbb-11ed-850b-52549e666099" ,mc:"奖助申请",
          // dm:"efea32ed-dcbb-11ed-850b-52549e666099 ",mc:"国家助学贷款",
          // dm:"efea3352-dcbb-11ed-850b-52549e666099 ",mc:"基层就业",
          // dm:"efea34b4-dcbb-11ed-850b-52549e666099 ",mc:"勤工助学_岗位设置_研究生三助",
          // dm:'efea3524-dcbb-11ed-850b-52549e666099 ',mc:"勤工助学_学生申请_研究生三助",
          // dm:"efea358e-dcbb-11ed-850b-52549e666099" ,mc:"大病救助",
          // dm:"efea35f3-dcbb-11ed-850b-52549e666099 ",mc:"朋辈辅导_朋辈申请",
          // dm:"efea365b-dcbb-11ed-850b-52549e666099", mc:"教授下午茶",
          // dm:"efea36e9-dcbb-11ed-850b-52549e666099 ",mc:"征兵入伍退役代偿",
          // dm:"efea3750-dcbb-11ed-850b-52549e666099" ,mc:"毕业鉴定",
          // dm:"efea37b4-dcbb-11ed-850b-52549e666099" ,mc:"矫正教育岗位",
          // dm:"efea3824-dcbb-11ed-850b-52549e666099", mc:"日常事务-学生处分",
          // dm:"efea388e-dcbb-11ed-850b-52549e666099" ,mc:"创业经历",
          // dm:"efea38f6-dcbb-11ed-850b-52549e666099", mc:"干部经历",
          // dm:"efea3961-dcbb-11ed-850b-52549e666099" ,mc:"活动信息",
          // dm:"efea39c2-dcbb-11ed-850b-52549e666099", mc:"奖学金",
          // dm:"efea3a22-dcbb-11ed-850b-52549e666099 ",mc:"论文期刊",
          // dm:"efea3a86-dcbb-11ed-850b-52549e666099 ",mc:"能力等级证书",
          // dm:"efea3ae7-dcbb-11ed-850b-52549e666099" ,mc:"软件著作",
          // dm:"efea3b49-dcbb-11ed-850b-52549e666099" ,mc:"荣誉称号",
          // dm:"efea3ba8-dcbb-11ed-850b-52549e666099", mc:"社会实践",
          // dm:"efea3c07-dcbb-11ed-850b-52549e666099 ",mc:"社团经历",
          // dm:"efea3c65-dcbb-11ed-850b-52549e666099", mc:"培训经历",
          // dm:"efea3cc4-dcbb-11ed-850b-52549e666099", mc:"学习成绩",
          // dm:"efea3d24-dcbb-11ed-850b-52549e666099" ,mc:"研究报告",
          // dm:"efea3d86-dcbb-11ed-850b-52549e666099" ,mc:"资格认证",
          // dm:"efea3de5-dcbb-11ed-850b-52549e666099 ",mc:"专利",
          // dm:"efea3e47-dcbb-11ed-850b-52549e666099" ,mc:"志愿服务",
          // dm:"efea3f52-dcbb-11ed-850b-52549e666099", mc:"著作",
        ],
      },
      testDate: [],
      isMore: false,
      MKLIST: [
        { dm: "efea295e-dcbb-11ed-850b-52549e666099", mc: "乘车优惠" },
        { dm: "efea2c1a-dcbb-11ed-850b-52549e666099", mc: "日常请假" },
        {
          dm: "efea2c84-dcbb-11ed-850b-52549e666099",
          mc: "学籍异动_保留学籍",
        },
        { dm: "efea2cd8-dcbb-11ed-850b-52549e666099", mc: "学籍异动_复学" },
        { dm: "efea2d2e-dcbb-11ed-850b-52549e666099", mc: "学籍异动_退学" },
        { dm: "efea2d76-dcbb-11ed-850b-52549e666099", mc: "学籍异动_休学" },
        { dm: "efea2dc7-dcbb-11ed-850b-52549e666099", mc: "证件补办" },
        { dm: "efea2e19-dcbb-11ed-850b-52549e666099", mc: "日常销假" },
        { dm: "efea2e5d-dcbb-11ed-850b-52549e666099", mc: "住宿申请" },
        { dm: "efea2ea8-dcbb-11ed-850b-52549e666099", mc: "临时困难" },
      ], //模块
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  mounted() {},
  methods: {
    mkchange(value) {
      lctjHeader(value).then((res) => {
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
      lctjTable({ mkId: value }).then((res) => {
        this.testDate = res.data;
      });
    },
    moveLastToFirst(list) {
      console.log("list", list);
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
      if (this.delArr && this.delArr.length > 0) {
        var ids = this.delArr;
        expTalk({ ids: ids }).then((res) => {
          this.downloadFn(res, "谈心谈话下载", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
          this.handleSearch();
        });
      } else {
        let data = {
          xm: this.select == "xm" ? this.searchVal : null,
          xh: this.select == "xh" ? this.searchVal : null,
          thzt: this.select == "thzt" ? this.searchVal : null,
          thrxm: this.select == "thrxm" ? this.searchVal : null,
          thrgh: this.select == "thrgh" ? this.searchVal : null,
          thdd: this.select == "thdd" ? this.searchVal : null,
          dwh: this.moreIform.xydm,
          starttime:
            this.dateArray && this.dateArray.length > 0
              ? this.dateArray[0]
              : "",
          endtime:
            this.dateArray && this.dateArray > 0 ? this.dateArray[1] : "",
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
          orderZd: this.queryParams.orderZd,
          orderPx: this.queryParams.orderPx,
        };
        expTalk({ ...data }).then((res) => {
          this.downloadFn(res, "谈心谈话下载", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
          this.handleSearch();
        });
      }
      this.showExport = false;
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        thzt: this.select == "thzt" ? this.searchVal : null,
        thrxm: this.select == "thrxm" ? this.searchVal : null,
        thrgh: this.select == "thrgh" ? this.searchVal : null,
        thdd: this.select == "thdd" ? this.searchVal : null,
        dwh: this.moreIform.xydm,
        starttime:
          this.dateArray && this.dateArray.length > 0 ? this.dateArray[0] : "",
        endtime:
          this.dateArray && this.dateArray.length > 0 ? this.dateArray[1] : "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      talkTable(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
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
