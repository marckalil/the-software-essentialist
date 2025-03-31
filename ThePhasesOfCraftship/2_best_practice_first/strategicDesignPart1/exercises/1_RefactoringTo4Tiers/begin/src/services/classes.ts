import { Database } from "../database";
import { CreateClassDTO, AssignStudentToClassDTO } from "../dtos/classes";
import { Errors } from "../errors";
import { 
	StudentNotFoundException, 
	ClassNotFoundException, 
	StudentAlreadyEnrolledException
} from "../exceptions";
import { isUUID } from "../utils";

export class ClassesService {
	constructor(private readonly db: Database) {}

 	async createClass(dto: CreateClassDTO){
		const { name } = dto;
		const cls = await this.db.classes.save(name);
		return cls;
	}

  async assignStudentToClass(dto: AssignStudentToClassDTO) {
		const { studentId, classId } = dto;

		// check if student exists
		const student = await this.db.students.getById(studentId);
		if (!student) throw new StudentNotFoundException();

		// check if class exists
		const cls = await this.db.classes.getById(classId);
		if (!cls) throw new ClassNotFoundException(classId);

		// check if student is already enrolled in class
		const duplicatedClassEnrollment = await this.db.classes.getEnrollment(classId, studentId);
		if (duplicatedClassEnrollment) throw new StudentAlreadyEnrolledException();

		// enroll student in class
		const classEnrollment = await this.db.classes.enrollStudent(classId, studentId);
		return classEnrollment;
	}

	async getClassAssignments(classId: string) {
			if(!isUUID(classId)) throw new Error(Errors.ValidationError);
	
			// check if class exists
			const cls = await this.db.classes.getById(classId);
			if (!cls) throw new ClassNotFoundException(classId);
	
			const assignments = await this.db.classes.getAssignments(classId);
			return assignments;
	}
}