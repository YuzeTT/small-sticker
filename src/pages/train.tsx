import { AutoComplete, Button, Modal, DatePicker, Input, Space, message, Segmented } from "antd";
import { useCallback, useRef, useState } from "react";
import downloadHtmlAsImage from "../utils/downloadHtmlAsImage";

import Line from "../components/Line";
import showImage from "../utils/downloadHtmlAsImage/showImage";

export default function Train() {
  const [data, setData] = useState({
    name: '', // 名字
    id: '', // 身份证
    station1: '', // 始发站
    station2: '', // 到达站
    ticketCode: '', // 左上角票码
    railwayCode: '', // 车次
    checkCode: '', // 检票口
    price: '', // 票价
    date: '', // 发车日期
    time: '', // 发车时间
    uniCode: '', // 底部小字
    type: '', // 二等座
    sit1: '', // 车
    sit2: '', // 号
    sit3: '', // 座位
    isShowLogo: 0, // 水印
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
  }, [ref])

  const fillTest = () => {
    setData({
      name: '马斯克', // 名字
      id: '888888888888888888', // 身份证
      station1: '上海', // 始发站
      station2: '西安', // 到达站
      ticketCode: 'T000001', // 左上角票码
      railwayCode: 'G000', // 车次
      checkCode: '候车室1', // 检票口
      price: '114', // 票价
      date: '2023 年 10 月 14 日', // 发车日期
      time: '12:00', // 发车时间
      uniCode: '250002300021845E0591 JM', // 底部小字
      type: '二等座', // 二等座
      sit1: '2', // 车
      sit2: '001', // 号
      sit3: 'F', // 座位
      isShowLogo: 0, // 水印
    })
  }

  return (
    <div>
      {contextHolder}
      还没做完
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
          <img src={imageSrc} alt="" w-full/>
        </div>
      </Modal>
      <Space direction="vertical" className="w-full">
        <Line zh='编辑' en='Edit' logo={<div className="i-ri-edit-line" mr-4 text='xl' />}>
          <Button onClick={fillTest}>测试数据</Button>
        </Line>
        <Space direction="vertical" className="w-full">
          <div flex='~ items-center justify-between gap-2'>
            <Input className="w-50" placeholder="始发站" addonAfter='站' value={data.station1} onChange={(v)=>setData({...data, station1: v.target.value})}/>
            <Input className="w-50" placeholder="车次" addonBefore='>' addonAfter='>' value={data.railwayCode} onChange={(v)=>setData({...data, railwayCode: v.target.value})}/>
            <Input className="w-50" placeholder="到达站" addonAfter='站' value={data.station2} onChange={(v)=>setData({...data, station1: v.target.value})}/>
          </div>
          <Space.Compact className="w-full">
            <DatePicker placeholder="日期" onChange={(_,v)=>setData({...data, date: v})} format={'YYYY-MM-DD'} showToday />
            <DatePicker picker="time" placeholder="时间" onChange={(_,v)=>setData({...data, time: v})} format={'HH:mm'} use12Hours={false}  />
          </Space.Compact>
{/* 
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
          
          <Input placeholder="备注" defaultValue={'建议尽快饮用，风味更佳'} className="" value={data.remark} onChange={(v)=>setData({...data, remark: v.target.value})}/> */}
          <Segmented options={[{label:'隐藏Logo', value:0}, {label:'显示Logo', value:1}]} value={data.isShowLogo} onChange={(v)=>{
            if(v===1){
              Modal.confirm({
                title: '免责声明',
                content: '加入Logo是您的个人行为，与本站无关，所造成的后果自行承担。',
                // footer: (_, { OkBtn, }) => (
                //   <>
                //     <Button onClick={()=>{
                //       setData({...data, isShowLogo: 0})
                //     }}>不同意</Button>
                //     <OkBtn />
                //   </>
                // ),
                okText: '我同意',
                cancelText: '我拒绝',
                onOk() {
                  setData({...data, isShowLogo: 1})
                },
                onCancel() {
                  setData({...data, isShowLogo: 0})
                },
              });
            }
            setData({...data, isShowLogo: parseInt(`${v}`)})
          }} />
        </Space>
        
        <div my-2></div>
        <Line zh='预览' en='Preview' logo={<div className="i-ri-landscape-line" mr-4 text='xl' />}></Line>
        <div className="flex items-center justify-center">
          <div className="bg-blue-100 rounded-md overflow-hidden relative w-100 " ref={ref}>
            <div flex='~ justify-between'>
              <div text='xl red-500' ml-4 mt-1>{data.ticketCode}</div>
              <div text='' mr-8 mt-1>检票:{data.checkCode}</div>
            </div>
            <div flex='~ justify-between items-center' mx-6>
              <div>
                <div>
                  <span text='2xl' className="tracking-[1rem]">{data.station1}</span>
                  <span text='lg'>站</span>
                </div>
                <div text='center' className='-mt-1'>Pinyin</div>
              </div>
              <div>
                <div text='xl center' mr-2 className='-mb-4 tracking-widest'>{data.railwayCode}</div>
                <img src="/right-arrow.png" alt="right-arrow" w-18 />
              </div>
              <div>
                <div>
                  <span text='2xl' className="tracking-[1rem]">{data.station2}</span>
                  <span text='lg'>站</span>
                </div>
                <div text='center' className='-mt-1'>Pinyin</div>
              </div>
            </div>
            <div flex='~ justify-between'>
              <div ml-4>
                <div>{data.date} {data.time} 开</div>
                <div ml-1>￥{data.price} 元</div>
              </div>
              <div mr-5>
                <div >{data.sit1}车{data.sit2}号{data.sit3}</div>
                <div mr-2 text='right'>{data.type}</div>
              </div>
            </div>
            <div mt-4 ml-4>仅供收藏使用</div>
            <div ml-4>{data.id} {data.name}</div>

            <div text='center sm' ml-8 px-10 inline-block mt-1 style={{border: '1.5px dashed'}}>
              <div>报销凭证 遗失不补</div>
              <div className='-mt-1'>退票改签时需交回车站</div>
            </div>

            <div className='bg-blue-300' mt-1 px-4 py-1>
              <div>{data.uniCode}</div>
            </div>
            {/* {data.isShowLogo? <img src="/lucking_coffee_dark.svg" alt="" className="absolute w-8 right-4 top-5" />:''} */}
            {/* <div className="px-3 text-xl">Hi，{data.name || '未填写'} {data.sex}</div>
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
            <div className="pl-2 pb-3">{data.remark}</div> */}
          </div>
        </div>

        <Button className="mt-4 w-full" type="primary" onClick={out} flex='~ items-center justify-center'>
          <div className="i-ri-camera-3-line" mr-1 text='lg' />
          导出图片
        </Button>
      </Space>
    </div>
  )
}