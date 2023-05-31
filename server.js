const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");
const express = require("express");
const app = express();

//cards are organized into objects
const cards = {
    1:{
        "color": "blue"
    },
    2:{
        "color": "red"
    },
    3:{
        "color": "yellow"
    },
    4:{
        "color": "violet"
    },
    5:{
        "color": "black"
    },
    6:{
        "color": "orange"
    },
    7:{
        "color": "pink"
    },
    8:{
        "color": "pink"
    },
    9:{
        "color": "orange"
    },
    10:{
        "color": "black"
    },
    11:{
        "color": "violet"
    },
    12:{
        "color": "red"
    },
    13:{
        "color": "blue"
    },
    14:{
        "color": "yellow"
    },
    15:{
        "color": "white"
    },
    16:{
        "color": "white"
    }
}

const server = http.createServer((req,res)=>{
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);

    if(page=="/"){
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
          });
    }else if (page == '/css/style.css'){
        fs.readFile('css/style.css', function(err, data) {
          res.write(data);
          res.end();
        });
      }else if (page == '/js/main.js'){
        fs.readFile('js/main.js', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/javascript'});
          res.write(data);
          res.end();
        });

}
})

//setiing up a url parameter for api
app.get("/api/cards", (req,res)=>{
    res.json(cards);
})

app.listen(8000, () => {
    console.log(`Server running on port 8000`)
})