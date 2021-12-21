//Referencias
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnNuevoTicket = document.querySelector("#btnNuevoTicket");

const socket = io();

socket.on("connect", () => {
	btnNuevoTicket.disabled = false;
});

socket.on("disconnect", () => {
	btnNuevoTicket.disabled = true;
});

socket.on("ultimo-ticket", (payload) => {
	lblNuevoTicket.innerText = `Ticket ${payload}`;
});

btnNuevoTicket.addEventListener("click", () => {
	socket.emit("siguiente-ticket", null, (ticket) => {
		lblNuevoTicket.innerText = ticket;
	});
});

console.log("Nuevo Ticket HTML");
