const express = require("express");
const cors = require("cors");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = require("http").createServer(this.app); //Inicializador de server socket.io
		this.io = require("socket.io")(this.server); // Inicializamos la app

		// Middlewares
		this.middlewares();

		//Sockets
		this.sockets();
	}

	middlewares() {
		// CORS
		this.app.use(cors());

		// Directorio Público
		this.app.use(express.static("public"));
	}

	sockets() {
		//El evento connection es el que nos permite mantener la conexión y el intercambio de información entre el cliente y el servidor. Este manejará a cada una de las conexiones de manera individual y dentro de este cuerpo es donde debemos realizar el resto de eventos y escuchas de los web sockets.

		this.io.on("connection", (socket) => {
			socket.on("disconnect", () => {
				// console.log("Cliente Desconectado", socket.id);
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
					this.io.emit("respuesta-servidor", `${payload.id}: "${payload.mensaje}" -- ${payload.date}`);

					const id = 123456;
					callback({
						id,
						fecha: new Date(),
						desc: "Este mensaje solo va a recibir el que ha realizado la petición. El callback se ejecuta pero viene directamente desde le frontend",
					});
				}
			);
		});
	}
	listen() {
		//A diferencia de Node, en el caso de los servidores con IO tenemos que inicializar a this.server de socketio en vez de a this.app de express. Ya que la app de express se maneja dentro de la app de socket.io

		this.server.listen(this.port, () => {
			console.log("Servidor corriendo en puerto", this.port);
		});

		// Para saber si el socket se esta ejecutando correctamente entramos en esta ruta para acceder al js publico que nos ofrece socket.io http://localhost:8080/socket.io/socket.io.js si logras ver el js de socket.io esta todo correcto. Esto solo funciona en servidores locales. Si quieres usar socket io en un cliente que se encuentra en otro server, tienes que hacer uso de socket.io/client que nos permite manejar los sockets del lado del cliente.
	}
}

module.exports = Server;
