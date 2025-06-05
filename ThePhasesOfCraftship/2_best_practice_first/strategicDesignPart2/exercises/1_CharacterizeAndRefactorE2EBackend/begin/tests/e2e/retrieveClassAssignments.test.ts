import { loadFeature, defineFeature } from "jest-cucumber";
import path from "path";
import request from "supertest";

import { app } from "../../src/index";
import { resetDatabase } from "../fixtures/reset";
import { ClassRoom } from "../fixtures/types";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieveClassAssignments.feature")
);

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await resetDatabase();
  });
  test("Successfully retrieving assignments for a class room", ({
    given,
    when,
    then,
  }) => {
    let classRoom: ClassRoom;
    let response: any = {};
    given("I have a class room with assignments", async () => {
      const res = await request(app)
        .post("/classes")
        .send({ name: "Math Class" });
      classRoom = res.body.data;
      await request(app)
        .post("/assignments")
        .send({ classId: classRoom.id, title: "Math Assignment 1" });
      await request(app)
        .post("/assignments")
        .send({ classId: classRoom.id, title: "Math Assignment 2" });
    });
    when("I request all the assignments for this class room", async () => {
      response = await request(app).get(`/classes/${classRoom.id}/assignments`);
    });
    then("I should receive all the assignments for this class room", () => {
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].title).toBe("Math Assignment 1");
      expect(response.body.data[1].title).toBe("Math Assignment 2");
    });
  });
  test("Attempt to retrieve assignments for a non-existent class room", ({
    when,
    then,
  }) => {
    let response: any = {};
    when(
      "I request the assignments of a class room that does not exist",
      async () => {
        response = await request(app).get(
          "/classes/aec6817e-66b4-4ce5-8a25-f3ec459e40df/assignments"
        );
      }
    );
    then("I should get an error", () => {
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "ClassNotFound");
      expect(response.body).toHaveProperty("success", false);
      expect(response.body.data).toBeUndefined();
    });
  });
});
