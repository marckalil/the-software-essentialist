import { Assignment } from "@prisma/client";
import { prisma } from "../../src/database";
import { ClassRoomBuilder } from "./ClassRoomBuilder";
import { faker } from "@faker-js/faker";

export class AssignmentBuilder {
  private classRoomBuilder?: ClassRoomBuilder;
  private assignment: Partial<Assignment>;

  constructor() {
    this.classRoomBuilder = undefined;
    this.assignment = {
      title: faker.lorem.word(),
    };
  }

  from(classRoomBuilder: ClassRoomBuilder) {
    this.classRoomBuilder = classRoomBuilder;
    return this;
  }

  async build(): Promise<Assignment> {
    if (!this.classRoomBuilder)
      throw new Error("You must define the classroom builder");

    const classRoom = await this.classRoomBuilder.build();
    const assignment = await prisma.assignment.create({
      data: {
        title: this.assignment.title as string,
        classId: classRoom.id,
      },
    });

    return assignment;
  }
}
