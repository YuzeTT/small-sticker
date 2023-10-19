import { Modal } from 'antd';

export default function Footer() {
  return (
    <div flex='~ items-center justify-center' pb-4>
      <div className='text-sm op-50' onClick={()=>{
        Modal.info({
          title: '调试信息',
          content: (
            <div>
              <p>版本：v0.2.60</p>
              <p>时间：{new Date().toLocaleString()}</p>
            </div>
          )
        });
      }}>© 2023 YuzeTT</div>
      <div text='sm' op10 mx-2>|</div>
      <a href='https://hsott.cn' className='decoration-none text-blue-500 op50 hover:op100 transition'>hsott.cn</a>
      <div text='sm' op10 mx-2>|</div>
      <a href='https://github.com/YuzeTT/small-sticker' className='decoration-none text-blue-500 op50 hover:op100 transition'>Github</a>
    </div>
  )
}
