package com.studentskaSluzbaAngular.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@GetMapping("/all")
	public boolean allAccess() {
		return true;
	}
	
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public boolean userAccess() {
		return true;
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public boolean moderatorAccess() {
		return true;
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public int[] adminAccess() {
		int [] r = new int[3];
		r[0] = 0;
		r[1] = 1;
		r[2] = 2;
		return r;
	}
}
