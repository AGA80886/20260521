import axios from 'axios'
// node 內建的檔案系統功能，不需要 npm 安裝
import fs from 'node:fs'
import template from '../templates/exrate.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://tw.rter.info/capi.php')

    // 美元卡片
    const usd = template()
    usd.body.contents[0].text = 'USD'
    usd.body.contents[1].text = data.USDTWD.Exrate.toString()
    usd.body.contents[2].text = new Date(data.USDTWD.UTC + 'Z').toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
    })
    // 日圓卡片
    const jpy = template()
    jpy.body.contents[0].text = 'JPY'
    jpy.body.contents[1].text = (data.USDTWD.Exrate / data.USDJPY.Exrate).toFixed(3).toString()
    jpy.body.contents[2].text = new Date(data.USDJPY.UTC + 'Z').toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
    })
    // 人民幣卡片
    const cny = template()
    cny.body.contents[0].text = 'CNY'
    cny.body.contents[1].text = (data.USDTWD.Exrate / data.USDCNY.Exrate).toFixed(3).toString()
    cny.body.contents[2].text = new Date(data.USDCNY.UTC + 'Z').toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
    })

    const message = {
      type: 'flex',
      altText: '匯率查詢結果',
      contents: {
        type: 'carousel',
        contents: [usd, jpy, cny],
      },
    }
    const result = await event.reply(message)

    // 如果有設定環境變數 DEBUG，而且回覆的訊息有錯誤時，印出 json
    if (process.env.DEBUG && result.message) {
      // fs.writeFileSync(相對於 index.js 的檔案路徑, 寫入內容)
      // JSON.stringify(物件變數, null, 縮排空白)
      fs.writeFileSync('./dump/exrate.json', JSON.stringify(message, null, 2))
    }
  } catch (error) {
    console.error(error)
  }
}
