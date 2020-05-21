const template = require('./template');
const header = template.header();
const tankFunc = function(setup, status) {
    //console.log(setup, status);
    let bg = '';
    if (status.stemp > 30.9 || status.stemp < 28.1 || status.sph < 4.6 || status.sph > 6.4)
        bg = 'bg-danger';
    else if (status.stemp > 30.8 || status.stemp < 28.2 || status.sph < 4.7 || status.sph > 6.3)
        bg = 'bg-warning';
    else
        bg = 'bg-success';
    
    if (setup.oper == 0)
        bg = 'bg-secondary';

    return `
        <div class="card text-white ${bg}" style="width: 150px; height: 170px">
            <div class="card-body">
                <h5 class="card-title">${setup.id}. <b>${setup.fish}</b></h5>
                <table class="table table-sm" style="color: white;">
                    <tr>
                        <td>${setup.temp.toFixed(1)}</td>
                        <td><b>${status.stemp.toFixed(1)} &#8451</b></td>
                    </tr>
                    <tr>
                        <td>${setup.ph.toFixed(1)}</td>
                        <td><b>${status.sph.toFixed(1)} pH</b></td>
                    </tr>
                </table>
                <p align="center">
                    <span style="color:skyblue"><a href="/tank/setup/${setup.id}" style="color: inherit"><i class="fas fa-cog"></i></a></span>&nbsp;&nbsp;
                    <span style="color:skyblue"><a href="/tank/oper/${setup.id}" style="color: inherit"><i class="fas fa-wrench"></i></a></span>&nbsp;&nbsp;
                    <span style="color:skyblue"><a href="/tank/sense/${setup.id}" style="color: inherit"><i class="fas fa-chart-line"></i></a></span>
                </p>
            </div>
        </div>    
    `;
}

module.exports.tankStatus = function(navBar, menuLink, tankSetupData, status) {
    //console.log(tankSetupData);
    let setup = JSON.parse(tankSetupData[0].tsTank);
    let tankTop = '';
    for (let i = 0; i < 5; i++) {
        tankTop += `<td>${tankFunc(setup[i], status[i])}</td>`;
    }
    let tankBottom = '';
    for (let i = 5; i < 10; i++) {
        tankBottom += `<td>${tankFunc(setup[i], status[i])}</td>`;
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
