import { StudentAssignment } from "@prisma/client";
import { AssignmentBuilder } from "./AssignmentBuilder";
import { EnrollmentBuilder } from "./EnrollementBuilder";
import { prisma } from "../../src/database";

export class StudentAssignmentBuilder {
  private enrollmentBuilder?: EnrollmentBuilder;
  private assignmentBuilder?: AssignmentBuilder;

  from(enrollmentBuilder: EnrollmentBuilder) {
    this.enrollmentBuilder = enrollmentBuilder;
    return this;
  }

  and(assignmentBuilder: AssignmentBuilder) {
    this.assignmentBuilder = assignmentBuilder;
    return this;
  }

  async build(): Promise<StudentAssignment> {
    if (!this.enrollmentBuilder)
      throw new Error("you must define the enrollment builder");
    if (!this.assignmentBuilder)
      throw new Error("you must define the assignment builder");

    const assignment = await this.assignmentBuilder.build();
    const enrollment = await this.enrollmentBuilder.build();

    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId: enrollment.studentId,
        assignmentId: assignment.id,
      },
    });

    return studentAssignment;
  }
}
