package edu.uclm.esi.videochat;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import edu.uclm.esi.videochat.springdao.UserRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class LlamadaRechazoTest {
		 private WebDriver chrome;
		  private WebDriver firefox;
		  private WebDriver edge;
		  
		  @Autowired
		  UserRepository userRepo; 
		  
		  private Map<String, Object> vars;
		  JavascriptExecutor js;
		  
		  @Before
		  public void setUp() {
			System.setProperty("webdriver.chrome.driver", "C:\\Users\\Antonio Rubio\\Documents\\universidad\\Drivers\\chromedriver.exe");
			System.setProperty("webdriver.gecko.driver", "C:\\Users\\Antonio Rubio\\Documents\\universidad\\Drivers\\geckodriver.exe");
			System.setProperty("webdriver.edge.driver", "C:\\Users\\Antonio Rubio\\Documents\\universidad\\Drivers\\msedgedriver.exe");
			edge = new EdgeDriver();
			chrome = new ChromeDriver();
		    firefox = new FirefoxDriver();
		    js = (JavascriptExecutor) chrome;
		    vars = new HashMap<String, Object>();
		  }
		  @After
		  public void tearDown() {
		    chrome.quit();
		    firefox.quit();
		    edge.quit();
		  }
		  
		  @Test
		  public void LlamadaRechazo() {
			 hacerLogin(chrome, "Pepe", "1234");
			 hacerLogin(firefox, "Ana","1234");
			  
		    
		  }
		  
		  private void hacerLogin(WebDriver driver, String nombre, String contraseña) {
			  driver.get("https://localhost:7500/");

			  //  chrome.findElement(By.id("details-button")).click();
			  //  chrome.findElement(By.id("proceed-link")).click();


			  driver.manage().window().setSize(new Dimension(1184, 683));
			  driver.findElement(By.cssSelector(".oj-hybrid-padding")).click();
			  driver.findElement(By.cssSelector(".oj-sm-12:nth-child(1) > input")).clear();
			  driver.findElement(By.cssSelector(".oj-sm-12:nth-child(1) > input")).sendKeys(nombre);
			  driver.findElement(By.cssSelector(".oj-sm-12:nth-child(2) > input")).clear();
			  driver.findElement(By.cssSelector(".oj-sm-12:nth-child(2) > input")).sendKeys(contraseña);
			  driver.findElement(By.cssSelector("button")).click();

			  driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);


		  }
		  
		  


	


}