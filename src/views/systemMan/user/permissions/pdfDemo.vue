<template>
  <div class="panel-content">
    <el-dialog
      title="预览"
      :visible.sync="viewVisible"
      width="50%"
      height="100%"
      center
    >
      <div class="pdf">
        <pdf
          v-for="currentPage in numPages"
          :key="currentPage"
          :src="pdfsrc"
          :page="currentPage"
          @loaded="loadPdfHandler"
        ></pdf>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  name: "TEMPLATE",
  data() {
    return {
      viewVisible: true,
      pdfsrc: "/PdfDemo/demo.pdf",
      numPages: 1,
      currentPage: 1, // pdf文件页码
      pageCount: 1, // pdf文件总页数
    };
  },
  components: {
    pdf,
  },
  mounted() {},
  created() {
    // createLoadingTask() 处理文件等跨越问题
    this.pdfsrc = pdf.createLoadingTask({ url: this.pdfsrc });
    this.loadPdfHandler();
  },
  methods: {
    loadPdfHandler() {
      this.pdfsrc.promise.then((pdf) => {
        // 获取pdf文件相关信息，页码等
        this.numPages = pdf.numPages;
      });
      this.currentPage = 1; // 加载的时候先加载第一页
      // 强制刷新
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped></style>
