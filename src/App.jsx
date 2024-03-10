// import React from 'react'
import { createBrowserRouter, RouterProvider, useLocation, Navigate} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


import './styles/App.css'

const queryClient = new QueryClient()

import {
  Root,
  Portfolio,
  Project,
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
      {index: true, element: <Navigate to="/portfolio" />},
      { 
        path: "/portfolio", 
        element: <Portfolio />,
        children: [
          {path: ":project", element: <Project />}
        ]
      },
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
