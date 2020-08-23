package com.studentskaSluzbaAngular.controllers.professor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import com.studentskaSluzbaAngular.models.Grade;
import com.studentskaSluzbaAngular.models.User;
import com.studentskaSluzbaAngular.payload.request.CreateGradeRequest;
import com.studentskaSluzbaAngular.payload.request.UpdateGradeRequest;
import com.studentskaSluzbaAngular.repository.GradeRepository;
import com.studentskaSluzbaAngular.repository.UserRepository;
import com.studentskaSluzbaAngular.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
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
@RequestMapping("/api/professor/subject")
public class SubjectProfessorController {
    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GradeRepository gradeRepository;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/getAllUngradedExams")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<?> getAllUngradedExams(@Valid @RequestBody UpdateGradeRequest updateGradeRequest) {
        System.out.println("getAllUngradedExams request");

        UserDetailsImpl curUser = this.getCurUser();
        if(curUser == null)
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Something is wrong with the request"));

        User targetUser = null;
        if(!userRepository.existsById(curUser.getId())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: No user with that name"));
        }
        else {
            targetUser = userRepository.findById(curUser.getId()).get();
        }

        if(!userRepository.existsById(updateGradeRequest.getUserid())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: No user with that id"));
        }

        User u = userRepository.findById(updateGradeRequest.getUserid()).get();
        Set<Subject> userSubjects = u.getSubjects();

        List<Grade> allExams = gradeRepository.findAll();
        List<Grade> exams = new ArrayList<Grade>();
        for(Grade e : allExams) {
            if(userSubjects.contains(e.getSubject())) exams.add(e);
        }

        return ResponseEntity.ok(exams);
    }

    @PostMapping("/gradeExam")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<?> gradeExam(@Valid @RequestBody UpdateGradeRequest updateGradeRequest) {
        System.out.println("gradeExam request");

        if(!gradeRepository.existsById(updateGradeRequest.getId())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: No exam with that id"));
        }

        if(updateGradeRequest.getGrade() < 5 || updateGradeRequest.getGrade() > 10) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Invalid grade"));
        }

        Grade g = gradeRepository.findById(updateGradeRequest.getId()).get();
        g.setGrade(updateGradeRequest.getGrade());

        gradeRepository.save(g);

        return ResponseEntity.ok(new MessageResponse("Grade updated successfully"));
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
