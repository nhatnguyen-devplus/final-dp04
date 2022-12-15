import mongoose from 'mongoose'
const Schema = mongoose.Schema

const WorkSpaceSchema = new Schema(
  {
    name: {
      type: String,
    },

    hrchanel: [
      {
        type: String,
      },
    ],

    dayoffchanel: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)
export const WorkSpace = mongoose.model('workspaces', WorkSpaceSchema)
