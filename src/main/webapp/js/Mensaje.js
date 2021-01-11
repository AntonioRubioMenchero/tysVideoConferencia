class Mensaje {
	constructor(texto, hora, user) {
		this.texto = texto;
		this.hora = hora ? hora : Date.now();
		this.user = user ? user : null;
	}
}