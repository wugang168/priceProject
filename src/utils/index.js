// 创建持续的k线
export const createKCartData = (startPrice, totalDay) => {
  // 数据生成函数
  const crateData = (startPrice) => {
    // 一个随机的数据 -5% - 5%
    const random = Math.random() * 0.1 - 0.05
    return startPrice + startPrice * random
  }
  const kChart = [startPrice]
  for (var i = 0; i < totalDay; i++) {
    startPrice = crateData(startPrice)
    kChart.push(startPrice)
  }
  kChart.push(1)
  // const newkcart = [...kChart, ...kChart.reverse()]
  return kChart
}
// 统计数据集合中的总数量
const buildTotalValue = (arr) => {
  return arr.reduce((total, item) => {
    return total + item.diffTotal
  }, 0)
}

/**
 * 最开始的方案
 *      每天操作方案
 * @param {*} totalValue
 * @param {*} kChart
 */
const diffPrice = (totalValue, kChart) => {
  // 补仓记录
  const inData = []

  // 盈利记录
  const outData = []

  // 交易费
  const feeData = []

  // 日志记录
  const logs = []

  // 记录盈亏百分比
  const percentage = []

  // 总价值
  const TOTAL_VALUE = totalValue

  // 价格
  var price = 0

  // 份额
  var share = 0

  //
  var fee = 0.0001

  kChart.map((price, index) => {
    // 第一次
    if (index === 0) {
      share = TOTAL_VALUE / price
      return
    }

    var newTotalValue = share * price

    if (newTotalValue > TOTAL_VALUE) {
      // 赢， 需要卖出多少份额
      const diffTotal = newTotalValue - TOTAL_VALUE
      // 剩下的份额
      share = share - diffTotal / price

      // 交易费
      const feeTotal = diffTotal * fee

      // 记录盈利日志
      outData.push({ price, diffTotal, info: `价格在${price},盈利${diffTotal}` })
      feeData.push(feeTotal)
      console.log(`价格在${price},盈利${diffTotal},交易费${feeTotal}`)
    } else {
      // 亏
      const diffTotal = TOTAL_VALUE - newTotalValue
      // 补充后的份额
      share = share + diffTotal / price
      // 交易费
      const feeTotal = diffTotal * fee

      // 记录盈利日志
      inData.push({ price, diffTotal, info: `价格在${price},补仓-${diffTotal},交易费${feeTotal}` })
      feeData.push(feeTotal)
      console.log(`价格在${price},补仓-${diffTotal},交易费${feeTotal}`)
    }

    // 当前的总赢
    const totalOut = buildTotalValue(outData)
    // 当前的总补
    const totalIn = buildTotalValue(inData)
    // 总交易
    const totalfee = feeData.reduce((total, item) => {
      return total + item
    }, 0)

    const diffTotal = totalOut - totalIn - totalfee
    // 当前盈利比例
    const ratilo = (diffTotal / TOTAL_VALUE) * 100
    percentage.push(ratilo)

    // 记录当前的盈亏
    console.log(`当前盈利的数据：${diffTotal},盈亏比例：${ratilo},当前份额：${share}`)
  })

  // 最后统计
  // 总赢
  const totalOut = buildTotalValue(outData)
  // 总补
  const totalIn = buildTotalValue(inData)

  // 总交易
  const totalfee = feeData.reduce((total, item) => {
    return total + item
  }, 0)

  const sum = totalOut - totalIn - totalfee

  console.log(`最后统计结果：总盈利：${totalOut}----总补偿${totalIn}----总费用${totalfee}`)
  console.log(`盈利：${sum},百分比：${(sum / TOTAL_VALUE) * 100}`)

  let len = kChart.length
  let diffLen = ((kChart[len - 1] - kChart[0]) / kChart[0]) * 100
  // 长期持有
  console.log(`长期首位交易百分比：${diffLen}`)

  console.log(`最大盈利：${Math.max(...percentage)}， 最小盈利：${Math.min(...percentage)}`)
}

/**
 * 加了优化方案
 *  1.跌的时候
 *  2.涨的时候
 */
const diffPrice_two = (totalValue, kChart) => {
  // 补仓记录
  const inData = []

  // 盈利记录
  const outData = []

  // 交易费记录
  const feeData = []

  // 日志记录
  const logs = []

  // 记录盈亏百分比
  const percentage = []

  // 总价值
  const TOTAL_VALUE = totalValue

  // 价格
  var price = 0

  // 份额
  var share = 0

  // 交易费
  var fee = 0.0001

  // 亏得上一次价格
  var downPrevPrice = null

  // 赢得上一次价格
  var upPrevPrice = null

  kChart.map((price, index) => {
    // 第一次
    if (index === 0) {
      share = TOTAL_VALUE / price
      downPrevPrice = price
      upPrevPrice = price
      return
    }

    var newTotalValue = share * price

    if (newTotalValue > TOTAL_VALUE) {
      // if(price > upPrevPrice) {
      //     upPrevPrice = price
      //     console.log("触发连长一次")
      // }else{
      // 赢， 需要卖出多少份额
      const diffTotal = newTotalValue - TOTAL_VALUE
      // 剩下的份额
      share = share - diffTotal / price

      // 交易费
      const feeTotal = diffTotal * fee

      // 记录盈利日志
      outData.push({ price, diffTotal, info: `价格在${price},盈利${diffTotal}` })
      feeData.push(feeTotal)
      // console.log(`价格在${price},盈利${diffTotal},交易费${feeTotal}`)
      // }
    } else {
      // 当天的价格 < 上一天的价格   不做操作
      if (downPrevPrice > price) {
        downPrevPrice = price
        console.log('触发连跌一次')
      } else {
        // 亏
        const diffTotal = TOTAL_VALUE - newTotalValue
        // 补充后的份额
        share = share + diffTotal / price
        // 交易费
        const feeTotal = diffTotal * fee

        // 记录盈利日志
        inData.push({
          price,
          diffTotal,
          info: `价格在${price},补仓-${diffTotal},交易费${feeTotal}`
        })
        feeData.push(feeTotal)
        // console.log(`价格在${price},补仓-${diffTotal},交易费${feeTotal}`)
      }
    }

    // 当前的总赢
    const totalOut = buildTotalValue(outData)
    // 当前的总补
    const totalIn = buildTotalValue(inData)
    // 总交易
    const totalfee = feeData.reduce((total, item) => {
      return total + item
    }, 0)

    const diffTotal = totalOut - totalIn - totalfee
    // 当前盈利比例
    const ratilo = (diffTotal / TOTAL_VALUE) * 100
    percentage.push(ratilo)

    // 记录当前的盈亏
    // console.log(`当前盈利的数据：${diffTotal},盈亏比例：${ratilo},当前份额：${share}`)
  })

  // 最后统计
  // 总赢
  const totalOut = buildTotalValue(outData)
  // 总补
  const totalIn = buildTotalValue(inData)

  // 总交易
  const totalfee = feeData.reduce((total, item) => {
    return total + item
  }, 0)

  const sum = totalOut - totalIn - totalfee

  console.log(`最后统计结果：总盈利：${totalOut}----总补偿${totalIn}----总费用${totalfee}`)
  console.log(`盈利：${sum},百分比：${(sum / TOTAL_VALUE) * 100}`)

  let len = kChart.length
  let diffLen = ((kChart[len - 1] - kChart[0]) / kChart[0]) * 100
  // 长期持有
  console.log(`长期首位交易百分比：${diffLen}`)

  console.log(`最大盈利：${Math.max(...percentage)}， 最小盈利：${Math.min(...percentage)}`)
}
