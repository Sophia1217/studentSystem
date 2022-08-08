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
      <el-form-item label="培养单位" prop="noticeType">
        <el-select
          v-model="queryParams.noticeType"
          placeholder="计算机学院"
          clearable
        >
        </el-select>
      </el-form-item>
      <el-form-item label="培养层次" prop="noticeType">
        <el-select
          v-model="queryParams.noticeType"
          placeholder="本科"
          clearable
        >
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop="noticeType">
        <el-select
          v-model="queryParams.noticeType"
          placeholder="2022"
          clearable
        >
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
          >查询</el-button
        >
        <el-button size="mini" @click="resetQuery" class="reset">
          <span class="iconfont reset_icon">&#xe614;</span>

          重置</el-button
        >
      </el-form-item>
    </el-form>
    <div>
      <h3 class="title-item">
        班级列表<span class="iconfont repeat_icon">&#xe7b1; </span>
      </h3>
    </div>

    <!-- 班级列表 -->
    <el-table
      v-loading="loading"
      :data="noticeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="序号" align="center" width="100" type="index" />
      <el-table-column
        label="班级编号"
        align="center"
        prop="classId"
        width="100"
        sortable
      />
      <el-table-column
        label="班级名称"
        align="center"
        prop="className"
        width="300"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="培养单位"
        align="center"
        prop="college"
        width="150"
        sortable
      />
      <el-table-column
        label="培养层次"
        align="center"
        prop="level"
        width="100"
        sortable
      />
      <el-table-column
        label="班级人数"
        align="center"
        prop="nums"
        width="100"
        sortable
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="beginTime"
        width="150"
        sortable
      />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        sortable
        class-name="small-padding fixed-width"
      />
      <el-table-column
        label="操作"
        align="center"
        prop="action"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <div @click="action(scope.row)">
            <span class="iconfont allocate_teacher">&#xe638;</span>
            <span class="leaderAssign" style="color: #005657; margin-left: 5px" @click="leaderAssign"> 班干部任命 </span>
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
import "@/assets/fonts/person/iconfont.css";
export default {
  name: "classleader", //班干部管理
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
          classId: 13070025,
          className: "计算机工程硕士2022级1班",
          college: "计算机工程学院",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
        },
        {
          classId: 13070025,
          className: "计算机工程硕士2022级1班",
          college: "计算机工程学院",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
        },
        {
          classId: 13070025,
          className: "计算机工程硕士2022级1班",
          college: "计算机工程学院",
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
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
          { required: true, message: "所属学院为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "培养层次不能为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 班干部任命
    leaderAssign(){
      this.$router.push('/class/leaderAssign')
    }
  },
};
</script>

<style scoped>
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
.allocate {
  color: #ffff;
  background-color: #005657;
}
.allocate_icon {
  color: #ffff;
}
.onrecord {
  color: #0090a1;
  border-color: #0090a1;
  background-color: #e8fcfc;
}
.confirm {
  background-color: #005657;
}
.record_icon {
  margin-right: 5px;
}
.record_icon + span,
.allocate_teacher {
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
  width: 120px;
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
.el-textarea.el-input--medium {
  display: inline-block;
  width: 80%;
}

/* 班干部任命按钮 */
.leaderAssign{
  cursor: pointer;
}
</style>
