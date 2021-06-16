const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mysql = require('mysql');

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "********", // your password
	database: "final_project" // your DB name
});

db.connect(err => { if (err) throw err });

app.get("/institutes/", (req, res) => {
	req.body.queryType = "GET";
	req.body.tableName = "registration_agency";

	db.query(getQuery(req.body), (err,rows) => {
		if(err) throw err;
		res.send(rows);
	});
});

app.get("/adopt/", (req, res) => {
	req.body.queryType = "GET";
	req.body.tableName = "adopt_animal";

	db.query(getQuery(req.body), (err,rows) => {
		if(err) throw err;
		res.send(rows);
   });
});

app.get("/shelters/", (req, res) => {
	req.body.queryType = "GET";
	req.body.tableName = "shelter";

	db.query(getQuery(req.body), (err,rows) => {
		if(err) throw err;
		res.send(rows);
   });
});

app.get("/lost/", (req, res) => {
	req.body.queryType = "GET";
	req.body.tableName = "lost_pet";

	db.query(getQuery(req.body), (err,rows) => {
		if(err) throw err;
		res.send(rows);
   });
});

app.post("/institutes/post", (req, res) => {
	db.query(getQuery(req.body), (err, rows) => {
		if(err) throw err;
		res.send(rows);
   });
});

app.post("/adopt/post", (req, res) => {
	db.query(getQuery(req.body), (err, rows) => {
		if(err) throw err;
		res.send(rows);
   });
});

app.post("/lost/post", (req, res) => {
	if (req.body.queryType == "INSERT") {
		db.query(`SELECT * FROM ${req.body.tableName} WHERE chip_id = ${req.body.id}`, (err, rows) => {
			if (rows.length != 0)
				res.sendStatus(999);

			else {
				db.query(getQuery(req.body), (e, r) => {
					if(e) throw e;
					res.send(r);
				});
			}
		})
	}

	else {
		db.query(getQuery(req.body), (err, rows) => {
			if(err) throw err;
			res.send(rows);
		});
	}
});

app.post("/owner/post", (req, res) => {
	if (req.body.queryType == "DELETE") {
		const query = `DELETE FROM lost_pet\nWHERE owner_id = ${req.body.id};`;

		db.query(query, (err, rows) => {
			if (err) throw err;
		});

		console.log(query);
	}

	
	db.query(getQuery(req.body), (err, rows) => {
		if(err) throw err;
	
		if (req.body.queryType == "INSERT") {
			db.query("SELECT MAX(id) AS id FROM owner;", (err, id) => {
				if(err) throw err;
				res.send(id);
			})
		}
	
		else
			res.send(rows);
	});
});

app.post("/shelters/post", (req, res) => {	
	if (req.body.queryType == "DELETE") {
		const query = `DELETE FROM adopt_animal\nWHERE animal_shelter_pkid = ${req.body.id};`;

		db.query(query, (err, rows) => {
			if (err) throw err;
		});

		console.log(query);
	}

	db.query(getQuery(req.body), (err, rows) => {
		if(err) throw err;

		if (req.body.queryType == "INSERT") {
			db.query("SELECT MAX(id) AS id FROM shelter;", (err, id) => {
				if(err) throw err;
				res.send(id);
			})
		}

		else
			res.send(rows);
   });
});

const server = app.listen(3000, () => console.log("server running on port 3000..."));

const getQuery = reqBody => {
	var query = "";

	if (reqBody.queryType == "GET") {
		if (reqBody.tableName == "lost_pet")
			query = `SELECT *\nFROM ${reqBody.tableName} AS P, owner AS O\nWHERE P.owner_id = O.id\nLIMIT 50;`;

		else if (reqBody.tableName == "adopt_animal")
			query = `SELECT *\nFROM ${reqBody.tableName} AS A, shelter AS S\nWHERE A.animal_shelter_pkid = S.id\nORDER BY animal_id DESC\nLIMIT 50;`;

		else 
			query = `SELECT *\nFROM ${reqBody.tableName}\nLIMIT 50;`;
	}

	else if ((reqBody.queryType == "FILTER" || reqBody.queryType == "SORT") && reqBody.tableName == "registration_agency") {
		var where = false;

		if (reqBody.queryType == "FILTER")
			query = `SELECT *\nFROM ${reqBody.tableName}`;

		else if (reqBody.queryType == "SORT") {
			where = true;

			query = `SELECT agency_id, agency_name, agency_address, contact_person, phone_number, email, 2 * PI() * 6371.3 / 360 * SQRT(POW((${reqBody.lat} - lat), 2) + POW((${reqBody.lng} - lng), 2)) AS distance\nFROM ${reqBody.tableName}\nWHERE lat IS NOT NULL AND lng is NOT NULL`;
		}
		

		if (reqBody.address) {
			const addressPattern = `%${reqBody.address}%`;
			query = `${query}\nWHERE agency_address LIKE '${addressPattern}'`;
			where = true;
		}

		if (reqBody.name) {
			const namePattern = `%${reqBody.name}%`;
			query = `${query}${where ? " AND\n" : "\nWHERE"} agency_name LIKE '${namePattern}'`;
			where = true;
		}

		if (reqBody.region && reqBody.region != "無") {
			const regionPattern = `${reqBody.region}%`;
			query = `${query}${where ? " AND\n" : "\nWHERE"} agency_address LIKE '${regionPattern}'`;
			where = true;
		}

		if (reqBody.queryType == "SORT") {
			query = `${query}\nORDER BY distance ASC`;
		}

		query = query.concat("\nLIMIT 50;");
	}

	else if (reqBody.queryType == "FILTER" && reqBody.tableName == "adopt_animal") {
		query = `SELECT *\nFROM ${reqBody.tableName} AS A, shelter AS S\nWHERE A.animal_shelter_pkid = S.id`;

		

		if (reqBody.kind != "無") {
			if (reqBody.kind == "其他")
				query = `${query} AND\n A.animal_kind NOT IN ("貓", "狗")`;

			else
				query = `${query} AND\n A.animal_kind = '${reqBody.kind}'`;
		}

		if (reqBody.size != "無")
			query = `${query} AND\n A.animal_bodytype = '${reqBody.size}'`;

		if (reqBody.sex != "無")
			query = `${query} AND\n A.animal_sex = '${reqBody.sex}'`;

		if (reqBody.color) {
			const colorPattern = `%${reqBody.color}%`;
			query = `${query} AND\n A.animal_colour LIKE '${colorPattern}'`;
		}

		if (reqBody.type && reqBody.age != "無") 
			query = `${query} AND\n A.animal_age = ${reqBody.age}`;
		

		if (reqBody.sterilization && reqBody.sterilization != "無")
			query = `${query} AND\n A.animal_sterilization = ${reqBody.sterilization}`;

		if (reqBody.bacterin && reqBody.bacterin != "無")
			query = `${query} AND\n A.animal_age = ${reqBody.bacterin}`;

		if (reqBody.adopt && reqBody.adopt != "無")
			query = `${query} AND\n A.animal_status ${reqBody.adopt == "是" ? '=' : '!='} 'OPEN'`;

		query = `${query}\nORDER BY animal_id DESC`;

		query = `${query}\nLIMIT 50;`;
	}

	else if (reqBody.queryType == "FILTER" && reqBody.tableName == "shelter") {
		query = `SELECT *\nFROM ${reqBody.tableName}`;
		var where = false;

		if (reqBody.address) {
			const addressPattern = `%${reqBody.address}%`;
			query = `${query}\nWHERE address LIKE '${addressPattern}'`;
			where = true;
		}

		if (reqBody.name) {
			const namePattern = `%${reqBody.name}%`;
			query = `${query}${where ? " AND\n" : "\nWHERE"} shelter_name LIKE '${namePattern}'`;
			where = true;
		}

		if (reqBody.region != "無") {
			const regionPattern = `${reqBody.region}%`;
			query = `${query}${where ? " AND\n" : "\nWHERE"} address LIKE '${regionPattern}'`;
			where = true;
		}

		if (reqBody.needHelp != "無") {
			const needHelp = (reqBody.needHelp == "是") ? 1 : 0;
			query = `${query}${where ? " AND\n" : "\nWHERE"} need_help = ${needHelp}`;
			where = true;
		}

		if (reqBody.canHelp != "無") {
			const canHelp = (reqBody.canHelp == "是") ? 1 : 0;
			query = `${query}${where ? " AND\n" : "\nWHERE"} can_help = ${canHelp}`;
			where = true;
		}

		if (reqBody.sort)
			query = `${query}\nORDER BY max_shelter - num_shelter DESC;`
	}

	else if (reqBody.queryType == "FILTER" && reqBody.tableName == "lost_pet") {
		var where = false;

		query = `SELECT *\nFROM ${reqBody.tableName}`;

		if (reqBody.chip_id) {
			query = `${query}\nWHERE chip_id = '${reqBody.chip_id}'`;
			where = true;
		}

		else {
			if (reqBody.type != "無") {
				if (reqBody.type == "其他")
					query = `${query}${where ? " AND\n" : "\nWHERE"} type NOT IN ("貓", "狗")`;

				else
					query = `${query}${where ? " AND\n" : "\nWHERE"} type = '${reqBody.type}'`;

				where = true;
			}

			if (reqBody.breed) {
				const breedPattern = `%${reqBody.breed}%`;
				query = `${query}${where ? " AND\n" : "\nWHERE"} breed LIKE '${breedPattern}'`;
				where = true;
			}

			if (reqBody.sex != "無") {
				query = `${query}${where ? " AND\n" : "\nWHERE"} sex = '${reqBody.sex}'`;
				where = true;
			}

			if (reqBody.color) {
				const colorPattern = `%${reqBody.color}%`;
				query = `${query}${where ? " AND\n" : "\nWHERE"} color LIKE '${colorPattern}'`;
				where = true;
			}
		}
	}

	else if (reqBody.queryType == "INSERT")
		query = `INSERT INTO ${reqBody.tableName} ${reqBody.columns}\nVALUES ${reqBody.values};`;

	else if (reqBody.queryType == "DELETE")
		query = `DELETE FROM ${reqBody.tableName}\n${wherePK(reqBody.tableName, reqBody.id)};`;

	else if (reqBody.queryType == "UPDATE") {
		query = `UPDATE ${reqBody.tableName}\nSET`;

		for (var i = 0; i < reqBody.columns.length; i++) {
			if (reqBody.tableName == "shelter" && (reqBody.columns[i] == "can_help" || reqBody.columns[i] == "need_help"))
				query = `${query} ${reqBody.columns[i]} = ${reqBody.values[i]}${(i == reqBody.columns.length - 1) ? "" : ", "}`;

			else
				query = `${query} ${reqBody.columns[i]} = '${reqBody.values[i]}'${(i == reqBody.columns.length - 1) ? "" : ", "}`;
		}

		query = `${query}\n${wherePK(reqBody.tableName, reqBody.id)};`;
	}

	else if (reqBody.queryType == "SEARCH")
		query = `SELECT *\nFROM ${reqBody.tableName}\n${wherePK(reqBody.tableName, reqBody.id)};`;

	else if (reqBody.queryType == "JOIN_SEARCH" && reqBody.table1 == "owner" && reqBody.table2 == "lost_pet")
		query = `SELECT *\nFROM ${reqBody.table2}\nWHERE owner_id = ${reqBody.owner_id};`;
	
	else if (reqBody.queryType == "JOIN_SEARCH" && reqBody.table1 == "shelter" && reqBody.table2 == "adopt_animal")
		query = `SELECT *\nFROM ${reqBody.table2}\nWHERE animal_shelter_pkid = ${reqBody.shelter_id}\nLIMIT 10;`;
	
	//query = `SELECT *\nFROM ${reqBody.table1} AS S, ${reqBody.table2} AS A\nWHERE S.id = A.animal_shelter_pkid AND S.id = ${reqBody.shelter_id} LIMIT 10;`;

	else
		query = `SELECT *\nFROM ${reqBody.tableName}\nLIMIT 5;`;
	
	console.log(`\n${query}\n`);
	return query;
}

wherePK = (table, id) => {
	switch (table) {
		case "registration_agency":
			return `WHERE agency_id = ${id}`;
		case "shelter":
		case "owner":
			return `WHERE id = ${id}`;	
		case "lost_pet":
			return `WHERE chip_id = '${id}'`;	
		case "adopt_animal":
			return `WHERE animal_id = ${id}`;	
		default:
			return `WHERE id = ${id}`;		
	}
}