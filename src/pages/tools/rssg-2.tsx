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
import { useOutletContext } from "react-router-dom";
import { ChangeEvent, RefObject, useState, useRef } from "react";
import BaseCard from "../../components/BaseCard";
import Toggle from "../../components/Toggle";

import "cropperjs/dist/cropper.css"

export default function Rseg() {
  const cropperRef1 = useRef<ReactCropperElement>(null)
  const cropperRef2 = useRef<ReactCropperElement>(null)
  const cropperRef3 = useRef<ReactCropperElement>(null)
  const cropperRef4 = useRef<ReactCropperElement>(null)
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure()
  const { isOpen: isOpen4, onOpen: onOpen4, onClose: onClose4 } = useDisclosure()

  const [highLight, ref]: [highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  const [image1Size, setImage1Size] = useState(0);
  const [image2Size, setImage2Size] = useState(0);
  const [image3Size, setImage3Size] = useState(0);
  const [image4Size, setImage4Size] = useState(0);

  const [image1Crop, setImage1Crop] = useState('');
  const [image2Crop, setImage2Crop] = useState('');
  const [image3Crop, setImage3Crop] = useState('');
  const [image4Crop, setImage4Crop] = useState('');

  const [bleedingLine, setBleedingLine] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

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
  const handleImage2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage2Size(file?.size || 0)
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage2(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
    onOpen2()
  }
  const handleImage3Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage3Size(file?.size || 0)
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage3(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
    onOpen3()
  }
  const handleImage4Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage4Size(file?.size || 0)
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage4(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
    onOpen4()
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
  const getCropData3 = () => {
    if (typeof cropperRef3.current?.cropper !== "undefined") {
      setImage3Crop(cropperRef3.current?.cropper.getCroppedCanvas().toDataURL());
    }
  }
  const getCropData4 = () => {
    if (typeof cropperRef4.current?.cropper !== "undefined") {
      setImage4Crop(cropperRef4.current?.cropper.getCroppedCanvas().toDataURL());
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
              aspectRatio={3 / 4}
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
            <div className='text-xs mb-4 text-orange-600'>
              <span className='text-[0.7rem] text-white bg-orange-600 px-1 py-0.5 rounded mr-1 leading-6'>提示</span>
              <span>如果此处没图片↓↓ 大概率是浏览器/格式不支持 或者尺寸太大需要稍等一会~ （微信内置浏览器可能无法加载较大的图片）</span>
            </div>
            <Cropper
              src={image2}
              style={{ maxHeight: '50vh', width: "80vw" }}
              initialAspectRatio={1}
              aspectRatio={3 / 4}
              guides={true}
              autoCropArea={1}
              ref={cropperRef2}
              viewMode={1}
              background={false}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='messenger' onClick={() => {
              getCropData2()
              onClose2()
            }}>裁剪</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={isOpen3}
        placement='bottom'
        onClose={onClose3}
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
              src={image3}
              style={{ maxHeight: '50vh', width: "80vw" }}
              initialAspectRatio={1}
              aspectRatio={3 / 4}
              guides={true}
              autoCropArea={1}
              ref={cropperRef3}
              viewMode={1}
              background={false}
            />
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant='outline' mr={3} onClick={onClose2}>
              取消
            </Button> */}
            <Button colorScheme='messenger' onClick={() => {
              getCropData3()
              onClose3()
            }}>裁剪</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={isOpen4}
        placement='bottom'
        onClose={onClose4}
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
              src={image4}
              style={{ maxHeight: '50vh', width: "80vw" }}
              initialAspectRatio={1}
              aspectRatio={3 / 4}
              guides={true}
              autoCropArea={1}
              ref={cropperRef4}
              viewMode={1}
              background={false}
            />
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant='outline' mr={3} onClick={onClose2}>
              取消
            </Button> */}
            <Button colorScheme='messenger' onClick={() => {
              getCropData4()
              onClose4()
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
            上传图片（1）
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
            上传图片（2）
          </Button>
        </label>
        <label className='w-full flex'>
          <input type="file" onChange={handleImage3Change} className='hidden w-0'>
          </input>
          <Button
            as='span'
            variant='outline'
            colorScheme='messenger'
            className='w-full'
            border={'1px dashed'}
            leftIcon={<div className="i-ri-image-add-fill text-xl" />}
          >
            上传图片（3）
          </Button>
        </label>
        <label className='w-full flex'>
          <input type="file" onChange={handleImage4Change} className='hidden w-0'>
          </input>
          <Button
            as='span'
            variant='outline'
            colorScheme='messenger'
            className='w-full'
            border={'1px dashed'}
            leftIcon={<div className="i-ri-image-add-fill text-xl" />}
          >
            上传图片（4）
          </Button>
        </label>
      </div>
      <div>
        {image1Size + image2Size + image3Size + image4Size >= 5120000 ?
          <div className='text-sm text-red-500 text-center mb-2'>文件较大({formatBytes(image1Size + image2Size + image3Size + image4Size)}) 导出可能需要 1-3分钟</div> : ''
        }
      </div>
      <div className='flex items-start justify-center gap-6 my-6'>
        <Toggle
          value={bleedingLine}
          onChange={(v)=>setBleedingLine(v)}
          icon={<div className="i-ri-shape-2-line" />}
          text='出血线'
          remark='印刷需打开'
        />
        <Toggle
          value={isSmall}
          onChange={(v)=>setIsSmall(v)}
          icon={<div className="i-ri-bug-line" />}
          text='修复模式'
          remark='修复图像缺失'
        />
      </div>
      <BaseCard ref={ref} className={`${isSmall ? 'scale-85' : ''}`}>
        <div
          className={`z-0 relative bg-white flex flex-col w-full justify-center ${highLight?'':'max-h-[390px] h-[390px] min-h-[390px]'} max-w-[265px] w-[265px] min-w-[265px] ${bleedingLine?'p-6':'p-3'}`}
          // style={{
          //   aspectRatio: `${aspect.width}/${aspect.height}`
          // }}
        >
          <div className={``} style={{ fontFamily: 'exo' }}>
            <div>
              <div className='mb-2 mx-3'>
                <div className='text-xl'>
                  <HighText show={highLight} value='Photomatic' className={highLight?'min-w-10':''} />
                </div>
                <div className='-mt-1'>
                  <HighText show={highLight} className={highLight?'min-w-10':''} />
                </div>
              </div>
              <div className="grid gap-y-3" style={{
                gridTemplateColumns: '0.75rem auto 0.75rem auto 0.75rem'
              }}>
              <div className="flex justify-end items-start">
                <div className="text-[0.5rem] write-vertical-left text-right flex items-center">
                  <div className="i-ri-triangle-fill rotate-180 mb-0.5" />
                  <div className='z-20'>
                      <HighText show={highLight} className={highLight?'min-h-10':''}/>
                    </div>
                </div>
              </div>
                <div>
                  {image1Crop ?
                    <div
                    className="bg-cover bg-center bg-no-repeat bg-gray aspect-[3/4]"
                    style={{
                      backgroundImage: `url(${image1Crop})`,
                    }}
                    />:
                    <div className='aspect-[3/4] bg-zinc-200 flex justify-center items-center op50 text-sm'>
                      1
                    </div>
                  }
                </div>
                <div className="flex items-end">
                  <div className="text-[0.5rem] write-vertical-left text-right flex items-center">
                    <div className="i-ri-triangle-fill rotate-180 mb-0.5" />
                    <div className='z-20'>
                      <HighText show={highLight} className={highLight?'min-h-10':''}/>
                    </div>
                  </div>
                </div>
                <div>
                  {image2Crop ?
                    <div
                    className="bg-cover bg-center bg-no-repeat bg-gray aspect-[3/4]"
                    style={{
                      backgroundImage: `url(${image2Crop})`,
                    }}
                    />:
                    <div className='aspect-[3/4] bg-zinc-200 flex justify-center items-center op50 text-sm'>
                      2
                    </div>
                  }
                </div>
                <div className="flex items-end">
                  <div className="text-[0.5rem] write-vertical-left text-right flex items-center">
                    <div className="i-ri-triangle-fill rotate-180 mb-0.5" />
                    <div className='z-20'>
                      <HighText show={highLight} className={highLight?'min-h-10':''}/>
                    </div>
                  </div>
                </div>
              <div className="flex justify-end items-end">
                <div className="text-[0.5rem] write-vertical-left text-right flex items-center">
                  <div className="i-ri-triangle-fill rotate-180 mb-0.5" />
                  <div className='z-20'>
                      <HighText show={highLight} className={highLight?'min-h-10':''}/>
                    </div>
                </div>
              </div>
                <div>
                  {image3Crop ?
                    <div
                    className="bg-cover bg-center bg-no-repeat bg-gray aspect-[3/4]"
                    style={{
                      backgroundImage: `url(${image3Crop})`,
                    }}
                    />:
                    <div className='aspect-[3/4] bg-zinc-200 flex justify-center items-center op50 text-sm'>
                      3
                    </div>
                  }
                </div>
                <div className="flex items-end">
                  <div className="text-[0.5rem] write-vertical-left text-right flex items-center">
                    <div className="i-ri-triangle-fill rotate-180 mb-0.5" />
                    <div className='z-20'>
                      <HighText show={highLight} className={highLight?'min-h-10':''}/>
                    </div>
                  </div>
                </div>
                <div>
                  {image4Crop ?
                    <div
                    className="bg-cover bg-center bg-no-repeat bg-gray aspect-[3/4]"
                    style={{
                      backgroundImage: `url(${image4Crop})`,
                    }}
                    />:
                    <div className='aspect-[3/4] bg-zinc-200 flex justify-center items-center op50 text-sm'>
                      4
                    </div>
                  }
                </div>
                <div className="flex items-end">
                  <div className="text-[0.5rem] write-vertical-left text-right flex items-center">
                    <div className="i-ri-triangle-fill rotate-180 mb-0.5" />
                    <div className='z-20'>
                      <HighText show={highLight} className={highLight?'min-h-10':''}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-center text-xl mt-1'>
              <HighText show={highLight} value='Photomatic' className={highLight?'min-w-10':''} />
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
