
package com.ApiTesting;

import static io.restassured.RestAssured.*;

import static io.restassured.RestAssured.*;
import static io.restassured.RestAssured.given;

import org.json.simple.JSONObject;
import org.testng.annotations.Test;

import io.restassured.http.ContentType;
import static io.restassured.RestAssured.given;

import org.json.simple.JSONObject;
import org.testng.annotations.Test;

import io.restassured.http.ContentType;

public class PutApiTseting {
	
	@Test
	public void PUTRequest() {
		
		JSONObject request = new JSONObject();
		request.put("name","vijay");
		request.put("Job","Developer");
		System.out.println(request.toJSONString());
		
		baseURI = "http://localhost:8888";
		
		given().header("content-type","application/json").
		contentType(ContentType.JSON).
		accept(ContentType.JSON).
		body(request.toJSONString()).put("/foodMenu/1").then().statusCode(200).log().all();	
		
	}
	
	@Test
	public void PATCHRequest() {
		
		JSONObject request = new JSONObject();
		request.put("name","vijay");
		request.put("Job","Developer");
		
         baseURI = "http://localhost:8888";
		
		given().header("content-type","application/json").
		contentType(ContentType.JSON).
		accept(ContentType.JSON).
		body(request.toJSONString()).patch("/foodMenu/2").then().statusCode(200).log().all();
		
		
		
	}
	
	
	@Test
	public void DELETERequest() {
		
		baseURI = "http://localhost:8888";
		
		when().delete("/foodMenu/1").then().statusCode(200).log().all();
		
		
	}
			

}
