
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Auth from './context/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
const queryClient = new QueryClient
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider  client={queryClient}>
  <BrowserRouter>
    <Auth>
      <App />
    </Auth>
  </BrowserRouter>
  </QueryClientProvider>
)
