import express from 'express';
// import path from 'path';
// import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../App';
// import bodyParser from 'body-parser';
import React from 'react';
// import serialize from 'serialize-javascript';
// import https from 'https';


const PORT = 3000;
const app = express();

// app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static('dist/client'));
// app.use(bodyParser.json({ limit: '50mb' }));

app.get('*', (req, res) => {
  const context = {};
  const appHtml = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/assets/db_logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="msvalidate.01" content="5718682D9A54AE1AA0B254233257C388" />
        <meta name="description"
          content="Discover the best deals and discounts on electronics, fashion, home goods, and more. Daily updated offers to save you money.">
        <title>Best Deals and Discounts - Daily Offers | Deals Burst</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/bundle.js"></script>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "headline": "Best Deals and Discounts - Daily Offers",
            "description": "Discover the best deals and discounts on electronics, fashion, home goods, and more. Daily updated offers to save you money.",
            "publisher": {
              "@type": "DealsBurst",
              "name": "Deals Burst",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.dealsburst.com/db_logo.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.dealsburst.com"
            }
          }
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// export {
//   app
// }
