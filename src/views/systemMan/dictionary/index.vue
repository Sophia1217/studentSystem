<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryParams"
      class="queryForm"
      size="small"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="字典类型" prop="codeTableEnglish">
        <el-input
          v-model="queryParams.codeTableEnglish"
          size="small"
          placeholder="请输入字典类型"
        ></el-input>
      </el-form-item>
      <el-form-item label="字典名称" prop="codeTableChinese">
        <el-input
          v-model="queryParams.codeTableChinese"
          size="small"
          placeholder="请输入字典名称"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="字典状态" prop="state">
        <el-select
          v-model="queryParams.state"
          placeholder="请选择角色"
          clearable
        >
          <el-option
            v-for="dict in options"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="修改时间" prop="array">
        <el-date-picker
          v-model="queryParams.array"
          type="daterange"
          range-separator="至"
          start-placeholder="起始年月日"
          end-placeholder="结束年月日"
          value-format="yyyy-MM-dd"
          :clearable="false"
        >
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          class="search"
          @click="handleQuery"
          >查询</el-button
        >
        <el-button size="mini" @click="resetQuery('queryParams')" class="reset">
          <span class="iconfont reset_icon">&#xe614;</span> 重置
        </el-button>
      </el-form-item>
    </el-form>

    <div class="content">
      <div class="content_top">
        <h3 class="title-item">
          字典管理<span class="iconfont repeat_icon">&#xe7b1; </span>
        </h3>
        <div class="headerRight"></div>
      </div>

      <el-table :data="noticeList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          label="序号"
          align="center"
          prop="id"
          width="100"
          type="index"
        />
        <el-table-column
          label="字典类型"
          align="center"
          prop="codeTableEnglish"
          sortable
        />
        <el-table-column
          label="字典名称"
          align="center"
          prop="codeTableChinese"
          sortable
        />
        <!-- <el-table-column label="字典状态" align="center" prop="state" sortable>
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.state"
                active-color="#23AD6F"
                inactive-color="#E0E0E0"
              ></el-switch>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="备注" align="center" prop="remark" sortable />
        <!-- <el-table-column
          label="修改时间"
          align="center"
          prop="createTime"
          sortable
        /> -->
        <el-table-column label="操作" width="200" sortable>
          <template slot-scope="scope">
            <div class="operation">
              <div class="editBtn" @click="handleAdd(scope.row)">
                <i class="icon editIcon"></i> 编辑
              </div>
              <div class="editBtn" @click="handleList(scope.row)">
                <i class="icon deteleIcon"></i>字典列表
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleQuery"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
      />
    </div>
    <dicDialog
      :rowId="rowId"
      :dialogVisible="dialogVisible"
      @handleCloseDia="handleCloseDia"
      @handleCommitDia="handleCommitDia"
    ></dicDialog>
  </div>
</template>

<script>
import "@/assets/fonts/repeat/iconfont.css";
import DicDialog from "./dicDialog.vue";
import { queryManage, updateDic } from "@/api/systemMan/dictionary";
export default {
  name: "dictionary",
  components: { DicDialog },
  data() {
    return {
      options: [
        {
          value: "0",
          label: "启用",
        },
        {
          value: "1",
          label: "禁用",
        },
      ],
      // 查询参数
      queryParams: {
        codeTableEnglish: "",
        codeTableChinese: "",
        state: "",
        array: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      noticeList: [],
      multipleSelection: [],
      dialogVisible: false,
      rowId: {},
      createTimeStart: "",
      createTimeEnd: "",
    };
  },
  created() {
    this.handleQuery();
  },
  methods: {
    //搜索按钮操作
    handleQuery() {
      if (this.queryParams.array.length !== 0) {
        //a.slice(0,a.indexOf("T"))
        //因为后端要的是拆分的字符串，所以要拆分
        this.queryParams.createTimeStart = this.queryParams?.array[0];
        this.queryParams.createTimeEnd = this.queryParams?.array[1];
      } else {
        this.queryParams.createTimeStart = "";
        this.queryParams.createTimeEnd = "";
      }
      let data = {
        createTimeStart: this.queryParams.createTimeStart,
        createTimeEnd: this.queryParams.createTimeEnd,
        codeTableEnglish: this.queryParams.codeTableEnglish,
        codeTableChinese: this.queryParams.codeTableChinese,
        state: this.queryParams.state,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
      };
      queryManage(data)
        .then((res) => {
          this.noticeList = res.data;
          this.queryParams.total = Number(res.count);
          this.noticeList.forEach((item) => {
            (item.createTime = item.createTime.slice(
              0,
              item.createTime.indexOf("T")
            )),
              item.state == "0" ? (item.state = true) : (item.state = false);
          });
        })
        .catch((err) => {});
    },

    handleCurrentChange(val) {
      console.log("val", val);
    },
    //重置按钮操作
    resetQuery(queryForm) {
      this.$refs[queryForm].resetFields();
    },
    /** 新增 */
    handleAdd(row) {
      if (row && row.id) {
        this.rowId = row;
      } else {
        this.rowId = null;
      }
      this.dialogVisible = true;
    },
    handleCloseDia() {
      this.dialogVisible = false;
    },
    handleCommitDia(cal) {
      this.dialogVisible = false;
      const data = {
        codeTableEnglish: cal.codeTableEnglish,
        codeTableChinese: cal.codeTableChinese,
        state: cal.state ? "0" : "1",
        remark: cal.remark,
      };
      updateDic(data).then((res) => {});
    },
    handleList(row) {
      this.$router.push({
        path: "/systems/dictionaryDetail",
        query: row,
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style scope lang="scss">
.app-container {
  background: #ffffff;
}
.queryForm {
  background: #fff;
  padding: 20px;
  .search {
    background: #005657;
  }
  .reset {
    color: #005657;
    border-color: #005657;
  }
  .reset_icon {
    color: #005657;
    font-size: 5px;
  }
}

.content {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  .content_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    .title-item {
      display: inline-block;
      width: 120px;
      height: 28px;
      font-family: "PingFangSC-Semibold";
      font-weight: 600;
      font-size: 20px;
      color: #1f1f1f;
      .iconfont {
        margin-left: 5px;
      }
    }
    .headerRight {
      display: flex;
      .borderBlue {
        border: 1px solid #005657;
        color: #fff;
        background: #005657;
      }
      .borderOrange {
        border: 1px solid #eb3842;
        color: #eb3842;
        background: #fdf6f3;
      }
      .btns {
        margin-right: 15px;
        padding: 5px 10px;
        cursor: pointer;
        .title {
          font-size: 14px;
          text-align: center;
          line-height: 22px;
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
          background: url("~@/assets/images/addIcon_w.png") no-repeat;
        }
        .orangeIcon {
          background: url("~@/assets/images/delete_r.png") no-repeat;
        }
      }
    }
  }

  .create {
    background: #005657;
    .addIcon {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("~@/assets/images/addIcon_w.png");
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .el-pagination {
    margin-left: 500px;
    white-space: nowrap;
    padding: 26px 5px;
    color: #303133;
    font-weight: bold;
  }
  .operation {
    display: flex;
    justify-content: space-between;
    .editBtn {
      color: #005657;
      cursor: pointer;
    }
    .deleteBtn {
      color: #ed5234;
      cursor: pointer;
    }
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      vertical-align: middle;
    }
    .editIcon {
      background: url("~@/assets/images/edit_b.png");
    }
    .deteleIcon {
      background: url("~@/assets/images/auditIcon.png");
    }
  }
}
</style>
