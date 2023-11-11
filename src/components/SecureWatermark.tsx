import { ReactNode, useEffect, useState } from "react";

export default function SecureWatermark({children}:{children?: ReactNode}) {
  const [userId, setUserId] = useState('')
  const [userId2, setUserId2] = useState('')
  useEffect(()=>{
    const id = localStorage.getItem("userId")
    const id2 = localStorage.getItem("id")
    if (id && id2) {
      setUserId(id);
      setUserId2(id2);
      console.log(id2);
      
    } else {
      console.log('w-noid');
      
    }
  }, [userId])

  return (
    <div className='absolute w-full h-full top-0 left-0 pointer-events-none'>
      <div text='.6rem' className='absolute right-0 op2 top-0 z-30'>{userId2}</div>
      <div text='.6rem' className='absolute right-0 op2 bottom-0 z-30'>{userId2}</div>
      <div text='.6rem' className='absolute left-0 op2 top-0 z-30'>{userId2}</div>
      <div text='.6rem' className='absolute left-0 op2 bottom-0 z-30'>{userId2}</div>
      {children}
    </div>
  )
}
