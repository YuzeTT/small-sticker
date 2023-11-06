import { QRCode, Segmented, message, Button, ColorPicker, Watermark, Space, Input, Modal, Collapse } from "antd";
// import dayjs from 'dayjs'
import { useCallback, useRef, useState } from "react";
import JSEncrypt from 'jsencrypt'
import HighText from "../components/HighText";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";
import InputGuide from "../components/InputGuide";
import ExportList from "../components/ExportList";
import HiddenLogo from "../components/HiddenLogo";

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
  const [inputKey, setInputKey] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const decrypt = new JSEncrypt()
  const priKey = `-----BEGIN RSA PRIVATE KEY-----
  MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCooGiojjdOFc4h
  uuR5LreCu/G41oq99UpG2mJqpukczSqrxJCoyqSWGgFOoEhuZyIcPdbOzPdC5vlI
  j99M77PO9hggH+W2F+SDFnWboFg3bb5yaPWo3TRegNmIk8IBD5UZEqRt4puA4cua
  a0c3HWHEVLdF6l9leiSiX6brhiTK1/BpkOBxyONMExI8I39nz+9lS76x1IVKZDOB
  W+FpH1ph0P+hFJwH4eSLiVvRVz2Rj5CRhdN32GWKIFN43QXXyj/UC3d1SiO/aDuG
  +y9HVKCYhQp9aDh/gQWwsHsiqGZj6MMtGrmqUqeO1GF3y5cpbD5u8U3rzfUCNXgE
  gRuMpuJbAgMBAAECggEAEGhzZptYBFAY261c1/HUx3LURYESxQMeNCDB3NDa9AN+
  uHILBXGabEShhe4QvjVo20ilI0BMewUQkp/1QX49h9Dobg/MgVh30s2XqgoDK3mR
  Q361ELZdhyiQgjqmcQX8IxFuUIbxTKwr7J2ts043miwIHVR97djhwa7/BgHqiJYr
  b4le0VMRiY467YMj+ir7roqEo7lALSVdw4pZvRJmVqXXhSjgzOYWfbSZGUvReZz3
  Lil85GxSm6suT/0Y6zchKf71UUomnhG9yss9EOqcxRrJCiF6miaZkt3DhFjJW8NY
  kUXAN6UwiuX8vVwWulVWo0snUemPlNtLvKbWGxfMWQKBgQD3fsVoc03ybRA/rdYu
  ZEtBYvnIVJK+Uc58tsXdcIotsG0Wtshm+G1bvnNjhS3V1LpHqGxZPW3y+ZWR9WOa
  5MiTL9qlVh/pVmo7LMlkLCVnCBD6vJgGjE3g1KtAQLBLoFeJUC0ds/w9qeQy0OWG
  MYCMcZrzKnn1MrMkQWtoxfGhLwKBgQCua9OGBEP9K52ZcN+fZzK2DpimL7zdExkw
  rFAIaPsqKXRcuzuMiy8wiDwdZSKCdNY3ZwugIMFHP9IDQ1jx3JBfPPmR1z9tldGl
  w+7rLNxhMrG3o87r1TQy5Cf6xJJFNunkNeAFUzcNretW3NG/8LtxaYjU1M2JSbaS
  Oof1aySOlQKBgFNkEZvqDf97JBhwuFQVUw4LDWKkrHUYF10KMI02WDig04DtwYSA
  fEiHWVXVD+aWsNVoOGmxOxS9Z9owNomAQNznKOLArCvxBAZARvNLtKaMnzv8w7Sh
  HbR9s94Ibd5tflE0BJ+Xf4w/bDZ7EHswvsGTncQFMeaeWKIEsO4ylAHdAoGAOX6b
  nCqdyr9s1N6LKD1ZTv/iu60ywWEBRbUXMJ6CZHSDwemKCJr8tC/EOSBUTtJ6poqW
  H3OMopLcBG1XzWoaQPqVfciJRPNExzKd9/Gyt2uBf3pExCJkcX4Z26SeXqhqUuqb
  bMXweNbio6Bol6+f6hOSoi1/jwi4YN1gYbqusz0CgYBtKPMv2nz5Tl8jHxI0bHuw
  CUnoElOmNZMYFRxGzTelj0k/Ml56nq20EZwO8BNTQ7ytoBT4E6IZdGqW7tLuRCrY
  cU+XWfO0SyWX6T8ZFAVEL22q3oYjXOPZjlAt7WLcLG5Y0j5eoV3heH+iRGNfvCJW
  1YJO0YUsNoBnh2UQI9r2zg==
  -----END RSA PRIVATE KEY-----
  `
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

  const removeText = () => {
    const uncrypted = decrypt.decrypt(inputKey)
    console.log(inputKey);
    if (uncrypted === null) {
      messageApi.open({
        type: 'error',
        content: '密钥错误',
      });
      return
    }
    const v = JSON.parse(uncrypted.toString())
    console.log(v);
    const t = new Date().getTime()
    if (v.time - t >= 0) {
      console.log('有效');
      setShowText(false)
      messageApi.open({
        type: 'success',
        content: `去水印成功，感谢${v.name}的支持！`,
      });

    } else {
      console.log('无效');
      messageApi.open({
        type: 'error',
        content: '您的密钥已失效',
      });
    }

  }

  return (
    <div>
      {highLight}
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
        <div text='sm zinc-500' mb-1>去水印密钥（选填）</div>
        <Space.Compact style={{ width: '100%' }}>
          <Input.Password placeholder="请输入密钥以去水印" value={inputKey} onChange={(v) => { setInputKey(v.target.value) }} />
          <Button type="primary" onClick={() => { removeText() }}>去水印</Button>
        </Space.Compact>
        <div className=''>
          <Button type="primary" onClick={showModal} className='mt-2'>
            获得密钥（全站通用）
          </Button>
        </div>
        <Modal title="获得密钥（全站通用）" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p text-lg>途径一</p>
          <p>直接购买去水印限时<b>不限次</b>套餐 （选好了直接加微信转账就行啦！）</p>
          <div grid grid-cols-3 mb-2 gap-2>
            {/* <div text-center bg-zinc-100 rounded-xl py-2 px-2>
              <div text-2xl font-bold>10小时</div>
              <div mt-1>支持一下</div>
              <div text-lg text-red font-bold>￥1.88</div>
            </div>
            <div text-center bg-zinc-100 rounded-xl py-2 px-2>
              <div text-2xl font-bold>24小时</div>
              <div mt-1>来瓶可乐</div>
              <div text-lg text-red font-bold>￥3.00</div>
            </div>
            <div text-center bg-zinc-100 rounded-xl py-2 px-2>
              <div text-2xl font-bold>5天</div>
              <div mt-1>来瓶东方树叶</div>
              <div text-lg text-red font-bold>￥5.00</div>
            </div> */}
            <div text-center bg-zinc-100 rounded-xl py-2 px-2 onClick={() => { messageApi.open({ type: 'warning', content: '直接加微信哦~' }) }}>
              <div text-2xl font-bold>14天</div>
              <div mt-1>来瓶奶茶</div>
              <div text-lg text-red font-bold>￥12.00</div>
            </div>
            <div text-center bg-zinc-100 rounded-xl py-2 px-2 onClick={() => { messageApi.open({ type: 'warning', content: '直接加微信哦~' }) }}>
              <div text-2xl font-bold>30天</div>
              <div mt-1>来点下午茶</div>
              <div text-lg text-red font-bold>￥18.00</div>
            </div>
            <div text-center bg-zinc-100 rounded-xl py-2 px-2 onClick={() => { messageApi.open({ type: 'warning', content: '直接加微信哦~' }) }}>
              <div text-2xl font-bold>永久</div>
              <div mt-1>再生父亲套餐</div>
              <div text-lg text-red font-bold>￥50.00</div>
            </div>
          </div>
          <Collapse
            items={[{
              key: '1', label: '点击展开加微信', children: <>
                <img src="/images/wechat_qrcode.jpg" alt="" w-full />
              </>
            }]}
          />
          <p>之前赞助过的用户可以直接找我兑换哦~</p>
          <p text-lg>途径二</p>
          <p>关注公众号：大贴纸 回复推广获取详情</p>
        </Modal>
        <div mt-2 text='sm red-500' className="-mt-1" flex='~ items-center'>
          {/* <div className="i-ri-lightbulb-line mr-1" /> */}
          <div className='block lg:hidden'>您的屏幕宽度不足以完整显示内容，已经帮你缩小显示啦，辛苦双指放大填写哦！（不影响导出质量）</div>
        </div>
      </div>
      <div mt-2 p-2 style={{ fontFamily: 'sans' }}>
        <div className='flex justify-center'>

          {/* @unocss-include */}
          <div bg='white' className={`min-w-220 z-0 shadow-xl relative px-4 py-4 rotate-90= origin-top  ${beforeOut ? ' scale-40 md:scale-80 lg:scale-100' : ''}`} ref={ref} style={status === 2 ? { display: 'none' } : {}}>
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
                {/* <div flex='~' className='flex-1 -m-4' ml-2>
                    <div grid grid-cols-2 w-full>
                      <div mx-auto w-full py-2>
                        <div bg='red' h-full>
                          <div text='4xl center' font-bold scale-x-75>SUB</div>
                          <div text='3xl center'>副 券</div>
                        </div>
                      </div>
                      <div mx-auto w-full style={{borderLeft: '1px dashed #F87171'}} py-2>
                        <div bg='red' h-full mr-2>
                          <div text='4xl center' font-bold scale-x-75>TICKET</div>
                          <div text='3xl center'>副 券</div>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
