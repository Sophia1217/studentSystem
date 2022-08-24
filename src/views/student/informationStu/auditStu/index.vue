<template>
  <div class="auditStu">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="待处理" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>待处理</span>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>已处理</span>
      </el-tab-pane>
    </el-tabs>
    <processed v-if="activeName == 'first'"></processed>
    <dealWith v-if="activeName == 'second'"></dealWith>
  </div>
</template>

<script>
import processed from './processed'
import dealWith from './dealWith'
export default {
  name: 'auditStu',
  components:{processed,dealWith},
  data() {
    return {
      activeName: 'first'
    };
  },

  mounted() {
    
  },

  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
    }
  }
};
</script>

<style lang="scss" scoped>
.auditStu{
  padding:20px 0;
  .tabs{
    background: #fff;
    padding-left: 20px;
    .icon{
      display: inline-block;
      width:20px;
      height: 20px;
      margin-right: 8px;
    }
    .tabsicon_ke{
      background: url('~@/assets/images/daichuli.png');
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_quan{
      background: url('~@/assets/images/yichuli.png');
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
  }
}
</style>