<template>
  <div class="addRole">
    <div class="permissions">
      <el-form
        :model="queryParams"
        ref="queryParams"
        class="perName"
        size="small"
        :inline="true"
        label-width="82px"
        :rules="{
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'change' },
          ],
          roleRem: [
            { required: true, message: '请选择权限描述', trigger: 'change' },
          ],
        }"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="queryParams.roleName"
            size="small"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="roleRem">
          <el-input
            v-model="queryParams.roleRem"
            size="small"
            placeholder="请输入权限描述"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="permissions">
      <div class="perName">功能权限</div>
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="modId"
        :props="defaultProps"
        @check="currentChecked"
      >
      </el-tree>
    </div>

    <div class="editBottom">
      <div class="btn cancel" @click="cancel()">
        <i class="icon noIcon"></i> 取消
      </div>
      <div class="btn confirm" @click="sava()">
        <i class="icon yesIcon"></i> 提交
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryTreeList,
  queryTreeListJ,
  savaTreeList,
  savaEditList,
} from "@/api/systemMan/role";
export default {
  data() {
    return {
      modId: "",
      // 查询参数
      queryParams: {
        roleRem: "",
        roleName: this.isEdit == "1" ? "" : this.$route.query.roleNameEdit, // 编辑是2
      },
      treeData: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      isEdit: "",
      savaData: [], //新增提交所需要的menuList
      roleId1: "", ////编辑请求的id,
      arr: [],
      arr1: ["01"],
    };
  },

  async mounted() {
    this.isEdit = this.$route.query.isEdit;
    this.roleId1 = this.$route.query?.UpId;
    this.roleName1 = this.$route.query?.roleNameEdit;
    this.queryParams.roleRem = this.$route.query?.rem;
    await this.handleTree();
  },

  methods: {
    cancel() {
      window.history.go(-1);
    },
    handleTree() {
      if (this.isEdit == 2) {
        let data = { roleId: this.roleId1 };
        let dataALL = { roleId: this.$store.state.user.roleId };
        queryTreeListJ(data)
          .then((res) => {
            var result = res.data;
            this.arr = result;
            // this.getData(result); //
          })
          .catch((err) => {});
        queryTreeList(dataALL)
          .then((res) => {
            this.treeData = res.data;
            this.setkeys();
          })
          .catch((err) => {});
      } else {
        let data = { roleId: this.$store.state.user.roleId };
        queryTreeList(data)
          .then((res) => {
            this.treeData = res.data;
          })
          .catch((err) => {});
      }
    },
    setkeys() {
      this.$refs.tree.setCheckedKeys(this.arr);
    },
    getData(data) {
      for (var i in data) {
        this.arr.push(data[i].modId); //将第一层的保存出来，
        if (data[i].children) {
          // if(data[i].length >)
          this.getData(data[i].children);
        }
      }
      return this.arr;
    },
    //elementUi中自带的方法，可以获取到所有选中的节点
    currentChecked(nodeObj, SelectedObj) {
      var that = this;
      const { checkedNodes, halfCheckedKeys } = SelectedObj;
      var menuList = checkedNodes.map((item) => item.modId);
      that.savaData = menuList.concat(halfCheckedKeys); //要获取上级根节点
    },
    sava() {
      if (this.isEdit === "1") {
        let data = {
          userId: "1234",
          menuList: this.savaData,
          roleName: this.queryParams.roleName,
          loginRoleId: "01",
          roleRem: this.queryParams.roleRem,
        };
        savaTreeList(data)
          .then(() => {
            this.$router.push({
              path: "/systems/role",
            });
          })
          .catch((err) => {});
      } else {
        let data = {
          userId: "412341234",
          menuList: this.savaData.length > 0 ? this.savaData : this.arr, //如果用户进来没编辑，默认前一次筛选出来的树
          roleName: this.queryParams.roleName,
          roleId: this.roleId1,
          roleRem: this.queryParams.roleRem,
        };
        savaEditList(data)
          .then(() => {
            this.$router.push({
              path: "/systems/role",
            });
          })
          .catch((err) => {});
      }
    },
    savaEditList() {},
  },
};
</script>

<style lang="scss" scoped>
.addRole {
  .permissions {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    background: #fff;
    padding: 20px;
    // height: calc(100vh - 250px);
    .perName {
      font-weight: 600;
      font-size: 14px;
      color: #1f1f1f;
      line-height: 28px;
      margin-right: 20px;
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
    .btn {
      width: 84px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #005657;
      border-radius: 2px;
      margin-right: 20px;
      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 5px;
      }
      .noIcon {
        background: url("~@/assets/images/no.png");
      }
      .yesIcon {
        background: url("~@/assets/images/yesW.png");
      }
    }
    .cancel {
      color: #005657;
    }
    .confirm {
      background: #005657;
      color: #fff;
    }
    .shishi {
      width: 10px;
    }
  }
}
</style>
