import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Mission, {loader} from './missions/mission.tsx';


const router = createBrowserRouter([
  {
    path:'/gametools/',
    element: <App/>,
    children:[
      {
      path:'missions/:missionId',
      element: <Mission/>,
      loader: loader
      }
    ]
  }  
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
