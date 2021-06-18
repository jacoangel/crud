// array que contiene los datos
let cars = []

    //   una variable guarda html
let   carsListCont =  document.getElementById("carsList")

// guarda el form
const CarsForm = document.getElementById("addCar")

// funcion que guarda en storage y convierte en string el arreglo
const carsStorage = () => {
  if (typeof Storage !== "undefined") {
    localStorage.setItem("carsStorageArray", JSON.stringify(cars))
    carsStorageObject()
    // renderList()
  }
  else {
    alert("tu navegador no es compatible con almacenamiento, por favor actualizalo.")
  }
}

// funcion que convirte de string a json el arreglo
const carsStorageObject = () => {
  cars = JSON.parse(localStorage.getItem("carsStorageArray"))
  for (let i= 0; i < cars.length; i++){
    renderList()
  }
  renderList()
}


//  funcion que que recarga la lista y genera el html
const renderList = () => {

  
    carsListCont.innerHTML =""
    carsListArray = cars
    

    carsListArray.forEach((cars, index) => {
        //contenedor principal de los carros
        let carsItemDiv = document.createElement("div")
        carsItemDiv.setAttribute("class", "carItem")
        carsListCont.appendChild(carsItemDiv)
        // div que contiene la info de cada carro
        let carsInfoDiv = document.createElement("div")
        carsInfoDiv.setAttribute("class", "carInfo")
        carsItemDiv.appendChild(carsInfoDiv)
        
        // se crea las categorias de cada carro con forma de h4
        const nameCarsDiv = document.createElement("h4")
        const modelCarsDiv = document.createElement("h4")
        const doorsCarsDiv = document.createElement("h4")
        const colorCarsDiv = document.createElement("h4")
        const brandCarsDiv = document.createElement("h4")
        nameCarsDiv.innerText = `${cars.name}`
        modelCarsDiv.innerText = `${cars.model}`
        doorsCarsDiv.innerText = `${cars.doors}`
        colorCarsDiv.innerText = `${cars.color}`
        brandCarsDiv.innerText = `${cars.brand}`
        
        carsInfoDiv.appendChild(nameCarsDiv)
        carsInfoDiv.appendChild(modelCarsDiv)
        carsInfoDiv.appendChild(doorsCarsDiv)
        carsInfoDiv.appendChild(colorCarsDiv)
        carsInfoDiv.appendChild(brandCarsDiv) 
        
        // botones agregar o eliminar
        const buttons = document.createElement("div")
        buttons.setAttribute("class", "buttons")
        carsItemDiv.append(buttons)
        // boton de editar
        const updateBtn = document.createElement("button")
        updateBtn.addEventListener("click", () => updateCar (index, cars))
        updateBtn.setAttribute("id", "updatebtn")
        updateBtn.innerText="Editar"
        // boton de borrar
        const deleteBtn = document.createElement("button")
        deleteBtn.addEventListener("click", () => deleteCar(index))
        deleteBtn.innerText="Eliminar"
        deleteBtn.setAttribute("id", "deletebtn")

        buttons.appendChild(updateBtn)
        buttons.appendChild(deleteBtn)

    }); 
    CarsForm.addEventListener("submit",createCar)

    const updateCar = (index, cars) => {
      document.getElementById("name").value =  cars.name
      document.getElementById("model").value = cars.model
      document.getElementById("doors").value = cars.doors
      document.getElementById("color").value = cars.color
      document.getElementById("brand").value = cars.brand
      renderList()
    }
    
};
// funcion que agrega el elemento al arreglo al hacer click en el boton agregar
const createCar = (event) => {
  event.preventDefault();
  let car ={
    name: document.getElementById("name").value,
    model: document.getElementById("model").value,
    doors: document.getElementById("doors").value,
    color: document.getElementById("color").value,
    brand: document.getElementById("brand").value,
  }
  carsListArray.push(car)
  
  carsStorage ()
  carsStorageObject()
  deleteTextinForm()
  renderList()
}
//borra el texto que queda en el formulario despues de agregar la info
const deleteTextinForm = () => {
  document.getElementById("name").value =  ""
  document.getElementById("model").value = ""
  document.getElementById("doors").value = ""
  document.getElementById("color").value = ""
  document.getElementById("brand").value = ""
}
// funcion que borra el elemento del arreglo
const deleteCar = index => {
  cars.splice(index, 1)
  carsStorage ()
  renderList()
} 

document.addEventListener("DOMContentLoaded", carsStorageObject)
