package com.studentskaSluzbaAngular.controllers.admin;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentskaSluzbaAngular.models.Subject;
import com.studentskaSluzbaAngular.payload.request.CreateSubjectRequest;
import com.studentskaSluzbaAngular.payload.request.UpdateSubjectRequest;
import com.studentskaSluzbaAngular.payload.response.MessageResponse;
import com.studentskaSluzbaAngular.repository.SubjectRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/subject")
public class SubjectAdminController {
	@Autowired
	SubjectRepository subjectRepository;

	@Autowired
	PasswordEncoder encoder;
	
	@GetMapping("/getSubjects")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getSubjects() {
		List<Subject> subjects = subjectRepository.findAll();
		System.out.println(subjects.toString());
		return ResponseEntity.ok(subjects);
	}
	
	@PostMapping("/updateSubject")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateSubject(@Valid @RequestBody UpdateSubjectRequest updateSubjectRequest) {
		System.out.println("Request : " + updateSubjectRequest.toString());
		Optional<Subject> targetSubject = null;
		if(!subjectRepository.existsById(updateSubjectRequest.getId())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: No Subject with that name"));
		}
		else {
			targetSubject = subjectRepository.findById(updateSubjectRequest.getId());
		}
		
		targetSubject.ifPresent(subject -> {
			if(!isEmpty(updateSubjectRequest.getName())) subject.setName(updateSubjectRequest.getName());
			subjectRepository.save(subject);
		});
			
		
		return ResponseEntity.ok(new MessageResponse("Subject updated successfully!"));
	}

	@PostMapping("/createSubject")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createSubject(@Valid @RequestBody CreateSubjectRequest createSubjectRequest) {
		System.out.println("Request : " + createSubjectRequest.toString());

		Subject subject = new Subject(createSubjectRequest.getName());
		subjectRepository.save(subject);

		return ResponseEntity.ok(new MessageResponse("Subject registered successfully!"));
	}
	
	@PostMapping("/deleteSubject")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteSubject(@Valid @RequestBody UpdateSubjectRequest updateSubjectRequest) {
		System.out.println("Request : " + updateSubjectRequest.getId());
		Optional<Subject> targetSubject = null;
		if(!subjectRepository.existsById(updateSubjectRequest.getId())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: No user with that name"));
		}
		else {
			targetSubject = subjectRepository.findById(updateSubjectRequest.getId());
		}

		targetSubject.ifPresent(user -> {
			subjectRepository.delete(user);
		});
			
		
		return ResponseEntity.ok(new MessageResponse("User successfully deleted!"));
	}
	
	private boolean isEmpty(String test) {
		return test == null || test == "";
	}
}
