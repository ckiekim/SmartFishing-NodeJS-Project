const template = require('./template');
const header = template.header();

module.exports.tankSetup = function(navBar, menuLink) {
    let setupTime = '2020-05-20 14:53:27';
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
                <div class="col-12"><h3>수조 설정</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <h5>최종 설정 시각: ${setupTime}</h5>
                    <form action="/tank/setup" method="POST">
                    <table class="table">
                    <thead>
                        <tr>
                            <th style="text-align: center;">번호</th>
                            <th style="text-align: center;"><input type="checkbox" name="all"></th>
                            <th style="text-align: center;">수온<br>(28.0 ~ 31.0&#8451)</th>
                            <th style="text-align: center;">pH<br>(4.5 ~ 6.5)</th>
                            <th style="text-align: center;">산소<br>(20.0 ~ 30.0%)</th>
                            <th style="text-align: center;">1회 섭취량<br>(100 ~ 500g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="text-align: center; font-weight: bold">&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;</td>
                            <td style="text-align: center;"><input type="checkbox" name="tank"></td>
                            <td class="col-2"><input style="text-align: right;" type="text" name="temp" value="29.5"></td>
                            <td class="col-2"><input style="text-align: right;" type="text" name="ph" value="5.0"></td>
                            <td class="col-2"><input style="text-align: right;" type="text" name="oxy" value="21.0"></td>
                            <td class="col-2"><input style="text-align: right;" type="text" name="food" value="100"></td>
                        </tr>
                        <tr>
                            <td style="text-align: center; font-weight: bold">2</td>
                            <td style="text-align: center;"><input type="checkbox" name="tank"></td>
                            <td class="col-2"><input style="text-align: center;" type="text" name="temp" value="29.5"></td>
                            <td class="col-2"><input style="text-align: center;" type="text" name="ph" value="6.0"></td>
                            <td class="col-2"><input style="text-align: center;" type="text" name="oxy" value="22.5"></td>
                            <td class="col-2"><input style="text-align: center;" type="text" name="food" value="200"></td>
                        </tr>
                        <tr>
                            <td rowspan="2" style="text-align: center; font-weight: bold">3</td>
                            <td rowspan="2" style="text-align: center;"><input type="checkbox" name="tank"></td>
                            <td><div class="progress">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: ${(29.5-28)/(31-28)*100}%" aria-valuemin="28" aria-valuemax="31">29.5</div>
                            </div></td>
                            <td><div class="progress">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${(5.5-4.5)/(6.5-4.5)*100}%" aria-valuemin="4.5" aria-valuemax="6.5">5.5</div>
                            </div></td>
                            <td><div class="progress">
                                <div class="progress-bar bg-success" role="progressbar" style="width: ${(25.0-20.0)/(30-20)*100}%" aria-valuemin="20" aria-valuemax="30">25.0</div>
                            </div></td>
                            <td><div class="progress">
                                <div class="progress-bar bg-secondary" role="progressbar" style="width: ${(300-100)/(500-100)*100}%" aria-valuemin="100" aria-valuemax="500">300</div>
                            </div></td>
                        </tr>
                        <tr>
                            <td><input type="range" class="form-control-range" name="temp" min="28" max="31" step="0.1" value="29.5"></td>
                            <td><input type="range" class="form-control-range" name="ph" min="4.5" max="6.5" step="0.1" value="5.5"></td>
                            <td><input type="range" class="form-control-range" name="oxy" min="20.0" max="30.0" step="0.1" value="25.0"></td>
                            <td><input type="range" class="form-control-range" name="food" min="100" max="500" step="5" value="300"></td>
                        </tr>
                        <tr>
                            <td rowspan="2" style="text-align: center; font-weight: bold">4</td>
                            <td rowspan="2" style="text-align: center;"><input type="checkbox" name="tank"></td>
                            <td><div class="progress">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: ${(29.5-28)/(31-28)*100}%" aria-valuemin="28" aria-valuemax="31">29.5</div>
                            </div></td>
                            <td><div class="progress">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: ${(5.5-4.5)/(6.5-4.5)*100}%" aria-valuemin="4.5" aria-valuemax="6.5">5.5</div>
                            </div></td>
                            <td><div class="progress">
                                <div class="progress-bar bg-success" role="progressbar" style="width: ${(25.0-20.0)/(30-20)*100}%" aria-valuemin="20" aria-valuemax="30">25.0</div>
                            </div></td>
                            <td><div class="progress">
                                <div class="progress-bar bg-secondary" role="progressbar" style="width: ${(300-100)/(500-100)*100}%" aria-valuemin="100" aria-valuemax="500">300</div>
                            </div></td>
                        </tr>
                        <tr>
                            <td><input type="range" class="form-control-range" name="temp" min="28" max="31" step="0.1" value="29.5"></td>
                            <td><input type="range" class="form-control-range" name="ph" min="4.5" max="6.5" step="0.1" value="5.5"></td>
                            <td><input type="range" class="form-control-range" name="oxy" min="20.0" max="30.0" step="0.1" value="25.0"></td>
                            <td><input type="range" class="form-control-range" name="food" min="100" max="500" step="5" value="300"></td>
                        </tr>                        
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
