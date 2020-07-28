package com.studentskaSluzbaAngular.models;

import javax.persistence.*;

@Entity
public class ClassUsers {
	@EmbeddedId
	private ClassUsersId id = new ClassUsersId();
	
	@ManyToOne
	@MapsId("classid")
	@JoinColumn(name="class_id")
	private Class classs;
	
	@ManyToOne
	@MapsId("userid")
	private User user;
	
	private boolean isProfessor;

	public Class getClasss() {
		return classs;
	}

	public void setClasss(Class classs) {
		this.classs = classs;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public boolean isProfessor() {
		return isProfessor;
	}

	public void setProfessor(boolean isProfessor) {
		this.isProfessor = isProfessor;
	}
}
