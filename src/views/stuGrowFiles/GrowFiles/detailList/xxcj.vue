<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">学习成绩</span> <i class="Updataicon"></i>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableDate"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="zslx" label="学年"> </el-table-column>
          <el-table-column prop="cj" label="学期"> </el-table-column>
          <el-table-column prop="djm" label="课程名称"> </el-table-column>
          <el-table-column prop="fxlb" label="成绩"> </el-table-column>
          <el-table-column prop="zsbh" label="学分数"> </el-table-column>
          <el-table-column prop="fzdw" label="学分绩"> </el-table-column>
          <el-table-column prop="fzsj" label="学年专业排名"> </el-table-column>
        </el-table>
      </div>
      <pagination
        v-show="queryParams.totalCount > 0"
        :total="queryParams.totalCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="query"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lctModal: false,
      addModal: false,
      editModal: false,
      addData: [],
      editData: [],
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
      },
      fileList: [],
      delArr: [],
      fileListAdd: [],
      ztStatus: [],
      val: [],
      url: "",
    };
  },
  mounted() {
    //this.query();
  },

  methods: {
    query() {
      var data = {
        xh: this.$store.getters.userId,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        //orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        //orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      queryZgrzList(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    changeTableSort(column) {
      // this.queryParams.orderZd = column.prop;
      // this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      // this.query();
    },
    handleSelectionChange(val) {
      // this.val = val;
      // this.delArr = val.map((item) => item.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.scopeIncon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.chDis {
  background: url("~@/assets/dangan/chDisable.png");
}
.Edit {
  background: url("~@/assets/images/edit.png");
}
.EditDis {
  background: url("~@/assets/images/icon_edit_white.png");
}
.ch {
  background: url("~@/assets/dangan/ch.png");
}
.lct {
  background: url("~@/assets/dangan/lct.png");
}
.el-button--text {
  border-color: transparent;
  color: #005657;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
.mt15 {
  margin-top: 15px;
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
</style>