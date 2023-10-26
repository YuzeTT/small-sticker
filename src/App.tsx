import { Suspense, useEffect } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'
import routes from '~react-pages'
import './App.css'
import Navbar from './components/Navbar'
import { Spin } from 'antd'
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
