import { Collapse, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Line from '../components/Line';

interface DataType {
  key: React.Key;
  name: string;
  money: number;
  remark: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '昵称',
    dataIndex: 'name',
    // render: (text: string) => <a classN>{text}</a>,
  },
  {
    title: '金额',
    dataIndex: 'money',
    render: (text: number) => <span>￥{text.toFixed(2)}</span>,
  },
  {
    title: '留言',
    dataIndex: 'remark',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Ric',
    money: 2.88,
    remark: '网站很好用哇，谢谢！',
  },
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
];

export default function sponsor() {
  return (
    <div className=''>
      <div my-4>网站的维护需要一定运营成本,如果能收到您的赞助,我会非常开心！！！</div>
      <Collapse className='mb-4'
        items={[{ key: '1', label: '点击展开收款码', children: <div>
          <div>付款后联系微信: hong_yu1024 可以自定义昵称和留言哦!（24小时没回复就帮你登记付款自带的啦~）</div>
          <div>也可以在付款备注留言和你的名字哦!</div>
          <div>最后谢谢你! mua~</div>
          <img src="/wechat.JPG" alt="" w-full />
        </div> }]}
      />
      <Line zh='赞助列表' en='Sponsor List' logo={<div className="i-ri-file-list-2-line" mr-4 text='xl' />}></Line>
      <div className='-mx-4 -mt-2'>
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  )
}
