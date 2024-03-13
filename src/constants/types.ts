import { FieldData } from 'rc-field-form/lib/interface';

export type exercise = {
    _id?: string,
    name: string,
    replays: number,
    weight: number,
    approaches: number,
    isImplementation?: boolean
}

export type formFields = {
    [key: string]: FieldData[]
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
