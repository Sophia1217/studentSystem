<template>
  <div class="basicInfo">
    <!-- 搜索结果显示表格 -->
    <div class="tableWrap">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">参与自评列表</span>
        </div>
        <div class="headerRight">
          <span class="smtitle">已完成互评：{{ info.ywcRs }}人</span>
          <span class="smtitle">还需互评：{{ info.wwcRs }}人</span>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="basicInfoList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column
            prop="xghBpcr"
            label="工号"
            min-width="100"
            sortable
          />
          <el-table-column
            prop="xmBpcr"
            label="被测评人"
            min-width="100"
            sortable="custom"
          />
          <el-table-column
            prop="fdylx"
            label="类型"
            width="80"
            sortable="custom"
          />
          <el-table-column
            prop="dwmc"
            label="工作单位"
            min-width="100"
            sortable="custom"
          />
          <el-table-column
            prop="nj"
            label="年级"
            min-width="100"
            sortable="custom"
          />
          <el-table-column
            prop="pyccmc"
            label="所辖培养层次"
            min-width="100"
            sortable="custom"
          />
          <el-table-column fixed="right" label="操作" width="140" prop="wjFz">
            <template slot-scope="scope">
              <span v-if="scope.row.wjFz !== null"
                >{{ scope.row.wjFz }}分
              </span>
              <div v-else>
                <el-button type="text" size="small" @click="seeZp(scope.row)">
                  <i class="scopeIncon handledie" />
                  <span class="handleName">自评详情</span>
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="hadleDetail(scope.row)"
                >
                  <i class="scopeIncon handleEdit" />
                  <span class="handleName">进入互评</span>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          class="pagination"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { queryThhpList, countThhpRs, answerWj } from "@/api/test/mutualTest";

export default {
  name: "BasicInfo",
  // components: { CheckboxCom },
  props: [],
  data() {
    return {
      AUTHFLAG: false,
      title: "",
      // // 总条数
      total: 0,
      // 批量删除确定框弹出
      showDelete: false,
      // 详情框显示
      open: false,

      rules: {
        ghContent: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
      },
      basicInfoList: [],
      multipleSelection: [],
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleId: this.$store.getters.roleId,
        userId: this.$store.getters.userId,
        orderZd: "",
        orderPx: "",
      },
      list: [],
      exportParams: {},
      tableDetails: [],
      info: { ywcRs: "0", wwcRs: "0" },
      detailModal: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    // this.getRs();
    this.getList(this.queryParams);
  },

  methods: {
    seeZp(row) {
      this.$router.push({
        path: "/assistantTest/fdyselfTest",
        query: {
          gh: row.gh,
          nd: this.ndval,
          isEdit: 0,
        },
      });
    },
    //获取数据列表
    getList() {
      queryThhpList(this.queryParams)
        .then((response) => {
          this.basicInfoList = response.data; // 根据状态码接收数据
          this.total = response.totalCount; //总条数
          this.getRs();
        })
        .catch((err) => {});
    },
    getRs() {
      countThhpRs()
        .then((res) => {
          this.info = res.data;
        })
        .catch((err) => {});
    },
    // 列表多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.list = [...val]; // 存储已被勾选的数据
    },
    // 打开导出弹窗
    handleExport() {
      this.showExport = true;
      this.title = "导出";
    },

    //点击详情
    hadleDetail(row) {
      this.$router.push({
        path: "/assistantTest/ColleagueTest/mutualDetail",
        query: {
          id: row.wjId,
          sfwc: "0",
          xghBpcr: row.xghBpcr,
        },
      });
    },
    //排序
    changeTableSort(column) {
      console.log("column", column);
      if (column.prop == "pyccmc") {
        column.prop = "sxpycc";
      }
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.basicInfo {
  .mt15 {
    margin-top: 15px;
  }

  .tableWrap {
    background: #fff;
    padding: 30px;

    .headerTop {
      display: flex;

      justify-content: space-between;
      align-items: center;

      flex-direction: row;

      background: #fff;
      .title {
        font-weight: 600;
        font-size: 20px;
        color: #1f1f1f;
        line-height: 28px;
      }
      .smtitle {
        margin-left: 10px;
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 28px;
      }
    }
    .scopeIncon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    .handleName {
      font-weight: 400;
      font-size: 14px;
      color: #005657;
      line-height: 28px;
    }
    .handledie {
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
  .searchButton {
    background: #005657;
    color: white;
  }
}
.closeButton {
  background: #005657;
  color: white;
}

.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center;
}
.pagination2 {
  left: 20%;
  transform: translateX(-25%);
  text-align: center;
}
.greenDot {
  width: 8px;
  height: 8px;
  color: #23ad6f;
}
.redDot {
  width: 8px;
  height: 8px;
  color: #ed5234;
}
</style>
