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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import JSEncrypt from 'jsencrypt'
import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import dayjs from 'dayjs'

const getVip = (level: string | undefined, time: number = 0, name: string = '加载中...') => {
  const list = [
    {
      level: '0',
      text: <div className='text-xs bg-zinc-500 text-white rounded px-1.5 py-0.5' mr-2>访客</div>,
      icon: '/images/vip/vip-0.svg'
    },
    {
      level: undefined,
      text: <div className='text-xs bg-orange-500 text-white rounded px-1.5 py-0.5' mr-2>会员</div>,
      icon: '/images/vip/vip-1.svg'
    },
    {
      level: '1',
      text: <div className='text-xs bg-orange-500 text-white rounded px-1.5 py-0.5' mr-2>会员</div>,
      icon: '/images/vip/vip-1.svg'
    },
    {
      level: '2',
      text: <div className='text-xs bg-purple-500 text-white rounded px-1.5 py-0.5' mr-2>贡献者</div>,
      icon: '/images/vip/vip-1.svg'
    },
    {
      level: '100',
      text: <div className='text-xs bg-zinc-900 text-white rounded px-1.5 py-0.5' mr-2>管理员</div>,
      icon: '/images/vip/vip-5.svg'
    }
  ]

  const v = list.find((v) => v.level === level)

  const loginExp = localStorage.getItem("login_exp")

  return (
    <div className='flex items-center'>
      <img src={v?.icon} alt="vip" className='w-8 mr-4' />
      <div className='flex-1'>
        <div className='flex items-center'>
          {v?.text}
          <div className='text-xl font-bold '>
            {parseInt(loginExp || '0') >= new Date().getTime() ? name : '用户'}
          </div>
        </div>
        <div className='text-xs op50 mt-1'>到期时间：{time ? dayjs(time).format('YYYY-MM-DD HH:mm') : '无期限'}</div>
      </div>
    </div>
  )
}

export default function User() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const { isOpen: isOpenVip, onOpen: onOpenVip, onClose: onCloseVip } = useDisclosure()
  // const vipBtnRef = useRef(null)

  const [userId, setUserId] = useState('')
  const [check, setCheck] = useState(false)
  const [userInfo, setUserInfo] = useState({ name: '用户', level: '0', time: 0, wechat: '' })
  const [inputKey, setInputKey] = useState('')
  const decrypt = useMemo(() => new JSEncrypt(), [])
  const priKey = import.meta.env.VITE_PRIKEY
  decrypt.setPrivateKey(priKey)
  const getInfo = useCallback(() => {
    const id = localStorage.getItem("key")
    const uncrypted = decrypt.decrypt(id || '')
    console.log(id);
    if (uncrypted === null) {
      return
    }
    const v = JSON.parse(uncrypted.toString())
    // setUserInfo(v)
    console.log(v);
    const t = new Date().getTime()
    if (v.time - t >= 0) {
      console.log('+ 密钥有效');
      // console.log(`${v.name}，欢迎回来！`);
      // toast({
      //   variant: 'subtle',
      //   description: `欢迎回来，${v.name}`,
      //   status: 'success',
      //   duration: 1000,
      // })
      setUserInfo(v)
      console.log(v);

    } else {
      console.log('- 密钥无效');
      toast({
        variant: 'subtle',
        description: `您的密钥已失效`,
        status: 'error',
        duration: 1000,
      })
    }

  }, [decrypt])

  const setUserID = useCallback(() => {
    const id = localStorage.getItem("id")
    if (id) {
      setUserId(id);
    } else {
      console.log('v-noid');
    }
  }, [])

  useEffect(() => {
    setUserID()
    getInfo()
  }, [getInfo, setUserID])

  const activeVip = () => {
    if (inputKey === '') {
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
    if (uncrypted === null) {
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
    if (v.time - t >= 0) {
      console.log('+ 密钥有效');
      // toast({
      //   variant: 'subtle',
      //   description: `${v.name} 登录成功`,
      //   status: 'success',
      //   duration: 1000,
      // })
      localStorage.removeItem('is_login')
      localStorage.removeItem('login_exp')

      setUserInfo(v)
      localStorage.setItem("key", inputKey)
      // reload()
      location.reload()
    } else {
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
                        <span className='font-bold text-blue-500'>{inputKey.slice(0, 5)}**********</span>
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
                <Checkbox className='flex-1' isChecked={check} onChange={(v) => { setCheck(v.target.checked) }}>我同意协议</Checkbox>
                <Button ref={cancelRef} onClick={onClose}>
                  取消
                </Button>
                <Button colorScheme='red' onClick={() => {
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
              <Input placeholder='输入密钥' type='password' onChange={(v) => { setInputKey(v.target.value) }} />
            </InputGroup>
            <Button variant='second' onClick={onOpen}>激活</Button>
          </div>
        </div>

        <Drawer
          isOpen={isOpenVip}
          placement='bottom'
          onClose={onCloseVip}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>兑换会员</DrawerHeader>
            <DrawerBody>
              <div className=''>
                <div className='mb-1 font-bold text-orange-500 text-center text-lg'>加微信：hong_yu1024（备注：爱发电）</div>
                <div className='mb-1 font-bold text-orange-500 text-center text-lg'>发送爱发电的订单即可~</div>
                {/* <div className='text-zinc-500 text-center text-sm'>之前赞助过的宝可以 补差价 <span className='font-bold'>并额外赠送7天</span> 哦！</div> */}
                <img src="/images/wechat_qrcode.jpg" alt="qrcode" className='w-80 mx-auto mt-2' />
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button variant='second' mr={3} onClick={onCloseVip}>
                关闭
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <div>
          本站已不再出售VIP，您可以通过 <a href="/coffee" text-blue-600 underline>赞助本站</a> 来支持我哦！
        </div>

        {/* <div className='card overflow-hidden pb-2'>
          <iframe src="https://afdian.net/leaflet?slug=sticker" width="100%" scrolling="no" height="200" frameborder="0" className=''></iframe>
        </div> */}
        {/* <div className='card'>
          <div>
            <div grid grid-cols-1>
              <div bg-white p-4 rounded-xl relative>
                <div className='flex-1'>
                  <div className='font-bold text-xl'>🧋一杯奶茶 | 早鸟特惠</div>
                  <div text-sm my-1>
                    <span className='text-red-500'>￥12.00</span>
                    <span op20 mx-1>/</span>
                    <span className='text-red-500'>31天</span>
                  </div>
                  <div className='mt-2'>
                    <div flex='~ items-center'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                      <div className='text-sm op80 ml-2'>解锁所有VIP功能</div>
                    </div>
                    <div flex='~ items-center'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                      <div className='text-sm op80 ml-2'>超清导出</div>
                    </div>
                    <div flex='~ items-center'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                      <div className='text-sm op80 ml-2'>去广告</div>
                    </div>
                    <div flex='~ items-center'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                      <div className='text-sm op80 ml-2'>商用授权（不包含第三方Logo）</div>
                    </div>
                  </div>
                  <div className='mt-4 flex gap-4 items-end justify-center'>
                    <a href="https://afdian.net/a/sticker">
                      <div className='text-sm text-purple-700 text-center mb-1'>先点这个购买 ↓</div>
                      <img width="150" src="https://pic1.afdiancdn.com/static/img/welcome/button-sponsorme.png" alt="" className='mx-auto' />
                    </a>
                    <div>
                      <div className='text-sm text-purple-700 text-center mb-1'>再加微信兑换+进群 ↓</div>
                      <button className='w-[150px] h-[42px] bg-purple-100 text-purple-700 text-sm rounded-md' onClick={onOpenVip}>联系作者</button>
                    </div>
                  </div>
                  <div className='absolute top-4 right-4 text-xs text-white rounded-full px-2 py-0.2 bg-red-500'>建站特惠</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}
