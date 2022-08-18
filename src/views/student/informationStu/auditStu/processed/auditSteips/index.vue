<template>
  <div>
    <el-steps class="steps" :active="active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="提交修改" ></el-step>
      <el-step title="辅导员审核" ></el-step>
      <el-step class="thStyle" v-if="flag == 'th'" title="审核退回"></el-step>
      <el-step v-else title="审核完成"></el-step>
    </el-steps>
    <div v-if="active == 1">提交修改</div>
    <div v-if="active == 2">
      <detail :xh="xh" @parendFn="parendFn"></detail>
    </div>
    <div v-if="active == 3">
      <detail :xh="xh" @parendFn="parendFn"></detail>
    </div>
  </div>
</template>

<script>
import detail from '../detail/index.vue'
export default {
  name: '',
  components:{ detail},
  data() {
    return {
      active: 2,
      xh: '',
      flag: 'tg'// 判断是退回还是通过
    };
  },

  mounted() {
    this.xh = this.$route.query.xh
  },

  methods: {
    parendFn(val) {
      this.flag = val
      this.active = 3
    }
  },
};
</script>

<style lang="scss" scoped>
.steps{
  background: #fff;
  .thStyle{
    color: #ccc;
    ::v-deep .el-step__head.is-success{
      color:#1F1F1F;
      border-color: #1F1F1F;
      background: url('~@/assets/images/thIcon.png');
      width:20px;
      height: 20px;
    }
    ::v-deep .el-step__icon{
      display: none;
    }
    ::v-deep .el-step__title.is-success{
      color:#1F1F1F;
    }
  }
}
</style>