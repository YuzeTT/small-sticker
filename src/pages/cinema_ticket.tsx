import { Alert, QRCode, Segmented, message, Button, Empty, Image } from "antd";
import { useCallback, useRef, useState } from "react";
import HighText from "../components/HighText";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";

export default function Maoyan() {
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
      <Alert message="【新设计模式】蓝色的是输入框属性，绿色的是示例文字，点击绿色部分可以快速输入内容。输入完毕后进入预览模式点击生成图片哦！" type="info" showIcon closable />
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
          <div bg='white' className='w-80 shadow-xl relative' ref={ref} style={status===2?{display: 'none'}:{}}>
            <SecureWatermark>
              <div pl-4 flex='~ justify-between'>
                {/* left */}
                <div className="w-[75%]">
                  <img src="/cinema_red.png" alt="logo" h-7 pt-3 pb-1 />
                  <div text='sm'><HighText show={highLight} text='影院名称' eg='万达国际影城（福州台江店）' /></div>
                  <div text='sm'>
                    <HighText show={highLight} text='电影名称' eg='深海(3D)' />
                  </div>
                  <div mt-1 flex='~ items-center justify-between'>
                    <div text='sm'>
                      <HighText show={highLight} text='影厅' eg='1号VIP厅' />
                    </div>
                    <div>
                      <HighText show={highLight} text='开始时间' eg='19:00' />
                    </div>
                  </div>
                  <div flex='~ items-center justify-between'>
                    <div>
                      <HighText show={highLight} text='座位' eg='5排3号' />
                    </div>
                    <div>
                      <HighText show={highLight} text='开始日期' eg='2023-08-11' />
                    </div>
                  </div>
                  <div flex='~' mt-1>
                    <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={140} />
                    <div ml-2>
                      <div text='xs'>票价：<HighText show={highLight} text='' eg='10' />元</div>
                      <div text='xs'>服务费：<HighText show={highLight} text='' eg='10'/>元</div>
                      <div text='xs'>
                        <HighText show={highLight} text='日期' eg='08-11' />
                        {' '}
                        <HighText show={highLight} text='时间' eg='15:24' />
                      </div>
                      <div text='xs' mt-3>
                        <HighText show={highLight} text='售票渠道' eg='网络售票' />
                      </div>
                      <div text='xs'>
                        <HighText show={highLight} text='机器码1' eg='13150000' />
                      </div>
                      <div text='xs'>
                        <HighText show={highLight} text='机器码2' eg='03352952' />
                      </div>
                    </div>
                  </div>
                </div>
                {/* right */}
                <div py-3 ml-4 className="w-[25%]">
                  <div flex='~ justify-center'>
                    <div px-2 className='py-0.5' rounded-full bg='#EF0F38' text='white'>副券</div>
                  </div>
                  <div text='xs' mt-2>
                    <HighText show={highLight} text='影厅' eg='9号VIP厅' />
                  </div>
                  <div text='xs'>
                    <HighText show={highLight} text='座位' eg='5排3号' />
                  </div>
                  <div text='xs' mt-4>
                    <HighText show={highLight} text='时间' eg='15:24' />
                  </div>
                  <div text='xs'>
                    <HighText show={highLight} text='日期' eg='08-11' />
                  </div>
                  <div text='xs' mt-4>
                    <HighText show={highLight} text='电影名称' eg='深海(3D)' />
                  </div>
                  <div text='xs' mt-4>
                    <HighText show={highLight} text='票价' eg='20' />元
                  </div>
                  <div text='xs' mt-4>
                    <HighText show={highLight} text='机器码1' eg='13150000' />
                  </div>
                  <div text='xs'>
                    <HighText show={highLight} text='机器码2' eg='03352952' />
                  </div>
                </div>
              </div>
              <div px-4 py-2 bg='#EF0F38' mt-4 flex='~ items-center justify-between'>
                <div text='white xs'>观此电影 特此纪念</div>
                <img src="/cinema_white.png" alt="logo" h-4 />
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
