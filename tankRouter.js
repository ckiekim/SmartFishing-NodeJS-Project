const express = require('express');
const dm = require('./db-module');
const alert = require('./view/common/alertMsg');
const template = require('./view/common/template');
const wm = require('./weather-module');

const router = express.Router();
router.get('/group/:id', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let group = parseInt(req.params.id);
        dm.getTankSeupData(function(tankSetupData) {
            dm.getTankStatus(group, function(tankStatus) {
                wm.getWeather(function(weather) {
                    let navBar = template.navBar(false, weather, req.session.userName);
                    let menuLink = template.menuLink(template.TANK_MENU);
                    //console.log(tankSetupData);
                    //console.log(tankStatus);
                    let view = require('./view/tank/tankStatus');
                    let html = view.tankStatus(navBar, menuLink, tankSetupData, tankStatus);
                    res.send(html);
                });
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
        dm.getTankSeupData(function(tsData) {
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(template.TANK_MENU);
                let view = require('./view/tank/tankSetup');
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
            fish: req.body.fish[i]
        }
        ts.push(obj);
    }
    //console.log(ts);
    let params = [userId, JSON.stringify(ts)];
    dm.addTankSetupData(params, function() {
        //console.log("tankSetup data is inserted.")
        res.redirect("/tank/group/1");
    });
});
router.get('/oper/:id', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let id = parseInt(req.params.id);
        dm.getTankSeupData(function(tankSetupData) {
            dm.getTankSenseData(id, function(tankStatus) {
                wm.getWeather(function(weather) {
                    let navBar = template.navBar(false, weather, req.session.userName);
                    let menuLink = template.menuLink(template.TANK_MENU);
                    //console.log(tankSetupData);
                    //console.log(tankStatus);
                    let view = require('./view/tank/tankOper');
                    let html = view.tankOper(navBar, menuLink, id, tankSetupData, tankStatus);
                    res.send(html);
                });
            });
        });
    }
});
router.get('/sense/:id', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let id = parseInt(req.params.id);
        dm.getTankSeupData(function(tankSetupData) {
            dm.getTankSenseData(id, function(senseData) {
                wm.getWeather(function(weather) {
                    let navBar = template.navBar(false, weather, req.session.userName);
                    let menuLink = template.menuLink(template.TANK_MENU);
                    let view = require('./view/tank/tankSense');
                    let html = view.tankSense(navBar, menuLink, id, tankSetupData, senseData);
                    res.send(html);
                });
            });
        });
    }
});

module.exports = router;