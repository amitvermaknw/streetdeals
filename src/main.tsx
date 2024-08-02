
import ReactDOM, { hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { registerWorker } from '../src/services/registerSW.ts';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   // <React.StrictMode>
//   //   <App />
//   // </React.StrictMode>,
//   <App />,
// )

const rootElement = document.getElementById("root");
if (rootElement!.hasChildNodes()) {
  hydrateRoot(rootElement!, <App />)
} else {
  ReactDOM.createRoot(rootElement!).render(<App />,);
}

//registerServiceWorker();
// registerWorker();
