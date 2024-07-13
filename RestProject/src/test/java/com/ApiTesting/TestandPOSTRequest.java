package com.ApiTesting;

import static io.restassured.RestAssured.baseURI;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

import static org.hamcrest.Matchers.hasItems;

import java.util.*;

import javax.swing.text.AbstractDocument.Content;

import org.json.simple.JSONObject;
import org.testng.annotations.Test;

import io.restassured.http.ContentType;

public class TestandPOSTRequest {

	@Test                 
	public void GETRequest() {
		//		 1st validation by id
		baseURI = "https://reqres.in/api";
		given().get("/unkown").then().statusCode(200).body("data[0].id",equalTo(1)).log().all();


		//		2nd validation by name
		given().get("/unkown").
		then().statusCode(200).
		body("data[1].name",equalTo("fuchsia rose")).
		body("data[1].id",equalTo(2));


	} 
@Test
 public void GETRequest1() {
	 baseURI = "https://reqres.in/api";
		given().get("/users?page=2").
		then().statusCode(200).body("data.first_name", hasItems("Lindsay","Tobias"));
 }
@Test
 public void POSTRequest() {
 	
 	Map<String, Object> map = new HashMap<String, Object>();
 	
 	JSONObject request = new JSONObject(map);
 	
 	request.put("name", "Karuppiah");
 	request.put("job", "Tester");
 	request.put("student_name", "Karuppiah");

 	System.out.println(request.toJSONString());
 	
 	baseURI = "https://reqres.in/api";
	baseURI = "http://localhost:8888";
 	given().header("Content-Type", "application/json").contentType(ContentType.JSON).
	accept(ContentType.JSON).body(request.toJSONString()).
	post("/student").then().statusCode(201).log().all();
 	
 }
}
