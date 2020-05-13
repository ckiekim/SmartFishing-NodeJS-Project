const template = require('./template');
const header = template.header();

module.exports.tankSetup = function(navBar, menuLink) {
    let setupTime = '2020-05-20 14:53:27';
    let tableRow = '';
    for (let i=1; i<=10; i++) {
        tableRow += `
            <tr>
                <td style="font-weight: bold">&nbsp;&nbsp;&nbsp;${i}&nbsp;&nbsp;&nbsp;</td>
                <td><input type="checkbox" name="tank" value="0"></td>
                <td><input style="text-align: center;" type="text" name="temp" value="${29+i*0.1}"></td>
                <td><input style="text-align: center;" type="text" name="ph" value="${5+i*0.1}"></td>
                <td><input style="text-align: center;" type="text" name="oxy" value="${25-i*0.2}"></td>
                <td><input style="text-align: center;" type="text" name="food" value="${100+i*20}"></td>
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
                    <h5>최종 설정 시각: ${setupTime}</h5>
                    <form action="/tank/setup" method="POST">
                        <input type="hidden" name="group" value="1">
                    <table class="table table-borderless">
                    <thead class="thead-light">
                        <tr>
                            <th>번호</th>
                            <th><input type="checkbox" name="all"></th>
                            <th>수온<br>(28.0 ~ 31.0&#8451)</th>
                            <th>pH<br>(4.5 ~ 6.5)</th>
                            <th>산소<br>(20.0 ~ 30.0%)</th>
                            <th>1회 섭취량<br>(100 ~ 500g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRow}
                        <tr><td colspan="6" style="text-align: center;"><button type="submit" class="btn btn-primary">설정</button></td></tr>
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
