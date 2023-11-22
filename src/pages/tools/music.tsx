import {
  Button,
  Switch,
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
// import HighText from "../../components/HighText";
import IconNext from "../../components/IconNext";
import IconPause from "../../components/IconPause";
import IconAirplay from "../../components/IconAirplay";
import { useOutletContext } from "react-router-dom";
import { ChangeEvent, RefObject, useState, useRef } from "react";
import BaseCard from "../../components/BaseCard";

import "cropperjs/dist/cropper.css";

export default function Rseg() {
  const cropperRef1 = useRef<ReactCropperElement>(null)
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()

  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  const [image1, setImage1] = useState('');
  const [image1Size, setImage1Size] = useState(0);
  const [image1Crop, setImage1Crop] = useState('');
  const [bleedingLine, setBleedingLine] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [tw, setTw] = useState(false);

  const handleImage1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage1Size(file?.size||0)
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
            <Button colorScheme='messenger' onClick={()=>{
              getCropData1()
              onClose1()
            }}>裁剪</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className='grid grid-cols-2 gap-2 mb-4'>
        <label className='w-full flex'>
          <input type="file" onChange={handleImage1Change} className='hidden w-0'>
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
        {image1Size>=5120000?
        <div className='text-sm text-red-500 text-center mb-2'>文件较大({formatBytes(image1Size)}) 导出可能需要 1-3分钟</div>:''
      }
      </div>
      <div className='mb-4'>
        <table className='mx-auto'>
          <tbody>
            <tr>
              <td className='text-sm op70'>3mm 出血线（印刷需打开）</td>
              <td>
                <Switch id='line' size='sm' isChecked={bleedingLine} onChange={(v)=>{setBleedingLine(v.target.checked)}} />
              </td>
            </tr>
            <tr>
              <td className='text-sm op70'>修复模式（图像缺失需打开）</td>
              <td>
                <Switch id='line' size='sm' isChecked={isSmall} onChange={(v)=>{setIsSmall(v.target.checked)}} />
              </td>
            </tr>
          </tbody>
        </table>

        <div className='flex text-sm justify-center items-center gap-2 mt-2'>
          <div className='op70'>85*54mm(大陆)</div>
          <Switch id='line' size='sm' isChecked={tw} onChange={(v)=>{setTw(v.target.checked)}} />
          <div className='op70'>90*54mm(中国台湾)</div>
        </div>
      </div>
      <BaseCard ref={ref} className={`-mx-4 ${isSmall?'scale-85':''} ${tw?'scale-85':''}`}>
        <div className={` min-w-[231.5px] max-w-[231.5px] z-0 relative min-h-[359px] max-h-[359px] h-[359px] rounded-xl overflow-hidden ${highLight?'':'max-h-[386px] h-[386px]'} origin-top`}>
          <img src={image1Crop} alt="bg" className='absolute scale-150 origin-center h-full w-full blur-xl -z-20' />
          <div className='w-full h-full absolute bg-black/20 -z-10'></div>
          <div className='flex flex-col h-full' style={bleedingLine?{border:'12.18px dashed #FF000000'}:{}}>
            
            <div className='mx-auto pt-4'>
              {image1Crop?
                <div className={`rounded-lg bg-center bg-contain bg-cover! bg-no-repeat overflow-hidden`} style={{backgroundImage: `url(${image1Crop})`, height: bleedingLine?'175.14px':'199.5px', width: bleedingLine?'175.14px':'199.5px'}}></div>:
                <div className='rounded-lg bg-zinc-200 flex justify-center items-center op50' style={{height: bleedingLine?'175.14px':'199.5px', width: bleedingLine?'175.14px':'199.5px'}}>
                  请上传图片
                </div>
              }
            </div>
            <div className='text-[0.6rem] px-5 pt-2 text-white'>iPhone</div>
            <div className='text-sm px-5 text-white'>晴天</div>
            <div className='text-xs px-5 text-white op50'>周杰伦</div>
            <div className='flex px-5 my-2 text-white items-center'>
              <div className="text-[0.6rem] flex-1 op80">1:31</div>
              <div className="w-full h-[6px] mx-2 bg-white/50 rounded-full relative">
                <div className="h-[6px] w-1/2 absolute bg-white/80 rounded-full"></div>
              </div>
              <div className="text-[0.6rem] flex-1 op80">-1:55</div>
            </div>
            <div className='grid grid-cols-5 px-2 items-center'>
              <div></div>
              <div className='mx-auto rotate-180 fill-white/80 w-8 h-8 flex items-center'>
                <IconNext />
              </div>
              <div className='mx-auto fill-white/80 w-10 h-10 flex items-center'>
                <IconPause />
              </div>
              <div className='mx-auto fill-white/80 w-8 h-8 flex items-center'>
                <IconNext />
                {/* <img src="/images/music/next.svg" alt="last" className='fillsvg-white' /> */}
              </div>
              <div className='mx-auto fill-white/80 w-8 h-8 flex items-center'>
                <IconAirplay />
                {/* <img src="/images/music/airplay.svg" alt="last" className='w-8 h-8' /> */}
              </div>
            </div>
            <div className='flex px-5 my-2 text-white items-center'>
              <div>
                <img src="/images/music/volume-1.svg" alt="volume" className='w-5 h-5' />
              </div>
              <div className="w-full h-[6px] mx-2 bg-white/50 rounded-full relative">
                <div className="h-[6px] w-1/2 absolute bg-white/80 rounded-full"></div>
              </div>
              <div>
                <img src="/images/music/volume-2.svg" alt="volume" className='w-5 h-5' />
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
