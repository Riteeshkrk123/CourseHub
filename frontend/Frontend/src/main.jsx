import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import router from './routes/AppRoutes.jsx'
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './authProvider/AuthProvider.jsx'
import LoadingWrapper from './components/LoadingWrapper/LoadingWrapper.jsx'

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient} >
          <LoadingWrapper>
            <RouterProvider router={router} />
            <Toaster />
          </LoadingWrapper>
        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
)
