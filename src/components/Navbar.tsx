import { Segmented } from 'antd';

export default function Navbar() {
  return (
    <div p-4>
      <div flex='~ items-center' mb-4>
        <img src='/sticker_logo.svg' alt='logo' className='w-8 h-8' mr-2 />
        <div text='lg' font='bold'>小贴纸</div>
      </div>
      <div w-full>
        <Segmented block={true} options={['瑞幸咖啡', '火车票', '淘票票']} />
      </div>
    </div>
  )
}
