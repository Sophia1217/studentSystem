<template>
  <div>
    <el-steps class="steps" :active="active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="提交修改" ></el-step>
      <el-step title="辅导员审核" ></el-step>
      <el-step title="审核完成" ></el-step>
    </el-steps>
    <div v-if="active == 1">提交修改</div>
    <div v-if="active == 2">
      <detail></detail>
    </div>
    <div v-if="active == 3">审核完成</div>
  </div>
</template>

<script>
import detail from '../detail/index.vue'
export default {
  name: 'StudentsystemIndex',
  components:{ detail},
  data() {
    return {
      active:2
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.steps{
  background: #fff;
}
</style>