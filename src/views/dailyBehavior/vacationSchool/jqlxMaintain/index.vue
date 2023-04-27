<template>
  <div class="talk">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="留校人员" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>留校人员</span>
      </el-tab-pane>
      <el-tab-pane label="离校人员" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>离校人员</span>
      </el-tab-pane>
      <el-tab-pane label="未知状态人员" name="third">
        <span slot="label"><i class="icon tabsicon_quan"></i>未知状态人员</span>
      </el-tab-pane>
    </el-tabs>
    <stay v-if="activeName == 'first'"></stay>
    <leave v-if="activeName == 'second'"></leave>
    <unknown v-if="activeName == 'third'"></unknown>
  </div>
</template>

<script>
import leave from "./leave/index.vue";
import stay from "./stay/index.vue";
import unknown from "./unknown/index.vue";
export default {
  name: "insurance",
  components: { stay, leave, unknown },
  data() {
    return {
      activeName: "first",
    };
  },

  mounted() {},

  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.talk {
  padding: 20px 0;
  background: #fff;
  .tabs {
    background: #fff;
    padding-left: 20px;
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    .tabsicon_ke {
      background: url("~@/assets/images/icon_warning.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_quan {
      background: url("~@/assets/images/icon_confirm.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
  }
}
</style>
