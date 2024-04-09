import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import AuthProvider from './features/authentication/components/AuthProvider';

function App() {
  return (
    <>

      <React.Suspense fallback="...Loading">
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </React.Suspense>
    </>
  )
}

export default App
