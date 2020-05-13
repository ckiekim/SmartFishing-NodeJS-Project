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
                let menuLink = template.menuLink(0);
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
        dbModule.getTanks(group, function(tankData) {
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(0);
                let view = require('./view/tankSetup');
                let html = view.tankSetup(navBar, menuLink);
                res.send(html);
            });
        });
    }
});
router.post('/setup', function(req, res) {
    console.log(req.body.group);
    console.log(req.body.tank);
    console.log(req.body.ph);
    res.redirect("/tank/group/1");
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
                let menuLink = template.menuLink(0);
                let view = require('./view/tankOper');
                let html = view.tankOper(navBar, menuLink);
                res.send(html);
            });
        });
    }
});

module.exports = router;