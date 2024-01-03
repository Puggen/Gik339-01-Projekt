const url = "http://localhost:3000/cars";

window.addEventListener("load", fetchData);

function fetchData() {
    fetch(url)
        .then((result) => result.json())
        .then((cars) => {
            if (cars.length > 0) {
                let html = `<div class="grid row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 g-lg-3">`;
                cars.forEach((car) => {
                    html += `
                    <div class="card shadow-sm p-3 rounded-4 border"
                    style="background-color: ${car.color};">
                    <img src="./img/OIG.png" class="card-img-top" alt="Logo of a car">
                    <div class="card-body">
                        <section class="border p-3 rounded-4" style="background-color: rgba(255, 255, 255, 0.8);">
                            <h5 class="card-title text-center">${car.manufac}</h5>
                            <p class="card-text">Regnr: ${car.regnr}</p>
                            <p class="card-text">Modell: ${car.model}</p>                 
                        </section>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary"
                            style="color: black; background-color: rgba(255, 255, 255, 0.8); border:none;">Ändra</button>
                        <button class="btn btn-primary"
                            style="color: black; background-color: rgba(255, 255, 255, 0.8); border:none;">Ta bort</button>
                    </div>`;
                });
                html += `</div>`;

                const container = document.getElementById("container");
                container.innerHTML += ``;
                container.insertAdjacentHTML("beforeend", html);
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



