import { calendarModalType, status, valid } from "./enums"

export type validChange = {
    password: valid.success | valid.error,
    confirmPassword: valid.success | valid.error
}

export type validAuth = {
    email: valid.error | valid.success,
    password: valid.error | valid.success,
    confirmPassword: valid.error | valid.success,
    passwordHelp: valid.error | valid.normal,
    confirmPasswordHelp: valid.error | valid.normal
}

export type passwords = {
    password: string,
    confirmPassword: string
}

export type login = {
    email: string,
    isRemember: boolean,
    password: string,
    confirmPassword: string
}

export type feedback = {
    imageSrc: string,
    fullName: string,
    rating: number,
    createdAt: string,
    message: string
}

export type exercise = {
    name: string,
    replays: number,
    weight: number,
    approaches: number,
    _id?: string,
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
    name: string,
    date: Date,
    exercises: exercise[],
    _id?: string,
    isImplementation?: boolean,
    userId?: string,
    parameters?: {
        repeat: boolean,
        period: number,
        jointTraining: boolean,
        participants: string[]
    }
}

export type calendarModal = {
    isEdit: boolean,
    isModal: boolean,
    isDrawer: boolean,
    resultType: status,
    modalType: calendarModalType,
    modalCoord: {
        x: number,
        y: number
    },
    selectedTraining: string | null,
    editTraining: string | null,
    exerciseFormFields: drawerFormFields
}
