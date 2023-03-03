<template>
  <div class="talk">
    <topTitle :routeTitle="routeTitle"></topTitle>
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="可申请岗位" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>可申请岗位</span>
      </el-tab-pane>
      <el-tab-pane label="已申请岗位" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>已申请岗位</span>
      </el-tab-pane>
    </el-tabs>
    <processed v-if="activeName == 'first'"></processed>
    <dealWith v-if="activeName == 'second'"></dealWith>
  </div>
</template>

<script>
import dealWith from "./applied.vue";
import processed from "./unapply.vue";
import topTitle from "../../components/topTitle";
export default {
  name: "insurance",
  components: { processed, dealWith, topTitle },
  data() {
    return {
      activeName: "first",
      routeTitle: "",
    };
  },

  mounted() {
    this.routeTitle = this.$route.meta.title;
  },

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
