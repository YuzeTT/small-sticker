import { Button, Modal, Form, Input, Space, message, Segmented, Spin } from 'antd';
import { useCallback, useRef, useState } from 'react';
import downloadHtmlAsImage from '../utils/downloadHtmlAsImage';

import Line from '../components/Line';
import showImage from '../utils/downloadHtmlAsImage/showImage';
import SecureWatermark from "../components/SecureWatermark";

import './mcdonald.css'

interface List {
  name: string,
  number: string
}

interface FormRef {
  list: List[]
}

export default function Mcdonald() {
  const { TextArea } = Input;

  const [form] = Form.useForm()
  const [formData, setFormData] = useState<FormRef>({
    list: [
      { number: '', name: '' }
    ]
  })
  const [data, setData] = useState({
    name: '',// 套餐名称
    code: '',// 取餐码
    remark: '',// 套餐备注
    id: 'KVS-020',// id
    need: '',
    // id: '2023082205200001',// 套餐订单编号
    spend: {
      pack: '', // 配送费
      total: '', // 总计
      offer: '', // 优惠
      pay: '', // 实付
    },
    address: '', // 门店地址
    addressCode: '', // 门店代码
    date1: '',// 订单时间
    date2: '',// 制作时间
    user: '', // 名字
    phone: '',// 号码
    userAddress: '', // 配送地址
    from: '', // 来源
    line: '', // 小尾巴
    phone1: '', // 门店电话
    phone2: '', // 客服电话
    isShowLogo: 0,
  })
  const ref = useRef<HTMLDivElement>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    window.open('/sponsor')
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setImageSrc('')
  };
  const out = useCallback(() => {
    if (ref.current === null) {
      return
    }

    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });

    try {
      showImage(ref.current, 'PNG', true).then((imageData) => {
        setImageSrc(imageData)
      })

      messageApi.open({
        key,
        type: 'success',
        content: '生成成功！',
      });

      showModal()
    } catch (error) {
      console.log(error)
      messageApi.open({
        key,
        type: 'error',
        content: '生成失败，请将控制台截图反馈给开发者',
      });
    }
  }, [ref, messageApi])

  const downloadImage = useCallback(() => {
    if (ref.current === null) {
      return
    }

    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });

    try {
      const t = new Date()
      downloadHtmlAsImage(ref.current, 'PNG', t.getTime().toString(), true)
      showImage(ref.current, 'PNG', true).then((v) => {
        setImageSrc(v)
        console.log(v);
      })

      messageApi.open({
        key,
        type: 'success',
        content: '下载成功，请留意下载界面',
      });

      showModal()
    } catch (error) {
      console.log(error)
      messageApi.open({
        key,
        type: 'error',
        content: '下载失败，麻烦长按图片保存哦！',
      });
    }
  }, [ref, messageApi])
  const fillTest = () => {
    setData({
      name: '爱心套餐',// 套餐名称
      code: '20232',// 取餐码
      remark: '一定要天天开心呀！',// 套餐备注
      id: 'KVS-020',
      need: '吸管 x1',
      // id: '2023082205200001',// 套餐订单编号
      spend: {
        pack: '6', // 配送费
        total: '12', // 总计
        offer: '3', // 优惠
        pay: '32', // 实付
      },
      address: '麦当劳门店', // 门店地址
      addressCode: '2023012', // 门店代码
      date1: '2023-00-00 12:00:00',// 订单时间
      date2: '2023-00-00 12:00:00',// 制作时间
      user: 'YuzeTT', // 名字
      phone: '123****1234',// 号码
      userAddress: '福建省', // 配送地址
      from: 'APP', // 来源
      line: 'Happy brithday', // 小尾巴
      phone1: '1234-12341234', // 门店电话
      phone2: '1234-12341234', // 客服电话
      isShowLogo: 0,
    })

    setFormData({
      list: [
        { name: '麦旋风', number: '1' },
        { name: '爱', number: '1' },
      ]
    })
  }

  const onFinish = (values: FormRef) => {
    console.log(values)
    setFormData(values)
  };

  return (
    <div className='-mt-4'>
      {contextHolder}
      <Modal title='导出图片'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<div text='center'>
          <Button onClick={() => downloadImage()}>下载图片</Button>
          <Button type='primary' onClick={handleOk}>干的不错，有赏</Button>
          <Button type='dashed' danger onClick={handleCancel}>关闭</Button>
        </div>}
      >
        <div mb-2>请 <span text='blue-500'>长按保存图片</span>或点击底部 <span text='blue-500'>下载按钮</span></div>
        <div>
          {imageSrc ? <img src={imageSrc} alt="" w-full shadow-xl /> :
            <Spin tip="渲染图片中...如果长时间未出图请刷新">
              <div className="h-30" />
            </Spin>
          }
        </div>
      </Modal>
      <Space direction='vertical' className='w-full'>
        <Line zh='编辑' en='Edit' logo={<div className='i-ri-edit-line' mr-4 text='xl' />}>
          <Button onClick={fillTest}>测试数据</Button>
        </Line>
        <Space direction='vertical' className='w-full'>
          <div text='sm' op50>基本信息</div>
          <div flex='~ justify-between gap-2'>
            <Input addonBefore='#' placeholder='套餐名称' value={data.name} onChange={(v) => setData({ ...data, name: v.target.value })} />
            <Input placeholder='取餐码' value={data.code} onChange={(v) => setData({ ...data, code: v.target.value })} />
          </div>
          <Input addonBefore='备注' placeholder='开心！快乐！健康！平安！' value={data.remark} onChange={(v) => setData({ ...data, remark: v.target.value })} />
          <Input addonBefore='ID' placeholder='我也不知道有啥用的ID' value={data.id} onChange={(v) => setData({ ...data, id: v.target.value })} />
          <TextArea rows={2} placeholder='需求（可输入多行），例：吸管 x1' value={data.need} onChange={(v) => setData({ ...data, need: v.target.value })} />
          <Space.Compact className='w-full'>
            <Input addonBefore='门店地址' placeholder='xxx麦当劳' value={data.address} onChange={(v) => setData({ ...data, address: v.target.value })} />
            <Input addonBefore='门店代码' placeholder='123123' value={data.addressCode} onChange={(v) => setData({ ...data, addressCode: v.target.value })} />
          </Space.Compact>
          <Input addonBefore='订单时间' placeholder='2023-10-10 12:00:00' value={data.date1} onChange={(v) => setData({ ...data, date1: v.target.value })} />
          <Input addonBefore='制作时间' placeholder='2023-10-10 12:00:00' value={data.date2} onChange={(v) => setData({ ...data, date2: v.target.value })} />
          <Input addonBefore='来源' placeholder='饿了么' value={data.from} onChange={(v) => setData({ ...data, from: v.target.value })} />

          <Space.Compact className='w-full'>
            <Input addonBefore='姓名' placeholder='YuzeTT' value={data.user} onChange={(v) => setData({ ...data, user: v.target.value })} />
            <Input addonBefore='号码' placeholder='123****1234' value={data.phone} onChange={(v) => setData({ ...data, phone: v.target.value })} />
          </Space.Compact>
          <Input addonBefore='送餐地址' placeholder='填写收货地址' value={data.userAddress} onChange={(v) => setData({ ...data, userAddress: v.target.value })} />
          <Input addonBefore='小尾巴' placeholder='Happy brithday' value={data.line} onChange={(v) => setData({ ...data, line: v.target.value })} />
          <Space.Compact className='w-full'>
            <Input addonBefore='门店电话' placeholder='123****1234' value={data.phone1} onChange={(v) => setData({ ...data, phone1: v.target.value })} />
            <Input addonBefore='客服电话' placeholder='123****1234' value={data.phone2} onChange={(v) => setData({ ...data, phone2: v.target.value })} />
          </Space.Compact>
          <Space.Compact className='w-full'>
            <Input addonBefore='配送费' placeholder='6' value={data.spend.pack} onChange={(v) => setData({ ...data, spend: { ...data.spend, pack: v.target.value } })} />
            <Input addonBefore='价格' placeholder='6' value={data.spend.total} onChange={(v) => setData({ ...data, spend: { ...data.spend, total: v.target.value } })} />
            <Input addonBefore='优惠' placeholder='6' value={data.spend.offer} onChange={(v) => setData({ ...data, spend: { ...data.spend, offer: v.target.value } })} />
          </Space.Compact>
          <div text='sm' op50 mt-2>餐品信息</div>

          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{ list: [{ number: '', name: '' }] }}
          >
            <Form.List name="list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div flex='~ items-center' key={key}>
                      <Space.Compact className='w-full mb-2'>
                        <Form.Item
                          className='mb-0'
                          {...restField}
                          name={[name, 'number']}
                        >
                          <Input placeholder="1" addonBefore='数量' className='w-30' />
                        </Form.Item>
                        <Form.Item
                          className='mb-0'
                          {...restField}
                          name={[name, 'name']}
                        >
                          <Input placeholder="输入餐品名称" addonBefore='餐品' />
                        </Form.Item>
                      </Space.Compact>
                      <Button className='ml-2 mb-2' onClick={() => remove(name)} block>
                        删除
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      新增一个餐品
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit" className='w-full'>
                提交（修改商品后需要点击）
              </Button>
            </Form.Item>
          </Form>
          <div>
            <Segmented options={[{ label: '隐藏Logo', value: 0 }, { label: '显示Logo', value: 1 }]} value={data.isShowLogo} onChange={(v) => {
              if (v === 1) {
                Modal.confirm({
                  title: '免责声明',
                  content: '加入Logo是您的个人行为，与本站无关，所造成的后果自行承担。',
                  okText: '我同意',
                  cancelText: '我拒绝',
                  onOk() {
                    setData({ ...data, isShowLogo: 1 })
                  },
                  onCancel() {
                    setData({ ...data, isShowLogo: 0 })
                  },
                });
              } else {
                setData({ ...data, isShowLogo: 0 })
              }
            }} />
          </div>
        </Space>

        <div my-2></div>
        <Line zh='预览' en='Preview' logo={<div className='i-ri-landscape-line' mr-4 text='xl' />}></Line>
        <div className='flex items-center justify-center font-sans'>
          <div className='bg-white rounded-md w-90 shadow-xl pb-6 relative' ref={ref}>
            <SecureWatermark />
            <div className='w-full text-center mb-4 pt-10'>
              {data.isShowLogo ? <img src='/images/mcdonald.png' alt='' className='w-50 mx-auto' /> : ''}
            </div>
            <div className='px-8'>
              <div text='center'>
                <div>#{data.name}</div>
                <div text='xl' my-2 font='bold'>{data.code}</div>
              </div>
              <div text='xl' font='bold' className='whitespace-pre-line'>订单备注：{data.remark} / {data.id}</div>
              <div text='sm' mt-5>
                <div>配料需求</div>
                <div className='whitespace-pre-line '>{data.need}</div>
              </div>
              <hr className='my-3' />
              <div text='xl' font='bold'>产品需求(总数:{formData.list.length || '0'})</div>
              <table text='xl'>
                <tbody>
                  {formData.list.map((item, key) => (
                    <tr className='first:underline first:decoration-1' key={key}>
                      <td>{item.number}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div text='sm'>
                <div>外送费：{data.spend.pack}</div>
                <div>总计：{parseInt(data.spend.pack) + parseInt(data.spend.total)}</div>
                <div>优惠：{data.spend.offer}</div>
                <div>实付：{parseInt(data.spend.pack) + parseInt(data.spend.total) - parseInt(data.spend.offer)}</div>
              </div>
              <hr className='my-3' />
              <div text='sm'>
                <div>餐厅名称：{data.address}</div>
                <div>餐厅编号：{data.addressCode}</div>
                <div>订单时间：{data.date1}</div>
                <div>产品制作时间：{data.date2}</div>
                <div>来源：{data.from}</div>
              </div>
              <hr className='my-3' />
              <div text='sm'>
                <div>联系信息：{data.user} {data.phone}</div>
                <div>送餐地址：{data.userAddress}</div>
              </div>
              <div className='my-3 relative'>
                <hr />
                <div absolute className='-top-2.5 px-2 left-1/2 -translate-x-1/2 z-10' text='sm black' bg='white'>{data.line}</div>
              </div>
              <div text='sm'>
                <div>★请在产品制作两个小时内食用，如需延后食用，请尽快密封后冷藏保存，谨防虫蝇</div>
                <div>★如有疑问请联系</div>
                <div>门店电话：{data.phone1}</div>
                <div>客服电话：{data.phone2}</div>
              </div>
            </div>
          </div>
        </div>

        <Button className='mt-4 w-full' type='primary' onClick={out} flex='~ items-center justify-center' size='large'>
          <div className='i-ri-camera-fill' mr-1 text='lg' />
          导出图片
        </Button>
      </Space>
    </div>
  )
}
