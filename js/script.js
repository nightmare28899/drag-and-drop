/* variables */
var drags = document.querySelectorAll(".drag");
var contenedores = document.querySelectorAll(".contenedor");
var terminacion = document.querySelector(".terminacion");
var puntuacion = document.getElementById("puntuacion");
var reiniciarBtn = document.getElementById("reiniciar");
var progreso = document.getElementById("progreso");
var reinicio = document.querySelector(".reinicio");

var puntuacionMaxima = 10;
var puntuacionActual = 0;
var sum = 0;
var progresoActual = 0;
const dictionary = {
  drag1: "contenedor1",
  drag2: "contenedor4",
  drag3: "contenedor3",
  drag4: "contenedor2",
};
let arrayData = [];

/* evemts */
drags.forEach(function (drag) {
  drag.addEventListener("dragstart", dragStart);
  drag.addEventListener("dragend", dragEnd);
});

/* containers */
contenedores.forEach(function (contenedor) {
  contenedor.addEventListener("dragover", dragOver);
  contenedor.addEventListener("dragenter", dragEnter);
  contenedor.addEventListener("dragleave", dragLeave);
  contenedor.addEventListener("drop", dragDrop);
});

function dragStart() {
  setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd() {
  this.className = "drag";
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
  this.classList.remove("hovered");
}

/* function to execute when you drop the item into the container */
function dragDrop(e) {
  e.preventDefault();
  var drag = document.querySelector(".invisible");

  if (dictionary[drag.id] === e.target.id) {
    drag.classList.add("valido");
    drag.setAttribute("draggable", "false");
    const content = document.getElementById(e.target.id);
    content.appendChild(drag);
    content.classList.remove("hovered");
    playAudio("correcto.m4a");

    if (dictionary[drag.id] === "contenedor1") {
      content.classList.remove("firstImg");
      content.classList.remove("bordersContenedor");

      var cont = document.querySelector("#contenedor1");
      cont.classList.add("valido");
      setTimeout(() => cont.classList.remove("valido"), 2000);

      progressBar(25);
      if (!localStorage.getItem("contenedor1")) {
        localStorage.setItem("contenedor1", 2.5);
      }
    } else if (dictionary[drag.id] === "contenedor2") {
      content.classList.remove("secondImg");
      content.classList.remove("bordersContenedor");

      var cont = document.querySelector("#contenedor2");
      cont.classList.add("valido");
      setTimeout(() => cont.classList.remove("valido"), 2000);

      progressBar(25);
      if (!localStorage.getItem("contenedor2")) {
        localStorage.setItem("contenedor2", 2.5);
      }
    } else if (dictionary[drag.id] === "contenedor3") {
      content.classList.remove("thirdImg");
      content.classList.remove("bordersContenedor");

      var cont = document.querySelector("#contenedor3");
      cont.classList.add("valido");
      setTimeout(() => cont.classList.remove("valido"), 2000);

      progressBar(25);
      if (!localStorage.getItem("contenedor3")) {
        localStorage.setItem("contenedor3", 2.5);
      }
    } else if (dictionary[drag.id] === "contenedor4") {
      content.classList.remove("fourthImg");
      content.classList.remove("bordersContenedor");

      var cont = document.querySelector("#contenedor4");
      cont.classList.add("valido");
      setTimeout(() => cont.classList.remove("valido"), 2000);

      progressBar(25);
      if (!localStorage.getItem("contenedor4")) {
        localStorage.setItem("contenedor4", 2.5);
      }
    }

    let sumTotal = 0;
    sumTotal =
      parseFloat(localStorage.getItem("contenedor1")) +
      parseFloat(localStorage.getItem("contenedor2")) +
      parseFloat(localStorage.getItem("contenedor3")) +
      parseFloat(localStorage.getItem("contenedor4"));

    let first = document
      .getElementById("contenedor1")
      .classList.contains("firstImg");
    let second = document
      .getElementById("contenedor2")
      .classList.contains("secondImg");
    let third = document
      .getElementById("contenedor3")
      .classList.contains("thirdImg");
    let fourth = document
      .getElementById("contenedor4")
      .classList.contains("fourthImg");

    if (!first && !second && !third && !fourth) {
      localStorage.setItem("puntuacion", sumTotal);
      document.getElementById("puntuacion").innerHTML =
        localStorage.getItem("puntuacion");
      document.getElementById("blur-effect").classList.add("blur-effect");
      terminacion.style.display = "block";
      document.querySelector(".restart").style.display = "block";
    }
  } else {
    if (dictionary[drag.id] === "contenedor1") {
      localStorage.setItem("contenedor1", 0);
    } else if (dictionary[drag.id] === "contenedor2") {
      localStorage.setItem("contenedor2", 0);
    } else if (dictionary[drag.id] === "contenedor3") {
      localStorage.setItem("contenedor3", 0);
    } else if (dictionary[drag.id] === "contenedor4") {
      localStorage.setItem("contenedor4", 0);
    }
    playAudio("error.m4a");
  }
}

/* function to update the progressbar */
function progressBar(percentage) {
  var bar = document.getElementById("progress");
  arrayData.push(percentage);
  sum = arrayData.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  if (sum <= 100) {
    bar.style.width = sum + "%";
  }
}

/* function to play audio */
function playAudio(audioName) {
  var audio = new Audio("/assets/audios/" + audioName);
  audio.play();
}

/* function to the reset the screen */
function resetGame() {
  terminacion.style.display = "none";
  document.getElementById("blur-effect").classList.remove("blur-effect");
  var restartM = document.getElementById("restartMenu");
  restartM.classList.add("restartMenu");
  reinicio.style.display = "block";
  localStorage.removeItem("puntuacion");
  localStorage.removeItem("contenedor1");
  localStorage.removeItem("contenedor2");
  localStorage.removeItem("contenedor3");
  localStorage.removeItem("contenedor4");
}

/* function to reset some variables and create the images */
function yes() {
  document.getElementById("progress").style.width = "0%";

  terminacion.style.display = "none";
  document.getElementById("blur-effect").classList.remove("blur-effect");
  var restartM = document.getElementById("restartMenu");
  restartM.classList.remove("restartMenu");
  reinicio.style.display = "none";
  localStorage.removeItem("puntuacion");
  puntuacionActual = 0;

  contenedores.forEach(function (contenedor) {
    var content = contenedor.querySelector(".drag");
    contenedor.removeChild(content);
    contenedor.classList.add("bordersContenedor");
    if (contenedor.id === "contenedor1") {
      contenedor.classList.add("firstImg");
      var img = document.createElement("img");
      img.src = "/assets/images/drags/img01@2x.png";
      img.setAttribute("id", "drag1");
      img.setAttribute("class", "drag");
      // Add the drag event to the image
      img.addEventListener("dragstart", dragStart);
      img.addEventListener("dragleave", dragLeave);
      img.addEventListener("dragend", dragEnd);
      document.getElementById("containerDrag").appendChild(img);
    }
    if (contenedor.id === "contenedor2") {
      contenedor.classList.add("secondImg");
      var img2 = document.createElement("img");
      img2.src = "/assets/images/drags/img02@2x.png";
      img2.setAttribute("id", "drag2");
      img2.setAttribute("class", "drag");
      // Add the drag event to the image
      img2.addEventListener("dragstart", dragStart);
      img2.addEventListener("dragleave", dragLeave);
      img2.addEventListener("dragend", dragEnd);
      document.getElementById("containerDrag").appendChild(img2);
    }
    if (contenedor.id === "contenedor3") {
      contenedor.classList.add("thirdImg");
      var img3 = document.createElement("img");
      img3.src = "/assets/images/drags/img03@2x.png";
      img3.setAttribute("id", "drag3");
      img3.setAttribute("class", "drag");
      // Add the drag event to the image
      img3.addEventListener("dragstart", dragStart);
      img3.addEventListener("dragleave", dragLeave);
      img3.addEventListener("dragend", dragEnd);
      document.getElementById("containerDrag").appendChild(img3);
    }
    if (contenedor.id === "contenedor4") {
      contenedor.classList.add("fourthImg");
      var img4 = document.createElement("img");
      img4.src = "/assets/images/drags/img04@2x.png";
      img4.setAttribute("id", "drag4");
      img4.setAttribute("class", "drag");
      // Add the drag event to the image
      img4.addEventListener("dragstart", dragStart);
      img4.addEventListener("dragleave", dragLeave);
      img4.addEventListener("dragend", dragEnd);
      document.getElementById("containerDrag").appendChild(img4);
    }
  });
  document.getElementById("progress").style.width = "0%";
  arrayData = [];
  localStorage.removeItem("puntuacion");
  localStorage.removeItem("contenedor1");
  localStorage.removeItem("contenedor2");
  localStorage.removeItem("contenedor3");
  localStorage.removeItem("contenedor4");
}

/* function to only hide the menu */
function no() {
  var restartM = document.getElementById("restartMenu");
  restartM.classList.remove("restartMenu");
  reinicio.style.display = "none";
  document.getElementById("blur-effect").classList.remove("blur-effect");
}
