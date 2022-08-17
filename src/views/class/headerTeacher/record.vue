<template>
  <div class="app-container">
    <div>
      <h3 class="title-item">
        班主任任职列表<span class="iconfont repeat_icon">&#xe7b1; </span>
      </h3>
      <el-row :gutter="10" class="mb8" style="float: right; margin-top: 15px">
        <!-- <el-col :span="1.5" style="float: left"> 班级列表 </el-col> -->
        <el-col :span="1.5">
          <el-button
            icon="el-icon-delete"
            style="color: #eb3842; border-color: #eb3842"
            @click="deleteRecord()"
          >
            删除</el-button
          >
        </el-col>
        <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
    </div>

    <!-- 班主任任职记录 问题：数据字段仍需仔细核对-->
    <el-table :data="noticeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" align="center" type="index" />
      <el-table-column label="学工号" align="center" prop="gh" sortable />
      <el-table-column label="姓名" align="center" prop="xm" sortable>
      </el-table-column>
      <el-table-column label="性别" align="center" prop="xb" sortable />
      <el-table-column label="工作单位" align="center" prop="dwmc" sortable />
      <el-table-column label="任职班级" align="center" prop="rzbj" sortable />
      <el-table-column label="任命人" align="center" prop="rmr" sortable />
      <el-table-column label="任命时间" align="center" prop="rmsj" sortable />
      <el-table-column label="撤任人" align="center" prop="cxr" sortable />
      <el-table-column label="撤任时间" align="center" prop="cxsj" sortable />
    </el-table>

    <pagination
      id="test"
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import "@/assets/fonts/circle/iconfont.css";
import { queryRecords, deleteRecords } from "@/api/class/headerTeacher";
export default {
  name: "record",
  data() {
    return {
      // 遮罩层
      // loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      noticeList: [],
      recordsList: [],
      // 弹出层标题
      title: "",
      // 是否显示新建班级弹出层
      open: false,
      // 是否显示删除空班级弹出层
      dialogVisible: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bjdm: this.$route.query.bjdm,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: "所属学院为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "培养层次不能为空", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.getList(this.queryParams);
  },
  activated() {
    this.getList(this.queryParams);
  },
  methods: {
    // 班主任任职记录查询
    getList(queryParams) {
      queryRecords(queryParams).then((response) => {
        if (response.errcode == "00") {
          this.noticeList = response.items;
        }
      });
    },
    // 收集勾选的表格数据
    handleSelectionChange(arr) {
      this.recordsList = arr;
    },
    // 删除任职记录——一次性一条或多条
    deleteRecord() {
      deleteRecords({ recordsList: this.recordsList }).then((response) => {
        console.log(response);
        if (response.errcode == "00") {
          this.$message({
            message: "删除班主任任职记录操作成功",
            type: "success",
          });
          this.getList(this.queryParams);
        } else {
          this.$message({
            message: "删除班主任任职记录操作失败",
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style>
.app-container {
  height: 100vh;
  background-color: white;
}
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
.create {
  background: #005657;
}
.delete {
  color: #eb3842;
  border-color: #eb3842;
}
.export {
  color: #005657;
  border-color: #005657;
}
.confirm {
  background-color: #005657;
}
.record_icon {
  color: #005657;
  margin-top: 2px;
  margin-right: 5px;
}
.record_icon + span {
  color: #005657;
}
.repeat_icon {
  font-size: 20px;
  margin-left: 5px;
}
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.error {
  background-color: #fef5f4;
}
.success {
  background-color: #ecfbf4;
  color: #ecfbf4;
}

.el-notification.right {
  left: 30%;
  transform: translateX(50%);
}
/* .el-notification__title {
  color: #ed5234;
} */
.title-item {
  display: inline-block;
  height: 28px;
  width: 1000px;
  font-family: "PingFangSC-Semibold";
  font-weight: 600;
  font-size: 20px;
  color: #1f1f1f;
}
#test {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.pagination-container {
  margin-top: 0px;
  height: 100%;
}
.el-pagination {
  margin-top: 20px;
}
</style>
