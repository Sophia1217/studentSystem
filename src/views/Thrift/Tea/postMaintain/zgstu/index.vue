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
        <div class="btns borderRed" @click="expor">
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
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
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
    <el-dialog title="新增" :visible.sync="addModal" width="50%">
      <template>
        <div class="mt15">
          <el-table
            :data="tableData"
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
            <el-table-column prop="statusMc" label="学号" sortable>
            </el-table-column>
            <el-table-column prop="statusMc" label="姓名" sortable>
            </el-table-column>
            <el-table-column prop="statusMc" label="学号" sortable>
            </el-table-column>
            <el-table-column prop="statusMc" label="年级" sortable>
            </el-table-column>
            <el-table-column prop="statusMc" label="学院" sortable>
            </el-table-column>
            <el-table-column prop="statusMc" label="专业" sortable>
            </el-table-column>
            <el-table-column prop="statusMc" label="班级" sortable>
            </el-table-column>
            <el-table-column prop="statusMc" label="是否困难生" sortable>
            </el-table-column>
          </el-table>
        </div>
      </template>
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
  queryDshList,
  tyFlow,
  jjFlow,
  backFlow,
  thFinal,
  exportDsh,
} from "@/api/thrift/gwAudit";
export default {
  data() {
    return {
      showExport: false,
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
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      multipleSelection: [],
      multipleSelection2: [],
      addModal: false,
    };
  },
  mounted() {
    this.handleSearch();
  },
  methods: {
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.businesId);
      }
      this.exportParams.pageNum = 0;
      this.exportParams.pageSize = 0;
      this.$set(this.exportParams, "ids", ids);
      exportDsh(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "勤工助学岗位审核列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});

      this.showExport = false;
    },
    async expor() {
      let data = {
        gwMainMc: this.select == "gwMainMc" ? this.searchVal : null,
        gwDetailMc: this.select == "gwDetailMc" ? this.searchVal : null,
        gwGzdd: this.select == "gwGzdd" ? this.searchVal : null,
        gwZdls: this.select == "gwZdls" ? this.searchVal : null,
        status: this.moreIform.status,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
    },
    // 查询
    handleSearch() {
      let data = {
        gwMainMc: this.select == "gwMainMc" ? this.searchVal : null,
        gwDetailMc: this.select == "gwDetailMc" ? this.searchVal : null,
        gwGzdd: this.select == "gwGzdd" ? this.searchVal : null,
        gwZdls: this.select == "gwZdls" ? this.searchVal : null,
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
    showDel() {
      if (this.delArr && this.delArr.length > 0) {
        this.delModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    del() {
      exportDsh({ ids: this.delArr, ymLy: "1" }).then((res) => {
        this.handleSearch();
        this.delModal = false;
        this.$message.success("删除成功");
      });
    },
    delCancel() {
      this.delModal = false;
    },
    xinzeng() {},
    addCancel() {
      this.addModal = false;
    },
    addConfirm() {
      if (this.multipleSelection.length > 0) {
        var params = this.multipleSelection.map((item) => ({
          ...item,
          jzsqId: this.formAdd.zzxmId,
          pjxn: this.formAdd.pjxn,
          pjxqm: this.formAdd.pjxqm,
        }));
        exportDsh(params)
          .then((res) => {
            this.$message.success("新增成功");
            //查询
            this.addModal = false;
            this.queryTcbxList();
          })
          .catch((err) => {});
      } else {
        this.$message.warning("请勾选数据！");
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
      this.delArr = val.map((item) => item.id);
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
</style>