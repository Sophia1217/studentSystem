<template>
  <div class="talk">
    <topTitle :routeTitle="routeTitle"></topTitle>
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="请假单" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>请假单</span>
      </el-tab-pane>
      <el-tab-pane label="销假单" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>销假单</span>
      </el-tab-pane>
    </el-tabs>
    <apply v-if="activeName == 'first'"></apply>
    <cancel v-if="activeName == 'second'"></cancel>
  </div>
</template>

<script>
import apply from "./apply/index.vue";
import cancel from "./cancel/index.vue";
import topTitle from "../../../components/topTitle";
export default {
  name: "insurance",
  components: { apply, cancel,topTitle },
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
      background: url("~@/assets/images/applyform.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_quan {
      background: url("~@/assets/images/cancelform.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
  }
}
</style>
