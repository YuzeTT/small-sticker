// import { Segmented } from 'antd';

export default function Navbar() {
  return (
    <div p-4>
      <div flex='~ items-center'>
        <img src='/sticker_logo.svg' alt='logo' className='w-8 h-8' mr-2 />
        <div text='lg' font='bold'>小贴纸</div>
      </div>
    </div>
  )
}
