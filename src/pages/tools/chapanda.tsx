import { QRCode } from "antd";
import dayjs from 'dayjs'
import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import { RefObject } from "react";
import BaseCard from "../../components/BaseCard";

export default function Chapanda() {
  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  return (
    <div>
      <BaseCard ref={ref}>
        <div className='w-60 z-0 relative px-3 py-3 bg-white'>
          <div className='flex justify-between'>
            <div>
              <div className='text-sm'>
                <HighText show={highLight} text='取餐码' eg='饱了么外卖13' />
              </div>
              <div className='flex justify-between'>
                <div className='text-sm'>
                  <HighText show={highLight} text='形式' eg='外卖' />
                </div>
                <div className='text-sm'>
                  <HighText show={highLight} text='数量' eg='1/1' />
                </div>
              </div>
              <div className='mt-3 text-sm'>
                <HighText show={highLight} text='时间' eg={dayjs().format('MM-DD HH:mm')} />
              </div>
            </div>
            <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={100} color='black' type={'svg'} />
          </div>
          <div className='text-xl font-bold mt-2'>
            <HighText show={highLight} text='餐品' eg='茉莉奶绿' />
          </div>
          <div className='text-xl font-bold'>
            <HighText show={highLight} text='杯型' eg='大杯' />
          </div>
          <div className=''>
            <HighText show={highLight} text='属性' eg='[少冰，五分糖]' />
          </div>
          <div className='text-sm'>
            <HighText show={highLight} text='做法' eg='【T15，C250，N3，+C10】' />
          </div>
          <div className='text-sm mt-4'>
            注：<HighText show={highLight} text='备注' eg='' />
          </div>
          <div className='text-sm'>
            <HighText show={highLight} text='店铺ID 地址' eg='8800 茶百道小红薯市小红薯店' />
          </div>
          <div className='text-sm'>
            TEL：<HighText show={highLight} text='店铺电话' eg='18800000000' />
          </div>
          <div className='flex justify-between items-end mt-4'>
            <div className='font-bold text-lime text-[0.95rem]'>
              <HighText show={highLight} text='slogan' eg='好茶为底，制造新鲜。' inputed />
            </div>
            <img src="/images/chapanda.webp" alt="chapanda" className='w-10 h-10' />
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
