import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MutedContextProvider } from './hooks/useMuted.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MutedContextProvider>
      <App />
    </MutedContextProvider>
  </StrictMode>,
)
