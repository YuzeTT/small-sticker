import { Button, Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Login({name}:{name: string}) {
  const toast = useToast()
  const [isLogin, setIsLogin] = useState(true)
  const id = localStorage.getItem("key")
  const loginExp = localStorage.getItem("login_exp")
  const [input, setInput] = useState('')
  const login = () => {
    console.log('+ 登录');
    console.log(isLogin);
    console.log(input);
    console.log(input===name);
    if(input===name) {
      localStorage.setItem("is_login", 'true')
      localStorage.setItem("login_exp", (new Date().getTime() + 1000*60*60*24*2).toString())
      setIsLogin(true)
      toast({
        variant: 'subtle',
        description: `验证成功！`,
        status: 'success',
        duration: 1000,
      })
    }else {
      toast({
        variant: 'subtle',
        description: `验证信息错误`,
        status: 'error',
        duration: 1000,
      })
    }
  }

  useEffect(()=>{
    if(parseInt(loginExp||'0') <= new Date().getTime()) {
      setIsLogin(false)
    }else {
      setIsLogin(localStorage.getItem("is_login")==='true'?true:false)
    }
  },[])

  return (
    <div className=''>
      {id!=null&&isLogin===false?
        <div className='absolute top-0 left-0 w-screen fixed h-screen overflow-hidden z-80 bg-white'>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
            <div className='text-sm op50 text-center mb-2'>身份验证</div>
            <div className='text-xl font-bold op90 text-center mb-4'>输入微信号以继续</div>
            <Input placeholder={`提示：${name.slice(0,4)}****`} onChange={(v)=>{setInput(v.target.value)}} />
            <Button className='mt-6' variant='main' onClick={login}>登录</Button>
            <div className='text-xs op50 text-center mt-4'>*旧版用户请使用微信昵称或联系更换新密钥</div>
          </div>
        </div>:''
      }
    </div>
  )
}
