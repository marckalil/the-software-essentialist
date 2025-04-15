import { faker } from "@faker-js/faker";
import { Student } from "@prisma/client";
import { prisma } from "../../src/database";

export class StudentBuilder {
  private _name: string;
  private _email: string;

  constructor() {
    this._name = "";
    this._email = "";
  }

  public withName(name: string): StudentBuilder {
    this._name = name;
    return this;
  }

  public withRandomEmail(): StudentBuilder {
    this._email = faker.internet.email();
    return this;
  }

  async build(): Promise<Student> {
    const student = await prisma.student.upsert({
      where: {
        email: this._email,
      },
      update: {
        name: this._name,
        email: this._email,
      },
      create: {
        name: this._name,
        email: this._email,
      },
    });
    return student;
  }
}
