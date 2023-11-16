package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

	// JpaRepository provides all the database interaction methods
	// it also extends PagingAndSortingRepository which provides support for paging
	// and sorting
	// PagingAndSortingRepository extends CrudRepository which provides dbms method
	// for interactions

	public Employee getEmployeeById(Integer id);
}
