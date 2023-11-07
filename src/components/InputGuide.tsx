export default function InputGuide({hiddenTips}:{hiddenTips?: boolean}) {
  return (
    <div>
      {!hiddenTips?
        <div flex='~ items-center' mb-2  bg-zinc-50 p-2 rounded-md>
          <div className="i-ri-lightbulb-fill w-4 h-4 mr-2 text-blue-500" />
          <div text='zinc-600 sm'>点击灰色文字可以快速填充哦！</div>
        </div>:''
      }
      <div className='grid grid-cols-3' text='center'>
        <div text='xs zinc-500' mb-2>
          <div className='text-blue-500' style={{fontFamily: 'code'}}>1</div>
          <div>编辑数据</div>
          {/* <div className="i-ri-arrow-drop-down-line mx-auto text-zinc-400" /> */}
        </div>
        <div text='xs zinc-500' mb-2>
          <div className='text-blue-500' style={{fontFamily: 'code'}}>2</div>
          <div>预览效果并生成</div>
          {/* <div className="i-ri-arrow-drop-down-line mx-auto text-zinc-400" /> */}
        </div>
        <div text='xs zinc-500' mb-2>
          <div className='text-blue-500' style={{fontFamily: 'code'}}>3</div>
          <div>查看结果</div>
          {/* <div className="i-ri-arrow-drop-down-line mx-auto text-zinc-400" /> */}
        </div>
      </div>
    </div>
  )
}
