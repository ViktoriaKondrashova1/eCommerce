import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/shared/styles/reset.css'
import '@/shared/styles/index.scss'

createRoot(document.getElementById('root')!).render(
  <App />,
)
