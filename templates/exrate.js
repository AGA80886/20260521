export default () => ({
  type: 'bubble',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'USD',
        weight: 'bold',
        color: '#1DB446',
        size: 'sm',
      },
      {
        type: 'text',
        text: '31.588',
        weight: 'bold',
        size: 'xxl',
      },
      {
        type: 'text',
        text: '',
        size: 'xs',
        color: '#aaaaaa',
      },
    ],
  },
  styles: {
    footer: {
      separator: true,
    },
  },
})
