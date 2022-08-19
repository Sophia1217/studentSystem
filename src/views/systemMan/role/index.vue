<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryParams"
      class="queryForm"
      size="small"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="queryParams.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色状态" prop="isUse">
        <el-select
          v-model="queryParams.isUse"
          placeholder="请选择角色"
          clearable
        >
          <el-option
            v-for="dict in roleNameOps"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
        <el-button size="mini" @click="resetQuery('queryParams')" class="reset">
          <span class="iconfont reset_icon">&#xe614;</span> 重置
        </el-button>
      </el-form-item>
    </el-form>

    <div class="content">
      <h3 class="title-item">
        角色列表<span class="iconfont repeat_icon">&#xe7b1; </span>
      </h3>
      <el-row :gutter="10" class="mb8" style="float: right; margin-top: 15px">
        <el-col :span="1.5">
          <el-button
            type="primary"
            class="create"
            size="small"
            @click="handleAdd(1)"
          >
            <i class="addIcon"></i>
            新增角色
          </el-button>
        </el-col>
      </el-row>

      <el-table :data="noticeList">
        <el-table-column
          label="序号"
          align="center"
          prop="id"
          width="100"
          type="index"
        />
        <el-table-column
          label="角色名称"
          align="center"
          prop="roleName"
          sortable
        />
        <el-table-column label="权限描述" align="center" prop="rem" sortable />
        <!-- <el-table-column
          label="创建时间"
          align="center"
          prop="modTime"
          sortable
        /> -->
        <el-table-column label="角色状态" align="center" prop="isUse" sortable>
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.isUse"
                active-color="#23AD6F"
                inactive-color="#E0E0E0"
                @change="openOrClose(scope.row)"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" sortable>
          <template slot-scope="scope">
            <div class="operation">
              <div class="editBtn" @click="handleAdd(2, scope.row)">
                <i class="icon editIcon"></i> 编辑
              </div>
              <div class="deleteBtn" @click="handleDetele(scope.row)">
                <i class="icon deteleIcon"></i>删除
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleQuery"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
      />
    </div>
  </div>
</template>

<script>
import "@/assets/fonts/repeat/iconfont.css";
import { queryRoleList, deleteList, cancel } from "@/api/systemMan/role";
export default {
  name: "role",
  data() {
    return {
      // 查询参数
      queryParams: {
        roleName: "",
        isUse: "",
        roleDate: "",
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      roleNameOps: [
        { label: "所有", value: "" },
        { label: "启用", value: "0" },
        { label: "禁用", value: "1" },
      ],
      noticeList: [],
      state: false,
    };
  },
  created() {
    this.handleQuery();
  },
  activated() {
    this.handleQuery();
  },
  methods: {
    //搜索按钮操作
    handleQuery() {
      let data = {
        roleId: "01",
        roleName: this.queryParams.roleName,
        isUse: this.queryParams.isUse,
      };
      queryRoleList(data)
        .then((res) => {
          this.noticeList = res.data.rows;
          this.noticeList.forEach((item) => {
            item.isUse == "0" ? (item.isUse = true) : (item.isUse = false);
          });
          this.queryParams.total = res.data.totalCount;
        })
        .catch((err) => {});
    },
    //重置按钮操作
    resetQuery(queryForm) {
      this.$refs[queryForm].resetFields();
    },
    /** 新增 */
    handleAdd(index, msg) {
      if (index === 1) {
        this.query = { isEdit: index };
      } else {
        this.query = {
          isEdit: index,
          UpId: msg.roleId, //编辑操作所需要的请求menuList的roleId
          roleNameEdit: index === 2 ? msg.roleName : "",
          rem: msg.rem,
        };
      }
      this.$router.push({
        path: "/systems/addRole",
        query: this.query,
      });
    },
    handleDetele(row) {
      this.$confirm(`确认删除【${row.roleName}】角色？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.delete(row.roleId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    openOrClose(inf) {
      var data = {
        userId: "1234",
        roleId: inf.roleId,
        isUse: inf.roleId ? "1" : "0",
      };
      cancel(data).then((res) => {
        console.log("状态改变成功");
      });
    },
    delete(id) {
      let data = { userId: "1234", roleId: id };
      deleteList(data)
        .then((res) => {
          if (res.errcode == "00") {
            this.$message({
              message: "删除成功",
              type: "success",
              duration: 500,
            });
          }
          this.handleQuery();
        })
        .catch((error) => {});
    },
  },
};
</script>
<style scope lang="scss">
.queryForm {
  background: #fff;
  padding: 20px;
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

.content {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
  .title-item {
    display: inline-block;
    width: 120px;
    height: 28px;
    font-family: "PingFangSC-Semibold";
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    .iconfont {
      margin-left: 5px;
    }
  }
  .create {
    background: #005657;
    .addIcon {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("~@/assets/images/addIcon_w.png");
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .operation {
    display: flex;
    justify-content: space-between;
    .editBtn {
      color: #005657;
      cursor: pointer;
    }
    .deleteBtn {
      color: #ed5234;
      cursor: pointer;
    }
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      vertical-align: middle;
    }
    .editIcon {
      background: url("~@/assets/images/edit_b.png");
    }
    .deteleIcon {
      background: url("~@/assets/images/delete_r.png");
    }
  }
}
</style>
