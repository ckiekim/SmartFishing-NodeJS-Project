const template = require('./common/template');
const header = template.header();

module.exports.select = function(navBar, menuLink, result) {
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
                    <div class="col-12"><h3>선별장</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-1"></div>
                    <div class="col-8">
                        <h5>Lorem Ipsum 사이트로부터 받은 데이터</h5>
                        <p>${result}</p>
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