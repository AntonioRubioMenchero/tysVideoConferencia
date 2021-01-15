class Chat {
	constructor(ko) {
		let self = this;
		this.ko = ko;
		
		this.estado = ko.observable("");
		this.error = ko.observable();
		
		this.usuarios = ko.observableArray([]);
		
		
		
		this.mensajesRecibidos = ko.observableArray([]);
		this.conversaciones = ko.observableArray([]);
		
		this.conversadores = ko.observable("");
		this.historial = ko.observableArray([]);
		
		this.listadoUsuarios = ko.observableArray([]);
		
		this.destinatario = ko.observable("");
		this.mensajeQueVoyAEnviar = ko.observable("");
		
		this.chat = new WebSocket("wss://" + window.location.host + "/wsTexto");
		
		this.chat.onopen = function() {
			self.estado("Conectado al chat de texto");
			
			self.error("");
		}

		this.chat.onerror = function() {
			self.estado("");
			self.error("Chat de texto cerrado");
		}

		this.chat.onclose = function() {
			self.estado("");
			self.error("Chat de texto cerrado");
		}
		
		this.chat.onmessage = function(event) {
			var data = JSON.parse(event.data);
			if (data.type == "FOR ALL") {
				var mensaje = new Mensaje(data.message, data.time, data.user);
				self.mensajesRecibidos.push(mensaje);
			} else if (data.type == "ARRIVAL") {
				var usuario = new Usuario(data.userName, data.picture);
				self.usuarios.push(usuario);
				
			} else if (data.type == "BYE") {
				var userName = data.userName;
				for (var i=0; i<self.usuarios().length; i++) {
					if (self.usuarios()[i].nombre == userName) {
						self.usuarios.splice(i, 1);
						break;
					}
				}
			} else if (data.type == "PARTICULAR") {
				var conversacionActual = self.buscarConversacion(data.remitente);
				if (conversacionActual!=null) {
					var mensaje = new Mensaje(data.message.message, data.message.time,data.message.sender);
					conversacionActual.addMensaje(mensaje);
				} else {
					conversacionActual = new Conversacion(ko, data.remitente, self);
					var mensaje = new Mensaje(data.message.message, data.message.time,data.message.sender);
					conversacionActual.addMensaje(mensaje);
					self.conversaciones.push(conversacionActual);
				}
				self.ponerVisible(data.remitente);
			} else if (data.type == "HISTORIAL") {
				self.conversadores = data.conversacion.conversadores
				
				for(var i=0; i<data.conversacion.mensajes.length; i++){
					var mensajeHistorial = new MensajeHistorial(data.conversacion.mensajes[i].Sender,
							data.conversacion.mensajes[i].Recipient,
							data.conversacion.mensajes[i].Message,
							data.conversacion.mensajes[i].Date
							);
					self.historial.push(mensajeHistorial);
				}
				
			}
		}
	}
	
	close() {
		this.chat.close();
	}
	
	enviar(mensaje) {
		this.chat.send(JSON.stringify(mensaje));
	}
	
	enviarATodos(mensaje) {
		var mensaje = {
			type : "BROADCAST",
			message : this.mensajeQueVoyAEnviar()
		};
		
		this.chat.send(JSON.stringify(mensaje));
		this.mensajeQueVoyAEnviar("");
	}
	
	buscarConversacion(nombreInterlocutor) {
		for (var i=0; i<this.conversaciones().length; i++) {
			if (this.conversaciones()[i].nombreInterlocutor==nombreInterlocutor)
				return this.conversaciones()[i];
		}
		return null;
	}
	
	setDestinatario(interlocutor) {
		this.destinatario(interlocutor.nombre);
		var conversacion = this.buscarConversacion(interlocutor.nombre);
		if (conversacion==null) {
			conversacion = new Conversacion(this.ko, interlocutor.nombre, this);
			this.conversaciones.push(conversacion);
		}
		this.ponerVisible(interlocutor.nombre);
	}
	
	ponerVisible(nombreInterlocutor) {
		for (var i=0; i<this.conversaciones().length; i++) {
			var conversacion = this.conversaciones()[i];
			conversacion.visible(conversacion.nombreInterlocutor == nombreInterlocutor);
		}
	}
	
	addUsuario(userName, picture) {
		this.usuarios.push(new Usuario(userName, picture));
	}
	addUsuarioAsync(user){
		this.usuarios.push(new Usuario(user.userName, user.picture));
	}
	addUsuarioRegistrado(userName, picture) {
		this.listadoUsuarios.push(new Usuario(userName, picture));
	}
	
	solicitarHistorial(conversador){
		var mensaje = {
				type : "HISTORIAL",
				conversador : conversador.nombre
			};
		this.chat.send(JSON.stringify(mensaje));
		this.historial([]);	
	}
}
	