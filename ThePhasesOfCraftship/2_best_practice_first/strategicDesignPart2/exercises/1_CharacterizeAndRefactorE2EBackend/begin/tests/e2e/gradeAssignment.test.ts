import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";
import { app } from "../../src";
import { resetDatabase } from "../fixtures/reset";
import { gradeAssignment, submitAssignment } from "../fixtures/dbTestUtils";

const feature = loadFeature(
  path.join(__dirname, "../features/gradeAssignment.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Successfully grade an assignment", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;
    given("an assignment was submitted", async () => {
      const { studentAssignment } = await submitAssignment();
      const { assignmentId, studentId } = studentAssignment;
      requestBody = {
        assignmentId,
        studentId,
        grade: "B",
      };
    });
    when("I grade an assignment", async () => {
      response = await request(app)
        .post("/student-assignments/grade")
        .send(requestBody);
    });
    then("it should be graded successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("assignmentSubmissionId");
      expect(response.body.data).toHaveProperty("grade", requestBody.grade);
    });
  });

  test("The assignment was already graded", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;
    given("an assignment was already graded", async () => {
      const { studentAssignment } = await gradeAssignment();
      const { assignmentId, studentId } = studentAssignment;
      requestBody = {
        assignmentId,
        studentId,
        grade: "A+",
      };
    });
    when("I grade the assignment", async () => {
      response = await request(app)
        .post("/student-assignments/grade")
        .send(requestBody);
    });
    then("it should provide an error", () => {
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("error", "AlreadyGradedAssignment");
    });
  });
});
