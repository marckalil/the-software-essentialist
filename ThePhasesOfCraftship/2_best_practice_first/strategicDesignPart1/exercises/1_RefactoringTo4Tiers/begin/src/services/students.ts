import { Database } from "../database";
import { CreateStudentDTO } from "../dtos/students";
import { Errors } from "../errors";
import { StudentNotFoundException } from "../exceptions";
import { isUUID } from "../utils";

export class StudentsService {
	constructor(private readonly db: Database) {}

	public async createStudent(dto: CreateStudentDTO){
			const { name } = dto;
			const student = this.db.students.save(name);
			return student;
	}

	public async getAllStudents() {
		const students = await this.db.students.getAll();
		return students;
	}

	public async getStudent(id: string) {
			if(!isUUID(id)) throw new Error(Errors.ValidationError);
			const student = this.db.students.getById(id);
			if (!student) throw new StudentNotFoundException();
			return student;
	}

	async getStudentSubmittedAssignments(id: string) {
		if(!isUUID(id)) throw new Error(Errors.ValidationError);
		// check if student exists
		const student = await this.db.students.getById(id);
		if (!student) throw new StudentNotFoundException();

		const studentAssignments = await this.db.students.getAssignments(id);
		return studentAssignments;
	}

	async getStudentGrades(id: string) {
		if(!isUUID(id)) throw new Error(Errors.ValidationError);
		// check if student exists
		const student = await this.db.students.getById(id);
		if (!student) throw new StudentNotFoundException();

		const studentAssignments = await this.db.students.getGrades(id);
		return studentAssignments;
	}
}
