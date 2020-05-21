const template = require('./template');
const header = template.header();

module.exports.tankOper = function(navBar, menuLink, id, tankSetupData, statusData) {
    let setupTime = tankSetupData[0].tsTime;
    let senseTime = statusData[9].stime;
    let setup = JSON.parse(tankSetupData[0].tsTank);
    //console.log(setup[id-1]);
    let temp = setup[id-1].temp;
    let ph = setup[id-1].ph;
    console.log(statusData);
    let labels = '';
    let temps = ''; let stemps = '';
    let phs = ''; let sphs = '';
    let status;
    for (status of statusData) {
        labels += status.stime.substring(11,13) + ', ';
        temps += status.stemp + ', ';
        phs += status.sph + ', ';
        stemps += temp + ', ';
        sphs += ph + ', ';
    }
    let lis = '';
    for (let i=1; i<=10; i++) {
        lis += (i == id) ?
                `<li class="page-item active" aria-current="page">
                    <a class="page-link" href="#">${i}<span class="sr-only">(current)</span></a>
                </li>` :
                `<li class="page-item"><a class="page-link" href="/tank/oper/${i}">${i}</a></li>`
    }
     
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    ${header}
    <script src="/chartjs/Chart.min.js"></script>
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
                <div class="col-4"><h3>작동: 수조 ${id}</h3></div>
                <div class="col-8">
                    <nav>
                        <ul class="pagination">
                            ${lis}
                        </ul>
                    </nav>
                </div>
                <div class="col-12"><hr></div>
                <div class="col-6"><h5>최종 설정 시각: ${setupTime}</h5><br></div>
                <div class="col-6"><h5>최종 측정 시각: ${senseTime}</h5><br></div>
                <div class="col-7">
                    <h5>수온(&#8451) 및 수소이온농도(pH) </h5>
                    <canvas id="myChart" width="400" height="300"></canvas>
                </div>
                <div class="col-4">
                    <br><br>
                    <form action="/tank/oper" method="POST">
                    <table class="table">
                    <tbody>
                        <tr>
                            <td rowspan="3" style="text-align: center; font-weight: bold">수온<br>(28.0 ~ 31.0&#8451)</td>
                            <td class="col-2"><input style="text-align: center;" type="text" name="temp" value="${status.stemp.toFixed(1)}"></td>
                        </tr>
                        <tr>
                            <td><div class="progress">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${(status.stemp-28)/(31-28)*100}%" aria-valuemin="28" aria-valuemax="31">${status.stemp.toFixed(1)}</div>
                            </div></td>
                        </tr>
                        <tr>
                            <td><input type="range" class="form-control-range" name="temp" min="28" max="31" step="0.1" value="${status.stemp.toFixed(1)}"></td>
                        </tr>
                        <tr>
                            <td rowspan="3" style="text-align: center; font-weight: bold">pH<br>(4.5 ~ 6.5)</td>
                            <td class="col-2"><input style="text-align: center;" type="text" name="ph" value="${status.sph.toFixed(1)}"></td>
                        </tr>
                        <tr>
                            <td><div class="progress">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: ${(status.sph-4.5)/(6.5-4.5)*100}%" aria-valuemin="4.5" aria-valuemax="6.5">${status.sph.toFixed(1)}</div>
                            </div></td>
                        </tr>
                        <tr>
                            <td><input type="range" class="form-control-range" name="ph" min="4.5" max="6.5" step="0.1" value="${status.sph.toFixed(1)}"></td>
                        </tr>
                        <tr><td colspan="2" style="text-align: center;"><button type="submit" class="btn btn-primary">설정</button></td></tr>
                    </tbody>
                    </table>
                    </form>
                </div>
                <div class="col-1"></div>
            </div>
        </div>
    </div>
</div>
<script>
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [${labels}],
        datasets: [{
            label: '수온',
            fill: false,
            data: [${temps}],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2
        }, {
            label: '설정값',
            fill: false,
            data: [${stemps}],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointRadius: 0
        }, {
            label: 'pH',
            fill: false,
            data: [${phs}],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2
        }, {
            label: '설정값',
            fill: false,
            data: [${sphs}],
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            pointRadius: 0
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 35
                }
            }]
        }
    }
});
</script>
</body>
</html>
    `;
}
