package com.studentskaSluzbaAngular.payload.request;

import javax.validation.constraints.NotNull;

public class UpdateGradeRequest {
	private Long id;

	private Long userid;

	private Long subjectid;

	private int grade;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public Long getSubjectid() {
		return subjectid;
	}

	public void setSubjectid(Long subjectid) {
		this.subjectid = subjectid;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	@Override
	public String toString() {
		return "UreateGradeRequest{" +
				"userid=" + userid +
				", subjectid=" + subjectid +
				", grade=" + grade +
				'}';
	}
}
