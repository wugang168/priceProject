<template>
  <div class="wrap">
    <!-- 图 -->
    <div>
      <!-- 代码数据获取 -->
      <div class="input-box">
        <div class="form-item">
          <label for="">编码：</label>
          <el-select v-model="code" class="m-2" placeholder="请输入编码" size="large">
            <el-option
              v-for="item in codeList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
        <div class="form-item">
          <label for="">日期范围：</label>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="To"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :size="size"
          />
        </div>
        <el-button type="primary" @click="submitSearch">查询</el-button>
      </div>
      <div class="chart-box" ref="chart"></div>
    </div>

    <div class="block">
      <one class="block-item" :sData="chartData.data"></one>
      <two class="block-item" :sData="chartData.data"></two>
      <three class="block-item" :sData="chartData.data"></three>
      <four class="block-item" :sData="chartData.data"></four>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { createKCartData } from '@/utils'
import { parseCodeData } from '@/utils/parseData'
import { formatYYYYMMDD } from '@/utils/tools.js'

import one from '@/components/one.vue'
import two from '@/components/two.vue'
import three from '@/components/three.vue'
import four from '@/components/four.vue'

const data = createKCartData(1, 60)
const chart = ref()

const time = ref('')
const code = ref('')
let myChart = null
let chartData = ref({})

const codeList = [
  {
    code: 'SH512010',
    name: ''
  }
]

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
    `/api/v5/stock/chart/kline.json?symbol=${code.value}&begin=1690185428135&period=day&type=before&count=-808&indicator=kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance&a=` +
      Math.random(),
    {
      method: 'get'
    }
  ).then((res) => {
    return res.json()
  })

  // 做数据解析
  chartData.value = parseCodeData(data.item, {
    startTime: formatYYYYMMDD(time.value[0]),
    endTime: formatYYYYMMDD(time.value[1])
  })
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
      data: chartData.value.time
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销量',
        type: 'line',
        data: chartData.value.data
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
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
.input-box {
  padding-bottom: 20px;
}
.form-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.form-item > label {
  flex-shrink: 0;
  width: 120px;
}
.chart-box {
  margin-right: auto;
  width: 800px;
  height: 800px;
  border: 1px solid green;
}
.block {
  flex: 1;
}
.block-item {
  border: 1px solid #707077;
  margin-bottom: 50px;
  padding: 20px;
  border-radius: 8px;
}
</style>
