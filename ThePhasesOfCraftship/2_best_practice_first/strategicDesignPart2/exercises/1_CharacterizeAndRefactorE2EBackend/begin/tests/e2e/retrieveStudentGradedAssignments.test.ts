import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";

import { app } from "../../src";
import { resetDatabase } from "../fixtures/reset";
import { dbTestUtils } from "../fixtures/dbTestUtils";
import { Student } from "../fixtures/types";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieveStudentGradedAssignments.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieve all the graded assignments of a student", ({
    given,
    when,
    then,
  }) => {
    let response: any = {};
    let student: Student;
    given("a student has graded assignments", async () => {
      student = await dbTestUtils.createStudent();
      const classRoom = await dbTestUtils.createClassRoom();
      const classEnrollment = await dbTestUtils.enrollStudentToClass(
        classRoom,
        student
      );
      const assignment1 = await dbTestUtils.createAssignment(classRoom);
      const assignment2 = await dbTestUtils.createAssignment(classRoom);
      const studentAssignment1 = await dbTestUtils.assignStudentToAssignment(
        classEnrollment,
        assignment1
      );
      const studentAssignment2 = await dbTestUtils.assignStudentToAssignment(
        classEnrollment,
        assignment2
      );
      const submission1 = await dbTestUtils.submitAssignment(
        studentAssignment1
      );
      const submission2 = await dbTestUtils.submitAssignment(
        studentAssignment2
      );
      await dbTestUtils.gradeAssignment(submission1, studentAssignment1, "A+");
      await dbTestUtils.gradeAssignment(submission2, studentAssignment2, "B");
    });
    when("I request all the graded assignments", async () => {
      response = await request(app).get(`/student/${student.id}/grades`);
    });
    then("I should receive those assignments", () => {
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("success", true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data).toHaveLength(2);
    });
  });

  test("Attempt to retrieve all the graded assignments of a non-existent student", ({
    when,
    then,
  }) => {
    let response: any = {};
    when(
      "I request the grade assignments of a non-existent student",
      async () => {
        response = await request(app).get(
          "/student/aec6817e-66b4-4ce5-8a25-f3ec459e40df/grades"
        );
      }
    );
    then("I should receive an error", () => {
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("error", "StudentNotFound");
      expect(response.body.data).toBeUndefined();
    });
  });
});
