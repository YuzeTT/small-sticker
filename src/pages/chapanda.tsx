import { QRCode, Segmented, message, Button } from "antd";
import dayjs from 'dayjs'
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
        <Button className="w-full mt-4" type="primary" onClick={out} flex='~ items-center justify-center' size='large' loading={isLoading}>
          <div className="i-ri-camera-fill" mr-1 text='lg' style={{ display: isLoading ? 'none' : 'block' }} />
          {isLoading ? '正在导出请勿切换页面' : '导出图片'}
        </Button> : ''
      }
      <div mt-4 p-2 font-sans>
        <div className='flex justify-center'>
          <div bg='white' className='w-52 z-0 shadow-xl relative px-3 py-3' ref={ref} style={status === 2 ? { display: 'none' } : {}}>
            <SecureWatermark />
            <div className='flex justify-between'>
              <div>
                <div className='text-sm'>
                  <HighText show={highLight} text='取餐码' eg='饱了么外卖13' />
                </div>
                <div className='flex justify-between'>
                  <div className='text-sm'>
                    <HighText show={highLight} text='形式' eg='外卖' />
                  </div>
                  <div className='text-sm'>
                    <HighText show={highLight} text='数量' eg='1/1' />
                  </div>
                </div>
                <div className='mt-3 text-sm'>
                  <HighText show={highLight} text='时间' eg={dayjs().format('MM-DD HH:mm')} />
                </div>
              </div>
              <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={100} color='black' />
            </div>
            <div className='text-xl font-bold mt-2'>
              <HighText show={highLight} text='餐品' eg='茉莉奶绿' />
            </div>
            <div className='text-xl font-bold'>
              <HighText show={highLight} text='杯型' eg='大杯' />
            </div>
            <div className=''>
              <HighText show={highLight} text='属性' eg='[少冰，五分糖]' />
            </div>
            <div className='text-sm'>
              <HighText show={highLight} text='做法' eg='【T15，C250，N3，+C10】' />
            </div>
            <div className='text-sm mt-4'>
              注：<HighText show={highLight} text='备注' eg='' />
            </div>
            <div className='text-sm'>
              <HighText show={highLight} text='店铺ID 地址' eg='8800 茶百道小红薯市小红薯店' />
            </div>
            <div className='text-sm'>
              TEL：<HighText show={highLight} text='店铺电话' eg='18800000000' />
            </div>
            <div className='flex justify-between items-end mt-4'>
              <div className='font-bold text-lime text-[0.95rem]'>
                <HighText show={highLight} text='slogan' eg='好茶为底，制造新鲜。' inputed />
              </div>
              <img src="/chapanda.webp" alt="chapanda" className='w-10 h-10' />
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
