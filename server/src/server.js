const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8080;

const certificate = path.join(path.dirname(__dirname), '/certs/fullchain.pem'); 
const privateKey = path.join(path.dirname(__dirname), '/certs/privkey.pem'); 
console.log(certificate, privateKey);

app.use(cors( {
  origin: '*',
  optionsSuccessStatus: 200 
}));


// Check if SSL certificate and key files exist
const sslCertExists = fs.existsSync(certificate) && fs.existsSync(privateKey);

console.log("ssl exist: ?", sslCertExists);

// Define routes
app.get('/', (req, res) => {
  res.json({ditme: "That khong the tin duoc"});
});

// If SSL certificate and key files exist, create an HTTPS server
if (sslCertExists) {
  const options = {
    key: fs.readFileSync(privateKey),
    cert: fs.readFileSync(certificate)
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


