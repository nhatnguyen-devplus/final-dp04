import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NoteSchema = new Schema(
  {
    requestlogoff: {
      type: String,
      ref: 'requestlogoffs',
    },

    master: [
      {
        type: String,
        ref: 'users',
      },
    ],

    logofffrom: {
      type: Date,
    },

    logoffto: {
      type: Date,
    },

    comment: {
      type: String,
    },

    notestt: {
      type: String,
    },

    notetype: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const NoteRequest = mongoose.model('noterequests', NoteSchema)
