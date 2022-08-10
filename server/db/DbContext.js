import mongoose from 'mongoose';
import { AccountSchema } from '../models/Account';
import { AssignmentSchema } from '../models/Assignment.js';
import { CourseSchema } from '../models/Course.js';
import { EnrollmentSchema } from '../models/Enrollment.js';
import { ValueSchema } from '../models/Value';
import { COURSE } from './Collections.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  //                        v magic string
  Courses = mongoose.model(COURSE, CourseSchema)

  Assignments = mongoose.model('Assignment', AssignmentSchema)

  Enrollments = mongoose.model('Enrollment', EnrollmentSchema)

}

export const dbContext = new DbContext()
