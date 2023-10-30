import { Suspense, useEffect } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'
import routes from '~react-pages'
import './App.css'
import Navbar from './components/Navbar'
import { Spin, Modal } from 'antd'
import Footer from './components/Footer'
import { nanoid } from 'nanoid'

const Loading = () => {
  return (
    <Spin tip='加载中...'>
      <div h-50 w-full></div>
    </Spin>
  )
}

const RouterRender = () => {
  return (
    <Suspense fallback={<Loading />}>
      {useRoutes(routes)}
    </Suspense>
  )
}

function App() {
  useEffect(()=>{
    const id = localStorage.getItem("id")
    if (id) {
      console.log('idok');
      
      if(id==='NU4Wb3J3Hz'){
        Modal.warning({
          title: '关于您违规使用我站工具的警告',
          content: '我站发现您对使用本站生成的内容进行了涂抹二维码并共享的操作，故我站向您发送告警弹窗，如继续该行为我站将永久封禁您的ID',
          okText: '我已了解，且同意协议'
        });
      }
      
    } else {
      console.log('noid');
      const t_id = nanoid(10)
      localStorage.setItem("id", t_id)
    }
  }, [])

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <div bg='#EFEFEF'>
          <div px-4 py-4 max-w-xl mx-auto>
            <RouterRender/>
          </div>
        </div>
        <Footer></Footer>
      </Router>
     </>
  )
}

export default App
