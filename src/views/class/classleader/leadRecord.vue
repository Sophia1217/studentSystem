<template>
  <div class="app-container">
    <div>
      <h3 class="title-item">
        22电子信息1班班干部任职记录<span class="iconfont repeat_icon"
          >&#xe7b1;
        </span>
      </h3>
      <el-row :gutter="10" class="mb8" style="float: right; margin-top: 15px">
        <!-- <el-col :span="1.5" style="float: left"> 班级列表 </el-col> -->
        <el-col :span="1.5">
          <el-button
            icon="el-icon-delete"
            style="color: #eb3842; border-color: #eb3842"
            @click="deleteRecord(row)"
          >
            删除</el-button
          >
        </el-col>
        <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
      </el-row>
    </div>

    <!-- 班干部任职记录 -->
    <el-table
      v-loading="loading"
      :data="noticeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" align="center" type="index" />
      <el-table-column
        label="班级职位"
        align="center"
        prop="position"
        sortable
      />
      <el-table-column label="姓名" align="center" prop="name" sortable>
      </el-table-column>
      <el-table-column label="学号" align="center" prop="studentId" sortable />
      <el-table-column
        label="任命人"
        align="center"
        prop="orderName"
        sortable
      />
      <el-table-column
        label="任命年度"
        align="center"
        prop="orderYear"
        sortable
      />
      <el-table-column
        label="任命学期"
        align="center"
        prop="orderSemi"
        sortable
      />
      <el-table-column
        label="任命时间"
        align="center"
        prop="actionTime"
        sortable
      />
      <el-table-column label="撤任人" align="center" prop="offName" sortable />
      <el-table-column
        label="撤任时间"
        align="center"
        prop="offTime"
        sortable
      />
      <el-table-column
        label="任职状态"
        align="center"
        prop="orderState"
        class-name="small-padding fixed-width"
        sortable
      >
        <template slot-scope="scope">
          <div>
            <span class="iconfont allocate_teacher">&#xe604;</span>
            <span style="color: #005657">
              {{ noticeList[0].orderState }}
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      id="test"
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 新增班级对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      height="243px"
      append-to-body
    >
      <el-form
        :inline="true"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属学院" prop="noticeTitle">
              <el-select
                v-model="form.noticeType"
                placeholder="计算机学院"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="培养层次" prop="noticeType">
              <el-select
                v-model="form.noticeType"
                placeholder="本科"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属年级">
              <el-select
                v-model="form.noticeType"
                placeholder="2022"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级数量">
              <!-- <editor v-model="form.noticeContent" :min-height="192" /> -->
              <el-select v-model="form.noticeType" placeholder="10"></el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm" class="confirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span
        >是否确认删除空班级？<span style="color: #ed5234"
          >*每次仅支持删除一个班级，且该班级代码编号为最末尾</span
        ></span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="classCancel">取 消</el-button>
        <el-button type="primary" @click="classConfirm" class="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/fonts/circle/iconfont.css";
export default {
  name: "LeadRecord",
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
      total: 100,
      // 表格数据
      noticeList: [
        {
          position: "班长",
          name: "张三",
          studentId: "13070025",
          orderName: "张五",
          orderYear: "2022年",
          orderSemi: "秋季学期",
          actionTime: "2022-07-07 23:33:33",
          offName: "张四",
          offTime: "2022-07-07 23:33:33",
          orderState: "在岗",
        },
        {
          position: "班长",
          name: "张三",
          studentId: "13070025",
          orderName: "张五",
          orderYear: "2022年",
          orderSemi: "秋季学期",
          actionTime: "2022-07-07 23:33:33",
          offName: "张四",
          offTime: "2022-07-07 23:33:33",
          orderState: "在岗",
        },
        {
          position: "班长",
          name: "张三",
          studentId: "13070025",
          orderName: "张五",
          orderYear: "2022年",
          orderSemi: "秋季学期",
          actionTime: "2022-07-07 23:33:33",
          offName: "张四",
          offTime: "2022-07-07 23:33:33",
          orderState: "在岗",
        },
      ],
      // 弹出层标题
      title: "",
      // 是否显示新建班级弹出层
      open: false,
      // 是否显示删除空班级弹出层
      dialogVisible: false,
      // 查询参数
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        college: undefined,
        level: undefined,
        grade: undefined,
        classId: undefined,
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
  methods: {
    // 删除记录
    deleteRecord(row) {
      console.log("删除记录");
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
