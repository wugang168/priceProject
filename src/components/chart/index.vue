<template>
  <div class="chart-box" ref="chart"></div>
</template>

<script setup>
import { createMarkLine, createBuyOrSellScatter } from '../grid/index.js'
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
const chart = ref()
let myChart = null
const props = defineProps(['result'])

onMounted(() => {
  myChart = echarts.init(chart.value)
})

watch(
  () => props.result,
  () => {
    initChart()
  }
)

const initChart = () => {
  // 网格参考线
  const markLineData = [
    ...createMarkLine(props.result.buyGrid, 'green', '买入'),
    ...createMarkLine(props.result.sellGrid, 'red', '卖出')
  ]

  // 绘制k线数据
  const lineYData = props.result.priceArr
  const lineXDate = props.result.timeArr

  // 买入散点
  const buyScatterData = createBuyOrSellScatter(props.result.historyLogs, 'green', '买入散点')
  const sellScatterData = createBuyOrSellScatter(props.result.sellLogs, 'red', '卖出散点')

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
      },
      data: lineXDate
    },
    yAxis: {
      type: 'value',
      interval: 0.2,
      // min: 0.9,
      // max: 1.7,
      splitLine: {
        lineStyle: {
          type: 'dotted'
        }
      }
    },
    series: [
      {
        data: lineYData,
        type: 'line',
        symbolSize: 0.1,
        symbol: 'circle',
        lineStyle: {
          width: 1
        },
        markLine: {
          symbol: 'none',
          data: markLineData,
          silent: true
        }
      },
      buyScatterData,
      sellScatterData
    ]
  })
}
</script>

<style lang="scss" scoped>
.chart-box {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(78, 89, 105, 0.16);
  border-radius: 8px;
}
</style>
