const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const favicon = require('express-favicon');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const logging = require('./winston-logging');
const alert = require('./view/common/alertMsg');
const template = require('./view/common/template');
const wm = require('./weather-module');
const dm = require('./db-module');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));      // 괄호안은 암호화할 때 사용되는 Key 값
const tankRouter = require('./tankRouter');
const userRouter = require('./userRouter');

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect jQuery
app.use('/chartjs', express.static(__dirname + '/node_modules/chart.js/dist')); // redirect chart.js
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/js'));
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(session({
    secret: '1q2w3e4r5t6y',     // keyboard cat
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));
app.use('/tank', tankRouter);
app.use('/user', userRouter);

app.get('/home', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        wm.getWeather(function(weather) {
            //let count = req.signedCookies.count ? parseInt(req.signedCookies.count) + 1 : 1;
            //res.cookie('count', count, {signed: true});
            //req.session.count = req.session.count ? req.session.count + 1 : 1;
            let navBar = template.navBar(true, weather, req.session.userName);
            let menuLink = template.menuLink(template.DUMMY);
            let view = require('./view/home');
            let html = view.home(navBar, menuLink);
            res.send(html);
        });
    }
});
app.get('/purify', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        axios.get('http://172.17.5.16').then(response => {
            logging.debug(`statusCode: ${response && response.status}`);
            logging.silly(JSON.stringify(response.data));
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(template.PURIFY_MENU);
                let view = require('./view/purify');
                let html = view.purify(navBar, menuLink, response.data);
                res.send(html);
            });
        }).catch(error => {
            logging.info(`${error.code}: ${error.message}`);
            let html = alert.alertMsg(error.message, '/home');
            res.send(html);
        });
    }
});
app.get('/select', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        axios.get('https://lipsum.com/2').then(response => {
            logging.debug(`statusCode: ${response && response.status}`);
            let tmp = cheerio.load(response.data);
            let text = tmp('#lipsumTextarea').text();
            text = text.replace('\n\n', '\n<br><br>\n');
            logging.silly(tmp('#lipsumTextarea').text());
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(template.SELECT_MENU);
                let view = require('./view/select');
                let html = view.select(navBar, menuLink, text);
                res.send(html);
            });
        }).catch(error => {
            logging.info(`${error.code}: ${error.message}`);
            let html = alert.alertMsg(error.message, '/home');
            res.send(html);
        });
    }
});
app.get('/food', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        axios.get('http://localhost:9000').then(response => {
            logging.debug(`statusCode: ${response && response.status}`);
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(template.FOOD_MENU);
                let view = require('./view/select');
                let html = view.select(navBar, menuLink, ' ');
                res.send(html);
            });
        }).catch(error => {
            logging.info(`${error.code}: ${error.message}`);
            let html = alert.alertMsg(error.message, '/home');
            res.send(html);
        });
    }
});

app.get('/weather', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let view = require('./view/common/weather');
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(0);
            wm.weatherObj(function(result) {
                let html = view.weather(navBar, menuLink, result);
                res.send(html);
            });
        });
    }
});

app.get('*', function(req, res) {
    res.status(404).send('File not found');
});
const port = process.env.PORT || 3000;
app.listen(port, () => logging.debug(`Listening on port ${port}...`));