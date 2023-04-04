<template>
  <div class="talk">
    <topTitle :routeTitle="routeTitle"></topTitle>
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="活动申请" name="0">
        <span slot="label"
          ><i class="icon tabsicon_ke"></i>活动申请</span
        ></el-tab-pane
      >
      <el-tab-pane label="活动确认" name="1">
        <span slot="label"
          ><i class="icon tabsicon_quan"></i>活动确认</span
        ></el-tab-pane
      >
    </el-tabs>

    <apply v-if="activeName == '0'"></apply>

    <classSet v-if="activeName == '1'"></classSet>
  </div>
</template>
<script>
import apply from "./apply/list.vue";
import classSet from "./classSet/index.vue";
import topTitle from "../../components/topTitle";
export default {
  components: {
    apply,
    classSet,
    topTitle,
  },
  data() {
    return {
      activeName: "0",
      routeTitle: "",
    };
  },
  mounted() {
    this.routeTitle = this.$route.meta.title;
  },
};
</script>
<style lang="scss" scoped>
.six {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url("~@/assets/images/sixsix.png") no-repeat center;
  vertical-align: middle;
}
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
