import { Modal } from 'antd'
import list from '../utils/router'
import FollowMe from '../components/FollowMe';

export default function index() {

  const jumpBefore = (url: string) => {
    if(localStorage.getItem("isFollowMe")!=='true'){
      Modal.info({
        title: '使用必读',
        icon: null,
        content: (
          <div>
            <FollowMe />
          </div>
        ),
        onOk() {
          localStorage.setItem("isFollowMe", 'true')
          jump(url)
        },
        okText: '已关注且不再弹出',
      });
    } else {
      jump(url)
    }

  }
  
  const jump = (url: string) => {
    window.open(url)
  }
  return (
    <div className='max-w-xl mx-auto mt-4'>
      {/* <img src="/bei.png" alt="" rounded-xl w-full mb-2 /> */}
      <div p-4 bg='white' rounded-xl mb-4>
        <div text='xl zinc-800' font='bold'>公告</div>
        <div text='sm zinc-600' mt-3>BUG反馈/功能建议/摸鱼划水 QQ群: 752693422</div>
        <div text='sm zinc-600'>
          因为网站运营需要一定成本，如果您手中富裕不妨 <a href="/sponsor" decoration-none text-blue-500>支持一下</a> 网站运营！
        </div>
        <div text='sm zinc-600'>
          或者在 <a href="https://github.com/YuzeTT/small-sticker"  decoration-none text-blue-500>Github</a> 给我个Star 对我的帮助也非常大！！ 你可以 <a href="/hero"  decoration-none text-blue-500>在这里</a> 查看伟大的贡献者们！
        </div>
        <div text='sm orange-600' mt-2><b>安卓端夸克</b>暂时无法保存图片（iOS端夸克不受影响）另外如果你有办法解决欢迎联系（有赏）</div>
      </div>
      <div text='sm' op50 mb-2>已完成</div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
        {list.done.map((item, key)=>(
          <div p-4 bg-white  hover:bg-zinc-50 cursor-pointer rounded-xl decoration-none relative overflow-hidden className='z-0' key={key} onClick={()=>{jumpBefore(item.url)}}>
            <div className='z-20'>
              <div flex='~ items-start justify-between'>
                <div className='w-25 h-10 bg-contain bg-left bg-no-repeat' text='center' style={{backgroundImage: `url(${item.logo})`}} />
                {item.tag?
                  <div className='px-1 py-0.5 text-sm rounded' style={{backgroundColor: item.tag_color[0], color: item.tag_color[1]}}>{item.tag}</div>
                  :''
                }
              </div>
              <div mt-4 text='xl zinc-700'>{item.name[0]}</div>
              <div text='xs zinc-500'>{item.name[1]}</div>
            </div>
            {item.tag==='热门'?
              <div className='absolute top-0 right-0 z-0 w-full h-full bg-no-repeat bg-right-top' style={{backgroundImage: 'url(/card_bg_red.svg)'}}></div>
              :''
            }
          </div>
        ))}
      </div>
      <div text='sm' op50 mb-2 mt-4>待制作（或许赞助可以加速呢！）</div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 op50'>
        {list.todo.map((item, key)=>(
          <div p-4 bg-white hover:bg-zinc-50 rounded-xl decoration-none key={key} >
            <div flex='~ items-start justify-between'>
              <div w-14 h-10 text='center'>
                <img src={item.logo} alt="logo" h-10 w-auto mr-4 />
              </div>
            </div>
            <div className='mt-6' text='xl zinc-700'>{item.name[0]}</div>
            <div text='sm zinc-500'>{item.name[1]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
