import { StudentAssignment } from "@prisma/client";
import { AssignmentBuilder } from "./AssignmentBuilder";
import { ClassEnrollmentBuilder } from "./ClassEnrollmentBuilder";
import { prisma } from "../../src/database";

export class StudentAssignmentBuilder {
  private classEnrollmentBuilder?: ClassEnrollmentBuilder;
  private assignmentBuilder?: AssignmentBuilder;

  from(classEnrollmentBuilder: ClassEnrollmentBuilder) {
    this.classEnrollmentBuilder = classEnrollmentBuilder;
    return this;
  }

  and(assignmentBuilder: AssignmentBuilder) {
    this.assignmentBuilder = assignmentBuilder;
    return this;
  }

  async build(): Promise<StudentAssignment> {
    if (!this.classEnrollmentBuilder)
      throw new Error("you must define the enrollment builder");
    if (!this.assignmentBuilder)
      throw new Error("you must define the assignment builder");

    const assignment = await this.assignmentBuilder.build();
    const enrollment = await this.classEnrollmentBuilder.build();

    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId: enrollment.studentId,
        assignmentId: assignment.id,
      },
    });

    return studentAssignment;
  }
}
