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
  ErrorPage,
  Upload
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
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/upload", element: <Upload />}
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
