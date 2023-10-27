import { Alert, Segmented, message, Button, Empty, Image } from "antd";
import { useCallback, useRef, useState } from "react";
import HighText from "../components/HighText";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";

export default function Heytea() {
  const ref = useRef<HTMLDivElement>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [imageSrc, setImageSrc] = useState<{time: string, data: string}[]>([]);
  const [highLight , setHighLight] = useState<boolean>(true)
  const [status , setStatus] = useState<number>(0)
  const [isLoading , setIsLoading] = useState<boolean>(false)
  
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
      showImage(ref.current,"PNG", true).then((imageData)=>{
        if(imageData === 'data:,') {
          messageApi.open({
            key,
            type: 'error',
            content: '生成失败，请将控制台截图反馈给开发者',
          });
          setIsLoading(false)
        }else {
          setStatus(2)
          messageApi.open({
            key,
            type: 'success',
            content: '生成成功！',
          });
          setIsLoading(false)
        }
        setImageSrc((v)=>[{time: new Date().toLocaleString(), data: imageData}, ...v])
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
    <div mt-4>
      {contextHolder}
      <Alert message="蓝色的是输入框属性，绿色的是示例文字（点击可快速填充）。输入完毕后进入预览模式点击生成图片哦！" type="info" showIcon closable />
      {/* <Alert message="此项目疑似被“特别关注”或将出现法律风险，故临时下线电影票功能维护，将去除所有第三方信息，只保留纪念功能。感谢您的支持！" type="error" showIcon closable /> */}
      <div mt-4>
        <Segmented block={true} options={[{value: 0, label: '编辑模式'}, {value: 1, label: '预览模式'}, {value: 2, label: '导出记录'}]} value={status} onChange={(v)=>{
          setStatus(parseInt(`${v}`))
          if(v===0) {
            setHighLight(true)
          } else if(v===1) {
            setHighLight(false)
          }
        }} />
      </div>
      <div mt-4 p-2>
        <div className='flex justify-center'>
          <div bg='' className='w-60 z-0 relative p-2' ref={ref} style={status===2?{display: 'none'}:{}}>
            <SecureWatermark>
              <div mx-auto className=''>
                <div rounded overflow-hidden shadow>
                  <div bg='#1F4DA0' px-2 py-1>
                    <div flex='~ justify-between' text='white sm'>
                      <HighText show={highLight} text='方向' eg='西' />
                      <HighText show={highLight} text='方向' eg='东' />
                    </div>
                    <div text='2xl center white' className='-mt-1 mb-1' font='600'>
                      <HighText show={highLight} text='地点' eg='我在学校很想家' />
                    </div>
                  </div>
                  <div bg='zinc-100' py-1 px-2 text='sm'>
                    <div flex='~ justify-between' text='black'>
                      <div flex-1>
                        <HighText show={highLight} text='方向' eg='W' />
                      </div>
                      <HighText show={highLight} text='英文名' eg='Sticker' />
                      <div flex-1 text-right>
                        <HighText show={highLight} text='方向' eg='E' />
                      </div>
                    </div>
                  </div>
                </div>
                <div text-center>
                  <img src="/guideboard_gan.png" alt="杆子" className='w-20 -mt-[1px]' />
                </div>
              </div>
            </SecureWatermark>
          </div>
        </div>
        {status===1?
          <Button className="mt-4 w-full mt-6" type="primary" onClick={out} flex='~ items-center justify-center' size='large' loading={isLoading}>
            <div className="i-ri-camera-fill" mr-1 text='lg' style={{display: isLoading? 'none':'block'}} />
            {isLoading?'正在导出请勿切换页面':'导出图片'}
          </Button>:''
        }
        {status===2?
          <>
            {imageSrc.length === 0?
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无数据' />:
              <div className='space-y-4'>
                {imageSrc.map((v,k)=>(
                  <div key={k}>
                    <div style={{border:'2px dashed #E5E7EB', padding: '10px'}}>
                      <Image
                        className="shadow-xl"
                        src={v.data}
                      />
                    </div>
                    <div text='sm gray-500' mt-2>{v.time}</div>
                  </div>
                ))
                }
              </div>
            }
          </>:
          ''
        }
        
      </div>
    </div>
  )
}
