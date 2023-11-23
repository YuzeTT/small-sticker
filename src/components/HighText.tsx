import { HTMLAttributes, useEffect, useState } from "react";

export default function HighText({
  text,
  show,
  eg,
  large,
  inputed,
  value,
  ...attrs
}: {
  text?: string,
  show: boolean,
  eg?: string,
  large?: boolean,
  inputed?: boolean,
  value?: string
} & HTMLAttributes<HTMLDivElement>) {
  const [quickInput, setQuickInput] = useState('')
  useEffect(() => {
    if (inputed) {
      setQuickInput(eg || '')
    }
  }, [inputed, eg])
  return (
    <div
      {...attrs}
      inline-block
      align-top
      className={`rounded-1 ${attrs.className}`}
    >
      <div contentEditable={true} suppressContentEditableWarning={true} style={show ? { padding: large ? '0.5rem 0.5rem' : '0.1rem 0.25rem', color: '#000000', background: '#DBEAFE', border: '1.5px solid #3B82F6', borderRadius: '0.25rem' } : {}} outline-none relative>
        {quickInput}{value}
        {/* {show?
          <div absolute w-full h-full bg-blue-100 rounded-md className="-z-10  -top-1 -left-2 py-1 px-2"></div>:''
        } */}
      </div>
      {show ?
        <div className={`${large ? 'text-4xl font-500 mt-1' : 'text-xs'}`}>
          {text ?
            <div text='blue-500' flex='~ items-center' className={`${large ? 'py-2' : 'py-0.5'}`}>
              <div className="i-ri-corner-left-up-line" />
              {/* <div className="i-ri-arrow-up-line" /> */}
              <div>{text}</div>
            </div> : ''
          }
          {eg ?
            <div text='gray-500' flex='~ items-center' className='pb-0.5 -mt-0.5' onClick={() => { setQuickInput(eg) }}>
              {/* <div className="i-ri-corner-left-up-line" /> */}
              {/* <div className="i-ri-arrow-up-line" /> */}
              <div className="i-ri-skip-right-line" />
              <div className='cursor-pointer' >{eg}</div>
            </div>
            : ''
          }
        </div>
        : ''
      }
      {show ? <div mb-1 /> : ''}
    </div>
  )
}
