import { Alert, QRCode, Switch } from "antd";
import { useState } from "react";
import HighText from "../components/HighText";

export default function Maoyan() {
  const [highLight , setHighLight] = useState<boolean>(true)
  return (
    <div mt-4>
      <Alert message="【新设计模式】直接点击文字即可编辑！" type="info" showIcon />
      <div>
        <Switch checked={highLight} onChange={(checked)=>{setHighLight(checked)}} />
      </div>
      <div mt-4 p-2>
        <div bg='white' className='w-80 mx-auto shadow-xl rounded-md overflow-hidden'>
          <div pl-4 flex='~ justify-between'>
            {/* left */}
            <div className="w-[75%]">
              <img src="/maoyan-2.png" alt="logo" h-7 pt-3 pb-1 />
              <div text='sm'><HighText show={highLight} text='影院名称' />（<HighText show={highLight} text='店铺地址'></HighText>）</div>
              <div contentEditable text='sm'>电影名称(2D/3D)</div>
              <div mt-1 flex='~ items-center justify-between'>
                <div contentEditable text='sm'>影厅特色</div>
                <div contentEditable>观影时间</div>
              </div>
              <div flex='~ items-center justify-between'>
                <div contentEditable>1排3号</div>
                <div contentEditable>观影日期</div>
              </div>
              <div flex='~' mt-1>
                <QRCode value={'https://sticker.hsott.cn/qrcode?text=qwqqwq'} bordered={false} className="-m-3" size={140} />
                <div ml-2>
                  <div contentEditable text='xs'>票价：35.0元</div>
                  <div contentEditable text='xs'>服务费：10.0元</div>
                  <div contentEditable text='xs'>08-11 18:47</div>
                  <div contentEditable text='xs' mt-3>网络售票</div>
                  <div contentEditable text='xs'>12150000</div>
                  <div contentEditable text='xs'>41004314</div>
                </div>
              </div>
            </div>
            {/* right */}
            <div py-3 ml-4 className="w-[25%]">
              <div flex='~ justify-center'>
                <div px-2 className='py-0.5' rounded-full bg-red-500 text='white'>副券</div>
              </div>
              <div contentEditable text='xs' mt-2>影厅</div>
              <div contentEditable text='xs'>座位</div>
              <div contentEditable text='xs' mt-4>时间</div>
              <div contentEditable text='xs'>日期</div>
              <div contentEditable text='xs' mt-4>电影名称</div>
              <div contentEditable text='xs' mt-4>票价</div>
              <div contentEditable text='xs' mt-4>编号1</div>
              <div contentEditable text='xs'>编号2</div>
            </div>
          </div>
          <div px-4 py-2 bg='red-500' mt-4 flex='~ items-center justify-between'>
            <div text='white xs'>凭此影票 入场观看</div>
            <img src="/maoyan-3.png" alt="logo" h-4 />
          </div>
        </div>
        {/* <div></div> */}
      </div>
    </div>
  )
}
