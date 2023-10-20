import { Collapse, List } from 'antd';;
import Line from '../components/Line';

const data = [
  {
    key: '2',
    name: '呱',
    money: 6.66,
    remark: '小红书追来的，完美解决手残星人撕烂标签的问题!很期待后面高铁票的功能!太太加油!',
  },
  {
    key: '3',
    name: '*伶',
    money: 6.66,
    remark: '期待电影票和高铁票功能~',
  },
  {
    key: '4',
    name: '木头',
    money: 8.88,
    remark: '小红书看到的，希望可以新增高铁票板块，真的很不错!',
  },
  {
    key: '5',
    name: '*我',
    money: 2.22,
    remark: '小红书刷到的，祝你做大做强',
  },
  {
    key: '6',
    name: '语言干饭人',
    money: 8.88,
    remark: '用来逗我的朋友们玩她们都很开心！真的很有趣，谢谢',
  },
  {
    key: '7',
    name: '小高（工作版）',
    money: 6.66,
    remark: '亲爱的罗：小软件很棒哦，希望以后可以有很多类型哒，祝你做大做强，祝你闪闪发光，加油哦!',
  },
  {
    key: '8',
    name: 'A*a',
    money: 2.99,
    remark: '',
  },
  {
    key: '9',
    name: 'iris',
    money: 5,
    remark: '感谢开发者开发这么棒的网站！对于收藏癖真的很有帮助！',
  },
  {
    key: '10',
    name: '*户',
    money: 2.33,
    remark: '快搞其他奶茶店的 收集癖很需要这个东西',
  },
  {
    key: '11',
    name: '碱性司空',
    money: 3.14,
    remark: '感觉好萌，期待更多板块~',
  },
  {
    key: '12',
    name: '琅弦',
    money: 3.14,
    remark: '刷到了，真的很好提升幸福感，感谢',
  },
  {
    key: '13',
    name: '*棠',
    money: 0.01,
    remark: '',
  },
  {
    key: '14',
    name: '*、',
    money: 9.99,
    remark: '辛苦了，我请你喝茶~哈哈哈',
  },
  {
    key: '15',
    name: '*垚',
    money: 5.2,
    remark: '好厉害！',
  },
  {
    key: '16',
    name: '专门养猹去偷瓜',
    money: 6.66,
    remark: '小孩哥加油，期待更多的内容🏷️！！',
  },
];

export default function sponsor() {
  return (
    <div className=''>
      <div my-4>网站的维护需要一定运营成本，如果能收到您的赞助，我会爱你一万年！！！</div>
      <Collapse className='mb-4'
        items={[{ key: '1', label: '点击展开收款码', children: <div>
          <div>可以在付款备注留下昵称和留言哦!</div>
          <div>最后谢谢你! mua~</div>
          <img src="/wechat.JPG" alt="" w-full />
        </div> }]}
      />
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
              title={<a>{item.name}</a>}
              description={item.remark}
            />
            {/* <Typography.Text mark>[ITEM]</Typography.Text> {item.name} */}
          </List.Item>
        )}
      />
    </div>
  )
}
