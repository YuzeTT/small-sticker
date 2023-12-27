import { Button, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Switch, FormLabel, FormControl } from '@chakra-ui/react'
import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import { ChangeEvent, RefObject, useState } from "react";
import BaseCard from "../../components/BaseCard";

export default function Instagram() {
  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  const [image, setImage] = useState('');
  const [head, setHead] = useState('');
  const [bleedingLine, setBleedingLine] = useState(false);

  const [imageX , setImageX] = useState(0)
  const [imageY , setImageY] = useState(0)
  const [imageZoom , setImageZoom] = useState(100)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleHeadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setHead(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div>
      <div className='flex gap-2 mb-4'>
        <label className='flex-1'>
          <input type="file" onChange={handleHeadChange} className='hidden'>
          </input>
          <Button
            as='span'
            variant='outline'
            colorScheme='messenger'
            className='w-full'
            leftIcon={<div className="i-ri-account-circle-fill text-xl" />}
          >
            上传头像
          </Button>
        </label>
        <label className='flex-1'>
          <input type="file" onChange={handleImageChange} className='hidden'>
          </input>
          <Button
            as='span'
            variant='outline'
            colorScheme='messenger'
            className='w-full'
            leftIcon={<div className="i-ri-image-add-fill text-xl" />}
          >
            上传图片
          </Button>
        </label>
      </div>
      <div className='mb-4'>
        <div className='mb-2 text-sm text-orange-500 flex items-center justify-center'>
          <div className="i-ri-information-line mr-1" />
          请到「预览模式」调整图片以获得准确的比例
        </div>
        <div className='flex items-center gap-4'>
          <table className='w-48 h-40 mx-auto'>
            <tbody>
              <tr>
                <td className='h-full w-full relative overflow-hidden'>
                  <div className='h-full w-full bg-center bg-contain bg-no-repeat overflow-hidden' style={{backgroundImage: `url(${image})`, transform: `translate(${imageX}%,${imageY}%) scale(${imageZoom-30}%)`}}>
                  </div>
                  <div className='h-35 w-45 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' style={{border:'20px solid #00000050'}}></div>
                  <div className='text-[0.7rem] text-white absolute top-[1px] left-1/2 transform -translate-x-1/2'>裁剪区</div>
                </td>
                <td className='h-full w-full'>
                  <Slider aria-label='slider-ex-1' isReversed className='rotate-180=' defaultValue={0} min={-100} max={100} onChange={(v)=>{setImageY(v)}} orientation='vertical' minH='100px'>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </td>
              </tr>
              <tr>
                <td className='h-full w-full'>
                  <Slider aria-label='slider-ex-1' defaultValue={0} min={-100} max={100} onChange={(v)=>{setImageX(v)}}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className='flex-1 mb-4'>
            <div className='text-xs text-center op50 mb1'>图片缩放</div>
            <Slider aria-label='slider-ex-1' defaultValue={100} min={0} max={200} onChange={(v)=>{setImageZoom(v)}}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <div className='text-xs text-center op50 mb1 mt-4'>详细参数</div>
            <div className='text-xs text-center op80'>X:{imageX}% Y:{imageY}% Zoom:{imageZoom}%</div>
          </div>
        </div>
        <FormControl display='flex' alignItems='center' className='justify-center text-zinc-500'>
          <FormLabel htmlFor='line' mb='0' fontSize='sm'>
            3mm 出血线（印刷需打开）
          </FormLabel>
          <Switch id='line' size='sm' isChecked={bleedingLine} onChange={(v)=>{setBleedingLine(v.target.checked)}} />
        </FormControl>
      </div>
      <BaseCard ref={ref} className='overflow-hidden'>
        <div className={`min-w-[250px] max-w-[250px] z-0 relative min-h-[350px] max-h-[350px] h-[350px]  origin-top flex flex-col`} style={bleedingLine?{border:'13.6px dashed #FF000000'}:{}}>
          <div className='flex justify-between px-2 py-1.5 bg-white'>
            <img src="/images/instagram/logo.webp" alt="logo" className='w-15 h-auto' />
            <div className='flex gap-4'>
              <img src="/images/instagram/like.svg" alt="" className='w-3.5' />
              <img src="/images/instagram/messenger.svg" alt="" className='w-3.5' />
            </div>
          </div>
          <div className='h-[1px] bg-#E8E8E8 w-full'></div>
          <div className='flex px-2 py-1.5 items-center bg-white'>
            <div className='bg-gradient-to-rt from-[#FCCE10] via-[#FA0C65] to-[#D009B9] p-[1px] rounded-full'>
              <div className='bg-white rounded-full p-[1px]'>
                {head?
                <div className='w-4.5 h-4.5 rounded-full bg-center bg-cover! bg-no-repeat ' style={{backgroundImage: `url(${head})`}} />:
                <div className='w-4.5 h-4.5 rounded-full bg-zinc-50' />
                }
              </div>
            </div>
            <div className='text-[0.6rem] ml-1.5 flex-1'>
              <HighText show={highLight} text='昵称' eg='YuzeTT' />
            </div>
            <img src="/images/instagram/more.svg" alt="more" className='w-4' />
          </div>
          {image?
            <div className='h-full w-full overflow-hidden'>
              <div className='h-full w-full bg-center bg-contain bg-no-repeat overflow-hidden' style={{backgroundImage: `url(${image})`, transform: `translate(${imageX}%,${imageY}%) scale(${imageZoom}%)`}}></div>
            </div>:
            <div className='w-full h-full bg-zinc-50 flex items-center justify-center text-zinc-500'>请上传图片</div>
          }

          <div className='flex items-center px-2 py-1.5 gap-3 bg-white'>
            <img src="/images/instagram/liked.svg" alt="liked" className='w-3.5' />
            <img src="/images/instagram/message.svg" alt="message" className='w-3.5' />
            <img src="/images/instagram/send.svg" alt="send" className='w-3.5' />
            <div className='flex-1'></div>
            <img src="/images/instagram/collect.svg" alt="collect" className='w-3.5' />
          </div>
          <div className='px-2 pb-1.5 text-[0.6rem] flex-1 bg-white'>
            <HighText show={highLight} text='文案' eg='点我看群主女装' />
          </div>
          <div className='w-full h-[1px] bg-#E8E8E8'></div>
          <div className='flex items-center justify-between py-2 px-4 bg-white'>
            <img src="/images/instagram/home.svg" alt="home" className='w-3.5' />
            <img src="/images/instagram/search.svg" alt="search" className='w-4' />
            <img src="/images/instagram/add.svg" alt="add" className='w-3.5' />
            <img src="/images/instagram/video.svg" alt="video" className='w-3.5' />
            <img src="/images/instagram/user.svg" alt="user" className='w-3.5' />

          </div>
        </div>
      </BaseCard>
    </div>
  )
}
