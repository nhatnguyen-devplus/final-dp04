import mongoose from 'mongoose'
const Schema = mongoose.Schema

const RequestLogOffSchema = new Schema(
  {
    iduser: {
      type: String,
      ref: 'users',
    },

    master: [
      {
        type: String,
        ref: 'users',
      },
    ],

    usergroups: [
      {
        type: String,
        ref: 'usergroups',
      },
    ],

    logofffrom: {
      type: Date,
    },

    logoffto: {
      type: Date,
    },

    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const RequestLogOff = mongoose.model('requestlogoffs', RequestLogOffSchema)
