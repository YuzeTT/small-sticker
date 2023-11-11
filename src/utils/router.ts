import LuckingCoffee from '/images/lucking_coffee.svg'
import Train from '/images/train.svg'
import Ticket_ from '/images/damai.png'
import Ticket from '/images/cinema_logo.png'
import Mcdonald from '/images/mcdonald.png'
import Heytea from '/images/heytea.png'
import Chagee from '/images/chagee.png'

const hot = ['#FEE2E2','#DC2626']
// const warn = ['#FEF3C7','#D97706']

const list = {
  done: [
    {
      name: ['沪上阿姨', 'ShangHaiShaoFu'],
      logo: '/images/hsay.jpg',
      url: '/tools/hsay',
      tag: '新上线',
      tag_color: hot
    },
    
    {
      name: ['茶百道', 'ChaPanda'],
      logo: '/images/chapanda.webp',
      url: '/tools/chapanda',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['古茗', 'GOOD ME'],
      logo: '/images/goodme.webp',
      url: '/tools/goodme',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['仿拍立得', 'I can\'t translate it'],
      logo: '/images/fpld.webp',
      url: '/fpld',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['大麦票根', 'DaMai Ticket'],
      logo: Ticket_,
      url: '/ticket',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['喜茶', 'Heytea'],
      logo: Heytea,
      url: '/tools/heytea',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['瑞幸咖啡', 'Lucking Coffee'],
      logo: LuckingCoffee,
      url: '/lucking_coffee',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['库迪咖啡', 'COTTI COFFEE'],
      logo: '/images/cotti.png',
      url: '/tools/cotti',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['照片打卡', 'Photo'],
      logo: '/images/photo.png',
      url: '/photo',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['路牌', 'Guideboard'],
      logo: '/images/guideboard.png',
      url: '/guideboard',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['蜜雪冰城', 'MXBC'],
      logo: '/images/mxbc.png',
      url: '/tools/mxbc',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['霸王茶姬', 'Chagee'],
      logo: Chagee,
      url: '/tools/chagee',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['观影纪念票', 'Ticket'],
      logo: Ticket,
      url: '/tools/cinema_ticket',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['高铁票', 'Train'],
      logo: Train,
      url: '/train',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['麦当劳', 'Mcdonald'],
      logo: Mcdonald,
      url: '/mcdonald',
      tag: '',
      tag_color: ['','']
    },
  ],
  todo: [
    {
      name: ['星巴克', 'Starbucks'],
      logo: '/images/starbucks.png',
    },
    {
      name: ['茶颜悦色', 'Sexy tea'],
      logo: '/images/sexytea.png',
    },
    {
      name: ['一点点', 'alittle tea'],
      logo: '/images/alittle-tea.png',
    },
    {
      name: ['CoCo都可', 'CoCo'],
      logo: '/images/coco.jpg',
    },
  ]
}

export default list
