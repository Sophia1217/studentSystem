<template>
  <div class="dicDialog">
    <el-dialog
      :title="rowId ? '编辑字典标签' : '新增字典标签'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleCloseDia"
    >
      <el-form
        :model="rowId"
        ref="rowId"
        class="queryForm"
        size="small"
        label-width="68px"
      >
        <el-form-item label="字典名称" prop="codeTableChinese">
          <el-input
            v-model="rowId.codeTableChinese"
            size="small"
            :disabled="true"
            placeholder="请输入字典名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典标签" prop="codeKey">
          <el-input
            v-model="rowId.codeKey"
            size="small"
            placeholder="请输入字典类型"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典值" prop="codeValue">
          <el-input
            v-model="rowId.codeValue"
            size="small"
            placeholder="请输入字典值"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典状态" prop="state">
          <el-switch
            v-model="rowId.state"
            active-color="#23AD6F"
            inactive-color="#E0E0E0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="remark"
            :rows="2"
            placeholder="请输入内容"
            v-model="rowId.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDia">取 消</el-button>
        <el-button type="primary" @click="handleCommitDia">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dicDialog",

  data() {
    return {
      queryParams: {
        codeTableChinese: "",
        state: "",
        codeKey: "",
        codeValue: "",
        remark: "",
      },
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    rowId: {
      // id存在是编辑否则是新建
      type: Object,
      default: () => {},
    },
  },
  mounted() {},

  methods: {
    handleCloseDia() {
      this.$emit("handleCloseDia");
    },
    handleCommitDia() {
      this.$emit("handleCommitDia", this.rowId);
    },
  },
};
</script>

<style lang="scss" scoped>
.dicDialog {
}
</style>
