const axios = require('axios');
const cheerio = require('cheerio');

const test1 = 'https://lipsum.com/2';
const test2 = 'http://localhost:9000';
const test3 = 'http://172.17.5.16';     // 6조
const test4 = 'http://172.17.4.61';     // 1조
const instance = axios.create();
instance.defaults.timeout = 2000;

/* const getResponse = async () => {
    try {
        return await axios.get(test1, {timeout: 2000});
        //return await instance.get(test2);
    } catch (error) {
        console.error(error.errno, error.code);
    }
};

const showMsg = async () => {
    const response = await getResponse();

    if (response === undefined)
        process.exit();
    if (response.status == 200) {
        let html = cheerio.load(response.data);
    
        console.log(response.status, response.statusText);
        console.log(html('#lipsumTextarea').text());
    }
};

showMsg(); */

instance.get(test4).then(response => {
    let html = cheerio.load(response.data);
        
    console.log(response.status, response.statusText);
    /* let text = html('#lipsumTextarea').text();
    text = text.replace('\n\n', '\n<br>\n');
    console.log(text); */
    console.log(response.data);
}).catch(error => {
    console.error(error.errno, error.message);
});