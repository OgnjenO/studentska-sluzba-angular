package com.studentskaSluzbaAngular.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.studentskaSluzbaAngular.models.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
	boolean existsById(Long id);
	
	List<Subject> findAll();
}
