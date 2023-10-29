import { useState } from "react";

export default function HighText({text, show, eg}:{text?: string, show: boolean, eg?: string}) {
  const [quickInput , setQuickInput] = useState('')
  return (
    <div inline-block align-top className='rounded-1 overflow-hidden'>
      <div contentEditable={true} suppressContentEditableWarning={true} style={show?{padding: '0.1rem 0.25rem', color: '#000000', background: '#DBEAFE', border: '1.5px solid #3B82F6', borderRadius: '0.25rem'}:{}} outline-none>{quickInput}</div>
      {show?
        <div>
          <div text='xs blue-500' flex='~ items-center' className='py-0.5'>
            <div className="i-ri-corner-left-up-line" />
            {/* <div className="i-ri-arrow-up-line" /> */}
            <div>{text}</div>
          </div>
          {eg?
            <div text='xs gray-500' flex='~ items-center' className='pb-0.5 -mt-0.5' onClick={()=>{setQuickInput(eg)}}>
              {/* <div className="i-ri-corner-left-up-line" /> */}
              {/* <div className="i-ri-arrow-up-line" /> */}
              <div className="i-ri-skip-right-line" />
              <div className='cursor-pointer' >{eg}</div>
            </div>
            :''
          }
        </div>
        :''
      }
      {show?<div mb-1/>:''}
    </div>
  )
}
