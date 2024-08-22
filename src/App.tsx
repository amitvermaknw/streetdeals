import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import requestPermission from './services/requestPermission';
import { AdminAuthProvider } from './features/authentication/index';
import UserAuthProvider from './features/authentication/components/UserAuthProvider';
import DbProvider from './providers/DBProvider';

function App() {

  useEffect(() => {
    requestPermission();
  }, [])

  return (
    <>
      <React.Suspense fallback="...Loading">
        <BrowserRouter>
          <DbProvider>
            <UserAuthProvider>
              <AdminAuthProvider>
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
              </AdminAuthProvider>
            </UserAuthProvider>
          </DbProvider>
        </BrowserRouter>
      </React.Suspense>
    </>
  )
}

export default App
