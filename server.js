const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest : './upload'})

//java로치면 해당 구문은 controller의 역할
app.get('/api/customers',(req,res) => { // 해당 경로로 이동을 하면 하나의 메세지를 사용자에게 출력할수있도록 처리해줌.
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err,rows,fields) => {
            res.send(rows);
        }
    )
});

app.use('/image',express.static('./upload'));

app.post('/api/customers',upload.single('image'), (req,res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    console.log(name);
    console.log(birthday);
    console.log(gender);
    console.log(job);
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params,
        (err,rows,fields) => {
            res.send(rows);
            console.log(err);
        }
    );
})

app.listen(port, () => console.log(`Listening on port ${port}`));//실제로 app을 실행시키기위해서 5000port로 동작시키고 서버가 동작중이면 동작중이라고 표시하게해줌
//`Listening on port ${port}` 이구문의 따옴표는 숫자1의 왼쪽에있는 ~표시의 따옴표를 사용해야 변수로서 사용할수 있다고 말함.