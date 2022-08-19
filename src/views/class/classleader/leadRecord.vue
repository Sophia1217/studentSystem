<template>
  <div class="app-container">
    <div>
      <h3 class="title-item">
        22电子信息1班班干部任职记录<span class="iconfont repeat_icon"
          >&#xe7b1;
        </span>
      </h3>
      <el-row :gutter="10" class="mb8" style="float: right; margin-top: 15px">
        <el-col :span="1.5">
          <el-button
            icon="el-icon-delete"
            style="color: #eb3842; border-color: #eb3842"
            @click="deleteRecord"
          >
            删除</el-button
          >
        </el-col>
      </el-row>
    </div>

    <!-- 班干部任职记录 -->
    <el-table
      :data="queryBgbRmjList"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'children.length' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" align="center" type="index" />
      <el-table-column label="班级职位" align="center" prop="mc" sortable />
      <el-table-column label="姓名" align="center" prop="xm" sortable>
      </el-table-column>
      <el-table-column label="学号" align="center" prop="xh" sortable />
      <el-table-column label="任命人" align="center" prop="rmrgh" sortable />
      <el-table-column label="任命时间" align="center" prop="rmsj" sortable />
      <el-table-column label="撤任人" align="center" prop="cxrgh" sortable />
      <el-table-column label="撤任时间" align="center" prop="cxsj" sortable />
      <el-table-column
        label="任职状态"
        align="center"
        prop="sfqy"
        class-name="small-padding fixed-width"
        sortable
      >
        <template slot-scope="scope">
          <div>
            <span class="iconfont allocate_teacher">&#xe604;</span>
            <span style="color: #005657" v-show="scope.row.sfqy == '0'">
              在岗
            </span>
            <span style="color: #ed5234" v-show="scope.row.sfqy == '1'">
              离岗
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      id="test"
      v-show="total >= 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import "@/assets/fonts/circle/iconfont.css";
import { getQueryBgbRmjl, getDeleteBgbRm } from "@/api/class/classLeader";
export default {
  name: "LeadRecord",
  data() {
    return {
      // 任职记录当前行数据
      currentRow: [],
      // 任职记录勾选框收集ids
      currentRow_ids: [],
      // 任职记录errcode
      errcode: "-200",
      // 当前班级代码
      bjdm:"",
      // 遮罩层
      // loading: true,
      // 选中数组
      xhs: "",
      zws: "",
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 班干部任命记录数据
      queryBgbRmjList: [],
      // 弹出层标题
      title: "",
      // 是否显示新建班级弹出层
      open: false,
      // 是否显示删除空班级弹出层
      dialogVisible: false,
      // 查询参数
      queryParams: {
        bjdm:"1004001000",
        pageNum: 1,
        pageSize: 10,
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
    console.log("guazai");
    this.getList(this.queryParams);
  },
  methods: {
    getList(x) {
      Object.assign(x, this.queryParams)
      getQueryBgbRmjl(x).then((res) => {
        var current_total = 0
        console.log("res.datas:",res.datas);
        this.queryBgbRmjList = res.datas;
        console.log("this.queryBgbRmjList:", this.queryBgbRmjList);
        for(let index in this.queryBgbRmjList){
           current_total += this.queryBgbRmjList[index].children.length
        }
        this.total = current_total==0?this.total:current_total
      });
    },
    // 删除记录
    deleteRecord() {
      console.log("删除记录");
      console.log("this.currentRow:", this.currentRow);
      for (let item of this.currentRow) {
        this.xhs += item.xh + ",";
        this.zws += item.zwdm + ",";
      }
      this.xhs = this.xhs.substring(0, this.xhs.length - 1);
      this.zws = this.zws.substring(0, this.zws.length - 1);
      console.log("this.xhs:", this.xhs);
      console.log("this.zws:", this.zws);
      getDeleteBgbRm({ xhs: this.xhs, zws: this.zws }).then((res) => {
        console.log(res);
        this.errcode = res.errcode;
        console.log("this.errcode:", this.errcode);
      });
      // 重新请求数据
      if (this.errcode == "00") {
        console.log("刷新操作！");
        this.getList({
          bjdm: "1004001000",
          pageNum: 1,
          pageSize: 10,
        });
      }
      this.xhs = "";
      this.zws = "";
      this.errcode = "-200";
    },
    // 班干部记录删除
    handleSelectionChange(row) {
      this.currentRow = row;
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
  width: 400px;
  height: 28px;
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
