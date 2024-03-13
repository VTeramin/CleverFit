import { FieldData } from 'rc-field-form/lib/interface';

export type exercise = {
    name: string,
    replays: number,
    weight: number,
    approaches: number
}

export type formFields = {
    [key: string]: FieldData[]
}
