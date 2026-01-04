import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* This line below is the fix: */}
    <BrowserRouter basename="/Estate-Agent-App-NestIn-/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)