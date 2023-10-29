import LuckingCoffee from '/lucking_coffee.svg'
import Train from '/train.svg'
import Ticket_ from '/damai.png'
import Ticket from '/cinema_logo.png'
import Mcdonald from '/mcdonald.png'
import Heytea from '/heytea.png'
import Chagee from '/chagee.png'

const list = {
  done: [
    {
      name: ['大麦票根', 'DaMai Ticket'],
      logo: Ticket_,
      url: '/ticket',
      tag: '被举报'
    },
    {
      name: ['照片打卡', 'Photo'],
      logo: '/photo.png',
      url: '/photo',
      tag: '新上线'
    },
    {
      name: ['路牌', 'Guideboard'],
      logo: '/guideboard.png',
      url: '/guideboard',
      tag: '热门'
    },
    {
      name: ['喜茶', 'Heytea'],
      logo: Heytea,
      url: '/heytea',
      tag: '热门'
    },
    {
      name: ['瑞幸咖啡', 'Lucking Coffee'],
      logo: LuckingCoffee,
      url: '/lucking_coffee',
      tag: '热门'
    },
    {
      name: ['蜜雪冰城', 'MXBC'],
      logo: '/mxbc.png',
      url: '/mxbc',
      tag: ''
    },
    {
      name: ['霸王茶姬', 'Chagee'],
      logo: Chagee,
      url: '/chagee',
      tag: ''
    },
    {
      name: ['观影纪念票', 'Ticket'],
      logo: Ticket,
      url: '/cinema_ticket',
      tag: ''
    },
    {
      name: ['高铁票', 'Train'],
      logo: Train,
      url: '/train',
      tag: ''
    },
    {
      name: ['麦当劳', 'Mcdonald'],
      logo: Mcdonald,
      url: '/mcdonald',
      tag: ''
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
