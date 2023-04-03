import mongoose, { Schema } from "mongoose";

const workoutSchema = new Schema({
    name: { type: String, unique: true},
    exercises: [ { type: Schema.Types.ObjectId, ref: "ExerciseSchema" } ],
    user:  { type: String, required: true } ,
}, {
    timestamps: true
});


export default mongoose.model("WorkoutSchema", workoutSchema);