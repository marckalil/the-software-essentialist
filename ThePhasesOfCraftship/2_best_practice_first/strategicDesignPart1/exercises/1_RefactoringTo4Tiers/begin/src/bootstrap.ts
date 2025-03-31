import { PrismaClient } from '@prisma/client';
import { Database } from './database';
import { StudentsService } from './services/students';
import { ClassesService } from './services/classes';
import { AssignmentsService } from './services/assignments';

const prisma = new PrismaClient();
const db = new Database(prisma);

const assignmentsService = new AssignmentsService(db);
const classesService = new ClassesService(db);
const studentsService = new StudentsService(db);