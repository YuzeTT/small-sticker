import { ReactNode } from "react";

export default function Line({zh, en, logo}:{zh: string, en:string, logo:ReactNode}) {
  return (
    <div className="-mx-4 px-4 bg-zinc-50 py-2 mb-2" flex='~ items-center'>
      {logo}
      <div>
        <div text='xl' >{zh}</div>
        <div text='xs' className="op-50">{en}</div>
      </div>
    </div>
  )
}
