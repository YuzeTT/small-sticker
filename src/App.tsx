import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'
// import { useLocation } from "react-router-dom"

import routes from '~react-pages'

import './App.css'
import Navbar from './components/Navbar'

const RouterRender = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
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
        <div px-4 pb-4>
          <RouterRender/>
        </div>
      </Router>
     </>
  )
}

export default App
