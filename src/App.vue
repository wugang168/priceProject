<template>
  <RouterView />
  <!-- <div class="wrap">
    <div class="box"></div>
    <div class="chart-box" ref="chart"></div>
  </div> -->
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const chart = ref()
let myChart = null
onMounted(() => {
  // myChart = echarts.init(chart.value)

  // initChart()
})

const initChart = () => {
  const markLineData = []
  myChart.setOption({
    grid: {
      left: 40,
      right: 40,
      bottom: 40,
      top: 40
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      splitLine: {
        lineStyle: {
          type: 'dotted',
          dashOffset: 5
        }
      }
    },
    yAxis: {
      type: 'value',
      interval: 0.05,
      min: 0.7,
      max: 1.5,
      splitLine: {
        lineStyle: {
          type: 'dotted'
        }
      }
    },
    series: [
      {
        data: [1, 1.2, 1.3, 1.11, 1, 0.9, 1.1, 1.2, 1, 1.3, 1.4, 1.23, 1.32],
        type: 'line',
        symbolSize: 0.1,
        symbol: 'circle',
        lineStyle: {
          width: 1
        },
        markLine: {
          symbol: 'none',
          data: [
            {
              name: name,
              yAxis: 1.23,
              label: {
                color: 'green'
              },
              lineStyle: {
                color: 'green'
              }
            },
            {
              name: name,
              yAxis: 1.4,
              label: {
                color: 'red'
              },
              lineStyle: {
                color: 'red'
              }
            }
          ],
          silent: true
        }
      },
      //
      {
        symbolSize: 10,
        type: 'scatter',
        itemStyle: {
          color: 'green'
        },
        data: [
          [1, 1.2],
          [2, 1.25]
        ]
      },
      {
        symbolSize: 10,
        type: 'scatter',
        itemStyle: {
          color: 'red'
        },
        data: [
          [1, 1.22],
          [2, 1.3]
        ]
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100px;
  .box {
    padding: 20px;
    background-color: green;
  }
  .chart-box {
    width: 1200px;
    height: 700px;
    border: 1px solid rgba(78, 89, 105, 0.16);
    border-radius: 8px;
  }
}
</style>
