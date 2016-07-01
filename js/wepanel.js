$(document).ready(function() {
	console.log("Ejecutando");
	var ws = new WebSocket("ws://52.53.217.5:8001/");

	ws.onopen = function (e) {
		console.log("Ws conectado.");
	};

	ws.onclose = function (e) {
		console.log("Desconectado "+ e.reason);
	};

	ws.onerror = function (e) {
		console.log("Error ");
	};

	ws.onmessage = function (e) {
		var recivido=JSON.parse(e.data);
		$("#voltage").html(recivido.v);
	};
});