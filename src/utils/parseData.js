import dayjs from 'dayjs'

// 获取当前的时间格式化方式
export const formatTimeYYMMDD = (ns) => {
  return dayjs(ns).format('YYYY-MM-DD')
}

/**
 * 做数据解析
 * @param {arr} data
 */
export const parseCodeData = (data, filter) => {
  const xTime = []
  const yData = []
  const fData = []

  if (filter.startTime && filter.endTime) {
    data.map((item) => {
      if (
        item[0] > new Date(filter.startTime).getTime() &&
        item[0] < new Date(filter.endTime).getTime()
      ) {
        xTime.push(formatTimeYYMMDD(item[0]))
        yData.push(item[5])
        fData.push({
          price: item[5],
          time: item[0]
        })
      }
    })
  } else {
    data.map((item) => {
      xTime.push(formatTimeYYMMDD(item[0]))
      yData.push(item[5])
      fData.push({
        price: item[5],
        time: item[0]
      })
    })
  }

  return {
    time: xTime,
    data: yData,
    fData: fData
  }
}

/**
 * 定投: 必须定义一个预测的参考底部点位 [可以用前面的支持低位来参考]
 * 定投份额: 按照点位来分配
 *
 * 把日 和 周线的macd 金叉做参考 【看看日线和月线的macd有没有某种关系】
 *
 */

/**
 * 在定投后有盈利的标上面做下面方案
 * 使用方案一
 *
 * 第一次定额：50000
 * 逐日追加亏损值
 * 10%止盈
 */

/**
 * 第一种
 *      定额          定时间间隔投
 *      达到亏损比例累加定额投
 */
