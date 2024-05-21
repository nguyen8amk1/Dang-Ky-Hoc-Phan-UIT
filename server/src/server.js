const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000; 
const {fetchAndParseXlsx, maLop2LichThi} = require('./utils'); 

app.use(cors());

app.get('/', (req, res) => {
    res.json({test: "Hello World"});
});

app.get('/test', (req, res) => {
    // NOTE: this malop is gonna be stored in the frontend localstorage
    const maLop = [
        "CS105.O21.KHCL", 
        "NT213.O22.ATCL", 
        "SOMETHINGELSE", 
        "SOMETHINGELSE", 
        "SOMETHINGELSE", 
    ]; 

    let matchingObjects = [];
    maLop.forEach(ml => {
        const matches = maLop2LichThi(ml);
        if (matches.length > 0) {
            matchingObjects = matchingObjects.concat(matches);
        }
    });

    res.json({
        your_lich_thi: matchingObjects
    });
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
