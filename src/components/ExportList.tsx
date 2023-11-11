import { Empty, Image } from "antd";

export default function ExportList({imageSrc}:{imageSrc: {data: string, time: string}[]}) {
  return (
    <div>
      {imageSrc.length === 0?
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无数据' />:
        <div className='grid grid-cols-2 gap-4'>
          {imageSrc.map((v,k)=>(
            <div key={k}>
              <div style={{border:'2px dashed #E5E7EB', padding: '10px'}}>
                <Image
                  className="shadow-xl"
                  src={v.data}
                />
              </div>
              <div text='sm gray-500' className='mt-2'>{v.time}</div>
            </div>
          ))
          }
        </div>
      }
    </div>
  )
}
