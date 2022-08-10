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

    <el-form class="elForm mart20" :inline="true" :model="formUser">
      <el-form-item label="用户角色">
        <el-select v-model="formName.roleId" class="elFormSelect" multiple collapse-tags size="small" placeholder="请选择">
          <el-option
            v-for="item in checkboxWrap"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据范围">
        <el-cascader
          size="small"
          ref="elcascader"
          v-model="formUser.dataAuth"
          :options="cascaderOptions"
          :props="{ expandTrigger: 'click',label:'dwmc',value:'dwdm',children:'children', multiple: true, checkStrictly: true  }"
          @change="handleChange">
        </el-cascader>

        <!-- <el-cascader
          size="small" class="marl10"
          v-model="formUser.classList"
          :options="classListOps"
          :props="{ expandTrigger: 'hover',label:'bjmc',value:'bjdm',children:'children' }"
          @change="handleStuList">
        </el-cascader>

        <el-cascader
          size="small" class="marl10"
          v-model="formUser.studList"
          :options="stuListOps"
          :props="{ expandTrigger: 'hover',label:'xm',value:'xh',children:'children' }"
          >
        </el-cascader> -->

      </el-form-item>
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
      classListOps: [], // 班级
      stuListOps:[], // 学生
      checkboxWrap:[], //用户角色
      cascaderOptions: [] // 学院数据
    }
  },

  mounted() {
    this.formName = this.$route.query
    if (this.formName.roleId.length > 0) {
      this.formName.roleId = this.formName.roleId.split(',')
    }
    this.getqueryRoleList()
    this.getQueryDataAuth()
  },

  methods: {
    getQueryDataAuth() {
      let data = {
        "userId": "2005690002",//操作人
        "roleId": "01"
      }
      queryDataAuth(data).then(res => {
        this.cascaderOptions = res.data.rows
      }).catch(err => {})
    },
    // 获取用户角色
    getqueryRoleList() {
      let data = { roleId: '01' }
      queryRoleList(data).then(res => {
        this.checkboxWrap = res.data.rows
      }).catch(res => { })
    },
    expandChange(val) {
      console.log(val,'val123')
    },
    // 学院下拉框选择班级
    handleChange(value) {
      let downNode = this.$refs.elcascader.getCheckedNodes()
      console.log(downNode)
      return
      console.log(downNode, 'down', value)
      if (downNode.data.visitId == 0) {
        this.getQueryClassList(downNode.data.dwdm)
      }
     
      
    },
    getQueryClassList(value) {
       let data = { ssdwdm: value }
      queryClassList(data).then(res => {
        let resdata = res.BjList
        for (let x = 0; x < resdata.length; x++){
          resdata[x].dwmc = resdata[x].bjmc
          resdata[x].dwdm = resdata[x].bjdm
        }
        for (let i = 0; i < this.cascaderOptions.length; i++){
          if (this.cascaderOptions[i].dwdm == data.ssdwdm) {
            this.$set(this.cascaderOptions[i],'children',resdata)
          }
        }
      }).catch(err=>{})
    },
    // 班级下拉选人
    handleStuList(value) {
      let data = {bjdm: value.join(',')}
      queryStuList(data).then(res => {
        this.stuListOps = res.row
      }).catch(err => {
        
      })
    },
    // 取消
    handleCencal() {
      this.$router.push({
        path: '/systems/user'
      })
    },
    // 更新数据权限
    handleDataAuth() { 
      let data = {
        "userId": this.formName.userId,
        "roleId": this.formName.roleId,
        "dataList": [
          { "orginazationCode": "1234", "classNo": "", "stuId": "" },
          { "orginazationCode": "1235", "classNo": "", "stuId": "" }
        ]
      }
      updateDataAuth(data).then(res => {
        
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