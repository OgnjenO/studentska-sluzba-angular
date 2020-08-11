package com.studentskaSluzbaAngular.payload.response;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.studentskaSluzbaAngular.models.Class;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private String firstname;
	private String lastname;
	private int year;
	private int grade;
	private Set<Class> classes = new HashSet<>();
	private List<String> roles;

	public JwtResponse(String accessToken, Long id, String username, String email,
			String firstname, String lastname, int year, int grade, Set<Class> classes,
			List<String> roles) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.year = year;
		this.grade = grade;
		this.classes = classes;
		this.roles = roles;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}

	public String getFirstname() {
		return firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public int getYear() {
		return year;
	}

	public int getGrade() {
		return grade;
	}

	public Set<Class> getClasses() {
		return classes;
	}
}
