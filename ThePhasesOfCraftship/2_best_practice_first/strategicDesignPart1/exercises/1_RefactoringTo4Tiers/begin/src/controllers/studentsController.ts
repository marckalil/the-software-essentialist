import express,{ NextFunction, Request, Response } from 'express';

import { CreateStudentDTO } from "../dtos/students";
import { StudentsService } from "../services/students";
import { parseForResponse } from '../utils';
import { ErrorHandler } from '../shared/errors';

export class StudentsController {
  private readonly router: express.Router;

	constructor(
    private readonly studentsService: StudentsService,
    private readonly errorHandler: ErrorHandler
  ) {
    this.router = express.Router();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  private setupRoutes() {
    this.router.post('/', this.createStudent);
    this.router.get('/', this.getAllStudents);
    this.router.get('/:id', this.getStudent);
    this.router.get('/:id/assignments', this.getStudentSubmittedAssignments);
    this.router.get('/:id/grades', this.getStudentGrades);
  }

  getRouter() {
    return this.router;
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  async createStudent(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
    try {
      const dto = CreateStudentDTO.fromRequestBody(req.body);
      const student = await this.studentsService.createStudent(dto);
      res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
    } catch (error) {
      next(error);
    }
  }

	async getAllStudents(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const students = await this.studentsService.getAllStudents();
      res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
    } catch (error) {
      next(error);
    }
  }

	async getStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const student = await this.studentsService.getStudent(id);
      res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
    } catch (error) {
      next(error);
    }
	}

	async getStudentSubmittedAssignments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const studentAssignments = await this.studentsService.getStudentSubmittedAssignments(id);
      res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
      next(error);
    }
	}

	async getStudentGrades(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const studentAssignments = await this.studentsService.getStudentGrades(id);  
      res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
      next(error);
    }
	}
}