<template>
  <div>
    <el-row :gutter="20" class="checkboxCom">
      <el-checkbox class="elcheckbox" :indeterminate="objProp.isIndeterminate" 
        v-model="objProp.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="objProp.choose" @change="handleCheckedCitiesChange">
        <!-- <el-checkbox v-for="item in objProp.checkBox" :label="item.val" :key="item.val">{{item.label}}</el-checkbox> -->
        <el-col :span="4" v-for="item in objProp.checkBox" :key="item.val">
          <el-checkbox :label="item.val">
              {{ item.label }}
            </el-checkbox>
        </el-col>
        <!-- </el-checkbox> -->
      </el-checkbox-group>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'checkboxCom',

  data() {
    return {
      
    };
  },
  props: {
    objProp: {
      type: Object,
      default: ()=>{},
    }
  },

  mounted() {},

  methods: {
    handleCheckAllChange(val) { 
      this.$emit('training',val)
    },
    handleCheckedCitiesChange(val) {
      this.$emit('checkedTraining',val)
    }
  },
};
</script>

<style lang="scss" scoped>
.checkboxCom{
  display: flex;
  ::v-deep .el-checkbox{
    margin-bottom: 10px !important;
  }
  ::v-deep .el-checkbox-group{
    width: 100%;
  }
}
.elcheckbox{
  margin-right: 20px;
  
}

</style>