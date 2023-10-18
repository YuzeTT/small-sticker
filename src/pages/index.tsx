import list from '../utils/router'
export default function index() {

  return (
    <div className='max-w-xl mx-auto mt-2'>
      <div text='sm' op50 mb-2>已完成</div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        {list.done.map((item, key)=>(
          <a href={item.url} p-4 bg-zinc-50 hover:bg-zinc-100 cursor-pointer rounded-xl decoration-none flex='~ items-center' key={key} >
            <img src={item.logo} alt="logo" h-10 w-10 mr-4 />
            <div text='lg zinc-900' flex-1>{item.name}</div>
            <div className='i-ri-arrow-right-s-line' text='xl zinc-300' />
          </a>
        ))}
      </div>
      <div text='sm' op50 mb-2 mt-4>咕咕咕...</div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        {list.todo.map((item, key)=>(
          <div p-4 bg-zinc-50 hover:bg-zinc-100 cursor-not-allowed rounded-xl flex='~ items-center' key={key}>
            <img src={item.logo} alt="logo" h-10 w-10 mr-4 op50 />
            <div text='lg zinc-400' flex-1>{item.name}</div>
            <div className='i-ri-arrow-right-s-line' text='xl zinc-300' />
          </div>
        ))}
      </div>
    </div>
  )
}
