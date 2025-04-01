import { PrismaClient } from '@prisma/client';

import { AssignmentsController } from './controllers/assignmentsController';
import { AssignmentsService } from './services/assignments';
import { ClassesController } from './controllers/classesController';
import { ClassesService } from './services/classes';
import { Database } from './database';
import { errorHandler } from './shared/errors';
import { Server } from './server';
import { StudentsController } from './controllers/studentsController';
import { StudentsService } from './services/students';

const prisma = new PrismaClient();
const db = new Database(prisma);

const assignmentsService = new AssignmentsService(db);
const classesService = new ClassesService(db);
const studentsService = new StudentsService(db);

const assignmentsController = new AssignmentsController(assignmentsService, errorHandler);
const classesController = new ClassesController(classesService, errorHandler);
const studentsController = new StudentsController(studentsService, errorHandler);

export const server = new Server(
	assignmentsController,
	classesController,
	studentsController
);