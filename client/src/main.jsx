import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './utilities/Toaster.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider
      position='top-right'
      defaultDuration={4000}
      maxToast={5}
    >
      <App />
    </ToastProvider>
  </StrictMode>,
)
