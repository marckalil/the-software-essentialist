import { prisma } from "../../src/database";
import { AssignmentSubmissionBuilder } from "./AssignmentSubmissionBuilder";
import { AssignmentGrade, StudentAssignment } from "./types";

export class AssignmentGradeBuilder {
  private assignmentSubmissionBuilder?: AssignmentSubmissionBuilder;

  constructor() {
    this.assignmentSubmissionBuilder = undefined;
  }

  from(assignmentSubmissionBuilder: AssignmentSubmissionBuilder) {
    this.assignmentSubmissionBuilder = assignmentSubmissionBuilder;
    return this;
  }

  async build(): Promise<{
    assignmentGrade: AssignmentGrade;
    studentAssignment: StudentAssignment;
  }> {
    if (!this.assignmentSubmissionBuilder)
      throw new Error("You must define the assignment submission builder");
    const { assignmentSubmission, studentAssignment } =
      await this.assignmentSubmissionBuilder.build();
    const assignmentGrade = await prisma.gradedAssignment.create({
      data: {
        grade: "A",
        assignmentSubmissionId: assignmentSubmission.id,
      },
    });
    return {
      assignmentGrade,
      studentAssignment,
    };
  }
}
