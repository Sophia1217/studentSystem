<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="学院" prop="noticeType">
        <el-select
          v-model="queryParams.noticeType"
          placeholder="计算机学院"
          clearable
        >
          <!-- <el-option
            v-for="dict in dict.type.sys_notice_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="培养层次" prop="noticeType">
        <el-select
          v-model="queryParams.noticeType"
          placeholder="本科"
          clearable
        >
          <!-- <el-option
            v-for="dict in dict.type.sys_notice_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop="noticeType">
        <el-select
          v-model="queryParams.noticeType"
          placeholder="2022"
          clearable
        >
          <!-- <el-option
            v-for="dict in dict.type.sys_notice_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="班级编号" prop="createBy">
        <el-input
          v-model="queryParams.createBy"
          placeholder="请输入班级编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8 row-left">
      <el-col :span="1.5">
        <el-button class="addClass">
          <span class="addSpan">新增班级</span>
        </el-button>
        <!-- <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          v-hasPermi="['system:notice:add']"
          @click="handleAdd"
          >新增班级</el-button
        > -->
      </el-col>

      <el-col :span="1.5">
        <el-button class="deleteClass">
          <span class="deleteSpan">删除空班级</span>
        </el-button>
        <!-- <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:notice:edit']"
          >删除空班级</el-button
        > -->
      </el-col>
      <el-col :span="1.5">
        <el-button class="exportClass">
          <span class="exportSpan">导出班级名单</span>
        </el-button>
        <!-- <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:notice:remove']"
          >导出班级名单</el-button
        > -->
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="noticeList"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" align="center" prop="index" width="50" />
      <el-table-column
        label="班级编号"
        align="center"
        prop="id"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="班级姓名"
        align="center"
        width="200"
        class="className"
      >
        <input class="inputName" type="text" :value="noticeList[0].name" />
      </el-table-column>
      <el-table-column label="学院" align="center" prop="dept">
      </el-table-column>
      <el-table-column
        label="培养层次"
        align="center"
        prop="rank"
        :show-overflow-tooltip="true"
      >
        <!-- <template slot-scope="scope">
          :options="dict.type.sys_notice_type" 
          <dict-tag :value="scope.row.noticeType" />
        </template>-->
      </el-table-column>
      <el-table-column
        label="班级人数"
        align="center"
        prop="counts"
        :show-overflow-tooltip="true"
      >
        <!-- <template slot-scope="scope">
          :options="dict.type.sys_notice_type" 
          <dict-tag :value="scope.row.noticeType" />
        </template>-->
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="createTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        prop="operate"
        :show-overflow-tooltip="true"
      >
        <!-- <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:notice:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:notice:remove']"
            >删除</el-button
          >
        </template> -->
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

    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告标题" prop="noticeTitle">
              <el-input
                v-model="form.noticeTitle"
                placeholder="请输入公告标题"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告类型" prop="noticeType">
              <el-select v-model="form.noticeType" placeholder="请选择公告类型">
                <!-- <el-option
                  v-for="dict in dict.type.sys_notice_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <!-- v-for="dict in dict.type.sys_notice_status"
                :key="dict.value" :label="dict.value" 
                {{
                  dict.label
                }}-->
                <el-radio>哈哈</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <editor v-model="form.noticeContent" :min-height="192" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listNotice,
  getNotice,
  delNotice,
  addNotice,
  updateNotice,
} from "@/api/system/notice";

export default {
  name: "Notice",
  // dicts: ["sys_notice_status", "sys_notice_type"],
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 18,
      // 公告表格数据
      noticeList: [
        {
          index: 1,
          id: 13070025,
          name: "计算机工程硕士2022级1班",
          dept: "计算机工程学院",
          rank: "本科",
          counts: 34,
          createTime: "2022-07-07",
          updateTime: "2022-07-07",
          operate: "班级操作记录",
        },
        {
          index: 2,
          id: 13070025,
          name: "计算机工程硕士2022级1班",
          dept: "计算机工程学院",
          rank: "本科",
          counts: 34,
          createTime: "2022-07-07",
          updateTime: "2022-07-07",
          operate: "班级操作记录",
        },
        {
          index: 3,
          id: 13070025,
          name: "计算机工程硕士2022级1班",
          dept: "计算机工程学院",
          rank: "本科",
          counts: 34,
          createTime: "2022-07-07",
          updateTime: "2022-07-07",
          operate: "班级操作记录",
        },
        {
          index: 4,
          id: 13070025,
          name: "计算机工程硕士2022级1班",
          dept: "计算机工程学院",
          rank: "本科",
          counts: 34,
          createTime: "2022-07-07",
          updateTime: "2022-07-07",
          operate: "班级操作记录",
        },
        {
          index: 5,
          id: 13070025,
          name: "计算机工程硕士2022级1班",
          dept: "计算机工程学院",
          rank: "本科",
          counts: 34,
          createTime: "2022-07-07",
          updateTime: "2022-07-07",
          operate: "班级操作记录",
        },
        {
          index: 6,
          id: 13070025,
          name: "计算机工程硕士2022级1班",
          dept: "计算机工程学院",
          rank: "本科",
          counts: 34,
          createTime: "2022-07-07",
          updateTime: "2022-07-07",
          operate: "班级操作记录",
        },
        {
          index: 7,
          id: 13070025,
          name: "计算机工程硕士2022级1班",
          dept: "计算机工程学院",
          rank: "本科",
          counts: 34,
          createTime: "2022-07-07",
          updateTime: "2022-07-07",
          operate: "班级操作记录",
        },
        {
          index: 8,
          id: 13070025,
          name: "计算机工程硕士2022级1班",
          dept: "计算机工程学院",
          rank: "本科",
          counts: 34,
          createTime: "2022-07-07",
          updateTime: "2022-07-07",
          operate: "班级操作记录",
        },
        {
          index: 9,
          id: 13070025,
          name: "计算机工程硕士2022级1班",
          dept: "计算机工程学院",
          rank: "本科",
          counts: 34,
          createTime: "2022-07-07",
          updateTime: "2022-07-07",
          operate: "班级操作记录",
        },
        {
          index: 10,
          id: 13070025,
          name: "计算机工程硕士2022级1班",
          dept: "计算机工程学院",
          rank: "本科",
          counts: 34,
          createTime: "2022-07-07",
          updateTime: "2022-07-07",
          operate: "班级操作记录",
        },
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createBy: undefined,
        status: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    /** 查询公告列表 */
    getList() {
      // this.loading = true;
      // listNotice(this.queryParams).then((response) => {
      //   this.noticeList = response.rows;
      //   this.total = response.total;
      //   this.loading = false;
      // });
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
      // this.ids = selection.map((item) => item.noticeId);
      // this.single = selection.length != 1;
      // this.multiple = !selection.length;
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
    handleDelete(row) {
      // const noticeIds = row.noticeId || this.ids;
      // this.$modal
      //   .confirm('是否确认删除公告编号为"' + noticeIds + '"的数据项？')
      //   .then(function () {
      //     return delNotice(noticeIds);
      //   })
      //   .then(() => {
      //     this.getList();
      //     this.$modal.msgSuccess("删除成功");
      //   })
      //   .catch(() => {});
    },
  },
};
</script>

<style>
.row-left {
  float: right;
}
.className {
  background-color: pink;
}
.inputName {
  height: 32px;
  border: 1px solid #cccccc;
}

#test {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.addClass {
  background-color: #005657;
  color: #fff;
  width: 112px;
  height: 36px;
}

.addClass::before {
  content: url("~@/assets/class_icons/add.png");
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-left: -8px;
  padding-bottom: 2px;
  vertical-align: middle;
}
.addSpan {
  height: 20px;
  line-height: 20px;
  vertical-align: middle;
}
.deleteClass {
  border-color: red;
  color: red;
  width: 112px;
  height: 36px;
}
.deleteClass::before {
  content: url("~@/assets/class_icons/delete.png");
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-left: -8px;
  padding-bottom: 2px;
  vertical-align: middle;
}
.deleteSpan {
  height: 20px;
  line-height: 20px;
  vertical-align: middle;
}
.exportClass {
  border-color: #005657;
  color: #005657;
  width: 140px;
  height: 36px;
}
.exportClass::before {
  content: url("~@/assets/class_icons/export.png");
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-left: -8px;
  padding-bottom: 2px;
  vertical-align: middle;
}
.exportSpan {
  height: 20px;
  line-height: 20px;
  vertical-align: middle;
}
</style>
