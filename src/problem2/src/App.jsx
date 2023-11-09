import { useState } from 'react'
import './App.css'
import SwapPage from './pages/SwapPage'
import { customTheme } from './styles/theme.js'
import { Center, ChakraProvider } from '@chakra-ui/react'


function App() {

  return (
    <>
      <ChakraProvider theme={customTheme}>
        <SwapPage />
      </ChakraProvider>
    </>
  )
}

export default App
