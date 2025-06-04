import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";

import { app } from "../../src";
import { dbTestUtils } from "../fixtures/dbTestUtils";
import { resetDatabase } from "../fixtures/reset";
import { Student } from "../fixtures/types";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieveStudent.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });
  test("Successfully retrieve a student", ({ given, when, then }) => {
    let response: any;
    let students: Student[] = [];
    given("a list of students", async () => {
      students = await Promise.all([
        dbTestUtils.createStudent("John"),
        dbTestUtils.createStudent("Jane"),
        dbTestUtils.createStudent("Alice"),
      ]);
    });
    when("I want to retrieve an existing student", async () => {
      response = await request(app).get(`/students/${students[1].id}`);
    });
    then("it should return the details of the student", () => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toEqual(
        expect.objectContaining({
          id: students[1].id,
          name: students[1].name,
          email: students[1].email,
        })
      );
    });
  });

  test("Fail to retrieve", ({ given, when, then }) => {
    let response: any;
    given("a list of students", async () => {
      await Promise.all([
        dbTestUtils.createStudent("John"),
        dbTestUtils.createStudent("Jane"),
        dbTestUtils.createStudent("Alice"),
      ]);
    });
    when("I want to retrieve a non-existing student", async () => {
      const nonExistingId = "aec6817e-66b4-4ce5-8a25-f3ec459e40df";
      response = await request(app).get(`/students/${nonExistingId}`);
    });
    then("it should return an error", () => {
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("StudentNotFound");
    });
  });
});
