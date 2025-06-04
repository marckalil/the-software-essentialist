import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";
import { app } from "../../src";
import { resetDatabase } from "../fixtures/reset";
import { dbTestUtils } from "../fixtures/dbTestUtils";

const feature = loadFeature(
  path.join(__dirname, "../features/submitAssignment.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Successfully submit an assignment", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;
    given("I have been assigned an assignment", async () => {
      const student = await dbTestUtils.createStudent();
      const classRoom = await dbTestUtils.createClassRoom();
      const classEnrollment = await dbTestUtils.enrollStudentToClass(
        classRoom,
        student
      );
      const assignment = await dbTestUtils.createAssignment(classRoom);
      const { assignmentId, studentId } =
        await dbTestUtils.assignStudentToAssignment(
          classEnrollment,
          assignment
        );
      requestBody = {
        assignmentId,
        studentId,
      };
    });
    when("I submit the assignment", async () => {
      response = await request(app)
        .post("/student-assignments/submit")
        .send(requestBody);
    });
    then("the assignment should be successfully submitted", () => {
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("studentAssignmentId");
      expect(response.body.data).toHaveProperty("submissionContent");
    });
  });

  test("The assignment was already submitted", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;
    given("I have already submitted my assignment", async () => {
      const student = await dbTestUtils.createStudent();
      const classRoom = await dbTestUtils.createClassRoom();
      const classEnrollment = await dbTestUtils.enrollStudentToClass(
        classRoom,
        student
      );
      const assignment = await dbTestUtils.createAssignment(classRoom);
      const studentAssignment = await dbTestUtils.assignStudentToAssignment(
        classEnrollment,
        assignment
      );
      await dbTestUtils.submitAssignment(studentAssignment);
      const { assignmentId, studentId } = studentAssignment;
      requestBody = {
        assignmentId,
        studentId,
      };
    });
    when("I try to submit it again", async () => {
      response = await request(app)
        .post("/student-assignments/submit")
        .send(requestBody);
    });
    then("it should fail", () => {
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty(
        "error",
        "AssignmentAlreadySubmitted"
      );
    });
  });
});
