//Referencias
const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");

//Params
const searchParams = new URLSearchParams(window.location.search);
//Existe param escritorio
if (!searchParams.has("escritorio")) {
	window.location = "index.html";
	throw new Error("El escritorio es obligatorio");
}

//Obtenemos el valor del param escritorio y lo asignamos al primer h1
const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = escritorio;

//Sockets
const socket = io();

socket.on("connect", () => {
	btnAtender.disabled = false;
});
socket.on("disconnect", () => {
	btnAtender.disabled = true;
});

socket.on("connect", () => {
	btnAtender.addEventListener("click", () => {
		//
	});
});
