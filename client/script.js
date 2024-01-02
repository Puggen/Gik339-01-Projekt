const url = "http://localhost:3000/cars";

window.addEventListener("load", fetchData);

function fetchData() {
    fetch(url)
        .then((result) => result.json())
        .then((cars) => {
            if (cars.length > 0) {
                let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
                cars.forEach((car) => {
                    html += `
                <li
                    class="bg-${car.color}-200 basis-1/4 text-${car.color}-900 p-2 rounded-md border-2 border-${car.color}-400 flex flex-col justify-between">
                    <h3>${car.model} ${car.manufac}</h3>
                    <p>Användarnamn: ${car.regnr}</p>
                    <div>
                        <button
                            class="border border-${car.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="setCurrentcar(${car.id})">
                            Ändra
                        </button>
                        <button class="border border-${car.color}-300 hover:bg-white/100 rounded-md bg-white/50 p-1 text-sm mt-2" onclick="deletecar(${car.id})">
                            Ta bort
                        </button>
                    </div>
                </li>`;
                });
                html += `</ul>`;

                const listContainer = document.getElementById("listContainer");
                listContainer.innerHTML = "";
                listContainer.insertAdjacentHTML("beforeend", html);
            }
        });
}

function setCurrentcar(id) {
    console.log("current", id);

    fetch(`${url}/${id}`)
        .then((result) => result.json())
        .then((car) => {
            console.log(car);
            carForm.model.value = car.model;
            carForm.manufac.value = car.manufac;
            carForm.color.value = car.color;
            carForm.regnr.value = car.regnr;

            localStorage.setItem("currentId", car.id);
        });
}

function deletecar(id) {
    console.log("delete", id);
    fetch(`${url}/${id}`, { method: "DELETE" }).then(() => fetchData());
}

carForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const servercarObject = {
        model: "",
        manufac: "",
        regnr: "",
        color: "",
    };
    servercarObject.model = carForm.model.value;
    servercarObject.manufac = carForm.manufac.value;
    servercarObject.regnr = carForm.regnr.value;
    servercarObject.color = carForm.color.value;

    const id = localStorage.getItem("currentId");
    if (id) {
        servercarObject.id = id;
    }

    const request = new Request(url, {
        method: servercarObject.id ? "PUT" : "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(servercarObject),
    });

    fetch(request).then((response) => {
        console.log(response);
        fetchData();

        localStorage.removeItem("currentId");
        carForm.reset();
    });
}



