import { Suspense, useEffect } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'
import { Fade } from '@chakra-ui/react'
import routes from '~react-pages'
import './App.css'
import Navbar from './components/Navbar'
// import { Modal } from 'antd'
import Login from './components/Login'
import Footer from './components/Footer'
import { nanoid } from 'nanoid'
import isVip from './utils/isVip'

const Loading = () => {
  return (
    <div className=''>
      <div className='w-full mt-30 mb-20 flex flex-col justify-center text-center items-center'>
        <img src="/images/big-sticker_logo_2.webp" alt="logo" className='w-10 h-10 animate-bounce mx-auto' />
        <div className='text-sm op50 mt-4'>加载中...</div>
      </div>
    </div>
  )
}

const RouterRender = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Fade in={true}>
          {useRoutes(routes)}
        </Fade>
      </Suspense>
    </div>
  )
}

function App() {
  const info = isVip()
  useEffect(()=>{
    const id = localStorage.getItem("id")
    if (id) {
      console.log('idok');
      
      // if(id==='NU4Wb3J3Hz'){
      //   Modal.warning({
      //     title: '关于您违规使用我站工具的警告',
      //     content: '我站发现您对使用本站生成的内容进行了涂抹二维码并共享的操作，故我站向您发送告警弹窗，如继续该行为我站将永久封禁您的ID',
      //     okText: '我已了解，且同意协议'
      //   });
      // }
      
    } else {
      console.log('noid');
      const t_id = nanoid(10)
      localStorage.setItem("id", t_id)
    }

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.addEventListener('controllerchange', () => {
    //     toast({
    //       title: '有更新可用',
    //       icon: <div className="i-ri-refresh-line text-2xl" />,
    //       description: <div className='flex items-center'>
    //         <div>更新已加载完毕，点击按钮以更新 ➤</div>
    //         <Button bgColor='white' size='sm' className='ml-2' onClick={()=>{window.location.reload()}}>更新</Button>
    //       </div>,
    //       status: 'success',
    //       duration: 9000,
    //     })    
    //   });
    // }else {
    //   console.log('+ 未检测到更新');
    // }
  }, [])

  return (
    <>
      <Router>
        {info.name!=='用户'?
          <Login name={info.name}></Login>:''
        }
        <div bg='white' className='overflow-hidden'>
          <Navbar></Navbar>
          <div>
            <div className='px-4 pb-4 max-w-xl mx-auto'>
              <RouterRender/>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </Router>
     </>
  )
}

export default App
