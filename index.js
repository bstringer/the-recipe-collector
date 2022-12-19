// to run program: >npm run start
// Program created by Blair Stringer

const PORT = 8000;
const express = require('express');
const path = require('path');
const node_lib = require("./node_lib");
var fs = require('fs');

const app = express();
// const url = 'https://www.allrecipes.com/recipe/16354/easy-meatloaf/';
const url = 'https://www.allrecipes.com/recipe/220125/slow-cooker-beef-pot-roast/';

console.log("STARTING APP \n");


//****************************************************************************** */
// IF not wanting to use a webpage than uncomment this and use terminal for functions.

// node_lib.ingredient_info(url, function(returnValue){
//     console.log("\n\n Callback DONE PROG")
// });
//****************************************************************************** */

app.get('/static/js/recipe_collector.js', function (req, res) {
    console.log("add.get to js file path Blair..");
    res.sendFile(path.join(__dirname, '/static/js/recipe_collector.js'));
  });

app.get("/", (req, res) => {
    console.log("Access through browser");
    res.sendFile("./templates/homepage.html", { root: __dirname });
});

// GET https://example.com/results/123
app.get('/results/:id', function(req, res, next){
    console.log(req.params.id); // "123"
});

app.post('/ajax_test', function (req, res) {
    node_lib.ingredient_info(url, function(returnValue){
        console.log("in main code return value: ", returnValue);
        res.json(returnValue);
    });
});

app.listen(PORT, () => console.log('server running on PORT', PORT) );
