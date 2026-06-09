import fs from 'node:fs'

export default async (event) => {
  try {
    const userMessage = event.message.text

    const json = fs.readFileSync('./2024年台灣大賽/CPBL-2024-TaiwanSeries-G1.json', 'utf-8')

    const data = JSON.parse(json)

    const name = userMessage.replace('查詢', '').trim()

    const batters = [...data.awayBatterBox, ...data.homeBatterBox]

    const batter = batters.find((p) => p.playerName === name)

    const pitchers = [...data.awayPitcherBox, ...data.homePitcherBox]

    const pitcher = pitchers.find((p) => p.playerName === name)

    let reply = ''

    if (userMessage === '比賽結果') {
      const awayScores = data.awayScores.reduce((sum, score) => sum + Number(score), 0)
      const homeScores = data.homeScores.reduce((sum, score) => sum + Number(score), 0)

      reply = `${data.season}G${data.seq}
日期:${data.date}
場地:${data.stadium}
比數:
${data.awayTeam}-${awayScores}
VS
${data.homeTeam}-${homeScores}
勝利投手:德保拉(1W)
中繼成功:高塩將樹(1H)、林子崴(1H)
敗戰投手:王鏡銘(1L)
單場MVP:德保拉
勝利打點:岳政華（六局下）
全壘打:曾頌恩(1)
比賽時間:03:33`
    } else if (batter) {
      const batterBB = batter.BB + batter.IBB + batter.HBP

      reply = `打者:${batter.playerName}
打席:${batter.PA}
打數:${batter.AB}
安打:${batter.H}
全壘打:${batter.HR}
打點:${batter.RBI}
得分:${batter.R}
保送:${batterBB}`
    } else if (pitcher) {
      const pitcherBB = pitcher.BB + pitcher.IBB + pitcher.HB
      const pitcherIP = Math.floor(pitcher.IPOuts / 3) + '.' + (pitcher.IPOuts % 3)

      reply = `投手:${pitcher.playerName}
投球局數:${pitcherIP}
用球數:${pitcher.NP}
面對打席:${pitcher.BF}
被安打:${pitcher.H}
被全壘打:${pitcher.HR}
奪三振:${pitcher.SO}
四死球:${pitcherBB}
失分:${pitcher.R}
責失分:${pitcher.ER}`
    } else {
      reply = '此球員未出賽'
    }

    await event.reply(reply)
  } catch (error) {
    console.error(error)

    await event.reply('此球員未出賽')
  }
}
