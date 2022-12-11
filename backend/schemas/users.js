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

    groupsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
      },
    ],

    avatar: {
      type: String,
    },

    groupsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usergroups',
      },
    ],

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.STAFF,
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.model('users', UserSchema)
