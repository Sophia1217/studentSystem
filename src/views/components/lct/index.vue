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
        <!-- <el-table :data="tableLct">
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
        </el-table> -->
        <div v-for="(item, i) in tableLct" style="margin-top: 15px">
          <el-row>
            <el-col :span="12" class="yiny">
              <div style="display: flex; height: 50px">
                <div class="hs">审核人</div>
                <div class="bs">{{ item.userName }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="yiny">
              <div style="display: flex; height: 50px">
                <div class="hs">申请时间</div>
                <div class="bs">{{ item.opTime }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="yiny">
              <div style="display: flex; height: 50px">
                <div class="hs">审核结果</div>
                <div class="bs">{{ item.opTypeName }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="yiny">
              <div style="display: flex; height: 50px">
                <div class="hs">审核意见</div>
                <div class="bs">{{ item.msg }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
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

<style scoped>
.yiny {
  border: 1px solid grey;
  height: 50px;
  border-collapse: collapse;
}
.hs {
  flex: 0 0 100px;
  border-right: 1px solid grey;
  text-align: center;
  line-height: 50px;
  border-collapse: collapse;
}
.bs {
  padding-left: 40px;
  line-height: 50px;
}
</style>
