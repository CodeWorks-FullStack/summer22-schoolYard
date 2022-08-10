import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, maxlength: 3, minlength: 2 },
    credits: { type: Number, required: true, default: 0, min: 0, max: 10 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
