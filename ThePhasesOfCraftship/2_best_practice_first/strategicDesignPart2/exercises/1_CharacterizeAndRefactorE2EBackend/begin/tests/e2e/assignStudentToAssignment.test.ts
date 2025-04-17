import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";

import { app } from "../../src";
import { resetDatabase } from "../fixtures/reset";
import { dbTestUtils } from "../fixtures/dbTestUtils";

const feature = loadFeature(
  path.join(__dirname, "../features/assignStudentToAssignment.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });
  test("Successfully assign a student to an assignment", ({
    given,
    when,
    then,
  }) => {
    let requestBody: any;
    let response: any;
    given(
      "there is an existing student enrolled to a class with an assignment",
      async () => {
        const classEnrollment = await dbTestUtils.enrollStudentToClass();
        const assignment = await dbTestUtils.createAssignment();
        requestBody = {
          assignmentId: assignment.id,
          studentId: classEnrollment.studentId,
        };
      }
    );
    when("I assign the student the assignment", async () => {
      response = await request(app)
        .post("/student-assignments")
        .send(requestBody);
    });
    then("the student should be assigned to the assignment", () => {
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty(
        "studentId",
        requestBody.studentId
      );
      expect(response.body.data).toHaveProperty(
        "assignmentId",
        requestBody.assignmentId
      );
    });
  });

  test("The student is already assigned", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;
    given("a student is already assigned to the assignment", async () => {
      const { assignmentId, studentId } =
        await dbTestUtils.assignStudentToAssignment();
      requestBody = {
        assignmentId,
        studentId,
      };
    });
    when("I assign the student again", async () => {
      response = await request(app)
        .post("/student-assignments")
        .send(requestBody);
    });
    then("it should fail", () => {
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty(
        "error",
        "AlreadyAssignedAssignmentToStudent"
      );
    });
  });
});
