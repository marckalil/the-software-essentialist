import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";

import { app } from "../../src";
import { resetDatabase } from "../fixtures/reset";
import { createStudent } from "../fixtures/dbTestUtils";
import { Student } from "../fixtures/types";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieveStudents.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });
  test("Successfully retrieve the list of all the students", ({
    given,
    when,
    then,
  }) => {
    let response: any;
    let students: Student[] = [];
    given("there are students registered", async () => {
      students = await Promise.all([
        createStudent("John"),
        createStudent("Jane"),
        createStudent("Alice"),
      ]);
    });
    when("I as request all the students", async () => {
      response = await request(app).get("/students");
    });
    then("I should retrieve the list of students", () => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data).toHaveLength(students.length);
      students.forEach((student) => {
        expect(response.body.data).toContainEqual(
          expect.objectContaining({
            name: student.name,
            email: student.email,
          })
        );
      });
    });
  });
});
