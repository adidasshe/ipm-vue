<template>
  <div id="map" :style="{width: '100%', height: '1300px'}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/map/js/china.js");
require("echarts/map/js/province/beijing.js");
import resize from "./mixins/resize";
export default {
  mixins: [resize],
  data() {
    return {
      msg: "地图"
    };
  },
  mounted() {
    this.initChart();
  },
  watch: {},
  created() {
    // this.getdata();
    // this.drawLine();
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById("map"), "infographic");
      this.setOptions();
      // console.log(this.chartData.switch1)
    },
    setOptions() {
      // 绘制图表

      var myData = [
        { name: "设备1", value: [121.15, 31.89, 90] },
        { name: "设备2", value: [109.781327, 39.608266, 120] },
        { name: "设备3", value: [120.38, 37.35, 142] },
        { name: "设备4", value: [122.207216, 29.985295, 123] },
        { name: "设备5", value: [110.245672, 30.7787677, 566] }
      ];

      this.chart.setOption({
        //option 开始

        geo: {
          map: "china", //地图类型为中国地图,要是世界那就是world,要是省市区：例如beijing、shanghai
          center: [115.97, 29.71],
          scaleLimit: {
            //所属组件的z分层，z值小的图形会被z值大的图形覆盖
            min: 1, //最小的缩放值
            max: 1 //最大的缩放值
          },

          itemStyle: {
            // 定义样式
            normal: {
              // 普通状态下的样式
              areaColor: "#6699CC",
              borderColor: "#fff"
            },
            emphasis: {
              // 高亮状态下的样式
              areaColor: "#e9fbf1"
            }
          },
          regions: [
            {
              //在地图中对特定的区域配置样式。
              name: "beijing",
              itemStyle: {
                normal: {
                  areaColor: "red",
                  color: "red"
                }
              }
            }
          ]
        },
        // hover显示目标数据
        tooltip: {
          trigger: "item",
          // tooltip的trigger的值可以有'item'、'axis'。
          //'item':数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          //'axis':坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
          textStyle: {
            align: "left"
          }
        },
        // 图表背景色
        backgroundColor: "#404a59",
        // 标志颜色
        color: "red",
        // 新建散点图series
        series: [
          {
            name: "", //series名称
            type: "scatter", //为散点类型
            coordinateSystem: "geo", // series坐标系类型
            data: myData,
            symbol: "pin",
            symbolSize: [20, 20]
          }
        ],

        // 添加视觉映射组件
        visualMap: {
          type: "continuous", // 连续型
          min: 0, // 值域最小值，必须参数
          max: 600, // 值域最大值，必须参数
          calculable: true, // 是否启用值域漫游
          inRange: {
            color: ["red"]
            // 指定数值从低到高时的颜色变化
          },
          textStyle: {
            color: "#fff" // 值域控件的文本颜色
          }
        }

        //options结束
      });
    }
  }
};
</script>

<style scoped>
</style>
