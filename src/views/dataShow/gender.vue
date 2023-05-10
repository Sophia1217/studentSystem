<template>
  <div class="com-container">
    <div class="com-chart" ref="circlePie"></div>
    <div class="com-chart" ref="circlePie2"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      circlePie: null,
      circlePie2: null,
      genderData: [
        { value: 1048, name: "男" },
        { value: 735, name: "女" },
      ],
      genderData2: [
        { value: 1048, name: "男" },
        { value: 735, name: "女" },
      ],
    };
  },
  mounted() {
    this.initChart();
    this.updatePie1();
    this.updatePie2();
  },
  methods: {
    //初始化对象
    initChart() {
      this.circlePie = this.$echarts.init(this.$refs.circlePie);
      this.circlePie2 = this.$echarts.init(this.$refs.circlePie2);
    },
    //获取数据
    getData() {},
    //更新图标
    updatePie1() {
      const data = this.genderData;
      const optionPie1 = {
        title: [
          {
            text: "专职",
            top: "40%",
            left: "center",
            textStyle: {
              rich: {
                name: {
                  fontSize: 14,
                  color: "#666666",
                  padding: [10, 0],
                },
                val: {
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#333333",
                },
              },
            },
          },
        ],

        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "center",
          left: "center",
          icon: "circle",
          orient: "vertical",
          formatter: function (name) {
            const val = data.filter((item) => {
              return item.name === name;
            });

            return name + "" + val[0].value;
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              // position: 'center'
            },
            emphasis: {
              disabled: false,
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };
      this.circlePie.setOption(optionPie1);
    },
    updatePie2() {
      const data2 = this.genderData2;
      const optionPie2 = {
        title: [
          {
            text: "兼职",
            top: "40%",
            left: "center",
            textStyle: {
              rich: {
                name: {
                  fontSize: 14,
                  color: "#666666",
                  padding: [10, 0],
                },
                val: {
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#333333",
                },
              },
            },
          },
        ],

        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "center",
          left: "center",
          icon: "circle",
          orient: "vertical",
          formatter: function (name) {
            const val = data2.filter((item) => {
              return item.name === name;
            });

            return name + "" + val[0].value;
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              // position: 'center'
            },
            emphasis: {
              disabled: false,
            },
            labelLine: {
              show: false,
            },
            data: data2,
          },
        ],
      };
      this.circlePie2.setOption(optionPie2);
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
  display: flex;
  flex-direction: row;
}
.com-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>