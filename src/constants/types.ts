export type exercise = {
    _id?: string,
    name: string,
    replays: number,
    weight: number,
    approaches: number,
    isImplementation?: boolean
}

export type drawerFormFields = {
    [key: string]: {
        name: string | undefined,
        replays: number | undefined,
        weight: number | undefined,
        approaches: number | undefined,
        isImplementation?: boolean
    }
}

export type training = {
    _id?: string,
    name: string,
    date: Date,
    isImplementation?: boolean,
    userId?: string,
    parameters?: {
        repeat: boolean,
        period: number,
        jointTraining: boolean,
        participants: string[]
    },
    exercises: exercise[]
}
