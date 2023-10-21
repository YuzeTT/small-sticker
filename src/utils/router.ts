import LuckingCoffee from '/lucking_coffee.svg'
import Train from '/train.svg'
import Maoyan from '/maoyan.png'
import Mcdonald from '/mcdonald.png'
import Heytea from '/heytea.png'

const list = {
  done: [
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
      tag: '新上线'
    },
    {
      name: '麦当劳',
      logo: Mcdonald,
      url: '/mcdonald',
      tag: '新上线'
    },
    {
      name: '猫眼电影',
      logo: Maoyan,
      url: '/maoyan',
      tag: 'Beta'
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
