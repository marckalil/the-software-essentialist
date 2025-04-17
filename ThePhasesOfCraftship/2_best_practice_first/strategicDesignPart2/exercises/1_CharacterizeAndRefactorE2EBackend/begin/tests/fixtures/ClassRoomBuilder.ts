import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";
import type { ClassRoom } from "./types";

export class ClassRoomBuilder {
  private classRoom: Partial<ClassRoom>;

  constructor() {
    this.classRoom = {
      name: faker.company.buzzNoun(),
    };
  }

  withName(name: string) {
    this.classRoom.name = name;
    return this;
  }

  async build(): Promise<ClassRoom> {
    let classroom = await prisma.class.upsert({
      where: {
        name: this.classRoom.name as string,
      },
      update: {
        name: this.classRoom.name as string,
      },
      create: {
        name: this.classRoom.name as string,
      },
    });
    return classroom;
  }
}
