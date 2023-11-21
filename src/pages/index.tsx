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
    jump(url)
  }
  
  const jump = (url: string) => {
    navigate(url)
  }

  // const h = 0
  const h = new Date().getHours()


  const time_list = [
    '夜已深，注意休息哦！', // 0,1,2
    '快去睡觉吧！', // 3,4,5
    '早安呀！',  // 6,7,8
    '早生蚝！', // 9,10,11
    '记得按时吃饭哦！', // 12,13,14
    '下午好！', // 15,16,17
    '吃了嘛！！', // 18,19,20
    '累了一天，该休息啦~', // 21,22,23
  ]

  const getMsg = () => {
    switch (h) {
      case 15:
        return '三点几嘞！'
      default:
        return time_list[Math.floor(h / 3)]
    }
  }

  return (
    <div className='max-w-xl mx-auto relative z-10'>
      <div className='w-40 h-40 rounded-full bg-blue-100 absolute -top-10 -left-10 z-0 blur-circle'></div>
      <div className='w-40 h-40 rounded-full bg-green-100 absolute top-10 -right-10 z-0 blur-circle'></div>
      <div className='w-40 h-40 rounded-full bg-purple-100 absolute top-30 left-10 z-0 blur-circle'></div>
      <div className='my-4 relative p-4'>
        <img src='/images/big-sticker_logo_2.webp' alt='logo' className='w-12 h-12' />
        <div className='text-3xl op90 mt-5'>{getMsg()}</div>
        <div className='text-lg op90 mt-2'>欢迎来到大贴纸的全新站点~</div>

        <div className='flex gap-4 items-center relative mt-4'>
          <CopyToClipboard text='752693422'
            onCopy={() => message.success({content:'QQ群号 已复制'})}>
            <div className="bg-white h-8 w-8 flex items-center justify-center rounded-md">
              <div className="i-ri-qq-fill text-xl text-[#0099FF]" />
            </div>
          </CopyToClipboard>
          <CopyToClipboard text='fusion_shuo'
            onCopy={() => message.success({content:'微信群（加微信）已复制'})}>
            <div className='bg-white h-8 w-8 flex items-center justify-center rounded-md' >
              <div className="i-ri-wechat-fill text-xl text-[#07C160]" />
            </div>
          </CopyToClipboard>
          <a href='https://github.com/YuzeTT/small-sticker' className='bg-white h-8 w-8 flex items-center justify-center rounded-md'>
            <div className="i-ri-github-fill text-xl text-[#1F2328]" />
          </a>
          <a href='https://www.xiaohongshu.com/user/profile/5dbc28ee00000000010047ef' className='bg-white h-8 w-8 flex items-center justify-center rounded-md'>
            <img src="/images/red.svg" alt="red" className='w-4 h-4' />
          </a>
          <a href='https://afdian.net/a/sticker' className='bg-white h-8 w-8 flex items-center justify-center rounded-md overflow-hidden'>
            <img src="/images/aifadian-2.png" alt="red" className='w-5 h-5 rounded-sm' />
          </a>
        </div>

        <a href='/user' className='absolute top-0 right-0 m-4 bg-green-100 p-1 rounded-full flex items-center text-green-700'>
          <div className="i-ri-account-circle-fill text-xl" />
          <div className='text-sm mx-1'>我的账户</div>
        </a>
      </div>
      <div text='sm' op50 mb-2>已完成</div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
        {list.done.map((item, key)=>(
          <div p-4  cursor-pointer rounded-xl decoration-none relative overflow-hidden className='bg-white z-0 card hover:bg-zinc-50 transition' key={key} onClick={()=>{jumpBefore(item.url)}}>
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
