<template>
  <div class="permissions">
    <el-form class="elForm" :inline="true" :model="formName">
      <el-form-item label="用 户 名">
        <el-input size="small" :disabled="true" v-model="formName.userName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="学 工 号">
        <el-input size="small" :disabled="true" v-model="formName.userCode" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>

    <el-form class="elForm mart20" :inline="true" :model="formUser">
      <el-form-item label="用户角色">
        <el-input size="small" v-model="formUser.userName" placeholder="请输入"></el-input>
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
export default {
  name: 'permissions',

  data() {
    return {
      formName: {
        userName: '',
        userCode:''
      },
      formUser:{},
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
    
  },

  methods: {
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