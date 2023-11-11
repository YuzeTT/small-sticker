import { Segmented, message } from "antd";
import { Button, Collapse, ScaleFade } from '@chakra-ui/react'
import { useCallback, useRef, useState } from "react";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";
import ExportList from "../components/ExportList";
import { Outlet } from "react-router";

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
      <div flex='~ items-center' mb-4  bg-zinc-50 p-2 rounded-md>
        <div className="i-ri-lightbulb-fill w-4 h-4 mr-2 text-blue-500" />
        <div text='zinc-600 sm'>点击灰色文字可以快速填充哦！</div>
      </div>
      <div>
        <Segmented block={true} options={[{ value: 0, label: '编辑模式' }, { value: 1, label: '预览模式' }, { value: 2, label: '导出记录' }]} value={status} onChange={(v) => {
          console.log(highLight);
          
          setStatus(parseInt(`${v}`))
          if (v === 0) {
            setHighLight(true)
          } else if (v === 1) {
            setHighLight(false)
          }
        }} />
      </div>
      
      <div className='h14 relative mt-2'>
        <ScaleFade in={status === 0} className='absolute w-full z-20' unmountOnExit>
          <Button variant='second' className='w-full' isLoading={isLoading} loadingText='导出中' onClick={()=>{
            setStatus(1)
            setHighLight(false)
          }}>
            下一步
            <div className="i-ri-arrow-right-line" ml-1 style={{ display: isLoading ? 'none' : 'block' }} />
          </Button>
        </ScaleFade>
        <ScaleFade in={status === 1} className='absolute w-full z-20' unmountOnExit>
          <Button variant='main' className='w-full' isLoading={isLoading} loadingText='导出中' onClick={()=>{
            console.log('+ 导出');
            out()
          }}>
            <div className="i-ri-camera-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
            导出图片
          </Button>
        </ScaleFade>
        <ScaleFade in={status === 2} className='absolute w-full z-20' unmountOnExit>
          <Button variant='second' className='w-full' isLoading={isLoading} loadingText='导出中' onClick={()=>{
            setStatus(0)
            setHighLight(true)
          }}>
            <div className="i-ri-arrow-go-back-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
            返回编辑
          </Button>
        </ScaleFade>
      </div>
      <div font-sans className='relative'>
        <Collapse in={status === 2} animateOpacity className='pt-4' unmountOnExit>
          <ExportList imageSrc={imageSrc} />
        </Collapse>
        <Collapse in={status !== 2} animateOpacity className='pt-4'>
          <div className='flex justify-center'>
            <div style={{border: '1px dashed rgb(226 228 233 / 1)', boxShadow: '0px 4px 7px 0px #00000008'}}>
              <div ref={ref} className='' >
                <SecureWatermark />
                <Outlet context={[highLight]} />
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  )
}
