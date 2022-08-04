<template>
  <div>
    <el-dialog title="导出" :visible.sync="showExport" width="50%" :before-close="handleCancel">
      <div class="dialogBody">
        <el-transfer v-model="value" :data="data" :titles="titles"></el-transfer>
        <div class="mt20">
          <el-radio-group v-model="radio">
            <el-radio :label="1">EXCEL表格</el-radio>
            <el-radio :label="2">DBF文件</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'exportView',

  data() {
    return {
      data: [
        { key: 1, label: '学号' },
        { key: 2, label: '性别' },
        { key: 3, label: '年级' },
        { key: 4, label: '学院代码' },
      ],
      titles:['待选择字段', '已选择字段'],
      value: [1],
      radio:1
    };
  },
  props: {
    showExport: {
      type: Boolean,
      default:false
    }
  },

  mounted() {
    console.log(this.showExport)
  },

  methods: {
    handleCancel() {
      this.$emit('handleCancel')
    },
    handleConfirm() {
      this.$emit('handleConfirm')
    }
  },
};
</script>

<style lang="scss" scoped>
.dialogBody{
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 15px;
}
.mt20{
  margin-top: 20px;
}
</style>