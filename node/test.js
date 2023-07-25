// 统计数据
const statistiaData = (kChart) => {
  /**
   * 定投方案：
   *  1.第一笔定投10000
   *  2.没次定投1000 在阴线
   *  3.当于第一次的价格,跌去5%位置,投入20000
   *  4.当于第一次的价格.跌去10%位置,投入40000
   *  5.当于第一次的价格,跌去20%位置,投入100000
   */
  // 补仓记录
  const inData = []
  // 交易费
  const feeData = []
  // 日志记录
  const logs = []
  // 总投入金额
  let total = 0
  // 初始价格
  var startPrice = 0
  // 份额
  var share = 0

  // 标志位记录点
  var flag = { bf5: false, bf10: false, bf20: false }

  kChart.map((item, index) => {
    if (index === 0) {
      startPrice = item
      // 第一买入10000
      total = 10000
      share = total / startPrice
      return
    }

    // 每次买入1000
    total = total + 1000
    share = share + 1000 / item

    // 每次计算盈利
    const yingli = share * item - total
    const yinglib = (yingli / total) * 100

    // 计算与初始价格的关系
    const xiaoshu = (startPrice - item) / startPrice

    if (xiaoshu > 0.05 && !flag.bf5) {
      console.log('触发了5%加入条件')
      flag.bf5 = true
      total = total + 20000
      share = share + 20000 / item
    }

    if (xiaoshu > 0.1 && !flag.bf10) {
      console.log('触发了10%加入条件')
      flag.bf10 = true
      total = total + 40000
      share = share + 40000 / item
    }

    if (xiaoshu > 0.2 && !flag.bf20) {
      console.log('触发了10%加入条件')
      flag.bf20 = true
      total = total + 100000
      share = share + 100000 / item
    }

    // 打印出记录 总投入 总份额  盈利多少  盈利百分比
    console.log(
      `总投入:${total}---总份额:${share}---盈利:${yingli}---盈利百分比:${yinglib}---当前价格与初始价格涨跌幅:${xiaoshu}`
    )
  })
}
// 模拟的一组数据
const moniData = [1, 0.99, 0.98, 0.97, 0.99, 0.97, 0.96, 0.95, 0.9, 0.8]

statistiaData(moniData)
