const express = require('express')
const app = express();
const fs = require('fs');
let cors = require("cors");
const port = 5500;

app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/score', (req, res) => {
    console.log("post score");
    fs.readFile('score.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return;
        }
        if(Number(data) < Number(req.body.score)){
            fs.writeFile('score.txt', req.body.score, err => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
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