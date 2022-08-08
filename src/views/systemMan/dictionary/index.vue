<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryParams" class="queryForm" size="small" :inline="true"
      label-width="68px">
      <el-form-item label="字典类型" prop="roleName">
        <el-input v-model="queryParams.roleName" size="small" placeholder="请输入字典类型"></el-input>
      </el-form-item>
      <el-form-item label="字典名称" prop="roleName">
        <el-input v-model="queryParams.roleName" size="small" placeholder="请输入字典名称"></el-input>
      </el-form-item>
      <el-form-item label="字典状态" prop="roleState">
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
      <div class="content_top">
        <h3 class="title-item">字典管理<span class="iconfont repeat_icon">&#xe7b1; </span></h3>
        <div class="headerRight">
          <!-- <div class="btns borderBlue" @click="handleAdd(null)">
            <i class="icon blueIcon"></i><span class="title">新增字典</span>
          </div> -->
          <!-- <div class="btns borderOrange" @click="handleDetele">
            <i class="icon orangeIcon"></i><span class="title">删除</span>
          </div> -->
        </div>
      </div>
      

      <el-table :data="noticeList"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" align="center" prop="id" width="100" type="index" />
        <el-table-column label="字典类型" align="center" prop="classId" sortable />
        <el-table-column label="字典名称" align="center" prop="className" sortable />
        <el-table-column label="字典状态" align="center" prop="college" sortable />
        <el-table-column label="备注" align="center" prop="college" sortable />
        <el-table-column label="创建时间" align="center" prop="college" sortable />
        <el-table-column label="操作" width="200" sortable >
          <template slot-scope="scope">
            <div class="operation">
              <div class="editBtn" @click="handleAdd(scope.row)"> <i class="icon editIcon"></i> 编辑</div>
              <div class="editBtn" > <i class="icon deteleIcon"></i>字典列表</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <dicDialog :rowId="rowId" :dialogVisible="dialogVisible" @handleCloseDia="handleCloseDia" @handleCommitDia="handleCommitDia"></dicDialog>
  </div>
</template>

<script>
import "@/assets/fonts/repeat/iconfont.css";
import DicDialog from './dicDialog.vue'
export default {
  name: "dictionary",
  components: { DicDialog },
  data() {
    return {
      // 查询参数
      queryParams: {
        roleName: '',
        roleState:'',
        roleDate:'',
      },
      roleNameOps:[],
      noticeList: [
        {
          id:1,
          classId: 13070025,
          className: "计算机工程硕士2022级1班",
          college: "计算机工程学院",
          size: true,
          level: "本科",
          nums: 34,
          beginTime: "2022-07-07",
          updateTime: "2022-07-07",
        },
      ],
      multipleSelection: [],
      dialogVisible: false,
      rowId:''
    };
  },
  methods: {
    //搜索按钮操作 
    handleQuery() {
    },
    //重置按钮操作 
    resetQuery(queryForm) {
      this.$refs[queryForm].resetFields();
    },
    /** 新增 */
    handleAdd(row) {
      if (row&&row.id) {
        this.rowId = row.id
      } else {
        this.rowId = null
      }
      console.log(this.rowId)
      this.dialogVisible = true
    },
    handleCloseDia() { 
      this.dialogVisible = false
    },
    handleCommitDia() {
      this.dialogVisible = false
    },
    handleDetele() {
      this.$confirm(`确认删除XX条字典项目？`, '提示', {
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
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
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
  .content_top{
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
      .iconfont{
        margin-left: 5px;
      }
    }
    .headerRight{
        display: flex;
        .borderBlue{
          border:1px solid #005657;
          color:#fff;
          background: #005657;
        }
        .borderOrange{
          border:1px solid #EB3842;
          color:#EB3842;
          background: #fdf6f3;
        }
        .btns{
          margin-right: 15px;
          padding:5px 10px;
          cursor:pointer;
          .title{
            font-size: 14px;
            text-align: center;
            line-height: 22px;
            // vertical-align: middle;
          }
          .icon{
            display: inline-block;
            width:20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }
          .blueIcon{
            background: url('~@/assets/images/addIcon_w.png') no-repeat;
          }
          .orangeIcon{
            background: url('~@/assets/images/delete_r.png') no-repeat;
          }
        }
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
      background: url('~@/assets/images/auditIcon.png');
    }
  }
}
</style>
