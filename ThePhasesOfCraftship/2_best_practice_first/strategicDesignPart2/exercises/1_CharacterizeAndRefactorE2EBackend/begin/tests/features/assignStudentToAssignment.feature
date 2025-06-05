Feature: Assign a student to an assignment

	As a teacher
	I want to assign a student to an assignment
	So that the student can achieve learning objectives

	Scenario: Successfully assign a student to an assignment
		Given there is an existing student enrolled to a class
		And an assignment exists for the class
		When I assign the student the assignment
		Then the student should be assigned to the assignment

	Scenario: The student is already assigned
		Given a student is already assigned to the assignment
		When I assign the student again
		Then it should fail