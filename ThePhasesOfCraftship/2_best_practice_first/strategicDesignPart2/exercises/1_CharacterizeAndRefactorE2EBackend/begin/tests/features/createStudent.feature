Feature: Create a student

	As an administrator
	I want to create a student records
	So that the students can be assigned to classes and managed within the system

	Scenario: Successfully create a student
		Given I want to create a student with name "Marc Kalil" and e-mail "mkalil@example.com"
		When I send a request to create a student
		Then the student record should be created

	Scenario: Missing e-mail
		Given I want to create a student name "Marc Kalil" and no e-mail
		When I send a request to create a student
		Then the student should not be created
		And I should receive an error message