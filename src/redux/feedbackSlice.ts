import { createSlice } from "@reduxjs/toolkit";

type feedback = {
    imageSrc: string,
    fullName: string,
    rating: number,
    createdAt: string,
    message: string
};

const initialState:feedback[] = [];

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        changeFeedbackData: (state, action) => {
            state;
            return [...action.payload].reverse();
        },
        addNewFeedback: (state, action) => {
            return [action.payload, ...state];
        }
    }
});

export const { changeFeedbackData, addNewFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
