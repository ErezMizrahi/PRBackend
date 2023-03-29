import { Request, Response, NextFunction } from 'express';
import WorkoutSchema from '../database/schemas/workout.schema.js';
import ExerciseSchema from '../database/schemas/exersice.schema.js';
import { UserRequest } from '../middleware/auth.js';

type WorkoutType = {
    name: string;
    exercises: ExerciseType[]
}

export type ExerciseType = {
    type: ExerciseOptions;
    name:string;
    sets: number;
    reps: string;
    restTime: string;
    weight: number;
    weightUnit: string;
    workoutId: string;
}

type ExerciseOptions = "set" | "super-set" | "drop-set";

export const getWorkout = async (req: Request, res: Response, next: NextFunction) => {
    const { workoutId } = req.params;
    try {
        const workout = await WorkoutSchema.findOne({workoutId});
        res.status(200).json(workout);
    } catch (err) {
        console.error(err);
        next();
    }
}

export const createExercise = async (req: Request, res: Response, next: NextFunction) => {
    const exercise: ExerciseType = req.body;
    try {
        const savedExercise = await new ExerciseSchema(exercise).save();

        const relatedWorkout = await WorkoutSchema.findByIdAndUpdate(exercise.workoutId, 
            { $push: { exercises: savedExercise._id } },
            { new: true, useFindAndModify: false })
            .populate("exercises");

        res.status(200).json(relatedWorkout);

    } catch (err) {
        console.log('cant create exercise', err);
        console.error(err);
        next();

    }

}

export const createWorkout = async (req: UserRequest, res: Response, next: NextFunction) => {
    const workout: WorkoutType = req.body;
    try {
        const savedWorkout = await WorkoutSchema.create({
            name: workout.name,
            exercises: [],
            user: req.user._id
        });

        console.log('inserted workout!');

        res.status(200).json({'workout': savedWorkout});

    } catch (error) {
        console.log('cant create workout this way!')
        console.error(error);
        next();

    }
}