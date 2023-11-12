import { QRCode } from "antd";
import dayjs from 'dayjs'
import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import { RefObject } from "react";

export default function Hsay() {
  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  return (
    <div>
      <BaseCard ref={ref}>
        <div bg='white' className={`w-65 ${highLight?'h-auto':'h-100 max-h-100'} z-0 relative p-4 flex flex-col`}>
          <div>
            <div className='text-2xl font-bold'>
              <HighText show={highLight} text='取餐码' eg='取单号:1145' />
            </div>
            <div className='text-xl mt-1'>
              <span className='mr-8'><HighText show={highLight} text='我不知道' eg='165' /></span>
              <span className=''><HighText show={highLight} text='数量' eg='1/1' /></span>
            </div>
            <div className='text-[1.35rem] font-bold mt-2'>
              <HighText show={highLight} text='餐品' eg='鲜炖整颗梨' />
            </div>
            <div className='text-lg font-bold mt-1'>
              <HighText show={highLight} text='大小' eg='中桶' />
            </div>
            <div className='text-lg mt-1'>
              <HighText show={highLight} text='参数' eg='热，七分糖 | 推荐：' />
            </div>
          </div>
          <div className='flex-1 flex items-center'>
            <div className='text- font-bold'>
              <HighText show={highLight} text='参数' eg='J40、5g、R-200' />
            </div>
          </div>
          <div>
            <div className='px-4 py-2 text-center text-white font-bold text-lg bg-black rounded-lg flex items-center'>
              <img src="/images/hsay-2.webp" alt="hsay" className='w-full' />
            </div>
            <div className='mt-2 flex justify-between items-center'>
              <div>
                <div className='font-bold'>
                  <HighText show={highLight} text='取餐方式 日期 时间' eg={`自提  ${dayjs().format('MM-DD')} ${dayjs().format('HH:mm')}`} />
                </div>
                <div className='text-sm mt-1 font-bold'>
                  <HighText show={highLight} text='地址' eg='小红书店' />
                </div>
              </div>
              <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={100} color='black' type={'svg'} />
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
