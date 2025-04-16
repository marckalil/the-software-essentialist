import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";

import { app } from "../../src";
import { resetDatabase } from "../fixtures/reset";
import { StudentBuilder } from "../fixtures/StudentBuilder";
import { ClassRoomBuilder } from "../fixtures/ClassRoomBuilder";
import { ClassEnrollmentBuilder } from "../fixtures/ClassEnrollmentBuilder";
import { AssignmentBuilder } from "../fixtures/AssignmentBuilder";

const classroomBuilder = new ClassRoomBuilder().withName("Math");
const studentBuilder = new StudentBuilder().withName("John").withRandomEmail();
const classEnrollmentBuilder = new ClassEnrollmentBuilder()
  .from(classroomBuilder)
  .and(studentBuilder);
const assignmentBuilder = new AssignmentBuilder().from(classroomBuilder);

async function buildEnrollmentAndAssignment(): Promise<{
  assignmentId: string;
  studentId: string;
}> {
  const classEnrollment = await classEnrollmentBuilder.build();
  const assignment = await assignmentBuilder.build();
  return {
    assignmentId: assignment.id,
    studentId: classEnrollment.studentId,
  };
}

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
        const { assignmentId, studentId } =
          await buildEnrollmentAndAssignment();
        requestBody = {
          assignmentId,
          studentId,
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
      const { assignmentId, studentId } = await buildEnrollmentAndAssignment();
      requestBody = {
        assignmentId,
        studentId,
      };
      await request(app).post("/student-assignments").send(requestBody);
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
