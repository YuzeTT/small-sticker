// import LuckingCoffee from '/images/lucking_coffee.svg'
import Train from '/images/train.svg'
// import Ticket_ from '/images/damai.png'
import Ticket from '/images/cinema_logo.png'
import Mcdonald from '/images/mcdonald.png'
// import Heytea from '/images/heytea.png'
import Chagee from '/images/chagee.png'

const hot = ['#FEE2E2','#DC2626']
// const warn = ['#FEF3C7','#D97706']
// @unocss-include
const list = {
  done: [
    {
      name: ['人生四格', '2x2版 106mm*156mm(含3mm出血)'],
      logo: '/images/icons/rssg-2.webp',
      url: '/tools/rssg-2',
      color: ['#F1A050', '#F3AA3C'],
      tag: '新上线',
      tag_color: ['#dcfce7','#16a34a']
    },
    {
      name: ['Apple Music', '播放器 透卡/小卡 88.5mm*57m(含出血3mm)'],
      logo: '/images/icons/music.webp',
      url: '/tools/music',
      color: ['#EB4666', '#EF4146'],
      tag: '新上线',
      tag_color: ['#dcfce7','#16a34a']
    },
    {
      name: ['星巴克', '咖啡标签'],
      logo: '/images/starbucks.png',
      url: '/tools/starbucks',
      color: ['#116E49', '#0f8b5a'],
      tag: '新上线',
      tag_color: ['#dcfce7','#16a34a']
    },
    {
      name: ['人生二格', '85mm*54mm 明信片'],
      logo: '/images/icons/rseg.webp',
      url: '/tools/rseg',
      color: ['#F1A050', '#F3AA3C'],
      tag: '',
      tag_color: []
    },
    {
      name: ['人生四格', '50mm*150mm'],
      logo: '/images/icons/rssg.webp',
      url: '/tools/rssg',
      color: ['#F1A050', '#F3AA3C'],
      tag: '',
      tag_color: []
    },
    {
      name: ['Instagram', '三寸 小卡/透卡'],
      logo: '/images/icons/ins.webp',
      url: '/tools/instagram',
      color: ['#FFCF00', '#FF009E'],
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['茶百道', '奶茶标签'],
      logo: '/images/chapanda.webp',
      url: '/tools/chapanda',
      color: ['#0A4DDC', '#3676ff'],
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['古茗', '奶茶标签'],
      logo: '/images/icons/goodme.webp',
      url: '/tools/goodme',
      color: ['#4B4746', '#2E3746'],
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['仿拍立得', '三寸 小卡'],
      logo: '/images/fpld.webp',
      url: '/fpld',
      color: ['#5D39DA', '#7E42DD'],
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['大麦票根', '纪念票根'],
      logo: '/images/icons/damai.webp',
      url: '/ticket',
      color: ['#FF2869', '#ff5286'],
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['喜茶', '奶茶标签'],
      logo: '/images/icons/heytea.webp',
      url: '/tools/heytea',
      color: ['#EB4666', '#EF4146'],
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['瑞幸咖啡', '咖啡标签'],
      logo: '/images/icons/lucking_coffee.webp',
      url: '/lucking_coffee',
      color: ['#0022AB', '#1641eb'],
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['沪上阿姨', '奶茶标签'],
      logo: '/images/hsay.jpg',
      url: '/tools/hsay',
      color: ['#EB4666', '#EF4146'],
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['库迪咖啡', '咖啡标签'],
      logo: '/images/icons/cotti.webp',
      url: '/tools/cotti',
      color: ['#CF323B', '#ff6069'],
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['照片打卡', '纪念卡'],
      logo: '/images/photo.png',
      url: '/photo',
      color: ['#1254E2', '#2F70FA'],
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['路牌', '写啥都很土的小牌子 可加杆子'],
      logo: '/images/guideboard.png',
      url: '/guideboard',
      color: ['#1F4DA0', '#2869dd'],
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['蜜雪冰城', '奶茶标签'],
      logo: '/images/mxbc.png',
      url: '/tools/mxbc',
      color: ['#EB4666', '#EF4146'],
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['霸王茶姬', '奶茶标签'],
      logo: Chagee,
      url: '/tools/chagee',
      color: ['#EA1C24', '#ff4a51'],
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['观影纪念票', '纪念票根'],
      logo: Ticket,
      url: '/tools/cinema_ticket',
      color: ['#EB4666', '#EF4146'],
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['高铁票', '纪念票根'],
      logo: Train,
      url: '/train',
      color: ['#EB4666', '#EF4146'],
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['麦当劳', '小票'],
      logo: Mcdonald,
      url: '/mcdonald',
      color: ['#EB4666', '#EF4146'],
      tag: '',
      tag_color: ['','']
    },
  ],
  todo: [
    {
      name: ['茶颜悦色', '奶茶标签'],
      logo: '/images/sexytea.png',
    },
    {
      name: ['一点点', '奶茶标签'],
      logo: '/images/alittle-tea.png',
    },
    {
      name: ['CoCo都可', '奶茶标签'],
      logo: '/images/coco.jpg',
    },
    // {
    //   name: ['Instagram', '三寸 小卡/透卡'],
    //   logo: '/images/instagram/logo.webp',
    // },
  ]
}

export default list
