/*
const institutes = [
	{name: "躍生動物醫院", type: "動物醫院", address: "新北市板橋區民權路258-2號1樓", contact: "丁肇民", phone_number: "0289681075", email: "dvm@tpts5.seed.net.tw"},
	{name: "狗窩寵物精品店", type: "寵物用品", address: "新北市板橋區四川路一段87巷132號1樓", contact: "王新益", phone_number: "0918-787845", email: "t22661234@yahoo.com.tw"},
	{name: "拉拉熊寵物生活館", type: "動物醫院", address: "新北市板橋區大觀路3段142-1號1樓", contact: "郭佩怡", phone_number: "0903368236", email: null},
	{name: "瑪利寵物美容館", type: "寵物美容", address: "新北市板橋區新海路413號1樓", contact: "林聖欽", phone_number: "02-82596565", email: null},
	{name: "狗狗公園快樂狗旅館", type: "寵物旅館", address: "新北市淡水區中山北路一段247巷80號1樓", contact: "胡宗良", phone_number: "02-86316580", email: "lorence0126@gmail.com"}
];
*/
const col_names = ["名稱", "類型", "地址", "聯絡人", "電話", "email"];

loadInstitutes = () => {
	fetch("http://localhost:3000/")
    	.then(res => res.json())
    	//.then(text => document.write(text))
		.then(institutes => {
			//console.log(institutes);
			
			for (var j = 0; j < institutes.length; j++)
				console.log(institutes[j]);
			const table = document.getElementById("institutes-table");

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

				const td1 = document.createElement("td");
				const name = document.createTextNode(institutes[i].agency_name);
				td1.appendChild(name);

				const td2 = document.createElement("td");
				const type = document.createTextNode(institutes[i].type);
				td2.appendChild(type);

				const td3 = document.createElement("td");
				const address = document.createTextNode(institutes[i].agency_address);
				td3.appendChild(address);

				const td4 = document.createElement("td");
				const contact = document.createTextNode(`${institutes[i].contact_person ? institutes[i].contact_person : "N/A"}`);
				td4.appendChild(contact);

				const td5 = document.createElement("td");
				const phone_number = document.createTextNode(`${institutes[i].phone_number ? institutes[i].phone_number : "N/A"}`);
				td5.appendChild(phone_number);

				const td6 = document.createElement("td");
				const email = document.createTextNode(`${institutes[i].email ? institutes[i].email : "N/A"}`);
				td6.appendChild(email);
				
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);
				tr.appendChild(td6);

				tbody.appendChild(tr);
			}

			table.appendChild(thead);
			table.appendChild(tbody);
		})
};
