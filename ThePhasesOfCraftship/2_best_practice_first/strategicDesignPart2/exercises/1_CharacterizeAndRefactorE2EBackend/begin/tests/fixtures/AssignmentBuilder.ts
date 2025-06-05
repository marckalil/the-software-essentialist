import { faker } from "@faker-js/faker";
import { Assignment, ClassRoom } from "./types";
import { prisma } from "../../src/database";

export class AssignmentBuilder {
  private classRoom?: ClassRoom;
  private assignment: Partial<Assignment>;

  constructor() {
    this.classRoom = undefined;
    this.assignment = {
      title: faker.lorem.word(),
    };
  }

  fromClassRoom(classRoom: ClassRoom) {
    this.classRoom = classRoom;
    return this;
  }

  async build(): Promise<Assignment> {
    if (!this.classRoom) throw new Error("You must define the classroom");

    const assignment = await prisma.assignment.create({
      data: {
        title: this.assignment.title as string,
        classId: this.classRoom.id,
      },
    });

    return assignment;
  }
}
