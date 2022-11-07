<template>
  <div class="permissions">
    <el-form class="elForm" :inline="true" :model="formName">
      <el-form-item label="用 户 名">
        <el-input
          size="small"
          :disabled="true"
          v-model="formName.xm"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="学 工 号">
        <el-input
          size="small"
          :disabled="true"
          v-model="formName.userId"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="editBtn" @click="addRoles">
          <i class="addIcon"></i> 新增用户角色
        </div>
      </el-form-item>
    </el-form>

    <div class="roleWrap" v-for="(role, index) in targetArr" :key="index">
      <div class="roleStyle">
        <div class="name">用户角色</div>
        <div>
          <el-select
            v-model="role.roleId"
            class="elFormSelect"
            @change="
              (item) => {
                hold(item, index);
              }
            "
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in checkboxWrap"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-tree
            ref="tree"
            node-key="modId"
            :data="role.treeData"
            :props="defaultProps"
            show-checkbox
            :default-checked-keys="role.arr"
            @check="
              (item, item1) => {
                currentChecked(item, item1, index);
              }
            "
          >
          </el-tree>
        </div>
      </div>
      <div class="deleIcon" @click="deleRoles(role, index)"><i></i></div>
      <div class="btn confirm" @click="handleDataAuth(role, index)">
        <i class="icon yesIcon"></i> 提交
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryDataAuth,
  updateDataAuth,
  deleteRole,
  defaultRoleAuth,
} from "@/api/systemMan/user";
import {
  queryLoginUserDataAuth,
  queryUserDataAuth,
} from "@/api/systemMan/user";
import { queryRoleList } from "@/api/systemMan/user";
export default {
  name: "permissions",
  data() {
    return {
      defaultTree: [], //默认树
      checkboxWrap: [], //用户角色下拉
      defaultProps: {
        children: "dataEntityList",
        label: "modName",
        value: "modId",
      },
      roleArr: [],
      targetArr: [],

      formName: {
        xm: "",
        userId: "",
        roleId: "",
      },
      isDeafult: false,
      stuListOps: [], // 学生数据
      roleData: [], // 用户分组
      checksedKeys: [], // 被操作人选中节点
      defaultArr: [],
      savaData: [], //要获取上级根节点
    };
  },

  created() {
    this.formName = this.$route.query;
    this.roleArr = this.$route.query.roleId;
  },

  mounted() {
    this.getqueryRoleList();
  },

  methods: {
    async getqueryRoleList() {
      // 获取管理员角色列表
      let data = { roleId: this.$store.getters.roleId };
      queryRoleList(data)
        .then((res) => {
          this.checkboxWrap = res.data.rows || [];
        })
        .catch((err) => {});
      //登录人的树结构，每棵树都是一样的，不用循环
      var loginData = {
        userId: this.$store.getters.userId,
        roleId: this.$store.getters.roleId,
        type: 0,
      };
      await queryLoginUserDataAuth(loginData).then((res) => {
        var treeData = res.data.rows.dataEntityList;
        this.defaultTree = treeData;
      });
      var arr = this.roleArr.split(",");
      for (let index = 0; index < arr.length; index++) {
        var roleId = arr[index] || "";
        if (roleId.length == 0) {
          continue;
        }
        const element = {
          roleId: roleId,
        };
        element.treeData = [];
        element.arr = [];
        element.treeData = this.defaultTree;
        var userData = {
          userId: this.formName.userId,
          roleId: arr[index],
        };

        await queryUserDataAuth(userData).then((res) => {
          var arr = res.data;
          element.arr = arr;
        });
        this.targetArr.push(element);
      }
    },
    // 添加角色
    addRoles() {
      this.targetArr.push({
        oldRoleId: "",
        treeData: this.defaultTree,
        arr: [],
        Edit: "1", //区分页面跳转过来的还是新增的默认权限
      });
    },
    //新增时候角色改变对应的默认权限
    hold(item, index) {
      this.nEw = true;
      this.falg1 = true;
      //如果是新增就调用默认的权限接口
      for (let i = 0; i < this.targetArr.length; i++) {
        if (this.targetArr[i].Edit) {
          let data = {
            userId: this.formName.userId,
            roleId: this.targetArr[i].roleId,
          };
          defaultRoleAuth(data).then((res) => {
            this.$set(this.targetArr[i], "arr", []);
            this.defaultArr = res.data;
            this.$refs.tree[i].setCheckedKeys(res.data);
          });
        }
      }
    },
    // 删除角色
    deleRoles(role, index) {
      var roleName = "";
      for (let index = 0; index < this.checkboxWrap.length; index++) {
        var item = this.checkboxWrap[index];
        if (item.roleId == role.roleId) {
          roleName = item.roleName;
          break;
        }
      }
      this.$modal
        .confirm(
          '确认要删除"' + this.formName.xm + '"的"' + roleName + '"角色吗？'
        )
        .then(() => {
          if (role.Edit == "1") {
            this.targetArr.splice(index, 1);
          } else {
            var param = {
              userId: this.formName.userId,
              roleId: role.roleId,
            };
            deleteRole(param)
              .then(() => {
                this.targetArr.splice(index, 1);
                this.$refs.tree[index].setCheckedKeys(
                  this.targetArr[index].arr
                );
              })
              .catch(() => {});
          }
        })
        .catch(function () {});
    },
    currentChecked(nodeObj, SelectedObj, index) {
      this.isDeafult = true;
    },
    getTreeAll(tree) {
      let arr = [];
      if (!!tree && tree.length !== 0) {
        tree.forEach((item) => {
          for (let index in tree) {
            if (item.pycc == tree[index].modId) {
              return false;
            }
          }
          arr.push(item);
        });
      }
      return arr;
    },
    handleDataAuth(role, index) {
      var nodes = this.$refs.tree[index].getCheckedNodes() || [];
      var tar = this.getTreeAll(nodes);
      var resultArr = tar.map((item) => item.modId);
      if (this.isDeafult == false) {
        if (this.nEw == true) {
          var param = {
            userId: this.formName.userId,
            newRoleId: role.roleId,
            dataList: resultArr,
            operateRoleId: this.$store.getters.roleId,
          };
        } else {
          var param = {
            userId: this.formName.userId,
            newRoleId: role.roleId,
            dataList: resultArr,
            operateRoleId: this.$store.getters.roleId,
          };
        }
      } else {
        var param = {
          userId: this.formName.userId,
          newRoleId: role.roleId,
          dataList: resultArr,
          operateRoleId: this.$store.getters.roleId,
        };
      }
      updateDataAuth(param)
        .then((res) => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.permissions {
  .elForm {
    background: #fff;
    padding: 20px;
  }

  .roleWrap {
    background: #fff;
    margin-top: 20px;

    padding: 20px;
    padding-bottom: 80px;
    display: flex;
    align-items: center;
    .roleStyle {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      color: #1f1f1f;
      .name {
        margin-right: 20px;
        font-weight: 600;
      }
      .treeStyle {
        font-weight: 400;
        margin-left: 30px;
      }
    }
    .deleIcon {
      margin-left: 30px;
      cursor: pointer;
      i {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        background: url("~@/assets/images/detelIcon.png");
      }
    }
  }

  .elFormSelect {
    ::v-deep .el-tag {
      &:nth-child(1) {
        width: 120px;
      }
    }
  }
  .editBtn {
    padding: 0 10px;
    margin-left: 20px;
    border: 1px solid #005657;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    cursor: pointer;
    line-height: 32px;
    .addIcon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url("~@/assets/images/addicon.png") no-repeat center;
      vertical-align: middle;
    }
  }
  .editBottom {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 -2px 6px -1px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  // .btn {
  //   width: 84px;
  //   height: 36px;
  //   line-height: 36px;
  //   text-align: center;
  //   cursor: pointer;
  //   border: 1px solid #005657;
  //   border-radius: 2px;
  //   margin-right: 20px;

  //   .icon {
  //     display: inline-block;
  //     width: 20px;
  //     height: 20px;
  //     vertical-align: middle;
  //     margin-right: 5px;
  //   }

  //   .noIcon {
  //     background: url("~@/assets/images/no.png");
  //   }

  // }

  .btn {
    width: 84px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #005657;
    border-radius: 2px;
    margin-left: 20px;
  }
  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .yesIcon {
    background: url("~@/assets/images/yesW.png");
  }

  .cancel {
    color: #005657;
  }

  .confirm {
    background: #005657;
    color: #fff;
  }
}
</style>
