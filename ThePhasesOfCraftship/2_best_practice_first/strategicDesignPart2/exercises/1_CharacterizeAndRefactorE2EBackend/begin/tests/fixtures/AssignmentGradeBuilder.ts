import { prisma } from "../../src/database";
import {
  AssignmentGrade,
  AssignmentSubmission,
  StudentAssignment,
} from "./types";

export class AssignmentGradeBuilder {
  private assignmentSubmission?: AssignmentSubmission;
  private studentAssignment?: StudentAssignment;
  private grade?: string;

  constructor() {
    this.assignmentSubmission = undefined;
    this.studentAssignment = undefined;
    this.grade = undefined;
  }

  from(assignmentSubmission: AssignmentSubmission) {
    this.assignmentSubmission = assignmentSubmission;
    return this;
  }

  and(studentAssignment: StudentAssignment) {
    this.studentAssignment = studentAssignment;
    return this;
  }

  withGrade(grade: string) {
    this.grade = grade;
    return this;
  }

  async build(): Promise<AssignmentGrade> {
    if (!this.assignmentSubmission)
      throw new Error("You must define the assignment submission");
    if (!this.studentAssignment)
      throw new Error("You must define the student assignment");
    if (!this.studentAssignment) throw new Error("You must define the grade");
    const assignmentGrade = await prisma.gradedAssignment.create({
      data: {
        grade: this.grade,
        assignmentSubmissionId: this.assignmentSubmission.id,
      },
    });
    return assignmentGrade;
  }
}
