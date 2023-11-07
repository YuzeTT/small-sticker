import { QRCode, Segmented, message, Button } from "antd";
import dayjs from 'dayjs'
import { useCallback, useRef, useState } from "react";
import HighText from "../components/HighText";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";
import InputGuide from "../components/InputGuide";
import ExportList from "../components/ExportList";

export default function Hsay() {
  const ref = useRef<HTMLDivElement>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [imageSrc, setImageSrc] = useState<{ time: string, data: string }[]>([]);
  const [highLight, setHighLight] = useState<boolean>(true)
  const [status, setStatus] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const out = useCallback(() => {
    if (ref.current === null) {
      return
    }
    setIsLoading(true)

    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });

    try {
      showImage(ref.current, "PNG", true).then((imageData) => {
        if (imageData === 'data:,') {
          messageApi.open({
            key,
            type: 'error',
            content: '生成失败，请将控制台截图反馈给开发者',
          });
          setIsLoading(false)
        } else {
          setStatus(2)
          messageApi.open({
            key,
            type: 'success',
            content: '生成成功！',
          });
          setIsLoading(false)
        }
        setImageSrc((v) => [{ time: new Date().toLocaleString(), data: imageData }, ...v])
      })
      // showModal()
    } catch (error) {
      console.log(error)
      messageApi.open({
        key,
        type: 'error',
        content: '生成失败，请将控制台截图反馈给开发者',
      });
    }
  }, [ref, messageApi])


  return (
    <div>
      {contextHolder}
      <InputGuide />
      <div>
        <Segmented block={true} options={[{ value: 0, label: '编辑模式' }, { value: 1, label: '预览模式' }, { value: 2, label: '导出记录' }]} value={status} onChange={(v) => {
          setStatus(parseInt(`${v}`))
          if (v === 0) {
            setHighLight(true)
          } else if (v === 1) {
            setHighLight(false)
          }
        }} />
      </div>
      {status === 1 ?
        <Button className="w-full mt-4" type="primary" onClick={out} flex='~ items-center justify-center' size='large' loading={isLoading}>
          <div className="i-ri-camera-fill" mr-1 text='lg' style={{ display: isLoading ? 'none' : 'block' }} />
          {isLoading ? '正在导出请勿切换页面' : '导出图片'}
        </Button> : ''
      }
      <div mt-4 p-2 font-sans>
        <div className='flex justify-center'>
          <div bg='white' className={`w-60 ${highLight?'h-auto':'h-100 max-h-100'} z-0 shadow-xl relative p-4 flex flex-col`} ref={ref} style={status === 2 ? { display: 'none' } : {}}>
            <SecureWatermark />
            <div>
              <div className='text-2xl font-bold'>
                <HighText show={highLight} text='取餐码' eg='取单号:1145' />
              </div>
              <div className='text-xl mt-1'>
                <span className='mr-8'><HighText show={highLight} text='我不知道' eg='165' /></span>
                <span className=''><HighText show={highLight} text='数量' eg='1/1' /></span>
              </div>
              <div className='text-[1.35rem] font-bold mt-2'>
                <HighText show={highLight} text='餐品' eg='鲜炖整颗梨' />
              </div>
              <div className='text-lg font-bold mt-1'>
                <HighText show={highLight} text='大小' eg='中桶' />
              </div>
              <div className='text-lg mt-1'>
                <HighText show={highLight} text='参数' eg='热，七分糖 | 推荐：' />
              </div>
            </div>
            <div className='flex-1 flex items-center'>
              <div className='text- font-bold'>
                <HighText show={highLight} text='参数' eg='J40、5g、R-200' />
              </div>
            </div>
            <div>
              <div className='px-4 py-2 text-center text-white font-bold text-lg bg-black rounded-lg flex items-center'>
                <img src="/images/hsay-2.webp" alt="hsay" className='w-full' />
              </div>
              <div className='mt-2 flex justify-between items-center'>
                <div>
                  <div className='font-bold'>
                    <HighText show={highLight} text='取餐方式 日期 时间' eg={`自提  ${dayjs().format('MM-DD')} ${dayjs().format('HH:mm')}`} />
                  </div>
                  <div className='text-sm mt-1 font-bold'>
                    <HighText show={highLight} text='地址' eg='小红书店' />
                  </div>
                </div>
                <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={100} color='black' />
              </div>
            </div>
          </div>
        </div>
        {status === 2 ?
          <ExportList imageSrc={imageSrc} /> :
          ''
        }
      </div>
    </div>
  )
}
