<template>
  <div class="dicDialog">
    <el-dialog
      :title="rowId ? '编辑字典' : '新增字典'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleCloseDia"
    >
      <el-form
        :model="queryParams"
        ref="queryParams"
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
        <el-form-item label="字典状态" prop="state">
          <el-switch
            v-model="rowId.state"
            :disabled="true"
            active-color="#23AD6F"
            inactive-color="#E0E0E0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="字典类型" prop=" codeTableEnglish">
          <el-input
            v-model="rowId.codeTableEnglish"
            size="small"
            :disabled="true"
            placeholder="请输入字典类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
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
      state1: [
        {
          value: "0",
          label: "启用",
        },
        {
          value: "1",
          label: "禁用",
        },
      ],
      queryParams: {
        codeTableEnglish: "", //字典类型
        codeTableChinese: "", //字典名称
        state: "", //状态
        remark: "", //备注
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
  mounted() {
  },
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
