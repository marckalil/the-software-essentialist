import type { AssignmentSubmission, StudentAssignment } from "./types";
import { prisma } from "../../src/database";

export class AssignmentSubmissionBuilder {
  private assignmentSubmission: Partial<AssignmentSubmission>;
  private studentAssignment?: StudentAssignment;

  constructor() {
    this.studentAssignment = undefined;
    this.assignmentSubmission = {
      submissionContent: "faker.word.words()",
    };
  }

  from(studentAssignment: StudentAssignment) {
    this.studentAssignment = studentAssignment;
    return this;
  }

  async build(): Promise<AssignmentSubmission> {
    if (!this.studentAssignment)
      throw new Error("You must define the student assignment");

    const assignmentSubmission = await prisma.assignmentSubmission.create({
      data: {
        studentAssignmentId: this.studentAssignment.id,
        submissionContent: this.assignmentSubmission.submissionContent,
      },
    });
    return assignmentSubmission;
  }
}
