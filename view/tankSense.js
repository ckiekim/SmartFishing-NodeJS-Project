const template = require('./template');
const header = template.header();

module.exports.tankSense = function(navBar, menuLink, tank, senseData) {
    let labels = '';
    let temps = '';
    let phs = '';
    for (let sense of senseData) {
        labels += sense.stime.substring(11,13) + ', ';
        temps += sense.stemp + ', ';
        phs += sense.sph + ', '
    }
    let lis = '';
    for (let i=1; i<=10; i++) {
        lis += (i == tank) ?
                `<li class="page-item active" aria-current="page">
                    <a class="page-link" href="#">${i}<span class="sr-only">(current)</span></a>
                </li>` :
                `<li class="page-item"><a class="page-link" href="/tank/sense/${i}">${i}</a></li>`
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
                <div class="col-4"><h3>센싱 데이터: 수조 ${tank}</h3></div>
                <div class="col-8">
                    <nav>
                        <ul class="pagination">
                            ${lis}
                        </ul>
                    </nav>
                </div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <h5>수온(&#8451) 및 수소이온농도(pH) </h5>
                    <canvas id="myChart" width="400" height="250"></canvas>
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
                                label: 'pH',
                                fill: false,
                                data: [${phs}],
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 2
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                    </script>
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
