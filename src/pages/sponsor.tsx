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
    // render: (text: string) => <a>{text}</a>,
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
