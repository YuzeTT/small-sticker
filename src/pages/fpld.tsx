import { Segmented, message, Upload, Button, ColorPicker, Slider } from "antd";
// import dayjs from 'dayjs'
import ImgCrop from 'antd-img-crop';
import { useCallback, useRef, useState } from "react";
import HighText from "../components/HighText";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";
import InputGuide from "../components/InputGuide";
import ExportList from "../components/ExportList";
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
// import isVip from "../utils/isVip";
// import WelcomeVip from "../components/WelcomeVip";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default function Fpld() {
  const ref = useRef<HTMLDivElement>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [imageSrc, setImageSrc] = useState<{ time: string, data: string }[]>([]);
  const [highLight, setHighLight] = useState<boolean>(true)
  const [beforeOut, setBeforeOut] = useState(true)
  const [status, setStatus] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [textColor, setTextColor] = useState('#F3B6A4')
  const [bgColor, setBgColor] = useState('#57403F')
  const [bgColor2, setBgColor2] = useState('#796665')
  const [bgColor3, setBgColor3] = useState('#FFFFFF')
  const [side, setSide] = useState(1)
  const [bottomPixel , setBottomPixel] = useState(30)
  const [mixMode , setMixMode] = useState('normal')

  // const vip_status = isVip()

  const out = useCallback((n?: number) => {
    setBeforeOut(false)
    if (ref.current === null) {
      console.log(ref.current);
      return
    }
    console.log(ref.current);
    
    setIsLoading(true)

    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });

    try {
      showImage(ref.current, "PNG", true, n).then((imageData) => {
        if (imageData === 'data:,') {
          console.log(imageData);

          messageApi.open({
            key,
            type: 'error',
            content: '生成失败，请将控制台截图反馈给开发者',
          });
          setIsLoading(false)
          setBeforeOut(true)
        } else {
          setStatus(2)
          messageApi.open({
            key,
            type: 'success',
            content: '生成成功！',
          });
          setBeforeOut(true)
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
      setBeforeOut(true)
    }
  }, [ref, messageApi])

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrl2, setImageUrl2] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const handleChange2: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading2(true);
      return;
    }
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading2(false);
      setImageUrl2(url);
    });
  };

  const uploadButton = (
    <div>
      {loading ? '上传中' : <div className="i-ri-file-upload-line mx-auto text-2xl" />}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );

  return (
    <div>
      {contextHolder}
      {/* <WelcomeVip level={vip_status.level} name={vip_status.name} /> */}
      <InputGuide hiddenTips />
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
      
      <div mt-4 className={status === 2 ? 'hidden' : ''}>
        <div flex='~ justify-center items-start'>
          <div mr-4 className='flex flex-col'>
            <div text='sm zinc-500' mb-1>上传图片</div>
            {/* 0.89 */}
            <ImgCrop rotationSlider showGrid aspect={0.8}>
              <Upload
                name="Image"
                listType="picture-card"
                className="overflow-hidden"
                showUploadList={false}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </ImgCrop>
          </div>
          <div grid grid-cols-2 gap-2>
            <div>
              <div text='sm zinc-500' mb-1>背景颜色(正)</div>
              <ColorPicker
                showText
                value={bgColor3}
                onChange={(_, v) => setBgColor3(v)}
                presets={[
                  {
                    label: '背景颜色',
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
                    ],
                  },
                ]}
              />
            </div>
            <div>
              <div text='sm zinc-500' mb-1>背景颜色(背)</div>
              <ColorPicker
                showText
                value={bgColor}
                onChange={(_, v) => setBgColor(v)}
                presets={[
                  {
                    label: '背景颜色',
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
                    ],
                  },
                ]}
              />
            </div>
            <div>
              <div text='sm zinc-500' mb-1>底片颜色</div>
              <ColorPicker
                showText
                value={bgColor2}
                onChange={(_, v) => setBgColor2(v)}
                presets={[
                  {
                    label: '背景颜色',
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
                    ],
                  },
                ]}
              />
            </div>
            <div>
              <div text='sm zinc-500' mb-1>文字颜色</div>
              <ColorPicker
                showText
                value={textColor}
                onChange={(_, v) => setTextColor(v)}
                presets={[
                  {
                    label: '文字颜色',
                    colors: [
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
        </div>
        <div className='flex-1 w-full mt-1 flex mt-2'>
          <div>
            <div text='sm zinc-500' mb-1>添加签名</div>
            <Upload
              name="Image"
              showUploadList={false}
              onChange={handleChange2}
            >
              <Button className='w-full flex items-center'>
                {/* <div className="i-ri-vip-fill text-orange-500 mr-1 text-lg" /> */}
                {loading2?'上传中':'上传签名'}
              </Button>
            </Upload>
          </div>
          <div className='flex-1 ml-2'>
            <div text='sm zinc-500' mb-3>签名高度</div>
            <Slider  defaultValue={30} value={bottomPixel} onChange={(v)=>{setBottomPixel(v)}} />
          </div>
        </div>
        <div text='sm zinc-500' mb-1 mt-2>签名叠加模式</div>
        <Segmented block={true} options={[
          {value: 'normal', label: '正常 · 透明'},
          {value: 'multiply', label: '正片叠底 · 白底'},
          {value: 'lighten', label: '变亮 · 黑底'},
          ]}
          onChange={(v)=>{setMixMode(`${v}`)}}
        />
      </div>
      <div mt-4 p-4 font-sans bg-white rounded-xl>
        {/* <Tabs defaultActiveKey="1" centered items={items} destroyInactiveTabPane={true}/> */}

        
        {status !== 2 ?
          <>
            <Segmented block={true} options={[
              { label: '正面', value: 1 },
              { label: '背面', value: 2 },
            ]} value={side} onChange={(v) => { setSide(parseInt(`${v}`)) }} />
            {status === 1 ?
              <>
                <div mt-4>
                  <Button className="w-full" type="primary" onClick={() => { out(undefined) }} flex='~ items-center justify-center' loading={isLoading}>
                    <div className="i-ri-dvd-fill" mr-1 text='lg' style={{ display: isLoading ? 'none' : 'block' }} />
                    {isLoading ? '导出中' : '急速导出 (266px*366px)'}
                  </Button>
                  <div flex='~ gap-2'>
                    <Button className="w-full mt-2" onClick={() => { out(5) }} flex='~ items-center justify-center' loading={isLoading}>
                      <div className="i-ri-hd-fill text-orange-500" mr-1 text='lg' style={{ display: isLoading ? 'none' : 'block' }} />
                      {isLoading ? '导出中' : '高清（x5）'}
                    </Button>
                    <Button className="w-full mt-2" onClick={() => { out(10) }} flex='~ items-center justify-center' loading={isLoading}>
                      <div className="i-ri-4k-fill text-red-500" mr-1 text='lg' style={{ display: isLoading ? 'none' : 'block' }} />
                      {isLoading ? '导出中' : '超清（x10）'}
                    </Button>
                  </div>
                </div>
                <div my-2 text='sm orange-500' flex='~ items-center'>
                  <div className="i-ri-lightbulb-line mr-1" />
                  <div>正反面需要分别导出哦！</div>
                </div>
                <div my-4 text='sm zinc-500' flex='~ items-center justify-center'>
                  {/* <div className="i-ri-lightbulb-line mr-1" /> */}
                  <div>266px*366px (含出血) | 高清 x5倍 | 超清 x10倍</div>
                </div>
              </>
              : ''
            }
            <div className='flex flex-col justify-center items-center mb-3 mt-4'>
                {side === 1 ?
                  <div className={`min-w-[250px] max-w-[250px] z-0 relative min-h-[350px] max-h-[350px] h-[350px]  origin-top flex flex-col`} style={{ background: bgColor3, boxShadow: '0 0 1em #00000020', border: '8px solid white' }} ref={ref}>
                    {imageUrl2?
                      <img src={imageUrl2} alt="" className='absolute w-1/2 right-2 transform' style={{bottom: bottomPixel+'px', mixBlendMode: mixMode==='normal'?'normal':mixMode==='multiply'?'multiply':'lighten'}} />:''
                    }
                    <div className='mx-5 my-7'>
                      {!imageUrl ?
                        <div w-full h-full text-stone-500 flex flex-col items-center justify-center className='text-md min-h-[250px]' style={{border: '2px dashed #EDEDED'}}>
                          <div>请在顶部上传照片</div>
                        </div> :
                        <img src={imageUrl} alt="" w-full />
                      }
                    </div>
                    <SecureWatermark />
                  </div> :
                  <div className={`min-w-[250px] max-w-[250px] ${highLight ? 'h-auto' : 'min-h-[350px] max-h-[350px] h-[350px]'} z-0 relative origin-top flex flex-col ${beforeOut ? ' ' : ''}`} ref={ref} style={{ background: bgColor, boxShadow: '0 0 1em #00000020', border: '8px solid white'}}>
                    <div style={{ color: textColor }}>
                      <div text-center text-sm py-1>
                        <HighText show={highLight} text='提示文字' eg="Don't put in mouth." inputed />
                      </div>
                    </div>
                    <div className='min-h-[250px] max-h-[250px]' style={{background: bgColor2}}>
                    </div>
                    <div flex='~ items-center justify-center' className='flex-1 flex-grow' style={{ color: textColor }}>
                      {new Array(2).fill(null).map((_, k) => (
                        <div key={k} mx-auto>
                          <div text-2xl font-bold>
                            <HighText show={highLight} text='提示文字' eg="instax" inputed />
                          </div>
                          <div text-xs font-bold text-center>
                            <HighText show={highLight} text='提示文字' eg="FUJIFILM" inputed />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* </VipWatermark> */}
                    {/* <SecureWatermark /> */}
                  </div>
                }
            </div>
          </> : ''
        }
        {status === 2 ?
          <ExportList imageSrc={imageSrc} /> :
          ''
        }
      </div>
    </div>
  )
}
