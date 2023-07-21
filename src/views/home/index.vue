<template>
  <div class="wrap">
    <!-- 图 -->
    <div class="chart-box" ref="chart"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { createKCartData } from '@/utils'
const data = createKCartData(1, 60)
const chart = ref()

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(chart.value)
  // 绘制图表
  myChart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    xAxis: {
      type: 'category',
      data: Array.from(data.length)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销量',
        type: 'line',
        data: data
      }
    ]
  })
})
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.chart-box {
  width: 600px;
  height: 400px;
  border: 1px solid green;
}
</style>
