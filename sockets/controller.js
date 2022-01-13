const TicketControl = require("../models/ticket-control");

const tickets = new TicketControl();

const socketController = (socket) => {
	//Cliente conectado
	socket.emit("estado-actual", tickets.ultimos4);
	socket.emit("ultimo-ticket", tickets.ultimo);
	socket.emit("tickets-por-atender", tickets.countQueue);

	socket.on("siguiente-ticket", (payload, callback) => {
		const siguiente = tickets.siguiente();

		callback(siguiente);

		socket.broadcast.emit("tickets-por-atender", tickets.countQueue);
	});

	//Atendiendo Ticket
	socket.on("atender-ticket", ({ escritorio }, callback) => {
		if (!escritorio) {
			return callback({
				ok: false,
				msg: "El escritorio es obligatorio",
			});
		}

		const ticket = tickets.atenderTicket(escritorio);
		if (!ticket) {
			return callback({
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
		socket.broadcast.emit("estado-actual", tickets.ultimos4);
		socket.broadcast.emit("tickets-por-atender", tickets.countQueue);
		socket.emit("tickets-por-atender", tickets.countQueue);
	});
};

module.exports = { socketController };
