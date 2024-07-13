package com.ApiTesting;

import org.testng.Assert;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;

import io.restassured.response.Response;
import static io.restassured.matcher.RestAssuredMatchers.*;
import static org.hamcrest.Matchers.*;

public class FirstTest {

	@Test
	public  void GetApiTest()  {

		Response response= get("https://reqres.in/api/users?page=2");

		System.out.println(response.getStatusCode());
		System.out.println(response.getTime());
		System.out.println(response.getBody().asString());
		System.out.println(response.getStatusLine());
		System.out.println(response.getHeader("content-type"));


		int statuscode = response.getStatusCode();
		Assert.assertEquals(statuscode,200);
	}

	//BDD FrameWork
	@Test                 
	public void GetApiTest1() {

		baseURI = "https://reqres.in/api";
		given().get("/users?page=2").then().statusCode(200).body("data[1].id",equalTo(8)).log().all();
		given().get("/users?page=2").then().statusCode(200).body("data[0].email",equalTo("michael.lawson@reqres.in")).log().all();
		given().get("/users?page=2").then().statusCode(200).body("data[1].first_name",equalTo("Lindsay")).log().all();
		given().get("/users?page=2").then().statusCode(200).body("data[1].last_name",equalTo("Ferguson")).log().all();
		
	}



}
