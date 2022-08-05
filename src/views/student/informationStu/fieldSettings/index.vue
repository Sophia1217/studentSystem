<template>
  <div class="auditStu">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="学生" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>学生</span>
      </el-tab-pane>
      <el-tab-pane label="审核人员" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>审核人员</span>
      </el-tab-pane>
    </el-tabs>
    <studentSeting v-if="activeName == 'first'"></studentSeting>
    <teacherSeting v-if="activeName == 'second'"></teacherSeting>
  </div>
</template>

<script>
import studentSeting from './studentSeting'
import teacherSeting from './teacherSeting'
export default {
  name: 'auditStu',
  components:{studentSeting,teacherSeting},
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
  padding:20px;
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
      background: url('~@/assets/images/people.png');
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_quan{
      background: url('~@/assets/images/teacher.png');
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
  }
}
</style>