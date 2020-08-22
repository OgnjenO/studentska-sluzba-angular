package com.studentskaSluzbaAngular.security.services;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.studentskaSluzbaAngular.models.Role;
import com.studentskaSluzbaAngular.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.studentskaSluzbaAngular.models.Subject;

public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private final Long id;

	private final String username;

	private final String email;

	private final String firstname;

	private final String lastname;

	private final int year;

	private final int grade;

	private Set<Role> roles = new HashSet<>();

	private Set<Subject> subjects = new HashSet<>();

	@JsonIgnore
	private final String password;

	private final Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(Long id, String username, String email, String firstname, String lastname, int year,
			int grade, Set<Role> roles, Set<Subject> subjects, String password,
			Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.year = year;
		this.grade = grade;
		this.roles = roles;
		this.subjects = subjects;
		this.password = password;
		this.authorities = authorities;
	}

	public static UserDetailsImpl build(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());
		System.out.println(user.getSubjects().toString());

		return new UserDetailsImpl(user.getId(), user.getUsername(), user.getEmail(), user.getFirstname(),
				user.getLastname(), user.getYear(), user.getGrade(), user.getRoles(), user.getSubjects(),
				user.getPassword(), authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
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

	public Set<Role> getRoles() {
		return roles;
	}

	public Set<Subject> getSubjects() {
		return subjects;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
}
