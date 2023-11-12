import { Collapse, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import data from '../utils/sponsorList'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '微信',
    children: <>
      <img src="/images/wechat.JPG" alt="" w-full />
    </>,
  },
  {
    key: '2',
    label: '支付宝',
    children: <div className='grid grid-cols-2'>
      <img src="/images/redpack.PNG" alt="" w-full />
      <img src="/images/alipay.PNG" alt="" w-full />
    </div>,
  },
];

export default function sponsor() {
  return (
    <div className='-mt-4'>
      <div my-4>网站的维护需要一定运营成本，如果能收到您的赞助，我会爱你一万年！！！</div>
      <Collapse className='mb-4'
        items={[{ key: '1', label: '点击展开收款码', children: <div>
          <div>可以在付款备注留下昵称和留言哦!</div>
          <div>最后谢谢你! mua~</div>
          <Tabs defaultActiveKey="1" centered items={items} />
        </div> }]}
      />
      <div className='space-y-4'>
        {data.reverse().map((item, key) => (
          <div key={key} className='bg-red-50 rounded-xl'>
            
            <div className='bg-white px-4 py-2 rounded-lg' style={{border: '1px solid #F4F4F5'}}>
              <div className='flex justify-between items-center mb-2'>
                <div className='flex-1 font-bold text-lg'>{item.name}</div>
                <div className='op50 text-sm'>{item.time}</div>
              </div>
              <div className='op50 text-sm'>留言：{item.remark}</div>
              <div className='text-blue-500 text-sm mt-1'>开发者回复：{item.reply}</div>
            </div>
            <div className='p-3 flex items-center justify-between'>
              <div className='px-2 py-1 bg-white flex items-center text-sm rounded-md text-red-500'>
                <div className='i-ri-hand-heart-fill mr-1.5'></div>
                <div>赞助</div>
              </div>
              <div className='text-lg font-bold text-red-500'>￥{item.money.toFixed(2)}</div>
            </div>
          </div>
        ))}

        <video controls className='rounded-xl'>
          <source src="https://upos-sz-mirrorali.bilivideo.com/upgcxcode/99/91/137649199/137649199_da2-1-192.mp4?e=ig8euxZM2rNcNbNM7wdVhwdlhbKMhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1699818910&gen=playurlv2&os=alibv&oi=2018263300&trid=acbf23947d8e4f979e577f5137216464T&mid=3493297544759901&platform=html5&upsig=0d91879d6c3eac4cbd09cfcfe605c6b6&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&bvc=vod&nettype=0&bw=244006&orderid=0,1&buvid=&build=0&mobi_app=&f=T_0_0&logo=80000000" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
