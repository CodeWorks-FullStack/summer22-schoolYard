import mongoose from 'mongoose'
import { COURSE } from '../db/Collections.js'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AssignmentSchema = new Schema({

  name: { type: String, required: true },
  points: { type: Number, default: 0, required: true },

  // how to tie them together                       v magic string
  courseId: { type: ObjectId, required: true, ref: COURSE }


}, { timestamps: true, toJSON: { virtuals: true } })

