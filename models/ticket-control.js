const path = require("path");
const fs = require("fs");

class TicketControl {
	constructor() {
		// Buena Practica**: En los constructores de las clases se suele dejar claro cuales son las propiedades que van a ser utilizadas en la clase para que puedan ser fácilmente identificadas para otros programadores y para VSCode.

		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];
		this.ultimos4 = [];

		this.init();
	}

	get toJSON() {
		return {
			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets,
			ultimos4: this.ultimos4,
		};
	}

	guardarDB() {
		const dbPath = path.join(__dirname, "../db/data.json"); //Ruta del JSON.

		fs.writeFileSync(dbPath, JSON.stringify(this.toJSON)); //Sobreescribimos el JSON.
	}

	init() {
		//DB
		const { hoy, tickets, ultimos4, ultimo } = require("../db/data.json"); //Si hacemos un require de un .json, Node convierte dicho .json automáticamente a un objeto literal js.

		//Controlador para reiniciar el contador diario.
		if (hoy === this.hoy) {
			this.tickets = tickets;
			this.ultimo = ultimo;
			this.ultimos4 = ultimos4;
		} else {
			//es otro dia
			this.guardarDB();
		}
	}
}

module.exports = TicketControl;
