const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000; 
const {fetchAndParseXlsx} = require('./utils'); 

app.use(cors());

app.get('/', (req, res) => {
    res.json({test: "Hello World"});
});

app.get('/getLichThi', (req, res) => {
    try {
        fetchAndParseXlsx("https://student.uit.edu.vn/sites/daa/files/202405/lichthi_dotthi_1_l2_hk2_nh2023_thong_bao.xlsx").then(json => {
            //console.log(res);
            res.json(json);
        });
    } catch (e) {
        console.log(e);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
