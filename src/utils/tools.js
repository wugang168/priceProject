import dayjs from 'dayjs'
export function formatYYYYMMDD(ns) {
  return dayjs(ns).format('YYYY-MM-DD')
}

/**
 * 网格生成工具: 以开始价 的某个波动计算
 * @param {*} start 开始
 * @param {*} range 波动
 * @param {*} gridNum 生成格子数量
 * @returns []
 */
export function createBuyGrid(start, range, gridNum) {
  let result = []
  for (let i = 0; i <= gridNum; i++) {
    let price = start - range * i
    result.push(price.toFixed(3) - 0)
  }
  console.log(
    '最大回撤的波动：',
    parseFloat(((start - result[result.length - 1]) / start) * 100, 2)
  )
  console.log(result)
  return result
}

/**
 * 网格生成工具: 每次计算后价格重置,在计算
 * @param {*} start 开始
 * @param {*} range 波动
 * @param {*} gridNum 生成格子数量
 * @returns []
 */
export function createBuyGridGrand(start, range, gridNum) {
  let result = []
  let prevPrice = start
  for (let i = 0; i <= gridNum; i++) {
    let price = prevPrice - prevPrice * range
    prevPrice = price
    result.push(price.toFixed(3) - 0)
  }
  console.log(
    '最大回撤的波动：',
    parseFloat(((start - result[result.length - 1]) / start) * 100, 2)
  )
  console.log(result)
  return result
}

/**
 * 根据买入网格生成卖出网格
 * @param {*} buyGrid
 * @param {*} range
 */
export function createSellGrid(buyGrid, range) {
  let result = []
  result = buyGrid.map((item) => {
    return (item + item * range).toFixed(3) - 0
  })
  console.log(result)
  return result
}

// const a = gridCreateFunGrand(1, 0.02, 20)
// createSellGrid(a, 0.05)
// gridCreateFunGrand(1, 0.05, 20)
// 在相对地位点打入底仓
