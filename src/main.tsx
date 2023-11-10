import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'virtual:uno.css'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
)
