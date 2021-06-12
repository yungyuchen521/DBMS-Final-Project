const getUrl = "http://localhost:3000/adopt/";
const postUrl = "http://localhost:3000/adopt/post";
const tableName = "adopt_animal";

loadCards = animals => {
	const container = document.getElementById("pets-container");
	container.innerHTML = "";

	for (var i = 0; i < animals.length; i++) {
		const card = document.createElement("div");

		const img = document.createElement("img");
		img.setAttribute("src", animals[i].album_file);
		img.setAttribute("alt", "unavailabe");

		const info = document.createElement("div");
		info.setAttribute("class", "info");

		const details = [
			{ heading: "種類", value: animals[i].animal_kind },
			{ heading: "體型", value: animals[i].animal_bodytype },
			{ heading: "性別", value: animals[i].animal_sex },
			{ heading: "顏色", value: animals[i].animal_colour },
			{ heading: "開放領養", value: animals[i].animal_status == "OPEN" ? "是" : "否"},
			{ heading: "已絕育", value: animals[i].animal_sterilization == "T" ? "是" : "否" },
			{ heading: "已施打狂犬病疫苗", value: animals[i].animal_bacterin == "T" ? "是" : "否" },
			{ heading: "收容所名稱", value: animals[i].shelter_name },
			{ heading: "收容所地址", value: animals[i].address },
			{ heading: "收容所電話", value: animals[i].tel }
		];

		for (var j = 0; j < details.length; j++) {
			const node = document.createElement("p");
			const text = document.createTextNode(`${details[j].heading}: ${details[j].value}`);
			node.appendChild(text);

			info.appendChild(node);
		}

		card.appendChild(img);
		card.appendChild(info);
		container.appendChild(card);
	}
};

initCards = () => {
	fetch(getUrl, {method: "GET"})
    .then(res => res.json())
	.then(pets => loadCards(pets))
}

const filterCards = () => {
	params = {
		queryType: "FILTER",
		tableName: tableName,
		kind: document.getElementById("kind").value,
		size: document.getElementById("size").value,
		sex: document.getElementById("sex").value,
		color: document.getElementById("color").value,
		adopt: document.getElementById("adopt").value
	};

	fetch(postUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json() )
	.then(pets => {
		console.log(pets);
		loadCards(pets);
	})
};