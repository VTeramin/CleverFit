import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configure-store";

export type feedback = {
    imageSrc: string,
    fullName: string,
    rating: number,
    createdAt: string,
    message: string
};

const initialState: feedback[] = [];

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        changeFeedbackData: (state, action: PayloadAction<feedback[]>) => {
            state.splice(0, state.length);
            state.push(...action.payload.reverse());
        },
        addNewFeedback: (state, action: PayloadAction<feedback>) => {
            state.unshift(action.payload);
        }
    }
});

export const { changeFeedbackData, addNewFeedback } = feedbackSlice.actions;
export const selectFeedback = (state: RootState) => state.feedback;
export default feedbackSlice.reducer;
