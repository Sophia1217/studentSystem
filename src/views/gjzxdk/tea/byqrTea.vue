<template>
  <div class="talk">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>待确认</span>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>已确认</span>
      </el-tab-pane>
    </el-tabs>
    <processed v-if="activeName == 'first'"></processed>
    <dealWith v-if="activeName == 'second'"></dealWith>
  </div>
</template>

<script>
import processed from "./listDqr.vue";
import dealWith from "./listYqr.vue";
export default {
  name: "insurance",
  components: { processed, dealWith },
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
      background: url("../../../assets/images/icon_warning.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_quan {
      background: url("../../../assets/images/icon_confirm.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
  }
}
</style>
