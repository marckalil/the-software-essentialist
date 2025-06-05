import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";

import { app } from "../../src";
import { resetDatabase } from "../fixtures/reset";
import { Student, StudentAssignment } from "../fixtures/types";
import { dbTestUtils } from "../fixtures/dbTestUtils";

const feature = loadFeature(
  path.join(
    __dirname,
    "../features/retrieveStudentSubmittedAssignments.feature"
  )
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });
  test("Successfully retrieving the submitted assignments of a student", ({
    given,
    when,
    then,
  }) => {
    let response: any = {};
    let student: Student;
    let submittedAssignments: StudentAssignment[];
    given("a student submitted assignments", async () => {
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
      await dbTestUtils.submitAssignment(studentAssignment1);
      await dbTestUtils.submitAssignment(studentAssignment2);
      submittedAssignments = [studentAssignment1, studentAssignment2];
    });
    when(
      "I request all the submitted assignments of this student",
      async () => {
        response = await request(app).get(`/student/${student.id}/assignments`);
      }
    );
    then("I should receive those assignments", () => {
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data).toHaveLength(2);
    });
  });

  test("Attempt retrieving the assignments of a non-existent student", ({
    when,
    then,
  }) => {
    let response: any = {};
    when(
      "I request the submitted assignments of a non-existent student",
      async () => {
        response = await request(app).get(
          "/student/aec6817e-66b4-4ce5-8a25-f3ec459e40df/assignments"
        );
      }
    );
    then("I should receive an error", () => {
      expect(response.status).toBe(404);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty("error", "StudentNotFound");
      expect(response.body.data).toBeUndefined();
    });
  });
});
