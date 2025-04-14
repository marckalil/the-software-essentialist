import { loadFeature, defineFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";

import { app } from "../../src";
import { ClassRoomBuilder } from "../fixtures/ClassRoomBuilder";
import { resetDatabase } from "../fixtures/reset";
import { StudentBuilder } from "../fixtures/StudentBuilder";

const feature = loadFeature(
  path.join(__dirname, "../features/createClassEnrollment.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });
  test("Successfully enroll a student to a class", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;
    given("an existing student and an existing class", async () => {
      const classRoom = await new ClassRoomBuilder().withName("Math").build();
      const student = await new StudentBuilder()
        .withName("John")
        .withRandomEmail()
        .build();
      requestBody = {
        classId: classRoom.id,
        studentId: student.id,
      };
    });
    when("I enroll the student to the class", async () => {
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
      const classRoom = await new ClassRoomBuilder().withName("Math").build();
      const student = await new StudentBuilder()
        .withName("John")
        .withRandomEmail()
        .build();
      requestBody = {
        classId: classRoom.id,
        studentId: student.id,
      };
      await request(app).post("/class-enrollments").send(requestBody);
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
