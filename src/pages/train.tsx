import { AutoComplete, QRCode, Button, Modal, DatePicker, Input, Space, message, Segmented, Watermark, Tabs, Spin } from "antd";
import { pinyin } from 'pinyin-pro';
import { useCallback, useRef, useState } from "react";
import downloadHtmlAsImage from "../utils/downloadHtmlAsImage";

import Line from "../components/Line";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";

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
    qrcode: 'https://sticker.hsott.cn', // 二维码
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
      showImage(ref.current, "PNG", true).then((imageData) => {
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
      downloadHtmlAsImage(ref.current, "PNG", t.getTime().toString(), true)
      showImage(ref.current, "PNG", true).then((v) => {
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
      name: '马斯克', // 名字
      id: '123456789123456789', // 身份证
      station1: '上海', // 始发站
      station2: '西安', // 到达站
      ticketCode: 'T000001', // 左上角票码
      railwayCode: 'G000', // 车次
      checkCode: '候车室1', // 检票口
      price: '114.00', // 票价
      date: '2023 年 10 月 14 日', // 发车日期
      time: '12:00', // 发车时间
      uniCode: '250002300021845E0591 JM', // 底部小字
      type: '二等座', // 二等座
      sit1: '2', // 车
      sit2: '001', // 号
      sit3: 'F', // 座位
      isShowLogo: 0, // 水印
      qrcode: 'https://sticker.hsott.cn', // 二维码
    })
  }

  return (
    <div className='-mt-4'>
      {contextHolder}
      <Modal title="导出图片"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<div text='center'>
          <Button onClick={() => downloadImage()}>下载图片</Button>
          <Button type="primary" onClick={handleOk}>干的不错，有赏</Button>
          <Button type="dashed" danger onClick={handleCancel}>关闭</Button>
        </div>}
      >
        <div>请 <span text='blue-500'>长按保存图片</span>或点击底部 <span text='blue-500'>下载按钮</span></div>

        <div text='sm red-500' className="mb-2" flex='~ items-center'>
          <div className="i-ri-error-warning-line mr-1 w-8" />
          <div>已知Bug：多次生成可能导致不出图，刷新即可解决，建议生成一次刷新一次！</div>
        </div>
        <div>
          {imageSrc ? <img src={imageSrc} alt="" w-full shadow-xl /> :
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
          <div flex='~ justify-between gap-2'>
            <Input placeholder="左上角票号" value={data.ticketCode} onChange={(v) => setData({ ...data, ticketCode: v.target.value })} />
            <Input placeholder="检票口" addonBefore='检票' value={data.checkCode} onChange={(v) => setData({ ...data, checkCode: v.target.value })} />
          </div>
          <div flex='~ items-center justify-between gap-2'>
            <Input className="w-50" placeholder="始发站" addonAfter='站' value={data.station1} onChange={(v) => setData({ ...data, station1: v.target.value })} />
            <Input className="w-50" placeholder="车次" addonBefore='>' addonAfter='>' value={data.railwayCode} onChange={(v) => setData({ ...data, railwayCode: v.target.value })} />
            <Input className="w-50" placeholder="到达站" addonAfter='站' value={data.station2} onChange={(v) => setData({ ...data, station2: v.target.value })} />
          </div>
          <Space.Compact className="w-full">
            <DatePicker placeholder="日期" onChange={(_, v) => setData({ ...data, date: v })} format={'YYYY 年 MM 月 DD 日'} showToday />
            <DatePicker picker="time" placeholder="时间" onChange={(_, v) => setData({ ...data, time: v })} format={'HH:mm'} use12Hours={false} />
          </Space.Compact>
          <Space.Compact className="w-full">
            <Input placeholder="车次" value={data.sit1} onChange={(v) => setData({ ...data, sit1: v.target.value })} addonAfter='车' />
            <Input placeholder="号次" value={data.sit2} onChange={(v) => setData({ ...data, sit2: v.target.value })} addonAfter='号' />
            <Input placeholder="座位" value={data.sit3} onChange={(v) => setData({ ...data, sit3: v.target.value })} />
          </Space.Compact>
          <Space.Compact className="w-full">
            <Input placeholder="价格" value={data.price} onChange={(v) => setData({ ...data, price: v.target.value })} addonAfter='元' />
            <AutoComplete
              options={[{ value: '二等座' }, { value: '一等座' }, { value: '商务座' }, { value: '软卧' }]}
              className="w-30"
              placeholder="座位类型"
              value={data.type} onChange={(v) => setData({ ...data, type: v })}
            />
          </Space.Compact>
          <Space.Compact className="w-full">
            <Input placeholder="身份证号码（18位）" value={data.id} onChange={(v) => setData({ ...data, id: v.target.value })} className='w-[200%]' />
            <Input placeholder="姓名" value={data.name} onChange={(v) => setData({ ...data, name: v.target.value })} />
          </Space.Compact>
          <div text='sm red-500' className="-mt-1" flex='~ items-center'>
            <div className="i-ri-error-warning-line mr-1" />
            <div>本站不收集您的信息，但也不建议您填写真实信息！</div>
          </div>
          <Input placeholder="底部信息" value={data.uniCode} onChange={(v) => setData({ ...data, uniCode: v.target.value })} />
          <Input placeholder="二维码链接" addonBefore='二维码' value={data.qrcode} onChange={(v) => setData({ ...data, qrcode: v.target.value })} disabled />
          <Segmented options={[{ label: '显示水印', value: 0 }, { label: '隐藏水印', value: 1 }]} value={data.isShowLogo} onChange={(v) => {
            if (v === 1) {
              Modal.confirm({
                title: '免责声明',
                content: '去除水印是您的个人行为，与本站无关，所造成的后果自行承担。',
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
        </Space>

        <div my-2></div>
        <Line zh='预览' en='Preview' logo={<div className="i-ri-landscape-line" mr-4 text='xl' />}></Line>
        {/* -------------------------------- */}
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: `蓝色`,
              key: '1',
              children: <>
                <div className="flex items-center justify-center scale-75 md:scale-100 font-sans">
                  <div className="bg-blue-100 rounded-md overflow-hidden relative min-w-100 relative shadow-xl" ref={ref}>
                    <SecureWatermark />
                    <Watermark content={data.isShowLogo ? '' : '【收藏票】仅供收藏'} gap={[10, 10]}>
                      <div flex='~ justify-between'>
                        <div text='xl red-500' ml-4 mt-1>{data.ticketCode}</div>
                        <div text='' mr-8 mt-1 w-full text-right>检票:{data.checkCode}</div>
                      </div>
                      <div flex='~ justify-between items-center' mx-6>
                        <div>
                          <div>
                            <span text='2xl' className="tracking-[1rem]">{data.station1}</span>
                            <span text='lg'>站</span>
                          </div>
                          <div text='center' className='-mt-1'>{pinyin(data.station1, { toneType: 'none' }).charAt(0).toUpperCase()}{pinyin(data.station1, { toneType: 'none' }).slice(1)}</div>
                        </div>
                        <div>
                          <div text='xl center' mr-2 className='-mb-2 tracking-widest'>{data.railwayCode}</div>
                          <img src="/images/right-arrow.png" alt="right-arrow" w-18 />
                        </div>
                        <div>
                          <div>
                            <span text='2xl' className="tracking-[1rem]">{data.station2}</span>
                            <span text='lg'>站</span>
                          </div>
                          <div text='center' className='-mt-1'>{pinyin(data.station2, { toneType: 'none' }).charAt(0).toUpperCase()}{pinyin(data.station2, { toneType: 'none' }).slice(1)}</div>
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
                      <div ml-4>{data.id.slice(0, 10)}****{data.id.slice(14, 18)} {data.name}</div>

                      <div text='center sm' ml-8 px-10 inline-block mt-1 style={{ border: '1.5px dashed' }}>
                        <div>这个不是 报销凭证</div>
                        <div className='-mt-1'>退票改签只需删除图片</div>
                      </div>

                      <div className='bg-blue-300' mt-1 px-4 py-1>
                        <div>{data.uniCode}</div>
                      </div>

                      <QRCode value={data.qrcode || 'https://sticker.hsott.cn'} className='absolute right-1 bottom-7' size={100} bordered={false} type={'svg'} />
                    </Watermark>
                  </div>
                </div>
                <Button className="mt-4 w-full" type="primary" onClick={out} flex='~ items-center justify-center' size='large'>
                  <div className="i-ri-camera-fill" mr-1 text='lg' />
                  导出图片
                </Button>

              </>,
            },
            {
              label: `红色`,
              key: '2',
              children: <>
                <div className="flex items-center justify-center scale-75 md:scale-100 font-sans">
                  <div className=" rounded-md overflow-hidden relative min-w-100 p-4 shadow-xl" ref={ref}>
                    <SecureWatermark />
                    <Watermark content={data.isShowLogo ? '' : '【收藏票】仅供收藏'} gap={[10, 10]}>
                      <div className='bg-red-200'>
                        <div flex='~ justify-between'>
                          <div text='xl red-500' ml-4 mt-1>{data.ticketCode}</div>
                          <div text='' mr-8 mt-1 w-full text-right>检票:{data.checkCode}</div>
                        </div>
                        <div flex='~ justify-between items-center' mx-6>
                          <div>
                            <div>
                              <span text='2xl' className="tracking-[1rem]">{data.station1}</span>
                              <span text='lg'>站</span>
                            </div>
                            <div text='center' className='-mt-1'>{pinyin(data.station1, { toneType: 'none' }).charAt(0).toUpperCase()}{pinyin(data.station1, { toneType: 'none' }).slice(1)}</div>
                          </div>
                          <div>
                            <div text='xl center' mr-2 className='-mb-4 tracking-widest'>{data.railwayCode}</div>
                            <img src="/images/right-arrow.png" alt="right-arrow" w-18 />
                          </div>
                          <div>
                            <div>
                              <span text='2xl' className="tracking-[1rem]">{data.station2}</span>
                              <span text='lg'>站</span>
                            </div>
                            <div text='center' className='-mt-1'>{pinyin(data.station2, { toneType: 'none' }).charAt(0).toUpperCase()}{pinyin(data.station2, { toneType: 'none' }).slice(1)}</div>
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
                        <div ml-4>{data.id.slice(0, 10)}****{data.id.slice(14, 18)} {data.name}</div>

                        <div text='center sm' ml-8 px-10 inline-block mt-1 style={{ border: '1.5px dashed' }}>
                          <div>买票请到 广告位招租</div>
                          <div className='-mt-1'>小贴纸祝您旅途愉快</div>
                        </div>

                        <div mt-1 px-4 py-1>
                          <div>{data.uniCode}</div>
                        </div>

                        <QRCode value={data.qrcode || 'https://sticker.hsott.cn'} className='absolute right-1 bottom-1' size={110} bordered={false} type={'svg'} />
                      </div>
                    </Watermark>
                  </div>
                </div>
                <Button className="mt-4 w-full" type="primary" onClick={out} flex='~ items-center justify-center' size='large'>
                  <div className="i-ri-camera-fill" mr-1 text='lg' />
                  导出图片
                </Button>
              </>,
            },
          ]}
        />
      </Space>
    </div>
  )
}
