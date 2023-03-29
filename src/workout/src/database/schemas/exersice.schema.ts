import mongoose, { Schema } from "mongoose";

const exerciseSchema = new Schema({
    type: { type: String },
    name: { type: String },
    sets: { type: Number },
    reps: { type: String },
    restTime: { type: String },
    weight: { type: Number },
    weightUnit: { type: String },
    workout: { type: Schema.Types.ObjectId, ref: "WorkoutSchema" },

},{
    timestamps: true
});

export default mongoose.model("ExerciseSchema", exerciseSchema);