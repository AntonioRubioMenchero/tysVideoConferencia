package edu.uclm.esi.videochat.websockets;



import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.JsonObject;
import com.mysql.cj.x.protobuf.MysqlxCrud.Collection;

import edu.uclm.esi.videochat.model.Manager;
import edu.uclm.esi.videochat.model.Message;
import edu.uclm.esi.videochat.model.User;


@Component
public class WebSocketTexto extends WebSocketVideoChat {
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		session.setBinaryMessageSizeLimit(1000*1024*1024);
		session.setTextMessageSizeLimit(64*1024);
		
		User user = getUser(session);
		user.setSessionTexto(session);

		JSONObject mensaje = new JSONObject();
		mensaje.put("type", "ARRIVAL");
		mensaje.put("userName", user.getName());
		mensaje.put("picture", user.getPicture());
		
		this.broadcast(mensaje);
		
		WrapperSession wrapper = new WrapperSession(session, user);
		this.sessionsByUserName.put(user.getName(), wrapper);
		this.sessionsById.put(session.getId(), wrapper);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JSONObject jso = new JSONObject(message.getPayload());
		String type = jso.getString("type");
		
		String enviador = getUser(session).getName();
		
		if (type.equals("BROADCAST")) {
			JSONObject jsoMessage = new JSONObject();
			jsoMessage.put("type", "FOR ALL");
			jsoMessage.put("time", formatDate(System.currentTimeMillis()));
			jsoMessage.put("message", jso.getString("message"));
			jsoMessage.put("user", enviador);
			broadcast(jsoMessage);
			Message mensaje = new Message();
			mensaje.setMessage(jso.getString("message"));
			mensaje.setSender(enviador);
			mensaje.setDate(System.currentTimeMillis());
			guardarMensaje(mensaje);
		} else if (type.equals("PARTICULAR")) {
			String destinatario = jso.getString("destinatario");
			User user = Manager.get().findUser(destinatario);
			WebSocketSession navegadorDelDestinatario = user.getSessionTexto();
			
			JSONObject jsoMessage = new JSONObject();
			jsoMessage.put("time", formatDate(System.currentTimeMillis()));
			jsoMessage.put("message", jso.get("texto"));
			jsoMessage.put("sender", enviador );
			
			this.send(navegadorDelDestinatario, "type", "PARTICULAR", "remitente", enviador, "message", jsoMessage);
			System.out.println("Se envia mensaje de " + enviador);
			Message mensaje = new Message();
			mensaje.setMessage(jso.getString("texto"));
			mensaje.setSender(enviador);
			mensaje.setRecipient(destinatario);
			mensaje.setDate(System.currentTimeMillis());
			guardarMensaje(mensaje);
			
		} else if (type.equals("HISTORIAL")) {
			String conversador = jso.getString("conversador");
			List<Message> l = getHistorial(enviador, conversador);
			Collections.sort(l);
			String conversacion = enviador + "-" + conversador; 
			
			JSONObject historialjson = new JSONObject();
			
			
			historialjson.put("conversadores" , conversacion );
			
			JSONArray conversacionjson = new JSONArray();
			for (int i = 0; i < l.size(); i++) {
				JSONObject aux = new JSONObject();
				aux.put("Sender", l.get(i).getSender());
				aux.put("Recipient", l.get(i).getRecipient());
				aux.put("Message", l.get(i).getMessage());
				aux.put("Date", formatDate(l.get(i).getDate()));
				
				conversacionjson.put(aux);
				
			}
			
			historialjson.put("mensajes", conversacionjson);
			this.send(session,"type", "HISTORIAL" , "conversacion" , historialjson);
		}
	}

	private void guardarMensaje(Message mensaje) {
		Manager.get().getMessageRepo().save(mensaje);
		//List<Message> l= Manager.get().getMessageRepo().findConversacion(mensaje.getSender(), mensaje.getRecipient());	
	}
	
	private List<Message> getHistorial(String usuarioA,String usuarioB){
		List<Message> listado = Manager.get().getMessageRepo().findConversacion(usuarioA, usuarioB); 
		return listado;	
	}

	@Override
	protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
		session.setBinaryMessageSizeLimit(1000*1024*1024);
		
		byte[] payload = message.getPayload().array();
		System.out.println("La sesión " + session.getId() + " manda un binario de " + payload.length + " bytes");
	}
}
