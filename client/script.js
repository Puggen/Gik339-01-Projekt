const url = "http://localhost:3000/cars";
const carForm = document.getElementById("input");
 
window.addEventListener("load", fetchData);

function fetchData() {
    fetch(url)
        .then((result) => result.json())
        .then((cars) => {
            if (cars.length > 0) {
                let html = `<div class="grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-2 g-lg-3">`;
                cars.forEach((car) => {
                    html += `
                    <div class="card shadow-sm p-3 rounded-4 border"
                    style="background: linear-gradient(to top, ${car.color} 60%, rgba(255, 255, 255, 1) 100%);">
                    <img src="./img/OIG.png" class="card-img-top" alt="Logo of a car">
                    <div class="card-body">
                        <section class="border p-3 rounded-4" style="background-color: rgba(255, 255, 255, 0.8);">
                            <h5 class="card-title text-center">${car.manufac}</h5>
                            <p class="card-text">Regnr: ${car.regnr}</p>
                            <p class="card-text">Modell: ${car.model}</p>
                            <p class="card-text">Drivmedel: ${car.fuel}</p>                  
                        </section>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary"
                            style="color: black; background-color: rgba(255, 255, 255, 0.8); border:none;" onclick="setCurrentCar(${car.id})">Ändra</button>
                        <button class="btn btn-primary"
                            style="color: black; background-color: rgba(255, 255, 255, 0.8); border:none;" onclick="deleteCar(${car.id})">Ta bort</button>
                    </div>
                    </div>`;
                });
                html += `</div>`;

                const cardContainer = document.getElementById("cardContainer");
                cardContainer.innerHTML += '';
                cardContainer.insertAdjacentHTML("beforeend", html);
            }
        });
}



function setCurrentCar(id) {
    console.log("current", id);

    fetch(`${url}/${id}`)
        .then((result) => result.json())
        .then((car) => {
            console.log(car);
            carForm.model.value = car.model;
            carForm.manufac.value = car.manufac;
            carForm.color.value = car.color;
            carForm.regnr.value = car.regnr;
            carForm.fuel.value = car.fuel;

            localStorage.setItem("currentId", car.id);
        });
}

function deleteCar(id) {
    console.log("delete", id);
    alert('Bilen är borttagen');
    fetch(`${url}/${id}`, { method: "DELETE" }).then((response) => response.json()).then(() => {
        
        
        localStorage.removeItem("currentId");
        carForm.reset();
    });
    
}

carForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const servercarObject = {
        model: "",
        manufac: "",
        regnr: "",
        color: "",
        fuel: "",
    };
    servercarObject.model = carForm.model.value;
    servercarObject.manufac = carForm.manufac.value;
    servercarObject.regnr = carForm.regnr.value;
    servercarObject.color = carForm.color.value;
    servercarObject.fuel = carForm.fuel.value;
    

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
    alert('Bilen sparades')

    fetch(request)
        .then((response) => response.json())
        .then(() => {

            localStorage.removeItem("currentId");
            carForm.reset();
        });
}
 