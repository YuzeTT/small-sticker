import axios from "axios"
import md5 from 'crypto-js/md5'
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export default function Test() {
  const user_id = import.meta.env.VITE_AFD_USER_ID
  const token = import.meta.env.VITE_AFD_TOKEN
  const ts = Math.floor(new Date().getTime() / 1000)
  const params = {
    page: 1
  }

  const [list, setList] = useState<any[]>([])

  const sign = md5(`${token}params${JSON.stringify(params)}ts${ts}user_id${user_id}`)

  useEffect(()=>{
    axios.get('https://afdian.net/api/open/query-sponsor', {params:{'user_id': user_id, 'params': JSON.stringify(params), 'ts': ts, 'sign': sign}})
      .then(response => {
        // 处理响应
        console.log(response.data);
        if(response.data.ec === 200){
          setList(response.data.data.list)
        }
      })
      .catch(error => {
        // 处理错误
        console.error('Error:', error);
      });
  },[])
  return (
    <div>
      <div className=''>
        {list.map((v)=>(
          <div className='card rounded-md divide-y'>
            <div className='flex items-center p-2'>
              <div className="i-ri-time-line mr-1 op50" />
              <div className='text-sm op50'>{dayjs(v.last_pay_time*1000).format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
            <div className='p-2'>
              <div>{v.user.name}</div>
            </div>
          </div>
        ))}
      </div>
      <pre>
        {JSON.stringify(list, null, 2)}
      </pre>
    </div>
  )
}
