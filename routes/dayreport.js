var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql12345XXX",
    database: "project",
    dateStrings: 'date'
});
con.connect(function (err) {
    if (err) throw err;

});

var date;
var dateto;
var sql = "";
var dept;
router.post('/rep', function (req, res) {
    date = req.body.seldate;
    dateto = req.body.seldateto;
    dept = req.body.seldep;
    console.log(date);
    console.log(dateto);
    console.log(dept);
    var nn = [], nm = [], ne = [], nr = [], nd = [], c, nq = [], nee = [], na = [], nj = [], nse = [], nsp = [],
        nk = [];
    var sql = "select * from " + dept + " where date between '" + date + " 00:00:00' AND '" + dateto + " 23:59:59' ";
    con.query(sql, function (err, result) {
        if (err) console.log("error");
        console.log("=--------------------------------------------------------------------------------------------------");
        console.log(result);

        c = result.length;

        for (var i = 0; i < c; i++) {
            nd[i] = result[i].date;
            nn[i] = result[i].name;
            nm[i] = result[i].mobile;
            ne[i] = result[i].email;
            nr[i] = result[i].result;
            nee[i] = result[i].experience;
            na[i] = result[i].age;
            nq[i] = result[i].qualifications;
            nk[i] = result[i].knc;
            nj[i] = result[i].job;
            nse[i] = result[i].salarye;
            nsp[i] = result[i].salaryp;
        }
        res.render('dayreport', {
            c: c,
            date: date,
            date2: dateto,
            ndate: nd,
            name: nn,
            email: ne,
            mobile: nm,
            age: na,
            experience: nee,
            qualifications: nq,
            job: nj,
            knc: nk,
            salarye: nse,
            salaryp: nsp,
            resu: nr
        });


    });


});

module.exports = router;
