import axios from "axios"
// import md5 from 'crypto-js/md5'
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export default function Test() {
  const api = import.meta.env.VITE_API
  // const user_id = import.meta.env.VITE_AFD_USER_ID
  // const token = import.meta.env.VITE_AFD_TOKEN
  // const ts = Math.floor(new Date().getTime() / 1000)
  // const params = {
  //   page: 1
  // }

  const [list, setList] = useState<any[]>([])

  // const sign = md5(`${token}params${JSON.stringify(params)}ts${ts}user_id${user_id}`)

  useEffect(()=>{
    axios.get(api+'/aifadian_list', {params: {page: 1}})
      .then(response => {
        setList(response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },[])
  return (
    <div>
      <div className='-mx-4 bg-zinc-100 h-[1px] mb-3'></div>
      <div className='text-[24px] font-bold'>爱发电用户</div>
      <div className='-mx-4 bg-zinc-100 h-[1px] my-3'></div>
      <div className=''>
        <table className='w-full'>
          <thead className=''>
            <tr>
              {/* <th className='text-xs font-500 text-right pb-2 pr-2'></th> */}
              <th className='text-xs font-500 text-right pb-2 px-2'>有效期</th>
              <th className='text-xs font-500 text-left pb-2 pl-2'>用户名</th>
              <th className='text-xs font-500 text-left pb-2 pl-2'>商品</th>
            </tr>
          {/* <div className='bg-zinc-100 h-[1px] my-3 w-full'></div> */}
          </thead>
          <tbody>
            {list.map((v, key)=>(
              <tr key={key} className='border-t-1 border-gray-100'>
                {/* <td className='text-sm text-right py-2 px-2'>
                  {v.current_plan.expire_time*1000 > new Date().getTime() ?
                    <div className='w-2 h-2 rounded-full bg-green-500'>
                      <div className='animate-ping w-2 h-2 rounded-full bg-green-500'></div>
                    </div>:
                    <div className='w-2 h-2 rounded-full bg-orange-500'></div>
                  }
                  <div></div>
                </td> */}
                <td className='font-mono text-sm text-right py-2 px-2 whitespace-nowrap w-[20%]'>
                  <div className='flex items-center gap-4 justify-end'>
                    <div>
                      {v.current_plan.expire_time*1000 > new Date().getTime() ?
                        <div className='w-2 h-2 rounded-full bg-green-500'>
                          <div className='animate-ping w-2 h-2 rounded-full bg-green-500'></div>
                        </div>:
                        <div className='w-2 h-2 rounded-full bg-orange-500'></div>
                      }
                    </div>
                    <div>
                      <div className='text-xs'>{dayjs(v.last_pay_time*1000).format('YY/MM/DD')}</div>
                      <div className='text-xs'>{dayjs(v.current_plan.expire_time*1000).format('YY/MM/DD')}</div>
                    </div>
                  </div>
                  {/* <div className='text-xs'>{dayjs(v.last_pay_time*1000).format('YY-MM-DD')}</div>
                  <div>{dayjs(v.last_pay_time*1000).format('HH:mm:ss')}</div> */}
                </td>
                <td className='text-sm text-green-600 py-2 pl-2 flex gap-2 items-center my-2 w-[100%]'>
                  <img src={v.user.avatar} alt="avatar" className='w-5 h-5 rounded-full' />
                  <div>{v.user.name}</div>
                </td>
                <td className='text-sm py-2 pl-2 w-[22%]'>
                  {v.current_plan.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* {list.map((v, key)=>(
          <div key={key} className='card rounded-md! divide-y my-4'>
            <div className='flex items-center p-2'>
              <div className="i-ri-time-line mr-1 op50" />
              <div className='text-sm op50'>{dayjs(v.last_pay_time*1000).format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
            <div className='p-2'>
              <div>{v.user.name}</div>
            </div>
          </div>
          // <div key={key} className='card rounded-md divide-y'>
          //   <div className='flex items-center p-2'>
          //     <div className="i-ri-time-line mr-1 op50" />
          //     <div className='text-sm op50'>{dayjs(v.last_pay_time*1000).format('YYYY-MM-DD HH:mm:ss')}</div>
          //   </div>
          //   <div className='p-2'>
          //     <div>{v.user.name}</div>
          //   </div>
          // </div>
        ))} */}
      </div>
      {/* <pre>
        {JSON.stringify(list, null, 2)}
      </pre> */}
    </div>
  )
}
