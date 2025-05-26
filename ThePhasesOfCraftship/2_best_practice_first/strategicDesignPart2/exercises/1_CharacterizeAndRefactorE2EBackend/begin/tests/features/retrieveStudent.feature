Feature: Retrieve a student

		As an administrator
		I want to retrieve a student
		So that I can see the details of the student

		Scenario: Successfully retrieve a student
			Given a list of students
			When I want to retrieve an existing student
			Then it should return the details of the student

		Scenario: Fail to retrieve
			Given a list of students
			When I want to retrieve a non-existing student
			Then it should return an error