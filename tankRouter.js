const express = require('express');
const dbModule = require('./db-module');
const alert = require('./view/alertMsg');
const template = require('./view/template');
const wm = require('./weather-module');

const router = express.Router();
router.get('/group/:id', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let group = parseInt(req.params.id);
        dbModule.getTanks(group, function(tankData) {
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(1);
                let view = require('./view/tankGroup');
                let html = view.tankGroup(navBar, menuLink, tankData);
                res.send(html);
            });
        });
    }
});
router.get('/setup/:id', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let group = parseInt(req.params.id);
        dbModule.getTankSeupData(function(tsData) {
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(1);
                let view = require('./view/tankSetup');
                let html = view.tankSetup(navBar, menuLink, tsData[0]);
                res.send(html);
            });
        });
    }
});
router.post('/setup', function(req, res) {
    let ts = [];
    let userId = req.session.userId;
    for (let i=0; i<req.body.id.length; i++) {
        let obj = {
            id: parseInt(req.body.id[i]),
            oper: parseInt(req.body['oper'+req.body.id[i]]),
            temp: parseFloat(req.body.temp[i]),
            ph: parseFloat(req.body.ph[i]),
            food: parseInt(req.body.food[i])
        }
        ts.push(obj);
    }
    //console.log(ts);
    let params = [userId, JSON.stringify(ts)];
    dbModule.addTankSetupData(params, function() {
        //console.log("tankSetup is inserted.")
        res.redirect("/tank/group/1");
    });
});
router.get('/oper/:id', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let group = parseInt(req.params.id);
        dbModule.getTanks(group, function(tankData) {
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(1);
                let view = require('./view/tankOper');
                let html = view.tankOper(navBar, menuLink);
                res.send(html);
            });
        });
    }
});
router.get('/sense/:id', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let tank = parseInt(req.params.id);
        dbModule.getTankSenseData(tank, function(senseData) {
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(1);
                let view = require('./view/tankSense');
                let html = view.tankSense(navBar, menuLink, tank, senseData);
                res.send(html);
            });
        });
    }
});

module.exports = router;