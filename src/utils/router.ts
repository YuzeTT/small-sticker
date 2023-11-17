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
      name: ['人生四格', '50mm*150mm'],
      logo: '/images/rssg.webp',
      url: '/tools/rssg',
      tag: '新上线',
      tag_color: ['#dcfce7','#16a34a']
    },
    {
      name: ['人生二格', '85mm*54mm 明信片'],
      logo: '/images/rslg.webp',
      url: '/tools/rseg',
      tag: '新上线',
      tag_color: ['#dcfce7','#16a34a']
    },
    {
      name: ['Instagram', '三寸 小卡/透卡'],
      logo: '/images/instagram/logo.webp',
      url: '/tools/instagram',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['茶百道', '奶茶标签'],
      logo: '/images/chapanda.webp',
      url: '/tools/chapanda',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['古茗', '奶茶标签'],
      logo: '/images/goodme.webp',
      url: '/tools/goodme',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['仿拍立得', '三寸 小卡'],
      logo: '/images/fpld.webp',
      url: '/fpld',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['大麦票根', '纪念票根'],
      logo: Ticket_,
      url: '/ticket',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['喜茶', '奶茶标签'],
      logo: Heytea,
      url: '/tools/heytea',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['瑞幸咖啡', '咖啡标签'],
      logo: LuckingCoffee,
      url: '/lucking_coffee',
      tag: '热门',
      tag_color: hot
    },
    {
      name: ['沪上阿姨', '奶茶标签'],
      logo: '/images/hsay.jpg',
      url: '/tools/hsay',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['库迪咖啡', '咖啡标签'],
      logo: '/images/cotti.png',
      url: '/tools/cotti',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['照片打卡', '纪念卡'],
      logo: '/images/photo.png',
      url: '/photo',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['路牌', '你懂的'],
      logo: '/images/guideboard.png',
      url: '/guideboard',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['蜜雪冰城', '奶茶标签'],
      logo: '/images/mxbc.png',
      url: '/tools/mxbc',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['霸王茶姬', '奶茶标签'],
      logo: Chagee,
      url: '/tools/chagee',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['观影纪念票', '纪念票根'],
      logo: Ticket,
      url: '/tools/cinema_ticket',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['高铁票', '纪念票根'],
      logo: Train,
      url: '/train',
      tag: '',
      tag_color: ['','']
    },
    {
      name: ['麦当劳', '小票'],
      logo: Mcdonald,
      url: '/mcdonald',
      tag: '',
      tag_color: ['','']
    },
  ],
  todo: [
    {
      name: ['星巴克', '咖啡标签'],
      logo: '/images/starbucks.png',
    },
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
