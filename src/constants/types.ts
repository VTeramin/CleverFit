import { calendarModalType, status } from "./enums"

export type validChange = {
    password: "success" | "error",
    password2: "success" | "error"
}

export type validAuth = {
    email: "error" | "success",
    password: "error" | "success",
    password2: "error" | "success",
    passwordHelp: "error" | "normal",
    password2Help: "error" | "normal"
}

export type passwords = {
    password: string,
    password2: string
}

export type login = {
    email: string,
    isRemember: boolean,
    password: string,
    password2: string
}

export type feedback = {
    imageSrc: string,
    fullName: string,
    rating: number,
    createdAt: string,
    message: string
}

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
