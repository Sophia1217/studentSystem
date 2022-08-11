<template>
  <div class="modal">
    <el-dialog
      :title="queryParams ? '编辑字典标签' : '新增字典标签'"
      :visible.sync="dialogVisibleAdd"
      width="30%"
      :before-close="handleCloseDia1"
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
            v-model="queryParams.codeTableChinese"
            size="small"
            placeholder="请输入字典名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典标签" prop="codeKey">
          <el-input
            v-model="queryParams.codeKey"
            size="small"
            placeholder="请输入字典类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典状态" prop="state">
          <el-switch
            v-model="queryParams.state"
            active-color="#23AD6F"
            inactive-color="#E0E0E0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="remark"
            :rows="2"
            placeholder="请输入内容"
            v-model="queryParams.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDia1">取 消</el-button>
        <el-button type="primary" @click="handleCommitDia1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "modal",

  data() {
    return {
      queryParams: {
        codeTableChinese: "",
        state: "",
        codeKey: "",
        remark: "",
      },
    };
  },
  props: {
    dialogVisibleAdd: {
      type: Boolean,
      default: false,
    },
    codeTableEnglish: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleCloseDia1() {
      this.$emit("handleCloseDia");
    },
    handleCommitDia1() {
      this.$emit("handleCommitDia", this.queryParams);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
}
</style>
