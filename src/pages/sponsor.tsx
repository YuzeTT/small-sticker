import { Collapse, List, Tag, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Line from '../components/Line';
import data from '../utils/sponsorList'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '微信',
    children: <>
      <img src="/wechat.JPG" alt="" w-full />
    </>,
  },
  {
    key: '2',
    label: '支付宝',
    children: <div className='grid grid-cols-2'>
      <img src="/redpack.PNG" alt="" w-full />
      <img src="/alipay.PNG" alt="" w-full />
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
      <Line zh='赞助列表' en='Sponsor List' logo={<div className="i-ri-file-list-2-line" mr-4 text='xl' />}></Line>
      <List
        header={<div>根据时间排序</div>}
        // footer={<div>Footer</div>}
        className='mt-4 bg-white'
        bordered
        dataSource={data.reverse()}
        renderItem={(item) => (
          <List.Item extra={<div text='bold xl red-500'>￥{item.money.toFixed(2)}</div>} key={item.key}>
            <List.Item.Meta
              title={<div>
                <div text='gray-300 sm' className='font-normal'>
                  {item.time}
                </div>
                <div text='lg' flex='~ items-center'>
                  <Tag bordered={false} color="gold" className='mr-2'>
                    赞助
                  </Tag>
                  <div>{item.name}</div>
                </div>
              </div>}
              description={<>
                <div>留言：{item.remark || '无'}</div>
                <div text='blue-500'>开发者回复：{item.reply}</div>
              </>}
            />
              {/* 123 */}
            {/* <Typography.Text mark>[ITEM]</Typography.Text> {item.name} */}
          </List.Item>
        )}
      />
    </div>
  )
}
