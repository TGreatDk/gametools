import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Mission, { loader } from './missions/mission.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import About from './about.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'light'
  },
});

const router = createBrowserRouter([
  {
    path: '/gametools/',
    element: <App />,
    children: [
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
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider >
  </React.StrictMode>,
)
