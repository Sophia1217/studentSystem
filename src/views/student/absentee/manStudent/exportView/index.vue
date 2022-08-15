<template>
  <div class="exportView">
    <el-dialog title="导出" :visible.sync="showExport" width="800px" :before-close="handleCancel">
      <div class="dialogBody">
        <el-transfer class="transfer" v-model="value" :data="transferData" :titles="titles"></el-transfer>
        <div class="mt20">
          <el-radio-group v-model="radio">
            <el-radio :label="1">EXCEL表格</el-radio>
            <!-- <el-radio :label="2">DBF文件</el-radio> -->
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
import { exportQuery,exportStu } from "@/api/student/index"
export default {
  name: 'exportView',

  data() {
    return {
      transferData: [
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
    this.getExportQuery()
  },

  methods: {
    getExportQuery() {
      exportQuery().then(res => {
        console.log(res)
        this.transferData = res.data
      }).catch(err=>{})
    },
    handleCancel() {
      this.$emit('handleCancel')
    },
    handleConfirm() {
      let data = {}
      exportStu(data).then(res => {
        console.log(res)
      }).catch(err=>{})
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
.exportView{
  ::v-deep .el-transfer-panel{
    width:280px;
  }
  .transfer{
    ::v-deep .el-transfer-panel__list{
      height: auto;
      .el-transfer-panel__item{
        width:96px;
      }
    }
    ::v-deep .el-transfer-panel__list{
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>