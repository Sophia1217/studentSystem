<template>
  <div class="basicInfo">
    <div class="searchWrap">
      <div class="headerTop1">
        <span class="title">问卷名称问卷名称</span>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap">
      <div class="headerTop">
        <div class="headerRight">
          <div class="btns borderGreen" @click="handleExport">
            <i class="icon orangeIcon" /><span class="title">导出</span>
          </div>
          <div class="btns fullGreen" @click="handleNew" v-show="AUTHFLAG">
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
          <el-table-column prop="hdzt" label="工号" min-width="100" sortable />
          <el-table-column prop="hddz" label="姓名" min-width="100" sortable="custom" />
          <el-table-column prop="hdksrq" label="类型" width="80" sortable="custom" />
          <el-table-column prop="zzdw" label="工作单位" min-width="100" sortable="custom" />
          <el-table-column prop="createXm" label="已测评人数" width="110" sortable="custom" />
          <el-table-column prop="createXh" label="应测评人数" width="110" sortable="custom" />
          <el-table-column prop="createXh" label="测评率" width="85" sortable="custom" />
          <el-table-column prop="createXh" label="平均分" width="85" sortable="custom" />
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
        <div><span class="title">问卷名称问卷名称</span></div>
        <div class="tableTop"><span class="title">姓名姓名</span></div>
        <!-- <div class="tableTop">{{detailXm}} </div> -->
        <el-table :data="tableDetails">
          <el-table-column
            fixed="left"
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="chqj" label="模块" />
          <el-table-column prop="sqsj" label="题目" />
          <el-table-column prop="sqsj" label="参与测评人数" />
          <el-table-column prop="statusChinese" label="分值" />
          <el-table-column prop="statusChinese" label="单题原始平均分" />
        </el-table>
        <div class="zhu"><span class="title2">注：有效测评分是按照去掉头部和尾部相应百分比的人次计算所得平均分</span></div>
      </div>
      <pagination
          v-show="total > 0"
          class="pagination2"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
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
  </div>
</template>
<script>
import {
  queryFdyBthdList,
  excelFdyBthd,
} from "@/api/assistantWork/classEvent";
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
      totalMx:0,
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
        createDwh: [], //工作单位
        createSfjzfdy: [], //类别
        createXh: "",
        createXm: "",
        hddz: "",
        hdksrqEnd: "",
        hdksrqStrat: "",
        hdzt: "",
        zzdw: "", //组织单位
        orderZd: "",
        orderPx: "",
      },
      list: [],
      exportParams: {},
      tableDetails:[],
      detailModal: false,
      detailXm:"",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG; 
    this.getList(this.queryParams);
  },

  methods: {
    //获取数据列表
    getList() {
      // console.log(this.select, "select");
      this.queryParams.createXm = this.select == 1 ? this.searchVal : "";
      queryFdyBthdList(this.queryParams)
        .then((response) => {
          this.basicInfoList = response.data; // 根据状态码接收数据
          this.total = response.totalCount; //总条数
          // this.exportParams = this.queryParams;
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
      this.list = [...val]; // 存储已被勾选的数据
    },
    // 打开导出弹窗
    handleExport() {
      this.showExport = true;
      this.title = "导出";
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      this.showExport = false;
      var arr = this.list.length > 0 ? this.list.map((item) => item.id) : [];
      let data = {
        hdksrqStrat: this.queryParams.hdksrqStrat,
        hdksrqEnd: this.queryParams.hdksrqEnd,
        createXm: this.queryParams.createXm,
        createXh: this.queryParams.createXh,
        hddz: this.queryParams.hddz,
        hdzt: this.queryParams.hdzt,
        zzdw: this.queryParams.zzdw,
        pageNum: this.queryParams.pageNum,
        createDwh: this.queryParams.createDwh,
        createSfjzfdy: this.queryParams.createSfjzfdy,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        ids: arr,
      };
      // var exportParams = this.queryParams;
      // console.log(this.queryParams);
      // this.$set(this.exportParams,"ids",arr)

      excelFdyBthd(data)
        .then((res) => {
          this.downloadFn(res, "活动记录导出", "xlsx");
          if(this.$store.getters.excelcount > 0){
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
      this.detailXm = row.xm;
      // this.$router.push({
      //   path: "/assistantWork/detailClassEvent",
      //   query: {
      //     id: row.id,
      //   },
      // });
    },
    detailExport() {
      this.detailModal = false;
      //评价明细导出
    },
    detailConfirm(){
      this.detailModal = false;
      this.multipleSelection = [];
    },
    //提交明细
    handleNew() {
      this.$router.push({
        path: "/assistantTest/stuTest/stuTjDetail",
        // path: "/assistantWork/addClassEvent",
      });
    },
    searchClick(){
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
  .headerDilog{
    background: #fff;
    padding-left: 20px;
    padding-right: 20px;
    .tableTop{
      margin-bottom:15px;
    }
    .title{
      font-weight: 600;
      font-size: 18px;
      color: #1f1f1f;
      line-height: 28px;
    }
    .zhu{
      margin-top: 15px;
    }
    .title2{
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
      justify-content:center;
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
