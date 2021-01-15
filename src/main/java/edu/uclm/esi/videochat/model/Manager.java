package edu.uclm.esi.videochat.model;

import java.util.Enumeration;
import java.util.List;
import java.util.Optional;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import edu.uclm.esi.videochat.springdao.MessageRepository;
import edu.uclm.esi.videochat.springdao.UserRepository;

@Component
public class Manager {
	
	private ConcurrentHashMap<String, User> usersMap;
	private ConcurrentHashMap<String, HttpSession> sessions;
	
	@Autowired
	private MessageRepository messageRepo;
	@Autowired
	private UserRepository userRepo;
	
	public MessageRepository getMessageRepo() {
		return messageRepo;
	}

	private Manager() {
		this.usersMap = new ConcurrentHashMap<>();
		this.sessions = new ConcurrentHashMap<>();
	}
	
	private static class ManagerHolder {
		static Manager singleton=new Manager();
	}
	
	@Autowired
	public void print() {

		System.out.println("Creando manager");
	}
	
	@Bean
	public static Manager get() {
		return ManagerHolder.singleton;
	}
	
	public void add(User user) {
		usersMap.put(user.getName(), user);
	}
	
	public void remove(User user) {
		this.usersMap.remove(user.getName());
	}
	
	public Vector<String> getUsuariosConectados() {
		Vector<String> users = new Vector<>();
		
		Enumeration<User> eUsers = this.usersMap.elements();
		while (eUsers.hasMoreElements()) {
			User user = eUsers.nextElement();
			users.add(user.getName());
		}
		return users;
	}
	
	public String getPicture(String name) {
		Optional<User> user = userRepo.findByName(name);
		return user.get().getPicture();
	}

	public HttpSession getSession(String sessionId) {
		return this.sessions.get(sessionId);
	}

	public void add(HttpSession session) {
		this.sessions.put(session.getId(), session);
	}

	public User findUser(String userName) {
		return this.usersMap.get(userName);
	}
	
	public List<User> getUsuarios(){
		List<User> users = userRepo.SelectAll();
		return users;
	}
	
}
