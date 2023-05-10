<template>
  <div class="com-container">
    <div class="com-chart" ref="titlebar"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      titlebar: null,

      tltleData: [],
    };
  },
  mounted() {
    this.initChart();
    this.updatePop();
  },
  methods: {
    //初始化对象
    initChart() {
      this.titlebar = this.$echarts.init(this.$refs.titlebar);
    },
    //获取数据
    getData() {},
    //更新图标
    updatePop() {
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          icon: "circle",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["2017", "2018", "2019", "2010", "2021"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "正高",
            type: "bar",
            stack: "Ad",

            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "副高",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "普通",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      };
      this.titlebar.setOption(option);
    },
  },
};
</script>
<style scoped>
.com-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.com-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.com-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>