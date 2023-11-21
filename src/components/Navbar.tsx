import { useLocation, useNavigate } from "react-router-dom"
// import { useLocation } from 'react-router';
import list from '../utils/router';
import AccountButton from "./AccountButton";
// import { useState } from 'react'
// import { Alert } from 'antd';
// import { useState } from "react";

// import { motion } from "framer-motion"

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation()
  // const h = 10
  // const hostname = window.location.hostname
  // const h = new Date().getHours()

  // @unocss-include
  // const time_list = [
  //   ['夜已深，注意休息哦！', 'i-ri-moon-cloudy-fill'], // 0,1,2
  //   ['晚安全世界，快去睡觉吧！', 'i-ri-sparkling-2-fill'], // 3,4,5
  //   ['早安呀！', 'i-ri-sun-foggy-fill'], // 6,7,8
  //   ['早生蚝！', 'i-ri-sun-cloudy-fill'], // 9,10,11
  //   ['中午咯~打个盹？', 'i-ri-sun-fill'], // 12,13,14
  //   ['下午好，继续加油哇！', 'i-ri-game-fill'], // 15,16,17
  //   ['吃了嘛！！', 'i-ri-restaurant-fill'], // 18,19,20
  //   ['累了一天吧，该睡觉咯~', 'i-ri-moon-foggy-fill'], // 21,22,23
  // ]

  // 获取问好消息
  // const getMsg = () => {
  //   switch (h) {
  //     case 15:
  //       return ['三点几嘞，做做做撚啊做！', 'i-ri-beer-fill']
  //     default:
  //       return time_list[Math.floor(h / 3)]
  //   }
  // }
  // const [showText , setShowText] = useState(false)
  // const location = useLocation()
  const tag = list.done.find((e)=> e.url === location.pathname)

  // const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  // const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('/sw.js').then((reg) => {
  //       setRegistration(reg);

  //       reg.addEventListener('controllerchange', () => {
  //         setUpdateAvailable(true);
  //       });
  //     });
  //   }
  // }, []);

  // const updateServiceWorker = () => {
  //   if (registration) {
  //     registration.update()
  //     setUpdateAvailable(false)
  //   }
  // };

  return (
    // style={{borderBottom :'1px solid #EFEFEF'}}
    <div overflow-hidden className={location.pathname==='/'?'hidden':'block bg-transparent'}>
      <div>
        <div className='h-[64px]' px-4 flex='~ items-center'>
            {/* <div className="i-ri-menu-fill text-2xl text-gray-500" /> */}
          {/* <div  flex-1 >
            {hostname === 'star.uztt.top'?
              <span className='px-2 py-1 bg-green-200 text-green-700 rounded-md text-sm font-500'>{'St'+'able'}</span>:
              <span className='px-2 py-1 bg-orange-200 text-orange-700 rounded-md text-sm font-500'>Beta</span>
            }
          </div> */}
          <div className="i-ri-arrow-left-s-line text-2xl mr-4" onClick={()=>{navigate('/')}} />
          <div className='flex-1'>
            <a flex='~ items-center' href='/' decoration-none text-zinc-900>
              <img src='/images/big-sticker_logo_2.webp' alt='logo' className='w-7 h-7' />
              <div className="ml-2 flex items-center">
                <div className="text-lg font-bold">大贴纸</div>
                {tag && <div className='ml-2 text-sm op50'>/ {tag.name[0]}</div>}
              </div>
              {/* <img src='/sticker_logo.png' alt='logo' className='w-8 h-8' /> */}
              {/* <div text='lg' font='bold'>大贴纸</div> */}
            </a>
          </div>
          {/* {tag?
            <div flex='~ items-center' bg-gray-50 px-2 py-1 rounded-full>
              <img src={tag.logo} alt="logo" w-5 h-5 mr-2 />
              <div>{tag.name}</div>
            </div>:''
          } */}
          {/* <button onClick={()=>{setShowText(!showText)}}></button> */}
          <AccountButton />
          {/* <motion.div className='flex justify-end flex-1 items-center space-x-2'> */}
             {/* <div className='flex items-center p-1 bg-zinc-100 rounded-xl card'>
                <div className='px-2'>
                  <div className='text-xs text-blue-500 font-bold'>有更新：v0.4.3</div>
                </div>
                <button type="button" className="px-3 py-1.5 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">更新</button>
              </div> */}
            {/* <a href="https://github.com/YuzeTT/small-sticker" className='decoration-none text-#1F2328'>
              <div className='i-ri-github-fill text-2xl'></div>
            </a> */}
            {/* <a href="/user" decoration-none min-w-8 h-7 px-3 rounded-full flex='~ items-center justify-center' className={`${isVip().is_vip?'bg-gradient-to-r from-[#E8BC86] to-[#E8C99B] text-sm text-zinc-800': 'bg-blue-500 text-white'}`}>
              <div className={`i-ri-vip-diamond-fill`} />
              <div className={`whitespace-nowrap overflow-hidden text-sm ml-1 `}>会员</div>
            </a> */}
            
          {/* </motion.div> */}
        </div>
      </div>
      {/* {isVip().level==100?
        <div className='px-2 pb-2'>
          <div id="toast-simple" className="flex items-center w-full p-4 space-x-3 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg card" role="alert">
              <div className="i-ri-passport-fill text-xl text-blue-500" />
              <div className="ps-4 text-sm font-normal flex justify-between items-center flex-1">
                <div>开发者模式已开启</div>
                <div>管理员：{isVip().name}</div>
              </div>
          </div>
        </div>:''
      } */}
      {/* <div px-4 pb-4 text='zinc-500' flex='~ items-center justify-center' >
        <div className={getMsg()[1]} text-lg text-blue-500></div>
        <div pl-2>{getMsg()[0]}</div>
      </div> */}
      {/* <Alert message="本站仅供娱乐，所造成的一切后果与本站无关" banner /> */}
    </div>
  )
}
