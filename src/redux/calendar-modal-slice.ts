import { ECalendarModalType, EStatus } from '@constants/enums';
import { TCalendarModal, TDrawerFormFields } from '@constants/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

const initialState: TCalendarModal = {
    isEdit: false,
    isModal: false,
    isDrawer: false,
    resultType: EStatus.empty,
    modalType: ECalendarModalType.default,
    modalCoord: {
        x: 0,
        y: 0
    },
    selectedTraining: null,
    editTraining: null,
    interval: null,
    isSaveDisabled: true,
    exerciseFormFields: {
        0: {
            name: undefined,
            replays: undefined,
            weight: undefined,
            approaches: undefined
        }
    }
};

export const calendarModalSlice = createSlice({
    name: 'calendarModal',
    initialState,
    reducers: {
        toggleIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        toggleIsModal: (state, action: PayloadAction<boolean>) => {
            state.isModal = action.payload;
        },
        toggleIsDrawer: (state, action: PayloadAction<boolean>) => {
            state.isDrawer = action.payload;
        },
        changeResultType: (state, action: PayloadAction<EStatus>) => {
            state.resultType = action.payload;
        },
        changeModalType: (state, action: PayloadAction<ECalendarModalType>) => {
            state.modalType = action.payload;
        },
        changeModalCoord: (state, action: PayloadAction<{ x: number, y: number }>) => {
            if (action.payload.x === 0 && action.payload.y === 0) state.isModal = false
            state.modalCoord.x = action.payload.x;
            state.modalCoord.y = action.payload.y;
        },
        changeSelectedTraining: (state, action: PayloadAction<string | null>) => {
            state.selectedTraining = action.payload;
        },
        changeEditTraining: (state, action: PayloadAction<string | null>) => {
            state.editTraining = action.payload;
        },
        changeInterval: (state, action: PayloadAction<number | null>) => {
            state.interval = action.payload;
        },
        toggleIsSaveDisabled: (state, action: PayloadAction<boolean>) => {
            state.isSaveDisabled = action.payload;
        },
        changeExerciseFormFields: (state, action: PayloadAction<TDrawerFormFields>) => {
            Object.keys(state.exerciseFormFields).forEach(key => delete state.exerciseFormFields[key]);
            if (Object.keys(action.payload).length === 0) {
                Object.assign(state.exerciseFormFields, {
                    0: {
                        name: undefined,
                        replays: undefined,
                        weight: undefined,
                        approaches: undefined
                    }
                });
            } else {
                Object.assign(state.exerciseFormFields, action.payload);
            }
        }
    }
});

export const {
    toggleIsEdit,
    toggleIsModal,
    toggleIsDrawer,
    changeResultType,
    changeModalType,
    changeModalCoord,
    changeSelectedTraining,
    changeEditTraining,
    changeInterval,
    toggleIsSaveDisabled,
    changeExerciseFormFields
} = calendarModalSlice.actions;
export const selectCalendarModalData = (state: RootState) => state.calendarModal;
export default calendarModalSlice.reducer;

