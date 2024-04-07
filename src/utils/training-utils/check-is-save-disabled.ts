import { TDrawerFormFields } from '@constants/types';
import { FormInstance } from 'antd';
import { Moment } from 'moment';

type TArgs = {
    form: React.RefObject<FormInstance<{
        exercises: TDrawerFormFields;
    }>>,
    date: Date | undefined,
    pickedMoment: Moment | null,
    selectedTraining: string | null,
    exerciseFormFields: TDrawerFormFields
}

type TFunction = (args: TArgs) => boolean

export const checkIsSaveDisabled: TFunction = ({ form, date, pickedMoment, selectedTraining, exerciseFormFields }) => {
    const formFields = form.current?.getFieldsValue(exerciseFormFields);
    const isAnyExercises = formFields.exercises.filter((el: TDrawerFormFields) => el.name).length;
    const isDate = date !== undefined || pickedMoment !== null;
    const isNoTraining = selectedTraining === null;
    const isNoForm = form.current === null;

    return !isDate || isNoTraining || isNoForm || !isAnyExercises;
}
