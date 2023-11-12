import { QRCode } from "antd";
import dayjs from 'dayjs'
import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import { RefObject } from "react";

export default function Chagee() {
  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  return (
    <div>
      <BaseCard ref={ref}>
        <div className='w-65 z-0 relative px-4 py-4 bg-white'>
          <div flex='~ justify-between'>
            <div>
              <HighText show={highLight} text='方式' eg='堂食' />
            </div>
            <div>
              <HighText show={highLight} text='下单渠道' eg='微信小程序' />
            </div>
            <div>
              <HighText show={highLight} text='数量' eg='1/1' />
            </div>
          </div>
          <div text='3xl' origin-left scale-x-75 w='125%'>
            <HighText show={highLight} text='产品名称' eg='伯牙绝弦' />
          </div>
          <div flex='~ gap-2' text='3xl' origin-left scale-x-75 w='155%'>
            <div>
              <HighText show={highLight} text='杯型' eg='大杯' />
            </div>
            <div>
              <HighText show={highLight} text='冰度' eg='标准冰' />
            </div>
            <div>
              <HighText show={highLight} text='糖度' eg='标准糖' />
            </div>
          </div>
          <div mt-8 text='4xl' >
            <HighText show={highLight} text='取餐码' eg='T0021' />
          </div>
          <div className='mt-1'>
            <HighText show={highLight} text='日期 时间' eg={dayjs().format('MM-DD HH:mm')} />
          </div>
          <div className='mt-1'>
            <HighText show={highLight} text='店铺名称' eg='小红薯店' />
          </div>

          <div flex='~ justify-between' mt-2>
            <div>
              <div font='bold'>
                <HighText show={highLight} text='标语1' eg='原叶鲜奶茶' />
              </div>
              <div font='bold'>
                <HighText show={highLight} text='标语2' eg='喝出真茶味' />
              </div>
              <div className='mt-2' text='0.7rem'>
                <HighText show={highLight} text='服务热线' eg='全球服务热线400-0000-000' />
              </div>
            </div>
            <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={80} color='black' type={'svg'} />
          </div>
          <div className='mt-2' text='0.7rem'>
            <HighText show={highLight} text='承诺' eg='如果对饮料有任何不满意门店可以免费为您重做' />
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
