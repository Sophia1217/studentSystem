<template>
  <div class="permissions">
    <el-form class="elForm" :inline="true" :model="formName">
      <el-form-item label="用 户 名">
        <el-input size="small" :disabled="true" v-model="formName.xm" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="学 工 号">
        <el-input size="small" :disabled="true" v-model="formName.userId" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="editBtn" @click="addRoles"><i class="addIcon"></i> 新增用户角色</div>
      </el-form-item>
    </el-form>

    <div class="roleWrap" v-for="(role, index) in roleData" :key="index">
      <div class="roleStyle">
        <div class="name">用户角色</div>
        <div>
          <el-select v-model="role.roleId" class="elFormSelect" size="small" placeholder="请选择">
            <el-option v-for="item in checkboxWrap" :key="item.roleId" :label="item.roleName" :value="item.roleId">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="roleStyle">
        <el-tree style="min-width: 200px" class="treeStyle" :data="role.cascaderOptions" @check-change="handleCheckChange"
          ref="tree" :id="index" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span @click="() => append(data,index)">{{node.label}}</span>
          </span>
        </el-tree>
      </div>
      
      <div class="deleIcon" @click="deleRoles(index)"><i></i></div>
    </div>

    <div class="editBottom">
      <div class="btn cancel" @click="handleCencal">
        <i class="icon noIcon"></i> 取消
      </div>
      <div class="btn confirm" @click="handleDataAuth">
        <i class="icon yesIcon"></i> 提交
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryDataAuth,
  queryClassList,
  queryStuList,
  updateDataAuth,
} from "@/api/systemMan/user";
import { queryRoleList } from "@/api/systemMan/role";
export default {
  name: "permissions",
  data() {
    return {
      formName: {
        xm: "",
        userId: "",
        roleId: "",
      },
      checkboxWrap: [], //用户角色下拉
      
      cascaderOptions: [], // 学院数据
      classListOps: [], // 班级数据
      stuListOps: [], // 学生数据
      defaultProps: {
        children: "children",
        label: "label",
      },
      roleData: [], // 用户分组
    };
  },

  mounted() {
    this.formName = this.$route.query;
    this.getqueryRoleList()
    this.getQueryDataAuth()
  },

  methods: {
    // 获取用户角色
    getqueryRoleList() {
      let data = { roleId: "01" };
      queryRoleList(data).then((res) => {
          this.checkboxWrap = res.data.rows;
        }).catch((res) => { });
    },
    // 添加角色
    addRoles() {
      this.roleData.push({
        roleId: '',
        cascaderOptions: this.cascaderOptions
      })
    },
    // 删除角色
    deleRoles(index) {
      this.roleData.splice(index, 1)
    },
    // 初始化进入
    initData(data) {
      if (this.formName.roleId&&this.formName.roleId.length > 0) {
        console.log(1)
        this.formName.roleId = this.formName.roleId.split(",");
        for (let x = 0; x < this.formName.roleId.length; x++) {
          this.roleData.push({
            roleId: this.formName.roleId[x],
            cascaderOptions: data
          })
        }
      } else {
        this.roleData.push({
          roleId: '',
          cascaderOptions: data
        })
      }
    },
    // 获取学院数据
    getQueryDataAuth() {
      let data = { userId: "2005690002", roleId: "01" };
      queryDataAuth(data)
        .then((res) => {
          let data = res.data.rows;
          for (let x = 0; x < data.length; x++) {
            data[x].id = data[x].dwdm;
            data[x].label = data[x].dwmc;
          }
          this.cascaderOptions = data;
          this.initData(this.cascaderOptions)
        })
        .catch((err) => { });
    },

    //数据范围树添加
    append(data, index) {
      // console.log(data)
      if (data.visitId == 0) {
        this.handleClassList(data.dwdm,data, index)
      } else if (data.visitId == 1) {
        this.handleStuList(data.bjdm,data, index)
        
      }
    },

    // 获取班级数据
    handleClassList(value,nodeData,index) {
      let data = { ssdwdm: value };
      queryClassList(data)
        .then((res) => {
          let rowData = res.rows;
          for (let x = 0; x < rowData.length; x++) {
            rowData[x].label = rowData[x].bjmc;
          }
          this.classListOps = rowData
          // 下面是树添加子节点
          if (!nodeData.children) {
            this.$set(nodeData, "children", []);
          }
          // console.log(this.classListOps,'this.classListOps')
          if (this.classListOps.length > 0) {
            let newChildren = []
            for (const item of this.classListOps) {
              newChildren.push({...item, id: 'c-'+index+'-0-'+item.bjdm})
            }
            nodeData.children = newChildren;
          }
        })
        .catch((err) => { });
    },
    // 获取学生数据
    handleStuList(value,nodeData,index) {
      let data = { bjdm: value };
      queryStuList(data)
        .then((res) => {
          let data = res.Data;
          for (let x = 0; x < data.length; x++) {
            data[x].label = data[x].xm;
          }
          this.stuListOps = data;

          // 下面是树添加子节点
          if (!nodeData.children) {
            this.$set(nodeData, "children", []);
          }
          let newChildren = []
          for (const item of this.stuListOps) {
            newChildren.push({...item, id: 's-'+index+'-1-'+item.xh})
          }
          nodeData.children = newChildren;
        })
        .catch((err) => { });
    },
    // 取消
    handleCencal() {
      this.$router.push({
        path: "/systems/user",
      });
    },
    handleCheckChange(data, checked) {
      console.log(data, checked)
    },

    // 更新数据权限
    handleDataAuth() {
      console.log(this.roleData)
      let data = {
        userId: this.formName.userId,
        roleId: "01",
        dataList: [
          { orginazationCode: 1234, classNo: "", stuId: "" },
          { orginazationCode: 1235, classNo: "", stuId: "" }
        ]
      }
      return;
      updateDataAuth(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => { });
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
    display: flex;
    align-items: center;
    .roleStyle {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      color: #1F1F1F;
      .name {
        margin-right: 20px;
        font-weight: 600;
      }
      .treeStyle{
        font-weight: 400;
        margin-left: 30px;
      }
    }
    .deleIcon{
      margin-left: 30px;
      cursor:pointer;
      i{
        display: inline-block;
        vertical-align: middle;
        width:20px;
        height: 20px;
        background: url('~@/assets/images/detelIcon.png');
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
  .editBtn{
    padding:0 10px;
    margin-left: 20px;
    border: 1px solid #005657;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    cursor: pointer;
    line-height: 32px;
    .addIcon{
      display: inline-block;
      width:15px;
      height: 15px;
      background: url('~@/assets/images/addicon.png') no-repeat center;
      vertical-align: middle;
    }
  }
  .editBottom {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1),
      0 -2px 6px -1px rgba(0, 0, 0, 0.2);
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
  }
}
</style>