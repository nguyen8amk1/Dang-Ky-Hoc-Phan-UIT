const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 8080;

const certificate = '/etc/letsencrypt/live/nalendar.online/fullchain.pem'
const privateKey = '/etc/letsencrypt/live/nalendar.online/privkey.pem'


// Check if SSL certificate and key files exist
const sslCertExists = fs.existsSync(certificate) && fs.existsSync(privateKey);

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// If SSL certificate and key files exist, create an HTTPS server
if (sslCertExists) {
  const options = {
    key: fs.readFileSync('path/to/private/key.pem'),
    cert: fs.readFileSync('path/to/ssl/certificate.pem')
  };

  const server = https.createServer(options, app);
  server.listen(port, () => {
    console.log(`Example app listening on port ${port} over HTTPS`);
  });
} else {
  // If SSL certificate and key files do not exist, create an HTTP server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port} over HTTP`);
  });
}


