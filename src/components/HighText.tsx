export default function HighText({text, show, eg}:{text?: string, show: boolean, eg?: string}) {
  return (
    <div inline-block align-top mb-1 className='rounded-1 overflow-hidden'>
      <div contentEditable={true} style={show?{padding: '0 0.25rem', color: '#000000', background: '#DBEAFE', border: '1.5px solid #3B82F6', borderRadius: '0.25rem 0.25rem 0 0'}:{}} outline-none></div>
      {show?
        <div>
          <div text='xs white' bg='blue-500' px-1 flex='~ items-center' className='py-0.5'>
            <div className="i-ri-corner-left-up-line" />
            {/* <div className="i-ri-arrow-up-line" /> */}
            <div>{text}</div>
          </div>
          {eg?
            <div text='xs white' bg='teal-500' px-1 flex='~ items-center' className='py-0.5'>
              {/* <div className="i-ri-corner-left-up-line" /> */}
              {/* <div className="i-ri-arrow-up-line" /> */}
              <div className="i-ri-expand-right-line" />
              <div>{eg}</div>
            </div>
            :''
          }
        </div>
        :''
      }
    </div>
  )
}
