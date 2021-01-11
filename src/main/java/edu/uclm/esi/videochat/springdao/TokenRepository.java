package edu.uclm.esi.videochat.springdao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.uclm.esi.videochat.model.Token;


public interface TokenRepository extends CrudRepository <Token, String> {

	@Query(value = "Select * from token where email=:email", nativeQuery=true)
	public Token findByMail(@Param("email") String email);
	
	
}
