const dm = require('./db-module.js');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let dateString = '';
let dialogs = ['Type Ctrl-D> ', 'am/pm> ', '일> ', '월> '];
let input = [];
rl.setPrompt(dialogs.pop());
rl.prompt();
rl.on('line', function (line) {
    input.push(line);
    rl.setPrompt(dialogs.pop());
    rl.prompt();
}).on('close', function () {
    //console.log(input);
    let apm = handleDate(input)
    console.log(dateString, apm);

    for (let i=0; i<12; i++) {
        for (let k=1; k<=10; k++) {
            let record = [];
            record.push(k);
            record.push(Math.random()*3.0 + 28.0);
            record.push(Math.random()*2.0 + 4.5);
            let hour = i + apm*12;
            let hourString = (hour < 10) ? `0${hour}` : `${hour}`;
            record.push(`${dateString} ${hourString}:00:00`);
            asyncInsert(record).then((res) => {
                process.stdout.write(hourString + '-' + res + ' ');
            });
        }
    }
});

const insertSenseTableSql = `INSERT INTO senseTable(stank, stemp, sph, stime) VALUES (?, ?, ?, ?)`;
async function asyncInsert(params) {
    await dm.executeQueryWithParams(insertSenseTableSql, params, function() {
    });
    return params[0];
}

function handleDate(params) {
    let year = 2020;
    let month = parseInt(params[0]);
    let day = parseInt(params[1]);

    dateString += `${year}-`;
    dateString += (month < 10) ? `0${month}-` : `${month}-`;
    dateString += (day < 10) ? `0${day}` : `${day}`;

    return (params[2] === 'pm') ? 1 : 0;
}