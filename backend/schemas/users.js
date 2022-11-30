import mongoose from 'mongoose'
import { Role } from '../constants/enum'
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      length: 255,
    },

    phone: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
      index: true,
    },

    password: {
      type: String,
    },

    IDstaff: {
      type: String,
    },

    avatar: {
      type: String,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.STAFF,
    },
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.model('users', UserSchema)
