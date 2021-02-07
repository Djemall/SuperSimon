// Le Modal de règles

let modal = document.getElementById("Modal");

let btn = document.getElementById("openModal");

let span = document.getElementsByClassName("closeModal")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}

// Modal Loose

let modalLose = document.getElementById("ModalLose");


let spanLose = document.getElementsByClassName("closeModalLose")[0];


spanLose.onclick = function() {
    modalLose.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalLose) {
    modalLose.style.display = "none";
    }
}