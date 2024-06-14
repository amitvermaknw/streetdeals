// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerWorker } from '../src/services/registerSW.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <App />,
)
//registerServiceWorker();
registerWorker();
