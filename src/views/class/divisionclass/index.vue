<template>
  <div class="division-class">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      class="table-header"
    >
      <el-form-item label="培养单位" prop="ssdwdmList" class="header-item">
        <el-select
          v-model="queryParams.ssdwdmList"
          placeholder="未选择"
          clearable
          multiple
        >
          <el-option
            v-for="(item, index) in collegeOptions"
            :key="index"
            :label="item.mc"
            :value="item.dm"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="培养层次" prop="pyccList" class="header-item">
        <el-select
          v-model="queryParams.pyccList"
          placeholder="未选择"
          clearable
          multiple
        >
          <el-option
            v-for="(item, index) in levelOptions"
            :key="index"
            :label="item.mc"
            :value="item.dm"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop="ssnjList" class="header-item">
        <el-select
          v-model="queryParams.ssnjList"
          placeholder="未选择"
          clearable
          multiple
        >
          <el-option
            v-for="(item, index) in gradeOptions"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称" prop="bjmc" class="header-item">
        <el-input
          v-model="queryParams.bjmc"
          placeholder="请输入班级名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item class="header-item">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          class="search"
          @click="handleQuery"
          >查询</el-button
        >
        <el-button size="mini" @click="resetQuery('queryForm')" class="reset">
          <span class="iconfont reset_icon">&#xe614;</span>

          重置</el-button
        >
      </el-form-item>
    </el-form>
    <div class="table-content">
      <div class="content_top" icon="el-icon-refresh">
        <div class="headerLeft">
          <span class="title">分班管理列表</span>
          <i class="Updataicon"></i>
        </div>
        <!-- <div class="headerLeft">
          <span class="title-itemll">分班管理列表</span>
          <span class="iconfont">&#xe631;</span>
        </div> -->
        <!-- <el-row :gutter="10" class="mb8" style="float: right">
          <el-col :span="1.5">
            <el-button class="export" @click="mbDown"> 模板下载</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-upload
              accept=".xlsx,.xls"
              :auto-upload="true"
              :action="uploadUrl"
              :show-file-list="false"
              :data="fileData"
              :headers="fileHeader"
              :on-success="upLoadSuccess"
              :on-error="upLoadError"
            >
              <el-button class="export"> 导入</el-button>
            </el-upload>
          </el-col>
        </el-row> -->
        <div class="headerRight">
          <div class="btns borderBlue" @click="mbDown" v-show="AUTHFLAG">
            <i class="icon downIcon"></i><span class="title">模板下载</span>
          </div>

          <div class="btns borderBlue" v-show="AUTHFLAG">
            <el-upload
              accept=".xlsx,.xls"
              :auto-upload="true"
              :action="uploadUrl"
              :show-file-list="false"
              :data="fileData"
              :headers="fileHeader"
              :on-success="upLoadSuccess"
              :on-error="upLoadError"
            >
              <i class="icon blueIcon"></i><span class="title">导入</span>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table :data="noticeList" @sort-change="changeTableSort">
          <el-table-column label="序号" align="center" type="index" />
          <el-table-column
            label="班级编号"
            align="center"
            prop="bjdm"
            width="110" 
            sortable="custom"
          />
          <el-table-column
            label="班级名称"
            align="center"
            width="250px"
            prop="bjmc"
            sortable="custom"
          >
            <!-- <template slot-scope="{ row }">
            <el-input
              v-model="row.bjmc"
              clearable
              width="200px"
              @keyup.enter.native="alterClassName(row)"
            />
          </template> -->
          </el-table-column>
          <el-table-column
            label="培养单位"
            align="center"
            prop="ssdwmc"
            min-width="100" 
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            label="培养层次"
            align="center"
            prop="pyccName"
            width="100" 
            sortable="custom"
          />
          <el-table-column
            label="年级"
            align="center"
            prop="ssnj"
            width="100" 
            sortable="custom"
          />
          <el-table-column
            label="班级人数"
            align="center"
            prop="stuNumOfClass"
            width="100" 
            sortable="custom"
          />
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            min-width="100" 
            sortable="custom"
          />
          <el-table-column
            label="更新时间"
            align="center"
            prop="updateTime"
            min-width="100" 
            sortable="custom"
            class-name="small-padding fixed-width"
          />
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            sortable
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <div @click="operate(scope.row)" class="operate">
                <span class="operateSpan" v-if="fbgl">分班管理</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/fonts/export/iconfont.css";
import AppLink from "@/layout/components/Sidebar/Link.vue";
import "@/assets/fonts/refresh/iconfont.css";

import {
  classList,
  getCollege,
  getLevel,
  getGrade,
} from "@/api/class/maintenanceClass"; // 引入班级列表查询、修改班级名称接口
import { mbDown } from "@/api/class/divisionClass";
import { getQueryStuList } from "@/api/class/divisionClass";
import { getToken } from "@/utils/auth";
export default {
  name: "divisionClass", //分班管理
  dicts: [], // ['sys_notice_status', 'sys_notice_type']
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/class/importExcel", // 上传的图片服务器地址
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
      noticeList: [],
      // 筛选框数据
      collegeOptions: [],
      levelOptions: [],
      ops:{dm:"12", mc:"硕博"},
      gradeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        ssdwdmList: [], // 培养单位
        pyccList: [], // 培养层次
        ssnjList: [], // 年级
        bjmc: "", //班级名称
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
      menuVal: this.$store.state.permission.topbarRouters,
      Jr: [],
      fbgl: true,
    };
  },
  computed: {
    fileData: {
      get() {
        return {
          classNum: this.$route.query.bjdm,
        };
      },
    },
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
  mounted() {
    this.getList();
    this.getOptions();
    this.getData(this.menuVal);
    this.fbgl = this.Jr.includes("0304");
  },
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  activated() {},
  methods: {
    mbDown() {
      mbDown().then((res) => this.downloadFn(res, "分班管理模板下载", "xlsx"));
    },
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
    getData(data) {
      for (var i in data) {
        this.Jr.push(data[i].modId); //将第一层的保存出来，
        if (data[i].children) {
          // if(data[i].length >)
          this.getData(data[i].children);
        }
      }
      return this.Jr;
    },
    getList() {
      var data = this.queryParams;
      classList(data).then((response) => {
        // 获取班级列表数据
        this.noticeList = response.data.rows; // 根据状态码接收数据
        this.total = response.data.total;
        //  this.loading = false;
      });
    },
    getOptions() {
      getCollege().then((response) => {
        // 获取培养单位列表数据
        this.collegeOptions = response.data.rows;
        //  this.loading = false;
      });
      getLevel().then((response) => {
        // 获取培养层次列表数据
        var aa =  response.data.rows.length;
        response.data.rows[aa]= this.ops;
        this.levelOptions = response.data.rows;
      });
      getGrade().then((response) => {
        // 获取年级列表数据
        this.gradeOptions = response.data.rows;
      });
    },
    // 查询按钮
    handleQuery() {
      this.getList(this.queryParams);
    },
    // /** 重置按钮操作 */
    resetQuery(a) {
      this.$refs[a].resetFields();
      this.handleQuery();
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderField = column.prop;
      this.queryParams.orderType =
        column.order === "descending" ? "desc" : "asc"; // 0是asc升序，1是desc降序
      this.getList();
    },
    // 分班管理
    operate(row) {
      this.$router.push({
        path: "/class/operateClass",
        query: {
          bjmc: row.bjmc,
          bjdm: row.bjdm,
          pydw: this.queryParams.ssdwdm || row.ssdw, // 培养单位代码
          pydwmc: row.ssdwmc, // 培养单位名称
          pyccName: this.queryParams.pycc || row.pyccName, // 培养层次名字
          pycc: row.pycc, // 培养层次码
          ssnj: this.queryParams.ssnj || row.ssnj, // 年级
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.division-class {
  background-color: #fff;
  margin-top: 10px;
  padding-bottom: 20px;
  /* height: 100%; */
}
.mt15 {
  margin-top: 15px;
}
.table-header {
  background-color: #ffffff;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
.headerLeft {
  .title {
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    line-height: 28px;
  }
  .Updataicon {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    background: url("../../../assets/images/updata.png") no-repeat;
  }
}
.header-item {
  display: flex;
  justify-content: center;
  align-items: center;
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
#pagenation {
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.table-content {
  /* padding-top: 32px; */
  padding-left: 40px;
  padding-right: 40px;
  /* height: 100%; */
  background-color: #ffffff;
  /* margin-top: 24px; */
}

.title-itemlll {
  width: 10%;
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
.operateSpan {
  font-family: "PingFangSC-Regular";
  font-weight: 700;
  font-size: 14px;
  color: #005657;
}
.pagination-container .el-pagination {
  right: 50%;
  position: absolute;
  transform: translateX(50%);
}
.content_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
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
</style>
