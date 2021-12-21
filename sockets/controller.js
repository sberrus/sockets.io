const TicketControl = require("../models/ticket-control");

const tickets = new TicketControl();

const socketController = (socket) => {
	console.log(`${socket.id} conectado`);

	socket.emit("ultimo-ticket",tickets.ultimo)

	socket.on("disconnect", () => {
		console.log(`${socket.id} desconectado`);
	});


	socket.on("siguiente-ticket", (payload, callback) => {
		const siguiente = tickets.siguiente();

		callback(siguiente);

		//TODO: Notificar que hay un nuevo ticket pendiente de asignar.
	});
};

module.exports = { socketController };
