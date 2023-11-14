import { message } from 'antd'
// import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import list from '../utils/router'
// import FollowMe from '../components/FollowMe';
import isVip from '../utils/isVip';

export default function index() {
  const navigate = useNavigate();

  const jumpBefore = (url: string) => {
    // if(localStorage.getItem("isFollowMe")!=='true'){
    //   Modal.info({
    //     title: '使用必读',
    //     icon: null,
    //     content: (
    //       <div>
    //         <FollowMe />
    //       </div>
    //     ),
    //     onOk() {
    //       localStorage.setItem("isFollowMe", 'true')
    //       jump(url)
    //     },
    //     okText: '已关注且不再弹出',
    //   });
    // } else {
      
    // }

    jump(url)

  }
  
  const jump = (url: string) => {
    navigate(url)
  }
  return (
    <div className='max-w-xl mx-auto'>
      <div className='p-2 rounded-2xl mb-4 card'>
        <div className='mb-3 mt-1 mx-2 text-zinc-600 text-sm'>快捷跳转</div>
        <div className='grid grid-cols-2 gap-2'>
          <CopyToClipboard text='752693422'
            onCopy={() => message.success({content:'已复制到剪贴板'})}>
            <div className='bg-[#0099FF15] rounded-lg p-4 flex items-center' data-clipboard-text='752693422'>
              <div className="i-ri-qq-fill text-2xl text-[#0099FF] mr-4" />
              <div>
                <div className='text-zinc-500 text-xs'>QQ群</div>
                <div className='font-bold mt-0.5'>752693422</div>
              </div>
            </div>
          </CopyToClipboard>
          <CopyToClipboard text='fusion_shuo'
            onCopy={() => message.success({content:'已复制到剪贴板'})}>
            <div className='bg-[#07C16015] rounded-lg p-4 flex items-center' >
              <div className="i-ri-wechat-fill text-2xl text-[#07C160] mr-4" />
              <div>
                <div className='text-zinc-500 text-xs'>微信群（加好友）</div>
                <div className='font-bold mt-0.5'>fusion_shuo</div>
              </div>
            </div>
          </CopyToClipboard>
          
          <a href='https://github.com/YuzeTT/small-sticker' className='text-zinc-800 bg-[#1F232810] rounded-lg p-4 flex items-center'>
            <div className="i-ri-github-fill text-2xl text-[#1F2328] mr-4" />
            <div>
              <div className='font-bold mt-0.5 text-lg'>Github</div>
            </div>
          </a>
          <a href='https://www.xiaohongshu.com/user/profile/5dbc28ee00000000010047ef' className='text-zinc-800 bg-[#FF274115] rounded-lg p-4 flex items-center' style={{border: '1px solid #F4F4F5'}}>
            <img src="/images/red.svg" alt="red" className='w-6 h-6 mr-4' />
            <div>
              <div className='font-bold mt-0.5 text-lg'>小红书</div>
            </div>
          </a>
          <a href='/user' className='bg-gradient-to-r from-[#E8BC86] to-[#E8C99B] text-white rounded-lg p-4 flex items-center col-span-2' style={{border: '1px solid #F4F4F5'}}>
            <div className="i-ri-vip-diamond-fill text-2xl mr-4" />
            <div>
              <div className='font-bold mt-0.5 text-lg'>支持一下 <span className='op80'>(建站低价)</span></div>
            </div>
          </a>
        </div>
      </div>
      
      <div text='sm' op50 mb-2>已完成</div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
        {list.done.map((item, key)=>(
          <div p-4  cursor-pointer rounded-xl decoration-none relative overflow-hidden className='z-0 card hover:bg-zinc-50 transition' key={key} onClick={()=>{jumpBefore(item.url)}}>
            <div className='z-20'>
              <div flex='~ items-start justify-between'>
                <div className='w-25 h-10 bg-contain bg-contain bg-left bg-no-repeat' text='center' style={{backgroundImage: `url(${item.logo})`}} />
                {item.tag?
                  <div className='px-1 py-0.5 text-xs rounded absolute right-2 top-2' style={{backgroundColor: item.tag_color[0], color: item.tag_color[1]}}>{item.tag}</div>
                  :''
                }
              </div>
              <div mt-4 text='xl zinc-700'>{item.name[0]}</div>
              <div text='xs zinc-500'>{item.name[1]}</div>
            </div>
            {item.tag==='热门'?
              <div className='absolute top-0 right-0 z-0 w-full h-full bg-no-repeat bg-right-top' style={{backgroundImage: 'url(/images/card_bg_red.svg)'}}></div>
              :''
            }
          </div>
        ))}
      </div>
      <div text='sm' op50 mb-2 mt-4>待制作（或许赞助可以加速呢！）</div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 op50'>
        {list.todo.map((item, key)=>(
          <div p-4 className='card hover:bg-zinc-50 transition' rounded-xl decoration-none key={key} >
            <div flex='~ items-start justify-between'>
              <div className='w-25 h-10 bg-contain bg-contain bg-left bg-no-repeat' text='center' style={{backgroundImage: `url(${item.logo})`}} />
            </div>
            <div className='mt-6' text='xl zinc-700'>{item.name[0]}</div>
            <div text='sm zinc-500'>{item.name[1]}</div>
          </div>
        ))}
      </div>
      {isVip().is_vip?'':
      <div className='card p-2 rounded-2xl mt-4'>
        <div className='mb-3 mt-1 mx-2 text-zinc-600 text-sm'>广告</div>
        <div className='grid grid-cols-2 gap-2'>
          <a href="https://fei.z2ajj.cn/?t=jpybajg" target='_blank' className='col-span-2'>
            <img src="/images/fly.webp" alt="fly" className='w-full rounded-xl overflow-hidden' style={{border: '1px solid #F4F4F5'}}/>
          </a>
        </div>
      </div>
      }
      
    </div>
  )
}
