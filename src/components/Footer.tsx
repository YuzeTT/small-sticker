import { Modal } from 'antd';

export default function Footer() {
  return (
    <div>
      <div flex='~ items-center justify-center' py-4 bg='white'>
        <div className='text-sm op-50' onClick={()=>{
          Modal.info({
            title: '调试信息',
            okText: '上传问题',
            closable: true,
            content: (
              <div>
                <p>版本：v0.3.2</p>
                <p>时间：{new Date().toLocaleString()}</p>
                <p>ID：{localStorage.getItem("id")}</p>
                <p>决断ID：{localStorage.getItem("userId")}</p>
                <p>上传后请将 决断ID 和 时间 反馈给开发者</p>
                <div text='sm red-500' className="-mt-1" flex='~ items-center'>
                  <div className="i-ri-error-warning-line mr-1" />
                  <div>您的操作过程将被上传，请注意隐私保护！</div>
                </div>
              </div>
            )
          });
        }}>© 2023 YuzeTT</div>
        <div text='sm' op10 mx-2>|</div>
        <a href='https://hsott.cn' className='decoration-none text-blue-500 op50 hover:op100 transition'>hsott.cn</a>
        <div text='sm' op10 mx-2>|</div>
        <a href='https://github.com/YuzeTT/small-sticker' className='decoration-none text-blue-500 op50 hover:op100 transition'>Github</a>
      </div>
      <div  text='sm' mt-2>友情链接：<a href='https://target.elfmc.com/' className='decoration-none text-blue-500 op50 hover:op100 transition'>POMOTIMER</a></div>
    </div>
  )
}
