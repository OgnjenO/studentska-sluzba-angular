package com.studentskaSluzbaAngular.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studentskaSluzbaAngular.models.Grade;
import com.studentskaSluzbaAngular.models.User;
import com.studentskaSluzbaAngular.models.Class;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
	Optional<Grade> findById(Long id);
	
	List<Grade> findByUser(User user);

	List<Grade> findByClasss(Class classs);
	
	boolean existsById(Long id);
	
	List<Grade> findAll();
}
