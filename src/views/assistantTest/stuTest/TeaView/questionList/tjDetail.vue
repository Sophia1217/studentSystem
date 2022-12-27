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
          <el-table-column prop="hdzt" label="学号" min-width="100" sortable />
          <el-table-column prop="hddz" label="姓名" min-width="100" sortable="custom" />
          <el-table-column prop="hdksrq" label="培养层次" min-width="100" sortable="custom" />
          <el-table-column prop="zzdw" label="年级" min-width="85" sortable="custom" />
          <el-table-column prop="createXm" label="提交时间" min-width="110" sortable="custom" />
          <el-table-column prop="createXm" label="辅导员姓名" min-width="110" sortable="custom" />
          <el-table-column prop="createXh" label="工号" min-width="100" sortable="custom" />
          <el-table-column prop="createXh" label="测评分数" min-width="100" sortable="custom" />
          <el-table-column prop="createXh" label="是否纳入计算" min-width="125" sortable="custom" />
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
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
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
  .searchWrap {
    background: #fff;
    margin-top: 30px;
    .headerTop1 {
      display: flex;
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
.closeButton {
  background: #005657;
  color: white;
}

.pagination {
  left: 20%;
  transform: translateX(-50%);
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
