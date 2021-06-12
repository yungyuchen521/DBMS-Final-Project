const getOwnerUrl = "http://localhost:3000/owner/";
const postOwnerUrl = "http://localhost:3000/owner/post";
const ownerTable = "owner";

const getPetUrl = "http://localhost:3000/lost/";
const postPetUrl = "http://localhost:3000/lost/post";
const petTable = "lost_pet";

var currentShelterID = "";

const buildOwner = owner => {
    const div = document.getElementById("owner-container");
    div.innerHTML = "";

	const owner_container = document.getElementById("owner-container");
	const pets_container = document.getElementById("pets-container");
    const pet_register = document.getElementById("pet-register");

    if (!owner) {
        alert("查無您的資料\n請完成註冊再重新查詢");
		owner_container.style.display = "none";
		pets_container.style.display = "none";
        pet_register.style.display = "none";
        return;
    }

    currentShelterID = owner.id;
	owner_container.style.display = "block";
	pets_container.style.display = "block";
    pet_register.style.display = "block";

    const delButton = document.createElement("button");
	delButton.setAttribute("class", "delButton");
	delButton.setAttribute("onclick", `delOwner(${owner.id})`);
	const delSymbol = document.createTextNode("delete");
	delButton.appendChild(delSymbol);

	const editButton = document.createElement("button");
	editButton.setAttribute("class", "editButton");
	editButton.setAttribute("id", "editButton");
    editButton.setAttribute("onclick", `editOwner(${owner.id})`);
	const editSymbol = document.createTextNode("edit");
	editButton.appendChild(editSymbol);

    div.appendChild(delButton);
    div.appendChild(editButton);

    const details = [
        {heading: "飼主稱謂", type: "text", value: owner.name },
        {heading: "聯絡電話", type: "text", value: (owner.phone == null ? "" : owner.phone) },
        {heading: "email", type: "text", value: (owner.email == null ? "" : owner.email) }
    ];

    for (var i = 0; i < details.length; i++) {
        const label = document.createElement("label");
        label.style.display = "block";

        const heading = document.createTextNode(`${details[i].heading}: `);
        label.appendChild(heading);

        const textNode = document.createElement("p");
        textNode.setAttribute("class", "ownerDetails");
        textNode.style.display = "inline-block";
        textNode.innerHTML = details[i].value;
        label.appendChild(textNode);
    
        const inputNode = document.createElement("input");
        inputNode.setAttribute("class", "ownerInputs");
        inputNode.style.display = "none";
        inputNode.setAttribute("type", "text");
        inputNode.setAttribute("value", details[i].value);
        label.appendChild(inputNode);

        div.appendChild(label);
    }
}

const buildPets = pets => {
    const div = document.getElementById("pets-container");
    div.innerHTML = "";

    if (!pets) {
		div.style.display = "none";
		return;
	}

	div.style.display = "block";

    for (var i = 0; i < pets.length; i++) {
        console.log(pets[i]);

        const card = document.createElement("div");
		card.setAttribute("id", `card${pets[i].chip_id}`);

		const img = document.createElement("img");
		img.setAttribute("src", pets[i].picture);
		img.setAttribute("alt", "unavailabe");

        const delButton = document.createElement("button");
		delButton.setAttribute("class", "delButton");
        delButton.addEventListener("click", delCard.bind(null, pets[i].chip_id));
		const delSymbol = document.createTextNode("delete");
		delButton.appendChild(delSymbol);

		const editButton = document.createElement("button");
		editButton.setAttribute("class", "editButton");
		editButton.setAttribute("id", `edit${pets[i].chip_id}`);
		editButton.addEventListener("click", editCard.bind(null, pets[i].chip_id));
		const editSymbol = document.createTextNode("edit");
		editButton.appendChild(editSymbol);

        const info = document.createElement("div");
		info.setAttribute("id", `info${pets[i].chip_id}`);

        card.appendChild(delButton);
        card.appendChild(editButton);
        card.appendChild(img);
		
        const details = [
			{heading: "晶片號碼", type: "text", value: pets[i].chip_id },
			{heading: "名字", type: "text", value: pets[i].name },
			{heading: "種類", type: "select", options: ["狗", "貓", "其他"], value: pets[i].type },
			{heading: "品種", type: "text", value: pets[i].breed },
			{heading: "性別", type: "select", options: ["公", "母"], value: pets[i].sex },
			{heading: "顏色", type: "text", value: pets[i].color },
			{heading: "外觀", type: "text", value: pets[i].appearance },
			{heading: "遺失地點", type: "text", value: pets[i].lost_place },
			{heading: "遺失時間", type: "date", value: pets[i].lost_time.slice(0, 10) }
		];

        for (var j = 0; j < details.length; j++) {
            const label = document.createElement("label");
            label.style.display = "block";
    
            const heading = document.createTextNode(`${details[j].heading}: `);
            label.appendChild(heading);
    
            const textNode = document.createElement("p");
            textNode.setAttribute("class", (details[j].heading == "晶片號碼" ? "none" : `petDetails${pets[i].chip_id}`));
            textNode.style.marginLeft = "20px";
            textNode.innerHTML = details[j].value;
            label.appendChild(textNode);
        
            if (details[j].heading == "晶片號碼") {}
                
            else if (details[j].type == "text") {
                const inputNode = document.createElement("input");
                inputNode.setAttribute("class", `petInputs${pets[i].chip_id}`);
                inputNode.style.display = "none";
                inputNode.setAttribute("type", "text");
                inputNode.setAttribute("value", details[j].value);
                label.appendChild(inputNode);
            }

            else if (details[j].type == "select") {
                const selectNode = document.createElement("select");
                selectNode.setAttribute("class", `petInputs${pets[i].chip_id}`);
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
                inputNode.setAttribute("class", `petInputs${pets[i].chip_id}`);
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

searchOwner = () => {
    const id = document.getElementById("id").value;

    params = {
		queryType: "SEARCH",
		tableName: ownerTable,
		id : id
	};

	fetch(postOwnerUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json() )
	.then(owner => buildOwner(owner[0]))
    
    searchPets(id);
}

insertOwner = () => {
    params = {
		queryType: "INSERT",
		tableName: ownerTable,
		columns: "(name, phone, email)",
		values: "(".concat(
			"'", document.getElementById("newName").value, "', ",
			"'", document.getElementById("newPhone").value, "', ",
			"'", document.getElementById("newEmail").value, "'",
			")"
		)
	};

	fetch(postOwnerUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json())
	.then(data => alert(`您的ID： ${data[0].id}`))
}

delOwner = id => {
    params = {
		queryType: "DELETE",
		tableName: ownerTable,
		id: id
	};

	fetch(postOwnerUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => res.json() )
	.then(() => alert("deleted!"))
}

editOwner = id => {
    const button = document.getElementById("editButton");
    const details = document.getElementsByClassName("ownerDetails");
    const inputs = document.getElementsByClassName("ownerInputs");

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
			tableName: ownerTable,
			id: id,
			columns: ["name", "phone", "email"],
			values: [
				inputs[0].value,
				inputs[1].value,
				inputs[2].value
			]
		};
	
		fetch(postOwnerUrl, {
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

searchPets = owner_id => {
    params = {
        queryType: "JOIN_SEARCH",
        table1: ownerTable,
        table2: petTable, 
        owner_id: owner_id
    };
    
    fetch(postPetUrl, {
        method: "POST",
        body: JSON.stringify(params),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json() )
    .then(pets => buildPets(pets))
}

insertCard = () => {
	if (!document.getElementById("newChipID").value) {
		alert("Please ente the chip id");
		return;
	}


	params = {
		queryType: "INSERT",
		tableName: petTable,
		id: document.getElementById("newChipID").value,
		columns: "(chip_id, name, type, sex, breed, color, appearance, lost_time, lost_place, owner_id, picture)",
		values: "(".concat(
			"'", document.getElementById("newChipID").value, "', ",
			"'", document.getElementById("newPetName").value, "', ",
			"'", document.getElementById("newType").value, "', ",
			"'", document.getElementById("newSex").value, "', ",
			"'", document.getElementById("newBreed").value, "', ",
			"'", document.getElementById("newColor").value, "', ",
			"'", document.getElementById("newAppearance").value, "', ",
			"'", document.getElementById("newLostTime").value, "', ",
			"'", document.getElementById("newLostPlace").value, "', ",
			"'", currentShelterID, "', ",
			"'", "", "'",
			")"
		)
	};

	fetch(postPetUrl, {
		method: "POST",
		body: JSON.stringify(params),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
    .then(res => {
		if (res.status == 999)
			alert("duplicate chip_id");

		else
			alert("inserted");
	})
}

delCard = id => {
	params = {
		queryType: "DELETE",
		tableName: petTable,
		id: id
	};

	fetch(postPetUrl, {
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
	const details = document.getElementsByClassName(`petDetails${id}`);
    const inputs = document.getElementsByClassName(`petInputs${id}`);


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
			tableName: petTable,
			id: id,
			columns: ["name", "type", "breed", "sex", "color", "appearance", "lost_place", "lost_time"],
			values: [
				inputs[0].value,
				inputs[1].value,
                inputs[2].value,
                inputs[3].value,
                inputs[4].value,
                inputs[5].value,
                inputs[6].value,
                inputs[7].value
			]
		};
	
		fetch(postPetUrl, {
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