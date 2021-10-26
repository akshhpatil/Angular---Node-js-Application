const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// Connection mysql

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_info_express',
    port: 3306
})

// check database

db.connect(err => {
    if (err) { console.log(err) }
    console.log("Database Connected....")
})


//get all data 

app.get('/users', (req, res) => {
    let qrr = 'SELECT * FROM users';
    db.query(qrr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'All users Data',
                data: result
            });
        }
    });
});

//get single user by id

app.get('/users/:id',(req,res)=>{
    // console.log(req.params.id);
    let qrid = req.params.id;
    console.log(qrid);

    let qr = `SELECT * FROM users WHERE id = ${qrid}`
    db.query(qr,(err,result)=>{ 
        
        if(err){
            console.log(err);
        }if(result.length > 0){
            res.send({
                message:"get data by id",
                data:result
            })
        }else{
            res.send({
                message:"Data not found",
            
            })
        }
    })    

})


//Post data

app.post('/user',(req,res)=>{
    // console.log("post data success")
    //console.log(req.body,'post data success')
   let fullName = req.body.fullname;
   let eMail = req.body.email;
   let Mobile = req.body.mobile;
   let Address = req.body.address;
   let Education = req.body.education;
   let Country = req.body.country;
   let State = req.body.state;
   let qr = `insert into users (fullname,email,mobile,address,education,country,state) 
   value('${fullName}','${eMail}','${Mobile}','${Address}','${Education}','${Country}','${State}')`;
   db.query(qr,(err,result)=>{
       if(err){console.log(err)}
       res.send({
           message:"Student Details Added successfully",
           data:result
       })
   })
})

//update

app.put('/user/:id',(req,res)=>{
    // console.log(req.body,"update data");
    let uID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let Mobile = req.body.mobile;
    let Address = req.body.address;
    let Education = req.body.education;
    let Country = req.body.country;
    let State = req.body.state;
    
    let qr = `update users set fullname = '${fullName}' , 
    email = '${eMail}' , mobile = '${Mobile}' ,address = '${Address}', 
    education='${Education}', country = '${Country}' , state='${State} ' Where id = ${uID}`
    db.query(qr,(err,result)=>{
        if(err){console.log(err)}
        res.send({
            message:"Student Details update successfully",
            data:result
        })

    })
})


//dalete data

app.delete('/user/:id',(req,res)=>{

    let uId = req.params.id;
    let qr = `delete from users where id = ${uId} `;
    db.query(qr,(err,result)=>{
        if(err){console.log(err)}
        res.send({
            message:"Student Details Delete successfully",
            data:result
        })

    })


})


app.listen(3000, () => {
    console.log("hey akshay server is running on 3000 port");
})




