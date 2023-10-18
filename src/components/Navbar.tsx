// import { useLocation } from "react-router-dom"
import { useLocation } from 'react-router';
import list from '../utils/router';

export default function Navbar() {

  const location = useLocation()
  const tag = list.done.find((e)=> e.url === location.pathname)
  return (
    <div p-4>
      <div flex='~ items-center justify-between'>
        <a flex='~ items-center' href='/' decoration-none text-zinc-900>
          <img src='/sticker_logo.svg' alt='logo' className='w-8 h-8' mr-2 />
          <div text='lg' font='bold'>小贴纸</div>
        </a>
        {tag?
          <div flex='~ items-center' bg-gray-50 px-2 py-1 rounded-full>
            <img src={tag.logo} alt="logo" w-5 h-5 mr-2 />
            <div>{tag.name}</div>
          </div>:''
        }
      </div>
    </div>
  )
}
