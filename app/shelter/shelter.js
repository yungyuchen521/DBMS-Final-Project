const col_names = ["收容所", "地址", "電話", "容量", "已收容數量", "需要支援", "可提供支援"];
const getUrl = "http://localhost:3000/shelters/";
const postUrl = "http://localhost:3000/shelters/post";
const tableName = "shelter";

buildTable = shelters => {
	const table = document.getElementById("shelters-table");
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

	for (var i = 0; i < shelters.length; i++) {
		const tr = document.createElement("tr");

		values = [
			shelters[i].shelter_name,
			shelters[i].address,
			shelters[i].tel,
			shelters[i].max_shelter,
			shelters[i].num_shelter,
			(shelters[i].need_support ? "是" : "否"),
			(shelters[i].can_support ? "是" : "否")
		];

		for (var j = 0; j < values.length; j++) {
			const td = document.createElement("td");
			const text = document.createElement("p");
			text.innerHTML = values[j];

			td.appendChild(text);
			tr.appendChild(td);
		}

		tbody.appendChild(tr);
	}

	table.appendChild(thead);
	table.appendChild(tbody);
};

initTable = () => {
	fetch(getUrl, {method: "GET"})
    .then(res => res.json())
	.then(shelters => buildTable(shelters))
};

filterTable = () => {
	params = {
		queryType: "FILTER",
		tableName: tableName,
		address: document.getElementById("address").value,
		name: document.getElementById("name").value,
		region: document.getElementById("region").value,
		needHelp: document.getElementById("needHelp").value,
		canHelp: document.getElementById("canHelp").value,
		sort: document.getElementById("sort").checked
	};

	fetch(postUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json() )
	.then(shelters => buildTable(shelters))
};