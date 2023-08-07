/**
 * 
 * @param {*} buyData 需要买入的价格设置
 * @param {*} sellData 需要卖出的价格设置
 */
function BuildBuyOrSellTime (buyData=[], sellData=[]) {

  this.cacheBuyPrice = {}
  this.buyData = buyData
  this.sellData = sellData

  // 卖出时机判断
  const checkedSellTime = (price) => {
    return this.sellData.some(item => {
      if(price >= item && this.cacheBuyPrice[item]) {
        console.log('----------')
        console.log(`价格为${price},触发涨幅${item}价格线卖出机会`)
        this.cacheBuyPrice[item] = false
        return true
      }
      return false
    })
  }


  // 买入时机判断
  // 判断传入的价格是否击穿了买入的价格刻度  一个价格刻度触发了买入需要标记
  const checkedBuyTime = (price) => {
    return this.buyData.some((item) => {
      if(price <= item && !this.cacheBuyPrice[item]) {
        console.log('----------')
        console.log(`价格为${price},触发跌破${item}价格线买入机会`)
        this.cacheBuyPrice[item] = true 
        return true;
      }
      return false
    })
  }


  return {
    checkedBuyTime,
    checkedSellTime
  }
}


const checkedPrice = new BuildBuyOrSellTime([9,8.5,8,7.5], [9,8.5,8,7.5])

console.log(checkedPrice.checkedBuyTime(8.5))
console.log(checkedPrice.checkedBuyTime(8))

console.log(checkedPrice.checkedSellTime(9))
console.log(checkedPrice.checkedSellTime(8.8))

