import dayjs from 'dayjs'
import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import { RefObject } from "react";
import BaseCard from "../../components/BaseCard";

export default function Cotti() {
  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();
  
  return (
    <div>
      <BaseCard ref={ref}>
        <div className='w-65 z-0 relative px-2 py-2 bg-yellow-100'>
          <div className='flex justify-between items-center'>
            <div className='text-[0.85rem]'>
              <HighText show={highLight} text='问候语' eg='早上好' />
            </div>
            <img src="/images/cotti-2.webp" alt="cotti" className='w-35 h-auto -mr-1' />
          </div>
          <div className='flex items-end'>
            <div className='text-3xl font-bold mr-3'>
              <HighText show={highLight} text='取餐妈' eg='*E6' />
            </div>
            <div className='mb-1'>
              <HighText show={highLight} text='来源 数量' eg='饱了么 1/1' />
            </div>
          </div>
          <div className='text-lg font-bold -mt-1'>
            <HighText show={highLight} text='餐品' eg='[冰]生酪拿铁' />
          </div>
          <div className='-mt-1'>
            <HighText show={highLight} text='属性' eg='大杯16oz/冰/金奖天狼星·深烘' />
          </div>
          <div className='my-1'>
            <HighText show={highLight} text='香味/糖度' eg='焦香/半糖' />
          </div>
          <div className='text-xs'>
            <HighText show={highLight} text='提示文字' eg='尽快享用，风味更加哦！' inputed />
          </div>
          <div className='flex justify-between items-center mt-1'>
            <div className='text-xs font-bold'>
              <HighText show={highLight} text='日期 时间' eg={dayjs().format('MM-DD HH:mm:ss')} />
            </div>
            <div className='text-xs font-bold'>
              <HighText show={highLight} text='提示文字' eg='EVERY DAY@COTTI' inputed />
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
