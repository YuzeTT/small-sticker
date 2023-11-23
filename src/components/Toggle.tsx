interface ToggleProps {
  value: boolean
  onChange: (newValue: boolean) => void
  icon: React.ReactNode
  text: React.ReactNode
  remark?: React.ReactNode
}

export default function Toggle({ value, onChange, icon, text, remark }: ToggleProps) {
  const handleChange = () => {
    onChange(!value);
  };

  return (
    <label className="relative inline-block">
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        className="hidden"
      />
      {/* <span >1</span> */}
      <div className='flex flex-col items-center'>
        <div className={`transition w-9 h-9 flex items-center justify-center rounded-full ${value?'bg-green-600 text-white':'bg-green-100 text-green-700'}`}>
          {icon}
        </div>
        <div className='text-xs op80 mt-1.5'>{text}</div>
        <div className='text-[0.6rem] op50 mt-0.5'>{remark?remark:value?'ON':'OFF'}</div>
      </div>
    </label>
  )
}
