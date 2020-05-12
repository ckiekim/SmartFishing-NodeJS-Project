const template = require('./template');
const header = template.header();

module.exports.tankOper = function(navBar, menuLink) {
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
                <div class="col-12"><h3>수조 작동</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <h5>측정 시각: </h5>
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
