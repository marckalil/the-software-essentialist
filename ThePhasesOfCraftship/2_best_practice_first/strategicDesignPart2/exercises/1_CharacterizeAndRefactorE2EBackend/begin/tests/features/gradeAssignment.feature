Feature:: Grade an assignment

	As a teacher
	I want to grade an assignment
	So I can give feedback to a student

	Scenario: Successfully grade an assignment
		Given an assignment was submitted
		When I grade an assignment
		Then it should be graded successfully

	Scenario: The assignment was already graded
		Given an assignment was already graded
		When I grade the assignment
		Then it should provide an error