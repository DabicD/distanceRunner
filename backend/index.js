const express = require('express')
const app = express();
const fs = require('fs');
let cors = require("cors");
const port = 5500;

app.use(cors());

app.post('/score', (req, res) => {
    console.log("post score");
    fs.readFile('score.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return;
        }
        console.log(data)
        console.log(req.data);
        // if(topScore < req.body){
        res.send('fine');
        // }
    })
});

app.get('/score', (req, res) => {
    console.log("get score");
    fs.readFile('score.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let topScore = data;
        console.log(topScore)
        res.send(topScore);
    });
});

app.listen(port, () => {
    console.log(`Server works on port ${port}!`)
});