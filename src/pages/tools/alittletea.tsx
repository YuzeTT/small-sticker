import { QRCode } from "antd";
import dayjs from 'dayjs'
import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import { RefObject } from "react";
import BaseCard from "../../components/BaseCard";
export default function AlittleTea() {
  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();
  
  return (
    <div>
      <BaseCard ref={ref}>
        <div bg='white' className='w-70 z-0 relative px-6 py-4 rounded-5 ' >
          {/* LOGO */}
          <img src="/images/alittle-tea.png" alt="logo" absolute w-10 h-auto right-4 top-4 op80 />
          
          {/* 基础信息区域 */}
          <div  text='xs' className='z-10'>
            <HighText show={highLight} text='数量' eg='1/1' />
          </div>

          {/* 点单来源 */}
          <div flex='~ items-center'>
          <div  mt-1 text='xl' style={{marginRight: '10px'}}>
            <HighText show={highLight} text='点单来源' eg='饿了么' />
          </div>
          <div font='bold' mt-1 text='xl' >
            <HighText show={highLight} text='编号' eg='B860' /></div>
          </div>

          {/* 杯子大小,冷热度,糖度什么的 */}
          <div flex='~ items-center'  className=''>
            <div text='md'>
              <HighText show={highLight} text='杯子大小' eg='大杯' />
            （
              <HighText show={highLight} text='冷热度' eg='少冰'/>
              /
              <HighText show={highLight} text='糖度' eg='三分糖' />
              ）
            </div>
          </div>

          {/* 产品名称区域 */}
          <div  text='xl' font='bold' >
            <HighText show={highLight} text='产品名称' eg='叙拉古人的愤怒' />
          </div>

          {/* 自定义区域 */}
          <div flex='~ items-center' >
            <div text='md'>
              <HighText show={highLight} text='加料1' eg='仙草' />
              <HighText show={highLight} text='加料2' eg='/改牛乳' />
              <HighText show={highLight} text='加料3' eg='/冰糖' />
            </div>
          </div>

          {/* 价格区域 */}
          <div flex='~ items-center'  className='mt-1'>
            <div text='xl'>
              ￥
              <HighText show={highLight} text='价格' eg='12' />
            </div>
          </div>

          {/* 时间区域 */}
          <div text='sm'>
            <HighText show={highLight} text='日期时间' eg={dayjs().format('YYYY-MM-DD HH:mm:ss')} />
          </div>

          {/* 店铺信息区域 */}
          <div flex='~ items-center'  className='mt-1'>
            <div text='xs' style={{marginRight: '25px'}}>
              <HighText show={highLight} text='店铺名称' eg='漕河泾印象城店' />
            </div>
            <div text='xs' style={{marginTop: '0.5px'}}>
              <HighText show={highLight} text='店铺号码' eg='3284856' />
            </div>
          </div>

          {/* 建议区域 */}
          <div flex='~ items-center'  className='mt-1 ' style={{fontSize: 14, fontWeight: 300, letterSpacing: '1px'}}>
           建议1小时内饮用完毕，口感最佳
          </div>
         
         {/* 特别信息 */}
         <div  text='sm balck' font='bold' mt-2  tracking-widest style={{marginTop: '30px'}}>
            <HighText show={highLight} text='特别信息' eg='入会享88折,趣开1点点订制专属您的饮品' />
          </div>
          <div mt-1 flex='~ justify-between'>
            <div>
             
              
              <div >
              <img src="/images/a_little_tea_sticker.png" alt="logo" style={{marginLeft: '-5px', width: '130px', height: '55px'}} />
              </div>
          
            </div>
            <QRCode  value={'https://sticker.hsott.cn'} style={{marginTop: '-30px'}} bordered={false} className="-m-3 mt-[-10px] " size={100} color='black' type={'svg'} />
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
