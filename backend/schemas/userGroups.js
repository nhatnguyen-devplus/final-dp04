import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserGroupSchema = new Schema(
  {
    name: {
      type: String,
      length: 255,
    },

    staff: [
      {
        type: String,
        ref: 'users',
      },
    ],

    master: [
      {
        type: String,
        ref: 'users',
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const UserGroup = mongoose.model('usergroups', UserGroupSchema)
