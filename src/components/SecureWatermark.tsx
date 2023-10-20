import { ReactNode, useEffect, useState } from "react";

export default function SecureWatermark({children}:{children: ReactNode}) {
  const [userId, setUserId] = useState('')
  useEffect(()=>{
    const id = localStorage.getItem("id")
    if (id) {
      setUserId(id);
    } else {
      console.log('w-noid');
      
    }
  }, [userId])

  return (
    <div>
      <div text='sm' className='absolute right-0 op2 top-0 z-30'>{userId}</div>
      <div text='sm' className='absolute right-0 op2 bottom-0 z-30'>{userId}</div>
      <div text='sm' className='absolute left-0 op2 top-0 z-30'>{userId}</div>
      <div text='sm' className='absolute left-0 op2 bottom-0 z-30'>{userId}</div>
      {children}
    </div>
  )
}
