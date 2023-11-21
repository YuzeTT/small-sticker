import isVip from "../utils/isVip"

export default function AccountButton() {
  return (
    <a href='/user' className={`p-1 rounded-full flex items-center ${isVip().level===0?'bg-green-100 text-green-700':isVip().level === '1'?'bg-[#E8BD87] text-[#FFFFFF]':isVip().level === '100'?'bg-blue-500 text-[#FFFFFF]':''}`}>
      <div className="i-ri-account-circle-fill text-xl" />
      <div className='text-sm mx-1'>{isVip().level==100?'管理站点':'我的账户'}</div>
    </a>
  )
}
