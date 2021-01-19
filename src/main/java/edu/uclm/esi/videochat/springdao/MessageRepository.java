package edu.uclm.esi.videochat.springdao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.uclm.esi.videochat.model.Message;


public interface MessageRepository extends CrudRepository <Message, String> {
	
	public Message findBySender(String sender);
	
	@Query(value = "SELECT * FROM message where (sender=:sender or recipient=:sender) and (sender=:recipient or recipient=:recipient)", nativeQuery = true)
	public List<Message> findConversacion(@Param("sender") String sender,@Param("recipient") String recipient);
	
	@Query(value = "SELECT * FROM message where sender=:sender and recipient='all'", nativeQuery = true)
	public List<Message> findConversacionGlobal(@Param("sender") String sender);
	
	@Query(value = "SELECT * FROM message where recipient='all'", nativeQuery = true)
	public List<Message> findConversacionAll();
	

}
