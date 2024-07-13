package com.ApiTesting;

import org.testng.annotations.Test;
import static io.restassured.RestAssured.*;
import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;



public class JSONSchemaValidator {
	@Test
	
	public void testget() {
		baseURI ="http://localhost:8888/";
		
		given().get("/student").
		
		then().
		assertThat().body(matchesJsonSchemaInClasspath("Schema.json")).statusCode(200);
		
	}

}
