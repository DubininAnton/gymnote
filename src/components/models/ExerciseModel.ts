export type ExerciseModel = {
    email: {
        type: String
    },
    date: {
        type: String
    },
    exercise: {
        type: String
    },
    repetitions:[String],
    weight: [String] 
}

export type getExerciseModel = {
    email: {
        type: String
    },
    exercise: {
        type: String
    }
}