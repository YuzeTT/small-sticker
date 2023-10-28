import { QRCode, Segmented, message, Button } from "antd";
// import dayjs from 'dayjs'
import { useCallback, useRef, useState } from "react";
// import HighText from "../components/HighText";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";
import InputGuide from "../components/InputGuide";
import ExportList from "../components/ExportList";

export default function Ticket() {
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
      {highLight}
      {contextHolder}
      <InputGuide />
      <div>
        <Segmented block={true} options={[{value: 0, label: '编辑模式'}, {value: 1, label: '预览模式'}, {value: 2, label: '导出记录'}]} value={status} onChange={(v)=>{
          setStatus(parseInt(`${v}`))
          if(v===0) {
            setHighLight(true)
          } else if(v===1) {
            setHighLight(false)
          }
        }} />
      </div>
      {status===1?
        <Button className="w-full mt-4" type="primary" onClick={out} flex='~ items-center justify-center' size='large' loading={isLoading}>
          <div className="i-ri-camera-fill" mr-1 text='lg' style={{display: isLoading? 'none':'block'}} />
          {isLoading?'正在导出请勿切换页面':'导出图片'}
        </Button>:''
      }
      <div mt-4 p-2>
        <div className='flex justify-center'>
          <div bg='white' className='min-w-220 z-0 shadow-xl relative px-6 py-4 rotate-90 my-110' ref={ref} style={status===2?{display: 'none'}:{}}>
            <SecureWatermark>
              <div flex='~'>
                {/* left */}
                <div>
                  {/* title */}
                  <div flex='~ items-center'>
                    <div w-22 h-12 bg='gray-200' mr-4></div>
                    <div text='xl' font='bold'>2023张杰未·LIVE- [耀·北斗] 巡回演唱会-北京站</div>
                  </div>
                  <div flex='~'>
                    <div ml-2 mr-4 mt-4 text='center'>
                      <div text='2xl' mb-1 font='bold'>一层</div>
                      <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={130} color='black' />
                      <div text='xl' font='bold'>内场严禁</div>
                      <div text='xl' font='bold'>携带灯牌</div>
                    </div>
                    <div>
                      <div text='lg' font='bold' className='space-y-1'>
                        <div>时间：2023年8月25日 星期六 19:00</div>
                        <div>场馆：国家体育场（鸟巢）</div>
                        <div flex='~'>
                          <div>区域：一层</div>
                          <div ml-8>H区511通道</div>
                        </div>
                        <div flex='~'>
                          <div>座位：14排</div>
                          <div ml-8>65号</div>
                        </div>
                        <div>票价：580元</div>
                      </div>
                      <div font='bold' className='space-y-1'>
                        <div text=''>荧光棒循环利用，离场请勿带走；进场请勿携带其他发光体；</div>
                        <div flex='~'>
                          <div text=''>NO：2839100463728</div>
                          <div text='' ml-8>T.N：13688880000</div>
                        </div>
                        <div text='sm'>温馨提示：请携带本人二代身份证原件实名入场，副券撕下无效。</div>
                        <div text='sm'>票纸涂改无效，请提前入场，避开安检高峰，对号入座并配合安检人员检查</div>
                      </div>

                    </div>
                  </div>
                  <div w-full bg='red' h-10 rounded-xl mt-2 overflow-hidden flex='~'>
                    <div bg='black' h-full text='white' flex='~ items-center justify-center' px-2>
                      <div className="i-ri-phone-fill text-2xl" />
                      <div ml-1 text='xl'>1010-0000</div>
                    </div>
                    <div>
                      logo logo logo logo logo
                    </div>
                  </div>
                </div>
                {/* right */}
                <div flex='~' className='flex-1' ml-4>
                  {/* <div>自行撕下无效 13688880000</div> */}
                  <div grid grid-cols-2 w-full>
                    <div mx-auto bg='red' w-full>
                      <div text='4xl center' font-bold>SUB</div>
                      <div text='3xl center'>副 券</div>
                    </div>
                    <div mx-auto bg='red' w-full ml-1>
                      <div text='4xl center' font-bold>TICKET</div>
                      <div text='3xl center'>副 券</div>
                    </div>
                    {/* <div></div> */}
                  </div>
                </div>
              </div>
            </SecureWatermark>
          </div>
        </div>
        {status===2?
          <ExportList imageSrc={imageSrc} />:
          ''
        }
      </div>
    </div>
  )
}
