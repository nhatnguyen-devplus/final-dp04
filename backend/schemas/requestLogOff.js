import mongoose from 'mongoose'
import { RequestSTT } from '../constants/enum'
const Schema = mongoose.Schema

const RequestLogOffSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },

    masters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],

    approval: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],

    logofffrom: {
      type: Date,
    },

    logoffto: {
      type: Date,
    },

    logofftype: {
      type: String,
    },

    contentlog: {
      type: String,
    },

    quantity: {
      type: Number,
    },

    reason: {
      type: String,
    },

    status: {
      type: String,
      enum: Object.values(RequestSTT),
    },
  },
  {
    timestamps: true,
  }
)

export const RequestLogOff = mongoose.model('requestlogoffs', RequestLogOffSchema)
