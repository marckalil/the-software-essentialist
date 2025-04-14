Feature: Create a class enrollment

	As an admin
	I want to enroll a student to a class
	So that the student can attend the class

	Scenario: Successfully enroll a student to a class
		Given an existing student and an existing class
		When I enroll the student to the class
		Then the student should be enrolled successfully

	Scenario: The student is already enrolled to the class
		Given the student is already enrolled to the class
		When I enroll the student to the class again
		Then I should see a error message