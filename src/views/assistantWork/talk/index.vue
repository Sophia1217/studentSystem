<template>
  <div class="talk">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="谈话记录" name="first">
        <span slot="label"><i class="icon tabsicon_ke"></i>谈话记录</span>
      </el-tab-pane>
      <!-- <el-tab-pane label="预约记录" name="second">
        <span slot="label"><i class="icon tabsicon_quan"></i>预约记录</span>
      </el-tab-pane> -->
    </el-tabs>
    <talkRecord v-if="activeName == 'first'"></talkRecord>
    <!-- <orderRecord v-if="activeName == 'second'"></orderRecord> -->
  </div>
</template>

<script>
import talkRecord from "./talkRecord/index.vue";
// import orderRecord from "./orderRecord/index.vue";
export default {
  name: "talk",
  // components: { talkRecord, orderRecord },
  components: { talkRecord },
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
