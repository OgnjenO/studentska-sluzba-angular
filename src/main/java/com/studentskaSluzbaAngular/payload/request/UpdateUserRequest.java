package com.studentskaSluzbaAngular.payload.request;

import javax.validation.constraints.*;
 
public class UpdateUserRequest {
	@NotNull
	private Long id;

	@Size(max = 20)
	private String username;

	@Size(max = 50)
	@Email
	private String email;
	
	@Size(max = 20)
	private String firstname;
	
	@Size(max = 20)
	private String lastname;
	
	private int year;
	
	private int grade;
	
	private String role;
	
	private Long classs;

	@Size(max = 120)
	private String password;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	

	public Long getClasss() {
		return classs;
	}

	public void setClasss(Long classs) {
		this.classs = classs;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "UpdateUserRequest [id=" + id + ", username=" + username + ", email=" + email + ", firstname="
				+ firstname + ", lastname=" + lastname + ", year=" + year + ", grade=" + grade + ", role=" + role
				+ ", password=" + password + "]";
	}    
}
