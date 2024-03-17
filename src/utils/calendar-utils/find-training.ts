import { AppDispatch, GetState } from "@redux/configure-store";
import { findAllTraining } from "./find-all-training";

export const findTraining = (date: Date, trainingName: string) => (_: AppDispatch, getState: GetState) => {
    const training = getState().training;
    return findAllTraining(training, date).find(el => el.name === trainingName);
}
