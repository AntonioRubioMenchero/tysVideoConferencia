package edu.uclm.esi.videochat.model;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Email {
	private final Properties properties = new Properties();
	private String serverIp;
	public void send(String destinatario, String token) {
		String smtpHost= "smtp.gmail.com";
		String startTTLS="true";
		String port="465";
		String sender="tyswebarm@gmail.com"; // REMITENTE
		String serverUser="tyswebarm@gmail.com"; // USUARIO
		String userAutentication= "true";
		String pwd="Antoniorubio1"; // PONER LA CONTRASEÑA
		//String serverIp="localhost";
		/*String fallback="true";*/
		
		try {
			this.serverIp = InetAddress.getLocalHost().getHostAddress();
		} catch (UnknownHostException e) {

			this.serverIp = "localhost";
		}
		
		properties.put("mail.smtp.host", smtpHost);
		properties.put("mail.smtp.starttls.enable", startTTLS);
		properties.put("mail.smtp.port", port);
		properties.put("mail.smtp.mail.sender", sender);
		properties.put("mail.smtp.user", serverUser);
		properties.put("mail.smtp.auth", userAutentication);
		properties.put("mail.smtp.socketFactory.port", port);
		properties.put("mail.smtp.socketFactory.class",
				"javax.net.ssl.SSLSocketFactory");
		//properties.put("mail.smtp.socketFactory.fallback", fallback);
		Runnable r = new Runnable() {
			@Override
			public void run() {
				Authenticator auth = new AutentificadorSMTP(sender, pwd);
				Session session = Session.getInstance(properties, auth);
				MimeMessage msg = new MimeMessage(session);
				try {
					msg.setSubject("Videochat-TySWeb - Confirmacion de cuenta");
					msg.setText(("<p><strong>Hola</strong></p>"
			        		+ "<p>Estás recibiendo este correo porque has creado una cuenta en videochat. Haga click en el"
			        		+ " siguiente enlace para confirmar su cuenta:</p>"
			        		+  "<a href='https://localhost:7500/users/confirmarCuenta?tokenId=" + token + "'>" + "https://localhost:7500/users/confirmarCuenta?tokenId="+ token +"</a>"
			        		+ "<p>Si no realizaste el registro , ignore este mensaje</p>"
			        		+ "<p>Saludos, Videochat</p>" 
			        		), "UTF-8", "html");
					msg.setFrom(new InternetAddress(sender));
					msg.addRecipient(Message.RecipientType.TO,
							new InternetAddress(destinatario));
					Transport.send(msg);
				} catch (Exception e) {
					System.err.println(e);
				}
			}
		};
		new Thread(r).start();
	}
	private class AutentificadorSMTP extends javax.mail.Authenticator {
		private String sender;
		private String pwd;
		public AutentificadorSMTP(String sender, String pwd) {
			this.sender = sender;
			this.pwd = pwd;
		}
		public PasswordAuthentication getPasswordAuthentication() {
			return new PasswordAuthentication(sender, pwd);
		}
	}
	public static void main(String[] args) throws Exception {
		Email sender=new Email();
		//sender.send("antonio.rubio5@alu.uclm.es", "Hola", "Hola, caracola");
		//Funciona
		System.out.println("Enviado");
	}
}