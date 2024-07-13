package com.ApiTesting;

import static io.restassured.RestAssured.baseURI;
import static io.restassured.RestAssured.get;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

import org.testng.Assert;
import org.testng.annotations.Test;

import io.restassured.response.Response;

public class ReactHomePage {

		@Test
		
		public  void HomeApiTest()  {

			Response response= get("http://localhost:8888/student");

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
		public void HomeApiTest1() {

			baseURI = "http://localhost:8888";
			given().get("/student").
			then().statusCode(200).
			body("[0].id",equalTo("1")).log().all();
			given().get("/student").
			then().statusCode(200).
			body("[0].student_email",equalTo("dhanish@gmail.com")).log().all();
			given().get("/student").
			then().statusCode(200).
			body("[0].student_name",equalTo("Dhansih")).log().all();
			given().get("/student").
			then().statusCode(200).
			body("[0].student_gender",equalTo("male")).log().all();
			
		}
	}
