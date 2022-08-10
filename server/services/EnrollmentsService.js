import { dbContext } from "../db/DbContext.js"

class EnrollmentsService {

  async createEnrollment(courseId, studentId) {
    let enrollment = await dbContext.Enrollments.create({ courseId, accountId: studentId })
    return enrollment
  }

  // NOTE simplified option
  // async createEnrollment(courseId, accountId) {
  //   let enrollment = await dbContext.Enrollments.create({ courseId, accountId })
  // }

  async getStudentsByCourseId(courseId) {
    //                                                           v magic string found in the virtual of the schema
    let students = await dbContext.Enrollments.find({ courseId }).populate('student', 'name picture')
    return students
  }

}

export const enrollmentsService = new EnrollmentsService()
