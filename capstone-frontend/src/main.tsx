// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import './index.css'
import App from './App';
import { Layout } from './components/Layout';
import { AuthProvider } from './auth/auth-context'; // Import AuthProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
      <AuthProvider> {/* Wrap the application in AuthProvider */}
        <Layout>
          <App />
        </Layout>
      </AuthProvider>
       <Toaster position="top-center" richColors />
       </BrowserRouter>
     </ThemeProvider>
   </StrictMode>)