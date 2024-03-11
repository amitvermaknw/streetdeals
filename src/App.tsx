import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';

function App() {
  return (
    <>
      <React.Suspense fallback="...Loading">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </React.Suspense>
    </>
  )
}

export default App
