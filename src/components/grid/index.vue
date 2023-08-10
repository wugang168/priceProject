<template>
  <div>
    <div @click="buildResult">点击查看运行结果</div>
    <div class="box">
      <div class="item">
        最大份额差
        <span>{{ result.maxDiff }}</span>
      </div>
      <div class="item">
        盈利金额
        <span>{{ result.profitTotal }}</span>
      </div>
      <div class="item">
        买入
        <span>{{ result.buyNum }}</span>
      </div>
      <div class="item">
        卖出
        <span>{{ result.sellNum }}</span>
      </div>
      <div class="item">
        累积投入
        <span>{{ result.buyTotalMoney }}</span>
      </div>
      <div class="item">
        累积买入份额
        <span>{{ result.buyTotalLot }}</span>
      </div>
      <div class="item">
        累积卖出
        <span>{{ result.sellToalMoney }}</span>
      </div>
      <div class="item">
        累积卖出份额
        <span>{{ result.sellToTalLot }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { runtimeFun } from './index.js'
const props = defineProps(['sData'])
const result = ref({})
const buildResult = () => {
  result.value = runtimeFun(props.sData.fData, {
    startPrice: 1,
    buyRange: 0.05,
    sellRange: 0.05,
    grid: 20,
    buyAmount: 10000
  })
}
</script>

<style>
.box {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}
.box .item {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  align-items: center;
  gap: 15px;
}
.box .item span {
  font-size: 20px;
  font-weight: 700px;
}
</style>
