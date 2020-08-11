package com.studentskaSluzbaAngular.controllers.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentskaSluzbaAngular.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@GetMapping("/getCurrentUser")
	public ResponseEntity<?> getCurrentUser() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		if(principal instanceof UserDetailsImpl) {
			System.out.println("First one : " + ((UserDetailsImpl)principal).getUsername());
		}
		else {
			System.out.println("Second one : " + principal.toString());
		}

		return ResponseEntity.ok((UserDetailsImpl)principal);
	}
}
