const dm = require('./db-module.js');

const createDeptSql = `
    CREATE TABLE IF NOT EXISTS dept (
        did INTEGER NOT NULL PRIMARY KEY,
        name VARCHAR(20) NOT NULL)
`;
const createUserSql = `
    CREATE TABLE user (
        uid VARCHAR(12) PRIMARY KEY,
        password VARCHAR(80) NOT NULL,
        name VARCHAR(20) NOT NULL,
        deptId INTEGER NOT NULL,
        tel VARCHAR(20),
        regDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(deptId) REFERENCES dept(did))
`;
/*const createActuatorSql = `
    CREATE TABLE actuator (
        aid INTEGER PRIMARY KEY AUTOINCREMENT,
        redLED INTEGER DEFAULT 200,
        greenLED INTEGER DEFAULT 128,
        blueLED INTEGER DEFAULT 80,
        relay INTEGER DEFAULT 0,
        actionTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        reason TEXT,
        uid TEXT NOT NULL,
        FOREIGN KEY(uid) REFERENCES user(uid))
`;
const createSensorSql = `
    CREATE TABLE sensor (
        sid INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature INTEGER DEFAULT 20,
        humidity INTEGER DEFAULT 25,
        cds INTEGER DEFAULT 50,
        distance REAL DEFAULT 10.1,
        sensingTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        uid TEXT NOT NULL,
        FOREIGN KEY(uid) REFERENCES user(uid))
`;*/
const insertDeptSql = "INSERT INTO dept VALUES(?, ?)";
const insertUserSql = "INSERT INTO user(uid, password, name, deptId, tel) VALUES('admin', '1234', '관리자', 101, '010-2345-6789')";
const selectDeptSql = "SELECT * FROM dept";
//const insertActuatorSql = "INSERT INTO actuator(reason, uid) VALUES('초기값', 'admin')";
//const insertSensorSql = "INSERT INTO sensor(uid) VALUES('admin')";
const records = [
    {did: 101, name: '경영지원팀'},
    {did: 102, name: '영업팀'},
    {did: 103, name: '생산팀'},
    {did: 104, name: '연구개발팀'}
];

dm.executeQuery(createDeptSql, function() {
    console.log("Dept Table is created");
    for (let record of records) {
        let params = [record.did, record.name];
        dm.executeQueryWithParams(insertDeptSql, params, function() {

        });
    }
});

```
{
    "host": "localhost",
    "user": "smart",
    "password": "factory",
    "port": 3306,
    "database": "test"
}
```