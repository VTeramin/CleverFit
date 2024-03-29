import { TSettingsSwitchesData } from './types';

export const switchesData = (styles: CSSModuleClasses, isTariffFree: boolean): TSettingsSwitchesData => ({
    'тренировки': {
        text: 'Открыт для совместных тренировок',
        title: <p className={styles.tooltip}>
            включеная функция <br />позволит участвовать <br />в совместных тренировках
        </p>,
        disabled: false,
        test: {
            switch: 'tariff-trainings',
            tooltip: 'tariff-trainings-icon'
        }
    },
    'уведомления': {
        text: 'Уведомления',
        title: <p className={styles.tooltip}>
            включеная функция <br />позволит получать <br />уведомления об активностях
        </p>,
        disabled: false,
        test: {
            switch: 'tariff-notifications',
            tooltip: 'tariff-notifications-icon'
        }
    },
    'тема': {
        text: 'Тёмная тема',
        title: <p className={styles.tooltip}>
            темная тема <br />доступна для <br />PRO tarif
        </p>,
        disabled: isTariffFree,
        test: {
            switch: 'tariff-theme',
            tooltip: 'tariff-theme-icon'
        }
    }
});
