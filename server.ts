import express from 'express';
import { render } from './src/entry-server';
// import { onRequest } from "firebase-functions/v2/https";
import { fileURLToPath } from 'url';
import path from 'path';

// For resolving __dirname and __filename in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', async (req, res) => {
    console.log("inside server rendering");
    const { appHtml } = await render(req.url);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vite SSR</title>
      </head>
      <body>
        <div id="app">${appHtml}</div>
        <script type="module" src="/src/entry-client.tsx"></script>
      </body>
    </html>
  `;

    res.status(200).send(html);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// const ssrapp = onRequest(app);

// export {
//   ssrapp,
// };
