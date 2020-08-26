package com.studentskaSluzbaAngular.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
import com.studentskaSluzbaAngular.payload.request.LoginRequest;
import com.studentskaSluzbaAngular.payload.request.SignupRequest;
import com.studentskaSluzbaAngular.payload.response.JwtResponse;
import com.studentskaSluzbaAngular.payload.response.MessageResponse;
import com.studentskaSluzbaAngular.repository.RoleRepository;
import com.studentskaSluzbaAngular.repository.UserRepository;
import com.studentskaSluzbaAngular.security.jwt.JwtUtils;
import com.studentskaSluzbaAngular.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	
	boolean isDisabledSignup = true;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												userDetails.getId(), 
												userDetails.getUsername(), 
												userDetails.getEmail(),
												userDetails.getFirstname(),
												userDetails.getLastname(),
												userDetails.getYear(),
												userDetails.getGrade(),
												userDetails.getSubjects(),
												 roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		System.out.println("Request : " + signUpRequest.toString());
		if(isDisabledSignup) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Signup is disabled"));
		}
		
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

	@GetMapping("/canRegister")
	public boolean canRegister() {
		return !isDisabledSignup;
	}
}
