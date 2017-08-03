var express = require('express');
var router = express.Router();
var HashMap = require('hashmap');
var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var HashMap = require('hashmap');
var mysql = require('mysql');
var map = new HashMap();
var score;
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql12345XXX",
    database: "project"
});
connection.connect(function (err) {
    if (err) throw err;
});
/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.session.rano === undefined){
        res.redirect('/');
    }else {
        if (req.session.que === undefined) {
            var a = '{"0":"0"}';
            connection.query("update " + req.session.dep + " set questionid = '" + a + "' where mobile = '" + req.session.number + "';", function (err) {
                if (err) throw err;
            });
            res.render('fin', {
                score: 0,
                ques:req.session.qlimit

            });
            req.session.destroy();

        } else {
            function first(callback) {
                score = req.session.score;
                var abc = JSON.stringify(req.session.que);
                console.log(abc);
                var qu = Object.keys(req.session.que);
                var rn = req.session.rano;
                // console.log(rn);
                // for (var i=0;i<(req.session.qlimit-qu.length);i++){
                //     if(parseInt(qu[i])===rn[i]){
                //
                //     }
                // }
                connection.query("update " + req.session.dep + " set questionid = '" + abc + "' where mobile = '" + req.session.number + "';", function (err) {
                    if (err) throw err;
                });
                connection.query("update " + req.session.dep + " set result = '" + req.session.score + "' where mobile = '" + req.session.number + "';", function (err) {
                    if (err) throw err;
                });
                map = req.session.correctmap;
                res.render('fin', {
                    score: score,
                    ques:req.session.qlimit
                });
                callback();
            }

            first(function () {
                req.session.destroy();
            });
        }
    }
});


module.exports = router;
