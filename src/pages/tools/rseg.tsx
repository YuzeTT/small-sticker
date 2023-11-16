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
import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import { ChangeEvent, RefObject, useState, useRef } from "react";
import BaseCard from "../../components/BaseCard";

import "cropperjs/dist/cropper.css";

export default function Rseg() {
  const cropperRef1 = useRef<ReactCropperElement>(null)
  const cropperRef2 = useRef<ReactCropperElement>(null)
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()

  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image1Crop, setImage1Crop] = useState('');
  const [image2Crop, setImage2Crop] = useState('');
  const [bleedingLine, setBleedingLine] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [tw, setTw] = useState(false);

  const handleImage1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage1(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
    onOpen1()
  }
  const handleImage2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage2(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
    onOpen2()
  }

  const getCropData1 = () => {
    if (typeof cropperRef1.current?.cropper !== "undefined") {
      setImage1Crop(cropperRef1.current?.cropper.getCroppedCanvas().toDataURL());
    }
  }
  const getCropData2 = () => {
    if (typeof cropperRef2.current?.cropper !== "undefined") {
      setImage2Crop(cropperRef2.current?.cropper.getCroppedCanvas().toDataURL());
    }
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
            <Button variant='outline' mr={3} onClick={onClose1}>
              取消
            </Button>
            <Button colorScheme='messenger' onClick={()=>{
              getCropData1()
              onClose1()
            }}>裁剪</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={isOpen2}
        placement='bottom'
        onClose={onClose2}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>裁剪图片</DrawerHeader>

          <DrawerBody className='mx-auto'>
            <Cropper
              src={image2}
              style={{ maxHeight: '50vh', width: "80vw" }}
              initialAspectRatio={1}
              aspectRatio={1}
              guides={true}
              autoCropArea={1}
              ref={cropperRef2}
              viewMode={1}
              background={false}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose2}>
              取消
            </Button>
            <Button colorScheme='messenger' onClick={()=>{
              getCropData2()
              onClose2()
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
            上传图片（左）
          </Button>
        </label>
        <label className='w-full flex'>
          <input type="file" onChange={handleImage2Change} className='hidden w-0'>
          </input>
          <Button
            as='span'
            variant='outline'
            colorScheme='messenger'
            className='w-full'
            border={'1px dashed'}
            leftIcon={<div className="i-ri-image-add-fill text-xl" />}
          >
            上传图片（右）
          </Button>
        </label>
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
        <div className={`${tw?'min-w-[386px] max-w-[386px] w-[386px]!':'min-w-[345px] max-w-[345px]'} z-0 relative min-h-[219px] bg-white ${highLight?'':'max-h-[219px] h-[219px]'} origin-top flex flex-col`} style={bleedingLine?{border:'12.18px dashed #FF000020'}:{}}>
          <div className={`p-3 ${bleedingLine?'scale-95':'scale-100'} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} style={{fontFamily: 'exo'}}>
            <table className='mx-auto'>
              <tbody>
                <tr>
                  <td></td>
                  <td className='flex justify-between text-xs mb-1'>
                    <div>
                      <HighText show={highLight} value='TAKE YOUR MEMORY' />
                    </div>
                    <div>
                      <HighText show={highLight} value='PHOTOMATIC' />
                    </div>
                  </td>
                  <td></td>
                </tr>
                <tr className='text-sm'>
                  <td className='align-start'>
                    <div className='justify-end align-top rotate-90 origin-top mt-4 flex items-center relative'>
                      <div className="i-ri-triangle-fill rotate-90" />
                      <div className='absolute left-5'>
                        <HighText show={highLight} value='0000' />
                      </div>
                    </div>
                  </td>
                  <td className='flex gap-3'>
                    {image1Crop?
                      <div className='h-33 w-33 bg-center bg-contain bg-cover! bg-no-repeat overflow-hidden' style={{backgroundImage: `url(${image1Crop})`}}></div>:
                      <div className='h-33 w-33 bg-zinc-200 flex justify-center items-center op50'>
                        请上传图片
                      </div>
                    }
                    {image2Crop?
                      <div className='h-33 w-33 bg-center bg-contain bg-cover! bg-no-repeat overflow-hidden' style={{backgroundImage: `url(${image2Crop})`}}></div>:
                      <div className='h-33 w-33 bg-zinc-200 flex justify-center items-center op50'>
                        请上传图片
                      </div>
                    }
                  </td>
                  <td className='align-end '>
                    <div className='justify-end align-bottom rotate-90 origin-bottom mb-15 flex items-center relative'>
                      <div className="i-ri-triangle-fill rotate-90" />
                      <div className='absolute left-5'>
                        <HighText show={highLight} value='0000' />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className='text-center text-2xl'>
                    <HighText show={highLight} value='Photomatic' />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
