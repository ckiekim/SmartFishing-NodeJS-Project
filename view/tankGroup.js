const template = require('./template');
const header = template.header();
const tankFunc = function(tank) {
    let bg = '';
    if (tank.temp > 30.5 || tank.temp < 28.5 || tank.ph < 4.5 || tank.ph > 6.5)
        bg = 'text-white bg-danger';
    else if (tank.temp > 30.0 || tank.temp < 29.0 || tank.ph < 5.0 || tank.ph > 6.0)
        bg = 'text-white bg-warning';
    else
        bg = 'text-white bg-success';
    
    if (tank.operating == 0)
        bg = 'bg-light';

    return `
        <div class="card ${bg}" style="width: 150px; height: 180px">
            <div class="card-body">
                <h5 class="card-title">${tank.tid}. ${tank.fish}</h5>
                <p class="card-text">- 온도: ${tank.temp}&#8451<br>
                - pH: ${tank.ph}<br>
                - 산소: ${tank.oxygen}</p>
                <p align="center">
                    <span style="color:skyblue"><a href="/tank/setup/${tank.tid}" style="color: inherit"><i class="fas fa-cog"></i></a></span>&nbsp;&nbsp;&nbsp;
                    <span style="color:skyblue"><a href="/tank/oper/${tank.tid}" style="color: inherit"><i class="fas fa-wrench"></i></a></span>
                </p>
            </div>
        </div>    
    `;
}

module.exports.tankGroup = function(navBar, menuLink, tankData) {
    let tankTop = '';
    for (let i = 0; i < 5; i++) {
        tankTop += `<td>${tankFunc(tankData[i])}</td>`;
    }
    let tankBottom = '';
    for (let i = 5; i < 10; i++) {
        tankBottom += `<td>${tankFunc(tankData[i])}</td>`;
    }
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
	${header}
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
                <div class="col-12"><h3>수조 상태</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <table class="table table-borderless">
                        <tr>
                            ${tankTop}
                        </tr>
                        <tr>
                            ${tankBottom}
                        </tr>
                    </table>
                </div>
                <div class="col-1"></div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}
