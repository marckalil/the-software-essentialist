import { prisma } from "../../src/database";
import type { ClassEnrollment, ClassRoom, Student } from "./types";

export class ClassEnrollmentBuilder {
  private classRoom?: ClassRoom;
  private student?: Student;

  fromClassRoom(classRoom: ClassRoom) {
    this.classRoom = classRoom;
    return this;
  }

  andStudent(student: Student) {
    this.student = student;
    return this;
  }

  async build(): Promise<ClassEnrollment> {
    if (!this.classRoom) throw new Error("You must define the classroom");
    if (!this.student) throw new Error("You must define the student");

    const classEnrollment = await prisma.classEnrollment.upsert({
      where: {
        studentId_classId: {
          studentId: this.student.id,
          classId: this.classRoom.id,
        },
      },
      update: {
        studentId: this.student.id,
        classId: this.classRoom.id,
      },
      create: {
        studentId: this.student.id,
        classId: this.classRoom.id,
      },
    });

    return classEnrollment;
  }
}
