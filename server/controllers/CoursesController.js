import { Auth0Provider } from "@bcwdev/auth0provider";
import { assignmentsService } from "../services/AssignmentsService.js";
import { coursesService } from "../services/CoursesService.js";
import { enrollmentsService } from "../services/EnrollmentsService.js";
import BaseController from "../utils/BaseController.js";

export class CoursesController extends BaseController {

  constructor() {
    super('api/courses')
    this.router
      .get('', this.getCourses)
      .get('/:courseId/assignments', this.getCourseAssignmentsByCourseId)
      // MIDDLEWARE gatekeeper
      // EVERYTHING BELOW THIS LINE REQUIRES AUTH
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCourse)
      // NOTE remember this when you felt like a god!!!!
      // .get('/:courseId', this.getCourseById)
      .post('/:courseId/enroll', this.enrollInCourse)

    // .use('/:courseId/instructors', Auth0Provider.hasRoles('instructor'))
    // .get('/:courseId/instructors/students', this.getEnrolledStudents)


  }
  async getEnrolledStudents(req, res, next) {
    try {
      const students = await enrollmentsService.getStudentsByCourseId(req.params.courseId)
      res.send(students)
    } catch (error) {
      next(error)
    }
  }



  async getCourses(req, res, next) {
    try {
      let courses = await coursesService.getCourses()
      res.send(courses)
    } catch (error) {
      next(error)
    }
  }

  async createCourse(req, res, next) {
    try {
      let courseData = req.body
      let course = await coursesService.createCourse(courseData)
      res.send(course)
    } catch (error) {
      next(error)
    }
  }

  async getCourseAssignmentsByCourseId(req, res, next) {
    try {
      let assignments = await assignmentsService.getAssignmentsByCourseId(req.params.courseId)
      res.send(assignments)
    } catch (error) {
      next(error)
    }
  }

  async enrollInCourse(req, res, next) {
    try {
      // req.body NEVER NEVER EVER TRUST THE CLIENT
      console.log('the logged in user', req.userInfo) // <- this is the logged in user for this request
      let enrollment = await enrollmentsService.createEnrollment(req.params.courseId, req.userInfo.id)
      res.send(enrollment)
    } catch (error) {
      next(error)
    }
  }

}
