import { dbContext } from "../db/DbContext.js"

class CoursesService {


  async getCourses() {
    let courses = await dbContext.Courses.find()
    return courses
  }

  async createCourse(courseData) {
    let course = await dbContext.Courses.create(courseData)
    return course
  }

}

export const coursesService = new CoursesService()
