import { Segmented, message, Upload, Button, ColorPicker } from "antd";
import dayjs from 'dayjs'
import { useCallback, useRef, useState } from "react";
import HighText from "../components/HighText";
import showImage from "../utils/downloadHtmlAsImage/showImage";
import SecureWatermark from "../components/SecureWatermark";
import InputGuide from "../components/InputGuide";
import ExportList from "../components/ExportList";
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default function Heytea() {
  const ref = useRef<HTMLDivElement>(null)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [imageSrc, setImageSrc] = useState<{ time: string, data: string }[]>([]);
  const [highLight, setHighLight] = useState<boolean>(true)
  const [status, setStatus] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [textColor, setTextColor] = useState('#C2410C')
  const [bgColor, setBgColor] = useState('#FFEDD5')

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

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

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

  const uploadButton = (
    <div>
      {loading ? '上传中' : <div className="i-ri-file-upload-line mx-auto text-2xl" />}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );


  return (
    <div>
      {contextHolder}
      <InputGuide />
      {/* <Alert message="此项目疑似被“特别关注”或将出现法律风险，故临时下线电影票功能维护，将去除所有第三方信息，只保留纪念功能。感谢您的支持！" type="error" showIcon closable /> */}
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
        <Button className="w-full mt-4" type="primary" onClick={out} flex='~ items-center justify-center' size='large' loading={isLoading}>
          <div className="i-ri-camera-fill" mr-1 text='lg' style={{ display: isLoading ? 'none' : 'block' }} />
          {isLoading ? '正在导出请勿切换页面' : '导出图片'}
        </Button> : ''
      }
      <div mt-4 className={status === 2 ? 'hidden' : ''}>

        <div flex='~ justify-center'>
          <div mr-4>
            <div text='sm zinc-500' mb-1>上传图片</div>
            <Upload
              name="Image"
              listType="picture-card"
              className="overflow-hidden"
              showUploadList={false}
              // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              // beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>
          <div>
            <div mb-2>
              <div text='sm zinc-500' mb-1>背景颜色</div>
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
      </div>
      <div mt-4 p-2 font-sans>
        <div className='flex justify-center'>
          <div className='w-auto z-0 shadow-xl relative w-full' ref={ref} style={status === 2 ? { display: 'none' } : { background: bgColor }}>
            <SecureWatermark />
            <div p-4>
              <img src={imageUrl} alt="" w-full rounded-md />
            </div>
            <div px-4 mb-4 className='-mt-2'>
              <div text='2xl' font='bold' mt-1 style={{ color: textColor }}>
                <HighText show={highLight} text='照片内容' eg='校运会' />
              </div>
              <div text='sm' mt-1 style={{ color: textColor }}>
                <HighText show={highLight} text='地点' eg='福建省，南平市' />
              </div>
              <div flex='~ items-end justify-between' h-full mt-8>
                <div flex='~ items-center' rounded-md style={{ border: '2px solid ' + textColor }}>
                  <div text='sm' font='bold' className='px-1 py-0.5' style={{ color: textColor }}>
                    <HighText show={highLight} text='日期' eg={dayjs().format('YYYY')} />
                  </div>
                  <div className='self-stretch w-5' style={{ borderLeft: '2px solid ' + textColor, borderRight: '2px solid ' + textColor, background: textColor + '7F' }}>

                  </div>
                  <div text='sm' font='bold' className='px-1 py-0.5' style={{ color: textColor }}>
                    <HighText show={highLight} text='日期' eg={dayjs().format('MM-DD HH:mm')} />
                  </div>
                </div>
                <div font='bold' style={{ color: textColor }} absolute right-4 bottom-4>
                  {/* <div>HELLO</div> */}
                  <div>
                    <HighText show={highLight} text='标语1（可换行）' eg='HELLO' />
                  </div>
                  <div>
                    <HighText show={highLight} text='标语2（可换行）' eg="I'M HERE" />
                  </div>
                </div>
              </div>
            </div>
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
