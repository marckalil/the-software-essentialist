Feature:
	As a student
	I want to submit my assignment
	So my assignment can get a grade

	Scenario: Successfully submit an assignment
		Given I have been assigned an assignment
		When I submit the assignment
		Then the assignment should be successfully submitted

	Scenario: The assignment was already submitted
		Given I have already submitted my assignment
		When I try to submit it again
		Then it should fail