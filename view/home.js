const template = require('./template');
const header = template.header();
const TEMP_LOW = 18.0;
const TEMP_HIGH = 20.0;
const HUMID_LOW = 20.0;
const HUMID_HIGH = 28.0;
const CDS_LOW = 65.0;
const CDS_HIGH = 90.0;
const DIST_LOW = 10.0;
const DIST_HIGH = 30.0

module.exports.home = function(navBar, menuLink, sensor, actuator) {
    let temp = sensor.temperature;
    let humid = sensor.humidity;
    let cds = sensor.cds;
    let dist = sensor.distance;
    let sTime = sensor.sTime;
    let sUid = sensor.uid;
    let red = actuator.redLED;
    let green = actuator.greenLED;
    let blue = actuator.blueLED;
    let relay = actuator.relay;
    let aTime = actuator.aTime;
    let reason = actuator.reason;
    let aUid = actuator.uid;

    let tempColor, humidColor, cdsColor, distColor;
    if (temp > TEMP_HIGH) tempColor = 'bg-danger';
    else if (temp < TEMP_LOW) tempColor = 'bg-secondary';
    else tempColor = 'bg-success';
    if (humid > HUMID_HIGH) humidColor = 'bg-danger';
    else if (humid < HUMID_LOW) humidColor = 'bg-secondary';
    else humidColor = 'bg-success';
    if (cds > CDS_HIGH) cdsColor = 'bg-danger';
    else if (cds < CDS_LOW) cdsColor = 'bg-secondary';
    else cdsColor = 'bg-success';
    if (dist > DIST_HIGH) distColor = 'bg-danger';
    else if (dist < DIST_LOW) distColor = 'bg-secondary';
    else distColor = 'bg-success';
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
                <div class="col-12"><h3>스마트팜 상태</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <h4>센서</h4>
                    <table class="table table-condensed table-hover">
                        <thead class="thead-light">
                        <tr class="active">
                            <th>항목</th><th>범위</th>
                            <th style="text-align: center;">값</th>
                            <th>측정자</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><span style="color:orange"><i class="fas fa-thermometer-half"></i></span>&nbsp;&nbsp;온도</td>
                            <td>0 ~ 40 ℃</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar ${tempColor}" role="progressbar" style="width: ${temp/40*100}%" aria-valuemin="0" aria-valuemax="40">${temp}</div>
                                </div></td>
                            <td>${sUid}</td>
                        </tr>
                        <tr>
                            <td><span style="color:blue"><i class="fas fa-tint"></i></span>&nbsp;&nbsp;습도</td>
                            <td>0 ~ 60 %</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar ${humidColor}" role="progressbar" style="width: ${humid/60*100}%" aria-valuemin="0" aria-valuemax="60">${humid}</div>
                                </div></td>
                            <td>${sUid}</td>
                        </tr>
                        <tr>
                            <td><span style="color:red"><i class="far fa-lightbulb"></i></span>&nbsp;&nbsp;조도</td>
                            <td>0 ~ 250 lux</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar ${cdsColor}" role="progressbar" style="width: ${cds/250*100}%" aria-valuemin="0" aria-valuemax="300">${cds}</div>
                                </div></td>
                            <td>${sUid}</td>
                        </tr>
                        <tr>
                            <td><span style="color:green"><i class="fas fa-ruler-vertical"></i></span>&nbsp;&nbsp;거리</td>
                            <td>0 ~ 90 cm</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar ${distColor}" role="progressbar" style="width: ${dist/90*100}%" aria-valuemin="0" aria-valuemax="90">${dist}</div>
                                </div></td>
                            <td>${sUid}</td>
                        </tr>
                        <tr>
                            <td colspan="2">최종 측정시각: ${sTime}</td>
                            <td colspan="2" style="text-align: right;">
                                <span class="badge badge-success">정상</span>&nbsp;
                                <span class="badge badge-danger">높음</span>&nbsp;
                                <span class="badge badge-secondary">낮음</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-1"></div><br>
                <div class="col-11">
                    <h4>액츄에이터</h4>
                    <table class="table table-condensed table-hover">
                        <thead class="thead-light">
                        <tr class="active">
                            <th scope="col">항목</th><th>범위</th>
                            <th scope="col" style="text-align: center;">값</th>
                            <th scope="col">조작자</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>적색 <span class="badge badge-danger">LED</span></td><td>0 ~ 255</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${red/255*100}%" aria-valuemin="0" aria-valuemax="255">${red}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td>녹색 <span class="badge badge-success">LED</span></td><td>0 ~ 255</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-success" role="progressbar" style="width: ${green/255*100}%" aria-valuemin="0" aria-valuemax="255">${green}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td>청색 <span class="badge badge-primary">LED</span></td><td>0 ~ 255</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${blue/255*100}%" aria-valuemin="0" aria-valuemax="255">${blue}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td>릴레이</td><td>0 ~ 1</td>
                            <td style="text-align: center;">
                                <div class="progress" style="height: 25px; width: 400px">
                                    <div class="progress-bar bg-secondary" role="progressbar" style="width: ${relay*100}%" aria-valuemin="0" aria-valuemax="1">${relay}</div>
                                </div></td>
                            <td>${aUid}</td>
                        </tr>
                        <tr>
                            <td colspan="2">최종 조작시각: ${aTime}</td>
                            <td colspan="2" style="text-align: right;">조작 사유: ${reason}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-1"></div><br>
                </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}
