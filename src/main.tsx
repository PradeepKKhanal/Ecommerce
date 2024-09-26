import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ChakraProvider} from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

const queryClient=new QueryClient();

const rootElement=document.getElementById('root');
if(rootElement){
  createRoot(rootElement).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
      <ChakraProvider>
       <App />
    </ChakraProvider>
  </QueryClientProvider>
  
   
  </StrictMode>)
}


