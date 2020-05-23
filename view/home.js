const template = require('./common/template');
const header = template.header();

module.exports.home = function(navBar, menuLink) {
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
                <div class="col-12"><h3>아쿠아피쉬 상태</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <table class="table table-borderless">
                        <tr>
                            <td>
                                <div class="card" style="width: 18rem;">
                                    <img src="/images/tank.jpg" class="card-img-top" alt="수조">
                                    <div class="card-body">
                                        <h5 class="card-title">수조</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">수조 1~10</h6>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="/tank/group/1" class="card-link">Monitoring</a>
                                        <a href="#" class="card-link">Another link</a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="card" style="width: 18rem;">
                                    <img src="/images/purifier.jpg" class="card-img-top" alt="정수장">
                                    <div class="card-body">
                                        <h5 class="card-title">정수장</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">정수장</h6>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="card-link">Monitoring</a>
                                        <a href="#" class="card-link">Another link</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="card" style="width: 18rem;">
                                    <img src="/images/selector.jpg" class="card-img-top" alt="수조">
                                    <div class="card-body">
                                        <h5 class="card-title">선별장</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="card-link">Card link</a>
                                        <a href="#" class="card-link">Another link</a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="card" style="width: 18rem;">
                                    <img src="/images/feeder.jpg" class="card-img-top" alt="수조">
                                    <div class="card-body">
                                        <h5 class="card-title">사료실</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="card-link">Card link</a>
                                        <a href="#" class="card-link">Another link</a>
                                    </div>
                                </div>
                            </td>                       
                        </tr>
                    </table>
                </div>
                <div class="col-1"></div><br>
        </div>
    </div>
</div>
</body>
</html>
    `;
}
