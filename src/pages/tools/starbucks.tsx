import dayjs from 'dayjs'
import HighText from "../../components/HighText";
import { useOutletContext } from "react-router-dom";
import { RefObject, useState } from "react";
import BaseCard from "../../components/BaseCard";
import { RadioGroup, Radio } from '@chakra-ui/react';

export default function Chapanda() {
  const [highLight, ref]:[highLight: boolean, ref: RefObject<HTMLDivElement>] = useOutletContext();

  const [type, setType] = useState('1')

  return (
    <div>
      <RadioGroup className='border rounded-xl grid grid-cols-2 divide-x mb-4' value={type} onChange={(v)=>{setType(v)}}>
        <div className='px-3 py-2 flex-1 w-full'>
          <Radio colorScheme='red' value={'1'}>
            啡快
          </Radio>
        </div>
        <div className='px-3 py-2 flex-1 w-full'>
          <Radio colorScheme='green' value={'2'}>
            外带
          </Radio>
        </div>
      </RadioGroup>
      <BaseCard ref={ref}>
        <div className={`w-50 ${!highLight&&'h-100'} p-3 flex flex-col bg-white`}>
          <div className={`py-1 text-center ${type==='1'?'bg-black text-white':'bg-white text-zinc-900'} font-bold text-xl`} style={highLight?{height: '2.4rem', marginBottom: '2.5rem'}:{}}>
            <HighText show={highLight} text='取餐码' eg='啡快 57076' />
          </div>
          <div className='flex justify-between'>
            <div className="text-md">
              <HighText show={highLight} text='取餐口令' eg='1.烤红薯' />
            </div>
            <div className="text-md font-bold">
              <HighText show={highLight} text='数量' eg='1of1' />
            </div>
          </div>
          <div className="text-md font-bold">
            <HighText show={highLight} text='数量' eg='瑞星黑金VIP女士' />
          </div>
          <div className="text-[1.4rem] font-bold">
            <HighText show={highLight} text='属性' eg='大/冰' />
          </div>
          <div className="text-[1.4rem] font-bold">
            <HighText show={highLight} text='餐品' eg='抹茶可碎星冰乐' />
          </div>
          <div className="text-[0.95rem] font-bold">
            <HighText show={highLight} text='英文' eg='G/GreenTeaChipFrap' />
          </div>
          <div className="text-[1.4rem] font-bold ml-4">
            <HighText show={highLight} text='客制化(可换行)' eg='1 Pump榛果' />
          </div>
          <div className="flex-1"></div>
          <div className='text-xs text-center'>
            <HighText show={highLight} text='小尾巴' eg='建议尽快享用,风味更佳' inputed />
          </div>
          <div className='flex gap-6 justify-center items-center'>
            <div className='text-xs'>
              <HighText show={highLight} text='日期' eg={dayjs().format('YYYY/MM/DD')} inputed />
            </div>
            <div className='text-[0.9rem] font-bold'>
              <HighText show={highLight} text='时间' eg={dayjs().format('HH:mm')} inputed />
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  )
}
