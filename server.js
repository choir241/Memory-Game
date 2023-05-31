const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


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
};


app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/index.html')
});

//setiing up a url parameter for api
app.get("/api/cards", (req,res)=>{
    res.json(cards);
});

//server port
app.listen(8000, () => {
    console.log(`Server running on port 8000`)
});
