const col_names = ["", "名稱", "地址", "聯絡人", "電話", "email", "距離 (km)"];
const getUrl = "http://localhost:3000/institutes/";
const postUrl = "http://localhost:3000/institutes/post";
const positionUrl = "http://localhost:8000/position/post";
const tableName = "registration_agency";

buildTable = institutes => {
	const table = document.getElementById("institutes-table");
	table.innerHTML = "";

	const thead = document.createElement("thead");
	const tr_head = document.createElement("tr");

	for (var i = 0; i < col_names.length; i++) {
		const col = document.createElement("th");
		const col_name = document.createTextNode(col_names[i]);
		col.appendChild(col_name);

		tr_head.appendChild(col);
	}
	thead.appendChild(tr_head);

	const tbody = document.createElement("tbody");

	for (var i = 0; i < institutes.length; i++) {
		const tr = document.createElement("tr");
		tr.setAttribute("id", `tr${institutes[i].agency_id}`);

		const td0 = document.createElement("td");
		
		const delButton = document.createElement("button");
		delButton.setAttribute("class", "delButton");
		delButton.setAttribute("onclick", "delEntry("+institutes[i].agency_id+")");
		const delSymbol = document.createTextNode("X");
		delButton.appendChild(delSymbol);

		const editButton = document.createElement("button");
		editButton.setAttribute("class", "editButton");
		editButton.setAttribute("id", `edit${institutes[i].agency_id}`);
		editButton.setAttribute("onclick", "editEntry("+institutes[i].agency_id+")");
		const editSymbol = document.createTextNode("edit");
		editButton.appendChild(editSymbol);

		td0.appendChild(delButton);
		td0.appendChild(editButton);
		tr.appendChild(td0);

		const details = [
			institutes[i].agency_name,
			institutes[i].agency_address,
			institutes[i].contact_person,
			institutes[i].phone_number,
			institutes[i].email,
			institutes[i].distance !== undefined ? Math.round(institutes[i].distance * 1000) / 1000 : undefined
		];

		for (var j = 0; j < details.length; j++) {
			const td = document.createElement("td");
			const text = document.createElement("p");
			text.innerHTML = ((details[j] || details[j] == 0) ? details[j] : "N/A");

			const newText = document.createElement("input");
			newText.setAttribute("type", "text");
			newText.setAttribute("value", (details[j] ? details[j] : ""));
			newText.style.display = "none";

			td.appendChild(text);
			td.appendChild(newText);
			tr.appendChild(td);
		}

		tbody.appendChild(tr);
	}

	table.appendChild(thead);
	table.appendChild(tbody);
}

const getPos = async address => {
	if (address.length == 0) {
		alert("invalid address");
		return;
	}

    params = {
		address: address
	};

	const res = await fetch(positionUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})

	const data = await res.json();
    
	return data;
}

const initTable = () => {
    fetch(getUrl, {method: "GET"})
    .then(res => res. json())
	.then(institutes =>buildTable(institutes))  
};

const filterTable = () => {
	if (document.getElementById("sort").checked) {
		getPos(document.getElementById("userAddress").value)
		.then(pos => {
			if (pos == 999) {
				alert("invalid address");
				return;
			}

			params = {
				queryType: "SORT",
				tableName: tableName,
				lat: pos.lat,
				lng: pos.lng,
				address: document.getElementById("address").value,
				name: document.getElementById("name").value,
				region: document.getElementById("region").value
			};
	
			fetch(postUrl, {
				method: "POST",
				body: JSON.stringify(params),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.then(res => res.json())
			.then(institutes => buildTable(institutes))
		})
	}

	else {
		params = {
			queryType: "FILTER",
			tableName: tableName,
			address: document.getElementById("address").value,
			name: document.getElementById("name").value,
			region: document.getElementById("region").value
		};

		fetch(postUrl, {
			method: "POST",
			body: JSON.stringify(params),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(res => res.json())
		.then(institutes => buildTable(institutes))
	}
};

insertEntry = () => {
	params = {
		queryType: "INSERT",
		tableName: tableName,
		columns: "(agency_name, agency_address, contact_person, phone_number, email)",
		values: "(".concat(
			"'", document.getElementById("newName").value, "', ",
			"'", document.getElementById("newAddress").value, "', ",
			"'", document.getElementById("newContact").value, "', ",
			"'", document.getElementById("newNumber").value, "', ",
			"'", document.getElementById("newEmail").value, "'",
			")"
		)
	};

	fetch(postUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => console.log(res))
	.then(() => alert("inserted"))
}

delEntry = id => {
	params = {
		queryType: "DELETE",
		tableName: tableName,
		id: id
	};

	fetch(postUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json() )
	.then(() => alert("deleted!"))
}

editEntry = id => {
	const button = document.getElementById(`edit${id}`);
	const tr = document.getElementById(`tr${id}`);

	if (button.innerHTML == "edit") {
		button.innerHTML = "done";

		for (var i = 1; i <= 5; i++) {
			tr.children[i].children[0].style.display = "none";
			tr.children[i].children[1].style.display = "block";
		}
	}
	
	else if (button.innerHTML == "done") {
		button.innerHTML = "edit";
	
		for (var i = 1; i <= 5; i++) {
			tr.children[i].children[0].style.display = "block";
			tr.children[i].children[1].style.display = "none";
		}

		params = {
			queryType: "UPDATE",
			tableName: tableName,
			id: id,
			columns: ["agency_name", "agency_address", "contact_person", "phone_number", "email"],
			values: [
				tr.children[1].children[1].value,
				tr.children[2].children[1].value,
				tr.children[3].children[1].value,
				tr.children[4].children[1].value,
				tr.children[5].children[1].value
			]
		};
	
		fetch(postUrl, {
			method: "POST",
			body: JSON.stringify(params),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(res => res.json() )
		.then(() => alert("updated!"))
	}
}