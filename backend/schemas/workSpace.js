import mongoose from 'mongoose'
const Schema = mongoose.Schema

const WorkSpaceSchema = new Schema(
  {
    name: {
      type: String,
    },

    hrchannel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channels',
      },
    ],

    dayoffchannel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channels',
      },
    ],
  },
  {
    timestamps: true,
  }
)
export const WorkSpace = mongoose.model('workspaces', WorkSpaceSchema)
