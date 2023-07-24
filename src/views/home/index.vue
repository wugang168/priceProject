<template>
  <div class="wrap">
    <!-- 代码数据获取 -->
    <div class="input-box">
      编码：<el-input v-model="code" placeholder="请输入编码" /> 日期范围：<el-date-picker
        v-model="time"
        type="daterange"
        range-separator="To"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :size="size"
      />
      <el-button type="primary" @click="submitSearch">查询</el-button>
    </div>
    <!-- 图 -->
    <div class="chart-box" ref="chart"></div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { createKCartData } from '@/utils'
import { parseCodeData } from '@/utils/parseData'
const data = createKCartData(1, 60)
const chart = ref()

const time = ref('')
const code = ref('')
let myChart = null
let chartData = {}

const submitSearch = async () => {
  // 检查code time
  if (!time.value || !code.value) {
    console.log('请选择填写信息')
    ElMessage({
      message: '请选择填写信息',
      type: 'warning'
    })
    return
  }

  // 获取数据
  const { data } = await fetch(
    '/api/v5/stock/chart/kline.json?symbol=SZ159766&begin=1690185428135&period=day&type=before&count=-808&indicator=kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance&a=' +
      Math.random(),
    {
      method: 'get'
    }
  ).then((res) => {
    return res.json()
  })
  // 做数据解析
  chartData = parseCodeData(data.item)
  initChart()
}

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(chart.value)
})

const initChart = () => {
  // 绘制图表
  myChart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    xAxis: {
      type: 'category',
      data: chartData.time
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销量',
        type: 'line',
        data: chartData.data
      }
    ]
  })
}
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
