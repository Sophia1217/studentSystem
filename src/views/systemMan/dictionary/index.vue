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
        <div class="headerRight">
          <!-- <el-row :gutter="10" class="mb8" style="float: right">
            <el-col :span="1.5"> -->
          <!-- <el-button class="export" @click="mbDown">
             
              模板下载</el-button
            > -->
          <div class="btns borderBlue" @click="mbDown">
            <i class="icon downIcon"></i><span class="title">模板下载</span>
          </div>
          <!-- </el-col> -->
          <!-- <el-col :span="1.5"> -->
          <div class="btns borderBlue">
            <el-upload
              accept=".xlsx,.xls"
              :auto-upload="true"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="fileHeader"
              :on-success="upLoadSuccess"
              :on-error="upLoadError"
            >
              <i class="icon blueIcon"></i><span class="title">导入</span>
            </el-upload>
          </div>
          <!-- </el-col>
          </el-row> -->
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
import {
  queryManage,
  updateDic,
  fileDown,
  importtable,
} from "@/api/systemMan/dictionary";
import { getToken } from "@/utils/auth";
export default {
  name: "dictionary",
  components: { DicDialog },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/codeTable/importTable",
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
        orderZd: "",
        orderPx: "",
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
  computed: {
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
        };
      },
    },
  },
  methods: {
    //模板下载
    mbDown() {
      fileDown().then((res) => this.downloadFn(res, "字典模板下载", "xlsx"));
    },
    ///上传
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },

    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.handleQuery();
    },
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
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
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

    handleCurrentChange(val) {},
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
    .export {
      color: #005657;
      border-color: #005657;
    }
    .headerRight {
      display: flex;
      .borderBlue {
        background: #fff;
        border: 1px solid grey;
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
        .blueIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/in.png") no-repeat;
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
        .downIcon {
          margin-top: 10px;
          background: url("~@/assets/images/down.png") no-repeat;
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
