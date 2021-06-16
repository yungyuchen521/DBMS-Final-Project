const express = require("express");
const app = express();
const fetch = require('node-fetch');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const url = "https://geocode.search.hereapi.com/v1/geocode?q=";
const key = "YHOY7MWY9S4G4kV1iwU7-Jm4o05wrBUPNJLYQwHxB8g";

/*
apply for new key here
https://developer.here.com/projects/PROD-4010ac1d-597c-44c6-898b-96d794ed43c5
*/

app.post("/position/post", (req, res) => {
    const _url = `${url}${req.body.address}&apiKey=${key}`;

    fetch(encodeURI(_url))
    .then(res => res.json())
    .then(json => { 
        if (json.items.length == 0) {
            console.log("invalid address");
            res.sendStatus(999);
        }
            
        else
            res.send(json.items[0].position) 
    })
    .catch(err => {
        console.log(err);
    })
});

const server = app.listen(8000, () => console.log("server running on port 8000..."));