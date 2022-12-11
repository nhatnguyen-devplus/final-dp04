import mongoose from 'mongoose'
const Schema = mongoose.Schema

const RequestLogOffSchema = new Schema(
  {
    iduser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },

    masters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],

    usergroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
