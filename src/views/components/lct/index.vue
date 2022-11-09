<template>
  <div>
    <el-dialog title="流程图" :visible.sync="lctModal" width="40%">
      <div>
        <el-image :src="url"
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
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  name: "lctCom",

  data() {
    return {};
  },
  props: {
    url: {
      type: String,
      default: "",
    },
    lctModal: {
      type: Boolean,
      default: false,
    },
    tableLct: {
      type: Array,
      default: [],
    },
  },

  mounted() {
    this.getCode("dmshrzlx"); //性别
  },

  methods: {
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
