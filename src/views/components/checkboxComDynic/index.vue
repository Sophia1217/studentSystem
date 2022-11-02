<template>
  <div>
    <el-row :gutter="20" class="checkboxCom">
      <el-checkbox
        class="elcheckbox"
        :indeterminate="objProp.isIndeterminate"
        v-model="objProp.checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <el-checkbox-group
        v-model="objProp.choose"
        @change="handleCheckedCitiesChange"
      >
        <el-col :span="4" v-for="item in objProp.checkBox" :key="item.dm">
          <el-checkbox :label="item">
            <el-tooltip
              class="item"
              v-if="item.mc && item.mc.length > 7"
              effect="dark"
              :content="item.mc"
              placement="top-start"
            >
              <div class="ellipsis">{{ item.mc }}</div>
            </el-tooltip>
            <div v-else class="ellipsis">{{ item.mc }}</div>
          </el-checkbox>
        </el-col>
      </el-checkbox-group>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "checkboxCom",

  data() {
    return {};
  },
  props: {
    objProp: {
      type: Object,
      default: () => {},
    },
  },

  mounted() {},

  methods: {
    handleCheckAllChange(val) {
      this.$emit("training", val);
    },
    handleCheckedCitiesChange(val) {
      this.$emit("checkedTraining", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkboxCom {
  display: flex;
  ::v-deep .el-checkbox {
    margin-bottom: 10px !important;
    .ellipsis {
      display: inline-block;
      width: 118px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
  }
  ::v-deep .el-checkbox-group {
    width: 100%;
  }
}
.elcheckbox {
  margin-right: 20px;
}
</style>
