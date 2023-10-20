import { Button, Modal, DatePicker, Input, Space, message, Segmented } from 'antd';
import { useCallback, useRef, useState } from 'react';
import downloadHtmlAsImage from '../utils/downloadHtmlAsImage';

import Line from '../components/Line';
import showImage from '../utils/downloadHtmlAsImage/showImage';

export default function Mcdonald() {
  const [data, setData] = useState({
    name: '麦当劳套餐',// 套餐名称
    remark: '开心！快乐！健康！平安！',// 套餐备注
    id: '2023082205200001',// 套餐订单编号
    comboList: [
      {
        name: '限定套餐1',
        number: 2
      }
    ],
    // 花费
    spend: '',
    discount: '这里是折扣信息',
    address: '北京市朝阳区朝阳公园',
    receiver: '麦**',
    date: '',// 日期
    time: '',// 时间
    bless: '如产品有错送, 请联系配送员：123456',
    isShowLogo: 0,
    isWhite: 0
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
      showImage(ref.current,'PNG', true).then((imageData)=>{
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
  }, [ref])

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
      downloadHtmlAsImage(ref.current,'PNG', t.getTime().toString(), true)
      showImage(ref.current,'PNG', true).then((v)=>{
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
  }, [ref])
  const fillTest = () => {
    setData({
      name: '麦当劳套餐',// 套餐名称
      remark: '开心！快乐！健康！平安！',// 套餐备注
      id: '2023082205200001',// 套餐订单编号
      comboList: [
        {
          name: '#限定套餐1',
          number: 1
        }
      ],
      spend: '88.8',
      discount: '这里是折扣信息',
      address: '北京市朝阳区朝阳公园',
      receiver: '麦**',
      date: '',
      time: '',
      bless: '如产品有错送, 请联系配送员：123456',
      isShowLogo: 0,
      isWhite: 0
    })
  }


  return (
    <div>
      {contextHolder}
      <Modal title='导出图片'
             open={isModalOpen}
             onCancel={handleCancel}
             footer={<div text='center'>
               <Button onClick={()=>downloadImage()}>下载图片</Button>
               <Button type='primary' onClick={handleOk}>干的不错，有赏</Button>
               <Button type='dashed' danger onClick={handleCancel}>关闭</Button>
             </div>}
      >
        <div mb-2>请 <span text='blue-500'>长按保存图片</span>或点击底部 <span text='blue-500'>下载按钮</span></div>
        <div>
          <img src={imageSrc} alt='' w-full/>
        </div>
      </Modal>
      <Space direction='vertical' className='w-full'>
        <Line zh='编辑' en='Edit' logo={<div className='i-ri-edit-line' mr-4 text='xl' />}>
          <Button onClick={fillTest}>测试数据</Button>
        </Line>
        <Space direction='vertical' className='w-full'>
          <Space.Compact>
            <Input addonBefore='套餐' className='w-50' placeholder='套餐名称' value={data.name} onChange={(v)=>setData({...data, name: v.target.value})}/>
            <Input addonBefore='备注' className='w-50' placeholder='套餐备注' value={data.remark} onChange={(v)=>setData({...data, remark: v.target.value})}/>
          </Space.Compact>
          <Space.Compact className='w-full'>
            <DatePicker placeholder='日期' onChange={(_,v)=>setData({...data, date: v})} format={'YYYY-MM-DD'} showToday />
            <DatePicker picker='time' placeholder='时间' onChange={(_,v)=>setData({...data, time: v})} format={'HH:mm'} use12Hours={false} />
          </Space.Compact>
          <Input placeholder='套餐订单编号' addonAfter='订单号' className='' value={data.id} onChange={(v)=>setData({...data, id: v.target.value})}/>
          <Space className='flex-full'>
            <Input addonBefore="套餐名称" placeholder="名称" value={data.comboList[0].name} onChange={(v)=>{
              setData({...data, comboList: [{...data.comboList[0], name: v.target.value}, ...data.comboList.slice(1)]})
            }}/>
            <span className="">/</span>
            <Input addonAfter="数量" placeholder="1" value={data.comboList[0].number} onChange={(v)=>{
                setData({...data, comboList: [{...data.comboList[0], number: v.target.value}]})
            }}/>
            <Input addonAfter='实付款' placeholder='88.8' value={data.spend} onChange={
              (v)=>setData({...data, spend: v.target.value})
            }/>
          </Space>
          <Space.Compact className='w-full'>
            <Input addonBefore='优惠信息' placeholder='1' value={data.discount} onChange={(v)=>setData({...data, discount: v.target.value})}/>
          </Space.Compact>
          <Space>
            <Input addonBefore='配送地址' placeholder='麦家' className='' value={data.address} onChange={(v)=>setData({...data, address: v.target.value})}/>
            <span className=''>/</span>
            <Input addonAfter='收货人' placeholder='小麦' className='' value={data.receiver} onChange={(v)=>setData({...data, receiver: v.target.value})}/>
          </Space>
          <Space.Compact>
            <Input placeholder='祝福' className='w-100' addonAfter='天天开心' value={data.bless} onChange={(v)=>setData({...data, bless: v.target.value})}/>
          </Space.Compact>
          <div>
            <Segmented options={[{label:'白色', value: 1}, {label:'麦色', value: 0}]} value={data.isWhite} onChange={(v)=>{
                setData({...data, isWhite: v})
            }} />
            <Segmented className='ml-5' options={[{label:'隐藏Logo', value:0}, {label:'显示Logo', value:1}]} value={data.isShowLogo} onChange={(v)=>{
              if(v===1){
                Modal.confirm({
                  title: '免责声明',
                  content: '加入Logo是您的个人行为，与本站无关，所造成的后果自行承担。',
                  okText: '我同意',
                  cancelText: '我拒绝',
                  onOk() {
                    setData({...data, isShowLogo: 1})
                  },
                  onCancel() {
                    setData({...data, isShowLogo: 0})
                  },
                });
              }else {
                setData({...data, isShowLogo: 0 })
              }
            }} />
          </div>
        </Space>

        <div my-2></div>
        <Line zh='预览' en='Preview' logo={<div className='i-ri-landscape-line' mr-4 text='xl' />}></Line>
        <div className='flex items-center justify-center'>
          <div className={data.isWhite? 'bg-[#FFF] rounded-md w-90 h-200': 'bg-[#BB9C69] rounded-md w-90 h-200'} ref={ref}>
            <div>
              {data.isShowLogo? <img src='/mcdonald.svg' alt='' className='w-90' />:''}
            </div>
            <div className='px-3 py-2'>
              <div>
                <div>#{data.name}</div>
                <div>备注:  {data.remark}</div>
              </div>
              <div className='py-2'>-----------------------------------------------</div>
              <div>
                <div className='flex items-center'>
                  <div>下单时间：{data.date || '0000-00-00'}</div>
                  <div className='ml-2'>{data.time || '00:00'}</div>
                </div>
                <div className='pt-1'>订单编号：{data.id}</div>
              </div>
              <div className='py-2'>--------------------商品-----------------------</div>
              <div className='flex items-center justify-between px-1'>
                <div>
                  <div>名称</div>
                  {
                    data.comboList.map((v, i)=>{
                      return <div key={i}>{v.name}</div>
                    })
                  }
                </div>
                <div>
                  <div>数量</div>
                  {
                    data.comboList.map((v, i)=>{
                      return <div key={i}>{v.number}</div>
                    })
                  }
                </div>
              </div>
              <div className='py-2'>--------------------优惠-----------------------</div>
              <div>{data.discount}</div>
              <div className='flex justify-end'>实付：{data.spend || '88.8'}</div>
              <div className='py-2'>--------------------配送-----------------------</div>
              <div>
                配送地址： {data.address}
              </div>
              <div>
                收货人：{data.receiver}
              </div>
              <div className='py-2'>------------------天天开心---------------------</div>
              <div>{data.bless}</div>
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
