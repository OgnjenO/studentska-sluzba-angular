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
}
