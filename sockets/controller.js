const socketController = (socket) => {
	console.log(`${socket.id} conectado`);

	socket.on("disconnect", () => {
		console.log(`${socket.id} desconectado`);
	});

	socket.on("enviar-mensaje", (payload, callback) => {
		callback({
			estado: "mensaje enviado",
			payload,
		});

		//socket.broadcast.emit("aaa") el método broadcast nos permite enviar un evento global desde el socket con el que estamos trabajando. Esto nos permite
		socket.broadcast.emit("respuesta-servidor", payload);
	});
};

module.exports = { socketController };
