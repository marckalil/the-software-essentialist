import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import { dbTestUtils } from "../fixtures/dbTestUtils";
import { Assignment } from "../fixtures/types";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieveAssignment.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });
  test("Successfully retrieve an assignment", ({ given, when, then }) => {
    let assignment: Assignment;
    let response: any;
    given("an assignment exists", async () => {
      assignment = await dbTestUtils.createAssignment();
    });
    when("I request this assignment", async () => {
      response = await request(app).get(`/assignments/${assignment.id}`);
    });
    then("I should get the details of the assignment", () => {
      console.log(JSON.stringify(response.body.data, null, 2));
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("title", assignment.title);
      expect(response.body.data).toHaveProperty("class");
      expect(response.body.data).toHaveProperty("studentAssignments");
    });
  });
  test("Attempt to retrieve a non-existent assignment", ({ when, then }) => {
    let response: any;
    when("I request the assignment", async () => {
      response = await request(app).get(
        "/assignments/aec6817e-66b4-4ce5-8a25-f3ec459e40df"
      );
    });
    then("I should receive an error", () => {
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "AssignmentNotFound");
      expect(response.body).toHaveProperty("success", false);
      expect(response.body.data).toBeUndefined();
    });
  });
});
