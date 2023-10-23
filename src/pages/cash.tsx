// import React from 'react'

import { Space, Input, Card, Progress, Alert } from "antd";
// import data from "../utils/sponsorList";
// import { useState } from "react";

export default function Cash() {
  // const [inputNumber , setInputNumber] = useState('')
  // const [userInfo , setUserInfo] = useState({})

  // const onSubmit = () => {
  //   const r = data.find(({number}) => number === inputNumber)
  //   console.log(r);
  //   setUserInfo(r)
    
  // }
  return (
    <div mt-4>
      <div>
        <Space.Compact className='w-full'>
          <Input 
            placeholder="输入您的赞助的付款订单号"
            // onChange={(v)=>{setInputNumber(v.target.value)}}
          />
          {/* <Button type="primary" onClick={onSubmit}>提交</Button> */}
        </Space.Compact>
      </div>
      {/* {userInfo? */}
        <Card >
        {/* <Card title={userInfo.name} extra={<div className="op50">{userInfo.time}</div>} className='mt-4'> */}
          <div flex='~'>
            <div>
              <div text='sm gray-400'>已用次数</div>
              <div text='3xl' font='bold' >3 <span text='sm gray-400' font='normal'>次</span></div>
            </div>
            <div ml-5>
              <div text='sm gray-400'>剩余次数</div>
              <div text='3xl' font='bold' >7 <span text='sm gray-400' font='normal'>次</span></div>
            </div>
          </div>
          <Progress percent={70} status='normal' />
          <Alert
            message="请勿向任何人泄露您的密钥"
            type="warning"
            showIcon
          />
          {/* <Collapse items={[
            {
              key: '1',
              label: <>'点击查看密钥'</>,
              children: <>1</>
            }
          ]} /> */}
          <div className='relative rounded-md overflow-hidden mt-2' style={{border:'1px solid #F0F0F0'}}>
            <div className='absolute top-0 left-0 w-full h-full backdrop-blur-sm'>
            </div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
              <div className="i-ri-eye-off-line mr-1" />
              点击显示密钥
            </div>
            <div className='bg-gray-100 rounded-md px-2 py-2'>
              <div>10001071012023102201361101847581</div>
            </div>
          </div>
        </Card>
        :''
      {/* } */}
    </div>
  )
}
