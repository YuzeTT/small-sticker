// import { Input } from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react"
import isVip from "../../utils/isVip";

export default function Userlist() {
  const api = import.meta.env.VITE_API
  const [inputKey, setInputKey] = useState('')
  const [list, setList] = useState([])

  useEffect(()=>{
    axios.get(api+'/get_user_list')
      .then(response => {
        const jsonData = response.data;
        setList(jsonData.items.reverse())
      })
      .catch(error => {
        console.error('请求出错:', error);
      });
  },[])

  const submit = () => {
    console.log('+ submit');
    setInputKey('')
    axios.post(api+'/add', {key: inputKey}, {
      headers: {
        'Content-Type': 'application/json', // 可能需要根据实际情况设置 Content-Type
      },
    })
      .then(response => {
        // 在这里处理成功的响应
        console.log('POST 请求成功:', response.data);
      })
      .catch(error => {
        // 处理请求出错
        console.error('POST 请求出错:', error);
      });
  }

  // function shield(str: string) {
  //   const prefix = (str as string).slice(0, 2);
  //   const suffix = (str as string).slice(-2);
  //   const middleMasked = Math.max(str.length - 4, 0);
  //   // const middleMasked = '*'.repeat(middleMasked);
  
  //   return prefix + '*'.repeat(middleMasked) + suffix;
  // }

  return (
    <div className=''>
      {/* {api} */}
      {isVip().level==100?
        <>
          <div className='card p-2 flex gap-2'>
          {/* <Input placeholder='Enter key' type='text' onChange={(v) => { setInputKey(v.target.value) }}></Input> */}
            <input placeholder='Enter key' type='text' value={inputKey} onChange={(v) => { setInputKey(v.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:ring focus:border-blue-500 block w-full p-2.5"></input>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={submit}>Submit</button>
          </div>
          <div className='mt-3 grid grid-cols-3 card py-3'>
            <div className='flex flex-col justify-center mx-auto text-center'>
              <div className='flex items-center gap-1 bg-green-100 rounded-full p-0.5 pr-2'>
                <div className="i-ri-checkbox-circle-fill text-green-500" />
                <div className='text-xs text-green-700'>Available</div>
              </div>
              <div className='text-2xl mt-2' style={{fontFamily: 'code'}}>
                {list.filter((v)=>{return v[2] - new Date().getTime() >= 0}).length}
              </div>
            </div>
            <div className='flex flex-col justify-center mx-auto text-center'>
              <div className='flex items-center gap-1 bg-orange-100 rounded-full p-0.5 pr-2'>
                <div className="i-ri-close-circle-fill text-orange-500" />
                <div className='text-xs text-orange-700'>Expired</div>
              </div>
              <div className='text-2xl mt-2' style={{fontFamily: 'code'}}>
                {list.filter((v)=>{return v[2] - new Date().getTime() < 0}).length}
              </div>
            </div>
            <div className='flex flex-col justify-center mx-auto text-center'>
              <div className='flex items-center gap-1 bg-blue-100 rounded-full p-0.5 pr-2'>
                <div className="i-ri-account-circle-fill text-blue-500" />
                <div className='text-xs text-blue-700'>Total</div>
              </div>
              <div className='text-2xl mt-2' style={{fontFamily: 'code'}}>
                {list.length}
              </div>
            </div>
          </div>
          <div className='mt-3 grid grid-cols-1 gap-2'>
            {list.map((v, key)=>(
              <div key={key} className='card px-3 relative py-2'>
                <div className='absolute text-3xl right-2 top-1 text-zinc-300' style={{fontFamily: 'code'}}>#{v[0]}</div>
                <div className=' flex items-center gap-1'>
                  {v[2] - new Date().getTime() >= 0 &&
                    <div className='flex items-center gap-1 bg-green-100 rounded-full p-0.5 pr-2'>
                      <div className="i-ri-checkbox-circle-fill text-green-500" />
                      <div className='text-xs text-green-700'>Available</div>
                    </div>
                  }
                  {v[2] - new Date().getTime() < 0 &&
                    <div className='flex items-center gap-1 bg-orange-100 rounded-full p-0.5 pr-2'>
                      <div className="i-ri-close-circle-fill text-orange-500" />
                      <div className='text-xs text-orange-700'>Expired</div>
                    </div>
                  }
                  <div className='font-bold text-xl'>{v[1]}</div>
                </div>
                <div><span className="text-zinc-500 mr-2">Expiry Date</span>{dayjs(v[2]).format('YYYY-MM-DD HH:mm:ss')}</div>
                <div><span className="text-zinc-500 mr-2">Level</span>{v[3]}</div>
                {/* <div className='flex items-center gap-2 absolute bottom-2 right-3'>
                  <div className='w-2 h-2 rounded-full bg-green-500'></div>
                  <div>Available</div>
                </div> */}
              </div>
            ))}
          </div>
      </>:'NotFound'
    }
    </div>
  )
}
