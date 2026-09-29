import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MDXProvider } from '@mdx-js/react'
import App from './App.jsx'
import { componentsMdx } from './components/mdx.js'
import './styles/global.css'
import './components/Pendent.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MDXProvider components={componentsMdx}>
      <App />
    </MDXProvider>
  </StrictMode>,
)
