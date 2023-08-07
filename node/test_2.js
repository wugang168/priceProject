// 网格交易规则定义

// 起始价格

// 买入的波动幅度 2%

// 卖出的波动幅度 5% 

// 先实现正常的定投模型
/**
 * 1.给初始的进入价格
 * 2.波动幅度 买卖都是同一个  先卖后买
 * 3.波动的最大网格数
 * 4.每份金额（固定金额投入）
 */
const buildGrid = (start, range, grid) => {

  const result = []

  for(let i=0; i<=grid; i++) {
    let price = (start - range*i)  
    result.push(price.toFixed(2))
  }

  return result
}

const findDataBuyPrice = (sData, price) => {
  const findData = [];
  const otherData = []
  sData.map((item) => {
    if(item.price < price){
      findData.push(item)
    }else{
      otherData.push(item)
    }
  })
  return {findData, otherData}
}

// 卖入的判断函数
const buyTime = () => {

}

/**
 * 
 * @param {*} buyData 需要买入的价格设置
 * @param {*} sellData 需要卖出的价格设置
 */
function BuildBuyOrSellTime (buyData=[], sellData=[]) {

  this.cacheBuyPrice = {}
  this.buyData = buyData
  this.sellData = sellData


  // 买入时机判断
  // 判断传入的价格是否击穿了买入的价格刻度  一个价格刻度触发了买入需要标记
  const checkedBuyTime = (price) => {
    return this.buyData.some((item) => {
      if(price <= item && !this.cacheBuyPrice[item]) {
        this.cacheBuyPrice[item] = true 
        return true;
      }
      return false
    })
  }


  return {

  }
}



const wanggeFun = () => {

  const startPrice = 1;
  const range = 0.05
  const grids = 10
  const itemTotal = 10000

  // 生成买入和卖出网格点数
  const buyGrids = buildGrid(startPrice, range, grids)

  console.log('打印网格数据看看',buyGrids)

  // 股票的K线数据
  // const Kline = ['0.95', '0.90', '0.85', '0.80', '0.75', '0.70', '0.65','0.70', '0.60', '0.55', '0.50', '0.55', '0.60', '0.65', '0.70', '0.75', '0.80', '0.85', '0.90', '0.95', '1.00']
  const Kline = ['0.95', '1.00', '0.95', '1.00', '0.95', '1.00', '0.95', '0.90', '0.85','0.80','0.75','0.70', '0.65', '0.70', '0.80','0.70','0.65', '0.60', '0.65', '0.60', '0.65', 
  '0.60', '0.65', '0.60', '0.65','0.60', '0.65', '0.60', '0.65', '0.60', '0.65','0.60', '0.65', '0.70', '0.75', '0.80', '0.75', '0.70', '0.65', 
  '0.60','0.55', '0.60', '0.55', '0.60', '0.55', '0.60','0.55', '0.60', '0.55', '0.60', '0.55', '0.60', '0.55', '0.60', '0.65', '0.70', '0.75', '0.80', '0.85', '0.90', '0.95', '1.00']

  // '0.85','0.80', '0.75', '0.70'
  // const Kline = ['0.90', '0.85', '0.90', '0.95']


  // 卖出次数
  let sellNum = 0;
  let buyNum = 0;
  // 总的投入金额
  let buyTotalMoney = 0;

  // 卖出的总金额
  let sellToalMoney = 0
  
  // 卖出的总份额
  let sellToTalLot = 0 

  // 总的份额
  let buyTotalLot = 0

  // 买入的记录日志
  let buyLogs = []

  // 卖出的记录日志
  let sellLogs = []

  // 缓存上一天的价格
  let prePrice = startPrice

  // 当天价格  如果当前价格小于上一天价格 触发买入检查  反之触发卖出检查
  let curPrice = 0;

  for(let j=0; j<Kline.length; j++) {
    curPrice = Kline[j]
    let isUp = curPrice > prePrice
    
    if(isUp) {
      // 卖出检查
      if(buyGrids.includes(curPrice)){
        console.log("触发了卖出信号----")
        sellNum ++ 
        // 找到需要卖的价格
        const {findData, otherData} = findDataBuyPrice(buyLogs, curPrice)
        buyLogs = otherData

        // 统计份额
        const currentTotal = findData.reduce((total, item)=>{
          return total + item.total
        }, 0)

        sellToalMoney = sellToalMoney + currentTotal * curPrice

        sellToTalLot = sellToTalLot + currentTotal

        sellLogs.push({
          price: curPrice,
          total: currentTotal
        })
        console.log(`当天价格${curPrice} :上一天价格${prePrice},触发--卖出检查,卖出${currentTotal}份额, 卖出总份额${sellToTalLot}, 剩下${buyTotalLot - sellToTalLot}份额`)
        console.log(`总卖出金额:${sellToalMoney}--总的份额:${sellToTalLot}--盈利金额${ sellToalMoney + curPrice * (buyTotalLot - sellToTalLot) - (buyTotalMoney)}`)
      }
    }else{
      // 买入检查, 是否达到买入条件
      if(buyGrids.includes(curPrice)){
        console.log("触发了买入信号&&&&")
        let currentBuyLot = itemTotal / curPrice
        buyTotalLot = buyTotalLot + currentBuyLot
        buyTotalMoney = buyTotalMoney + itemTotal
        buyLogs.push({
          price: curPrice, //买入时的价格
          total: itemTotal / curPrice //买入了多少份额
        })
        buyNum ++
        console.log(`当天价格${curPrice} :上一天价格${prePrice},触发--买入检查,买入${itemTotal / curPrice}份额`)
        console.log(`总投入金额:${buyTotalMoney}--总的份额:${buyTotalLot}--盈利金额${ sellToalMoney + curPrice * (buyTotalLot - sellToTalLot) - (buyTotalMoney)}`)
      }
    }
    
    console.log('------------------')
    prePrice = curPrice
  }

  console.log("查看买入日志")
  console.log("中共卖出", sellNum)
  console.log("买入次数", buyNum)
  console.log(buyLogs)
}

wanggeFun()



