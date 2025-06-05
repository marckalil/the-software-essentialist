Feature: Retrieve an assignment

	As a teacher
	I want to retrieve an assignment
	So that I can view details of a specific assignment

	Scenario: Successfully retrieve an assignment
		Given an assignment exists
		When I request this assignment
		Then I should get the details of the assignment
	
	Scenario: Attempt to retrieve a non-existent assignment
		When I request the assignment
		Then I should receive an error
