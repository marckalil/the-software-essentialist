Feature: Retrieve all the submitted assignments of a student

	As a teacher
	I want to retrieve all the submitted assignments of a student
	So I can view and grade each assignment

	Scenario: Successfully retrieving the submitted assignments of a student
		Given a student submitted assignments
		When I request all the submitted assignments of this student
		Then I should receive those assignments

	Scenario: Attempt retrieving the assignments of a non-existent student
		When I request the submitted assignments of a non-existent student
		Then I should receive an error