export enum ECalendarModalType {
    default = 'default',
    newTraining = 'newTraining'
}

export enum EBadgeColors {
    'Ноги' = 'volcano',
    'Силовая' = 'yellow',
    'Руки' = 'cyan',
    'Грудь' = 'green',
    'Спина' = 'orange',
    'Кардио' = 'pink'
}

export enum EValid {
    normal = 'normal',
    error = 'error',
    success = 'success'
}

export enum EStatus {
    empty = '',
    redirect = 'redirect',
    noToken = 'noToken',
    error = 'error',
    success = 'success',
    successFeedback = 'successFeedback',
    errorFeedback = 'errorFeedback',
    successTariff = 'successTarif',
    errorTrainingList = 'errorTrainingList',
    errorSaveTraining = 'errorSaveTraining',
    errorUploadPicture = 'errorUploadPicture',
    errorSaveUserData = 'errorSaveUserData'
}

export enum EROUTE {
    HOME = '/',
    AUTH = '/auth',
    REGISTRATION = '/auth/registration',
    CHANGE_PASSWORD = '/auth/change-password',
    CONFIRM_EMAIL = '/auth/confirm-email',
    MAIN = '/main',
    FEEDBACKS = '/feedbacks',
    CALENDAR = '/calendar',
    PROFILE = '/profile',
    SETTINGS = '/settings',
    TRAINING = '/training',
    RESULT = '/result/:result',
    SUCCESS='/result/success',
    SUCCESS_CHANGE_PASSWORD='/result/success-change-password',
    ERROR='/result/error',
    ERROR_LOGIN='/result/error-login',
    ERROR_USER_EXIST='/result/error-user-exist',
    ERROR_EMAIL_NO_EXIST='/result/error-check-email-no-exist',
    ERROR_CHANGE_PASSWORD='/result/error-change-password',
    ERROR_CHECK_EMAIL='/result/error-check-email'
}

export enum EDrawer {
    default='default',
    edit='edit',
    noDate='noDate'
}
