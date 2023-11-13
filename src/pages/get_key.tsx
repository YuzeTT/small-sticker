import { useState } from "react";
import JSEncrypt from 'jsencrypt'
import dayjs from 'dayjs'

export default function Get_key() {
  const [rsa , setRsa] = useState('')
  const [name , setName] = useState('')
  const [level , setLevel] = useState('')
  const [d , setD] = useState('0')
  const [h , setH] = useState('0')
  const [t , setT] = useState(new Date().getTime())
  const [data , setData] = useState({
    time: t,
    name: name,
    level: level
  })
  const refresh = () => {
    setData({
      time: t+parseInt(d)*1000*60*60*24+parseInt(h)*1000*60*60,
      name: name,
      level: level
    })
    
  }
  const key = () => {
    const encryptor = new JSEncrypt()
    const pubKey = import.meta.env.VITE_PUBKEY
    
    encryptor.setPublicKey(pubKey)
    const rsa_text = encryptor.encrypt(JSON.stringify(data)) 
    setRsa(rsa_text||'Error')
  }
  return (
    <div>
      <div space-y-2>
        <div><span bg-teal px-1>timestamp</span> {t} <button onClick={()=>{setT(new Date().getTime())}} bg-teal-500 className="border-solid border-green-700 text-white">0.Refresh</button></div>
        <input type="text" value={name} onChange={(v)=>{setName(v.target.value)}} /> Nick Name
        <div>
          <input type="text" value={level} onChange={(v)=>{setLevel(v.target.value)}} /> Level
        </div>
        <div>
          <input type="number" value={d} onChange={(v)=>{setD(v.target.value)}} /> day(s)
        </div>
        <div>
          <input type="number" value={h} onChange={(v)=>{setH(v.target.value)}} /> hour(s)
        </div>
      </div>
      <table mt-2>
        <tbody>
          <tr>
            <td bg-blue text-center px-1>total</td>
            <td pl-2>{parseInt(d)} day(s) {parseInt(h)} hour(s)</td>
          </tr>
          <tr>
            <td bg-red text-center px-1>exp</td>
            <td pl-2>{dayjs(t+parseInt(d)*1000*60*60*24+parseInt(h)*1000*60*60).format('YYYY-MM-DD HH:mm:ss')}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={()=>{refresh()}} className='mt-4 w-full py-2 bg-blue-500 border-solid border-blue-700 active:bg-blue-500 text-white'>1.Refresh content</button>
      <div mt-4 bg-gray-700 px-1 text-white text-center text-sm>Preview</div>
      <div p-2 bg-white style={{border: '2px solid #374151'}}>
        <pre className='w-full break-all text-sm my-0'>
          {JSON.stringify(data, null, 2)||'No Data'}
        </pre>
      </div>
      <pre></pre>
      <button onClick={()=>{key()}} className='w-full py-2 bg-amber-500 border-solid border-amber-700 active:bg-amber-500 text-white'>2.Sign the key</button>
      <div className='mt-4 bg-green-700 px-1 text-white text-center text-sm'>Result</div>
      <div className='p-2 bg-white' style={{border: '2px solid #15803D'}}>
        <div className='w-full break-all text-sm'>
          {rsa||'No Data'}
        </div>
      </div>
    </div>
  )
}
