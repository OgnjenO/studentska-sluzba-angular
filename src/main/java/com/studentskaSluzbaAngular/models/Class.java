package com.studentskaSluzbaAngular.models;

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

	public Class() {
	}

	public Class(Long id, String name) {
		this.id = id;
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

	public void setUsername(String name) {
		this.name = name;
	}
}
