import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../templates/course.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)

    const bubbles = []

    $('#go .card').each(function () {
      const course = template()
      // 課程名稱
      course.body.contents[0].text = $(this).find('.card-category').text()
      // 報名日期
      course.body.contents[1].contents[0].contents[1].text = $(this)
        .find('.card-description')
        .html()
        .trim()
        .split('<br>')[0]
        .trim()
        .replace('報名日期：', '')
      // 訓練日期
      course.body.contents[1].contents[1].contents[1].text = $(this)
        .find('.card-description')
        .html()
        .trim()
        .split('<br>')[1]
        .trim()
        .replace('訓練日期：', '')
      // 報名
      course.footer.contents[0].action.uri = $(this).find('a').attr('href')
      bubbles.push(course)
    })

    await event.reply({
      type: 'flex',
      altText: '匯率查詢結果',
      contents: {
        type: 'carousel',
        contents: bubbles,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
