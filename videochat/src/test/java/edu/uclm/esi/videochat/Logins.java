package edu.uclm.esi.videochat;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

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
public class Logins {
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
	  public void logins() {
		chrome.get("https://localhost:7500/");
		  
		 try {
		  		Thread.sleep(1000);
		  	} catch (InterruptedException e) {
		  		// TODO Auto-generated catch block
		  		e.printStackTrace();
		  	}
//	    chrome.findElement(By.id("details-button")).click();
//	    chrome.findElement(By.id("proceed-link")).click();
		 
		 
	    chrome.manage().window().setSize(new Dimension(1184, 683));
	    chrome.findElement(By.cssSelector(".oj-hybrid-padding")).click();
	    chrome.findElement(By.cssSelector(".oj-sm-12:nth-child(1) > input")).clear();
	    chrome.findElement(By.cssSelector(".oj-sm-12:nth-child(1) > input")).sendKeys("Pepe");
	    chrome.findElement(By.cssSelector(".oj-sm-12:nth-child(2) > input")).clear();
	    chrome.findElement(By.cssSelector(".oj-sm-12:nth-child(2) > input")).sendKeys("1234");
	    chrome.findElement(By.cssSelector("button")).click();
	    
	    try {
	  		Thread.sleep(1000);
	  	} catch (InterruptedException e) {
	  		// TODO Auto-generated catch block
	  		e.printStackTrace();
	  	};
	    
	    assertThat(chrome.findElement(By.cssSelector(".oj-hybrid-padding > h1")).getText(), is("Fantástico videochat"));
	    
	    firefox.get("https://localhost:7500/");
	    
	    try {
	  		Thread.sleep(1000);
	  	} catch (InterruptedException e) {
	  		// TODO Auto-generated catch block
	  		e.printStackTrace();
	  	}
	    
	    firefox.manage().window().setSize(new Dimension(1184, 683));
	    firefox.findElement(By.cssSelector(".oj-hybrid-padding")).click();
	    firefox.findElement(By.cssSelector(".oj-sm-12:nth-child(1) > input")).clear();
	    firefox.findElement(By.cssSelector(".oj-sm-12:nth-child(1) > input")).sendKeys("Lucas");
	    firefox.findElement(By.cssSelector(".oj-sm-12:nth-child(2) > input")).clear();
	    firefox.findElement(By.cssSelector(".oj-sm-12:nth-child(2) > input")).sendKeys("1234");
	    firefox.findElement(By.cssSelector("button")).click();
	    
	    try {
	  		Thread.sleep(1000);
	  	} catch (InterruptedException e) {
	  		// TODO Auto-generated catch block
	  		e.printStackTrace();
	  	}
	    
	    
	    assertThat(firefox.findElement(By.cssSelector(".oj-hybrid-padding > h1")).getText(), is("Fantástico videochat"));

	    edge.get("https://localhost:7500/");
	    
	    try {
	  		Thread.sleep(1000);
	  	} catch (InterruptedException e) {
	  		// TODO Auto-generated catch block
	  		e.printStackTrace();
	  	}
	    
	    edge.manage().window().setSize(new Dimension(1184, 683));
	    edge.findElement(By.cssSelector(".oj-hybrid-padding")).click();
	    edge.findElement(By.cssSelector(".oj-sm-12:nth-child(1) > input")).clear();
	    edge.findElement(By.cssSelector(".oj-sm-12:nth-child(1) > input")).sendKeys("Ana");
	    edge.findElement(By.cssSelector(".oj-sm-12:nth-child(2) > input")).clear();
	    edge.findElement(By.cssSelector(".oj-sm-12:nth-child(2) > input")).sendKeys("1234");
	    edge.findElement(By.cssSelector("button")).click();
	    
	    try {
	  		Thread.sleep(1000);
	  	} catch (InterruptedException e) {
	  		// TODO Auto-generated catch block
	  		e.printStackTrace();
	  	}
	    
	    assertThat(edge.findElement(By.cssSelector(".oj-hybrid-padding > h1")).getText(), is("Fantástico videochat"));

	    
	  }


}
