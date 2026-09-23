import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { installCharts, ToastProvider } from 'northline'
import 'northline/theme.css' // tokens + base component styles
import './playground.css'
import App from './App.jsx'

installCharts()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
)
