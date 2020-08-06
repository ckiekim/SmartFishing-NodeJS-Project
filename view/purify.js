const template = require('./common/template');
const header = template.header();

module.exports.purify = function(navBar, menuLink, result) {
	return `
<!DOCTYPE html>
<html lang="ko">
<head>
	${header}
</head>
<body>
    ${navBar}
    <div class="container">
        <div class="row" style="margin-top: 30px">
            <div class="col-2">
                ${menuLink}
            </div>
            <div class="col-10">
                <div class="row" style="margin-left: 10px">
                    <div class="col-12"><h3>정수장</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-1"></div>
                    <div class="col-8">
                        <h5>6조 실습 데이터(from Arduino)</h5>
                        <table class="table">
                        <tr><td>온도</td>
                            <td>${result.temp.toFixed(1)}</td></tr>
                        <tr><td>습도</td>
                            <td>${result.humi.toFixed(1)}</td></tr>
                        <tr><td>더스트</td>
                            <td>${result.dust.toFixed(1)}</td></tr>
                        <tr><td>열</td>
                            <td>${result.fever.toFixed(1)}</td></tr>
                        </table>
                    </div>
                    <div class="col-3"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}