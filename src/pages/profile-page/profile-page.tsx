import React, { useEffect, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Passwords } from '@components/passwords/passwords';
import { API } from '@constants/api';
import { EStatus, EValid } from '@constants/enums';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changePasswords, selectLogin } from '@redux/login-slice';
import { changeUserInfo, selectUserData } from '@redux/user-data-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { validEmail } from '@utils/auth-utils/valid-email';
import { checkIsSubmitProfileDisabled } from '@utils/profile-utils/check-is-submit-profile-disabled';
import { changeRemoteUserData } from '@utils/requests/change-remote-user-data';
import { Alert, Button, DatePicker, Form, Input, Layout, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import moment from 'moment';

import { ProfileResult } from './profile-result/profile-result';

import 'antd/dist/antd.css';
import styles from './profile-page.module.css';

export const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const width = useWindowSize().width || 0;
    const isMobile = width < 800;
    const { sessionToken, userInfo } = useAppSelector(selectUserData);
    const { password } = useAppSelector(selectLogin);

    const [userFormInfo, setUserFormInfo] = useState(userInfo);
    const emailValidStatus = userFormInfo.email && !validEmail(userFormInfo.email) ? EValid.error : EValid.success;
    const { valid } = useAppSelector(selectLogin);

    useEffect(() => {
        dispatch(changeUserInfo(userFormInfo));
    }, [dispatch, userFormInfo]);

    const [resultType, setResultType] = useState(EStatus.empty);
    const isResultError = resultType !== EStatus.empty && resultType !== EStatus.success;

    const [fileList, setFileList] = useState<UploadFile[]>(userInfo.imgSrc
        ? [{
            uid: '-1',
            name: 'avatar',
            url: userInfo.imgSrc,
        }]
        : []);

    useEffect(() => {
        const isFormEmpty = Object.keys(userFormInfo).length === 0;
        const isListEmpty = fileList.length === 0;

        if (isFormEmpty) setUserFormInfo(userInfo);
        if (isFormEmpty && isListEmpty) setFileList(userInfo.imgSrc
            ? [{
                uid: '-1',
                name: 'avatar',
                url: userInfo.imgSrc,
            }]
            : []);
    }, [userFormInfo, userInfo, fileList]);

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    function onUploadChange(info: UploadChangeParam<UploadFile>) {
        if (info.file.status === 'error') {
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'error'
            }]);
            setResultType(EStatus.errorUploadPicture);
            setIsSubmitDisabled(true);

            return;
        }

        if (info.file.status === 'done') {
            dispatch(changeUserInfo({ imgSrc: `https://training-api.clevertec.ru/${info.file.response.url}` }));
            setIsSubmitDisabled(checkIsSubmitProfileDisabled(fileList, valid, password, emailValidStatus, userFormInfo.email));
        }

        setFileList(info.fileList);
    }

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement> | moment.Moment | null, field: string) {
        if (moment.isMoment(event)) {
            setUserFormInfo(prev => ({
                ...prev,
                [field]: event === null ? '' : event.toDate().toISOString()
            }));
        } else {
            setUserFormInfo(prev => ({
                ...prev,
                [field]: event?.target.value
            }));
        }
        setIsSubmitDisabled(checkIsSubmitProfileDisabled(fileList, valid, password, emailValidStatus, userFormInfo.email));
    }

    function handleSaveChanges() {
        dispatch(changeRemoteUserData()).then(response => setResultType(response));
        dispatch(changePasswords({
            password: '',
            confirmPassword: ''
        }));
        setIsSubmitDisabled(true);
    }

    const innerUpload = isMobile
        ? <div className={styles['profile-form__upload-inner-mobile']}>
            <p>Загрузить фото профиля:</p>
            <Button icon={<UploadOutlined />}>Загрузить</Button>
        </div>
        : <div>
            <PlusOutlined />
            <div>Загрузить фото профиля</div>
        </div>;

    return (
        <Layout className={styles.page}>
            <div className={styles['profile-form-wrapper']}>
                <Form className={styles['profile-form']}>
                    <h2 className={styles['profile-form__block-title']}>Личная информация</h2>
                    <div className={styles['profile-form__personal-info']}>
                        <div
                            className={styles['profile-form__upload']}
                            data-test-id='profile-avatar'
                        >
                            <Upload
                                listType={isMobile ? 'picture' : 'picture-card'}
                                action={`${API}/upload-image`}
                                headers={{
                                    'Authorization': `Bearer ${sessionToken}`
                                }}
                                withCredentials={true}
                                maxCount={1}
                                fileList={fileList}
                                onChange={info => onUploadChange(info)}
                                progress={{
                                    strokeWidth: 4,
                                    showInfo: false
                                }}
                            >
                                {fileList.length === 0 ? innerUpload : null}
                            </Upload>
                        </div>
                        <Form.Item>
                            <Input
                                placeholder='Имя'
                                value={userFormInfo.firstName}
                                onChange={event => handleFormChange(event, 'firstName')}
                                data-test-id='profile-name'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                placeholder='Фамилия'
                                value={userFormInfo.lastName}
                                onChange={event => handleFormChange(event, 'lastName')}
                                data-test-id='profile-surname'
                            />
                        </Form.Item>
                        <Form.Item>
                            <DatePicker
                                placeholder='Дата рождения'
                                format='DD.MM.YYYY'
                                onChange={value => handleFormChange(value, 'birthday')}
                                data-test-id='profile-birthday'
                            />
                        </Form.Item>
                    </div>
                    <h2 className={styles['profile-form__block-title']}>Приватность и авторизация</h2>
                    <div className={styles['profile-form__privacy']}>
                        <Form.Item validateStatus={emailValidStatus}>
                            <Input
                                addonBefore='e-mail:'
                                type='email'
                                required={true}
                                value={userFormInfo.email}
                                onChange={event => handleFormChange(event, 'email')}
                                aria-invalid={emailValidStatus === EValid.error ? true : undefined}
                                data-test-id='profile-email'
                            />
                        </Form.Item>
                        <Passwords />
                        <Form.Item>
                            <Button
                                className={styles['profile-form__conf-button']}
                                disabled={isSubmitDisabled}
                                onClick={() => handleSaveChanges()}
                                data-test-id='profile-submit'
                            >
                                Сохранить изменения
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
                {isResultError && <ProfileResult
                    resultType={resultType}
                    setResultType={setResultType}
                />}
                {resultType === EStatus.success && <Alert
                    message="Данные профиля успешно обновлены"
                    type="success"
                    showIcon={true}
                    closable={true}
                    onClose={() => setResultType(EStatus.empty)}
                    className={styles['profile-form__alert']}
                    data-test-id='alert'
                />}
            </div>
        </Layout>
    )
};
