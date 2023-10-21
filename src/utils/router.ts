import LuckingCoffee from '/lucking_coffee.svg'
import Train from '/train.svg'
import Maoyan from '/ticket.svg'
import Mcdonald from '/mcdonald.png'
import Heytea from '/heytea.png'

const list = {
  done: [
    {
      name: '猫眼电影',
      logo: Maoyan,
      url: '/maoyan',
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
  ],
  todo: [
    {
      name: '喜茶',
      logo: Heytea,
    },
  ]
}

export default list
