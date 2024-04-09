import { ECalendarModalType, EJointStatus, EStatus, EValid } from './enums'

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
    date: string,
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
    isJoint: boolean,
    isModal: boolean,
    isDrawer: boolean,
    resultType: EStatus,
    modalType: ECalendarModalType,
    modalCoord: {
        x: number,
        y: number
    },
    selectedTraining: string | null,
    selectedPal: string | null,
    editTraining: string | null,
    interval: number | null,
    isSaveDisabled: boolean,
    exerciseFormFields: TDrawerFormFields
}

export type TSettingsSwitchesData = {
    [name: string]: {
        text: string,
        title: JSX.Element,
        disabled: boolean,
        test: {
            [name: string]: string
        }
    }
}

export type TSwitchesValues = {
    [name: string]: boolean | undefined
}

export type TUserDataFormReponse = {
    email?: string,
    firstName?: string,
    lastName?: string,
    birthday?: string,
    imgSrc?: string,
    readyForJointTraining?: boolean,
    sendNotification?: boolean,
    tariff?: {
        tariffId?: string,
        expired?: Date
    }
}

export type TInvite = {
    _id: string,
    from: {
      _id: string,
      firstName: string | null,
      lastName: string | null,
      imageSrc: string | null
    },
    training: TTraining,
    status: EJointStatus,
    createdAt: string
  }

export type TUserData = {
    isAuthorized: boolean,
    sessionToken: string,
    invites: TInvite[],
    userInfo: TUserDataFormReponse
}

export type TTariffsInfo = {
    [name: string]: {
        free: boolean,
        pro: boolean
    }
}

export type TDrawerTitles = {
    [name: string]: JSX.Element
}
