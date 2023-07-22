import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Mission, { loader } from './missions/mission.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider >
    </BrowserRouter>
  </React.StrictMode>,
)
