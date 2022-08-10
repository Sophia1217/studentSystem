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
        <el-form-item label="字典名称" prop="roleName">
          <el-input
            v-model="queryParams.codeTableEnglish"
            size="small"
            placeholder="请输入字典名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典类型" prop="roleDic">
          <el-input
            v-model="queryParams.codeTableChinese"
            size="small"
            placeholder="请输入字典类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典状态" prop="roleState">
          <el-switch
            v-model="queryParams.state"
            active-color="#23AD6F"
            inactive-color="#E0E0E0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="textarea">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="queryParams.remark"
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
      type: String | Number,
      default: "",
    },
  },
  mounted() {
    console.log(this.rowId);
  },

  methods: {
    handleCloseDia() {
      this.$emit("handleCloseDia");
    },
    handleCommitDia() {
      this.$emit("handleCommitDia", this.queryParams);
    },
  },
};
</script>

<style lang="scss" scoped>
.dicDialog {
}
</style>
