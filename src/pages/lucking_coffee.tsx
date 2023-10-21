import { AutoComplete, Button, Modal, DatePicker, Input, Space, message, Segmented, Spin } from "antd";
import { useCallback, useRef, useState } from "react";
import downloadHtmlAsImage from "../utils/downloadHtmlAsImage";

import Line from "../components/Line";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";

export default function LuckinCoffee() {
  const [data, setData] = useState({
    name: '',
    sex: '',
    code: '',
    type: '',
    number1: '',
    number2: '',
    temp: '',
    product: '',
    sweet: '',
    date: '',
    time: '',
    remark: '建议尽快饮用，风味更佳',
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
      showImage(ref.current,"PNG", true).then((imageData)=>{
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
      downloadHtmlAsImage(ref.current,"PNG", t.getTime().toString(), true)
      showImage(ref.current,"PNG", true).then((v)=>{
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
      name: '刘**',
      sex: '先生',
      code: '114',
      type: '自提',
      number1: '1',
      number2: '1',
      temp: '【热】',
      product: '马斯卡彭生酪拿铁',
      sweet: '标准糖',
      date: '2023-10-14',
      time: '15:34',
      remark: '建议尽快饮用，风味更佳',
      isShowLogo: 0
    })
  }

  return (
    <div>
      {contextHolder}
      <Modal title="导出图片"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<div text='center'>
          <Button onClick={()=>downloadImage()}>下载图片</Button>
          <Button type="primary" onClick={handleOk}>干的不错，有赏</Button>
          <Button type="dashed" danger onClick={handleCancel}>关闭</Button>
        </div>}
      >
        <div mb-2>请 <span text='blue-500'>长按保存图片</span>或点击底部 <span text='blue-500'>下载按钮</span></div>
        <div>
          {imageSrc? <img src={imageSrc} alt="" w-full shadow-xl/>:
            <Spin tip="渲染图片中...如果长时间未出图请刷新">
              <div className="h-30" />
            </Spin>
          }
        </div>
      </Modal>
      <Space direction="vertical" className="w-full">
        <Line zh='编辑' en='Edit' logo={<div className="i-ri-edit-line" mr-4 text='xl' />}>
          <Button onClick={fillTest}>测试数据</Button>
        </Line>
        <Space direction="vertical" className="w-full">
          <Space.Compact>
            <Input addonBefore="Hi，" className="w-50" placeholder="您的姓名" value={data.name} onChange={(v)=>setData({...data, name: v.target.value})}/>
            <AutoComplete
              options={[{value: '女士'},{value: '先生'}]}
              className="w-20"
              value={data.sex} onChange={(v)=>setData({...data, sex: v})}
              placeholder="性别"
            />
          </Space.Compact>
          <Space.Compact>
            <Input placeholder="取餐码" value={data.code} onChange={(v)=>setData({...data, code: v.target.value})}/>
            <AutoComplete
              options={[{value: '自提'},{value: '堂食'}]}
              className="w-30"
              value={data.type} onChange={(v)=>setData({...data, type: v})}
              placeholder="取餐方式"
            />

          </Space.Compact>
          <Space>
            <Input addonBefore="第" placeholder="1" className="" value={data.number1} onChange={(v)=>setData({...data, number1: v.target.value})}/>
            <span className="">/</span>
            <Input addonAfter="杯" placeholder="1" className="" value={data.number2} onChange={(v)=>setData({...data, number2: v.target.value})}/>
          </Space>
          <Space.Compact className="w-full">
            <AutoComplete
              options={[{value: '【热】'},{value: '【冰】'}]}
              className="w-20"
              value={data.temp} onChange={(v)=>setData({...data, temp: v})}
              placeholder="温度"
            />
            <AutoComplete
              options={[{value: '马斯卡彭生酪拿铁'},{value: '生椰拿铁'}]}
              className="flex-1"
              value={data.product} onChange={(v)=>setData({...data, product: v})}
              placeholder="商品"
            />
            <AutoComplete
              options={[{value: '标准糖'},{value: '半糖'},{value: '不另外加糖'}]}
              className=" w-30"
              placeholder="甜度"
              value={data.sweet} onChange={(v)=>setData({...data, sweet: v})}
            />
          </Space.Compact>
          <Space.Compact className="w-full">
            <DatePicker placeholder="日期" onChange={(_,v)=>setData({...data, date: v})} format={'YYYY-MM-DD'} showToday />
            <DatePicker picker="time" placeholder="时间" onChange={(_,v)=>setData({...data, time: v})} format={'HH:mm'} use12Hours={false} />
          </Space.Compact>
          <Input placeholder="备注" defaultValue={'建议尽快饮用，风味更佳'} className="" value={data.remark} onChange={(v)=>setData({...data, remark: v.target.value})}/>
          <Segmented options={[{label:'隐藏Logo', value:0}, {label:'显示Logo', value:1}]} value={data.isShowLogo} onChange={(v)=>{
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
              setData({...data, isShowLogo: 0})
            }
          }} />
        </Space>

        <div my-2></div>
        <Line zh='预览' en='Preview' logo={<div className="i-ri-landscape-line" mr-4 text='xl' />}></Line>
        <div className="flex items-center justify-center">
          <div className="bg-[#A8D3FD] rounded-md relative w-80 " ref={ref}>
            <SecureWatermark>
              {data.isShowLogo? <img src="/lucking_coffee_dark.svg" alt="" className="absolute w-8 right-4 top-5" />:''}
              <div className="px-3 text-xl">Hi，{data.name || '未填写'} {data.sex}</div>
              <div className="flex items-center px-3 pt-2">
                <div className="font-bold text-4xl">{data.code || '000'}</div>
                <div className="text-lg pl-2">{data.type || '自己飞走'}</div>
                <div className="text-lg pl-2">第{data.number1 || '1'}/{data.number2 || '1'}杯</div>
              </div>
              <div className="flex">
                <div className="text-lg pl-2">{data.temp || '【烫烫烫】'}</div>
                <div className="text-lg pl-2">{data.product || '锟斤拷'}</div>
              </div>
              <div className="text-lg pl-2">{data.sweet || '胰岛素配合'}</div>
              <div className="pl-2 font-bold pt-4 line-height-2">{data.date || '0000-00-00'} {data.time || '00:00'}</div>
              <div className="pl-2 pb-3">{data.remark}</div>
            </SecureWatermark>
          </div>
        </div>

        <Button className="mt-4 w-full" type="primary" onClick={out} flex='~ items-center justify-center' size='large'>
          <div className="i-ri-camera-fill" mr-1 text='lg' />
          导出图片
        </Button>
      </Space>
    </div>
  )
}
