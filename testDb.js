const dm = require('./db-module.js');
/*
dm.getUserCount((count) => {
    console.log(count[0].count);
});
dm.getUserInfo('admin', user => {
    console.log(user[0]);
}); 
dm.getUserInfo('kim', user => {
    console.log(user[0]);
});
let params = ['sales', '1234', '김영업', 102, '010-2345-6789'];
dm.registerUser(params, () => {
    dm.getUsers(1, rows => {
        console.log(rows);
    });
});
dm.getAllDepts(depts => {
    let options = '';
    for (let deptItem of depts) {
        options += `<option value="${deptItem.did}">${deptItem.name}</option>`;
    }
    console.log(options);
});

let params = ['1234', '강영업', 102, '010-3456-7890', 'sales'];
dm.updateUser(params, () => {
    dm.getUsers(1, rows => {
        console.log(rows);
    });
});
*/
dm.getBeforeUserCount('sales', count => {
    console.log(count[0].count);
})