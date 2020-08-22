package com.studentskaSluzbaAngular.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(	name = "subjects",
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "id")
		})
public class Subject {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 50)
	private String name;

	@ManyToMany(mappedBy = "subjects")
	@JsonBackReference
	
	private Set<User> users = new HashSet<>();

	public Subject() {
	}

	public Subject(String name) {
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

	@Override
	public String toString() {
		return "Subject{" +
				"id=" + id +
				", name='" + name + '\'' +
				", users=" + users +
				'}';
	}
}
