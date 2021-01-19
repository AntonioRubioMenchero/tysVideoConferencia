package edu.uclm.esi.videochat.springdao;

import java.util.List;
import java.util.Optional;
import java.util.Vector;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.uclm.esi.videochat.model.User;

public interface UserRepository extends CrudRepository <User, String> {

	
	@Query(value = "SELECT count(*) FROM user where name=:name and pwd=:pwd", nativeQuery = true)
	public int checkPassword(@Param("name") String name,@Param("pwd") String pwd);

	@Query(value = "Select * from user where email=:email", nativeQuery=true)
	public User findByMail(@Param("email") String email);
		
	@Query(value = "Select * from user ", nativeQuery=true)
	public List<User> SelectAll();
	
	@Query(value = "Select email from user ", nativeQuery=true)
	public Vector<String> getEmail();
	
	public User findByNameAndPwd(String name, String pwd);
	public Optional<User> findByName(String name);
}
