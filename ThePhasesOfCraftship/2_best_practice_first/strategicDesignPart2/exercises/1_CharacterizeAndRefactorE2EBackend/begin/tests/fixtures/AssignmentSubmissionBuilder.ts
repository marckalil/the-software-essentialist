import type { AssignmentSubmission, StudentAssignment } from "./types";
import { StudentAssignmentBuilder } from "./StudentAssignmentBuilder";
import { prisma } from "../../src/database";

export class AssignmentSubmissionBuilder {
  private assignmentSubmission: Partial<AssignmentSubmission>;
  private studentAssignmentBuilder?: StudentAssignmentBuilder;

  constructor() {
    this.studentAssignmentBuilder = undefined;
    this.assignmentSubmission = {
      submissionContent: "faker.word.words()",
    };
  }

  from(studentAssignmentBuilder: StudentAssignmentBuilder) {
    this.studentAssignmentBuilder = studentAssignmentBuilder;
    return this;
  }

  async build(): Promise<{
    assignmentSubmission: AssignmentSubmission;
    studentAssignment: StudentAssignment;
  }> {
    if (!this.studentAssignmentBuilder)
      throw new Error("You must define the student assignment builder");

    const studentAssignment = await this.studentAssignmentBuilder.build();

    const assignmentSubmission = await prisma.assignmentSubmission.create({
      data: {
        studentAssignmentId: studentAssignment.id,
        submissionContent: this.assignmentSubmission.submissionContent,
      },
    });

    return { assignmentSubmission, studentAssignment };
  }
}
