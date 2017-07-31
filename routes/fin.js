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
    port:3307,
    user: "root",
    password: "mysql12345XXX",
    database:"project",
    dateStrings : 'date'
});
connection.connect(function (err) {
    if (err) throw err;
});
var num;
connection.query("select questions from user",function (err,res) {
   if (err) console.log("error encountered");
   num=res[0].questions;
});
/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.session.que===undefined){
        var a='{"0":"0"}';
        connection.query("update "+req.session.dep+" set questionid = '" + a+"' where mobile = '"+req.session.number+"';",function (err) {
            if(err) throw err;
        });

        res.render('fin', {
            score: 0,
            ques:num
        });
    }else {
        function first(callback) {
            // console.log(req.session.que);
            score=req.session.score;
            var abc=JSON.stringify(req.session.que);
            var qu = Object.keys(req.session.que);
            var rn=req.session.rano;
            // console.log(rn);
            // for (var i=0;i<(req.session.qlimit-qu.length);i++){
            //     if(parseInt(qu[i])===rn[i]){
            //
            //     }
            // }
            connection.query("update "+req.session.dep+" set questionid = '" + abc+"' where mobile = '"+req.session.number+"';",function (err) {
                if(err) throw err;
            });
            connection.query("update "+req.session.dep+" set result = '" + req.session.score+"' where mobile = '"+req.session.number+"';",function (err) {
                if(err) throw err;
            });
            map = req.session.correctmap;
            res.render('fin', {
                score: req.session.score,
                ques:num

            });
            callback();
        }
        first(function () {
            req.session.destroy();
        });
    }
});


module.exports = router;