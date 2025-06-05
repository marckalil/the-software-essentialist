Feature: Retrieve all the assignments for a class room

	As a teacher
	I want to retrieve all the assignments for a specific class room
	So I can choose one to assign to my students

	Scenario: Successfully retrieving assignments for a class room
		Given I have a class room with assignments
		When I request all the assignments for this class room
		Then I should receive all the assignments for this class room

	Scenario: Attempt to retrieve assignments for a non-existent class room
		When I request the assignments of a class room that does not exist
		Then I should get an error