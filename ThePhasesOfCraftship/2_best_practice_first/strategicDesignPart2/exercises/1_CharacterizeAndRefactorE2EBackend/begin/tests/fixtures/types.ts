export type Student = {
  id: string;
  name: string;
  email: string;
};

export type ClassRoom = {
  id: string;
  name: string;
};

export type ClassEnrollment = {
  classId: string;
  studentId: string;
};

export type Assignment = {
  id: string;
  classId: string;
  title: string;
};

export type StudentAssignment = {
  assignmentId: string;
  studentId: string;
};

export type AssignmentSubmission = {
  id: string;
  studentAssignmentId: string;
  submissionContent: string | null;
};
