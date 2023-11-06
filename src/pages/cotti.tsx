import { Segmented, message, Button } from "antd";
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
          <div bg='yellow-100' className='w-60 z-0 shadow-xl relative px-2 py-2' ref={ref} style={status === 2 ? { display: 'none' } : {}}>
            <SecureWatermark />
            <div className='flex justify-between items-center'>
              <div className='text-[0.85rem]'>
                <HighText show={highLight} text='问候语' eg='早上好' />
              </div>
              <img src="/images/cotti-2.webp" alt="cotti" className='w-35 h-auto -mr-1' />
            </div>
            <div className='flex items-end'>
              <div className='text-3xl font-bold mr-3'>
                <HighText show={highLight} text='取餐妈' eg='*E6' />
              </div>
              <div className='mb-1'>
                <HighText show={highLight} text='来源 数量' eg='饱了么 1/1' />
              </div>
            </div>
            <div className='text-lg font-bold -mt-1'>
              <HighText show={highLight} text='餐品' eg='[冰]生酪拿铁' />
            </div>
            <div className='-mt-1'>
              <HighText show={highLight} text='属性' eg='大杯16oz/冰/金奖天狼星·深烘' />
            </div>
            <div className='my-1'>
              <HighText show={highLight} text='香味/糖度' eg='焦香/半糖' />
            </div>
            <div className='text-xs'>
              <HighText show={highLight} text='提示文字' eg='尽快享用，风味更加哦！' inputed />
            </div>
            <div className='flex justify-between items-center mt-1'>
              <div className='text-xs font-bold'>
                <HighText show={highLight} text='日期 时间' eg={dayjs().format('MM-DD HH:mm:ss')} />
              </div>
              <div className='text-xs font-bold'>
                <HighText show={highLight} text='提示文字' eg='EVERY DAY@COTTI' inputed />
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
