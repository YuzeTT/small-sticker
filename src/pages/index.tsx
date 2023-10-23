import { Alert, Tag } from 'antd'
import list from '../utils/router'
export default function index() {

  return (
    <div className='max-w-xl mx-auto mt-2'>
      <Alert
        message="公告"
        closable
        description={<>
          <div>BUG反馈/功能建议/摸鱼划水 欢迎加入QQ群: <b>752693422</b> 获得最新更新通知哦！！</div>
          {/* <div>小程序</div> */}
          <div>因为网站运营需要一定成本，如果您手中富裕不妨 <a href="/sponsor">支持一下</a> 网站运营！</div>
          <div>或者在 <a href="https://github.com/YuzeTT/small-sticker">Github</a> 给我个Star 对我的帮助也非常大！！ 你可以 <a href="/hero">在这里</a> 查看伟大的贡献者们！</div>
        </>}
        type="info"
        className='mb-2 mt-4'
      />
      {/* <Alert message="🎉 喜报：高铁票已上线" type="error" className='mb-2' /> */}
      <div text='sm' op50 mb-2>已完成</div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        {list.done.map((item, key)=>(
          <a href={item.url} p-4 bg-zinc-50 hover:bg-zinc-100 cursor-pointer rounded-xl decoration-none flex='~ items-center' key={key} >
            <div w-14 h-10 text='center'>
              <img src={item.logo} alt="logo" h-10 w-auto mr-4 />
            </div>
            <div text='lg zinc-900'>{item.name}</div>
            {item.tag?<Tag className='ml-2' color={item.tag==='开发中'? 'magenta':'red'}>{item.tag}</Tag>:''}
            <div  flex-1></div>
            <div className='i-ri-arrow-right-s-line' text='xl zinc-300' />
          </a>
        ))}
      </div>
      <div text='sm' op50 mb-2 mt-4>待制作（或许赞助可以加速呢！）</div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        {list.todo.map((item, key)=>(
          <div p-4 bg-zinc-50 hover:bg-zinc-100 cursor-not-allowed rounded-xl flex='~ items-center' key={key}>
            <img src={item.logo} alt="logo" h-10 w-10 mr-4 op50 />
            <div text='lg zinc-400'>{item.name}</div>
            <div  flex-1></div>
            <div className='i-ri-arrow-right-s-line' text='xl zinc-300' />
          </div>
        ))}
      </div>
    </div>
  )
}
