package com.studentskaSluzbaAngular.payload.request;

import javax.validation.constraints.NotNull;

public class CreateGradeRequest {
	@NotNull
	private Long userid;

	@NotNull
	private Long subjectid;

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

	@Override
	public String toString() {
		return "CreateGradeRequest{" +
				"userid=" + userid +
				", subjectid=" + subjectid +
				'}';
	}
}
