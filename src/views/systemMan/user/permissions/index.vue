<template>
  <div class="permissions">
    <el-form class="elForm" :inline="true" :model="formName">
      <el-form-item label="用 户 名">
        <el-input size="small" :disabled="true" v-model="formName.xm" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="学 工 号">
        <el-input size="small" :disabled="true" v-model="formName.userId" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>

    <el-form class="mart20" :inline="true" :model="formUser">
      <div class="elForm mart20" v-for="(role,index) in roleData" :key="index">
        <el-form-item label="用户角色">
          <el-select v-model="role.roleId" class="elFormSelect" size="small" placeholder="请选择">
            <el-option
              v-for="item in checkboxWrap"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据范围" style="margin-left:20px;">
          <el-tree style="min-width:200px;"
            :data="role.cascaderOptions"
            :ref="index"
            v-model="role.treeVal"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span @click="() => append(data)">{{ node.label }}</span>
            </span>
          </el-tree>
        </el-form-item>
      </div>
    </el-form>

    <div class="editBottom">
      <div class="btn cancel" @click="handleCencal"><i class="icon noIcon"></i> 取消</div>
      <div class="btn confirm" @click="handleDataAuth">
        <i class="icon yesIcon"></i> 提交
      </div>
    </div>
  </div>
</template>

<script>
import { queryDataAuth, queryClassList,queryStuList,updateDataAuth } from "@/api/systemMan/user"
import { queryRoleList } from "@/api/systemMan/role"
export default {
  name: 'permissions',
  data() {
    return {
      formName: {
        xm: '',
        userId: '',
        roleId:''
      },
      formUser: {
        dataAuth: [], // 学院
        classList: [], // 班级
        studList:[] // 人
      },
      checkboxWrap:[], //用户角色
      classListOps: [], // 班级数据
      stuListOps:[], // 学生数据
      cascaderOptions: [], // 学院数据
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      roleData: []
    }
  },

  mounted() {
    this.getqueryRoleList()
    this.getQueryDataAuth()
    this.formName = this.$route.query
    if (this.formName.roleId.length > 0) {
      this.formName.roleId = this.formName.roleId.split(',')
        for (let x = 0; x < this.formName.roleId.length; x++) {
        this.roleData.push({
          roleId: this.formName.roleId[x],
          treeVal: '',
          cascaderOptions: this.cascaderOptions
        })
      }
    }
    console.log(this.roleData)
  },

  methods: {
     // 获取用户角色
    getqueryRoleList() {
      let data = { roleId: '01' }
      queryRoleList(data).then(res => {
        this.checkboxWrap = res.data.rows
      }).catch(res => { })
    },
    // 获取学院数据
    getQueryDataAuth() {
      let data = {
        "userId": "2005690002",
        "roleId": "01"
      }
      queryDataAuth(data).then(res => {
      let data = res.data.rows
      for (let x = 0; x < data.length; x++){
        data[x].id = data[x].dwdm
        data[x].label = data[x].dwmc
      }
      this.cascaderOptions = data
      }).catch(err => {})
    },

    //数据范围树添加 
    append(data) {
      console.log(data)
      if (data.visitId == 0) {
        this.handleClassList(data.id)
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children = this.classListOps
      } else if (data.visitId == 1) {
        this.handleStuList(data.id)
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children = this.stuListOps
      }
    },
   
    // 获取班级数据
    handleClassList(value) {
      let data = { ssdwdm: value }
      queryClassList(data).then(res => {
        let data = res.BjList
        for (let x = 0; x < data.length; x++){
          data[x].id = data[x].bjdm
          data[x].label = data[x].bjmc
        }
        this.classListOps = res.BjList
      }).catch(err=>{})
    },
    // 获取学生数据
    handleStuList(value) {
      let data = { bjdm: value }
      queryStuList(data).then(res => {
        let data = res.Data
        for (let x = 0; x < data.length; x++){
          data[x].id = data[x].xh
          data[x].label = data[x].xm
        }
        this.stuListOps = data
      }).catch(err => {})
    },
    // 取消
    handleCencal() {
      this.$router.push({
        path: '/systems/user'
      })
    },
    
    // 更新数据权限
    handleDataAuth() {
      // let nodes = this.$refs.tree.getCheckedNodes()
      // let dataList = []
      // for (let x = 0; x < nodes.length; x++) {
      //   if (nodes[x].visitId == 0) {
      //     dataList.push({
      //       orginazationCode: nodes[x].dwdm
      //     })
      //   } else if (nodes[x].visitId == 1) {
      //     dataList.push({
      //       classNo: nodes[x].bjdm
      //     })
      //   } else if (nodes[x].visitId == 2) {
      //     dataList.push({
      //       stuId: nodes[x].xh
      //     })
      //   }
      // }
      // let data = {
      //   userId: this.formName.userId,
      //   roleId: this.formName.roleId,
      //   dataList: dataList
      // }
      console.log(this.roleData)
      return
      updateDataAuth(data).then(res => {
        console.log(res)
      }).catch(err=>{})
    }
  }
};
</script>

<style lang="scss" scoped>
.permissions{
  .mart20{
    margin-top: 20px;
  }
  .marl10{
    margin-left: 10px;
  }
  .elForm{
    background: #fff;
    padding:20px;
  }
  .elFormSelect{
    ::v-deep .el-tag{
      &:nth-child(1){
        width:120px;
      }
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
  }
}
</style>