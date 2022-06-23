const mysql = require('mysql2');
const express = require('express');
const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
	port:3306
});
app.use(express.static('htmlfile'))
app.get('/bookdata',(req,res)=>{
    let input1=req.query.bid;
    let input2=req.query.bname;
    let input3=req.query.bcost;
    let output={status:false,result:{}}
    connection.query('insert into bookinfo(bookid,bookname,bookcost) values(?,?,?)',
    [input1,input2,input3],(err,rows)=>{
        if(err){
            console.log('error at server side')
        }else{
            if(rows.affectedRows>0){
                console.log('inserted successful');
                output.status=true;
                output.result=rows;
                console.log(rows);
            }else{console.log('not inserted')}
        }res.send(output)

    })

})
app.listen(8081,console.log('running'));