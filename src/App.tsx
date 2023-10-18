import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'
// import { useLocation } from "react-router-dom"

import routes from '~react-pages'

import './App.css'
import Navbar from './components/Navbar'
import { Spin } from 'antd'

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
  // const location = useLocation();
  // console.log(location.pathname);
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <div px-4 pb-4 max-w-xl mx-auto>
          <RouterRender/>
        </div>
      </Router>
     </>
  )
}

export default App
