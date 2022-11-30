// to run program: >npm run start
// Program created by Blair Stringer

const PORT = 8000;
const express = require('express');
const path = require('path');
const node_lib = require("./node_lib");
var fs = require('fs');

const app = express();
const url = 'https://www.allrecipes.com/recipe/16354/easy-meatloaf/';

console.log("STARTING APP \n");

app.use(logger);

node_lib.ingredient_info(url, function(returnValue){
    console.log("\n\n Callback DONE PROG")
});

app.get('/static/js/recipe_collector.js', function (req, res) {
    console.log("add.get to js file path Blair..");
    res.sendFile(path.join(__dirname, '/static/js/recipe_collector.js'));
  });

app.get("/", (req, res) => {
    console.log("Access through browser");
    node_lib.ingredient_info(url, function(returnValue){
        console.log("in main code return value: ", returnValue);
        // res.send(returnValue);
        var html = fs.readFileSync('./templates/homepage.html', 'utf8');
        res.send(html);
    });
});

app.get('/results/:id', function(req, res, next){
    res.render('test', {output: req.params.id});
});

app.get("/recepie_types", (req, res) => {
    console.log("New recipy types html page");
});

function logger(req, res, next){
    console.log("log");
    next();
};


app.listen(PORT, () => console.log('server running on PORT', PORT) );
