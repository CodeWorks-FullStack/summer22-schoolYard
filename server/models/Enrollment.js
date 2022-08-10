import mongoose from 'mongoose'
import { COURSE } from '../db/Collections.js'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const EnrollmentSchema = new Schema({

  accountId: { type: ObjectId, required: true, ref: 'Account' },
  courseId: { type: ObjectId, required: true, ref: COURSE }

}, { timestamps: true, toJSON: { virtuals: true } })

EnrollmentSchema.virtual('student', {
  justOne: true,
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account'
})

EnrollmentSchema.virtual('course', {
  justOne: true,
  localField: 'courseId',
  foreignField: '_id',
  ref: COURSE
})



