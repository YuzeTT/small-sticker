import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import 'virtual:uno.css'
import './index.css'

const colors = {
  brand: {
    500: '#07C160',
    600: '#21B55F',
    700: '#1FAC5A',
  },
  zinc: {
    50: '#07C160',
    500: '#F6F7F8',
    600: '#E9EAEB',
    700: '#DDDEDF',
  },

  // blue: {
  //   500: '#10aeff',
  //   600: '#3fbeff',
  //   700: '#0e9ce6',
  // },
  // indigo: {
  //   500: '#1485ee',
  //   600: '#439df1',
  //   700: '#1277d6',
  // },
  // green: {
  //   500: '#91d300',
  //   600: '#a7db33',
  //   700: '#82bd00',
  // },
  // lightgreen: {
  //   500: '#95ec69',
  //   600: '#aaef87',
  //   700: '#85d35e',
  // },
  // orange: {
  //   500: '#fa9d3b',
  //   600: '#fbb062',
  //   700: '#e08c34',
  // },
  // purple: {
  //   500: '#6467f0',
  //   600: '#8385f3',
  //   700: '#595cd7',
  // },
  // red: {
  //   500: '#fa5151',
  //   600: '#fb7373',
  //   700: '#e14949',
  // },
  // yellow: {
  //   500: '#ffc300',
  //   600: '#ffcf33',
  //   700: '#e6af00',
  // },
}

const components = {
  Button: {
    variants: {
      main: {
        bgColor: '#07C160',
        _hover: {
          bgColor: '#21B55F',
        },
        _active: {
          bgColor: '#1FAC5A',
        },
        _loading: {
          bgColor: '#07C160',
          _hover: {
            bgColor: '#07C160'
          }
        },
        textColor: 'white'
      },
      second: {
        bgColor: '#F6F7F8',
        _hover: {
          bgColor: '#E9EAEB',
        },
        _active: {
          bgColor: '#DDDEDF',
        },
        _loading: {
          bgColor: '#F6F7F8',
          _hover: {
            bgColor: '#F6F7F8'
          }
        },
        textColor: '#07C160'
      },
      vip: {
        bgColor: '#E8C391',
        _hover: {
          bgColor: '#E8C899',
        },
        _active: {
          bgColor: '#E8BD87',
        },
        _loading: {
          bgColor: '#E8C391',
          _hover: {
            bgColor: '#E8C391'
          }
        },
        textColor: '#FFFFFF'
      },
    }
  }
}

const theme = extendTheme({ colors, components })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
)
