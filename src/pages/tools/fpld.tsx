import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import { Segmented, Upload, Button, ColorPicker, Slider } from "antd";
import SecureWatermark from "../../components/SecureWatermark";
import ImgCrop from 'antd-img-crop';
import { useState, RefObject } from "react";
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import BaseCard from "../../components/BaseCard";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default function Fpld() {
  const [highLight, ref]:[highLight: boolean, ref:RefObject<HTMLDivElement>] = useOutletContext();

  const [textColor, setTextColor] = useState('#F3B6A4')
  const [bgColor, setBgColor] = useState('#57403F')
  const [bgColor2, setBgColor2] = useState('#796665')
  const [bgColor3, setBgColor3] = useState('#FFFFFF')
  const [side, setSide] = useState(1)
  const [bottomPixel , setBottomPixel] = useState(30)
  const [mixMode , setMixMode] = useState('normal')

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
      <div className={!highLight ? 'hidden' : ' '}>
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

        <div text='sm zinc-500' mb-1 mt-2>导出面（双面需要分别导出）</div>
        <Segmented className='mt-2' block={true} options={[
          { label: '正面', value: 1 },
          { label: '背面', value: 2 },
        ]} value={side} onChange={(v) => { setSide(parseInt(`${v}`)) }} />
      </div>

      <>
        <div className='flex flex-col justify-center items-center mt-8'>
          <div className='relative'>
            {side === 1 ?
              <BaseCard ref={ref}>
                <div className={`min-w-[250px] max-w-[250px] z-0 relative min-h-[350px] max-h-[350px] h-[350px]  origin-top flex flex-col`} style={{ background: bgColor3, border: '8px solid white' }}>
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
                </div>
              </BaseCard> :
              <BaseCard ref={ref}>
                <div className={`min-w-[250px] max-w-[250px] ${highLight ? 'h-auto' : 'min-h-[350px] max-h-[350px] h-[350px]'} z-0 relative origin-top flex flex-col`} style={{ background: bgColor, border: '8px solid white'}}>
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
                </div>
              </BaseCard>
            }
            <SecureWatermark />
          </div>
        </div>
      </>
    </div>
  )
}
