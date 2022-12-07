import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserGroupSchema = new Schema(
  {
    name: {
      type: String,
      length: 255,
    },

    staffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],

    masters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const UserGroup = mongoose.model('usergroups', UserGroupSchema)
