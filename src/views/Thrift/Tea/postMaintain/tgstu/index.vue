<template>
  <div class="tableWrap2">
    <div class="headerTop">
      <div class="headerLeft">
        <!-- <span class="title">勤工助学岗位列表</span> <i class="Updataicon"></i> -->
      </div>
    </div>
    <div class="mt15">
      <el-table
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="gwMainMc" label="学号" min-width="100">
        </el-table-column>
        <el-table-column prop="gwDetailMc" label="姓名" min-width="100">
        </el-table-column>
        <el-table-column prop="gwGzdd" label="班级" min-width="100">
        </el-table-column>
        <el-table-column prop="gwYrdw" label="是否困难生" min-width="100">
        </el-table-column>
        <el-table-column prop="gwYgzl" label="是否在校" min-width="100">
        </el-table-column>
        <el-table-column prop="gwYgzsx" label="上岗日期" min-width="110">
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
</template>
<script>
import { queryDshList, exportDsh } from "@/api/thrift/gwAudit";
export default {
  data() {
    return {
      showExport: false,
      delModal: false,
      moreIform: {
        status: [], // 学院下拉框
      },
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
    };
  },
  mounted() {
    this.handleSearch();
  },
  methods: {
    // 查询
    handleSearch() {
      let data = {
        status: this.moreIform.status,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryDshList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.tableWrap2 {
  background: #fff;
  padding-left: 20px;
  padding-right: 20px;
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
  }
}
</style>