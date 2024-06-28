import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import AuthProvider from './features/authentication/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import './index.css'
import favicon from './assets/db_logo.svg';
// import 'react-toastify/dist/ReactToastify.css';
// import requestPermission from './services/requestPermission';

function App() {

  useEffect(() => {
    // requestPermission();\
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = favicon;
    document.head.appendChild(link);
  }, [])

  return (
    <>
      <React.Suspense fallback="...Loading">
        <BrowserRouter>
          <AuthProvider>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </React.Suspense>
    </>
  )
}

export default App
