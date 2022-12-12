import mongoose from 'mongoose'
import { TypeHistory } from '../constants/enum'
const Schema = mongoose.Schema

const HistorySchema = new Schema(
  {
    idlogoff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'requestlogoffs',
    },

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

    reason: {
      type: String,
    },

    typelog: {
      type: String,
      enum: Object.values(TypeHistory),
    },
  },
  {
    timestamps: true,
  }
)

export const History = mongoose.model('histories', HistorySchema)
