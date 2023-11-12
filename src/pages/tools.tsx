import { Segmented, message } from "antd";
import { Button, Collapse, ScaleFade, useToast } from '@chakra-ui/react'
import { useCallback, useRef, useState } from "react";
import showImage from "../utils/downloadHtmlAsImage/showImage";
// import SecureWatermark from "../components/SecureWatermark";
import { useNavigate } from 'react-router-dom';
import ExportList from "../components/ExportList";
import { Outlet } from "react-router";
import isVip from "../utils/isVip";

export default function Heytea() {
  const toast = useToast()
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [imageSrc, setImageSrc] = useState<{ time: string, data: string }[]>([]);
  const [highLight, setHighLight] = useState<boolean>(true)
  const [status, setStatus] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const out = useCallback((n?: number) => {
    if (ref.current === null) {
      return
    }
    setIsLoading(true)

    try {
      showImage(ref.current, "PNG", true, n).then((imageData) => {
        if (imageData === 'data:,') {
          messageApi.open({
            key,
            type: 'error',
            content: '生成失败，请将控制台截图反馈给开发者',
          });
          setIsLoading(false)
        } else {
          setStatus(2)
          toast({
            description: "导出成功！长按图片即可保存",
            status: 'success',
            duration: 5000,
            variant: 'subtle'
          })
          setIsLoading(false)
        }
        setImageSrc((v) => [{ time: new Date().toLocaleString(), data: imageData }, ...v])
      })
    } catch (error) {
      console.log(error)
      toast({
        description: "生成失败，请将控制台截图反馈给开发者",
        status: 'error',
        duration: 9000,
      })
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
      
      <div className='h-10 relative mt-2'>
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
          <div className="flex gap-2">
            <Button variant='second' className='w-full' isLoading={isLoading} loadingText='导出中' onClick={()=>{
              console.log('+ 导出');
              out(1)
            }}>
              <div className="i-ri-flashlight-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
              急速导出 (720P)
            </Button>
            {/* <Button variant='main' className='w-full' isLoading={isLoading} loadingText='导出中' onClick={()=>{
              console.log('+ 导出');
              out()
            }}>
              <div className="i-ri-hd-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
              标准导出
            </Button> */}
            <Button variant='vip' className='w-full' textColor=' text-zinc-800' isLoading={isLoading} loadingText='导出中' onClick={()=>{
              console.log('+ 导出');
              if(!isVip().is_vip) {
                out(10)
              }else {
                toast({
                  duration: 9000,
                  // isClosable: true,
                  render: () => (
                    <div className='bg-gradient-to-r from-[#E8BC86] to-[#E8C99B] text-zinc-800 p-2 rounded-md flex items-center text-lg'>
                      <div className="i-ri-vip-diamond-fill mx-2 text-xl" />
                      <div className='flex-1 font-bold'>VIP专享功能</div>
                      <Button bgColor='white' size='sm' onClick={()=>{navigate('/user')}}>开通VIP</Button>
                    </div>
                  ),
                })
              }
            }}>
              <div className="i-ri-vip-diamond-fill" mr-1 style={{ display: isLoading ? 'none' : 'block' }} />
              超清导出 (8K)
            </Button>
          </div>
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
          <Outlet context={[highLight, ref]} />
          <div className='flex justify-center'>
            {/* <div style={{border: '1px dashed rgb(226 228 233 / 1)', boxShadow: '0px 4px 7px 0px #00000008'}}>
              <div className='' >
                <SecureWatermark />
                
              </div>
            </div> */}
          </div>
        </Collapse>
      </div>
    </div>
  )
}
