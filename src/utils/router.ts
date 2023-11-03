import LuckingCoffee from '/lucking_coffee.svg'
import Train from '/train.svg'
import Ticket_ from '/damai.png'
import Ticket from '/cinema_logo.png'
import Mcdonald from '/mcdonald.png'
import Heytea from '/heytea.png'
import Chagee from '/chagee.png'

const hot = ['#FEE2E2','#DC2626']
const warn = ['#FEF3C7','#D97706']

const list = {
  done: [
    {
      name: ['古茗', 'GOOD ME'],
      logo: '/goodme.webp',
      url: '/goodme',
      tag: '测试',
      tag_color: warn
    },
    {
      name: ['仿拍立得', 'I can\'t translate it'],
      logo: '/fpld.webp',
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
      url: '/heytea',
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
      name: ['照片打卡', 'Photo'],
      logo: '/photo.png',
      url: '/photo',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['路牌', 'Guideboard'],
      logo: '/guideboard.png',
      url: '/guideboard',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['蜜雪冰城', 'MXBC'],
      logo: '/mxbc.png',
      url: '/mxbc',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['霸王茶姬', 'Chagee'],
      logo: Chagee,
      url: '/chagee',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['观影纪念票', 'Ticket'],
      logo: Ticket,
      url: '/cinema_ticket',
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
      name: ['茶颜悦色', 'Sexy tea'],
      logo: '/sexytea.png',
    },
    {
      name: ['星巴克', 'Starbucks'],
      logo: '/starbucks.png',
    },
    {
      name: ['一点点', 'alittle tea'],
      logo: '/alittle-tea.png',
    },
    {
      name: ['库迪咖啡', 'COTTI COFFEE'],
      logo: '/cotti.png',
    },
  ]
}

export default list
