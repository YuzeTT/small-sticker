import { Alert, QRCode, Segmented, message, Button, Empty, Image } from "antd";
import dayjs from 'dayjs'
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
    <div>
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
          <div bg='white' className='w-55 z-0 shadow-xl relative px-2 py-2' ref={ref} style={status===2?{display: 'none'}:{}}>
            <SecureWatermark>
              <div flex='~ justify-between'>
                <img src="/mxbc_logo.png" alt="logo" h-7 />
                <div>
                <HighText show={highLight} text='数量' eg='01/01' />
                </div>
                <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={70} color='black' />
              </div>
              {/* <img src="/heytea.png" alt="logo" absolute w-10 h-auto right-4 top-4 op80/> */}
              <div className={highLight?'':'-mt-4'}>
                <HighText show={highLight} text='渠道#取餐码 取餐方式' eg='小程序#1300自提' />
              </div>
              <div text='3xl' origin-left scale-x-65 w='135%'>
                <HighText show={highLight} text='产品名称' eg='芝士奶盖四季春(大杯)' />
              </div>
              <div className='-mt-1'>
                <HighText show={highLight} text='冰度，糖度' eg='少冰，五分糖' />
              </div>
              <div className='-mt-1'>
                <HighText show={highLight} text='日期 时间 手机号' eg={`${dayjs().format('MM-DD HH:mm')} 13600000000`} />
              </div>
              <div className='-mt-1'>
                <HighText show={highLight} text='编码 编码 广告 ' eg='98800301 3uU 聚会点大单，蜜雪更划算' />
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
