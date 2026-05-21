export default () => ({
  type: 'bubble',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: '前端網頁技術與AI應用1期',
        weight: 'bold',
        size: 'xl',
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                color: '#aaaaaa',
                size: 'sm',
                flex: 2,
                text: '報名日期',
              },
              {
                type: 'text',
                text: '114/12/04 ~ 115/02/04',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 6,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '訓練日期',
                color: '#aaaaaa',
                size: 'sm',
                flex: 2,
              },
              {
                type: 'text',
                text: '115/03/16 ~ 115/09/01',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 6,
              },
            ],
          },
        ],
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'button',
        style: 'link',
        height: 'sm',
        action: {
          type: 'uri',
          label: '報名課程',
          uri: 'http://linecorp.com/',
        },
      },
      {
        type: 'box',
        layout: 'vertical',
        contents: [],
        margin: 'sm',
      },
    ],
    flex: 0,
  },
})
