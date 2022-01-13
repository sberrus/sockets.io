//Referencias HTML
const lblTicket1 = document.querySelector("#lblTicket1");
const lblEscritorio1 = document.querySelector("#lblEscritorio1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblEscritorio2 = document.querySelector("#lblEscritorio2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblEscritorio3 = document.querySelector("#lblEscritorio3");
const lblTicket4 = document.querySelector("#lblTicket4");
const lblEscritorio4 = document.querySelector("#lblEscritorio4");

const socket = io();

socket.on("estado-actual", (payload) => {
	const nextTicketAudio = new Audio("../audio/new-ticket.mp3");
	nextTicketAudio.play();
	const [ticket1, ticket2, ticket3, ticket4] = payload;

	if (ticket1) {
		lblTicket1.innerText = "ticket " + ticket1.numero;
		lblEscritorio1.innerText = ticket1.escritorio;
	} else {
		lblTicket1.innerText = "Cargando...";
		lblEscritorio1.innerText = "Cargando...";
	}

	if (ticket2) {
		lblTicket2.innerText = "ticket " + ticket2.numero;
		lblEscritorio2.innerText = ticket2.escritorio;
	} else {
		lblTicket2.innerText = "Cargando...";
		lblEscritorio2.innerText = "Cargando...";
	}

	if (ticket3) {
		lblTicket3.innerText = "ticket " + ticket3.numero;
		lblEscritorio3.innerText = ticket3.escritorio;
	} else {
		lblTicket3.innerText = "Cargando...";
		lblEscritorio3.innerText = "Cargando...";
	}

	if (ticket4) {
		lblTicket4.innerText = "ticket " + ticket4.numero;
		lblEscritorio4.innerText = ticket4.escritorio;
	} else {
		lblTicket4.innerText = "Cargando...";
		lblEscritorio4.innerText = "Cargando...";
	}
});
