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
            <el-option label="学号" value="xh"></el-option>
            <el-option label="谈话对象" value="xm"></el-option>
            <el-option label="谈话人" value="thrxm"></el-option>
            <el-option label="工号" value="thrgh"></el-option>
            <el-option label="谈话地点" value="thdd"></el-option>
            <el-option label="谈话主题" value="thzt"></el-option>
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
          <el-col :span="3"> 工作单位 ： </el-col>
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
          <el-col :span="3">记录状态：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="ztjl"
                @training="ztjlAll"
                @checkedTraining="ztjlCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">谈话时间：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="dateArray"
                unlink-panels
                type="daterange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">谈话记录列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="expTalk">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderLight" @click="del()">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="hadleDetail1()">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
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
          <el-table-column prop="xh" label="学号" sortable="custom">
          </el-table-column>
          <el-table-column prop="xm" label="谈话对象" sortable="custom">
          </el-table-column>
          <el-table-column prop="thrxm" label="谈话人" sortable="custom">
          </el-table-column>
          <el-table-column prop="thrgh" label="工号" sortable="custom">
          </el-table-column>
          <el-table-column prop="gzdw" label="工作单位" sortable="custom">
          </el-table-column>
          <el-table-column prop="thzt" label="谈话主题" sortable="custom">
          </el-table-column>
          <el-table-column prop="zt" label="记录状态" sortable="custom">
            <template slot-scope="scope">
              <div v-if="scope.row.sfjl == 1">
                <i class="scopeIncon1 ywc"></i>
                <span class="handleName">已完成</span>
              </div>
              <div v-if="scope.row.sfjl == 2">
                <i class="scopeIncon1 djl"></i>
                <span class="handleName">待记录</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail2(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">谈话详情</span>
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
  </div>
</template>

<script>
import CheckboxCom from "../../../components/checkboxCom";
import { talkTable, delTalk, expTalk } from "@/api/assistantWork/talk";
import { getCollege } from "@/api/class/maintenanceClass";
export default {
  components: { CheckboxCom },
  data() {
    return {
      delArr: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        xydm: [],
      },
      allDwh: [], // 学院下拉框
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      ztjl: {
        //是否在校
        checkAll: false,
        choose: [],
        checkBox: [
          {
            dm: "0",
            mc: "已完成",
          },
          {
            dm: "1",
            mc: "待记录",
          },
        ],
        isIndeterminate: true,
      },
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
    this.getAllCollege();
  },
  activated() {
    this.handleSearch();
  },

  methods: {
    expTalk() {
      if (this.delArr && this.delArr.length > 0) {
        var ids = this.delArr;
        expTalk({ ids: ids }).then((res) => {
          this.downloadFn(res, "谈心谈话下载", "xlsx");
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
          ztjlList: this.ztjl.choose,
          starttime: this.dateArray[0],
          endtime: this.dateArray[1],
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
          orderZd: this.queryParams.orderZd,
          orderPx: this.queryParams.orderPx,
        };
        expTalk({ ...data }).then((res) => {
          this.downloadFn(res, "谈心谈话下载", "xlsx");
          this.handleSearch();
        });
      }
    },
    del() {
      if (this.delArr && this.delArr.length > 0) {
        delTalk({ ids: this.delArr }).then((res) => this.handleSearch());
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    hadleDetail1() {
      this.$router.push({
        path: "/assistantWork/addTalk",
      });
    },
    hadleDetail2(row) {
      const { id } = row;
      this.$router.push({
        path: "/assistantWork/detailTalk",
        query: { id: id },
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
        thzt: this.select == "thzt" ? this.searchVal : null,
        thrxm: this.select == "thrxm" ? this.searchVal : null,
        thrgh: this.select == "thrgh" ? this.searchVal : null,
        thdd: this.select == "thdd" ? this.searchVal : null,
        dwh: this.moreIform.xydm,
        ztjlList: this.ztjl.choose,
        starttime: this.dateArray[0],
        endtime: this.dateArray[1],
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      talkTable(data)
        .then((res) => {
          this.tableData = res.data.records;
          this.queryParams.total = res.data.total;
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
