const express = require("express");
const app = express();

app.get("/", (req, res) => {
	const mysql = require('mysql');

	const db = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: ***REMOVED***,
		database: "final_project"
	});

	db.connect(err => {
		if (err) throw err;
		console.log("Connected!");
	});

	db.query('SELECT * FROM registration_agency limit 3', (err,rows) => {
		if(err) throw err;

		//res.writeHead(200, {'Content-Type': 'text/plain'});
		res.send(rows);
		console.log(rows);
   });
});

const server = app.listen(3000, () => {
	console.log("server running...");
})

/*
const server = http.createServer((req, res) => {
	// Set a response type of plain text for the response
	res.writeHead(200, {'Content-Type': 'text/plain'});

	// Send back a response and end the connection
	res.end(data);
});

// Start the server on port 3000
server.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');

//db.destroy();*/