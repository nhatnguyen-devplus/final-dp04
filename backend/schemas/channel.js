import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ChannelSchema = new Schema(
  {
    name: {
      type: String,
    },
    slackId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const Channel = mongoose.model('channels', ChannelSchema)
