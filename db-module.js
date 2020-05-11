const fs = require('fs');
const mysql = require('mysql');
const data = fs.readFileSync(__dirname + '/public/mysqlConf.json');
const conf = JSON.parse(data);

module.exports = {
    getConnection:     function() {
        const connection = mysql.createConnection({
            host: conf.host,
            user: conf.user,
            password: conf.password,
            port: conf.port,
            database: conf.database
        });
        connection.connect(function(err) {
            if (err) {
                console.log('mysql connection error :' + err);
            } else {
                //console.log('mysql is connected successfully.');
            }
        });
        return connection;
    },
    getCustomerById:    function(id, callback) {
        const conn = this.getConnection();
        const sql = 'select * from customer where id = ?';   // DATE_FORMAT(createdDate, '%Y-%m-%d %T')

        conn.query(sql, id, function(err, row, fields) {
            if (err)
                console.log(err);
            else
                callback(row);
        });
        conn.end();
    },
    getCustomers:  function(callback) {
        const conn = this.getConnection();
        //const sql = 'select * from customer where isDeleted = 0';   // DATE_FORMAT(createdDate, '%Y-%m-%d %T')
        const sql = `select id, image, name, birthday, gender, job, DATE_FORMAT(createdDate, '%Y-%m-%d %T') as dt from customer where isDeleted = 0`;

        conn.query(sql, function(err, rows, fields) {
            if (err)
                console.log(err);
            else
                callback(rows);
        });
        conn.end();
    },
    addCustomer:    function(params, callback) {
        const conn = this.getConnection();
        const sql = 'insert into customer(image, name, birthday, gender, job) values (?, ?, ?, ?, ?)';

        conn.query(sql, params, function(err, result) {
            if (err)
                console.log(err);
            else {
                //console.log('addCustomer(),', result);
                callback();
            }
        });
        conn.end();
    },
    deleteCustomer: function(id, callback) {
        const conn = this.getConnection();
        const sql = 'update customer set isDeleted=1 where id = ?';

        conn.query(sql, id, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    },
    updateCustomer: function(params, callback) {
        const conn = this.getConnection();
        const sql = 'update customer set image=?, name=?, birthday=?, gender=?, job=? where id = ?';

        conn.query(sql, params, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    },

    executeQuery: function(sql, callback) {
        const conn = this.getConnection();
        conn.query(sql, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    },
    executeQueryWithParams: function(sql, params, callback) {
        const conn = this.getConnection();
        conn.query(sql, params, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    }
}