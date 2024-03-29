define(['knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils'],
		function(ko, app, moduleUtils, accUtils) {

	function ChatViewModel() {
		var self = this;
		self.estado = ko.observable("No conectado");
		self.error = ko.observable("");

		self.mensajesRecibidos = ko.observableArray([]);
		self.mensajeQueVoyAEnviar = ko.observable("");
		self.conversaciones = ko.observableArray([]);
		
		self.recipient = ko.observable("");

		self.usuarios = ko.observableArray([]);
		
		self.picture = ko.observable(app.user.picture);
		
		

		self.chat = null;
		var localPeerConnection;
		var remotePeerConnection;
		
		var localStream;
		var remoteStream;

		// Header Config
		self.headerConfig = ko.observable({'view':[], 'viewModel':null});
		moduleUtils.createView({'viewPath':'views/header.html'}).then(function(view) {
			self.headerConfig({'view':view, 'viewModel': app.getHeaderModel()})
		})

		self.connected = function() {
			accUtils.announce('Chat page loaded.');
			document.title = "Chat";

			getUsuariosConectados();

			self.chat = new WebSocket("wss://" + window.location.host + "/wsGenerico");
			self.chat.onopen = function() {
				self.estado("Conectado al servidor");
			}

			self.chat.onmessage = function(event) {
				var data = JSON.parse(event.data);
				if (data.type == "FOR ALL") {
					var mensaje = new Mensaje(data.message, data.time);
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
					var conversacionActual = buscarConversacion(data.remitente);
					if (conversacionActual!=null) {
						var mensaje = new Mensaje(data.message.message, data.message.time);
						conversacionActual.addMensaje(mensaje);
					} else {
						conversacionActual = new Conversacion(ko, data.remitente, self.chat);
						var mensaje = new Mensaje(data.message.message, data.message.time);
						conversacionActual.addMensaje(mensaje);
						self.conversaciones.push(conversacionActual);
					}
					ponerVisible(data.remitente);
				} else if (data.type == "SOLICITUD_VIDEO") {
					var remitente = data.remitente;
					var respuesta = window.confirm(remitente + " quiere hacer una videoconferencia contigo. ¿Estás de acuerdo?");
					if (respuesta) {
						console.log("La videoconferencia ha sido aceptada")	
						var mensaje = {
								type : "ACEPTACION",
								destinatario : remitente
							};
							self.chat.send(JSON.stringify(mensaje));
							//self.prepepararVideollamada();
					} else {
						var mensaje = {
							type : "RECHAZO",
							destinatario : remitente
						};
						self.chat.send(JSON.stringify(mensaje));
					}
				} else if (data.type == "RECHAZO") {
					alert("Se ha rechazado tu solicitud de videoconferencia");
				} else if (data.type == "ACEPTACION"){
					//self.prepararVideollamada();
				}
				
			}

			self.chat.onclose = function() {
				self.estado("WebSocket cerrado");
			}
		};
		
		function buscarConversacion(nombreInterlocutor) {
			for (var i=0; i<self.conversaciones().length; i++) {
				if (self.conversaciones()[i].nombreInterlocutor==nombreInterlocutor)
					return self.conversaciones()[i];
			}
			return null;
		}

		self.enviarATodos = function() {
			var mensaje = {
				type : "BROADCAST",
				message : self.mensajeQueVoyAEnviar()
			};
			self.chat.send(JSON.stringify(mensaje));
		}
		
		self.setRecipient = function(interlocutor) {
			self.recipient(interlocutor);
			var conversacion = buscarConversacion(interlocutor.nombre);
			if (conversacion==null) {
				conversacion = new Conversacion(ko, interlocutor.nombre, self.chat);
				self.conversaciones.push(conversacion);
			}
			ponerVisible(interlocutor.nombre);
		}
		
		function ponerVisible(nombreInterlocutor) {
			for (var i=0; i<self.conversaciones().length; i++) {
				var conversacion = self.conversaciones()[i];
				conversacion.visible(conversacion.nombreInterlocutor == nombreInterlocutor);
			}
		}

		function getUsuariosConectados() {
			var data = {	
					url : "getUsuariosConectados",
					type : "get",
					contentType : 'application/json',
					success : function(response) {
						for (var i=0; i<response.length; i++) {
							var userName = response[i].name;
							var picture = response[i].picture;
							self.usuarios.push(new Usuario(userName, picture));
						}
					},
					error : function(response) {
						self.error(response.responseJSON.error);
					}
			};
			$.ajax(data);
		}

		self.encenderCamara = function() {
			var caracteristicas = {
				audio: true, 
				video: { width: 300, height: 300 },
			};
			navigator.mediaDevices.getUserMedia(caracteristicas).
			then(function(stream) {
				var widgetVideo = document.getElementById("widgetVideo");
				widgetVideo.srcObject = stream;
			});
		}

		self.disconnected = function() {
			self.chat.close();
		};

		self.transitionCompleted = function() {
			// Implement if needed
		};
	}

	return ChatViewModel;
}
);
