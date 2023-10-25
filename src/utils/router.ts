import LuckingCoffee from '/lucking_coffee.svg'
import Train from '/train.svg'
import Ticket_ from '/ticket.svg'
import Ticket from '/cinema_logo.png'
import Mcdonald from '/mcdonald.png'
import Heytea from '/heytea.png'
import Chagee from '/chagee.png'

const list = {
  done: [
    {
      name: ['喜茶', 'Heytea'],
      logo: Heytea,
      url: 'heytea',
      tag: '新上线'
    },
    {
      name: ['观影纪念票', 'Ticket'],
      logo: Ticket,
      url: '/cinema_ticket',
      tag: ''
    },
    {
      name: ['瑞幸咖啡', 'Lucking Coffee'],
      logo: LuckingCoffee,
      url: '/lucking_coffee',
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
    {
      name: ['某麦票根', 'Mai Ticket'],
      logo: Ticket_,
      url: '/ticket',
      tag: '开发中'
    },
  ],
  todo: [
    {
      name: ['霸王茶姬', 'Chagee'],
      logo: Chagee
    }
  ]
}

export default list
