export enum ECalendarModalType {
    default = 'default',
    newTraining = 'newTraining'
}

export enum EBadgeColors {
    'Ноги' = '#fa541c',
    'Силовая' = '#fadb14',
    'Руки' = '#13c2c2',
    'Грудь' = '#52c41a',
    'Спина' = '#fa8c16'
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
    successEdit = 'successEdit',
    successFeedback = 'successFeedback',
    errorFeedback = 'errorFeedback',
    successTariff = 'successTarif',
    errorTrainingList = 'errorTrainingList',
    errorUserJointTrainingList = 'errorUserJointTrainingList',
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
    noDate='noDate',
    joint='joint'
}

export enum EJointStatus {
    accepted='accepted',
    pending='pending',
    rejected='rejected'
}
