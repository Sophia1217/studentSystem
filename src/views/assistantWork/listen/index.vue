<template>
  <div class="talkRec">
    <div class="p1"></div>
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
            <el-option label="课程名称" value="kcmc"></el-option>
            <el-option label="教室" value="jxdd"></el-option>
            <el-option label="任课教师" value="rkls"></el-option>
            <el-option label="记录人" value="jlrxm"></el-option>
            <el-option label="记录人工号" value="jlrgh"></el-option>
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
          <el-col :span="3">类型：</el-col>
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
          <el-col :span="3">课程时间</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="dateArray"
                unlink-panels
                type="daterange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
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
          <span class="title">课堂听课列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="handleExport">
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
          <el-table-column prop="kcbh" label="课程编号" sortable="custom">
          </el-table-column>
          <el-table-column prop="kcmc" label="课程名称" sortable="custom">
          </el-table-column>
          <el-table-column prop="jxdd" label="教室" sortable="custom">
          </el-table-column>
          <el-table-column prop="kckksj" label="开课时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="kcsksj" label="授课日期" sortable="custom">
          </el-table-column>
          <el-table-column prop="rkls" label="任课教师" sortable="custom">
          </el-table-column>
          <el-table-column prop="rklsgh" label="教师工号" sortable="custom">
          </el-table-column>
          <el-table-column prop="jlrxm" label="记录人" sortable="custom">
          </el-table-column>
          <el-table-column prop="jlrgh" label="记录人工号" sortable="custom">
          </el-table-column>
          <el-table-column prop="jlrlx" label="类型" sortable="custom">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail2(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">听课详情</span>
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
        <el-button type="primary" class="confirm" @click="expListen"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CheckboxCom from "../../components/checkboxCom";
import { listenQuery, del, exp } from "@/api/assistantWork/listen";
export default {
  components: { CheckboxCom },
  data() {
    return {
      delArr: [],
      searchVal: "",
      select: "",
      isMore: false,
      showExport: false,
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
            dm: "1",
            mc: "兼职",
          },
          {
            dm: "0",
            mc: "专职",
          },
        ],
        isIndeterminate: true,
      },
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
    test() {
      var a =
        "星期二第7-10节{14-19周};星期三第1-4,7-10节{14-19周};星期五第1-4节{14-19周}";
      var list = a.split(";");
      var xq = [];
      var begin = [];
      var week = [];
      for (var i = 0; i < list.length; i++) {
        xq.push(list[i].slice(0, 3));
        week.push(
          list[i].slice(list[i].indexOf("{") + 1, list[i].indexOf("}"))
        );
        begin.push(
          list[i].slice(list[i].indexOf("第"), list[i].indexOf("节") + 1)
        );
      }
      let result = xq.map((v, i) => ({
        xq: xq[i],
        begin: begin[i],
        week: week[i],
      }));
      console.log("res", result);
    },
    handleExport() {
      this.showExport = true;
      this.title = "导出";
    },
    handleCancel() {
      this.showExport = false;
    },
    expListen() {
      if (this.delArr && this.delArr.length > 0) {
        var ids = this.delArr;
        exp({ ids: ids }).then((res) => {
          this.downloadFn(res, "课程听课列表数据下载", "xlsx");
          this.handleSearch();
        });
      } else {
        let data = {
          kcmc: this.select == "kcmc" ? this.searchVal : null,
          rkls: this.select == "rkls" ? this.searchVal : null,
          jxdd: this.select == "jxdd" ? this.searchVal : null,
          jlrxm: this.select == "jlrxm" ? this.searchVal : null,
          jlrgh: this.select == "jlrgh" ? this.searchVal : null,
          jlrlxList: this.ztjl.choose ? this.ztjl.choose : [],
          kcsksjks:
            this.dateArray && this.dateArray.length > 0
              ? this.dateArray[0]
              : "",
          kcsksjjs:
            this.dateArray && this.dateArray.length > 0
              ? this.dateArray[1]
              : "",
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
          orderZd: this.queryParams.orderZd,
          orderPx: this.queryParams.orderPx,
          ids: [],
        };
        exp({ ...data }).then((res) => {
          this.downloadFn(res, "课程听课列表数据下载", "xlsx");
          this.handleSearch();
        });
      }
      this.showExport = false;
    },
    del() {
      if (this.delArr && this.delArr.length > 0) {
        let data = {
          ids: this.delArr,
        };
        del(data).then((res) => this.handleSearch());
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    hadleDetail1() {
      this.$router.push({
        path: "/assistantWork/listenAdd",
      });
    },
    hadleDetail2(row) {
      var gh = row.jlrgh;
      var gh1 = this.$store.getters.userId;
      var sf = true;
      if (gh !== gh1) {
        sf = false;
      }
      console.log("sf", sf);
      const { id } = row;
      this.$router.push({
        path: "/assistantWork/listenDetail",
        query: { id: id, state: 0, sf: sf },
      });
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        kcmc: this.select == "kcmc" ? this.searchVal : null,
        rkls: this.select == "rkls" ? this.searchVal : null,
        jxdd: this.select == "jxdd" ? this.searchVal : null,
        jlrxm: this.select == "jlrxm" ? this.searchVal : null,
        jlrgh: this.select == "jlrgh" ? this.searchVal : null,
        jlrlxList: this.ztjl.choose ? this.ztjl.choose : [],
        kcsksjks:
          this.dateArray && this.dateArray.length > 0 ? this.dateArray[0] : "",
        kcsksjjs:
          this.dateArray && this.dateArray.length > 0 ? this.dateArray[1] : "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      listenQuery(data)
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
