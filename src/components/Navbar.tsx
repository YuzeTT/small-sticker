// import { useLocation } from "react-router-dom"
// import { useLocation } from 'react-router';
// import list from '../utils/router';
import { Alert } from 'antd';

export default function Navbar() {

  // const location = useLocation()
  // const tag = list.done.find((e)=> e.url === location.pathname)
  return (
    <div>
      <div>
        <div className='h-[64px]' px-4 flex='~ items-center justify-between'>
          <a flex='~ items-center' href='/' decoration-none text-zinc-900>
            <img src='/sticker_logo.svg' alt='logo' className='w-8 h-8' mr-2 />
            <div text='lg' font='bold'>小贴纸</div>
          </a>
          {/* {tag?
            <div flex='~ items-center' bg-gray-50 px-2 py-1 rounded-full>
              <img src={tag.logo} alt="logo" w-5 h-5 mr-2 />
              <div>{tag.name}</div>
            </div>:''
          } */}
          <a href="/sponsor" decoration-none text-zinc-900 px-5 py-2 bg-blue-100 rounded-full flex='~ items-center' className='animated-button'>
            <div className="i-ri-hand-heart-fill text-blue-500" mr-1 />
            <div text-blue-500>支持一下</div>
          </a>
        </div>
      </div>
      <Alert message="本站仅供娱乐，所造成的一切后果与本站无关" banner />
    </div>
  )
}
