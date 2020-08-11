package com.studentskaSluzbaAngular.controllers.user;

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
import com.studentskaSluzbaAngular.models.Class;
import com.studentskaSluzbaAngular.payload.request.UpdateUserRequest;
import com.studentskaSluzbaAngular.payload.response.MessageResponse;
import com.studentskaSluzbaAngular.repository.ClassRepository;
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
	ClassRepository classRepository;
	
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
			if(!isEmpty(updateUserRequest.getClasss())) {
				boolean shouldAdd = updateUserRequest.getClasss()>0;
				Long tarId = Math.abs(updateUserRequest.getClasss());
				Set<Class> classes = user.getClasses();
				Optional<Class> tarClass = classRepository.findById(tarId);
				tarClass.ifPresent(cls -> {
					if(shouldAdd) classes.add(cls);
					else classes.remove(cls);
					user.setClasses(classes);
				});
			}
			userRepository.save(user);
		});
			
		
		return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
	}
	
	private boolean isEmpty(Long test) {
		if(test == null || test == 0) return true;
		else return false;
	}
	
	private boolean isEmpty(int test) {
		if(test == 0) return true;
		else return false;
	}
	
	private boolean isEmpty(String test) {
		if(test == null || test == "") return true;
		else return false;
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
