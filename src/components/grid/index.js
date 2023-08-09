import { createBuyGrid, createBuyGridGrand, createSellGrid } from '@/utils/tools.js'

/**
 *
 * @param {*} buyData 需要买入的价格设置
 * @param {*} sellData 需要卖出的价格设置
 */
function BuildBuyOrSellTime(buyData = [], sellData = []) {
  this.cacheBuyPrice = {}
  this.buyData = buyData
  this.sellData = sellData

  // 卖出价格对应买入价格位置
  this.sellMap = {}
  for (let i = 0; i < sellData.length; i++) {
    this.sellMap[this.sellData[i]] = this.buyData[i]
  }

  // 卖出时机判断
  const checkedSellTime = (price) => {
    return this.sellData.some((item) => {
      // 对应的买入价格
      let buyPrice = this.sellMap[item]
      if (price >= item && this.cacheBuyPrice[buyPrice]) {
        console.log('----------')
        console.log(`价格为${price},触发涨幅${item}价格线卖出机会`)
        this.cacheBuyPrice[buyPrice] = false
        return true
      }
      return false
    })
  }

  // 买入时机判断
  // 判断传入的价格是否击穿了买入的价格刻度  一个价格刻度触发了买入需要标记
  const checkedBuyTime = (price) => {
    return this.buyData.some((item) => {
      if (price <= item && !this.cacheBuyPrice[item]) {
        console.log('----------')
        console.log(`价格为${price},触发跌破${item}价格线买入机会`)
        this.cacheBuyPrice[item] = true
        return true
      }
      return false
    })
  }

  return {
    checkedBuyTime,
    checkedSellTime
  }
}

/**
 *
 * @param {*} sData
 * @param {*} price
 * @returns
 */
const findDataBuyPrice = (sData, price) => {
  let findData = []
  let otherData = []
  sData.map((item) => {
    if (item.price < price) {
      findData.push(item)
    } else {
      otherData.push(item)
    }
  })
  if (findData.length === 1) {
    return { findData, otherData }
  } else {
    const sortFindData = findData.sort((a, b) => b.price - a.price)
    findData = sortFindData.shift()
    otherData = [...sortFindData, ...otherData]
    // 找到最小价格
    return { findData }
  }
}

/**
 * 构建计算模型
 * @param {*} setting 配置项信息 {startPrice, buyRange, sellRange, grid, buyAmount}
 * @param {*} kData   回撤数据
 */
export const runtimeFun = (
  kData,
  setting = { startPrice: 1, buyRange: 0.05, sellRange: 0.05, grid: 20, buyAmount: 10000 }
) => {
  let { startPrice, buyRange, sellRange, grid, buyAmount } = setting
  // 创建买入和卖出网格点
  let buyGrid = createBuyGridGrand(startPrice, buyRange, grid)
  let sellGrid = createSellGrid(buyGrid, sellRange)
  // 根据买入和卖出网格 做操作判断
  let buyAndSell = BuildBuyOrSellTime(buyGrid, sellGrid)

  // 卖出次数
  let sellNum = 0
  let buyNum = 0
  // 买入总金额
  let buyTotalMoney = 0
  // 买入总份额
  let buyTotalLot = 0
  // 卖出总金额
  let sellToalMoney = 0
  // 卖出总份额
  let sellToTalLot = 0

  // 买入的记录日志
  let buyLogs = []
  // 卖出的记录日志
  let sellLogs = []

  // 记录买入和卖出的差值变化
  let diffBuyOrSell = []

  for (let i = 0; i < kData.length; i++) {
    const currentPrice = kData[i]

    // 买入检查
    if (buyAndSell.checkedBuyTime(currentPrice)) {
      let buyLot = buyAmount / currentPrice
      buyTotalMoney = buyTotalMoney + buyAmount
      buyTotalLot = buyTotalLot + buyLot

      // 买入记录
      buyLogs.push({
        price: currentPrice,
        lot: buyLot
      })

      buyNum++
      console.log(`当天价格${currentPrice},触发--买入${buyLot}份`)
    }

    // 卖出检查
    /**
     * 这里的卖出可以有两种方式来做，
     *  1.一买 一卖
     *  2.一买 多买 [买入和卖出波动不一样]
     */
    if (buyAndSell.checkedSellTime(currentPrice)) {
      // 卖出检查
      sellNum++
      console.log(`当天价格${currentPrice},触发--卖出份额`)
    }

    console.log(
      `总买入金额: ${buyTotalMoney}--总卖出金额:${sellToalMoney}------盈利${
        sellToalMoney + currentPrice * (buyTotalLot - sellToTalLot) - buyTotalMoney
      }`
    )
    diffBuyOrSell.push(buyNum - sellNum)
  }

  return {}
}
