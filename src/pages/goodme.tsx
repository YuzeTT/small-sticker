import { QRCode, Segmented, message } from "antd";
import dayjs from 'dayjs'
import { Button } from '@chakra-ui/react'
import { useCallback, useRef, useState } from "react";
import HighText from "../components/HighText";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";
import InputGuide from "../components/InputGuide";
import ExportList from "../components/ExportList";

export default function Heytea() {
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
          <Button variant='main' className='w-full mt-4' isLoading={isLoading} loadingText='导出中' onClick={out}>
          <div className="i-ri-camera-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
          导出图片
        </Button> : ''
      }
      {/* {status === 1 ?
          <Button variant='second' className='w-full mt-4' isLoading={isLoading} loadingText='导出中' onClick={out}>
          <div className="i-ri-camera-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
          导出图片
        </Button> : ''
      } */}
      <div mt-4 p-2 font-sans>
        <div className='flex justify-center'>
          <div bg='white' className='w-65 z-0 shadow-xl relative px-4 py-2' ref={ref} style={status === 2 ? { display: 'none' } : {}}>
            <SecureWatermark />
            <div className='flex justify-between items-center'>
              <div className='flex items-end'>
                <div className='text-[1.8rem] font-bold'>
                  <HighText show={highLight} text='取餐码' eg='114' />
                </div>
                <div className='text-sm ml-2'>
                  <HighText show={highLight} text='份数' eg='1/1' />
                </div>
              </div>
              <div>
                <div className='text-xs bg-black text-white px-2 py-0.5 rounded-full font-bold' style={{height: highLight?'1.3rem':'auto'}}>
                  <HighText show={highLight} text='取餐方式' eg='YuzeTT自取' />
                </div>
              </div>
            </div>
            <div className='my-1' style={{border: '1px dashed #00000050'}}></div>
            <div className='text-xl font-bold'>
              <HighText show={highLight} text='商品' eg='十里江南桂[中]' />
            </div>
            <div className='mt-0.5'>
              <HighText show={highLight} text='配置' eg='水冰 | 七分糖[G10] | 联名杯' />
            </div>
            <div className='mt-18 flex justify-between items-end'>
              <div>
                <div className='text-xs'>
                  <HighText show={highLight} text='店铺' eg='小红薯店' />
                </div>
                <div className='text-xs'>
                  <HighText show={highLight} text='电话 时间 日期' eg={`18800000000 ${dayjs().format('HH:mm')} ${dayjs().format('MM-DD')}`} />
                </div>
              </div>
              <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={80} color='black' />
            </div>
            <div className='mt-2 flex justify-between items-center'>
              <img src="/images/goodme-2.webp" alt="goodme" className='w-15' />
              <div className='font-bold'>
                <HighText show={highLight} text='slogan' eg='@我最好的朋友喝奶茶' />
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
