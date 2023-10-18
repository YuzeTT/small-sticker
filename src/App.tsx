import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'
import routes from '~react-pages'
import './App.css'
import Navbar from './components/Navbar'
import { Spin } from 'antd'
import Footer from './components/Footer'

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
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <div px-4 pb-4 max-w-xl mx-auto>
          <RouterRender/>
        </div>
        <Footer></Footer>
      </Router>
     </>
  )
}

export default App
