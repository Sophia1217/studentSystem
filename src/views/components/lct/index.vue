<template>
  <div>
    <el-dialog
      title="流程图"
      :visible.sync="lctModal"
      :before-close="close"
      width="40%"
    >
      <div>
        <el-image :src="url" v-if="url" lazy
          ><div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div></el-image
        >
        <el-table :data="tableLct">
          <el-table-column prop="userId" label="操作人" sortable="custom">
          </el-table-column>
          <el-table-column prop="opTime" label="操作时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="nodeName" label="操作节点" sortable="custom">
          </el-table-column>
          <el-table-column prop="opType" label="操作类型" sortable="custom">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.opType"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in czlx"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="msg" label="审核意见" sortable="custom">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="confirm" @click="handleCloseDia"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { lct, lctTable } from "@/api/stuDangan/detailList/xiaoneiwai";
export default {
  name: "lctCom",

  data() {
    return {
      url: "",
      tableLct: [],
      czlx: [],
    };
  },
  props: {
    lctModal: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.getCode("dmshrzlx");
  },

  methods: {
    close() {
      this.$emit("handleCloseLct");
    },
    inner(val) {
      var processInstanceId = val;
      lct({ processInstanceId }).then((res) => {
        this.url = window.URL.createObjectURL(res);
      });
      lctTable({ processInstanceId }).then((res) => {
        this.tableLct = res.data;
      });
    },
    handleCloseDia() {
      this.$emit("handleCloseLct");
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmshrzlx":
            this.czlx = res.data;
            break;
        }
      });
    },
  },
};
</script>
