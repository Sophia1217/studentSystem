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
      <el-form-item label="班级编号" prop="noticeTitle">
        <el-input
          v-model="queryParams.noticeTitle"
          placeholder="请输入班级编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          class="search"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button size="mini" @click="resetQuery" class="reset">
          <span class="iconfont reset_icon">&#xe614;</span>

          重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8" style="float: right">
      <el-col :span="1.5">
        <el-button type="primary" class="create" icon="el-icon-search"
          >新建班级</el-button
        >
        <!-- <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:notice:add']"
        >新增</el-button> -->
      </el-col>
      <el-col :span="1.5">
        <el-button class="delete" icon="el-icon-delete">删除空班级</el-button>
        <!-- <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:notice:edit']"
        >修改</el-button> -->
      </el-col>
      <el-col :span="1.5">
        <el-button class="export">
          <span class="iconfont icon-daochu-06"></span>
          导出班级名单</el-button
        >
        <!-- <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:notice:remove']"
        >删除</el-button> -->
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table
      v-loading="loading"
      :data="noticeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="序号" align="center" prop="id" width="100" />
      <el-table-column
        label="班级编号"
        align="center"
        prop="classId"
        width="100"
      />
      <el-table-column
        label="班级姓名"
        align="center"
        prop="className"
        width="300"
      >
        <el-input
          :value="noticeList[0].className"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-table-column>
      <el-table-column label="学院" align="center" prop="college" width="150" />
      <el-table-column
        label="培养层次"
        align="center"
        prop="level"
        width="100"
      />
      <el-table-column
        label="班级人数"
        align="center"
        prop="nums"
        width="100"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="beginTime"
        width="150"
      />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="150"
      />
      <el-table-column
        label="操作"
        align="center"
        prop="record"
        class-name="small-padding fixed-width"
      />

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
                <!-- <el-radio
                  v-for="dict in dict.type.sys_notice_status"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio> -->
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
import "@/assets/fonts/export/iconfont.css";
import {
  listNotice,
  getNotice,
  delNotice,
  addNotice,
  updateNotice,
} from "@/api/system/notice";

export default {
  name: "maintenanceClass",
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
      total: 100,
      // 表格数据
      noticeList: [
        {
          id: 1,
          classId: 13070025,
          className: "计算机工程硕士2022级1班",
          college: "计算机工程学院",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
          record: "班级操作记录",
        },
        {
          id: 2,
          classId: 13070025,
          className: "计算机工程硕士2022级2班",
          college: "计算机工程学院",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
          record: "班级操作记录",
        },
        {
          id: 3,
          classId: 13070025,
          className: "计算机工程硕士2022级3班",
          college: "计算机工程学院",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
          record: "班级操作记录",
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
      this.loading = true;
      listNotice(this.queryParams).then((response) => {
        this.noticeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        noticeId: undefined,
        noticeTitle: undefined,
        noticeType: undefined,
        noticeContent: undefined,
        status: "0",
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.noticeId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公告";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const noticeId = row.noticeId || this.ids;
      getNotice(noticeId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公告";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.noticeId != undefined) {
            updateNotice(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNotice(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const noticeIds = row.noticeId || this.ids;
      this.$modal
        .confirm('是否确认删除公告编号为"' + noticeIds + '"的数据项？')
        .then(function () {
          return delNotice(noticeIds);
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
<style>
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
#test {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
</style>
