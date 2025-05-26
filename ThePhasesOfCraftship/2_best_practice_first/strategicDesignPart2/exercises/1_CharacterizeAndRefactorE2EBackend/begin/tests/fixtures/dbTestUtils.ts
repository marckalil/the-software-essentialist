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

const studentBuilder = new StudentBuilder().withName("John").withRandomEmail();

const classroomBuilder = new ClassRoomBuilder().withName("Math");

const classEnrollmentBuilder = new ClassEnrollmentBuilder()
  .from(classroomBuilder)
  .and(studentBuilder);

const assignmentBuilder = new AssignmentBuilder().from(classroomBuilder);

const studentAssignmentBuilder = new StudentAssignmentBuilder()
  .from(classEnrollmentBuilder)
  .and(assignmentBuilder);

const assignmentSubmissionBuilder = new AssignmentSubmissionBuilder().from(
  studentAssignmentBuilder
);

const assignmentGradeBuilder = new AssignmentGradeBuilder().from(
  assignmentSubmissionBuilder
);

/**
 * @returns {Promise<Student>} A promise that resolves to a Student object.
 * @description Creates a new student to the database.
 */
export async function createStudent(
  inputName: string = "John"
): Promise<Student> {
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

/**
 * @returns {Promise<ClassRoom>} A promise that resolves to a ClassRoom object.
 * @description Creates a new classroom to the database.
 */
async function createClassRoom(): Promise<ClassRoom> {
  const { id, name } = await classroomBuilder.build();
  return {
    id,
    name,
  };
}

/**
 * @returns {Promise<ClassEnrollment>} A promise that resolves to a ClassEnrollment object.
 * @description
 * -> Creates a new student to the database
 * -> Creates a new classroom to the database
 * -> Enrolls the student to the class.
 */
async function enrollStudentToClass(): Promise<ClassEnrollment> {
  const { classId, studentId } = await classEnrollmentBuilder.build();
  return {
    classId,
    studentId,
  };
}

/**
 * @returns {Promise<Assignment>} A promise that resolves to an Assignment object.
 * @description
 * -> Creates a new classroom to the database
 * -> Creates a new assignment for the class.
 */
async function createAssignment(): Promise<Assignment> {
  const { id, classId, title } = await assignmentBuilder.build();
  return {
    id,
    classId,
    title,
  };
}

/**
 * @returns {Promise<StudentAssignment>} A promise that resolves to a StudentAssignment object.
 * @description
 * -> Enrolls a student to a class.
 * -> Creates an assignment for the class.
 * -> Assigns the student to the assignment.
 */
async function assignStudentToAssignment(): Promise<StudentAssignment> {
  const { assignmentId, studentId } = await studentAssignmentBuilder.build();
  return {
    assignmentId,
    studentId,
  };
}

/**
 * @returns {Promise<{ assignmentSubmission: AssignmentSubmission; studentAssignment: StudentAssignment }>} A promise that resolves to an object containing an AssignmentSubmission and a StudentAssignment.
 * @description
 * -> Enrolls a student to a class.
 * -> Creates an assignment for the class.
 * -> Assigns the student to the assignment.
 * -> Submits the assignment.
 */
export async function submitAssignment(): Promise<{
  assignmentSubmission: AssignmentSubmission;
  studentAssignment: StudentAssignment;
}> {
  const { assignmentSubmission, studentAssignment } =
    await assignmentSubmissionBuilder.build();
  return {
    assignmentSubmission,
    studentAssignment,
  };
}

export async function gradeAssignment(): Promise<{
  assignmentGrade: AssignmentGrade;
  studentAssignment: StudentAssignment;
}> {
  return await assignmentGradeBuilder.build();
}

export const dbTestUtils = {
  createStudent,
  createClassRoom,
  enrollStudentToClass,
  createAssignment,
  assignStudentToAssignment,
  submitAssignment,
};
