const express = require('express')
const app = express()
const port = 8000
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.send('OI THAT VAILON THAT KHONG THE TIN Hello World!')
});

app.get('/ditmesaigon', (req, res) => {
  res.send('DITMESAIGON Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
