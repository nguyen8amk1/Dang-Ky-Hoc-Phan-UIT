const axios = require('axios');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Path to the cache file
const cacheFilePath = path.resolve(__dirname, 'cache.json');

// Function to load all cached data
function loadAllCache() {
  if (fs.existsSync(cacheFilePath)) {
    const cachedData = fs.readFileSync(cacheFilePath, 'utf8');
    return JSON.parse(cachedData);
  }
  return {};
}

// Function to save all cached data
function saveAllCache(cache) {
  fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2));
}

// Function to save data with a specific key to the cache
function saveToCache(key, data) {
  const cache = loadAllCache();
  cache[key] = data;
  saveAllCache(cache);
}

// Function to load data with a specific key from the cache
function loadFromCache(key) {
  const cache = loadAllCache();
  return cache[key] || null;
}


// Function to remove data with a specific key from the cache
function removeFromCache(key) {
  const cache = loadAllCache();
  if (cache.hasOwnProperty(key)) {
    delete cache[key];
    saveAllCache(cache);
    return true; // Indicates successful removal
  }
  return false; // Indicates key not found
}

// Function to update data with a specific key in the cache
function updateCache(key, newData) {
  const cache = loadAllCache();
  if (cache.hasOwnProperty(key)) {
    cache[key] = newData;
    saveAllCache(cache);
    return true; // Indicates successful update
  }
  return false; // Indicates key not found
}



const tiet2ca = {
    1: "123",
    2: "345",
    3: "678",
    4: "9",
}; 

const isURL = (url) => {
    return (/^https?:\/\//.test(url)); 
}

const isCached = (key) => {
    const cache = loadAllCache();
    return cache.hasOwnProperty(key);
}

const fetchAndParseXlsx = async (url) => {
    if(!isURL(url)) throw new Error("Filename suppose to be a URL");
    //removeFromCache(url);

    if(isCached(url)) {
        const usefulInfo = JSON.parse(loadFromCache(url));
        console.log("We're gonna return the cached data");
        return usefulInfo; 
    } else {
        try {
            // Fetch the XLSX file from the URL
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'arraybuffer'
            });

            // Convert the data to a buffer
            const data = Buffer.from(response.data, 'binary');

            // Parse the buffer into a workbook
            const workbook = XLSX.read(data, { type: 'buffer' });

            // TODO: try to take all the sheets 
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const usefulInfo = jsonData.map(entry => {
                return {
                    "MaMonHoc": entry["__EMPTY"],
                    "TenMonHoc": entry["__EMPTY_1"],
                    "MaLop": entry["__EMPTY_2"],
                    "NgayThi": entry["__EMPTY_6"],
                    "Thu": entry["__EMPTY_7"],
                    "CaThi": entry["__EMPTY_8"],
                    "Tiet": tiet2ca[entry["__EMPTY_8"]], 
                    "PhongThi": entry["CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM"],
                    "HocKi": entry["__EMPTY_16"],
                    "NamHoc": `${entry["__EMPTY_17"]}-${parseInt(entry["__EMPTY_17"]) + 1}`
                };
            }).filter(entry => Object.keys(entry).every(key => entry[key] !== undefined));

            const result = {
                lich_thi_header: {
                    name: jsonData[1]["TRƯỜNG ĐH CÔNG NGHỆ THÔNG TIN"],  
                    period: jsonData[2]["TRƯỜNG ĐH CÔNG NGHỆ THÔNG TIN"],  
                }, 
                lich_thi_body: {
                    ...usefulInfo
                }
            }

            // Output the JSON data
            saveToCache(url, JSON.stringify(result));
            return result; 

        } catch (error) {
            console.error('Error fetching or parsing the XLSX file:', error);
        }
    }


    // const wsLyThuyet = wb.Sheets[wb.SheetNames[0]];
    // const wsThucHanh = wb.Sheets[wb.SheetNames[1]];
    // const dataLyThuyet = XLSX.utils.sheet_to_json<any[][]>(wsLyThuyet, { header: 1 });
    // const dataThucHanh = XLSX.utils.sheet_to_json<any[][]>(wsThucHanh, { header: 1 });
    // const dataInArray = [...dataLyThuyet, ...dataThucHanh].filter(
    //     (row) => typeof row[0] === 'number', // những row có cột 0 là STT (STT là number) thì mới là data ta cần
    // );
    //
    // if (dataInArray.length) {
    //     // TODO: Mantually write the damn thing into localstorage
    //     const data = dataInArray.map((array) => arrayToTkbObject(array))
    //     return data;
    //
    //     // setDataExcel({
    //     //     data: ,
    //     //     fileName: file.name,
    //     //     lastUpdate: toDateTimeString(new Date()),
    //     // });
    // }
}


const maLop2LichThi = (maLop) => {
    // NOTE: this is just test code, this code should run on the frontend 
    const lichthibody = JSON.parse(loadFromCache("https://student.uit.edu.vn/sites/daa/files/202405/lichthi_dotthi_1_l2_hk2_nh2023_thong_bao.xlsx")).lich_thi_body;
    const dataArray = Object.values(lichthibody);
    // Filter the array to find matching "MaLop"
    const result = dataArray.filter(item => item.MaLop === maLop);
    return result;
}



module.exports = {
    fetchAndParseXlsx, 
    maLop2LichThi, 
}; 
