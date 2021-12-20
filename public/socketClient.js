//Antes de usar esta función hay que comprobar que se tenga el js de socket IO yendo a la ruta http://localhost:8080/socket.io/socket.io.js. E importarla antes de este JS.

//Al usar esta función establecemos la conexión mediante web sockets con el backend
const socket = io();

//Referencias de los displays
const conectedDisplay = document.getElementById("conectedDisplay");
const disconectedDisplay = document.getElementById("disconectedDisplay");

//Referencias de los inputs
const txtMsg = document.getElementById("txtMsg");
const btnMsg = document.getElementById("btnMsg");
const clientID = document.getElementById("clientID");

socket.on("connect", () => {
	conectedDisplay.style.display = "block";
	disconectedDisplay.style.display = "none";
});

socket.on("disconnect", () => {
	conectedDisplay.style.display = "none";
	disconectedDisplay.style.display = "block";
});

socket.on("respuesta-servidor", (e) => {
	console.log(e);
});

btnMsg.addEventListener("click", (e) => {
	e.preventDefault();

	//texto del input
	const mensaje = txtMsg.value;
	const id = clientID.value;
	const payload = {
		mensaje,
		//Aquí podriamos enviar al servidor el identificador del usuario para saber quien envio el mensaje. No se usa la propiedad "id" de socket.io en el backend porque es muy volátil.
		id,
		date: new Date(),
	};

	//.emit() emit nos permite enviarle un mensaje al servidor mediante web sockets.
	socket.emit("enviar-mensaje", payload, (payload) => {
		console.log(payload);
	});

	txtMsg.value = "";
});
