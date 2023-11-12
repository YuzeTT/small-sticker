import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Checkbox,
} from '@chakra-ui/react'
import JSEncrypt from 'jsencrypt'
import { useMemo, useState, useCallback, useEffect, useRef, RefObject } from 'react'
import dayjs from 'dayjs'

const getVip = (level: number, time: number = 0, name: string = '加载中...') => {
  const list = [
    {
      level: 0,
      text: <div className='text-xs bg-zinc-500 text-white rounded px-1.5 py-0.5' mr-2>访客</div>,
      icon: '/images/vip/vip-0.svg'
    },
    {
      level: undefined,
      text: <div className='text-xs bg-orange-500 text-white rounded px-1.5 py-0.5' mr-2>会员</div>,
      icon: '/images/vip/vip-1.svg'
    },
    {
      level: 100,
      text: <div className='text-xs bg-zinc-900 text-white rounded px-1.5 py-0.5' mr-2>管理员</div>,
      icon: '/images/vip/vip-5.svg'
    }
  ]

  const v = list.find((v)=>v.level===level)

  const loginExp = localStorage.getItem("login_exp")

  return (
    <div className='flex items-center'>
      <img src={v?.icon} alt="vip" className='w-8 mr-4' />
      <div className='flex-1'>
        <div className='flex items-center'>
          {v?.text}
          <div className='text-xl font-bold '>
            {parseInt(loginExp||'0')>=new Date().getTime()?name:'用户'}
          </div>
        </div>
        <div className='text-xs op50 mt-1'>到期时间：{time?dayjs(time).format('YYYY-MM-DD HH:mm'):'无期限'}</div>
      </div>
    </div>
  )
}

export default function User() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const [userId, setUserId] = useState('')
  const [check, setCheck] = useState(false)
  const [userInfo, setUserInfo] = useState({name: '用户', level: 0, time: 0, wechat: ''})
  const [inputKey, setInputKey] = useState('')
  const decrypt = useMemo(()=>new JSEncrypt(),[])
  const priKey  = import.meta.env.VITE_PRIKEY
  decrypt.setPrivateKey(priKey)
  const getInfo = useCallback(() => {
    const id = localStorage.getItem("key")
    const uncrypted = decrypt.decrypt(id||'')
    console.log(id);
    if(uncrypted===null){
      return
    }
    const v = JSON.parse(uncrypted.toString())
    // setUserInfo(v)
    console.log(v);
    const t = new Date().getTime()
    if(v.time-t >= 0) {
      console.log('+ 密钥有效');
      console.log(`${v.name}，欢迎回来！`);
      toast({
        variant: 'subtle',
        description: `欢迎回来，${v.name}`,
        status: 'success',
        duration: 1000,
      })
      setUserInfo(v)
      console.log(v);
      
    }else{
      console.log('- 密钥无效');
      toast({
        variant: 'subtle',
        description: `您的密钥已失效`,
        status: 'error',
        duration: 1000,
      })
    }
    
  },[decrypt])

  const setUserID = useCallback(() => {
    const id = localStorage.getItem("id")
    if (id) {
      setUserId(id);
    } else {
      console.log('v-noid');
    }
  },[])

  useEffect(()=>{
    setUserID()
    getInfo()
  }, [getInfo, setUserID])

  const activeVip = () => {
    if(inputKey==='') {
      toast({
        variant: 'subtle',
        description: `请输入密钥`,
        status: 'error',
        duration: 1000,
      })
      return
    }
    console.log('+ 激活会员');
    const uncrypted = decrypt.decrypt(inputKey)
    // console.log(id);
    if(uncrypted===null){
      toast({
        variant: 'subtle',
        description: `密钥错误`,
        status: 'error',
        duration: 1000,
      })
      return
    }
    const v = JSON.parse(uncrypted.toString())
    console.log(v);
    const t = new Date().getTime()
    if(v.time-t >= 0) {
      console.log('+ 密钥有效');
      toast({
        variant: 'subtle',
        description: `${v.name} 登录成功`,
        status: 'success',
        duration: 1000,
      })
      
      setUserInfo(v)
      localStorage.setItem("key", inputKey)
      // reload()
      location.reload()
    }else{
      console.log('- 密钥无效');
      toast({
        variant: 'subtle',
        description: `您的密钥已失效`,
        status: 'error',
        duration: 1000,
      })
    }
  }
  
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              绑定设备
            </AlertDialogHeader>

            <AlertDialogBody>
              您确定要绑定该设备？
            </AlertDialogBody>
            <AlertDialogBody>
              <div className='card p-2 space-y-1'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span className='op50 mr-2'>设备ID</span>
                      </td>
                      <td>
                        <span className='font-bold text-blue-500'>{userId}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className='op50 mr-2'>密钥</span>
                      </td>
                      <td>
                        <span className='font-bold text-blue-500'>{inputKey.slice(0,5)}**********</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AlertDialogBody>
            <AlertDialogBody className='text-red-500'>
              共享密钥的行为将会被封禁
            </AlertDialogBody>

            <AlertDialogFooter>
              <div className='flex flex-1'>
                <Checkbox className='flex-1' isChecked={check} onChange={(v)=>{setCheck(v.target.checked)}}>我同意协议</Checkbox>
                <Button ref={cancelRef} onClick={onClose}>
                  取消
                </Button>
                <Button colorScheme='red' onClick={()=>{
                  activeVip()
                  onClose()
                }} ml={3} isDisabled={!check}>
                  绑定该设备
                </Button>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <div className='space-y-4'>
        <div className='card px-4 py-4'>
          <div className='flex justify-between items-center'>
            {getVip(userInfo.level, userInfo.time, userInfo.name)}
            <div className='text-xs op50'>{userId}</div>
          </div>
        </div>
        <div className='card p-2'>
          <div className='flex gap-2'>
            <InputGroup>
              <InputLeftElement>
                <div className="i-ri-bank-card-line text-xl" />
              </InputLeftElement>
              <Input placeholder='输入密钥' type='password' onChange={(v)=>{setInputKey(v.target.value)}} />
            </InputGroup>
            <Button variant='main' onClick={onOpen}>激活</Button>
          </div>
        </div>
      </div>
    </>
  )
}
