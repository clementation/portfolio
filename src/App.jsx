// import React from 'react'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


import './styles/App.css'

const queryClient = new QueryClient()

import {
  Root,
  Portfolio,
  About,
  Contact,
  ErrorPage
} from './Routes'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Root ><ErrorPage /></Root>,
    children: [
        { index: true, element: <Portfolio /> },
        { path: "/About", element: <About /> },
        { path: "/Contact", element: <Contact /> }
    ]
  }
])

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App
