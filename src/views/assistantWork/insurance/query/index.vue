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
            <el-option label="学号" value="xh"></el-option>
            <el-option label="购买人" value="xm"></el-option>
            <el-option label="险种名称" value="xzmc"></el-option>
            <el-option label="承保公司" value="cbgs"></el-option>
            <el-option label="联系人" value="lxr"></el-option>
            <el-option label="联系电话" value="lxdh"></el-option>
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
          <el-col :span="3">险种类型:</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-select
                v-model="moreIform.xzlx"
                multiple
                collapse-tags
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in xzlx"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.mc"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">购买起止时间:</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="datePicker"
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
          <span class="title">学平险查询列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderBlue" @click="mbDown">
            <i class="icon blueIcon"></i><span class="title">模板下载</span>
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
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @sort-change="changeTableSort"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" sortable="custom">
          </el-table-column>
          <el-table-column prop="xm" label="购买人" sortable="custom">
          </el-table-column>
          <el-table-column prop="xzmc" label="险种名称" sortable="custom">
          </el-table-column>
          <el-table-column prop="bdh" label="保单号" sortable="custom">
          </el-table-column>
          <el-table-column prop="xzlx" label="险种类型" sortable="custom">
          </el-table-column>
          <el-table-column prop="cbgs" label="承保公司" sortable="custom">
          </el-table-column
          ><el-table-column prop="lxr" label="联系人" sortable="custom">
          </el-table-column
          ><el-table-column prop="lxdh" label="联系电话" sortable="custom">
          </el-table-column>
          <el-table-column prop="gmsj" label="购买时间" sortable="custom">
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">保险详情</span>
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
import { getToken } from "@/utils/auth";
import {
  expor,
  mbDown,
  queryXzlx,
  queryList,
} from "@/api/assistantWork/baoxian";
export default {
  name: "manStudent",
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
      uploadUrl: process.env.VUE_APP_BASE_API + "/fdyXpx/import",
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        xzlx: [],
      },
      xzlx: [], // 学院下拉框
      tableData: [],
      manageRegOps: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      datePicker: [],
      multipleSelection: [],
    };
  },

  mounted() {
    this.handleSearch();
    this.queryXzlx();
  },

  methods: {
    expor() {
      var rqs = "";
      var rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        var rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      var idList = [];
      this.multipleSelection.map((item) => idList.push(item.id));
      var data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        xzmc: this.select == "xzmc" ? this.xzmc : null,
        buyEndTime: rqs,
        buyStartTime: rqe,
        cbgs: this.select == "cbgs" ? this.cbgs : null,
        lxr: this.select == "lxr" ? this.lxr : null,
        lxdh: this.select == "lxdh" ? this.lxdh : null,
        xzlxList: this.moreIform.xzlx,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      if (this.multipleSelection.length > 0) {
        expor({ idList: idList }).then((res) =>
          this.downloadFn(res, "学平险列表下载", "xlsx")
        );
      } else {
        expor(data).then((res) =>
          this.downloadFn(res, "学平险列表下载", "xlsx")
        );
      }
    },
    queryXzlx() {
      queryXzlx().then((res) => {
        this.xzlx = res.data;
      });
    },

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
    mbDown() {
      mbDown().then((res) => {
        this.downloadFn(res, "学平险模板下载", "xlsx");
      });
    },
    hadleDetail(row) {
      this.$router.push({
        path: "/assistantWork/detailBX",
        query: {
          id: row.id,
          xzdmOld: row.xzdm,
        },
      });
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      var rqs = "";
      var rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        var rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        xzmc: this.select == "xzmc" ? this.searchVal : null,
        buyEndTime: rqs,
        buyStartTime: rqe,
        cbgs: this.select == "cbgs" ? this.searchVal : null,
        lxr: this.select == "lxr" ? this.searchVal : null,
        lxdh: this.select == "lxdh" ? this.searchVal : null,
        xzlxList: this.moreIform.xzlx,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryList(data)
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
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
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
