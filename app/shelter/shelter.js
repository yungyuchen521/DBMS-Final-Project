const shelters = [
	{name: "臺北市動物之家", address: "臺北市內湖區潭美街852號", phone_number: "02-87913254", capacity: 450, occupied: 660, need_support: true, can_support: false},
	{name: "新北市三芝區公立動物之家", address: "新北市三芝區青山路", phone_number: "02-26194428", capacity: 120, occupied: 80, need_support: false, can_support: true},
	{name: "新北市八里區公立動物之家", address: "新北市八里區長坑里6鄰長坑道路36號", phone_number: "02-26365436", capacity: 160, occupied: 115, need_support: false, can_support: true},
	{name: "新北市五股區公立動物之家", address: "新北市五股區外寮路9-9號", phone_number: "02-82925265", capacity: 260, occupied: 275, need_support: false, can_support: false},
	{name: "新北市新店區公立動物之家", address: "新北市新店區安泰路235號", phone_number: "02-22159462", capacity: 170, occupied: 166, need_support: false, can_support: false}
];

const col_names = ["收容所", "地址", "電話", "容量", "已收容數量", "需要支援", "可提供支援"];


loadShelters = () => {
	const table = document.getElementById("shelters-table");

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

		const td1 = document.createElement("td");
		const name = document.createTextNode(shelters[i].name);
		td1.appendChild(name);

		const td2 = document.createElement("td");
		const address = document.createTextNode(shelters[i].address);
		td2.appendChild(address);

		const td3 = document.createElement("td");
		const phone_number = document.createTextNode(shelters[i].phone_number);
		td3.appendChild(phone_number);

		const td4 = document.createElement("td");
		const capacity = document.createTextNode(shelters[i].capacity);
		td4.appendChild(capacity);

		const td5 = document.createElement("td");
		const occupied = document.createTextNode(shelters[i].occupied);
		td5.appendChild(occupied);

		const td6 = document.createElement("td");
		const need_support = document.createTextNode(`${shelters[i].need_support ? "是" : "否"}`);
		td6.appendChild(need_support);

		const td7 = document.createElement("td");
		const can_support = document.createTextNode(`${shelters[i].can_support ? "是" : "否"}`);
		td7.appendChild(can_support);
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);
		tr.appendChild(td7);

		tbody.appendChild(tr);
	}

	table.appendChild(thead);
	table.appendChild(tbody);
};
