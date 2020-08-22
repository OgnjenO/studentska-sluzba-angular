package com.studentskaSluzbaAngular.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentskaSluzbaAngular.models.Subject;
import com.studentskaSluzbaAngular.repository.SubjectRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/global")
public class GlobalController {
	@Autowired
	SubjectRepository subjectRepository;
	
	@GetMapping("/subjects/getSubjects")
	public ResponseEntity<?> getSubjects() {
		List<Subject> subjects = subjectRepository.findAll();
		return ResponseEntity.ok(subjects);
	}
}
