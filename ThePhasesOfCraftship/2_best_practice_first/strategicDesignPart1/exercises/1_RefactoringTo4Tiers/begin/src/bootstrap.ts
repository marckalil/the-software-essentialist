import { PrismaClient } from '@prisma/client';
import { Database } from './database';

const prisma = new PrismaClient();
const db = new Database(prisma);