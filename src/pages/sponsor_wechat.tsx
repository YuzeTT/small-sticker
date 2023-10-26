import { List, Tag } from 'antd';
import Line from '../components/Line';
import data from '../utils/sponsorList'

export default function sponsor() {
  return (
    <div className='-mt-4'>
      <div bg='white' p-2 className='-mx-4 w-150'>
        {data.map((item, key)=>(
          <div key={key} my-2 bg='zinc-50' p-4 rounded-xl>
            <div mb-2>
              <Tag bordered={false} color="gold" className='mr-2'>
                赞助
              </Tag>
              <span text='' font='bold'>{item.name}</span>
              <span text='red-500' font='bold' ml-2>￥{item.money.toFixed(2)}</span>
            </div>
            <div text-zinc-500>留言：{item.remark || '无'}</div>
            <div text='blue-500'>开发者回复：{item.reply}</div>
          </div>
        ))}
      </div>
      <Line zh='赞助列表' en='Sponsor List' logo={<div className="i-ri-file-list-2-line" mr-4 text='xl' />}></Line>
      <List
        header={<div>根据时间排序</div>}
        // footer={<div>Footer</div>}
        className='mt-4'
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
