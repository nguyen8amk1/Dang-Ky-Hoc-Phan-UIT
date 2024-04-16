const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

app.use(cors());

app.get('/', (req, res) => {
    res.json({ text: 'DITMESAIGON' } )
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
