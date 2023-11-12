import { QRCode } from "antd";
import dayjs from 'dayjs'
import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import { RefObject } from "react";
import BaseCard from "../../components/BaseCard";

export default function Mxbc() {
  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  return (
    <div>
      <BaseCard ref={ref}>
        <div bg='white' className='w-60 z-0 relative px-2 py-2'>
          <div flex='~ justify-between'>
            <img src="/images/mxbc_logo.png" alt="logo" h-7 />
            <div>
              <HighText show={highLight} text='数量' eg='01/01' />
            </div>
            <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={70} color='black' type={'svg'} />
          </div>
          {/* <img src="/heytea.png" alt="logo" absolute w-10 h-auto right-4 top-4 op80/> */}
          <div className={highLight ? '' : '-mt-4'}>
            <HighText show={highLight} text='渠道#取餐码 取餐方式' eg='小程序#1300自提' />
          </div>
          <div text='3xl' origin-left scale-x-65 w='135%'>
            <HighText show={highLight} text='产品名称' eg='芝士奶盖四季春(大杯)' />
          </div>
          <div className='-mt-1'>
            <HighText show={highLight} text='冰度，糖度' eg='少冰，五分糖' />
          </div>
          <div className='-mt-1'>
            <HighText show={highLight} text='日期 时间 手机号' eg={`${dayjs().format('MM-DD HH:mm')} 13600000000`} />
          </div>
          <div className='-mt-1'>
            <HighText show={highLight} text='编码 编码 广告 ' eg='98800301 3uU 聚会点大单，蜜雪更划算' />
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
