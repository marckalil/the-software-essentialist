import { AssignmentBuilder } from "./AssignmentBuilder";
import { AssignmentGradeBuilder } from "./AssignmentGradeBuilder";
import { AssignmentSubmissionBuilder } from "./AssignmentSubmissionBuilder";
import { ClassEnrollmentBuilder } from "./ClassEnrollmentBuilder";
import { ClassRoomBuilder } from "./ClassRoomBuilder";
import { StudentAssignmentBuilder } from "./StudentAssignmentBuilder";
import { StudentBuilder } from "./StudentBuilder";
import type {
  Assignment,
  AssignmentGrade,
  AssignmentSubmission,
  ClassEnrollment,
  ClassRoom,
  Student,
  StudentAssignment,
} from "./types";

async function createStudent(inputName: string = "John"): Promise<Student> {
  const { id, name, email } = await new StudentBuilder()
    .withName(inputName)
    .withRandomEmail()
    .build();
  return {
    id,
    name,
    email,
  };
}

async function createClassRoom(inputName = "Math"): Promise<ClassRoom> {
  const { id, name } = await new ClassRoomBuilder().withName(inputName).build();
  return {
    id,
    name,
  };
}

async function enrollStudentToClass(
  classRoom: ClassRoom,
  student: Student
): Promise<ClassEnrollment> {
  const { classId, studentId } = await new ClassEnrollmentBuilder()
    .fromClassRoom(classRoom)
    .andStudent(student)
    .build();
  return {
    classId,
    studentId,
  };
}

async function createAssignment(classRoom: ClassRoom): Promise<Assignment> {
  const { id, classId, title } = await new AssignmentBuilder()
    .fromClassRoom(classRoom)
    .build();
  return {
    id,
    classId,
    title,
  };
}

async function assignStudentToAssignment(
  classEnrollment: ClassEnrollment,
  assignment: Assignment
): Promise<StudentAssignment> {
  const studentAssignment = await new StudentAssignmentBuilder()
    .fromClassEnrollment(classEnrollment)
    .andAssignment(assignment)
    .build();
  return studentAssignment;
}

async function submitAssignment(
  studentAssignment: StudentAssignment
): Promise<AssignmentSubmission> {
  const assignmentSubmission = await new AssignmentSubmissionBuilder()
    .fromStudentAssignment(studentAssignment)
    .build();
  return assignmentSubmission;
}

async function gradeAssignment(
  assignmentSubmission: AssignmentSubmission,
  studentAssignment: StudentAssignment,
  grade: string
): Promise<AssignmentGrade> {
  return await new AssignmentGradeBuilder()
    .fromAssignmentSubmission(assignmentSubmission)
    .andStudentAssignment(studentAssignment)
    .withGrade(grade)
    .build();
}

export const dbTestUtils = {
  assignStudentToAssignment,
  createAssignment,
  createClassRoom,
  createStudent,
  enrollStudentToClass,
  gradeAssignment,
  submitAssignment,
};
