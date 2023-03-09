<template>
  <div class="tableWrap2">
    <div class="headerTop">
      <div class="headerLeft">
        <!-- <span class="title">勤工助学岗位列表</span> <i class="Updataicon"></i> -->
      </div>
      <div class="headerRight">
        <div class="btns borderOrange" @click="showDel">
          <i class="icon lightIcon"></i><span class="title">删除</span>
        </div>
        <div class="btns borderRed" @click="showBack">
          <i class="icon backIcon"></i><span class="title">退岗</span>
        </div>
        <div class="btns fullGreen" @click="xinzeng">
          <i class="icon greenIcon"></i><span class="title1">新增</span>
        </div>
      </div>
    </div>
    <div class="mt15">
      <el-table
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="xh" label="学号" min-width="100">
        </el-table-column>
        <el-table-column prop="xm" label="姓名" min-width="100">
        </el-table-column>
        <el-table-column prop="bjmc" label="班级" min-width="100">
        </el-table-column>
        <el-table-column prop="sfkns" label="是否困难生" min-width="100">
        </el-table-column>
        <el-table-column prop="sfzx" label="是否在校" min-width="100">
        </el-table-column>
        <el-table-column prop="sgsj" label="上岗日期" min-width="120">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.sgsj"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              @change="changeSJ(scope.row)"
            >
            </el-date-picker>
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
    <el-dialog title="退岗提示" :visible.sync="backModal" width="30%">
      <span>确认退岗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="delModal" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="addModal" width="60%">
      <template>
        <div class="search">
          <div style="margin: 0px 15px">
            <el-input v-model="xm" placeholder="请输入学生姓名" clearable />
          </div>
          <div class="btns borderBlue" @click="queryAllXs">
            <span class="title1">查询</span>
          </div>
        </div>
        <div class="mt15">
          <el-table
            :data="addData"
            ref="multipleTable"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
              fixed="left"
            ></el-table-column>
            <el-table-column prop="xh" label="学号" sortable> </el-table-column>
            <el-table-column prop="xm" label="姓名" sortable> </el-table-column>
            <el-table-column prop="xb" label="性别" sortable> </el-table-column>
            <el-table-column prop="nj" label="年级" sortable> </el-table-column>
            <el-table-column prop="dwmc" label="学院" sortable>
            </el-table-column>
            <el-table-column prop="zymc" label="专业" sortable>
            </el-table-column>
            <el-table-column prop="bjmc" label="班级" sortable>
            </el-table-column>
            <el-table-column prop="sfkns" label="是否困难生" sortable>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <pagination
        v-show="queryParams2.totalAdd > 0"
        :total="queryParams2.totalAdd"
        :page.sync="queryParams2.pageNum"
        :limit.sync="queryParams2.pageSize"
        @pagination="queryAllXs"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryZgxsList,
  deleteZgxs,
  insertZgxs,
  backZgxs,
  queryAllXs,
  updateSgsj,
} from "@/api/thrift/gwMaintain";
export default {
  props: {
    test: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      backModal: false,
      delModal: false,
      ztStatus: [],
      zdOps: [],
      status: [],
      datePicker: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        status: [], // 学院下拉框
      },
      exportParams: {},
      tableData: [],
      addData: [],
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        totalAdd: 0,
        orderZd: "",
        orderPx: "",
      },
      multipleSelection: [],
      multipleSelection2: [],
      addModal: false,
      gwId: this.test,
      addArr: [],
      delArr: [],
      xm: "", //新增查询姓名
    };
  },
  mounted() {
    this.handleSearch();
  },

  methods: {
    // 退岗取消
    handleCancel() {
      this.backModal = false;
    },
    // 退岗确认
    handleConfirm() {
      backZgxs({ ids: this.delArr, gwId: this.gwId, ly: "2" })
        .then((res) => {
          this.$message.success("退岗成功");
          this.backModal = false;
          this.handleSearch();
        })
        .catch((err) => {});
    },
    showBack() {
      if (this.delArr && this.delArr.length > 0) {
        this.backModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    // 查询
    handleSearch() {
      let data = {
        gwId: this.gwId,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryZgxsList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    showDel() {
      if (this.delArr && this.delArr.length > 0) {
        this.delModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    del() {
      deleteZgxs({ ids: this.delArr }).then((res) => {
        this.handleSearch();
        this.delModal = false;
        this.$message.success("删除成功");
      });
    },
    delCancel() {
      this.delModal = false;
    },
    //新增查询所有学生
    queryAllXs() {
      let data = {
        ly: "2",
        xm: this.xm,
        pageNum: this.queryParams2.pageNum,
        pageSize: this.queryParams2.pageSize,
        orderZd: this.queryParams2.orderZd,
        orderPx: this.queryParams2.orderPx,
      };
      queryAllXs(data)
        .then((res) => {
          this.addData = res.data;
          this.queryParams2.totalAdd = res.totalCount;
        })
        .catch((err) => {});
    },
    xinzeng() {
      this.addModal = true;
      this.xm = "";
      this.queryAllXs();
    },
    addCancel() {
      this.addModal = false;
    },
    async addConfirm() {
      if (this.multipleSelection2.length > 0) {
        let xhs = [];
        for (let item_row of this.multipleSelection2) {
          xhs.push(item_row.xh);
        }
        let data = {
          xhs: xhs,
          gwId: this.gwId,
          ly: "2",
          xm: this.xm,
        };
        await insertZgxs(data)
          .then((res) => {
            this.$message.success("新增成功");
            //查询
            this.addModal = false;
            this.handleSearch();
          })
          .catch((err) => {});
      } else {
        this.$message.error("请勾选数据！");
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delArr = val.map((item) => item.id);
    },
    //新增多选
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
      this.addArr = val.map((item) => item.id);
    },
    changeSJ(row) {
      let data = {
        id: row.id,
        sgsj: row.sgsj,
        gwId: this.gwId,
        ly: "2",
      };
      updateSgsj(data).then((res) => {
        this.$message.success("操作成功");
        this.handleSearch();
      });
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
        .deteIcon {
          background: url("~@/assets/images/yes.png") no-repeat;
        }
        .blueIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/in.png") no-repeat;
        }
        .orangeIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/out.png") no-repeat;
        }
        .greenIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/add.png") no-repeat;
        }
        .backIcon {
          margin-top: 10px;
          background: url("~@/assets/images/back.png") no-repeat;
        }
        .lightIcon {
          margin-top: 9px;
          background: url("~@/assets/assistantPng/delete.png") no-repeat;
        }
      }
    }
  }
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .borderBlue {
    color: #fff;
    background: #005657;
    border: 1px solid grey;
  }
  .btns {
    width: 60px;
    margin-right: 20px;
    padding: 0px 12px;
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
  }
}
</style>