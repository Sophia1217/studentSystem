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
            placeholder="请选择查询条件"
          >
            <el-option label="申请人" value="xm"></el-option>
            <el-option label="学号" value="xh"></el-option>
            <el-option label="手机号" value="sjh"></el-option>
            <el-option label="审核人" value="shrXm"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span>{{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20" class="mt15">
          <el-col :span="3"> 培养单位:</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-select
                v-model="moreIform.xydm"
                multiple
                collapse-tags
                placeholder="请选择"
                size="medium"
              >
                <el-option
                  v-for="item in allDwh"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">拟返校时间:</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="dateArrayBack"
                unlink-panels
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3"> 所在地区：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-cascader
                v-model="moreIform.szdq"
                :options="options"
                @change="handleChangeJg"
                :props="locationProps"
                clearable
              ></el-cascader>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3"> 返汉方式：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-select
                v-model="moreIform.fhfs"
                multiple
                collapse-tags
                placeholder="请选择"
                size="medium"
              >
                <el-option
                  v-for="item in jtgjOps"
                  :key="item.dm"
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
          <span class="title">返汉申请列表</span> <i class="Updataicon"></i>
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
          <el-table-column prop="xm" label="申请人" width="85" sortable="custom">
          </el-table-column>
          <el-table-column prop="xh" label="学号" width="100" sortable="custom">
          </el-table-column>
          <el-table-column prop="dwmc" label="培养单位" min-width="100" sortable="custom">
          </el-table-column>
          <!-- <el-table-column prop="sjh" label="手机号" sortable="custom">
          </el-table-column> -->
          <el-table-column prop="szdq" label="所在地区" min-width="100" sortable="custom">
          </el-table-column>
          <el-table-column prop="fxsj" label="拟返校时间" min-width="100" sortable="custom">
          </el-table-column>
          <el-table-column prop="fhfs" label="返汉方式" width="100" sortable="custom">
          </el-table-column>
          <el-table-column prop="shrXm" label="审核人" width="85" sortable="custom">
          </el-table-column>
          <el-table-column prop="shsj" label="审核时间" width="100" sortable="custom">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail2(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">申请详情</span>
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
      <span>确认导出{{ len }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="exp">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CheckboxCom from "../../components/checkboxCom";
import { getQuerylist, exp, queryJtgj } from "@/api/epidemicControl/backWhAppr";
import { getCollege } from "@/api/class/maintenanceClass";
import { getLocationjl } from "@/api/student/index";
export default {
  components: { CheckboxCom },
  data() {
    return {
      res: {},
      detailModal: false,
      moreIform: {
        xydm: [],
        fhfs: [],
        szdq: "",
      },
      delArr: [],
      searchVal: "",
      allDwh: [], // 学院下拉框
      jtgjOps: [], // 交通工具下拉框
      select: "",
      isMore: false,
      showExport: false,
      title: "",
      dateArrayOut: [],
      dateArrayBack: [],
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      len: 0,
      //地区级联
      locationProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
    this.getAllJtgj();
    this.getLocationjl();
  },
  activated() {
    this.handleSearch();
  },

  methods: {
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    //交通工具
    getAllJtgj() {
      queryJtgj()
        .then((res) => {
          this.jtgjOps = res.data;
        })
        .catch((err) => {});
    },
    async handleExport() {
      if (this.delArr && this.delArr.length > 0) {
        this.len = this.delArr.length;
      } else {
        let data = {
          xm: this.select == "xm" ? this.searchVal : null,
          xh: this.select == "xh" ? this.searchVal : null,
          sjh: this.select == "sjh" ? this.searchVal : null,
          shrXm: this.select == "shrXm" ? this.searchVal : null,
          dwhList: this.moreIform.xydm,
          fhfsList: this.moreIform.fhfs,
          szdq: this.moreIform.szdq,
          fxsjStart:
            this.dateArrayBack && this.dateArrayBack.length > 0
              ? this.dateArrayBack[0]
              : "",
          fxsjEnd:
            this.dateArrayBack && this.dateArrayBack.length > 0
              ? this.dateArrayBack[1]
              : "",
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
          orderZd: this.queryParams.orderZd,
          orderPx: this.queryParams.orderPx,
        };
        await getQuerylist(data)
          .then((res) => {
            this.len = res.totalCount;
          })
          .catch((err) => {});
      }
      if (this.len > 0) {
        this.showExport = true;
        this.title = "导出";
      } else {
        this.$message.warning("当前无数据导出");
      }
    },
    handleCancel() {
      this.showExport = false;
    },
    exp() {
      if (this.delArr && this.delArr.length > 0) {
        var ids = this.delArr;
        exp({ idList: ids }).then((res) => {
          this.downloadFn(res, "返汉申请列表下载", "xlsx");
          if(this.$store.getters.excelcount > 0){
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
          sjh: this.select == "sjh" ? this.searchVal : null,
          shrXm: this.select == "shrXm" ? this.searchVal : null,
          dwhList: this.moreIform.xydm,
          fhfsList: this.moreIform.fhfs,
          szdq: this.moreIform.szdq,
          fxsjStart:
            this.dateArrayBack && this.dateArrayBack.length > 0
              ? this.dateArrayBack[0]
              : "",
          fxsjEnd:
            this.dateArrayBack && this.dateArrayBack.length > 0
              ? this.dateArrayBack[1]
              : "",
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
          orderZd: this.queryParams.orderZd,
          orderPx: this.queryParams.orderPx,
        };
        exp({ ...data }).then((res) => {
          this.downloadFn(res, "返汉申请列表下载", "xlsx");
          if(this.$store.getters.excelcount > 0){
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
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

    hadleDetail2(row) {
      this.$router.push({
        path: "/epidemicControl/backWhApprDetail",
        query: {
          id: row.id,
        },
      });
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        sjh: this.select == "sjh" ? this.searchVal : null,
        shrXm: this.select == "shrXm" ? this.searchVal : null,
        dwhList: this.moreIform.xydm,
        fhfsList: this.moreIform.fhfs,
        szdq: this.moreIform.szdq,
        fxsjStart:
          this.dateArrayBack && this.dateArrayBack.length > 0
            ? this.dateArrayBack[0]
            : "",
        fxsjEnd:
          this.dateArrayBack && this.dateArrayBack.length > 0
            ? this.dateArrayBack[1]
            : "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      getQuerylist(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    //地区级联
    getLocationjl() {
      getLocationjl().then((res) => {
        this.options = res.data;
      });
    },
    handleChangeJg(value) {
      if (value.length == 1) {
        this.moreIform.szdq = value[0];
      } else if (value.length == 2) {
        this.moreIform.szdq = value[1];
      } else {
        this.moreIform.szdq = value[2];
      }
      console.log("this.moreIform.szdq", this.moreIform.szdq);
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
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
  .yiny {
    border: 1px solid grey;
    background: rgba(0, 0, 0, 0.0001);
    box-shadow: inset -1px 0px 0px #e0e0e0, inset 1px 0px 0px #e0e0e0;
    height: 50px;
    border-bottom: none;
    border-left: none;
  }
  .hs {
    flex: 0 0 100px;
    background: #ccc;
    padding-left: 20px;
    padding-top: 14px;
  }
  .bs {
    padding-left: 40px;
    padding-top: 14px;
  }
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
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("../../../assets/images/updata.png") no-repeat;
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
