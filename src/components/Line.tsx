import { ReactNode } from "react";

export default function Line({zh, en, logo, children}:{zh: string, en:string, logo:ReactNode, children?:ReactNode}) {
  return (
    <div className="-mx-4 px-4 bg-zinc-50 py-2 mb-2 rounded-0 sm:rounded-xl sm:mt-2" flex='~ items-center'>
      {logo}
      <div className='flex-1'>
        <div text='xl' >{zh}</div>
        <div text='xs' className="op-50">{en}</div>
      </div>
      {children}
    </div>
  )
}
