import { QRCode } from "antd";
import HighText from "../../components/HighText";
import dayjs from 'dayjs'
import { useOutletContext } from "react-router-dom";
import { RefObject } from "react";
import BaseCard from "../../components/BaseCard";

export default function Goodme() {
  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  return (
    <div>
      <BaseCard ref={ref}>
        <div bg='white' className='w-65 z-0 relative px-4 py-2'>
          <div className='flex justify-between items-center'>
            <div className='flex items-end'>
              <div className='text-[1.8rem] font-bold'>
                <HighText show={highLight} text='取餐码' eg='114' />
              </div>
              <div className='text-sm ml-2'>
                <HighText show={highLight} text='份数' eg='1/1' />
              </div>
            </div>
            <div>
              <div className='text-xs bg-black text-white px-2 py-0.5 rounded-full font-bold' style={{height: highLight?'1.3rem':'auto'}}>
                <HighText show={highLight} text='取餐方式' eg='YuzeTT自取' />
              </div>
            </div>
          </div>
          <div className='my-1' style={{border: '1px dashed #00000050'}}></div>
          <div className='text-xl font-bold'>
            <HighText show={highLight} text='商品' eg='十里江南桂[中]' />
          </div>
          <div className='mt-0.5'>
            <HighText show={highLight} text='配置' eg='水冰 | 七分糖[G10] | 联名杯' />
          </div>
          <div className='mt-18 flex justify-between items-end'>
            <div>
              <div className='text-xs'>
                <HighText show={highLight} text='店铺' eg='小红薯店' />
              </div>
              <div className='text-xs'>
                <HighText show={highLight} text='电话 时间 日期' eg={`18800000000 ${dayjs().format('HH:mm')} ${dayjs().format('MM-DD')}`} />
              </div>
            </div>
            <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={80} color='black' type={'svg'} />
          </div>
          <div className='mt-2 flex justify-between items-center'>
            <img src="/images/goodme-2.webp" alt="goodme" className='w-15' />
            <div className='font-bold'>
              <HighText show={highLight} text='slogan' eg='@我最好的朋友喝奶茶' />
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
