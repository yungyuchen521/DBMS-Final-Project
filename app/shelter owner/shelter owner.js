const getShelterUrl = "http://localhost:3000/shelters/";
const postShelterUrl = "http://localhost:3000/shelters/post";
const shelterTable = "shelter";

const getAnimalUrl = "http://localhost:3000/adopt/";
const postAnimalUrl = "http://localhost:3000/adopt/post";
const animalTable = "adopt_animal";

var currentShelterID = "";

const buildShelter = shelter => {
    const div = document.getElementById("shelter-container");
    div.innerHTML = "";

    const animals_filter = document.getElementById("animals-filter");
    const animals_register = document.getElementById("animals-register");

    if (!shelter) {
        alert("查無您的資料\n請完成註冊再重新查詢");
        animals_filter.style.display = "none";
        animals_register.style.display = "none";
        return;
    }

    currentShelterID = shelter.id;
    animals_filter.style.display = "block";
    animals_register.style.display = "block";

    const delButton = document.createElement("button");
	delButton.setAttribute("class", "delButton");
	delButton.setAttribute("onclick", `delShelter(${shelter.id})`);
	const delSymbol = document.createTextNode("delete");
	delButton.appendChild(delSymbol);

	const editButton = document.createElement("button");
	editButton.setAttribute("class", "editButton");
	editButton.setAttribute("id", "editButton");
    editButton.setAttribute("onclick", `editShelter(${shelter.id})`);
	const editSymbol = document.createTextNode("edit");
	editButton.appendChild(editSymbol);

    div.appendChild(delButton);
    div.appendChild(editButton);

    const details = [
        {heading: "名稱", type: "text", value: shelter.shelter_name },
        {heading: "地址", type: "text", value: (shelter.address == null ? "" : shelter.address) },
        {heading: "電話", type: "tel", value: (shelter.tel == null ? "" : shelter.tel) },
        {heading: "容量", type: "number", value: (shelter.max_shelter == null ? "" : shelter.max_shelter) },
        {heading: "已收容數量", type: "number", value: (shelter.num_shelter == null ? "" : shelter.num_shelter) },
        {heading: "需要支援", type: "select", options: ["是", "否"], value: (shelter.need_help ? "是" : "否") },
        {heading: "可提供支援", type: "select", options: ["是", "否"], value: (shelter.can_help ? "是" : "否") }
    ];

    for (var i = 0; i < details.length; i++) {
        const label = document.createElement("label");
        label.style.display = "block";

        const heading = document.createTextNode(`${details[i].heading}: `);
        label.appendChild(heading);

        const textNode = document.createElement("p");
        textNode.setAttribute("class", "shelterDetails");
        textNode.style.display = "inline-block";
        textNode.innerHTML = details[i].value;
        label.appendChild(textNode);
    

        if (details[i].type == "text") {
            const inputNode = document.createElement("input");
            inputNode.setAttribute("class", "shelterInputs");
            inputNode.style.display = "none";
            inputNode.setAttribute("type", "text");
            inputNode.setAttribute("value", details[i].value);
            label.appendChild(inputNode);
        }
        
        else if (details[i].type == "tel") {
            const inputNode = document.createElement("input");
            inputNode.setAttribute("class", "shelterInputs");
            inputNode.style.display = "none";
            inputNode.setAttribute("type", "tel");
            inputNode.setAttribute("value", details[i].value);
            label.appendChild(inputNode);
        }

        else if (details[i].type == "number") {
            const inputNode = document.createElement("input");
            inputNode.setAttribute("class", "shelterInputs");
            inputNode.style.display = "none";
            inputNode.setAttribute("type", "number");
            inputNode.setAttribute("value", details[i].value);
            label.appendChild(inputNode);
        }

        else if (details[i].type == "select") {
            const selectNode = document.createElement("select");
            selectNode.setAttribute("class", "shelterInputs");
            selectNode.style.display = "none";

            for (var j = 0; j < details[i].options.length; j++) {
                const optionNode = document.createElement("option");
                optionNode.innerHTML = details[i].options[j];
                selectNode.appendChild(optionNode);

                if (details[i].value == details[i].options[j])
                    selectNode.selected = "selected";
            }
            
            label.appendChild(selectNode);
        }

        div.appendChild(label);
    }
}

const buildAnimals = animals => {
    const div = document.getElementById("animals-container");
    div.innerHTML = "";

    if (!animals) return;

    for (var i = 0; i < animals.length; i++) {
        const card = document.createElement("div");
		card.setAttribute("id", `card${animals[i].animal_id}`);

		const img = document.createElement("img");
		img.setAttribute("src", animals[i].album_file);
		img.setAttribute("alt", "unavailabe");

        const delButton = document.createElement("button");
		delButton.setAttribute("class", "delButton");
        delButton.addEventListener("click", delCard.bind(null, animals[i].animal_id));
		const delSymbol = document.createTextNode("delete");
		delButton.appendChild(delSymbol);

		const editButton = document.createElement("button");
		editButton.setAttribute("class", "editButton");
		editButton.setAttribute("id", `edit${animals[i].animal_id}`);
		editButton.addEventListener("click", editCard.bind(null, animals[i].animal_id));
		const editSymbol = document.createTextNode("edit");
		editButton.appendChild(editSymbol);

        const info = document.createElement("div");
		info.setAttribute("id", `info${animals[i].animal_id}`);

        card.appendChild(delButton);
        card.appendChild(editButton);
        card.appendChild(img);
		
        const details = [
            {heading: "ID", type: "none", value: animals[i].animal_id },
			{heading: "種類", type: "select", options: ["狗", "貓", "其他"], value: animals[i].animal_kind },
			{heading: "性別", type: "select", options: ["M", "F", "N"], value: animals[i].animal_sex },
			{heading: "體型", type: "select", options: ["SMALL", "MEDIUM", "BIG"], value: animals[i].animal_bodytype },
			{heading: "顏色", type: "text", value: animals[i].animal_colour },
			{heading: "年紀", type: "select", options: ["ADULT", "CHILD", "NULL"], value: animals[i].animal_age },
			{heading: "絕育", type: "select", options: ["T", "F"], value: animals[i].animal_sterilization },
			{heading: "狂犬病疫苗", type: "select", options: ["T", "F"], value: animals[i].animal_bacterin },
			{heading: "尋獲地點", type: "text", value: animals[i].foundplace },
            {heading: "動物狀態", type: "select", options: ["OPEN", "ADOPTED", "DEAD", "NONE", "OTHER"], value: animals[i].animal_status },
            {heading: "備註", type: "text", value: animals[i].animal_remark },
            {heading: "康放領養時間", type: "date", value: (animals[i].animal_opendate ? animals[i].animal_opendate.slice(0, 10) : "") },
            {heading: "結束領養時間", type: "date", value: (animals[i].animal_closeddate ? animals[i].animal_closeddate.slice(0, 10) : "") }
		];

        for (var j = 0; j < details.length; j++) {
            const label = document.createElement("label");
            label.style.display = "block";
    
            const heading = document.createTextNode(`${details[j].heading}: `);
            label.appendChild(heading);
    
            const textNode = document.createElement("p");
            textNode.setAttribute("class", (details[j].type == "none" ? "none" : `animalDetails${animals[i].animal_id}`));
            textNode.style.marginLeft = "20px";
            textNode.innerHTML = details[j].value;
            label.appendChild(textNode);
                
            if (details[j].type == "text") {
                const inputNode = document.createElement("input");
                inputNode.setAttribute("class", `animalInputs${animals[i].animal_id}`);
                inputNode.style.display = "none";
                inputNode.setAttribute("type", "text");
                inputNode.setAttribute("value", details[j].value);
                label.appendChild(inputNode);
            }

            else if (details[j].type == "select") {
                const selectNode = document.createElement("select");
                selectNode.setAttribute("class", `animalInputs${animals[i].animal_id}`);
                selectNode.style.display = "none";
                selectNode.setAttribute("value", details[j].value);

                for (var k = 0; k < details[j].options.length; k++) {
                    const optionNode = document.createElement("option");
                    optionNode.innerHTML = details[j].options[k];
                    selectNode.appendChild(optionNode);
                }

                label.appendChild(selectNode);
            }
            
            else if (details[j].type == "date") {
                const inputNode = document.createElement("input");
                inputNode.setAttribute("class", `animalInputs${animals[i].animal_id}`);
                inputNode.style.display = "none";
                inputNode.setAttribute("type", "date");
                inputNode.setAttribute("value", details[j].value);
                label.appendChild(inputNode);
            }

            info.appendChild(label);
        }

        card.appendChild(info);
        div.appendChild(card);
    }
}

searchShelter = () => {
    const id = document.getElementById("id").value;

    if (!validIntRange(id, 1, Infinity)) {
        alert("收容所ID請輸入正整數")
        return;
    }

    params = {
		queryType: "SEARCH",
		tableName: shelterTable,
		id : id
	};

	fetch(postShelterUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json() )
	.then(shelter => buildShelter(shelter[0]))
    
    searchCards(id);
}

const insertShelter = () => {
    const newName = document.getElementById("newName").value;
    const newAddress = document.getElementById("newAddress").value;
    const newNumber = document.getElementById("newNumber").value;
    const newCapacity = document.getElementById("newCapacity").value;
	const newOccupied = document.getElementById("newOccupied").value;

    if (!newName) {
        alert("請輸入名稱");
        return;
    }

    if (!newAddress) {
        alert("請輸入地址");
        return;
    }

    if (!newNumber) {
        alert("請輸入電話");
        return;
    }

    if (!validPhoneNumber(newNumber)) {
        alert("電話請輸入數字, '-', 或空白鍵");
        return;
    }

    if (!validIntRange(newCapacity, 0, Infinity)) {
        alert("容量請填入0或正整數");
        return;
    }

    if (!validIntRange(newOccupied, 0, Infinity)) {
        alert("已收容數量請填入0或正整數");
        return;
    }

    params = {
		queryType: "INSERT",
		tableName: shelterTable,
		columns: "(shelter_name, area_id, max_shelter, num_shelter, light, address, tel, need_help, can_help)",
		values: "(".concat(
			"'", newName, "', ",
            0, ", ",
			newCapacity, ", ",
			newOccupied, ", ",
            "'', ",
            "'", newAddress, "', ",
            "'", newNumber, "', ",
            (document.getElementById("newNeedHelp").value == "是" ? 1 : 0), ", ",
            (document.getElementById("newCanHelp").value == "是" ? 1 : 0),
			")"
		)
	};

	fetch(postShelterUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json())
	.then(data => {
        console.log(data);
        alert(`您的ID： ${data[0].id}`)
    })
}

const delShelter = id => {
    params = {
		queryType: "DELETE",
		tableName: shelterTable,
		id: id
	};

	fetch(postShelterUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json() )
	.then(() => alert("deleted!"))
}

editShelter = id => {
    const button = document.getElementById("editButton");
    const details = document.getElementsByClassName("shelterDetails");
    const inputs = document.getElementsByClassName("shelterInputs");

	if (button.innerHTML == "edit") {
		button.innerHTML = "done";

        for (var i = 0; i < details.length; i++) details[i].style.display = "none";
        for (var i = 0; i < inputs.length; i++) inputs[i].style.display = "block";
	}
	
	else if (button.innerHTML == "done") {
		button.innerHTML = "edit";
	
        for (var i = 0; i < details.length; i++) details[i].style.display = "block";
        for (var i = 0; i < inputs.length; i++) inputs[i].style.display = "none";

		params = {
			queryType: "UPDATE",
			tableName: shelterTable,
			id: id,
			columns: ["shelter_name", "address", "tel", "max_shelter", "num_shelter", "need_help", "can_help"],
			values: [
				inputs[0].value,
				inputs[1].value,
				inputs[2].value,
                inputs[3].value,
                inputs[4].value,
                (inputs[5].value == "是" ? 1 : 0),
                (inputs[6].value == "是" ? 1 : 0),
			]
		};

        if (!inputs[0].value) {
            alert("名稱請勿留白");
            return;
        }
    
        if (!inputs[1].value) {
            alert("地址請勿留白");
            return;
        }
    
        if (!inputs[2].value) {
            alert("電話請勿留白");
            return;
        }
    
        if (!validPhoneNumber(!inputs[2].value)) {
            alert("電話請輸入數字, '-', 或空白鍵")
            return;
        }
    
        if (!validIntRange(!inputs[3].value, 0, Infinity)) {
            alert("容量請填入0或正整數");
            return;
        }
    
        if (!validIntRange(!inputs[4].value, 0, Infinity)) {
            alert("已收容數量請填入0或正整數");
            return;
        }
	
		fetch(postShelterUrl, {
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

const searchCards = shelter_id => {
    params = {
        queryType: "FILTER",
        tableName: animalTable, 
        shelter_id: shelter_id
    };
    
    fetch(postShelterUrl, {
        method: "POST",
        body: JSON.stringify(params),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json() )
    .then(animals => buildAnimals(animals))
}

const filterCards = () => {
    const animalID = document.getElementById("animalID").value;

    if (animalID && !validIntRange(animalID, 1, Infinity)) {
        alert("ID請勿填入數字以外的字元");
        return;
    }

    params = {
		queryType: "FILTER",
		tableName: animalTable,
        shelterID: currentShelterID,
        animalID: animalID,
		kind: document.getElementById("kind").value,
		size: document.getElementById("size").value,
		sex: document.getElementById("sex").value,
		color: document.getElementById("color").value,
        age: document.getElementById("age").value,
        sterilization: document.getElementById("sterilization").value,
        bacterin: document.getElementById("bacterin").value,
		status: document.getElementById("status").value
	};

	fetch(postAnimalUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json() )
	.then(animals => {
		console.log(animals);
		buildAnimals(animals);
	})
}

insertCard = () => {

    const newOpenDate = document.getElementById("newOpenDate").value;
    const newCloseDate = document.getElementById("newCloseDate").value;

    if (compareDates(newOpenDate, newCloseDate) == 1) {
        alert("開放領養時間不得晚與結束時間");
        return;
    }

	params = {
		queryType: "INSERT",
		tableName: animalTable,
		columns: "(animal_shelter_pkid, animal_kind, animal_sex, animal_bodytype, animal_colour, animal_age, animal_sterilization, animal_bacterin, animal_foundplace, animal_status, animal_remark, animal_opendate, animal_closeddate)",
		values: "(".concat(
            currentShelterID, ", ",
			"'", document.getElementById("newKind").value, "', ",
			"'", document.getElementById("newSex").value, "', ",
			"'", document.getElementById("newBodyType").value, "', ",
			"'", document.getElementById("newColor").value, "', ",
			"'", document.getElementById("newAge").value, "', ",
			"'", document.getElementById("newSterilization").value, "', ",
            "'", document.getElementById("newBacterin").value, "', ",
			"'", document.getElementById("newFoundPlace").value, "', ",
			"'", document.getElementById("newStatus").value, "', ",
			"'", document.getElementById("newRemark").value, "', ",
            "'", newOpenDate, "', ",
            "'", newCloseDate, "'",
			")"
		)
	};

	fetch(postAnimalUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => console.log(res))
	.then(() => alert("inserted"))
}

delCard = id => {
	params = {
		queryType: "DELETE",
		tableName: animalTable,
		id: id
	};

	fetch(postAnimalUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json() )
	.then(() => alert("deleted!"))
}

editCard = id => {
	const button = document.getElementById(`edit${id}`);
	const details = document.getElementsByClassName(`animalDetails${id}`);
    const inputs = document.getElementsByClassName(`animalInputs${id}`);


	if (button.innerHTML == "edit") {
		button.innerHTML = "done";

		for (var i = 0; i < details.length; i++) details[i].style.display = "none";
        for (var i = 0; i < inputs.length; i++) inputs[i].style.display = "block";
	}
	
	else if (button.innerHTML == "done") {
		button.innerHTML = "edit";

		for (var i = 0; i < details.length; i++) details[i].style.display = "block";
        for (var i = 0; i < inputs.length; i++) inputs[i].style.display = "none";

		params = {
			queryType: "UPDATE",
			tableName: animalTable,
			id: id,
			columns: ["animal_kind", "animal_sex", "animal_bodytype", "animal_colour", "animal_age", "animal_sterilization", "animal_bacterin", "animal_foundplace", "animal_status", "animal_remark", "animal_opendate", "animal_closeddate"],
			values: [
				inputs[0].value,
				inputs[1].value,
                inputs[2].value,
                inputs[3].value,
                inputs[4].value,
                inputs[5].value,
                inputs[6].value,
                inputs[7].value,
                inputs[8].value,
                inputs[9].value,
                inputs[10].value,
                inputs[11].value
			]
		};

        if (compareDates(inputs[10].value, inputs[11].value) == 1) {
            alert("開放領養時間不得晚與結束時間");
            return;
        }
	
		fetch(postAnimalUrl, {
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