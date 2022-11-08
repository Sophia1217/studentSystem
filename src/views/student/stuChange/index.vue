<template>
  <div class="manStudent">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="未确认异动" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>未确认异动</span>
      </el-tab-pane>
      <el-tab-pane label="已确认异动" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>已确认异动</span>
      </el-tab-pane>
    </el-tabs>
    <change-confirm v-if="activeName == 'first'"></change-confirm>
    <change-list v-if="activeName == 'second'"></change-list>
  </div>
</template>

<script>
import changeConfirm from "./changeConfirm/index.vue";
import changeList from "./changeList/index.vue";
export default {
  name: "stuChange",
  components: { changeConfirm, changeList },
  data() {
    return {
      activeName: "first",
      isMore: false,
    };
  },

  mounted() {},

  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.isMore = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.manStudent {
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
      background: url("../../../assets/images/icon_unconfirm.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_quan {
      background: url("../../../assets/images/icon_ke.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
  }
}
</style>
