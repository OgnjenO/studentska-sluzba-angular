package com.studentskaSluzbaAngular.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.studentskaSluzbaAngular.models.Class;

@Repository
public interface ClassRepository extends JpaRepository<Class, Long> {
	boolean existsById(Long id);
	
	List<Class> findAll();
}
