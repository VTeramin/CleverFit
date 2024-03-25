import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Passwords } from '@components/passwords/passwords';
import { useWindowSize } from '@uidotdev/usehooks';
import { Button, DatePicker, Form, Input, Layout, message, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';

import 'antd/dist/antd.css';
import styles from './profile-page.module.css';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export const ProfilePage: React.FC = () => {
    const width = useWindowSize().width || 0;
    const isMobile = width < 800;

    const [imageUrl, setImageUrl] = useState<string>();
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
                setImageUrl(url);
            });
        }
    };

    function getInnerUpload() {
        if (isMobile) {
            return (
                <div className={styles['profile-form__upload-inner-mobile']}>
                    <p>Загрузить фото профиля:</p>
                    <Button icon={<UploadOutlined />}>Загрузить</Button>
                </div>
            )
        }
        if (imageUrl) {
            return <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        }

        return (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Загрузить фото профиля</div>
            </div>
        )
    }

    return (
        <Layout className={styles.page}>
            <div className={styles['profile-form-wrapper']}>
                <Form className={styles['profile-form']}>
                    <h2 className={styles['profile-form__block-title']}>Личная информация</h2>
                    <div className={styles['profile-form__personal-info']}>
                        <Upload
                            name='avatar'
                            listType={isMobile ? 'text' : 'picture-card'}
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {getInnerUpload()}
                        </Upload>
                        <Form.Item>
                            <Input placeholder='Имя' />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder='Фамилия' />
                        </Form.Item>
                        <Form.Item>
                            <DatePicker placeholder='Дата рождения' />
                        </Form.Item>
                    </div>
                    <h2 className={styles['profile-form__block-title']}>Приватность и авторизация</h2>
                    <div className={styles['profile-form__privacy']}>
                        <Form.Item>
                            <Input addonBefore='e-mail:' />
                        </Form.Item>
                        <Passwords />
                        <Form.Item>
                            <Button className={styles['profile-form__conf-button']}>Сохранить изменения</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </Layout>
    )
};
