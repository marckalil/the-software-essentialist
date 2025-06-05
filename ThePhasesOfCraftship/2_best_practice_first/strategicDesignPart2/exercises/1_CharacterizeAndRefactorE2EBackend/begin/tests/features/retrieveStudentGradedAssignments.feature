Feature: Retrieve all the graded assignments of a student

	As a teacher
	I want to retrieve all the graded assignments of student
	So I can see its progress

	Scenario: Successfully retrieve all the graded assignments of a student
		Given a student has graded assignments
		When I request all the graded assignments
		Then I should receive those assignments

	Scenario: Attempt to retrieve all the graded assignments of a non-existent student
		When I request the grade assignments of a non-existent student
		Then I should receive an error