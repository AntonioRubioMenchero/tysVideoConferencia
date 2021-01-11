class MensajeHistorial {
	constructor(sender, recipient , texto, hora ) {
		this.sender = sender ? sender : null;
		this.recipient = recipient ? recipient:null;
		this.texto = texto;
		this.hora = hora ? hora : Date.now();
		
	}
}