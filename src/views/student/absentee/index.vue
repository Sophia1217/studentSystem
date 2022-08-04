<template>
  <div class="StudentSysIndex">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="可管理学生" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>可管理学生</span>
      </el-tab-pane>
      <el-tab-pane label="全校学生查询" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>全校学生查询</span>
      </el-tab-pane>
    </el-tabs>
    <man-student v-if="activeName == 'first'"></man-student>
    <all-student v-if="activeName == 'second'"></all-student>
  </div>
</template>

<script>
import ManStudent from './manStudent/index.vue'
import AllStudent from './allStudent/index.vue'
export default {
  name: 'absentee',    
  components:{ ManStudent, AllStudent },
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
.StudentSysIndex{
  padding:20px;
  // background: #fff;
  .tabs{
    .icon{
      display: inline-block;
      width:20px;
      height: 20px;
      margin-right: 8px;
    }
    .tabsicon_ke{
      background: url('../../../assets/images/icon_ke.png');
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_quan{
      background: url('../../../assets/images/icon_quan.png');
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
  }
}
</style>