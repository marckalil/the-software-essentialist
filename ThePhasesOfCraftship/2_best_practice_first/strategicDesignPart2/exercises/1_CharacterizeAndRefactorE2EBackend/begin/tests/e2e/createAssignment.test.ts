import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";

import { app } from "../../src";
import { resetDatabase } from "../fixtures/reset";
import { dbTestUtils } from "../fixtures/dbTestUtils";

const feature = loadFeature(
  path.join(__dirname, "../features/createAssignment.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Successfully create an assignment", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;
    given("a class exists", async () => {
      const classRoom = await dbTestUtils.createClassRoom();
      requestBody = {
        classId: classRoom.id,
        title: "Math Assignment",
      };
    });
    when("I create an assignment for the class", async () => {
      response = await request(app).post("/assignments").send(requestBody);
    });
    then("the assignment should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("classId", requestBody.classId);
      expect(response.body.data).toHaveProperty("title", requestBody.title);
    });
  });

  test("Missing title", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;
    given("a class exist and no title is given to an assignment", async () => {
      const classRoom = await dbTestUtils.createClassRoom();
      requestBody = {
        classId: classRoom.id,
      };
    });
    when("I create an assignment for the class", async () => {
      response = await request(app).post("/assignments").send(requestBody);
    });
    then("I should see an error message", () => {
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "ValidationError");
    });
  });
});
