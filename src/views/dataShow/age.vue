<template>
  <div class="com-container">
    <div class="com-chart" ref="ageline"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ageline: null,

      ageData: [],
    };
  },
  mounted() {
    this.initChart();
    this.updateLine();
    // window.addEventListener("resize", this.screenAdapter);
  },
  methods: {
    //初始化对象
    initChart() {
      this.ageline = this.$echarts.init(this.$refs.ageline);
    },
    //获取数据
    getData() {},
    //更新图标
    updateLine() {
      const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "axis",
        },
        series: [
          {
            data: [23, 66, 56, 55, 43, 36, 38],
            type: "line",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(22,242,217,0.5)" }, //0%颜色值
                { offset: 1, color: "rgba(22,242,217,0)" }, //100%颜色值
              ]),
            },
          },
          {
            data: [34, 35, 23, 34, 38, 22, 65],
            type: "line",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(254,33,30,0.5)" }, //0%颜色值
                { offset: 1, color: "rgba(254,33,30,0)" }, //100%颜色值
              ]),
            },
          },
        ],
      };
      this.ageline.setOption(option);
    },
    screenAdapter() {
      // console.log(this.$refs.ageline.offsetWidth);
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