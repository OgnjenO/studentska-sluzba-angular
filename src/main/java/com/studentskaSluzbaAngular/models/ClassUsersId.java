package com.studentskaSluzbaAngular.models;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.*;

@Embeddable
public class ClassUsersId implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long classid;
	
	private Long userid;

	public ClassUsersId() {
	}

	public ClassUsersId(Long classid, Long userid) {
		this.classid = classid;
		this.userid = userid;
	}

	public Long getClassid() {
		return classid;
	}

	public void setClassid(Long classid) {
		this.classid = classid;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	@Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result
                + ((classid == null) ? 0 : classid.hashCode());
        result = prime * result
                + ((classid == null) ? 0 : classid.hashCode());
        return result;
    }
 
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ClassUsersId other = (ClassUsersId) obj;
        return Objects.equals(getClassid(), other.getClassid()) && Objects.equals(getUserid(), other.getUserid());
    }
}
