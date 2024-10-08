package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dummyentitiy.EmployeeDto;
import com.example.demo.dummyentitiy.ProjectDTO;
import com.example.demo.dummyentitiy.TeamMemberDTO;
import com.example.demo.entities.Client;
import com.example.demo.entities.Employee;
import com.example.demo.entities.Project;
import com.example.demo.entities.Task;
import com.example.demo.entities.TeamMember;
import com.example.demo.service.CreateService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CreateController {

    @Autowired
    private CreateService employeeService;
    @Autowired
    private CreateService createService;

//    @PostMapping("/createEmployee")
//    public Employee addEmployee(@RequestBody Employee employee) {
//        return employeeService.saveEmployee(employee);
//    }
    
    @PostMapping("/createEmployee")
    public String addEmployee(@RequestBody EmployeeDto employeeDto) {
        try {
           
            return employeeService.saveEmployee(employeeDto);
        } catch (Exception e) {
            
            return "Check your internet Connection";
        }
    }

    // controller to create team Member
    @PostMapping("/createTeam")
    public ResponseEntity<String> createTeamMembers(@RequestBody List<TeamMemberDTO> teamMembers) {
        try {
            createService.createTeamMembers(teamMembers);
            // Return a valid JSON response
            return ResponseEntity.ok("{\"message\":\"Team Members created successfully\"}");
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            // Return an error message as JSON
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("{\"message\":\"Error creating team members\"}");
        }
    }

    
   

    // Controller to create a client
    @PostMapping("/createclient")
    public Client createClient(@RequestBody Client client) {
        return createService.createClient(client);
    }
    
    //controller to create task
    @PostMapping("/createtask")
	public Task createTask(@RequestBody Task task) {
		return createService.createTask(task);
	}
    
  
    
    //controller to create project and team member
    @PostMapping("/createProject")
    public ResponseEntity<String> createProjectAndTeamMember(@RequestBody CreateProjectRequest request) {
        try {
            // Extract project and team member details from the request
            ProjectDTO projectDTO = request.getProject();
            TeamMemberDTO teamMemberDTO = request.getTeammember();

            // Log projectId and other details for debugging
            System.out.println("Project ID: " + projectDTO.getId());
            System.out.println("Team Member Project ID: " + teamMemberDTO.getProjectId());

            // Call the service method to create both the project and the team member
            createService.createProjectAndTeamMember(projectDTO, teamMemberDTO);

            return new ResponseEntity<>("Project and Team Member created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return new ResponseEntity<>("Error creating project and team member", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/forgetpassword")
    public String forget(@RequestParam(name="username") String username) {
    	try {
    return createService.forget(username);
    	}
    	catch(Exception e) {
    		return "Enter valid username";
    	}
    }
    
    
    
}
