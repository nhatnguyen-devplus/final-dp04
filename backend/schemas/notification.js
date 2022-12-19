import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NotificationSchema = new Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },

    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },

    logoff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'requestlogoffs',
    },

    description: {
      type: String,
    },

    chanel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'workspaces',
    },

    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)
export const Notification = mongoose.model('notifications', NotificationSchema)
