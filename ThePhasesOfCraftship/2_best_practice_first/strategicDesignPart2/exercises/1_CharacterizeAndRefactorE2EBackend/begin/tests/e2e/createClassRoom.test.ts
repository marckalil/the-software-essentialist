import { defineFeature, loadFeature } from "jest-cucumber";
import request from "supertest";
import path from "path";
import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import { ClassRoomBuilder } from "../fixtures/ClassRoomBuilder";

const feature = loadFeature(
  path.join(__dirname, "../features/createClassRoom.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("Successfully create a class room", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;

    given(/^I want to create a class room named "(.*)"$/, (name) => {
      requestBody = { name };
    });

    when("I send a request to create a class room", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class room should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });

  test("Class room already exists", ({ given, when, then }) => {
    const className = "History";
    let requestBody: any;
    let response: any;
    given("I want to create a class that already exists", async () => {
      requestBody = { name: className };
      const classRoomBuilder = new ClassRoomBuilder();
      await classRoomBuilder.withName(className).build();
    });

    when("I send a request to create a class room", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class should not be created", () => {
      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        error: "ClassAlreadyExists",
        data: undefined,
        success: false,
      });
    });
  });

  test("Fail to create a class room", ({ given, when, then }) => {
    let requestBody: any;
    let response: any;

    given("I want to create a class room with no name", () => {
      requestBody = {};
    });

    when("I send a request to create a class room", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class room should not be created", () => {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "ValidationError",
        data: undefined,
        success: false,
      });
    });
  });
});
