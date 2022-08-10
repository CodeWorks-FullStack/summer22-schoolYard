import { assignmentsService } from "../services/AssignmentsService.js";
import BaseController from "../utils/BaseController.js";

export class AssignmentsController extends BaseController {

  constructor() {
    super('api/assignments')
    this.router
      .post('', this.createAssignment)
  }

  async createAssignment(req, res, next) {
    try {
      let assignmentData = req.body
      let assignment = await assignmentsService.createAssignment(assignmentData)
      res.send(assignment)
    } catch (error) {
      next(error)
    }

  }



}
