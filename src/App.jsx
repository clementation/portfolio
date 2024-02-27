// import React from 'react'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'

import './styles/App.css'

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
    <RouterProvider router={router}/>
  )
}

export default App
