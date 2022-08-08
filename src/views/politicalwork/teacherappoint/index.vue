<template>
  <div class="StudentSysIndex">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="在岗" name="first">
        <span slot="label"><i class="icon tabsicon_on" />在岗</span>
      </el-tab-pane>
      <el-tab-pane label="不在岗" name="second">
        <span slot="label"><i class="icon tabsicon_off" />不在岗</span>
      </el-tab-pane>
    </el-tabs>
    <OnDuty v-if="activeName == 'first'" />
    <OffDuty v-if="activeName == 'second'" />
  </div>
</template>

<script>
import OnDuty from './onDuty/index.vue'
import OffDuty from './offDuty/index.vue'
export default {
  name: 'AssistantAppoint',
  components: { OnDuty, OffDuty },
  data() {
    return {
      activeName: 'first'
    }
  },

  mounted() {

  },

  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
    }
  }
}
</script>

<style lang="scss" scoped>
.StudentSysIndex{
  padding:20px;
  // background: #fff;
  .tabs{
    background: #fff;
    padding-left: 20px;
    .icon{
      display: inline-block;
      width:20px;
      height: 20px;
      margin-right: 8px;
    }
    .tabsicon_on{
      background: url('../../../assets/images/icon_onDuty.png');
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_off{
      background: url('../../../assets/images/icon_offDuty.png');
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
  }
}
</style>
