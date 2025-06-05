import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import request from "supertest";
import { app } from "../../src";

const feature = loadFeature(
  path.join(__dirname, "../features/createStudent.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Successfully create a student", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;
    given(
      /^I want to create a student with name "(.*)" and e-mail "(.*)"$/,
      (name, email) => {
        requestBody = { name, email };
      }
    );

    when("I send a request to create a student", async () => {
      response = await request(app).post("/students").send(requestBody);
    });

    then("the student record should be created", () => {
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("name", requestBody.name);
      expect(response.body.data).toHaveProperty("email", requestBody.email);
    });
  });

  test("Missing e-mail", ({ given, when, then, and }) => {
    let requestBody: any;
    let response: any;
    given(/^I want to create a student name "(.*)" and no e-mail$/, (name) => {
      requestBody = { name };
    });

    when("I send a request to create a student", async () => {
      response = await request(app).post("/students").send(requestBody);
    });

    then("the student should not be created", () => {
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("success", false);
    });

    and("I should receive an error message", () => {
      expect(response.body).toHaveProperty("error", "ValidationError");
    });
  });
});
