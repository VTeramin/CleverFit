import { ECalendarModalType, EStatus, EValid } from './enums'

export type TValidChange = {
    password: EValid.success | EValid.error,
    confirmPassword: EValid.success | EValid.error
}

export type TValidAuth = {
    email: EValid.error | EValid.success,
    password: EValid.error | EValid.success,
    confirmPassword: EValid.error | EValid.success,
    passwordHelp: EValid.error | EValid.normal,
    confirmPasswordHelp: EValid.error | EValid.normal
}

export type TPasswords = {
    password: string,
    confirmPassword: string
}

export type TLogin = {
    email: string,
    isRemember: boolean,
    password: string,
    confirmPassword: string,
    valid: TValidChange
}

export type TFeedback = {
    id: string,
    imageSrc: string,
    fullName: string,
    rating: number,
    createdAt: string,
    message: string
}

export type TExercise = {
    name: string,
    replays: number,
    weight: number,
    approaches: number,
    _id?: string,
    isImplementation?: boolean
}

export type TDrawerFormFields = {
    [key: string]: {
        name?: string,
        replays?: number,
        weight?: number,
        approaches?: number,
        isImplementation?: boolean
    }
}

export type TTraining = {
    name: string,
    date: Date,
    exercises: TExercise[],
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

export type TCalendarModal = {
    isEdit: boolean,
    isModal: boolean,
    isDrawer: boolean,
    resultType: EStatus,
    modalType: ECalendarModalType,
    modalCoord: {
        x: number,
        y: number
    },
    selectedTraining: string | null,
    editTraining: string | null,
    exerciseFormFields: TDrawerFormFields
}

export type TSettingsSwitchesData = {
    [name: string]: {
        text: string,
        title: string
    }
}
