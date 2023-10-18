import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'

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
  return (
    <>
      <Navbar></Navbar>
      <Router>
        <div px-4 pb-4>
          <RouterRender/>
        </div>
      </Router>
     </>
  )
}

export default App
