import { QRCode } from "antd";
import dayjs from 'dayjs'
import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import { RefObject } from "react";
import BaseCard from "../../components/BaseCard";

export default function Heytea() {
  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();
  
  return (
    <div>
      <BaseCard ref={ref}>
        <div bg='orange-100' className='w-70 z-0 relative px-6 py-4'>
          <img src="/images/heytea.png" alt="logo" absolute w-10 h-auto right-4 top-4 op80 />
          <div flex='~ items-center'>
            {/* <div text='xs' px-1 style={{border: '1px solid'}}></div> */}
            <div text='xs'>
              <img src="/images/heytea_tag.svg" alt="tag" h-4 absolute className='-z-10' />
              <div px-1 className='z-10'>
                <HighText show={highLight} text='等级' eg='进阶贵宾' />
              </div>
            </div>
            <div text='sm' ml-1>Hey, <HighText show={highLight} text='昵称' eg='YuzeTT' /></div>
          </div>
          <div style={{ fontFamily: 'code' }} mt-1 text='4xl'>
            <HighText show={highLight} text='取餐码' eg='7302' />
          </div>
          <div text='2xl' font='bold' className='-mt-1'>
            <HighText show={highLight} text='产品名称' eg='月观' />
          </div>
          <div text='sm' className='mt-1'>
            <HighText show={highLight} text='产品配置' eg='少冰' />
          </div>
          <div flex='~ justify-between'>
            <div flex='~'>
              <div text='sm' font='bold' className='mt-6 flex-shrink-0'>
                <HighText show={highLight} text='产品介绍' eg='风味基因' />
              </div>
              <div text='sm' className='mt-6 ml-2 flex-1'>
                <HighText show={highLight} text='介绍(手动换行)' eg='清爽茗茶' />
              </div>
            </div>
            <div text='sm' className='mt-6 text-right flex-shrink-0'>
              <HighText show={highLight} text='小标签' eg='真牛乳' />
            </div>
          </div>
          <div text='xs white center' font='bold' mt-2 bg-black tracking-widest>有问题找阿喜，出品不满为你重做</div>
          <div mt-1 flex='~ justify-between'>
            <div>
              <div font='bold'>
                <HighText show={highLight} text='取餐+数量' eg='自取 1/1' />
              </div>
              <div text='xs'>
                <HighText show={highLight} text='日期时间' eg={dayjs().format('YYYY-MM-DD HH:mm:ss')} />
              </div>
              <div text='xs'>
                <HighText show={highLight} text='店铺名称' eg='南平xxx店' />
              </div>
              <div text='xs'>
                <HighText show={highLight} text='店铺号码' eg='0599-00000000' />
              </div>
            </div>
            <QRCode value={'https://sticker.hsott.cn'} bordered={false} className="-m-3" size={100} color='black' type={'svg'} />
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
