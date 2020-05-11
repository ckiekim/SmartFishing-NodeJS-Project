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

const insertDeptSql = "INSERT INTO dept VALUES(?, ?)";
const insertUserSql = `INSERT INTO user(uid, password, name, deptId, tel) VALUES('admin', '1234', '관리자', 101, '010-2345-6789')`;

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
            console.log("dept record inserted");
        });
    }
});

dm.executeQuery(createUserSql, function() {
    console.log("User Table is created");
    dm.executeQuery(insertUserSql, function() {
        console.log("user record inserted");
    });
});

