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
		this.io.on("connection", (socket) => {
			console.log("Cliente Conectado", socket.id);
			socket.on("disconnect", () => {
				console.log("Cliente Desconectado", socket.id);
			});
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
