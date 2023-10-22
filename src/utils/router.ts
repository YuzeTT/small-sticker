import LuckingCoffee from '/lucking_coffee.svg'
import Train from '/train.svg'
import Ticket_ from '/ticket.svg'
import Ticket from '/cinema_logo.png'
import Mcdonald from '/mcdonald.png'
import Heytea from '/heytea.png'

const list = {
  done: [
    {
      name: '观影纪念票',
      logo: Ticket,
      url: '/cinema_ticket',
      tag: '全新升级'
    },
    {
      name: '瑞幸咖啡',
      logo: LuckingCoffee,
      url: '/lucking_coffee',
      tag: ''
    },
    {
      name: '高铁票',
      logo: Train,
      url: '/train',
      tag: ''
    },
    {
      name: '麦当劳',
      logo: Mcdonald,
      url: '/mcdonald',
      tag: ''
    },
    {
      name: '喜茶',
      logo: Heytea,
      url: 'heytea',
      tag: 'Beta'
    },
  ],
  todo: [
    {
      name: '演唱会票根',
      logo: Ticket_,
    },
  ]
}

export default list
