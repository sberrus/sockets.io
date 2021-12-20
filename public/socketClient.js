//Antes de usar esta función hay que comprobar que se tenga el js de socket IO yendo a la ruta http://localhost:8080/socket.io/socket.io.js. E importarla antes de este JS.

//Al usar esta función establecemos la conexión mediante web sockets con el backend
const socket = io();
const conectionDisplay = document.getElementById("conectionDisplay");
conectionDisplay.classList.add("border-danger", "bg-warning");

socket.on("connect", () => {
	conectionDisplay.classList.remove("border-danger", "bg-warning");
	conectionDisplay.classList.add("border-success", "bg-success", "text-light");
	conectionDisplay.textContent = "Conección establecida con servidor";
	console.log("conectado");
});

socket.on("disconnect", () => {
	conectionDisplay.classList.remove("border-success", "bg-success", "text-light");
	conectionDisplay.classList.add("border-danger", "bg-warning");
	conectionDisplay.textContent = "Servidor Desconectado";
	console.log("No hay conexión con el servidor");
});
