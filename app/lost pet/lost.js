const pets = [
	{date_caught: "2021-04-16", location_caught: "中山路114號", breed: "混種", sex: "母", size: "幼貓", catch_source: "政府捕捉", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210416173932-1.jpg"},
  	{date_caught: "2021-04-08", location_caught: "興美六街198號", breed: "混種", sex: "母", size: "中型", catch_source: "政府捕捉", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210409084536-1.jpg"},
  	{date_caught: "2021-04-08", location_caught: "學府路412號", breed: "混種", sex: "公", size: "中型", catch_source: "政府捕捉", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210408164956-1.jpg"},
  	{date_caught: "2021-04-12", location_caught: "立仁路60巷", breed: "混種", sex: "公", size: "小型", catch_source: "政府捕捉", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210412091917-1.jpg"},
  	{date_caught: "2021-04-12", location_caught: "國華里", breed: "混種", sex: "公", size: "中型", catch_source: "政府捕捉", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210412154428-1.jpg"},
  	{date_caught: "2021-03-23", location_caught: "飼主送交", breed: "混種", sex: "公", size: "中型", catch_source: "飼主送交", note: "前置隔離中", picture: "http://dog.chiayi.gov.tw/upload/bigphoto/thumbnail/announcement20210323145831-1.jpg"}
];

loadPets = () => {
	const container = document.getElementById("pets-container");

	for (var i = 0; i < pets.length; i++) {
		const card = document.createElement("div");

		const img = document.createElement("img");
		img.setAttribute("src", pets[i].picture);
		img.setAttribute("alt", "unavailabe");

		const info = document.createElement("div");

		const breed_node = document.createElement("p");
		breed_text = document.createTextNode(`kind: ${pets[i].breed}`);
		breed_node.appendChild(breed_text);

		const size_node = document.createElement("p");
		size_text = document.createTextNode(`size: ${pets[i].size}`);
		size_node.appendChild(size_text);

		const sex_node = document.createElement("p");
		sex_text = document.createTextNode(`sex: ${pets[i].sex}`);
		sex_node.appendChild(sex_text);

		info.appendChild(breed_node);
		info.appendChild(size_node);
		info.appendChild(sex_node);

		card.appendChild(img);
		card.appendChild(info);
		container.appendChild(card);
	}
};
