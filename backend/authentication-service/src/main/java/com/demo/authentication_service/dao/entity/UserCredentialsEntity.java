package com.demo.authentication_service.dao.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.annotation.Documented;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "user")
public class UserCredentialsEntity {
	@Id
	private String id;

	private String name;
	private String email;
	private String password;
	//private String role;
}
