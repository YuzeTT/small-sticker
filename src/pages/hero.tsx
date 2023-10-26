import { List, Avatar, Alert } from 'antd'
import Line from '../components/Line'
import YuzeTT from '../../public/avatars/YuzeTT.jpg'
import onepisYa from '../../public/avatars/onepisYa.jpg'
import luckfunc from '../../public/avatars/luckfunc.jpg'

const data = [
  {
    key: '0',
    name: 'YuzeTT',
    ghName : 'YuzeTT',
    remark: '项目开发',
    avatar: YuzeTT,
  },
  {
    key: '1',
    name: 'onepisYa',
    ghName : 'onepisYa',
    remark: 'html-to-image 魔改',
    avatar: onepisYa,
  },
  {
    key: '2',
    name: '幸运函数',
    ghName : 'luckfunc',
    remark: '代码优化，参与 麦当劳小票 开发',
    avatar: luckfunc,
  },
];

export default function hero() {
  return (
    <div className='-mt-4'>
      <Line zh='贡献列表' en='Hero List' logo={<div className="i-ri-file-list-2-line" mr-4 text='xl' />}></Line>
      <Alert message="🎉 感谢下列成员的奉献" type="error" className='mt-4' />
      <List
        // header={<div>根据时间排序</div>}
        // footer={<div>Footer</div>}
        className='mt-4'
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item extra={<a target="_blank" href={`https://github.com/`+item.ghName}>Github</a>} key={item.key}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<div>{item.name} <span text='gray-400' className='font-normal'>@{item.ghName}</span></div>}
              description={item.remark}
            />
            {/* <Typography.Text mark>[ITEM]</Typography.Text> {item.name} */}
          </List.Item>
        )}
      />
    </div>
  )
}
