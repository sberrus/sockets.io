const socketController = (socket) => {
	socket.on("disconnect", () => {
		console.log("Cliente Desconectado", socket.id);
	});

	//En el front tenemos en el archivo que maneja los sockets, una instrucción con un .emit("algo"). Para capturar dicho emit realizamos en el backend un evento .on("algo").
	//El primer argumento siempre va a ser el identificador del mensaje en cuestión. Si en el front tenemos un .emit("texto"), para que el back escuche ese evento tenemos que tener en la conexión un .on("texto") siendo ambos con el mismo identificador, de lo contrario, el servidor no será capaz de escuchar lo que envia el cliente.

	socket.on(
		"enviar-mensaje",
		(
			payload,

			// Recivimos el callback que nos envia el cliente. Este callback y lo que devuelva solo lo leerá el cliente qeu emitio el evento. Muy similar al comportamiento que tienen las REST Request.
			callback
		) => {
			//emit() tiene dos formas para funcionar. Si hacemos un emit al socket de la conexión establecida, solo recibirá la notoficacion el socket al cual le estamos a haciendo referencia. Para hacer un mensaje global, tenemos que crear el evento al io principal, al mismo al que le hemos creado el evento "connection"

			//Escuchará solo el socket que emitió el evento.
			// socket.emit("respuesta-servidor", "algo");

			//Escucharán todos los clientes que tengan el .on("respuesta-servidor").
			// this.io.emit("respuesta-servidor", `${payload.id}: "${payload.mensaje}" -- ${payload.date}`);

			const id = 123456;
			callback({
				id,
				fecha: new Date(),
				desc: "Este mensaje solo va a recibir el que ha realizado la petición. El callback se ejecuta pero viene directamente desde le frontend",
			});
		}
	);
};

module.exports = { socketController };
