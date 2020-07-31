package com.studentskaSluzbaAngular.controllers.admin;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentskaSluzbaAngular.models.Class;
import com.studentskaSluzbaAngular.payload.request.CreateClassRequest;
import com.studentskaSluzbaAngular.payload.request.UpdateClassRequest;
import com.studentskaSluzbaAngular.payload.response.MessageResponse;
import com.studentskaSluzbaAngular.repository.ClassRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/class")
public class ClassAdminController {
	@Autowired
	ClassRepository classRepository;

	@Autowired
	PasswordEncoder encoder;
	
	@GetMapping("/getClasses")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getClasses() {
		List<Class> Classs = classRepository.findAll();
		return ResponseEntity.ok(Classs);
	}
	
	@PostMapping("/updateClass")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateClass(@Valid @RequestBody UpdateClassRequest updateClassRequest) {
		System.out.println("Request : " + updateClassRequest.toString());
		Optional<Class> targetClass = null;
		if(!classRepository.existsById(updateClassRequest.getId())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: No Class with that name"));
		}
		else {
			targetClass = classRepository.findById(updateClassRequest.getId());
		}
		
		targetClass.ifPresent(Class -> {
			if(!isEmpty(updateClassRequest.getName())) Class.setName(updateClassRequest.getName());
			classRepository.save(Class);
		});
			
		
		return ResponseEntity.ok(new MessageResponse("Class updated successfully!"));
	}

	@PostMapping("/createClass")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createClass(@Valid @RequestBody CreateClassRequest createClassRequest) {
		System.out.println("Request : " + createClassRequest.toString());

		Class Class = new Class(createClassRequest.getName());
		classRepository.save(Class);

		return ResponseEntity.ok(new MessageResponse("Class registered successfully!"));
	}
	
	@PostMapping("/deleteClass")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteClass(@Valid @RequestBody UpdateClassRequest updateClassRequest) {
		System.out.println("Request : " + updateClassRequest.getId());
		Optional<Class> targetClass = null;
		if(!classRepository.existsById(updateClassRequest.getId())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: No user with that name"));
		}
		else {
			targetClass = classRepository.findById(updateClassRequest.getId());
		}
		
		targetClass.ifPresent(user -> {
			classRepository.delete(user);
		});
			
		
		return ResponseEntity.ok(new MessageResponse("User successfully deleted!"));
	}
	
	private boolean isEmpty(String test) {
		if(test == null || test == "") return true;
		else return false;
	}
}
