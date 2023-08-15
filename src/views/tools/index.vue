<template>
  <div></div>
</template>

<script setup>
// 在确定需要开始买入某个标的时候,就需要做好 下跌计划 上涨计划
/**
 * 计算网格大小
 * @param {*} start 开始
 * @param {*} end   结束
 * @param {*} range 波动
 * @param {*} flex  固定格值还是伸缩
 */
const gridNum = (start, end, range, flex = true) => {
  let num = 0
  let prve = start
  do {
    if (flex) {
      prve = prve - prve * range
    } else {
      prve = start - num * range
    }
    num++
  } while (prve > end)

  const price = 10000
  let totalPrice = 0
  let fixedTotal = 0

  for (let i = 0; i < num; i++) {
    fixedTotal = fixedTotal + price
    totalPrice = totalPrice * (1 - range) + price
  }

  // 再连续追加5个
  totalPrice = totalPrice + 5 * price
  fixedTotal = fixedTotal + 5 * price

  let max = ((start - end) / start) * 100
  let min = ((fixedTotal - totalPrice) / fixedTotal) * 100
  return { num, max, min }
}

console.log(gridNum(1, 0.7, 0.05, false))
console.log(gridNum(1, 0.7, 0.05))
</script>
