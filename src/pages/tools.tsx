import { Segmented, message } from "antd";
import { Button, Collapse } from '@chakra-ui/react'
import { useCallback, useRef, useState } from "react";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";
import InputGuide from "../components/InputGuide";
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
      <InputGuide />
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
      <Collapse in={status === 1} animateOpacity>
        <Button variant='main' className='w-full mt-4' isLoading={isLoading} loadingText='导出中' onClick={out}>
          <div className="i-ri-camera-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
          导出图片
        </Button>
      </Collapse>
      {/* <SlideFade in={status === 1} offsetY='20px' startingHeight={0}>
        <Button variant='main' className='w-full mt-4' isLoading={isLoading} loadingText='导出中' onClick={out}>
          <div className="i-ri-camera-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
          导出图片
        </Button>
      </SlideFade>
       */}
      {/* <ScaleFade initialScale={0.9} in={status === 1}>
        <Button variant='main' className='w-full mt-4' isLoading={isLoading} loadingText='导出中' onClick={out}>
          <div className="i-ri-camera-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
          导出图片
        </Button>
      </ScaleFade> */}
      {/* <Fade initialScale={0.9} in={status === 1}>
        <Button variant='main' className='w-full mt-4' isLoading={isLoading} loadingText='导出中' onClick={out}>
          <div className="i-ri-camera-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
          导出图片
        </Button>
      </Fade> */}
      {/* {status === 1 ?
          <Button variant='main' className='w-full mt-4' isLoading={isLoading} loadingText='导出中' onClick={out}>
          <div className="i-ri-camera-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
          导出图片
        </Button> : ''
      } */}
      <div font-sans>
        <Collapse in={status !== 2} animateOpacity className='p-8'>
          <div className='flex justify-center'>
            <div ref={ref} className='shadow-xl'>
              <SecureWatermark />
              <Outlet context={[highLight]} />
            </div>
          </div>
        </Collapse>
        <Collapse in={status === 2} animateOpacity className='pt-4'>
          <ExportList imageSrc={imageSrc} />
        </Collapse>
        {/* {status === 2 ?
          ''
        } */}
      </div>
    </div>
  )
}
