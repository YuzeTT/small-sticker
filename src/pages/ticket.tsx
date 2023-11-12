import { QRCode, Segmented, message, Button, ColorPicker, Watermark } from "antd";
// import dayjs from 'dayjs'
import { useCallback, useRef, useState, useEffect } from "react";
// import { useToast } from '@chakra-ui/react'
import JSEncrypt from 'jsencrypt'
import HighText from "../components/HighText";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";
import InputGuide from "../components/InputGuide";
import ExportList from "../components/ExportList";
import HiddenLogo from "../components/HiddenLogo";
import isVip from "../utils/isVip";

export default function Ticket() {
  const ref = useRef<HTMLDivElement>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [imageSrc, setImageSrc] = useState<{ time: string, data: string }[]>([]);
  const [highLight, setHighLight] = useState<boolean>(true)
  const [status, setStatus] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [beforeOut, setBeforeOut] = useState(true)
  const [textColor, setTextColor] = useState('#1269A0')
  const [bgColor, setBgColor] = useState('#87ACD4')
  const [showText, setShowText] = useState(true)

  const decrypt = new JSEncrypt()
  const priKey = import.meta.env.VITE_PRIKEY
  decrypt.setPrivateKey(priKey)

  const out = useCallback((n?: number) => {
    setBeforeOut(false)
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
      showImage(ref.current, "PNG", true, n).then((imageData) => {
        if (imageData === 'data:,') {
          messageApi.open({
            key,
            type: 'error',
            content: '生成失败，请尝试不同清晰度',
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
        setBeforeOut(true)
      })
      // showModal()
    } catch (error) {
      console.log(error)
      messageApi.open({
        key,
        type: 'error',
        content: '生成失败，请尝试不同清晰度',
      });
      setBeforeOut(true)
    }

  }, [ref, messageApi])

  useEffect(()=>{
    const vip = isVip()
    if(vip.is_vip) {
      setShowText(false)
    }
  },[])

  return (
    <div>
      {highLight}
      {contextHolder}
      <div>
        {showText?<>
          <a href='/user' flex='~ items-center' mb-2 px-2 py-1 text-white rounded className='bg-blue-500 text-sm decoration-none'>
            <div className="i-ri-vip-crown-2-fill mr-1" />
            <div>开通VIP去水印（站点运营成本很高的qwq）</div>
          </a>
        </>:
        <div flex='~ items-center' mb-2 px-2 py-1 text-white rounded className='bg-gradient-to-r from-[#E8BC86] to-[#E8C99B] text-sm'>
          <div className="i-ri-vip-crown-2-fill mr-1" />
          <div>亲爱的VIP用户，已为您去除水印</div>
        </div>
        }

      </div>
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
        <>
          <Button className="w-full mt-4" type="primary" onClick={() => { out() }} flex='~ items-center justify-center' size='large' loading={isLoading}>
            <div className="i-ri-dvd-fill" mr-1 text='lg' style={{ display: isLoading ? 'none' : 'block' }} />
            {isLoading ? '导出中' : '急速导出'}
          </Button>
          <div flex='~ gap-2'>
            <Button className="w-full mt-2" onClick={() => { out(5) }} flex='~ items-center justify-center' size='large' loading={isLoading}>
              <div className="i-ri-hd-fill text-orange-500" mr-1 text='lg' style={{ display: isLoading ? 'none' : 'block' }} />
              {isLoading ? '导出中' : '高清（x5）'}
            </Button>
            <Button className="w-full mt-2" onClick={() => { out(10) }} flex='~ items-center justify-center' size='large' loading={isLoading}>
              <div className="i-ri-4k-fill text-red-500" mr-1 text='lg' style={{ display: isLoading ? 'none' : 'block' }} />
              {isLoading ? '导出中' : '超清（x10）'}
            </Button>
          </div>
          <div mt-2 text='sm orange-500' className="-mt-1" flex='~ items-center'>
            <div className="i-ri-lightbulb-line mr-1" />
            <div>导出时预览图会放大以获得更清晰的结果</div>
          </div>
          {/* <div mt-2 text='sm teal-500' className="-mt-1" flex='~ items-center' style={{display: beforeOut?'none':''}}>
            <div className="i-ri-user-heart-line mr-1" />
            <div>莫慌！只是放大了</div>
          </div> */}
        </>
        : ''
      }
      <div style={status === 2 ? { display: 'none' } : {}}>

        <div flex='~' space-x-2 mt-2>
          <div mb-2>
            <div text='sm zinc-500' mb-1>右侧背景颜色</div>
            <ColorPicker
              disabledAlpha
              showText
              value={bgColor}
              onChange={(_, v) => setBgColor(v)}
              presets={[
                {
                  label: '预设',
                  colors: [
                    '#FFFFFF',
                    '#FFE4E6',
                    '#FCE7F3',
                    '#FAE8FF',
                    '#F3E8FF',
                    '#EDE9FE',
                    '#E0E7FF',
                    '#DBEAFE',
                    '#E0F2FE',
                    '#CFFAFE',
                    '#CCFBF1',
                    '#D1FAE5',
                    '#DCFCE7',
                    '#ECFCCB',
                    '#FEF9C3',
                    '#FEF3C7',
                    '#FFEDD5',
                    '#FEE2E2',
                    '#3F3F46',
                    '#BE123C',
                    '#BE185D',
                    '#A21CAF',
                    '#7E22CE',
                    '#6D28D9',
                    '#4338CA',
                    '#1D4ED8',
                    '#0369A1',
                    '#0E7490',
                    '#0F766E',
                    '#047857',
                    '#15803D',
                    '#4D7C0F',
                    '#CA8A04',
                    '#B45309',
                    '#C2410C',
                    '#B91C1C',
                  ],
                },
              ]}
            />
          </div>
          <div>
            <div text='sm zinc-500' mb-1>底部背景颜色</div>
            <ColorPicker
              disabledAlpha
              showText
              value={textColor}
              onChange={(_, v) => setTextColor(v)}
              presets={[
                {
                  label: '预设',
                  colors: [
                    '#FFFFFF',
                    '#FFE4E6',
                    '#FCE7F3',
                    '#FAE8FF',
                    '#F3E8FF',
                    '#EDE9FE',
                    '#E0E7FF',
                    '#DBEAFE',
                    '#E0F2FE',
                    '#CFFAFE',
                    '#CCFBF1',
                    '#D1FAE5',
                    '#DCFCE7',
                    '#ECFCCB',
                    '#FEF9C3',
                    '#FEF3C7',
                    '#FFEDD5',
                    '#FEE2E2',
                    '#3F3F46',
                    '#BE123C',
                    '#BE185D',
                    '#A21CAF',
                    '#7E22CE',
                    '#6D28D9',
                    '#4338CA',
                    '#1D4ED8',
                    '#0369A1',
                    '#0E7490',
                    '#0F766E',
                    '#047857',
                    '#15803D',
                    '#4D7C0F',
                    '#CA8A04',
                    '#B45309',
                    '#C2410C',
                    '#B91C1C',
                  ],
                },
              ]}
            />
          </div>
        </div>
        <div mt-2 text='sm red-500' className="-mt-1" flex='~ items-center'>
          <div className='block lg:hidden'>您的屏幕宽度不足以完整显示内容，已经帮你缩小显示啦，辛苦双指放大填写哦！（不影响导出质量）</div>
        </div>
      </div>
      <div mt-2 p-2 style={{ fontFamily: 'sans' }}>
        <div className='flex justify-center'>

          {/* @unocss-include */}
          <div bg='white' className={`min-w-230 z-0 shadow-xl relative px-4 py-4 rotate-90= origin-top  ${beforeOut ? ' scale-40 md:scale-80 lg:scale-100' : ''}`} ref={ref} style={status === 2 ? { display: 'none' } : {}}>
            <Watermark content={showText ? '[纪念票] 仅限个人收藏使用' : ''}>
              <SecureWatermark />
              <div flex='~ justify-between'>
                {showText ?
                  <>
                    <div absolute className='-z-10 text-7xl font-bold text-zinc-500/20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90'>纪念票</div>
                    <div absolute className='z-10 text-xs font-bold text-zinc-600 -bottom-4 left-0'>此票据由大贴纸生成 https://sticker.hsott.cn | 微信公众号：大贴纸 | 小红书：YuzeTT</div>
                  </> : ''
                }
                {/* left */}
                <div w='72%'>
                  {/* title */}
                  <div flex='~ items-center'>
                    {/* <div w-22 h-12 bg='gray-200' mr-4></div> */}
                    <HiddenLogo>
                      <img src="/images/damai.png" alt="" h-12 />
                    </HiddenLogo>
                    <div text='xl' font='bold' ml-4>
                      <HighText show={highLight} text='名称' eg='2023张杰未·LIVE- [耀·北斗] 巡回演唱会-北京站' />
                    </div>
                  </div>
                  <div flex='~'>
                    <div ml-2 mr-4 mt-4 text='center'>
                      <div text='2xl' mb-1 font='bold'>
                        <HighText show={highLight} text='区域' eg='一层' />
                      </div>
                      <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={130} color='black' type={'svg'} />
                      <div text='xl' font='bold' mt-2>
                        <HighText show={highLight} text='提示文字1' eg='内场严禁' />
                      </div>
                      <div text='xl' font='bold'>
                        <HighText show={highLight} text='提示文字2' eg='携带灯牌' />
                      </div>
                    </div>
                    <div>
                      <div text='lg' font='bold' className='space-y-1'>
                        <div>时间：<HighText show={highLight} text='时间' eg='2023年8月25日 星期六 19:00' /></div>
                        <div>场馆：<HighText show={highLight} text='场馆' eg='国家体育场（鸟巢）' /></div>
                        <div flex='~'>
                          <div>区域：<HighText show={highLight} text='区域' eg='一层' /></div>
                          <div ml-8><HighText show={highLight} text='详细区域' eg='H区511通道' /></div>
                        </div>
                        <div flex='~'>
                          <div>座位：<HighText show={highLight} text='排数' eg='14排' /></div>
                          <div ml-8><HighText show={highLight} text='号数' eg='65号' /></div>
                        </div>
                        <div>票价：<HighText show={highLight} text='价格' eg='1820元' /></div>
                      </div>
                      <div font='bold' className='space-y-1'>
                        <div text=''><HighText show={highLight} text='提示文字' eg='荧光棒循环利用，离场请勿带走；进场请勿携带其他发光体；' /></div>
                        <div flex='~'>
                          <div text=''>NO：<HighText show={highLight} text='编码' eg='2839100463728' /></div>
                          <div text='' ml-8>T.N：<HighText show={highLight} text='号码' eg='13688880000' /></div>
                        </div>
                        <div text='sm'><HighText show={highLight} text='温馨提示1' eg='温馨提示：请携带本人二代身份证原件实名入场，副券撕下无效。' /></div>
                        <div text='sm'><HighText show={highLight} text='温馨提示2' eg='票纸涂改无效，请提前入场，避开安检高峰，对号入座并配合安检人员检查' /></div>
                      </div>

                    </div>
                  </div>
                  <div mt-6 className='-mb-2'>
                    <div w-full h-auto rounded-xl overflow-hidden flex='~' style={{ background: textColor }}>
                      <div bg='black' h-full text='white' flex='~ items-center justify-center' px-2 py-1>
                        <div className="i-ri-phone-fill text-2xl" />
                        <div ml-1 text='xl'><HighText show={highLight} text='号码' eg='1010-0000' /></div>
                      </div>
                      <div flex='~ items-center justify-end' flex-1>
                        <div mr-4 text-xl font-bold><HighText show={highLight} text='文字' eg='BETTER STCIKER' /></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className='-my-4 -mr-4' flex='~' flex-1 relative>
                  <div h-full style={{ borderLeft: '1px dashed #EFEFEF' }} ml-2></div>
                  <div style={{ borderLeft: '1px dashed #EFEFEF' }} h-full absolute className='left-1/2 ml-1 transform -translate-x-1/2 z-20'></div>
                  {/* <div h-full absolute className='w-[1px]  left-1/2 transform -translate-x-1/2 z-10  ml-1'></div> */}
                  <div p-2 w-full>
                    <div w-full h-full relative style={{ background: bgColor }}>

                      {/* <div text='5xl' font='bold' scale-x-75 w='125%' origin-left text-center>SUB TICKET</div> */}
                      <div text='5xl' font='bold' scale-x-65 absolute className='left-1/2 transform -translate-x-1/2 whitespace-nowrap' mt-4>SUB TICKET</div>
                      <div grid grid-cols-2 w-full text='2xl' font='bold' pt-18 text-center className=''>
                        <div className='tracking-[1rem] indent-[1rem]'>副券</div>
                        <div className='tracking-[1rem] indent-[1rem]'>副券</div>
                      </div>
                      <div grid grid-cols-2 mt-4>
                        <div space-y-3>
                          <div text-lg font-bold text-center>
                            <HighText show={highLight} text='区域' eg='内场' />

                          </div>
                          <div text-lg font-bold text-center>
                            <HighText show={highLight} text='区号' eg='A1' />
                          </div>
                          <div text-lg font-bold text-center>
                            <HighText show={highLight} text='排数' eg='14排' />
                          </div>
                          <div text-lg font-bold text-center>
                            <HighText show={highLight} text='号数' eg='65号' />
                          </div>
                        </div>
                        <div text-center>
                          <div space-y-3>
                            <div text-lg font-bold>
                              <HighText show={highLight} text='日期' eg='10月29日' />
                            </div>
                            <div text-lg font-bold>
                              <HighText show={highLight} text='时间' eg='19:00' />
                            </div>
                            <div text-lg font-bold>
                              <HighText show={highLight} text='价格' eg='1820元' />
                            </div>
                            <div text-lg font-bold text-center></div>
                            {/* <div text-lg font-bold text-center>27号</div> */}
                          </div>
                        </div>
                      </div>
                      <div grid grid-cols-2 mt-2>
                        <div></div>
                        <div mx-auto>
                          <div text-sm font-bold>T.N:</div>
                          <div text-sm font-bold><HighText show={highLight} text='我不知道' eg='Q000234567' /></div>
                        </div>
                      </div>
                      <div grid grid-cols-2 mx-4 my-2 py-10px px-3 text-sm font-bold rounded-xl bg='white' op70>
                        <div text-center>自行撕下无效</div>
                        <div text-center>自行撕下无效</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Watermark>
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
