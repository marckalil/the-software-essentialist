Feature: Create an assignment for a class

	As a teacher
	I want to create an assignment for a class
	So I can assign it to students

	Scenario: Successfully create an assignment
		Given a class exists
		When I create an assignment for the class
		Then the assignment should be created successfully

	Scenario: Missing title
		Given a class exist and no title is given to an assignment
		When I create an assignment for the class
		Then I should see an error message