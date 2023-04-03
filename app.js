const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    let today = new Date();
    // let currentDay = today.getDay();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render('list', { listTitle: day, newListItems: items });
});

app.post('/', (req, res) => {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect('/Work');
    }
    else {
        // newItem is the name of input used in form in list.ejs
        items.push(item);
        res.redirect('/');
    }

});

app.get('/Work', (req, res) => {
    res.render('list', { listTitle: 'Work List', newListItems: workItems })
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.post('/Work', (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/Work');
});

app.listen(3000, () => {
    console.log('listening to port 3000');

});