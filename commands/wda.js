export default async (event) => {
  try {
    await event.reply({
      type: 'text',
      text: '請選擇查詢項目',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              // 打開網站
              type: 'uri',
              uri: 'https://wdaweb.github.io/',
              label: '前往課程介紹',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              text: '匯率',
              label: '匯率',
            },
          },
          {
            type: 'action',
            action: {
              type: 'postback',
              data: 'course',
              label: '報名課程',
            },
          },
        ],
      },
    })
  } catch (error) {
    console.error(error)
  }
}
