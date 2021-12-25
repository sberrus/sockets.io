const TicketControl = require("../models/ticket-control");

const tickets = new TicketControl();

const socketController = (socket) => {
	console.log(`${socket.id} conectado`);

	socket.emit("ultimo-ticket", tickets.ultimo);

	socket.on("disconnect", () => {
		console.log(`${socket.id} desconectado`);
	});

	socket.on("siguiente-ticket", (payload, callback) => {
		const siguiente = tickets.siguiente();

		callback(siguiente);

		//TODO: Notificar que hay un nuevo ticket pendiente de asignar.
	});

	socket.on("atender-ticket", ({ escritorio }, callback) => {
		if (!escritorio) {
			return callback({
				ok: false,
				msg: "El escriotiro es obligatorio",
			});
		}

		const ticket = tickets.atenderTicket(escritorio);
		if (!ticket) {
			callback({
				ok: false,
				msg: "No hay tickets en la cola",
				count: tickets.countQueue,
			});
		} else {
			callback({
				ok: true,
				ticket,
				count: tickets.countQueue,
			});
		}
	});
};

module.exports = { socketController };
