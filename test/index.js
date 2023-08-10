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
    const sortFindData = findData.sort((a, b) => a.price - b.price)
    findData = sortFindData.shift()
    otherData = [...sortFindData, ...otherData]
    // 找到最小价格
    return { findData, otherData }
  }
}

const sData = [{ price: 9 }, { price: 8 }, { price: 7 }, { price: 6 }, { price: 5 }]
const { findData, otherData } = findDataBuyPrice(sData, 8)
console.log(findData, otherData)
