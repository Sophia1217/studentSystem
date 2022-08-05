<template>
  <div class="forcedEdit">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="强制修改名单" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>强制修改名单</span>
      </el-tab-pane>
      <el-tab-pane label="学生名单" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>学生名单</span>
      </el-tab-pane>
    </el-tabs>
    <modifyList v-if="activeName == 'first'"></modifyList>
    <allList v-if="activeName == 'second'" @changeActiveName="changeActiveName"></allList>
  </div>
</template>

<script>
import ModifyList from "./modifyList/index.vue"
import AllList from "./allList/index.vue"
export default {
  name: 'forcedEdit',
  components:{ModifyList, AllList },
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
    },
    changeActiveName() {
      this.activeName = 'first'
     }
  }
};
</script>

<style lang="scss" scoped>
.forcedEdit{
  padding:20px;
  .tabs{
    .icon{
      display: inline-block;
      width:20px;
      height: 20px;
      margin-right: 8px;
    }
    .tabsicon_ke{
      background: url('~@/assets/images/people.png');
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_quan{
      background: url('~@/assets/images/icon_quan.png');
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
  }
}
</style>