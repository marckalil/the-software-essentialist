import { ClassEnrollment, PrismaClient } from '@prisma/client';
import { Student, Class, Assignment, StudentAssignment } from '@prisma/client';

interface StudentPersistence {
	save: (name: string) => Promise<Student>;
	getById: (id: string) => Promise<Student | null>;
	getAll: () => Promise<Student[]>;
	getAssignments: (id: string) => Promise<StudentAssignment[]>;
	getGrades: (id: string) => Promise<StudentAssignment[]>;
}

interface ClassPersistence {
	save: (name: string) => Promise<Class>;
	enrollStudent: (classId: string, studentId: string) => Promise<ClassEnrollment>;
	getById: (id: string) => Promise<Class | null>;
	getEnrollment: (classId: string, studentId: string) => Promise<ClassEnrollment | null>;
	getAssignments: (classId: string) => Promise<Assignment[]>;
}

interface AssignmentPersistence {
	save: (classId: string, title: string) => Promise<Assignment>;
	assignStudent: (assignmentId: string, studentId: string) => Promise<StudentAssignment>;
	getById: (assignmentId: string) => Promise<Assignment | null>;
	submit: (id: string) => Promise<StudentAssignment>;
	grade: (id: string, grade: string) => Promise<StudentAssignment>;
}
export class Database {
	public assignments: AssignmentPersistence;
	public classes: ClassPersistence;
	public students: StudentPersistence;
	constructor(private readonly prisma: PrismaClient) {
		this.assignments = this.buildAssignmentPersistence();
		this.classes = this.buildClassPersistence();
		this.students = this.buildStudentPersistence();
	}

	/** ============= ASSIGNMENTS ============= */
	private buildAssignmentPersistence(): AssignmentPersistence {
		return {
			save: this.saveAssignment,
			getById: this.getAssignmentById,
			assignStudent: this.assignStudentToAssignment,
			submit: this.submitAssignment,
			grade: this.gradeAssignment,
		}
	}

	private async saveAssignment(classId: string, title: string): Promise<Assignment> {
		const assignment = await this.prisma.assignment.create({
			data: {
				classId,
				title
			}
		});
		return assignment;
	}

	private async getAssignmentById(id: string): Promise<Assignment | null> {
		const assignment = await this.prisma.assignment.findUnique({
			where: { id },
			include: {
				class: true,
				studentTasks: true
		}
		});
		return assignment;
	}

	private async assignStudentToAssignment(assignmentId: string, studentId: string): Promise<StudentAssignment> {
		const studentAssignment = await this.prisma.studentAssignment.create({
			data: {
				assignmentId,
				studentId
			}
		});
		return studentAssignment;
	}

	private async submitAssignment(id: string): Promise<StudentAssignment> {
		const studentAssignment = await this.prisma.studentAssignment.update({
			where: { id },
			data: { status: 'submitted' }
		});
		return studentAssignment;
	}

	private async gradeAssignment(id: string, grade: string): Promise<StudentAssignment> {
		const studentAssignment = await this.prisma.studentAssignment.update({
			where: { id },
			data: { grade }
		});
		return studentAssignment;
	}

	/** ============= CLASSES ============= */
	private buildClassPersistence(): ClassPersistence {
		return {
			save: this.saveClass,
			enrollStudent: this.enrollStudentToClass,
			getById: this.getClassById,
			getEnrollment: this.getClassEnrollment,
			getAssignments: this.getClassAssignments
		}
	}
	private async saveClass(name: string): Promise<Class> {
		const cls = await prisma.class.create({
			data: {
					name
			}
		});
		return cls;
	}

	private async enrollStudentToClass(classId: string, studentId: string): Promise<ClassEnrollment> {
		const classEnrollment = await prisma.classEnrollment.create({
			data: {
					studentId,
					classId
			}
		});
		return classEnrollment;
	}

	private async getClassById(id: string): Promise<Class | null> {
		const cls = await this.prisma.class.findUnique({
			where: { id }
		});
		return cls;
	}

	private async getClassEnrollment(classId: string, studentId: string): Promise<ClassEnrollment | null> {
		const classEnrollment = await this.prisma.classEnrollment.findFirst({
			where: {
				classId,
				studentId
			}
		});
		return classEnrollment;
	}

	private async getClassAssignments(classId: string): Promise<Assignment[]> {
		const assignments = await this.prisma.assignment.findMany({
			where: { classId },
			include: {
				class: true,
				studentTasks: true
			}
		});
		return assignments;
	}


	/** ============= STUDENTS ============= */
	private buildStudentPersistence(): StudentPersistence {
		return {
			save: this.saveStudent,
			getById: this.getStudentById,
			getAll: this.getAllStudents,
			getAssignments: this.getStudentAssignments,
			getGrades: this.getStudentGrades
		}
	}

	private async saveStudent(name: string): Promise<Student> {
		const student = await this.prisma.student.create({
			data: {
					name
			}
		});
		return student;
	}

	private async getStudentById(id: string): Promise<Student | null> {
		const student = await this.prisma.student.findUnique({
			where: { id },
			include: {
					classes: true,
					assignments: true,
					reportCards: true
			}
		});
		return student;
	}

	private async getAllStudents(): Promise<Student[]> {
		const students = await this.prisma.student.findMany({
			include: {
					classes: true,
					assignments: true,
					reportCards: true
			}, 
			orderBy: {
					name: 'asc'
			}
		});
		return students;
	}

	private async getStudentAssignments(id: string): Promise<StudentAssignment[]> {
		const studentAssignments = await this.prisma.studentAssignment.findMany({
			where: {
					studentId: id,
					status: 'submitted'
			},
			include: {
					assignment: true
			}
		});
		return studentAssignments;
	}

	private async getStudentGrades(id: string): Promise<StudentAssignment[]> {
		const studentAssignments = await this.prisma.studentAssignment.findMany({
			where: {
				studentId: id,
				status: 'submitted',
				grade: {
						not: null
				}
			},
			include: {
					assignment: true
			}
		});
		return studentAssignments;
	}
}