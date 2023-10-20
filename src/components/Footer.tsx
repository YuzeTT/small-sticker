import { Modal } from 'antd';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [userId2, setUserId2] = useState('')
  useEffect(()=>{
    const id2 = localStorage.getItem("id")
    if (id2) {
      setUserId2(id2);
    } else {
      console.log('f-noid');
    }
  }, [userId2])
  return (
    <div flex='~ items-center justify-center' pb-4>
      <div className='text-sm op-50' onClick={()=>{
        Modal.info({
          title: '调试信息',
          content: (
            <div>
              <p>版本：v0.2.60</p>
              <p>时间：{new Date().toLocaleString()}</p>
              <p>ID：{userId2}</p>
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
