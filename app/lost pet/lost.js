/*const pets = [
	{date_caught: "2021-04-16", location_caught: "中山路114號", breed: "混種", sex: "母", size: "幼貓", catch_source: "政府捕捉", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210416173932-1.jpg"},
  	{date_caught: "2021-04-08", location_caught: "興美六街198號", breed: "混種", sex: "母", size: "中型", catch_source: "政府捕捉", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210409084536-1.jpg"},
  	{date_caught: "2021-04-08", location_caught: "學府路412號", breed: "混種", sex: "公", size: "中型", catch_source: "政府捕捉", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210408164956-1.jpg"},
  	{date_caught: "2021-04-12", location_caught: "立仁路60巷", breed: "混種", sex: "公", size: "小型", catch_source: "政府捕捉", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210412091917-1.jpg"},
  	{date_caught: "2021-04-12", location_caught: "國華里", breed: "混種", sex: "公", size: "中型", catch_source: "政府捕捉", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210412154428-1.jpg"},
  	{date_caught: "2021-03-23", location_caught: "飼主送交", breed: "混種", sex: "公", size: "中型", catch_source: "飼主送交", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210323145831-1.jpg"}
];*/

const getUrl = "http://localhost:3000/lost/";
const postUrl = "http://localhost:3000/lost/post";
const tableName = "lost_pet";

loadCards = pets => {
	console.log(pets);

	const container = document.getElementById("pets-container");
	container.innerHTML = "";

	for (var i = 0; i < pets.length; i++) {
		const card = document.createElement("div");
		card.setAttribute("id", `card${pets[i].chip_id}`);

		const img = document.createElement("img");
		img.setAttribute("src", pets[i].picture);
		img.setAttribute("alt", "unavailabe");

		const info = document.createElement("div");
		//info.setAttribute("id", `info${pets[i].chip_id}`);

		const details = [
			{heading: "晶片號碼", value: pets[i].chip_id },
			{heading: "名字", value: pets[i].name },
			{heading: "種類", value: pets[i].type },
			{heading: "品種", value: pets[i].breed },
			{heading: "性別", value: pets[i].sex },
			{heading: "顏色", value: pets[i].color },
			{heading: "外觀", value: pets[i].appearance },
			{heading: "遺失地點", value: pets[i].lost_place },
			{heading: "遺失時間", value: pets[i].lost_time.slice(0, 10) },
			{heading: "飼主稱謂", value: pets[i].owner_name },
			{heading: "聯絡電話", value: pets[i].number },
			{heading: "email", value: pets[i].email },	
		];

		for (var j = 0; j < details.length; j++) {
			const node = document.createElement("p");
			node.innerHTML = `${details[j].heading}: ${details[j].value ? details[j].value : "N/A"}`;
			info.appendChild(node);
		}

		/*
		const type_node = document.createElement("p");
		type_node.setAttribute("class", "display");
		const type = document.createTextNode(`種類: ${pets[i].type}`);
		type_node.appendChild(type);

		const breed_node = document.createElement("p");
		breed_node.setAttribute("class", "display");
		const breed = document.createTextNode(`品種: ${pets[i].breed}`);
		breed_node.appendChild(breed);

		const sex_node = document.createElement("p");
		sex_node.setAttribute("class", "display");
		const sex_text = document.createTextNode(`性別: ${pets[i].sex}`);
		sex_node.appendChild(sex_text);

		const color_node = document.createElement("p");
		color_node.setAttribute("class", "display");
		const color_text = document.createTextNode(`顏色: ${pets[i].color}`);
		color_node.appendChild(color_text);

		info.appendChild(type_node);
		info.appendChild(breed_node);
		info.appendChild(sex_node);
		info.appendChild(color_node);
*/
		card.appendChild(img);
		card.appendChild(info);
		container.appendChild(card);
	}
};

initCards = () => {
	fetch(getUrl, {method: "GET"})
    .then(res => res.json())
	.then(cards => loadCards(cards))
};

filterCards = () => {
	params = {
		queryType: "FILTER",
		tableName: tableName,
		chip_id: document.getElementById("chip_id").value,
		type: document.getElementById("type").value,
		breed: document.getElementById("breed").value,
		sex: document.getElementById("sex").value,
		color: document.getElementById("color").value
	};

	fetch(postUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json() )
	.then(pets => loadCards(pets))
};