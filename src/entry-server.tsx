// import React from 'react'
// import ReactDOMServer from 'react-dom/server'
// import App from './App'

// export function render() {
//     const html = ReactDOMServer.renderToString(
//         <React.StrictMode>
//             <App />
//         </React.StrictMode>
//     )
//     return { html }
// }

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App'; // Adjust this import to match your actual App component path
import { Helmet } from 'react-helmet';
import React from 'react';

export async function render(url: string) {
  // Render the app as a string
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  // Generate the HTML for the helmet
  const helmet = Helmet.renderStatic();

  // Return the full HTML
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Vite SSR App</title>
        <base href="/streettadka/us-central1/ssrapp/">
      </head>
      <body>
        <div id="app">${appHtml}</div>
        <script type="module" src="/streettadka/us-central1/ssrapp/assets/index.js"></script>
      </body>
    </html>
  `;
}
