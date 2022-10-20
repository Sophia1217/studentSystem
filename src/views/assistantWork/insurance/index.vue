<template>
  <div class="talk">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="学平险查询" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>学平险查询</span>
      </el-tab-pane>
      <el-tab-pane label="保险信息维护" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>保险信息维护</span>
      </el-tab-pane>
    </el-tabs>
    <query v-if="activeName == 'first'"></query>
    <maintain v-if="activeName == 'second'"></maintain>
  </div>
</template>

<script>
import query from "./query/index.vue";
import maintain from "./maintain/index.vue";
export default {
  name: "insurance",
  components: { query, maintain },
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
      background: url("../../../assets/images/icon_ke.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_quan {
      background: url("../../../assets/images/icon_quan.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
  }
}
</style>
