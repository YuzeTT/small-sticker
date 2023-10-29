import { ReactNode, useState } from "react";
import { Modal } from 'antd';

const { confirm } = Modal;

export default function HiddenLogo({children}:{children: ReactNode}) {
  const [isShow , setIsShow] = useState(false)
  const show = () => {
    confirm({
      title: '免责声明',
      content: '加入Logo是您的个人行为，所造成的直接或间接后果与本站无关。',
      okText: '我同意并显示Logo',
      cancelText: '不同意并隐藏',
      onOk() {
        console.log('OK');
        setIsShow(true)
      },
      onCancel() {
        console.log('Cancel');
        setIsShow(false)
      },
    });
  }
  return (
    <div className='relative'>
      {children}
      <div className='bg-zinc-200  absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center' style={{opacity: isShow?'0':'1'}} onClick={()=>{show()}}>
        <div className='op50 text-sm'>点击显示LOGO</div>
      </div>
    </div>
  )
}
