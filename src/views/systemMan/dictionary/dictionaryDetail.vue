<template>
  <div class="app-container">
    <el-form
      :model="info"
      ref="info"
      class="queryForm"
      size="small"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="字典名称" prop="codeTableChinese">
        <el-input
          :disabled="true"
          v-model="info.codeTableChinese"
          size="small"
          placeholder="请输入字典名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="字典状态" prop="state">
        <el-select v-model="info.state" placeholder="请选择字典状态" clearable>
          <el-option
            v-for="dict in state1"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="字典标签" prop="codeKey">
        <el-input
          v-model="info.codeKey"
          size="small"
          placeholder="请输入字典名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="array">
        <el-date-picker
          v-model="info.array"
          type="daterange"
          range-separator="至"
          start-placeholder="起始年月日"
          end-placeholder="结束年月日"
          value-format="yyyy-MM-dd"
          :default-time="['00:00:00', '23:59:59']"
          :clearable="false"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          class="search"
          @click="handleQuery"
          >查询</el-button
        >
        <el-button size="mini" @click="resetQuery('info')" class="reset">
          <span class="iconfont reset_icon">&#xe614;</span> 重置
        </el-button>
      </el-form-item>
    </el-form>

    <div class="content">
      <div class="content_top">
        <div>
          <span class="title-item"> 班级操作字典 </span>
          <span class="iconfont repeat_icon">&#xe7b1; </span>
        </div>
        <div class="headerRight">
          <div class="btns borderBlue" @click="handleAdd1()">
            <i class="icon blueIcon"></i><span class="title">新增字典</span>
          </div>
          <!-- <div class="btns borderOrange" @click="handleDetele">
            <i class="icon orangeIcon"></i><span class="title">删除</span>
          </div> -->
        </div>
      </div>

      <el-table
        :data="noticeList"
        @selection-change="handleSelectionChange"
        @sort-change="changeTableSort"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          label="序号"
          align="center"
          prop="id"
          width="100"
          type="index"
        />
        <el-table-column
          label="字典标签"
          align="center"
          prop="codeKey"
          sortable
        />
        <el-table-column label="字典状态" align="center" prop="state" sortable>
          <template slot-scope="scope">
            <div @click="handleAdd2(scope.row)">
              <el-switch
                v-model="scope.row.state"
                active-color="#23AD6F"
                inactive-color="#E0E0E0"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" sortable />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          sortable
        />
        <el-table-column label="操作" width="200" sortable>
          <template slot-scope="scope">
            <div class="operation">
              <div class="editBtn" @click="handleAdd(scope.row)">
                <i class="icon editIcon"></i> 编辑
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="info.total > 0"
        :total="info.total"
        :page.sync="info.pageNum"
        :limit.sync="info.pageSize"
        @pagination="handleQuery"
      />
    </div>
    <dicDialog
      :rowId="rowId"
      :dialogVisible="dialogVisible"
      @handleCloseDia="handleCloseDia"
      @handleCommitDia="handleCommitDia"
    ></dicDialog>
    <dialogVisibleAdd
      :dialogVisibleAdd="dialogVisibleAdd"
      :codeTableChinese="info.codeTableChinese"
      @handleCloseDia="handleCloseDia1"
      @handleCommitDia="handleCommitDia1"
    ></dialogVisibleAdd>
  </div>
</template>

<script>
import "@/assets/fonts/repeat/iconfont.css";
import DicDialog from "./detailDialog.vue";
import dialogVisibleAdd from "./modal.vue";
import {
  listQuery,
  updateDicList,
  addDicList,
  checkKey,
} from "@/api/systemMan/dictionary";
import { Message } from "element-ui";
export default {
  name: "dictionary",
  components: { DicDialog, dialogVisibleAdd },
  data() {
    return {
      state1: [
        {
          value: "",
          label: "所有",
        },
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
      info: {
        orderZd: "",
        orderPx: "",
        codeTableEnglish: "",
        codeTableChinese: "",
        state: "",
        array: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        codeKey: "",
      },
      roleNameOps: [],
      noticeList: [],
      multipleSelection: [],
      dialogVisible: false,
      rowId: {},
      dialogVisibleAdd: false,
    };
  },
  activated() {
    this.info.codeTableChinese = this.$route.query.codeTableChinese; //接受column中传递过来的参数
    this.info.codeTableEnglish = this.$route.query.codeTableEnglish;
    // this.$set(this.info, "array", [this.info.createTime, this.info.createTime]); //,如果需要动态回显，这里就需要处理日期格式,同时动态监听
    this.handleQuery();
  },
  created() {
    this.handleQuery();
  },
  methods: {
    changeTableSort(column) {
      this.info.orderZd = column.prop;
      this.info.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.handleQuery();
    },
    //搜索按钮操作
    handleQuery() {
      let data = {
        createTimeStart: this.info.array.length > 0 ? this.info.array[0] : "",
        createTimeEnd: this.info.array.length > 0 ? this.info.array[1] : "",
        codeTableEnglish: this.info.codeTableEnglish,
        codeTableChinese: this.info.codeTableChinese,
        state: this.info.state,
        pageNum: this.info.pageNum,
        pageSize: this.info.pageSize,
        codeKey: this.info.codeKey,
        orderZd: this.info.orderZd,
        orderPx: this.info.orderPx,
      };
      listQuery(data).then((res) => {
        this.noticeList = res.data;
        this.info.total = res.count;
        this.noticeList.forEach((item) => {
          item.createTime = item.createTime.slice(
            0,
            item.createTime.indexOf("T")
          );
          item.state == "0" ? (item.state = true) : (item.state = false);
        });
      });
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
    handleCloseDia1() {
      this.dialogVisibleAdd = false;
    },
    handleCommitDia1(cal) {
      this.dialogVisibleAdd = false;
      const data = {
        codeTableEnglish: this.info.codeTableEnglish,
        codeTableChinese: cal.codeTableChinese,
        state: cal.state ? "0" : "1",
        remark: cal.remark,
        codeKey: cal.codeKey,
      };
      const data1 = {
        codeTableEnglish: this.info.codeTableEnglish,
        codeKey: cal.codeKey,
      };
      checkKey(data1).then((res) => {
        if (res.data) {
          addDicList(data).then((res) => {
            this.handleQuery();
          });
        } else {
          this.$message.error("请不要提交重复字典便签名");
        }
      });
    },
    handleAdd2(val) {
      const data = {
        codeTableEnglish: val.codeTableEnglish,
        codeTableChinese: val.codeTableChinese,
        state: val.state ? "0" : "1",
        remark: val.remark,
        codeKey: val.codeKey,
        id: val.id,
      };

      updateDicList(data).then((res) => {
        this.handleQuery();
      });
    },
    handleCommitDia(cal) {
      this.dialogVisible = false;
      const data = {
        codeTableEnglish: cal.codeTableEnglish,
        codeTableChinese: cal.codeTableChinese,
        state: cal.state ? "0" : "1",
        remark: cal.remark,
        codeKey: cal.codeKey,
        id: cal.id,
      };
      const data1 = {
        codeTableEnglish: cal.codeTableEnglish,
        codeKey: cal.codeKey,
      };
      checkKey(data1).then((res) => {
        if (res.data) {
          updateDicList(data).then((res) => {
            this.handleQuery();
          });
        } else {
          this.$message.error("请不要提交重复字典便签名");
        }
      });
    },
    handleAdd1() {
      this.dialogVisibleAdd = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style scope lang="scss">
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
    text-align: left;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    .title-item {
      display: inline-block;
      // width: 120px;
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
