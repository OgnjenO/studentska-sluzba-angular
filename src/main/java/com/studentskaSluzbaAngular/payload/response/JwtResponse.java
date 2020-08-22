package com.studentskaSluzbaAngular.payload.response;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.studentskaSluzbaAngular.models.Subject;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private final String firstname;
	private final String lastname;
	private final int year;
	private final int grade;
	private Set<Subject> subjects = new HashSet<>();
	private final List<String> roles;

	public JwtResponse(String accessToken, Long id, String username, String email,
			String firstname, String lastname, int year, int grade, Set<Subject> subjects,
			List<String> roles) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.year = year;
		this.grade = grade;
		this.subjects = subjects;
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

	public Set<Subject> getSubjects() {
		return subjects;
	}
}
