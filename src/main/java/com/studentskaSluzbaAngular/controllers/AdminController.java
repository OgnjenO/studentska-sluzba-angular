package com.studentskaSluzbaAngular.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentskaSluzbaAngular.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/getUsers")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getUsers() {
		List users = userRepository.findAll();
		return ResponseEntity.ok(users);
	}
}
