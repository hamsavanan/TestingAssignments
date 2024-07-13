package com.ApiTesting;

import static io.restassured.RestAssured.*;
import static io.restassured.RestAssured.given;

import org.json.simple.JSONObject;
import org.testng.annotations.Test;

import io.restassured.http.ContentType;

public class PutPatchandDeleteRequest {
//	@Test

	public void PUTRequest()
	{
		JSONObject request = new JSONObject();

		request.put("name", "Karuppiah");
		request.put("job", "Tester");

		System.out.println(request.toJSONString());

		baseURI = "https://reqres.in/api";

		given().header("Content-Type", "application/json").contentType(ContentType.JSON).
		accept(ContentType.JSON).body(request.toJSONString()).
		post("/users/2").then().statusCode(200).log().all();

	}
	@Test
public void DELETERequest() {
	baseURI = "https://reqres.in";
	
	when().delete("/api/users/2").then().statusCode(204).log().all();
	
}
	
	@Test
	public void PATCHRequest() {
		
		JSONObject request = new JSONObject();
		request.put("name","Karuppiah");
		request.put("Job","Developer");
		
         baseURI = "https://reqres.in";
		
		given().header("content-type","application/json").
		contentType(ContentType.JSON).
		accept(ContentType.JSON).
		body(request.toJSONString()).post("/api/users/2").then().statusCode(200).log().all();
		
		
		
	}
	@Test
	public void DELETERequest2() {
		
		baseURI="http://localhost:8888";
		when().delete("/student/2").then().statusCode(200).log().all();
		
	}
	

}