import express, { Request, Response } from 'express';

import { error } from 'console';
import { get } from 'http';
import { create } from 'domain';

import {
    assignStudentToAssignmentController,
    assignStudentToClassController,
    createAssignmentController,
    createClassController,
    createStudentController,
    getAllStudentsController,
    getAssignmentController,
    getClassAssignmentsController,
    getStudentController,
    getStudentGradesController,
    getStudentSubmittedAssignmentsController,
    gradeStudentAssignmentController,
    submitStudentAssignmentController,
} from './controllers';


const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// API Endpoints

// POST student created
app.post('/students', createStudentController);

// POST class created
app.post('/classes', createClassController);

// POST student assigned to class
app.post('/class-enrollments', assignStudentToClassController);

// POST assignment created
app.post('/assignments', createAssignmentController);


// POST student assigned to assignment
app.post('/student-assignments', assignStudentToAssignmentController);

// POST student submitted assignment
app.post('/student-assignments/submit', submitStudentAssignmentController);

// POST student assignment graded
app.post('/student-assignments/grade', gradeStudentAssignmentController);


// GET all students
app.get('/students', getAllStudentsController);

// GET a student by id
app.get('/students/:id', getStudentController);

// GET assignment by id
app.get('/assignments/:id', getAssignmentController);

// GET all assignments for class
app.get('/classes/:id/assignments', getClassAssignmentsController);

// GET all student submitted assignments
app.get('/student/:id/assignments', getStudentSubmittedAssignmentsController);

// GET all student grades
app.get('/student/:id/grades', getStudentGradesController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
