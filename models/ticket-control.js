const path = require("path");
const fs = require("fs");

class Ticket {
	constructor(numero, escritorio) {
		this.numero = numero;
		this.escritorio = escritorio;
	}
}

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

	siguiente() {
		this.ultimo += 1;
		const ticket = new Ticket(this.ultimo, null);
		this.tickets.push(ticket);

		this.guardarDB();
		return "Ticket " + ticket.numero;
	}

	atenderTicket(escritorio) {
		//No tenemos ticket
		if (this.tickets.length === 0) {
			return null;
		}

		const ticket = this.tickets.shift();

		ticket.escritorio = escritorio;

		this.ultimos4.unshift(ticket);

		if (this.ultimos4.length > 3) {
			this.ultimos4 = this.ultimos4.slice(0, 3);
		}
		this.guardarDB();

		return ticket;
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
