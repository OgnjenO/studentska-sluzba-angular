package com.studentskaSluzbaAngular.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

import com.studentskaSluzbaAngular.models.ERole;
import com.studentskaSluzbaAngular.models.Role;
import com.studentskaSluzbaAngular.models.User;
import com.studentskaSluzbaAngular.payload.request.SignupRequest;
import com.studentskaSluzbaAngular.payload.request.UpdateUserRequest;
import com.studentskaSluzbaAngular.payload.response.MessageResponse;
import com.studentskaSluzbaAngular.repository.RoleRepository;
import com.studentskaSluzbaAngular.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;
	
	@GetMapping("/getUsers")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getUsers() {
		List<User> users = userRepository.findAll();
		for(User user : users) {
			user.setPassword("");
		}
		return ResponseEntity.ok(users);
	}
	
	@PostMapping("/updateUser")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserRequest updateUserRequest) {
		System.out.println("Request : " + updateUserRequest.toString());
		Optional<User> targetUser = null;
		if(!userRepository.existsById(updateUserRequest.getId())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: No user with that name"));
		}
		else {
			targetUser = userRepository.findById(updateUserRequest.getId());
		}
		
		targetUser.ifPresent(user -> {
			if(!isEmpty(updateUserRequest.getUsername())) user.setUsername(updateUserRequest.getUsername());
			if(!isEmpty(updateUserRequest.getEmail())) user.setEmail(updateUserRequest.getEmail());
			if(!isEmpty(updateUserRequest.getFirstname())) user.setFirstname(updateUserRequest.getFirstname());
			if(!isEmpty(updateUserRequest.getLastname())) user.setLastname(updateUserRequest.getLastname());
			if(!isEmpty(updateUserRequest.getGrade())) user.setGrade(updateUserRequest.getGrade());
			if(!isEmpty(updateUserRequest.getYear())) user.setYear(updateUserRequest.getYear());
			if(!isEmpty(updateUserRequest.getPassword())) user.setPassword(encoder.encode(updateUserRequest.getPassword()));
			if(!isEmpty(updateUserRequest.getRole())) {
				Set<Role> roles = new HashSet<>();
				Optional<Role> curRole = roleRepository.findByName(ERole.valueOf(updateUserRequest.getRole()));
				curRole.ifPresent(role -> {
					roles.add(role);
					user.setRoles(roles);
				});
			}
			userRepository.save(user);
		});
			
		
		return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
	}

	@PostMapping("/createUser")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createUser(@Valid @RequestBody SignupRequest signUpRequest) {
		System.out.println("Request : " + signUpRequest.toString());
		
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		System.out.println(encoder.encode("admin"));
		User user = new User(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 signUpRequest.getFirstname(),
							 signUpRequest.getLastname(),
							 signUpRequest.getGrade(),
							 encoder.encode(signUpRequest.getPassword()));

		Set<Role> roles = new HashSet<>();
		System.out.println("Role : " + ERole.valueOf(signUpRequest.getRole()));
		Role curRole = roleRepository.findByName(ERole.valueOf(signUpRequest.getRole()))
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(curRole);

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	private boolean isEmpty(int test) {
		if(test == 0) return true;
		else return false;
	}
	
	private boolean isEmpty(String test) {
		if(test == null || test == "") return true;
		else return false;
	}
}
