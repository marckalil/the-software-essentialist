Feature: Retrieve the list of all the students

		As an administrator
		I want to retrieve the list of all the student
		So I can see all the registered students

		Scenario: Successfully retrieve the list of all the students
			Given there are students registered
			When I as request all the students
			Then I should retrieve the list of students