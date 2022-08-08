<!-- 确定提醒消息 -->
<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
    <!--  :before-close="handleClose" -->
    <span
      >是否确认删除空班级？<span style="color: #ed5234"
        >*每次仅支持删除一个班级，且该班级编号为最末尾</span
      ></span
    >
    <span slot="footer" class="dialog-footer">
      <el-button @click="classCancel">取 消</el-button>
      <el-button type="primary" @click="classConfirm" class="confirm"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DeleteClassDouble",
  props: ["title"],
};
</script>

<style>
</style>