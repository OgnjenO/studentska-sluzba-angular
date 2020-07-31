package com.studentskaSluzbaAngular.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "classes", 
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "id")
		})
public class Class {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 50)
	private String name;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "class_users", 
				joinColumns = @JoinColumn(name = "class_id"), 
				inverseJoinColumns = @JoinColumn(name = "user_id"))
	
	private Set<User> users = new HashSet<>();

	public Class() {
	}

	public Class(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}
}
