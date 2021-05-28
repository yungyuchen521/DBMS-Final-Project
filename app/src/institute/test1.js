const fetch = require("node-fetch");

fetch("http://localhost:3000")
    .then(res => res.text())
    .then(text => console.log(text))