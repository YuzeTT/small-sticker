import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import 'virtual:uno.css'
import './index.css'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>,
)
