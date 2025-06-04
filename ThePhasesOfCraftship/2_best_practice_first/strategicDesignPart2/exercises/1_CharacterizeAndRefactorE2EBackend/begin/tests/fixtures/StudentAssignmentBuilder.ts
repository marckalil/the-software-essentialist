import { StudentAssignment } from "@prisma/client";
import { prisma } from "../../src/database";
import { Assignment, ClassEnrollment } from "./types";

export class StudentAssignmentBuilder {
  private classEnrollment?: ClassEnrollment;
  private assignment?: Assignment;

  from(classEnrollment: ClassEnrollment) {
    this.classEnrollment = classEnrollment;
    return this;
  }

  and(assignment: Assignment) {
    this.assignment = assignment;
    return this;
  }

  async build(): Promise<StudentAssignment> {
    if (!this.classEnrollment)
      throw new Error("you must define the class enrollment");
    if (!this.assignment) throw new Error("you must define the assignment");

    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId: this.classEnrollment.studentId,
        assignmentId: this.assignment.id,
      },
    });

    return studentAssignment;
  }
}
