<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryParams" class="queryForm" size="small" :inline="true"
      label-width="68px">
      <el-form-item label="角色名称" prop="roleName">
        <el-select v-model="queryParams.roleName" placeholder="请输入姓名" clearable>
          <el-option v-for="dict in roleNameOps" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色状态" prop="roleState">
        <el-select v-model="queryParams.roleState" placeholder="请选择角色" clearable>
          <el-option
            v-for="dict in roleNameOps"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="roleDate">
        <el-date-picker 
            v-model="queryParams.roleDate" 
            type="daterange" 
            range-separator="至" 
            start-placeholder="起始年月日" 
            end-placeholder="结束年月日" 
            value-format="yyyy-MM-dd" 
            :clearable="false">
          </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" class="search" @click="handleQuery">查询</el-button>
        <el-button size="mini" @click="resetQuery('queryParams')" class="reset">
          <span class="iconfont reset_icon">&#xe614;</span> 重置
        </el-button>
      </el-form-item>
    </el-form>

    <div class="content">
      <h3 class="title-item">角色列表<span class="iconfont repeat_icon">&#xe7b1; </span></h3>
      <el-row :gutter="10" class="mb8" style="float: right; margin-top: 15px">
        <el-col :span="1.5">
          <el-button type="primary" class="create" size="small" @click="handleAdd(1)">
            <i class="addIcon"></i>
            新增角色
          </el-button>
        </el-col>
      </el-row>

      <el-table :data="noticeList">
        <el-table-column label="序号" align="center" prop="id" width="100" type="index" />
        <el-table-column label="角色名称" align="center" prop="roleName" sortable />
        <el-table-column label="权限描述" align="center" prop="className" sortable />
        <el-table-column label="创建时间" align="center" prop="modTime" sortable />
        <el-table-column label="角色状态" align="center" prop="isUse" sortable >
          <template slot-scope="scope">
            <div>
              <el-switch v-model="scope.row.isUse" active-color="#23AD6F" inactive-color="#E0E0E0"></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" sortable >
          <template slot-scope="scope">
            <div class="operation">
              <div class="editBtn" @click="handleAdd(2)"> <i class="icon editIcon"></i> 编辑</div>
              <div class="deleteBtn" @click="handleDetele(scope.row)"> <i class="icon deteleIcon"></i>删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import "@/assets/fonts/repeat/iconfont.css";
import {  queryRoleList} from "@/api/systemMan/role"
export default {
  name: "role",
  data() {
    return {
      // 查询参数
      queryParams: {
        roleName: '',
        roleState:'',
        roleDate:'',
      },
      roleNameOps:[],
      noticeList: []
    };
  },
  created() {
    this.handleQuery()
  },
  methods: {
    //搜索按钮操作 
    handleQuery() {
      let data = { roleId: '01'}
      queryRoleList(data).then(res => {
        console.log(res.data.rows)
        this.noticeList = res.data.rows
      }).catch(err=>{})
    },
    //重置按钮操作 
    resetQuery(queryForm) {
      this.$refs[queryForm].resetFields();
    },
    /** 新增 */
    handleAdd(index) {
      this.$router.push({
        path: '/systems/addRole',
        query: {
          isEdit: index
        }
      })
    },
    handleDetele(row) {
      console.log(row)
      this.$confirm(`确认删除【${row.classId}】角色？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
};
</script>
<style scope lang="scss">
.queryForm{
  background:#fff;
  padding:20px;
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

.content{
  background:#fff;
  padding:20px;
  margin-top: 20px;
  .title-item {
    display: inline-block;
    width: 120px;
    height: 28px;
    font-family: "PingFangSC-Semibold";
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    .iconfont{
      margin-left: 5px;
    }
  }
  .create {
    background: #005657;
    .addIcon{
      display: inline-block;
      width:20px;
      height: 20px;
      background: url('~@/assets/images/addIcon_w.png');
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .operation{
    display: flex;
    justify-content: space-between;
    .editBtn{
      color:#005657;
      cursor: pointer;
    }
    .deleteBtn{
      color:#ED5234;
      cursor: pointer;
    }
    .icon{
      display: inline-block;
      width:20px;
      height: 20px;
      margin-right: 5px;
      vertical-align: middle;
    }
    .editIcon{
      background: url('~@/assets/images/edit_b.png');
    }
    .deteleIcon{
      background: url('~@/assets/images/delete_r.png');
    }
  }
}
</style>
