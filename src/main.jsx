import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CardDetails from './CardDetails'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CardDetails/>
  </StrictMode>,
)
