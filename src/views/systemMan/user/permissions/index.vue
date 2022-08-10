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
        <el-select v-model="formName.roleId" multiple collapse-tags size="small" placeholder="请选择">
          <el-option
            v-for="item in checkboxWrap"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据范围">
        <el-select v-model="formUser.value" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-cascader
          class="marl10"
          size="small"
          v-model="formUser.value"
          :options="cascaderOptions"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
import { queryDataAuth } from "@/api/systemMan/user"
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
      formUser: {},
      checkboxWrap:[], //用户角色
      options: [],
      cascaderOptions: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }
      ]
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
        "userId": "2005690002",
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

    handleChange(value) {
      console.log(value);
    }
  },
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
}
</style>