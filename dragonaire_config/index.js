const xlsx = require('node-xlsx')
const fs = require('fs')
const path = require('path')

console.log(__dirname)

/**
 * group
 * @param {(_: any) => any} fn 
 * @param {any[]} list 
 */
function groupBy(fn, list) {
  return list.reduce((pv, cv) => {
    const key = fn(cv)
    if (key in pv) {
      pv[key].push(cv)
    } else {
      pv[key] = [cv]
    }
    return pv
  }, {})
}

/**
 * 
 * @param { any[] } arr 
 * @returns { any[] }
 */
function distinct(arr) {
  return Array.from(new Set(arr))
}

/**
 * 
 * @param {TruffleContract} contractInstance 
 */
function main(contractInstance) {
  console.log(` * 部署开始 * `)

  const xlsxPath = path.join(__dirname, 'boxConfig.xlsx')
  const worksheet = xlsx.parse(xlsxPath)
  /** @type{any[]} */
  const sheet1 = worksheet[0].data

  // 第一行为解释文字
  const data = sheet1.slice(1)

  const items = data.map((elm, i) => ({
    boxType: elm[0],
    artifactType: elm[6],
    itemId: elm[2],
    percent: elm[8] * 10000
  }))

  // 1. 依据盲盒类型分
  const groupByBoxType = groupBy(item => item.boxType, items)

  const configJsonPath = path.join(__dirname, '..', 'src', 'Constants', 'DragonConfig.json')
  fs.writeFileSync(configJsonPath, JSON.stringify(groupByBoxType))
  
}

main()
