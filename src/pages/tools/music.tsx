import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import Cropper, { ReactCropperElement } from "react-cropper";
import HighText from "../../components/HighText";
import Toggle from "../../components/Toggle";
import { useOutletContext } from "react-router-dom";
import { ChangeEvent, RefObject, useState, useRef } from "react";
import BaseCard from "../../components/BaseCard";

import "cropperjs/dist/cropper.css";

export default function Rseg() {
  const cropperRef1 = useRef<ReactCropperElement>(null)
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()

  const [highLight, ref]: [highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  const [image1, setImage1] = useState('');
  const [image1Size, setImage1Size] = useState(0);
  const [image1Crop, setImage1Crop] = useState('');
  const [bleedingLine, setBleedingLine] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [tr, setTr] = useState(false);
  const [isRounded, setIsRounded] = useState(true);
  const [progress, setProgress] = useState(50)

  const handleImage1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage1Size(file?.size || 0)
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage1(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
    onOpen1()
  }

  const getCropData1 = () => {
    if (typeof cropperRef1.current?.cropper !== "undefined") {
      setImage1Crop(cropperRef1.current?.cropper.getCroppedCanvas().toDataURL());
    }
  }

  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div>
      <Drawer
        isOpen={isOpen1}
        placement='bottom'
        onClose={onClose1}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>裁剪图片</DrawerHeader>

          <DrawerBody className='mx-auto'>
            <div className='text-xs mb-4 text-orange-600'>
              <span className='text-[0.7rem] text-white bg-orange-600 px-1 py-0.5 rounded mr-1 leading-6'>提示</span>
              <span>如果此处没图片↓↓ 大概率是浏览器/格式不支持 或者尺寸太大需要稍等一会~ （微信内置浏览器可能无法加载较大的图片）</span>
            </div>
            <Cropper
              src={image1}
              style={{ height: 'auto', width: "auto", maxHeight: '50vh', maxWidth: "80vw" }}
              initialAspectRatio={1}
              aspectRatio={1}
              guides={true}
              autoCropArea={1}
              ref={cropperRef1}
              viewMode={1}
              background={false}
            />
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant='outline' mr={3} onClick={onClose1}>
              取消
            </Button> */}
            <Button colorScheme='messenger' onClick={() => {
              getCropData1()
              onClose1()
            }}>裁剪</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className='grid grid-cols-1 gap-2 mb-4'>
        <label className='w-full flex'>
          <input type="file" onChange={handleImage1Change} className='hidden w-0' accept="image/*">
          </input>
          <Button
            as='span'
            variant='outline'
            colorScheme='messenger'
            className='w-full'
            border={'1px dashed'}
            leftIcon={<div className="i-ri-image-add-fill text-xl" />}
          >
            上传图片
          </Button>
        </label>
      </div>
      <div>
        {image1Size >= 5120000 ?
          <div className='text-sm text-red-500 text-center mb-2'>文件较大({formatBytes(image1Size)}) 导出可能需要 1-3分钟</div> : ''
        }
      </div>
      <div className='mb-4'>
        <div className='text-sm op50'>歌曲进度条（点击操作以防止触发返回手势）</div>
        <input type="range" value={progress} onChange={(v)=>setProgress(parseInt(v.target.value))
        } className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
      </div>
      {/* <div className='mb-4'>
        <table className='mx-auto'>
          <tbody>
            <tr>
              <td className='text-sm op70'>3mm 出血线（印刷需打开）</td>
              <td>
                <Switch id='line' size='sm' isChecked={bleedingLine} onChange={(v) => { setBleedingLine(v.target.checked) }} />
              </td>
            </tr>
            <tr>
              <td className='text-sm op70'>修复模式（图像缺失需打开）</td>
              <td>
                <Switch id='line2' size='sm' isChecked={isSmall} onChange={(v) => { setIsSmall(v.target.checked) }} />
              </td>
            </tr>
            <tr>
              <td className='text-sm op70'>圆角（印刷推荐关闭）</td>
              <td>
                <Switch id='line3' size='sm' isChecked={isRounded} onChange={(v) => { setIsRounded(v.target.checked) }} />
              </td>
            </tr>
            <tr>
              <td className='text-sm op70'>透明背景</td>
              <td>
                <Switch id='line4' size='sm' isChecked={tr} onChange={(v) => { setTr(v.target.checked) }} />
              </td>
            </tr>
          </tbody>
        </table>
        
      </div> */}
      <div className='flex items-start justify-center gap-6 my-6'>
        <Toggle
          value={bleedingLine}
          onChange={(v)=>setBleedingLine(v)}
          icon={<div className="i-ri-shape-2-line" />}
          text='出血线'
          remark='印刷需打开'
        />
        <Toggle
          value={isRounded}
          onChange={(v)=>setIsRounded(v)}
          icon={<div className="i-ri-rounded-corner" />}
          text='圆角'
        />
        <Toggle
          value={isSmall}
          onChange={(v)=>setIsSmall(v)}
          icon={<div className="i-ri-bug-line" />}
          text='修复模式'
          remark='修复图像缺失'
        />
        <Toggle
          value={tr}
          onChange={(v)=>setTr(v)}
          icon={<div className="i-ri-contrast-drop-fill" />}
          text='透明背景'
        />
      </div>

      <div className='text-xs text-center mb-4 text-orange-600'>
        <span className='text-[0.7rem] text-white bg-orange-600 px-1 py-0.5 rounded mr-1'>提示</span>
        <span>歌词仅有一行时，比例才适用于冲印</span>
      </div>
      <BaseCard ref={ref} className={`-mx-4 overflow-hidden ${isSmall ? 'scale-85' : ''}`}>
        <div className={` min-w-[231.5px] max-w-[231.5px] z-0 relative  ${isRounded ? 'rounded-xl overflow-hidden' : ''} ${highLight ? 'h-auto' : 'min-h-[359px] max-h-auto h-auto'} origin-top`}>
          {!tr && image1Crop ?
            <>
              <img src={image1Crop} alt="bg" className='absolute origin-center  -z-30' />
              <div className='w-full h-full absolute bg-black/20 -z-10 bg-center bg-contain bg-cover! bg-no-repeat overflow-hidden ' style={{ backgroundImage: `url(${image1Crop})`}}></div>
              <div className='w-full h-full absolute bg-black/20 -z-10 bg-center bg-contain bg-cover! bg-no-repeat overflow-hidden blur-img-sm blur-img-webkit-sm scale-150' style={{ backgroundImage: `url(${image1Crop})`}}></div>
              <div className='w-full h-full absolute bg-black/20 -z-10 bg-center bg-contain bg-cover! bg-no-repeat overflow-hidden blur-img blur-img-webkit scale-150' style={{ backgroundImage: `url(${image1Crop})`}}></div>
              <div className='w-full h-full absolute bg-black/20 -z-10'></div>
            </>:''
          }
          <div className='flex flex-col h-full' style={bleedingLine ? { border: '12.18px dashed #FF000000' } : {}}>

            <div className='mx-auto pt-4'>
              {image1Crop ?
                <div className={`rounded-lg bg-center bg-contain bg-cover! bg-no-repeat overflow-hidden`} style={{ backgroundImage: `url(${image1Crop})`, height: bleedingLine ? '175.14px' : '199.5px', width: bleedingLine ? '175.14px' : '199.5px' }}></div> :
                <div className='rounded-lg bg-zinc-200 flex justify-center items-center op50' style={{ height: bleedingLine ? '175.14px' : '199.5px', width: bleedingLine ? '175.14px' : '199.5px' }}>
                  请上传图片
                </div>
              }
            </div>
            {/* <div className='text-[0.6rem] px-5 pt-2 text-white'>iPhone</div> */}
            <div className='text-sm px-5 text-white pt-2'>
              <HighText show={highLight} text='歌名' eg='晴天' />
            </div>
            <div className='text-xs px-5 text-white/50'>
              <HighText show={highLight} text='作者' eg='周杰伦' />
            </div>
            <div className='text-xs px-5 text-white op80 mt-1 text-left'>
              <HighText show={highLight} text='歌词(可换行)' eg='从前从前 有个人爱妳很久' />
              {/* ↑↓←→↖↗↙↘↕）？ */}
            </div>
            <div className='flex px-5 my-1.5 text-white items-center'>
              <div className="text-[0.6rem] flex-1 op80 whitespace-nowrap">
                <HighText show={highLight} text='播放' eg='1:21' />
              </div>
              <div className="w-full h-[6px] mx-2 bg-white/50 rounded-full relative">
                <div className="h-[6px] absolute bg-white/80 rounded-full" style={{width: progress+'%'}}></div>
              </div>
              <div className="text-[0.6rem] flex-1 op80 whitespace-nowrap">
                <HighText show={highLight} text='剩余' eg='-1:22' />
              </div>
            </div>
            <div className='grid grid-cols-5 px-2 my-1 items-center'>
              <div />
              <div className='mx-auto rotate-180 op80 w-8 h-8 flex items-center'>
                <img src="/images/music/next.svg" alt="last" />
                {/* <IconNext /> */}
              </div>
              <div className='mx-auto op80 w-10 h-10 flex items-center'>
                <img src="/images/music/pause.svg" alt="last" />
                {/* <IconPause /> */}
              </div>
              <div className='mx-auto op80 w-8 h-8 flex items-center'>
                {/* <IconNext /> */}
                <img src="/images/music/next.svg" alt="last" />
              </div>
              <div className='mx-auto op80 w-8 h-8 flex items-center'>
                {/* <IconAirplay /> */}
                <img src="/images/music/airplay.svg" alt="last" />
              </div>
            </div>
            {/* <div className='flex px-5 my-2 text-white items-center'>
              <div>
                <img src="/images/music/volume-1.svg" alt="volume" className='w-5 h-5' />
              </div>
              <div className="w-full h-[6px] mx-2 bg-white/50 rounded-full relative">
                <div className="h-[6px] w-1/2 absolute bg-white/80 rounded-full"></div>
              </div>
              <div>
                <img src="/images/music/volume-2.svg" alt="volume" className='w-5 h-5' />
              </div>
            </div> */}
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
