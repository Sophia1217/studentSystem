<template>
  <div class="emp-table">
    <div class="table-content">
      <div class="title" icon="el-icon-refresh">
        <span class="title-item">辅导员任职记录</span>
        <span class="iconfont">&#xe631;</span>
        <el-row :gutter="10" class="mb8" style="float: right">
          <el-button class="delete" icon="el-icon-delete" @click="handleDelete"
            >删除</el-button
          >
        </el-row>
      </div>
      <!-- v-loading="loading" -->
      <el-table :data="noticeList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="65" align="center" />
        <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
        <el-table-column
          label="学工号"
          align="center"
          prop="gh"
          width="100"
        />
        <el-table-column
          label="姓名"
          align="center"
          prop="xm"
          width="100"
          sortable
        >
          <!-- <el-input
            :value="noticeList[0].className"
            clearable
            @keyup.enter.native="handleQuery"
          /> -->
        </el-table-column>
        <el-table-column label="性别" align="center" prop="xb" sortable />
        <el-table-column
          label="工作单位"
          align="center"
          prop="dwmc"
          sortable
        />
        <el-table-column label="任职班级" align="center" prop="rzbj" sortable />
        <el-table-column
          label="创建时间"
          align="center"
          prop="rmsj"
          sortable
        />
        <el-table-column
          label="任命人"
          align="center"
          prop="rmr"
          sortable
        />
        <!-- <el-table-column
          label="任命年度"
          align="center"
          prop="updateTime"
          sortable
        />
        <el-table-column
          label="任命学期"
          align="center"
          prop="updateTime"
          sortable
        /> -->
        <el-table-column
          label="任命时间"
          align="center"
          prop="rmsj"
          sortable
        />
        <el-table-column
          label="撤任人"
          align="center"
          prop="cxr"
          sortable
        />
        <el-table-column
          label="撤任时间"
          align="center"
          prop="cxsj"
          sortable
        />
        <!-- <el-table-column
          label="任职状态"
          align="center"
          prop="sfyx"
          sortable
        /> -->
        <!-- <el-table-column
        label="公告标题"
        align="center"
        prop="noticeTitle"
        :show-overflow-tooltip="true"
      /> -->
        <!-- <el-table-column label="公告类型" align="center" prop="noticeType" width="100">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_notice_type" :value="scope.row.noticeType"/>
        </template>
      </el-table-column> -->
        <!-- <el-table-column label="创建者" align="center" prop="createBy" width="100" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
        <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:notice:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:notice:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
      </el-table>
      <pagination
        id="pagenation"
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import "@/assets/fonts/refresh/iconfont.css";
import {getDeleteFdyRecords, getQueryRecords} from '@/api/class/instructor'
export default {
  name: "empTable", //辅导员任职记录
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
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
      noticeList: [
        // {
        //   id: 1,
        //   classId: 13070025,
        //   className: "计算机工程硕士2022级1班",
        //   college: "计算机工程学院",
        //   level: "本科",
        //   nums: 34,
        //   beginTime: "2022-07-07",
        //   updateTime: "2022-07-07",
        //   record: "班级操作记录",
        // },
        // {
        //   id: 2,
        //   classId: 13070025,
        //   className: "计算机工程硕士2022级2班",
        //   college: "计算机工程学院",
        //   level: "本科",
        //   nums: 34,
        //   beginTime: "2022-07-07",
        //   updateTime: "2022-07-07",
        //   record: "班级操作记录",
        // },
        // {
        //   id: 3,
        //   classId: 13070025,
        //   className: "计算机工程硕士2022级3班",
        //   college: "计算机工程学院",
        //   level: "本科",
        //   nums: 34,
        //   beginTime: "2022-07-07",
        //   updateTime: "2022-07-07",
        //   record: "班级操作记录",
        // },
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bjdm: this.$route.query.bjdm,
      },      
    };
  },
  created() {
    this.getList();
    // console.log('111111')
  },
  methods: {
    // 辅导员任命
    operate() {
      this.$router.push({
        path: "/class/assignTea",
      });
    },
    // 任职记录
    empRecordClick() {
      console.log(1);
      this.$router.push("/class/empRecord");
    },
    /** 查询任职记录列表 */
    getList() {
      this.loading = true;
      getQueryRecords(this.queryParams).then((response) => {
        this.noticeList = response.items;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      // this.open = false;
      // this.reset();
    },
    // 表单重置
    reset() {
      // this.form = {
      //   noticeId: undefined,
      //   noticeTitle: undefined,
      //   noticeType: undefined,
      //   noticeContent: undefined,
      //   status: "0",
      // };
      // this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      // this.queryParams.pageNum = 1;
      // this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      // this.resetForm("queryForm");
      // this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection
    },
    /** 新增按钮操作 */
    handleAdd() {
      // this.reset();
      // this.open = true;
      // this.title = "添加公告";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      // this.reset();
      // const noticeId = row.noticeId || this.ids;
      // getNotice(noticeId).then((response) => {
      //   this.form = response.data;
      //   this.open = true;
      //   this.title = "修改公告";
      // });
    },
    /** 提交按钮 */
    submitForm: function () {
      // this.$refs["form"].validate((valid) => {
      //   if (valid) {
      //     if (this.form.noticeId != undefined) {
      //       updateNotice(this.form).then((response) => {
      //         this.$modal.msgSuccess("修改成功");
      //         this.open = false;
      //         this.getList();
      //       });
      //     } else {
      //       addNotice(this.form).then((response) => {
      //         this.$modal.msgSuccess("新增成功");
      //         this.open = false;
      //         this.getList();
      //       });
      //     }
      //   }
      // });
    },
    /** 删除按钮操作 */
    handleDelete() {
        var selectedArr = this.ids || []
        if (selectedArr.length == 0) {
            this.$message({
                message : '请至少选择一条记录',
                type: 'warning'
            })
            return
        }
      let param = {
        recordsList : selectedArr
      }
      var names = []
      for (let index = 0; index < selectedArr.length; index++) {
        const element = selectedArr[index];
        names.push(element.xm)
      }
      this.$modal
        .confirm('是否确认删除姓名为"' + names + '"的数据项？')
        .then(function () {
          return getDeleteFdyRecords(param);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.emp-table {
  height: 100vh;
  background-color: #ffffff;
}
#pagenation {
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.table-content {
  padding-top: 32px;
  padding-left: 40px;
  padding-right: 40px;
  height: 100%;
  background-color: #ffffff;
  margin-top: 24px;
}

.title {
  margin-bottom: 32px;
}
.title-item {
  width: 80px;
  height: 28px;
  font-family: "PingFangSC-Semibold";
  font-weight: 600;
  font-size: 20px;
  color: #1f1f1f;
  line-height: 28px;
  margin-right: 12px;
}
/* 分页背景颜色修改 */
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #005657;
}
.operate {
  cursor: pointer;
}
.assignTea {
  font-family: "PingFangSC-Regular";
  font-weight: 700;
  font-size: 14px;
  color: #005657;
}
/* 任职记录 */
.teaRecord {
  background-color: rgba(0, 144, 161, 0.1) !important;
  border: 1px solid #0090a1 !important;
  font-weight: 600;
  font-size: 14px;
  color: #0090a1;
}
/* 批量分配 */
.teaAssign {
  background-color: #005657;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}
</style>
