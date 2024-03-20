import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configure-store";
import { TFeedback } from "@constants/types";

const initialState: TFeedback[] = [];

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        changeFeedbackData: (state, action: PayloadAction<TFeedback[]>) => {
            state.splice(0, state.length);
            state.push(...action.payload.reverse());
        }
    }
});

export const { changeFeedbackData } = feedbackSlice.actions;
export const selectFeedback = (state: RootState) => state.feedback;
export default feedbackSlice.reducer;
