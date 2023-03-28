import { Request, Response, NextFunction } from 'express';

type WorkoutType = {
    name: string;
    exercises: ExerciseType[]
}

type ExerciseType = {
    type: ExerciseOptions;
    name:string;
    sets: number;
    reps: string;
    restTime: string;
    weight: number;
    weightUnit: string;
}

type ExerciseOptions = "set" | "super-set" | "drop-set";

export const createWorkout = (req: Request, res: Response, next: NextFunction) => {
    const workout: WorkoutType = req.body;
    console.log(workout.exercises[0].type);
    res.status(200).json({'message': 'created'});
}