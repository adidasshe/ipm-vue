<template>
  <div id="map" :style="{width: '100%', height: '1300px'}"></div>
</template>

<script>
import echarts from "echarts";

require("echarts/extension/bmap/bmap");
import resize from "./mixins/resize";
import { mapData } from "@/api/device";
export default {
  mixins: [resize],
  data() {
    return {
      msg: "地图",
      normal: [],
      abnormal: [],
      off: []
    };
  },
  mounted() {
    this.initChart();
    this.times = window.setInterval(() => {
      setTimeout(this.getMap, 0);
    }, 5 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.times);
  },
  // watch: {
  //   off(val, oldVal) {
  //     // console.log(val, oldVal);
  //     if (val != oldVal) {
  //       // let option = this.chart.getOption();
  //       // this.chart.clear()
  //       // option.series[1].data = this.off;
  //       // option.series[0].data = this.normal;
  //       // option.series[2].data = this.abnormal;
  //       // this.chart.setOption(option);

  //       this.chart.setOption({
  //         series: [
  //           {
  //             name: "离线",
  //             type: "effectScatter",
  //             data: this.off
  //           },
  //           {
  //             name: "正常",
  //             type: "scatter",
  //             data: this.normal
  //           },
  //           {
  //             name: "漏电跳闸",
  //             type: "effectScatter",
  //             data: this.abnormal
  //           }
  //         ]
  //       });
  //     }
  //   },
  //   normal(val, oldVal) {
  //     // console.log(val, oldVal);
  //     if (val != oldVal) {
  //       // let option = this.chart.getOption();
  //       // // this.chart.clear()
  //       // option.series[1].data = this.off;
  //       // option.series[0].data = this.normal;
  //       // option.series[2].data = this.abnormal;
  //       // this.chart.setOption(option);

  //       this.chart.setOption({
  //         series: [
  //           {
  //             name: "离线",
  //             type: "effectScatter",
  //             data: this.off
  //           },
  //           {
  //             name: "正常",
  //             type: "scatter",
  //             data: this.normal
  //           },
  //           {
  //             name: "漏电跳闸",
  //             type: "effectScatter",
  //             data: this.abnormal
  //           }
  //         ]
  //       });
  //     }
  //   },
  //   abnormal(val, oldVal) {
  //     // console.log(val, oldVal);
  //     if (val != oldVal) {
  //       // let option = this.chart.getOption();
  //       // // this.chart.clear()
  //       // option.series[1].data = this.off;
  //       // option.series[0].data = this.normal;
  //       // option.series[2].data = this.abnormal;
  //       // this.chart.setOption(option);

  //       this.chart.setOption({
  //         series: [
  //           {
  //             name: "离线",
  //             type: "effectScatter",
  //             data: this.off
  //           },
  //           {
  //             name: "正常",
  //             type: "scatter",
  //             data: this.normal
  //           },
  //           {
  //             name: "漏电跳闸",
  //             type: "effectScatter",
  //             data: this.abnormal
  //           }
  //         ]
  //       });
  //     }
  //   }
  // },
  created() {
    this.getMap();
    // this.getdata();
    // this.drawLine();
  },
  methods: {
    getMap() {
      let token = this.$store.getters.token;
      mapData(token).then(Response => {
        let data = Response.data;
        let off = [];
        let normal = [];
        let abnormal = [];
        // console.log(Response.time);
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i][0]);
          //如果设备从未上传数据则视为设备未安装启用，不予标注
          if (data[i][0] != null) {
            let time = Response.time - Date.parse(data[i][0].date) / 1000;
            // 如果5分钟内没有上传数据则标注为离线图标
            if (time > 300) {
              // console.log("离线");

              let res = [];
              res.push(data[i][0].log);
              res.push(data[i][0].lat);
              res.push(2);
              off.push({
                name: data[i][0].name,
                value: res,
                id: data[i][0].device_id
              });
              this.off = off;
              this.chart.setOption({
                series: [
                  {
                    name: "离线",
                    type: "effectScatter",
                    data: this.off
                  }
                ]
              });

              // let newOption = this.Chart.getOption();
              // newOption.series[1].data = off;
              // this.chart.setOption(newOption, true);
              // console.log(off);
            } else {
              // 如果开关1或者开关2没有合闸则视为异常
              if (data[i][0].s1 == 0 || data[i][0].s2 == 0) {
                // console.log("异常");
                let res = [];
                res.push(data[i][0].log);
                res.push(data[i][0].lat);
                res.push(2);
                abnormal.push({
                  name: data[i][0].name,
                  value: res,
                  id: data[i][0].device_id
                });
                this.abnormal = abnormal;
                this.chart.setOption({
                  series: [
                    {
                      name: "漏电跳闸",
                      type: "effectScatter",
                      data: this.abnormal
                    }
                  ]
                });
              } else {
                // console.log("正常");
                let res = [];
                res.push(data[i][0].log);
                res.push(data[i][0].lat);
                res.push(2);
                normal.push({
                  name: data[i][0].name,
                  value: res,
                  id: data[i][0].device_id
                });
                this.normal = normal;
                this.chart.setOption({
                  series: [
                    {
                      name: "正常",
                      type: "scatter",
                      data: this.normal
                    }
                  ]
                });
              }
            }
          }
        }
        // console.log("纯净", off);
        // this.off = off;
        // console.log(this.off)
      });
      // return { off: off, normal: normal, abnormal: abnormal };
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById("map"), "infographic");
      var option = {
        //option 开始
        title: {
          text: "JP柜智能管控仪系统 - 设备地图",
          subtext: "data from device",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {a}"
        },
        bmap: {
          center: [112.73876, 27.23258],
          zoom: 10,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#f3f3f3"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#fdfdfd"
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#999999"
                }
              }
            ]
          }
        },
        series: [
          {
            name: "正常",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.normal,
            // data: [{ name: "桂林", value: [110.3, 25.31, 1] }],
            symbolSize: 20,
            // symbol:'arrow',
            silent: false,
            label: {
              normal: {
                formatter: "{b}",
                position: "top",
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "rgb(0,128,0)"
              }
            }
          },
          {
            name: "离线",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: this.off,
            // data: [{ name: "桂林", value: [110.3, 25.31, 1] },{ name: "平乐", value: [111.3, 25.31, 1] }],
            symbolSize: 30,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "rgb(0,0,255)",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          },
          {
            name: "漏电跳闸",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: this.abnormal,
            // data: [{ name: "郴州", value: [113.3, 25.31, 1] },{ name: "衡阳", value: [114.3, 25.31, 1] }],
            symbolSize: 30,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "rgb(255,0,0)",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          }
        ]
        //options结束
      };
      this.chart.setOption(option, true);
      var that = this;
      this.chart.on("click", function(params) {
        console.log(params.data);
        that.$store.commit("user/SET_DEVICE_ID", params.data.id);
        that.$router.push({ name: "phase" });
      });
      // let newOption = this.Chart.getOption();
      // console.log(this.chartData.switch1)
    }
  }
};
</script>

<style scoped>
</style>
