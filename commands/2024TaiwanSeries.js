console.log(process.cwd())
console.log(fs.existsSync('./2024台灣大賽'))
console.log(fs.existsSync('./commands/CPBL-2024-TaiwanSeries-G1.json'))

import fs from 'node:fs'

export default async (event) => {
  try {
    const userMessage = event.message.text

    const gameFiles = {
      G1: './commands/CPBL-2024-TaiwanSeries-G1.json',
      G2: './commands/CPBL-2024-TaiwanSeries-G2.json',
      G3: './commands/CPBL-2024-TaiwanSeries-G3.json',
      G4: './commands/CPBL-2024-TaiwanSeries-G4.json',
      G5: './commands/CPBL-2024-TaiwanSeries-G5.json',
    }
    const games = Object.values(gameFiles)

    const gameInfo = {
      G1: {
        win: ['德保拉(1W)'],
        lose: ['王鏡銘(1L)'],
        hold: ['高塩將樹(1H)', '林子崴(1H)'],
        save: [],
        mvp: ['德保拉'],
        gameWinningRBI: ['岳政華(六局下)'],
        hr: ['曾頌恩(1)'],
        time: ['3小時33分'],
      },

      G2: {
        win: ['勝騎士(1W)'],
        lose: ['猛登(1L)'],
        hold: ['裴瑞茲(1H)'],
        save: [],
        mvp: ['林祖傑'],
        gameWinningRBI: ['陳重羽(二局上)'],
        hr: ['岳政華(1)'],
        time: ['3小時30分'],
      },

      G3: {
        win: ['克迪(1W)'],
        lose: ['羅昂(1L)'],
        hold: ['呂彥青(1H)'],
        save: [],
        mvp: ['呂彥青'],
        gameWinningRBI: ['宋晟睿(三局上)'],
        hr: ['曾頌恩(2)'],
        time: ['3小時37分'],
      },

      G4: {
        win: ['鄭凱文(1W)'],
        lose: ['林詔恩(1L)'],
        hold: ['吳俊偉(1H)、李振昌(1H)'],
        save: ['呂彥青(1S)'],
        mvp: ['陳子豪'],
        gameWinningRBI: ['陳子豪(五局上)'],
        hr: ['陳子豪(1)'],
        time: ['3小時02分'],
      },

      G5: {
        win: ['德保拉(2W)'],
        lose: ['勝騎士(1W1L)'],
        hold: [],
        save: ['吳俊偉(1S)'],
        mvp: ['德保拉'],
        gameWinningRBI: ['曾頌恩(一局下)'],
        hr: [],
        time: ['2小時50分'],
      },
    }

    if (userMessage.startsWith('總冠軍球隊及個人獎項')) {
      const reply = `總冠軍球隊：中信兄弟(4勝1負)

台灣大賽FMVP：曾頌恩

優秀球員獎(勝隊)：德保拉

優秀球員獎(敗隊)：林佳緯`
      await event.reply(reply)
      return
    }

    if (userMessage.startsWith('中信兄弟選手名單')) {
      const CTBCList = {
        p: [
          '克迪、鄭凱文、李振昌、德保拉、余謙、蔡齊哲、王奕凱、陳柏均、呂彥青、陳琥、黃恩賜、謝榮豪、猛登、吳俊偉',
        ],
        c: ['林吳晉瑋、陳統恩、高宇杰'],
        if: ['張士綸、王威晨、陳俊秀、林志綱、王政順、許基宏、江坤宇、岳東華'],
        of: ['陳子豪、張志豪、曾頌恩、詹子賢、林書逸、宋晟睿、岳政華'],
      }

      const reply = `投手(14名)：${CTBCList.p.join('、')}

捕手(3名)：${CTBCList.c.join('、')}

內野手(8名)：${CTBCList.if.join('、')}

外野手(7名)：${CTBCList.of.join('、')}`
      await event.reply(reply)
      return
    }

    if (userMessage.startsWith('統一7-ELEVEn獅選手名單')) {
      const UNIList = {
        p: [
          '陳韻文、郭俊麟、林子崴、古林睿煬、勝騎士、高塩將樹、邱浩鈞、黃竣彥、王鏡銘、裴瑞茲、羅昂、吳承諭、胡智爲、辛俊昇、林詔恩',
        ],
        c: ['林岱安、柯育民、陳重羽'],
        if: ['許哲晏、陳鏞基、陳聖平、潘傑楷、張皓崴、林祖傑、陳重廷、林益全'],
        of: ['邱智呈、林佳緯、陳傑憲、蘇智傑、胡金龍、林安可'],
      }

      const reply = `投手(15名)：${UNIList.p.join('、')}

捕手(3名)：${UNIList.c.join('、')}

內野手(8名)：${UNIList.if.join('、')}

外野手(6名)：${UNIList.of.join('、')}`
      await event.reply(reply)
      return
    }

    if (userMessage.startsWith('比賽結果')) {
      const gameNo = userMessage.replace('比賽結果', '').trim()

      const file = gameFiles[gameNo]

      if (!file) {
        await event.reply('請輸入：比賽結果 G1 ~ G5')
        return
      }

      const json = fs.readFileSync(file, 'utf-8')
      const data = JSON.parse(json)

      const awayScores = data.awayScores.reduce((sum, score) => sum + Number(score), 0)

      const homeScores = data.homeScores.reduce((sum, score) => sum + Number(score), 0)

      const info = gameInfo[gameNo]

      const reply = `${data.season} G${data.seq}
日期：${data.date}
場地：${data.stadium}
比數：
${data.awayTeam} ${awayScores}
VS
${data.homeTeam} ${homeScores}
勝投：${info.win}
敗投：${info.lose}
中繼成功：${info.hold.length > 0 ? info.hold.join('、') : '無'}
救援成功:${info.save.length > 0 ? info.save.join('、') : '無'}
MVP：${info.mvp}
勝利打點：${info.gameWinningRBI}
全壘打：${info.hr.length > 0 ? info.hr.join('、') : '無'}
比賽時間：${info.time}`

      await event.reply(reply)
      return
    }

    let foundBatter = null
    let totalPA = 0
    let totalAB = 0
    let totalH = 0
    let totalHR = 0
    let totalRBI = 0
    let totalR = 0
    let totalBB = 0

    let foundPitcher = null
    let totalIPOuts = 0
    let totalNP = 0
    let totalBF = 0
    let totalPH = 0
    let totalPHR = 0
    let totalSO = 0
    let totalPBB = 0
    let totalPR = 0
    let totalER = 0

    const name = userMessage.replace('查詢', '').trim()

    for (const game of games) {
      const json = fs.readFileSync(game, 'utf-8')

      const data = JSON.parse(json)

      const batters = [...data.awayBatterBox, ...data.homeBatterBox]

      const batter = batters.find((p) => p.playerName === name)
      console.log('查詢名字:', name)
      console.log('找到球員:', batter?.playerName)

      const pitchers = [...data.awayPitcherBox, ...data.homePitcherBox]

      const pitcher = pitchers.find((p) => p.playerName === name)

      if (batter) {
        foundBatter = batter
        const batterBB = Number(batter.BB) + Number(batter.IBB) + Number(batter.HBP)
        totalPA += Number(batter.PA)
        totalAB += Number(batter.AB)
        totalH += Number(batter.H)
        totalHR += Number(batter.HR)
        totalRBI += Number(batter.RBI)
        totalR += Number(batter.R)
        totalBB += Number(batterBB)
      }

      if (pitcher) {
        foundPitcher = pitcher
        const pitcherBB = Number(pitcher.BB) + Number(pitcher.IBB) + Number(pitcher.HB)
        totalIPOuts += Number(pitcher.IPOuts)
        totalNP += Number(pitcher.NP)
        totalBF += Number(pitcher.BF)
        totalPH += Number(pitcher.H)
        totalPHR += Number(pitcher.HR)
        totalSO += Number(pitcher.SO)
        totalPBB += Number(pitcherBB)
        totalPR += Number(pitcher.R)
        totalER += Number(pitcher.ER)
      }
    }
    const totalIP = Math.floor(totalIPOuts / 3) + '.' + (totalIPOuts % 3)

    let reply = ''
    const AVG = totalAB === 0 ? '.000' : (totalH / totalAB).toFixed(3).replace('0.', '.')

    if (foundBatter) {
      reply = `打者:${foundBatter.playerName}
打席:${totalPA}
打數:${totalAB}
打擊率:${AVG}
安打:${totalH}
全壘打:${totalHR}
打點:${totalRBI}
得分:${totalR}
保送:${totalBB}`
    } else if (foundPitcher) {
      reply = `投手:${foundPitcher.playerName}
投球局數:${totalIP}
用球數:${totalNP}
面對打席:${totalBF}
被安打:${totalPH}
被全壘打:${totalPHR}
奪三振:${totalSO}
四死球:${totalPBB}
失分:${totalPR}
責失分:${totalER}`
    } else {
      reply = '此球員未出賽'
    }

    await event.reply(reply)
  } catch (error) {
    console.error(error)

    await event.reply('此球員未出賽')
  }
}
