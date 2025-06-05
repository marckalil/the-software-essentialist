import { loadFeature, defineFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";

import { app } from "../../src";
import { resetDatabase } from "../fixtures/reset";
import { dbTestUtils } from "../fixtures/dbTestUtils";
import { ClassRoom, Student } from "../fixtures/types";

const feature = loadFeature(
  path.join(__dirname, "../features/createClassEnrollment.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });
  test("Successfully enroll a student to a class", ({
    and,
    given,
    when,
    then,
  }) => {
    let requestBody: any;
    let response: any;
    let classRoom: ClassRoom;
    let student: Student;
    given("an existing student", async () => {
      student = await dbTestUtils.createStudent();
    });
    and("an existing class", async () => {
      classRoom = await dbTestUtils.createClassRoom();
    });
    when("I enroll the student to the class", async () => {
      requestBody = {
        classId: classRoom.id,
        studentId: student.id,
      };
      response = await request(app)
        .post("/class-enrollments")
        .send(requestBody);
    });
    then("the student should be enrolled successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("classId", requestBody.classId);
      expect(response.body.data).toHaveProperty(
        "studentId",
        requestBody.studentId
      );
    });
  });

  test("The student is already enrolled to the class", ({
    given,
    when,
    then,
  }) => {
    let requestBody: any;
    let response: any;
    given("the student is already enrolled to the class", async () => {
      const classRoom = await dbTestUtils.createClassRoom();
      const student = await dbTestUtils.createStudent();
      const classEnrollment = await dbTestUtils.enrollStudentToClass(
        classRoom,
        student
      );
      requestBody = {
        classId: classEnrollment.classId,
        studentId: classEnrollment.studentId,
      };
    });
    when("I enroll the student to the class again", async () => {
      response = await request(app)
        .post("/class-enrollments")
        .send(requestBody);
    });
    then("I should see a error message", () => {
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("error", "StudentAlreadyEnrolled");
    });
  });
});
