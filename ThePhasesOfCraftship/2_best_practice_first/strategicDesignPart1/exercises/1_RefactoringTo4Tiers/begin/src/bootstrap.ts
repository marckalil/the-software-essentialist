import { PrismaClient } from '@prisma/client';
import { Database } from './database';
import { StudentsService } from './services/students';
import { ClassesService } from './services/classes';
import { AssignmentsService } from './services/assignments';
import { StudentsController } from './controllers/studentsController';
import { ClassesController } from './controllers/classesController';
import { AssignmentsController } from './controllers/assignmentsController';

const prisma = new PrismaClient();
const db = new Database(prisma);

const assignmentsService = new AssignmentsService(db);
const classesService = new ClassesService(db);
const studentsService = new StudentsService(db);

const assignmentsController = new AssignmentsController(assignmentsService);
const classesController = new ClassesController(classesService);
const studentsController = new StudentsController(studentsService);