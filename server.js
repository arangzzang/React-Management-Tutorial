const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers',(req,res) => {
    console.log("bodyValue", req.body)
    res.send([
        {
            'id':1,
            'image':'http://placeimg.com/64/64/1',
            'name':'홍정훈',
            'birthday':'961222',
            'gender':'남자',
            'job':'대학생'
        },
        {
            'id':2,
            'image':'http://placeimg.com/64/64/2',
            'name':'조현',
            'birthday':'930828',
            'gender':'남자',
            'job':'프로그래머'
        },
        {
            'id':3,
            'image':'http://placeimg.com/64/64/3',
            'name':'조쿤',
            'birthday':'120228',
            'gender':'남자',
            'job':'백수'
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));