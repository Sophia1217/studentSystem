<template>
  <div class="checkboxCom">
    <el-checkbox class="elcheckbox" :indeterminate="objProp.isIndeterminate" 
      v-model="objProp.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="objProp.choose" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="item in objProp.checkBox" :label="item.val" :key="item.val">{{item.label}}</el-checkbox>
    </el-checkbox-group>
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
}
.elcheckbox{
  margin-right: 20px;
}
</style>