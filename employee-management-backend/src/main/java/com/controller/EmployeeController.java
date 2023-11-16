package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Employee;
import com.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;

	// get all employee
	@GetMapping("/employees")
	public ResponseEntity<List<Employee>> getAllEmployees() {
//		System.out.println("hit");
		List<Employee> list = employeeRepository.findAll();

		if (list == null || list.size() == 0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}

		return ResponseEntity.ok(list);
	}

	// create employee
	@PostMapping("/employees")
	public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
		Employee res = employeeRepository.save(employee);

		if (res == null) {
			return ResponseEntity.internalServerError().build();
		}
		return ResponseEntity.ok(res);
	}

	// get employee by id
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Integer id) {
		Employee res = (Employee) employeeRepository.getEmployeeById(id);
		if (res == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(res);
	}

	// update employee
	@PutMapping("/update-employee/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Integer id, @RequestBody Employee employee) {

		Employee res = employeeRepository.getEmployeeById(id);
		if (res == null) {
			return ResponseEntity.notFound().build();
		}

		res.setFirstName(employee.getFirstName());
		res.setLastName(employee.getLastName());
		res.setEmailId(employee.getEmailId());

		Employee updatedEmployee = employeeRepository.save(res);
		if (updatedEmployee == null) {
			return ResponseEntity.internalServerError().build();
		}
		return ResponseEntity.ok(updatedEmployee);
	}

	// delete employee
	@DeleteMapping("/delete-employee/{id}")
	public ResponseEntity<Employee> deleteEmployee(@PathVariable("id") Integer id) {
		Employee res = employeeRepository.getEmployeeById(id);
		if (res == null) {
			return ResponseEntity.notFound().build();
		}

		employeeRepository.deleteById(id);

		return ResponseEntity.ok(res);
	}

}
