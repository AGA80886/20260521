import 'dotenv/config'
import linebot from 'linebot'
import command2024TaiwanSeries from './commands/2024TaiwanSeries.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

bot.on('message', (event) => {
  if (event.message.type !== 'text') return

  if (event.message.text.startsWith('')) {
    command2024TaiwanSeries(event)
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
