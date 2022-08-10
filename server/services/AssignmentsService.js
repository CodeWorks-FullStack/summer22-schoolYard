import { dbContext } from "../db/DbContext.js"

class AssignmentsService {
  async getAssignmentsByCourseId(courseId) {
    let assignments = await dbContext.Assignments.find({ courseId })
    return assignments
  }

  async createAssignment(assignmentData) {
    let assignment = await dbContext.Assignments.create(assignmentData)
    return assignment
  }

}


export const assignmentsService = new AssignmentsService()
