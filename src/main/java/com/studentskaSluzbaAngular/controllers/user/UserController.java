package com.studentskaSluzbaAngular.controllers.user;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentskaSluzbaAngular.models.User;
import com.studentskaSluzbaAngular.models.Subject;
import com.studentskaSluzbaAngular.models.Grade;
import com.studentskaSluzbaAngular.payload.request.UpdateUserRequest;
import com.studentskaSluzbaAngular.payload.response.MessageResponse;
import com.studentskaSluzbaAngular.repository.SubjectRepository;
import com.studentskaSluzbaAngular.repository.GradeRepository;
import com.studentskaSluzbaAngular.repository.UserRepository;
import com.studentskaSluzbaAngular.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	SubjectRepository subjectRepository;

	@Autowired
	GradeRepository gradeRepository;
	
	@GetMapping("/getCurrentUser")
	public ResponseEntity<?> getCurrentUser() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		if(principal instanceof UserDetailsImpl) {
			System.out.println("First one : " + ((UserDetailsImpl)principal).getUsername());

			return ResponseEntity.ok((UserDetailsImpl)principal);
		}
		else {
			System.out.println("Second one : " + principal.toString());

			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Something is wrong with the request"));
		}
	}
	
	@PostMapping("/updateSelf")
	public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserRequest updateUserRequest) {
		UserDetailsImpl curUser = this.getCurUser();
		if(curUser == null)
			return ResponseEntity
				.badRequest()
				.body(new MessageResponse("Error: Something is wrong with the request"));
		
		System.out.println("Updateself : " + curUser.getUsername());
		System.out.println("Updateself : " + updateUserRequest.toString());
		Optional<User> targetUser = null;
		if(!userRepository.existsById(curUser.getId())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: No user with that name"));
		}
		else {
			targetUser = userRepository.findById(curUser.getId());
		}
		
		targetUser.ifPresent(user -> {
			if(!isEmpty(updateUserRequest.getEmail())) user.setEmail(updateUserRequest.getEmail());
			if(!isEmpty(updateUserRequest.getPassword())) user.setPassword(encoder.encode(updateUserRequest.getPassword()));
			System.out.println("getSubject : " + updateUserRequest.getSubject());
			if(!isEmpty(updateUserRequest.getSubject())) {
				boolean shouldAdd = updateUserRequest.getSubject()>0;
				Long tarId = Math.abs(updateUserRequest.getSubject());
				Set<Subject> subjects = user.getSubjects();
				Optional<Subject> tarSubject = subjectRepository.findById(tarId);
				tarSubject.ifPresent(sub -> {
					if(shouldAdd) subjects.add(sub);
					else subjects.remove(sub);
					user.setSubjects(subjects);
				});
			}
			userRepository.save(user);
		});
			
		
		return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
	}
	
	@PostMapping("/getSelfGrades")
	public ResponseEntity<?> getSelfGrades(@Valid @RequestBody UpdateUserRequest updateUserRequest) {
		UserDetailsImpl curUser = this.getCurUser();
		if(curUser == null)
			return ResponseEntity
				.badRequest()
				.body(new MessageResponse("Error: Something is wrong with the request"));
		
		System.out.println("getSelfGrades : " + curUser.getUsername());
		User targetUser = null;
		if(!userRepository.existsById(curUser.getId())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: No user with that name"));
		}
		else {
			targetUser = userRepository.findById(curUser.getId()).get();
		}
		
		List<Grade> grades = null;
		
		grades = gradeRepository.findByUser(targetUser);

		return ResponseEntity.ok(grades);
	}
	
	private boolean isEmpty(Long test) {
		return test == null || test == 0;
	}
	
	private boolean isEmpty(int test) {
		return test == 0;
	}
	
	private boolean isEmpty(String test) {
		return test == null || test == "";
	}
	
	public UserDetailsImpl getCurUser() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		if(principal instanceof UserDetailsImpl) {
			System.out.println("First one : " + ((UserDetailsImpl)principal).getUsername());

			return (UserDetailsImpl)principal;
		}
		else {
			System.out.println("Second one : " + principal.toString());

			return null;
		}
	}
}
