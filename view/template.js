module.exports = {
    DUMMY: 0,
    TANK_MENU: 1,
    PURIFY_MENU: 2,
    SELECT_MENU: 3,
    FOOD_MENU: 4,
    USER_MENU: 5,
    GALLERY_MENU: 6,
    navBar: function(isHome, weather, userName) {
        let homeLink = isHome ? `<a class="nav-link active" href="#">Home</a>`: `<a class="nav-link" href="/home">Home</a>`;
        return `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <img src="/images/greenlogo.png" class="d-inline-block align-top" alt="">&nbsp;&nbsp;&nbsp;
                <ul class="nav nav-pills mr-auto">
                    <li class="nav-item">
                        ${homeLink}
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user/logout">로그아웃</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">${userName}님</a>
                    </li>
                </ul>
                <div class="navbar-text">
                    ${weather}
                </div>
            </nav>
        `;
    },
    menuLink: function(menu) {
        let tankLink = `<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
        let purifyLink = `<a class="nav-link" href="#">정수장</a>`;
        let selectLink = `<a class="nav-link" href="/select">선별장</a>`;
        let foodLink = `<a class="nav-link" href="/food">사료실</a>`;
        let userLink = `<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
        let galleryLink = `<a class="nav-link" href="#">갤러리</a>`;
        switch(menu) {
            case this.TANK_MENU:     // 수조 메뉴를 눌렀을 경우
                tankLink = `<a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
                break;
            case this.PURIFY_MENU:     // 정수장 메뉴를 눌렀을 경우
                purifyLink = `<a class="nav-link active" href="#">정수장</a>`;
                break;
            case this.SELECT_MENU:     // 선별장 메뉴를 눌렀을 경우
                selectLink = `<a class="nav-link active" href="#">선별장</a>`;
                break;
            case this.FOOD_MENU:     // 사료실 메뉴를 눌렀을 경우
                foodLink = `<a class="nav-link active" href="#">사료실</a>`;
                break;
            case this.USER_MENU:     // User 메뉴를 눌렀을 경우
                userLink = `<a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
                break;
            case this.GALLERY_MENU:     // Gallery 메뉴를 눌렸을 경우
                galleryLink = `<a class="nav-link active" href="#">갤러리</a>`;
                break;
            default:
                break;
        }
        return `
            <ul class="nav nav-pills flex-column">
                <li class="nav-item dropdown">
                    ${tankLink}
                        수조
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/tank/group/1">모니터링</a>
                        <a class="dropdown-item" href="/tank/setup/1">설정</a>
                        <a class="dropdown-item" href="/tank/oper/1">작동</a>
                        <a class="dropdown-item" href="/tank/sense/1">센싱 그래프</a>
                    </div>
                </li>
                <li class="nav-item">
                    ${purifyLink}
                </li>
                <li class="nav-item">
                    ${selectLink}
                </li>
                <li class="nav-item">
                    ${foodLink}
                </li>
                <li class="nav-item dropdown">
                    ${userLink}
                        사용자
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/user/register">등록(C)</a>
                        <a class="dropdown-item" href="/user/list/page/1">조회(R)</a>
                    </div>
                </li>
                <li class="nav-item">
                    ${galleryLink}
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"></a>
                </li>
            </ul>
        `;
    },
    weather: function(temp, humid, ico) {
        return `
            <a href='/weather'><button type="button" class="btn btn-secondary btn-sm">날씨</button></a>&nbsp;
            <img src="${ico}" width="32" height="32">&nbsp;
            기온: ${temp}&#8451;, 습도: ${humid}% &nbsp;&nbsp;&nbsp;
        `;
    },
    header: function() {
        return `
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <!-- ==================================================================== -->
            <title>강남 아쿠아피쉬</title>
            <link rel="stylesheet" href="/css/bootstrap.min.css">
            <script src="/fontawesome/all.min.js"></script>
            <script src="/jquery/jquery.min.js"></script>
            <script src="/js/bootstrap.bundle.min.js"></script>
        `;
    }
}
