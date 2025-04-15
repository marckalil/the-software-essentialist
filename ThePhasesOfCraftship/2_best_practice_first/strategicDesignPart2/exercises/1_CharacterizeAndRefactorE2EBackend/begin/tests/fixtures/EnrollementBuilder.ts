import { ClassEnrollment } from "@prisma/client";
import { prisma } from "../../src/database";
import { ClassRoomBuilder } from "./ClassRoomBuilder";
import { StudentBuilder } from "./StudentBuilder";

export class EnrollmentBuilder {
  private classRoomBuilder?: ClassRoomBuilder;
  private studentBuilder?: StudentBuilder;

  from(classRoomBuilder: ClassRoomBuilder) {
    this.classRoomBuilder = classRoomBuilder;
    return this;
  }

  and(studentBuilder: StudentBuilder) {
    this.studentBuilder = studentBuilder;
    return this;
  }

  async build(): Promise<ClassEnrollment> {
    if (!this.classRoomBuilder)
      throw new Error("You must define the classroom builder");
    if (!this.studentBuilder)
      throw new Error("You must define the student builder");

    const classRoom = await this.classRoomBuilder.build();
    const student = await this.studentBuilder.build();
    const enrollment = await prisma.classEnrollment.upsert({
      where: {
        studentId_classId: {
          studentId: student.id,
          classId: classRoom.id,
        },
      },
      update: {
        studentId: student.id,
        classId: classRoom.id,
      },
      create: {
        studentId: student.id,
        classId: classRoom.id,
      },
    });

    return enrollment;
  }
}
