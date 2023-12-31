import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Mission, { loader } from './missions/mission.tsx';
import About from './about.tsx';
import { Typography } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/gametools/',
    element: <App />,
    children: [
      {
        path: '',
        element: <div>
<Typography>Hello! Please choose a mission by clicking the hamburger menu on the top left corner.</Typography>
        </div>
      },
      {
        path: 'missions/:missionId',
        element: <Mission />,
        loader: loader
      },
      {
        path: 'about',
        element: <About/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>    
      <RouterProvider router={router} />    
  </React.StrictMode>,
)
