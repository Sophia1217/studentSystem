<template>
  <div class="exportView">
    <el-dialog
      title="导出"
      :visible.sync="showExport"
      width="800px"
      :before-close="handleCancel"
    >
      <div class="dialogBody">
        <el-transfer
          class="transfer"
          v-model="transferVal"
          :props="{ key: 'id', label: 'dicCloumnChinese' }"
          :data="transferData"
          :titles="titles"
        ></el-transfer>
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
import { exportQuery, exportStu } from "@/api/student/index";
export default {
  name: "exportView",

  data() {
    return {
      transferData: [
        // { key: 1, label: '学号' }
      ],
      titles: ["待选择字段", "已选择字段"],
      transferVal: [],
      radio: 1,
    };
  },
  props: {
    showExport: {
      type: Boolean,
      default: false,
    },
    multipleSelection: {
      type: Array,
      default: () => [],
    },
    tag: {
      type: String | Number,
      default: "",
    },
  },

  mounted() {
    this.getExportQuery();
  },

  methods: {
    getExportQuery() {
      exportQuery()
        .then((res) => {
          // console.log(res)
          this.transferData = res.data;
        })
        .catch((err) => {});
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleConfirm() {
      let hxList = [];
      let columnInfoList = [];
      for (let x = 0; x < this.multipleSelection.length; x++) {
        hxList.push(this.multipleSelection[x].xh);
      }
      if (this.transferVal.length > 0) {
        for (let i = 0; i < this.transferData.length; i++) {
          for (let y = 0; y < this.transferVal.length; y++) {
            if (this.transferVal[y] == this.transferData[i].id) {
              columnInfoList.push(this.transferData[i]);
            }
          }
        }
      } else {
        this.$message("请选择导出字段");
        return;
      }
      let data = {
        hxList: hxList,
        columnInfoList: columnInfoList,
        exportStyle: "EXCEL",
      };
      exportStu(data).then((res) => {
        if (this.tag == 1) {
          this.downloadFn(res, "在籍学生信息导出", "xlsx");
        } else {
          this.downloadFn(res, "毕业学生信息导出", "xlsx");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialogBody {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
}
.mt20 {
  margin-top: 20px;
}
.exportView {
  ::v-deep .el-transfer-panel {
    width: 280px;
  }
  .transfer {
    ::v-deep .el-transfer-panel__list {
      height: auto;
      .el-transfer-panel__item {
        width: 96px;
      }
    }
    ::v-deep .el-transfer-panel__list {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
