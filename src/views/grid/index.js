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
    let sellPrice = 0
    let isSell = this.sellData.some((item) => {
      // 对应的买入价格
      let buyPrice = this.sellMap[item]
      if (price >= item && this.cacheBuyPrice[buyPrice]) {
        console.log('----------')
        console.log(`价格为${price},触发涨幅${item}价格线卖出机会`)
        sellPrice = item
        this.cacheBuyPrice[buyPrice] = false
        return true
      }
      return false
    })

    return {
      sellPrice,
      isSell
    }
  }

  // 买入时机判断
  // 判断传入的价格是否击穿了买入的价格刻度  一个价格刻度触发了买入需要标记
  const checkedBuyTime = (price) => {
    let buyPrice = 0
    const isBuy = this.buyData.some((item) => {
      if (price <= item && !this.cacheBuyPrice[item]) {
        console.log('----------')
        console.log(`价格为${price},触发跌破${item}价格线买入机会`)
        buyPrice = item
        this.cacheBuyPrice[item] = true
        return true
      }
      return false
    })
    return {
      buyPrice,
      isBuy
    }
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
  if (findData.length === 1 || findData.length === 0) {
    return { findData, otherData }
  } else {
    const sortFindData = findData.sort((a, b) => b.price - a.price)

    findData = [sortFindData.shift()]

    otherData = [...sortFindData, ...otherData]
    // 找到最小价格
    return { findData, otherData }
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
  // let buyGrid = createBuyGrid(startPrice, buyRange, grid)
  let sellGrid = createSellGrid(buyGrid, sellRange)
  // let sellGrid = buyGrid

  // 根据买入和卖出网格 做操作判断
  let buyAndSell = new BuildBuyOrSellTime(buyGrid, sellGrid)

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
  let historyLogs = []
  // 卖出的记录日志
  let sellLogs = []

  // 记录买入和卖出的差值变化
  let diffBuyOrSell = []

  // 盈利金额
  let profitTotal = 0

  // 价格
  let priceArr = []
  // 时间
  let timeArr = []

  for (let i = 0; i < kData.length; i++) {
    const { price, time } = kData[i]
    priceArr.push(price)
    timeArr.push(time)

    const currentPrice = price

    // 买入检查
    const buyChecked = buyAndSell.checkedBuyTime(currentPrice)
    if (buyChecked.isBuy) {
      let buyLot = buyAmount / buyChecked.buyPrice
      buyTotalMoney = buyTotalMoney + buyAmount
      buyTotalLot = buyTotalLot + buyLot

      // 买入记录
      buyLogs.push({
        price: buyChecked.buyPrice,
        lot: buyLot,
        time: time
      })
      historyLogs.push({
        price: buyChecked.buyPrice,
        lot: buyLot,
        time: time
      })

      buyNum++
      console.log(
        `${time}当天价格${currentPrice},触发网格买入价格${buyChecked.buyPrice}--买入${buyLot}份,金额--${buyAmount}`
      )
    }

    // 卖出检查
    /**
     * 这里的卖出可以有两种方式来做，
     *  1.一买 一卖
     *  2.一买 多买 [买入和卖出波动不一样]
     */
    const sellChecked = buyAndSell.checkedSellTime(currentPrice)
    if (sellChecked.isSell) {
      // 卖出检查
      sellNum++
      const { findData, otherData } = findDataBuyPrice(buyLogs, sellChecked.sellPrice)
      buyLogs = otherData

      // 统计当次要卖出的份额
      const currentSellLot = findData.reduce((total, item) => {
        return total + item.lot
      }, 0)

      sellToalMoney = sellToalMoney + currentSellLot * sellChecked.sellPrice

      sellToTalLot = sellToTalLot + currentSellLot

      sellLogs.push({
        price: sellChecked.sellPrice,
        lot: currentSellLot,
        time: time
      })
      console.log(
        `${time}当天价格${currentPrice},触发网格卖出价格${
          sellChecked.sellPrice
        }--卖出份额${currentSellLot},金额--${currentSellLot * sellChecked.sellPrice}`
      )
    }

    profitTotal = sellToalMoney + currentPrice * (buyTotalLot - sellToTalLot) - buyTotalMoney
    diffBuyOrSell.push(buyNum - sellNum)
    console.log(`总买入金额: ${buyTotalMoney}--总卖出金额:${sellToalMoney}------盈利${profitTotal}`)
  }

  const maxDiff = Math.max(...diffBuyOrSell)

  return {
    maxDiff,
    buyNum,
    sellNum,
    buyGrid,
    sellGrid,
    buyTotalMoney,
    buyTotalLot,
    sellToalMoney,
    sellToTalLot,
    profitTotal,
    sellLogs,
    historyLogs,
    priceArr,
    timeArr
  }
}

/**
 * 网格线数据生成
 * @param {array} sData  y轴数据
 * @param {string} color 颜色
 * @param {string} name  名称
 * @returns
 */
export const createMarkLine = (sData, color, name) => {
  return sData.map((item) => {
    return {
      name: name,
      yAxis: item,
      label: {
        color: color
      },
      lineStyle: {
        color: color
      }
    }
  })
}

/**
 * 生成卖出 和 买入 散点数据
 * @param {array} sData [{price: 1.2, time: '时间戳'}]
 * @param {string} color
 * @param {sring} name
 */
export const createBuyOrSellScatter = (sData, color, name) => {
  const data = sData.map((item) => {
    return [item.time, item.price]
  })
  return {
    name: name,
    symbolSize: 10,
    type: 'scatter',
    itemStyle: {
      color: color
    },
    data: data
  }
}
