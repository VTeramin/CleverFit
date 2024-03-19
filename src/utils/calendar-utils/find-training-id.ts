import { AppDispatch } from "@redux/configure-store";
import { findTraining } from "./find-training";

export const findTrainingId = (date: Date, trainingName: string) => (dispatch: AppDispatch) => {
    return dispatch(findTraining(date, trainingName))?._id;
}
