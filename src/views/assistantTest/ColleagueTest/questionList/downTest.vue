<template>
  <div class="basicInfo">
    <div class="searchWrap">
      <div class="headerTop1">
        <span class="title">{{ wjName }}</span>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap">
      <div class="headerTop">
        <div class="headerRight">
          <div class="btns borderGreen" @click="handleExport">
            <i class="icon orangeIcon" /><span class="title">导出</span>
          </div>
          <div class="btns fullGreen" @click="handleTjmx" v-show="AUTHFLAG">
            <span class="title1">提交明细</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="basicInfoList"
          style="width: 100%"
          :default-sort="{ prop: 'gh', order: 'ascending' }"
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
            prop="lx"
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
          <el-table-column prop="realCount" label="已测评人数" width="110" />
          <el-table-column prop="planCount" label="应测评人数" width="110" />
          <el-table-column prop="ratio" label="测评率" width="85" />
          <el-table-column
            prop="avgScore"
            label="平均分"
            width="85"
            sortable="custom"
          />
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">评价明细</span>
              </el-button>
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
    <el-dialog
      title="评价明细"
      :visible.sync="detailModal"
      :before-close="detailConfirm"
      width="80%"
    >
      <div class="headerDilog">
        <div>
          <span class="title">{{ wjName }}</span>
        </div>
        <div class="tableTop">
          <div class="tableLeft">
            <span class="title">{{ form.xmBpcr }}</span>
          </div>
          <div class="tableRight">
            <span class="title"
              >题数：{{ wjCount }} <span v-html="'\u3000'"></span> 总分：{{
                wjFz
              }}分</span
            >
          </div>
        </div>
        <el-table :data="tableDetails">
          <el-table-column
            fixed="left"
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="tmMk" label="模块" />
          <el-table-column prop="tmName" label="题目" />
          <el-table-column prop="cpRs" label="参与测评人数" />
          <el-table-column prop="avgFz" label="分值" />
          <el-table-column prop="tmFz" label="单题原始平均分" />
        </el-table>
        <div class="zhu">
          <span class="title2">
            注：有效测评分是按照去掉头部和尾部相应百分比的人次计算所得平均分</span
          >
        </div>
      </div>
      <pagination
        v-show="totalMx > 0"
        class="pagination2"
        :total="totalMx"
        :page.sync="queryParams2.pageNum"
        :limit.sync="queryParams2.pageSize"
        @pagination="hadleDetail"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailExport">导 出</el-button>
        <el-button type="primary" class="confirm" @click="detailConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导出确认对话框 -->
    <el-dialog :title="title" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 评价明细导出确认对话框 -->
    <el-dialog title="导出提示" :visible.sync="showMxExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleMxCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleMxConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryCpfxList,
  queryPjmxList,
  exportCpResList,
  exportPjmxlList,
} from "@/api/test/mutualTest";
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
      totalMx: 0,
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
      showMxExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        wjId: this.$route.query.id,
        orderZd: "",
        orderPx: "",
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        wjId: this.$route.query.id,
        orderZd: "",
        orderPx: "",
      },
      wjName: this.$route.query.wjName,
      wjFz: this.$route.query.wjFz,
      wjCount: this.$route.query.wjCount,
      expArr: [],
      tableDetails: [],
      detailModal: false,
      form: {
        xmBpcr: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getList(this.queryParams);
  },

  methods: {
    //获取数据列表
    getList() {
      queryCpfxList(this.queryParams)
        .then((response) => {
          this.basicInfoList = response.data; // 根据状态码接收数据
          this.total = response.totalCount; //总条数
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },

    // 详情对话框关闭按钮
    cancel() {
      this.open = false;
    },

    // 列表多选
    handleSelectionChange(val) {
      // console.log("val", val);
      this.multipleSelection = val;
      console.log("row", val);
      this.expArr = this.multipleSelection.map((item) => item.xghBpcr);
    },
    // 打开导出弹窗
    handleExport() {
      this.showExport = true;
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      this.showExport = false;
      let data = {
        wjId: this.$route.query.id,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        idList: this.expArr,
      };

      exportCpResList(data)
        .then((res) => {
          this.downloadFn(res, "同行互评分析&下载列表导出", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});
    },
    //点击详情
    hadleDetail(row) {
      this.detailModal = true;
      this.form.xmBpcr = row.xmBpcr;
      let data = {
        xghBpcr: row.xghBpcr,
        // xghDtr: 1,

        wjId: this.$route.query.id,
        pageNum: this.queryParams2.pageNum,
        pageSize: this.queryParams2.pageSize,
        orderZd: this.queryParams2.orderZd,
        orderPx: this.queryParams2.orderPx,
      };
      queryPjmxList(data)
        .then((res) => {
          this.tableDetails = res.data; // 根据状态码接收数据
          this.totalMx = res.totalCount; //总条数
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },
    detailConfirm() {
      this.detailModal = false;
    },
    //评价明细导出
    detailExport() {
      this.showMxExport = true;
    },
    // 导出取消
    handleMxCancel() {
      this.showMxExport = false;
    },
    // 导出确认
    handleMxConfirm() {
      this.showMxExport = false;
      let data = {
        wjId: this.$route.query.id,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        // idList: this.expArr,
      };

      exportPjmxlList(data)
        .then((res) => {
          this.downloadFn(res, "同行互评评价明细列表导出", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});
    },
    //提交明细
    handleTjmx() {
      this.$router.push({
        path: "/assistantTest/ColleagueTest/mutualTjDetail",
        query: {
          id: this.$route.query.id,
          wjName: this.$route.query.wjName,
        },
      });
    },
    searchClick() {
      this.queryParams.pageNum = 1;
      this.getList(this.queryParams);
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.searchClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.basicInfo {
  .mt15 {
    margin-top: 15px;
  }
  .headerDilog {
    background: #fff;
    padding: 0 20px 0;
    .title {
      font-weight: 600;
      font-size: 18px;
      color: #1f1f1f;
      line-height: 28px;
    }
    .tableTop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .tableLeft {
        display: flex;
        margin-bottom: 15px;
      }
      .tableRight {
        display: flex;
      }
    }

    .zhu {
      margin-top: 15px;
    }
    .title2 {
      font-weight: 500;
      font-size: 14px;
      color: #1f1f1f;
      line-height: 20px;
    }
  }
  .searchWrap {
    background: #fff;
    // margin-top: 30px;
    .headerTop1 {
      display: flex;
      padding-top: 30px;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: #fff;
      .title {
        font-weight: 600;
        font-size: 20px;
        color: #1f1f1f;
        line-height: 28px;
      }
    }
  }
  .tableWrap {
    background: #fff;
    padding: 20px;
    .headerTop {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      .headerRight {
        display: flex;
        align-items: center;
        .borderBlue {
          border: 1px solid grey;
          background: #ebfafd;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fdf6f3;
        }
        .borderGreen {
          border: 1px solid grey;
          background: #fff;
        }
        .borderRed {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
        .fullGreen {
          // border:1px solid #005657;
          color: #fff;
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
        }
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
</style>
