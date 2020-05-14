const template = require('./template');
const header = template.header();

module.exports.tankSetup = function(navBar, menuLink, tsData) {
    let setupTime = tsData.tsTime;
    let userId = tsData.tsPerson;
    let tanks = JSON.parse(tsData.tsTank);
    let tableRow = '';
    for (let tank of tanks) {
        if (tank.oper == 0) 
            radio = `<input type="radio" name="oper${tank.id}" value="0" checked>&nbsp;OFF&nbsp;&nbsp;
                    <input type="radio" name="oper${tank.id}" value="1">&nbsp;ON<br>`;
        else
            radio = `<input type="radio" name="oper${tank.id}" value="0">&nbsp;OFF&nbsp;&nbsp;
                    <input type="radio" name="oper${tank.id}" value="1" checked>&nbsp;ON<br>`;
        tableRow += `
            <tr>
                <input type="hidden" name="id" value="${tank.id}">
                <td style="font-weight: bold">&nbsp;&nbsp;&nbsp;${tank.id}&nbsp;&nbsp;&nbsp;</td>
                <td>${radio}</td>
                <td><input style="text-align: center;" type="text" name="temp" value="${tank.temp}"></td>
                <td><input style="text-align: center;" type="text" name="ph" value="${tank.ph}"></td>
                <td><input style="text-align: center;" type="text" name="food" value="${tank.food}"></td>
            </tr>
        `;
    }

    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    ${header}
    <style>
        td, th {text-align: center;}
    </style>
</head>
<body>
<div class="container">
    ${navBar}
	<div class="row" style="margin-top: 30px">
        <div class="col-2">
            ${menuLink}
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
                <div class="col-12"><h3>수조 설정</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">    
                    <h5>최종 설정 시각: ${setupTime}, &nbsp;&nbsp;&nbsp;설정자: ${userId}</h5>
                    <form action="/tank/setup" method="POST">
                    <table class="table table-borderless">
                    <thead class="thead-light">
                        <tr>
                            <th>번호</th>
                            <th>작동</th>
                            <th>수온<br>(28.0 ~ 31.0&#8451)</th>
                            <th>pH<br>(4.5 ~ 6.5)</th>
                            <th>1회 섭취량<br>(100 ~ 500g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRow}
                        <tr><td colspan="5" style="text-align: center;"><button type="submit" class="btn btn-primary">설정</button></td></tr>
                    </tbody>
                    </table>
                    </form>
                </div>
                <div class="col-1"></div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}
