const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date(),
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "What kind of workout was performed (Required)",
        },
        name: {
          type: String,
          trim: true,
          required: "What was the exercise (Required)",
        },
        duration: {
          type: Number,
          required: "How long did you exercise?",
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
