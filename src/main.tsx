// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
// import 'react-toastify/dist/ReactToastify.css';
import { registerWorker } from '../src/services/registerSW';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <App />,
)
//registerServiceWorker();
registerWorker();
