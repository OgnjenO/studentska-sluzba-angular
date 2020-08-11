package com.studentskaSluzbaAngular.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentskaSluzbaAngular.models.Class;
import com.studentskaSluzbaAngular.repository.ClassRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/global")
public class GlobalController {
	@Autowired
	ClassRepository classRepository;
	
	@GetMapping("/classes/getClasses")
	public ResponseEntity<?> getClasses() {
		List<Class> Classs = classRepository.findAll();
		return ResponseEntity.ok(Classs);
	}
}
