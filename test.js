const utc = '2026-05-21 00:00:01' + 'Z'
const aaa = new Date(utc).toLocaleString('zh-TW', {
  timeZone: 'Asia/Taipei',
})

console.log(aaa)
