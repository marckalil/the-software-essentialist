import { faker } from "@faker-js/faker";
import { Class } from "@prisma/client";
import { prisma } from "../../src/database";

export class ClassRoomBuilder {
  private classRoom: Partial<Class>;

  constructor() {
    this.classRoom = {
      name: faker.company.buzzNoun(),
    };
  }

  withName(name: string) {
    this.classRoom.name = name;
    return this;
  }

  async build(): Promise<Class> {
    let classroom = await prisma.class.create({
      data: {
        name: this.classRoom.name as string,
      },
    });
    return classroom;
  }
}
