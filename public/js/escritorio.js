//Referencias
const lblEscritorio = document.querySelector("h1");
const lblTicket = document.querySelector("small");
const btnAtender = document.querySelector("button");
const divAlerta = document.querySelector(".alert");
const contadorCola = document.querySelector("#lblPendientes");

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

socket.on("disconnect", () => {
	btnAtender.disabled = true;
});

socket.on("connect", () => {
	btnAtender.disabled = false;

	btnAtender.addEventListener("click", () => {
		socket.emit("atender-ticket", { escritorio }, ({ ok, ticket, count }) => {
			divAlerta.style.display = "none";
			contadorCola.innerText = count;

			if (!ok) {
				divAlerta.style.display = "";
				contadorCola.style.display = "none";
				lblTicket.innerText = `Nadie`;
				return;
			}

			lblTicket.innerText = `Ticket ${ticket.numero}`;
			contadorCola.style.display = "";
			contadorCola.innerText = count;
		});
	});
});

socket.on("tickets-por-atender", (payload) => {
	if (payload <= 0) {
		btnAtender.disabled = true;
		contadorCola.style.display = "none";
		divAlerta.style.display = "";
		return;
	}

	btnAtender.disabled = false;
	divAlerta.style.display = "none";
	contadorCola.style.display = "";
	contadorCola.innerText = `${payload}`;
});
